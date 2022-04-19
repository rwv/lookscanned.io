import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";

export default async function (
  pdfDocument: PDFDocumentProxy,
  page: number
): Promise<Blob> {
  const pdfPage = await pdfDocument.getPage(page);
  const viewport = pdfPage.getViewport({ scale: 2.0 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d");
  const renderTask = pdfPage.render({
    canvasContext: ctx as object,
    viewport,
  });
  await renderTask.promise;
  return await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    });
  });
}
