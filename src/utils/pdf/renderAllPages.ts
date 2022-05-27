import getPdfDocument from "./getPdfDocument";
import renderPage from "./renderPage";

export type renderAllPagesCallback = (
  pageNum: number,
  totalPageNum: number,
  pageImage: Blob
) => void;

// get Pdf Document is very heavy, for now there's no need for parallelization
export default async function (
  pdfSource: string,
  callback: renderAllPagesCallback
): Promise<Awaited<ReturnType<typeof renderPage>>[]> {
  const pdfDocument = await getPdfDocument(pdfSource);
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
