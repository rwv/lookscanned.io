import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";

type PDFPageInfo = {
  blob: Blob;
  page: number;
  height: number;
  width: number;
  scale: number;
  dpi: number;
};

export interface PDFInfoType {
  source: string;
  filename: string;
}

export class PDF {
  readonly pdfSource: string;
  readonly pdfFilename: string;
  private pdfDocument?: PDFDocumentProxy;
  private pageInfoCache: Map<number, PDFPageInfo> = new Map();
  readonly id: string;
  private readonly initPromise: Promise<void>;

  constructor(pdfInfo: PDFInfoType) {
    this.pdfSource = pdfInfo.source;
    this.pdfFilename = pdfInfo.filename;
    this.id = this.pdfSource;
    this.initPromise = this.init();
  }

  async init() {
    const { getDocument } = await import("./getDocument");
    const pdfDocument = await getDocument(this.pdfSource).promise;
    this.pdfDocument = pdfDocument;
  }

  async getDocument(): Promise<PDFDocumentProxy> {
    await this.initPromise;
    if (!this.pdfDocument) {
      throw new Error("PDF document is not initialized");
    }
    return this.pdfDocument;
  }

  async getNumPages(): Promise<number> {
    const document = await this.getDocument();
    return document.numPages;
  }

  async renderPage(page: number, scale = 2.0): Promise<PDFPageInfo> {
    const dpi = scale * 72;

    // Check if page is already in cache
    const pageInfoInCache = this.pageInfoCache.get(page);
    if (pageInfoInCache) {
      return pageInfoInCache;
    }

    const pdfDocument = await this.getDocument();
    const pdfPage = await pdfDocument.getPage(page);
    const viewport = pdfPage.getViewport({ scale });
    const width = viewport.width;
    const height = viewport.height;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const renderTask = pdfPage.render({
      canvasContext: ctx as object,
      viewport,
    });
    await renderTask.promise;

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas to Blob failed"));
        }
      });
    });

    canvas.remove();

    const pageInfo = {
      blob,
      page,
      height,
      width,
      scale,
      dpi,
    };

    this.pageInfoCache.set(page, pageInfo);

    pdfPage.cleanup();

    return pageInfo;
  }
}
