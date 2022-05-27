import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";
import getPdfjsLib from "./getPdfjsLib";
import renderPage from "./renderPage";
import renderAllPages from "./renderAllPages";
import type { renderAllPagesCallback } from "./renderAllPages";

export class PDF {
  pdfSource: string;
  pdfDocument?: PDFDocumentProxy;

  constructor(pdfSource: string) {
    this.pdfSource = pdfSource;
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
    if (this.pdfDocument) {
      return await renderPage(this.pdfDocument, page);
    } else {
      await this.init();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await renderPage(this.pdfDocument!, page);
    }
  }

  async renderAllPages(callback: renderAllPagesCallback) {
    if (this.pdfDocument) {
      return await renderAllPages(this.pdfDocument, callback);
    } else {
      await this.init();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await renderAllPages(this.pdfDocument!, callback);
    }
  }
}
