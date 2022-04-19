type pdfjsLibType = typeof import("pdfjs-dist");

export default async function getPdfjsLib(): Promise<pdfjsLibType> {
  // import pdfjs-dist from node_modules
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendors/pdf.js/pdf.worker.min.js";
  return pdfjsLib;
}
