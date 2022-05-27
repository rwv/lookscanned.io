import getPdfjsLib from "./getPdfjsLib";

export default async function getPdfDocument(pdfSource: string) {
  const pdfjsLib = await getPdfjsLib();
  const loadingTask = pdfjsLib.getDocument(pdfSource);
  const pdfDocument = await loadingTask.promise;
  return pdfDocument;
}
