import pdfJsWorkerURL from "pdfjs-dist/build/pdf.worker.min.js?url";

export default async function getPdfjsLib() {
  // import pdfjs-dist from node_modules
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfJsWorkerURL;
  return pdfjsLib;
}
