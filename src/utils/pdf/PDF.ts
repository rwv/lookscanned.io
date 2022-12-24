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
  private readonly initPromise: Promise<void>;
  private readonly pagePromises: Map<number, Promise<PDFPageInfo>> = new Map();
  private numPages = 0;
  private finishedNumPages = 0;
  readonly scale: number;

  constructor(pdfInfo: PDFInfoType, scale: number) {
    this.pdfSource = pdfInfo.source;
    this.pdfFilename = pdfInfo.filename;
    this.scale = scale;
    this.initPromise = this.init();
  }

  async init() {
    const { getDocument } = await import("./getDocument");
    const pdfDocument = await getDocument(this.pdfSource).promise;
    this.pdfDocument = pdfDocument;
    this.numPages = pdfDocument.numPages;
  }

  async getDocument(): Promise<PDFDocumentProxy> {
    await this.initPromise;
    if (!this.pdfDocument) {
      throw new Error("PDF document is not initialized");
    }
    return this.pdfDocument;
  }

  async getNumPages(): Promise<number> {
    await this.initPromise;
    return this.numPages;
  }

  async renderPage(page: number): Promise<PDFPageInfo> {
    const promise = this.pagePromises.get(page);
    if (promise) {
      return await promise;
    }

    const pageInfoPromise = this.renderPageRaw(page);
    this.pagePromises.set(page, pageInfoPromise);

    return await pageInfoPromise;
  }

  async renderPageRaw(page: number): Promise<PDFPageInfo> {
    await this.initPromise;

    const scale = this.scale;
    const dpi = scale * 72;
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

    pdfPage.cleanup();

    this.finishedNumPages += 1;
    this.checkFinished();

    return pageInfo;
  }

  async checkFinished(): Promise<void> {
    const numPages = await this.getNumPages();
    if (this.finishedNumPages === numPages) {
      const pdfDocument = await this.getDocument();
      pdfDocument.destroy();
    }
  }
}
