import type { PDF } from "@/utils/pdf";
import type { ProcessConfig } from "./processConfig";
import { processImageWithWorker } from "./processImageWithWorker";
import { combineImagesToPdfWithWorker } from "./combineImagesToPdfWithWorker";
import pMap from "p-map";

type ScanCallbackFunc = (pageNum: number, totalPageNum: number) => void;

export class Scan {
  readonly pdfInstance: PDF;
  readonly config: ProcessConfig;
  private pageImageCache: Map<number, ArrayBufferView> = new Map();

  constructor(pdfInstance: PDF, config: ProcessConfig) {
    this.pdfInstance = pdfInstance;
    this.config = JSON.parse(JSON.stringify(config)) as ProcessConfig;
  }

  async getImageBuffer(page: number): Promise<ArrayBufferView> {
    const bufferInCache = this.pageImageCache.get(page);
    if (bufferInCache) {
      return bufferInCache;
    } else {
      const originPage = await this.pdfInstance.renderPage(page);
      const buffer = new Uint8Array(await originPage.arrayBuffer());
      const processedImgBuffer = await processImageWithWorker(
        buffer,
        this.config
      );
      this.pageImageCache.set(page, processedImgBuffer);
      return processedImgBuffer;
    }
  }

  async getImageBlob(page: number): Promise<Blob> {
    const buffer = await this.getImageBuffer(page);
    return new Blob([buffer], { type: "image/png" });
  }

  async getScannedPDF(ScanCallbackFunc: ScanCallbackFunc): Promise<Blob> {
    const numPages = await this.pdfInstance.getNumPages();
    const pages = [...Array(numPages).keys()].map((x) => x + 1);

    const handleEachPage = async (page: number) => {
      const imageBuffer = await this.getImageBuffer(page);
      ScanCallbackFunc(page, numPages);
      return imageBuffer;
    };

    const concurrency = navigator.hardwareConcurrency;
    const processedPages = await pMap(pages, handleEachPage, {
      concurrency,
    });

    const pdfDocument = await combineImagesToPdfWithWorker(processedPages);
    return pdfDocument;
  }
}
