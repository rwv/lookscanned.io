import type { PDF } from "@/utils/pdf";
import type { ScanConfig } from "./ScanConfig";
import { processImageWithWorker } from "./processImageWithWorker";
// import { combineImagesToPdfWithWorker } from "./combineImagesToPdfWithWorker";
import pMap from "p-map";
import { jsPDF } from "jspdf";

import { getLogger } from "@/utils/log";
const logger = getLogger(["scan"]);

type ScanCallbackFunc = (pageNum: number, totalPageNum: number) => void;

export class Scan {
  readonly pdfInstance: PDF;
  readonly config: ScanConfig;
  private pageImageCache: Map<number, ArrayBufferView> = new Map();
  readonly id: string;
  private signal: AbortSignal | undefined;
  private pdfDocumentCache: Blob | undefined = undefined;

  constructor(pdfInstance: PDF, config: ScanConfig, signal?: AbortSignal) {
    this.pdfInstance = pdfInstance;
    this.config = JSON.parse(JSON.stringify(config)) as ScanConfig;
    this.id = `${this.pdfInstance.pdfSource}-${JSON.stringify(this.config)}`;
    this.signal = signal;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent || navigator.vendor
    );
    const maxConcurrency = isMobile ? 2 : 4;

    this.getScannedPDF(undefined, maxConcurrency);
  }

  async getImageBuffer(page: number): Promise<ArrayBufferView> {
    const bufferInCache = this.pageImageCache.get(page);
    if (bufferInCache) {
      return bufferInCache;
    } else {
      const { blob } = await this.pdfInstance.renderPage(page);
      const buffer = new Uint8Array(await blob.arrayBuffer());
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

  async getScannedPDF(
    ScanCallbackFunc?: ScanCallbackFunc,
    maxConcurrency?: number
  ): Promise<Blob> {
    const numPages = await this.pdfInstance.getNumPages();

    if (this.pdfDocumentCache) {
      logger.log("Return cached pdf document");
      if (ScanCallbackFunc) {
        for (let i = 0; i < numPages; i++) {
          ScanCallbackFunc(i, numPages);
        }
      }
      return this.pdfDocumentCache;
    }

    const pages = [...Array(numPages).keys()].map((x) => x + 1);

    const handleEachPage = async (page: number) => {
      if (this.signal?.aborted) {
        throw new Error("AbortError");
      }

      const buffer = await this.getImageBuffer(page);
      const { width, height, dpi } = await this.pdfInstance.renderPage(page);
      logger.log(`Page ${page}/${numPages} scanned`);
      if (ScanCallbackFunc) {
        ScanCallbackFunc(page, numPages);
      }
      const info = {
        buffer,
        width,
        height,
        dpi,
        page,
      };
      return info;
    };

    const concurrency = Math.min(
      navigator.hardwareConcurrency,
      maxConcurrency ?? 1024
    );
    const processedPageInfos = await pMap(pages, handleEachPage, {
      concurrency,
    });

    if (this.signal?.aborted) {
      throw new Error("AbortError");
    }

    const doc = new jsPDF({
      unit: "in",
    });
    doc.deletePage(1); // delete the default page

    for (const info of processedPageInfos) {
      const { buffer, width, height, dpi } = info;
      const buffer_ = new Uint8Array(buffer.buffer);
      const physicalWidth = width / dpi;
      const physicalHeight = height / dpi;

      doc.addPage([physicalWidth, physicalHeight]);
      doc.addImage(buffer_, "PNG", 0, 0, physicalWidth, physicalHeight);
    }

    const pdfDocument = doc.output("blob");

    this.pdfDocumentCache = pdfDocument;
    return pdfDocument;
  }
}
