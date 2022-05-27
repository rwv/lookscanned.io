import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";
import getPdfjsLib from "./getPdfjsLib";
import renderPage from "./renderPage";

export type renderAllPagesCallback = (
  pageNum: number,
  totalPageNum: number,
  pageImage: Blob
) => void;

export class PDF {
  private pdfSource: string;
  private pdfDocument?: PDFDocumentProxy;

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
    const document = await this.getDocument();
    return await renderPage(document, page);
  }

  async renderAllPages(callback: renderAllPagesCallback) {
    const numPages = await this.getNumPages();
    const pagesArray = Array.from(Array(numPages).keys()).map(
      (x: number) => x + 1
    );

    const promises = pagesArray.map(async (pageNum: number) => {
      const pageImageBlob = await this.renderPage(pageNum);
      callback(pageNum, numPages, pageImageBlob);
      return pageImageBlob;
    });

    return await Promise.all(promises);
  }
}
