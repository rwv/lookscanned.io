import getSharedPdfjsLib from "./getSharedPdfjsLib";
import getPdfjsLib from "./getPdfjsLib";

export default async function getPdfDocument(
  pdfSource: string,
  shared: boolean
) {
  const pdfjsLib = shared ? await getSharedPdfjsLib() : await getPdfjsLib();
  const loadingTask = pdfjsLib.getDocument(pdfSource);
  const pdfDocument = await loadingTask.promise;
  return pdfDocument;
}
