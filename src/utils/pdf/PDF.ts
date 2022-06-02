import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";
import getPdfjsLib from "./getPdfjsLib";
import renderPage from "./renderPage";
import type { PDFInfoType } from "./PDFInfoType";

export class PDF {
  readonly pdfSource: string;
  readonly pdfFilename: string;
  private pdfDocument?: PDFDocumentProxy;
  private pageImageCache: Map<number, Blob> = new Map();
  readonly id: string;

  constructor(pdfInfo: PDFInfoType) {
    this.pdfSource = pdfInfo.source;
    this.pdfFilename = pdfInfo.filename;
    this.id = this.pdfSource;
  }

  async init() {
    const pdfjsLib = await getPdfjsLib();
    const loadingTask = pdfjsLib.getDocument(this.pdfSource);
    const pdfDocument = await loadingTask.promise;
    this.pdfDocument = pdfDocument;
  }

  async getDocument() {
    if (this.pdfDocument) {
      return this.pdfDocument;
    } else {
      await this.init();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.pdfDocument!;
    }
  }

  async getNumPages() {
    const document = await this.getDocument();
    return document.numPages;
  }

  async renderPage(page: number) {
    const pageImage_ = this.pageImageCache.get(page);
    if (pageImage_) {
      return pageImage_;
    } else {
      const document = await this.getDocument();
      const pageImage = await renderPage(document, page);
      this.pageImageCache.set(page, pageImage);
      return pageImage;
    }
  }
}
