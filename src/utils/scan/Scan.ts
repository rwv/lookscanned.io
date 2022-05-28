import type { PDF } from "@/utils/pdf";
import type { ScanConfig } from "./ScanConfig";
import { processImageWithWorker } from "./processImageWithWorker";
import { combineImagesToPdfWithWorker } from "./combineImagesToPdfWithWorker";
import pMap from "p-map";

type ScanCallbackFunc = (pageNum: number, totalPageNum: number) => void;

export class Scan {
  readonly pdfInstance: PDF;
  readonly config: ScanConfig;
  private pageImageCache: Map<number, ArrayBufferView> = new Map();
  readonly id: string;
  private signal: AbortSignal | undefined;

  constructor(pdfInstance: PDF, config: ScanConfig, signal?: AbortSignal) {
    this.pdfInstance = pdfInstance;
    this.config = JSON.parse(JSON.stringify(config)) as ScanConfig;
    this.id = `${this.pdfInstance.pdfSource}-${JSON.stringify(this.config)}`;
    this.signal = signal;
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
        this.config,
        this.signal
      );
      this.pageImageCache.set(page, processedImgBuffer);
      return processedImgBuffer;
    }
  }

  async getImageBlob(page: number): Promise<Blob> {
    const buffer = await this.getImageBuffer(page);
    return new Blob([buffer], { type: "image/png" });
  }

  async getScannedPDF(ScanCallbackFunc?: ScanCallbackFunc): Promise<Blob> {
    const numPages = await this.pdfInstance.getNumPages();
    const pages = [...Array(numPages).keys()].map((x) => x + 1);

    const handleEachPage = async (page: number) => {
      const imageBuffer = await this.getImageBuffer(page);
      if (ScanCallbackFunc) {
        ScanCallbackFunc(page, numPages);
      }
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
