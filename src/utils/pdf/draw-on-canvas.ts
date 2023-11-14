import type { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";

export async function drawOnCanvas(
  canvas: HTMLCanvasElement,
  pdfDocument: PDFDocumentProxy,
  page: number,
  scale: number,
  options?: {
    signal?: AbortSignal;
  }
): Promise<void> {
  console.log(pdfDocument);
  const pdfPage = await pdfDocument.getPage(page);

  if (options?.signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  const viewport = pdfPage.getViewport({ scale });
  const width = viewport.width;
  const height = viewport.height;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const renderTask = pdfPage.render({
    canvasContext: ctx as object,
    viewport,
  });
  await renderTask.promise;
}
