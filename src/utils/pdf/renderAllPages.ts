import renderPage from "./renderPage";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";

export type renderAllPagesCallback = (
  pageNum: number,
  totalPageNum: number,
  pageImage: Blob
) => void;

// get Pdf Document is very heavy, for now there's no need for parallelization
export default async function (
  pdfDocument: PDFDocumentProxy,
  callback: renderAllPagesCallback
): Promise<Awaited<ReturnType<typeof renderPage>>[]> {
  const numPages = pdfDocument.numPages;
  //    range(numPages)
  const pagesArray = Array.from(Array(numPages).keys()).map(
    (x: number) => x + 1
  );

  const promises = pagesArray.map(async (pageNum: number) => {
    const pageImage = await renderPage(pdfDocument, pageNum);
    callback(pageNum, numPages, pageImage);
    return pageImage;
  });

  return await Promise.all(promises);
}
