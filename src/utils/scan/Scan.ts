import type { PDF } from "@/utils/pdf";
import type { ScanConfig } from "./processImage";
import { processImageWithWorker } from "./processImage";
import pMap from "p-map";

import { getLogger } from "@/utils/log";
const logger = getLogger(["scan"]);

type ScanCallbackFunc = (pageNum: number, totalPageNum: number) => void;

export class Scan {
  readonly pdfInstance: PDF;
  readonly config: ScanConfig;
  private pageImageCache: Map<number, Blob> = new Map();
  readonly id: string;
  private signal: AbortSignal | undefined;
  private pdfDocumentCache: Blob | undefined = undefined;
  private pagePromises: Map<number, Promise<Blob>> = new Map();

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

  async getImageBlob(page: number): Promise<Blob> {
    // Check if the image is already in cache
    const blobInCache = this.pageImageCache.get(page);
    if (blobInCache) {
      return blobInCache;
    }

    // Check if the image is already being processed
    const promise = this.pagePromises.get(page);
    if (promise) {
      return await promise;
    }

    // Start processing the image
    const blobPromise = this.getImageBlobRaw(page);
    this.pagePromises.set(page, blobPromise);
    const blob = await blobPromise;
    return blob;
  }

  async getImageBlobRaw(page: number): Promise<Blob> {
    // Render the page
    const { blob } = await this.pdfInstance.renderPage(page);
    const scannedBlob = await processImageWithWorker(
      {
        image: blob,
        config: this.config,
      },
      this.signal
    );
    return scannedBlob;
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

      const blob = await this.getImageBlob(page);
      const { width, height, dpi } = await this.pdfInstance.renderPage(page);
      logger.log(`Page ${page}/${numPages} scanned`);
      if (ScanCallbackFunc) {
        ScanCallbackFunc(page, numPages);
      }
      const info = {
        blob,
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

    const { imagesToPDF } = await import("@/utils/images-to-pdf");
    const pdfDocument = await imagesToPDF(processedPageInfos, this.signal);

    this.pdfDocumentCache = pdfDocument;
    return pdfDocument;
  }
}
