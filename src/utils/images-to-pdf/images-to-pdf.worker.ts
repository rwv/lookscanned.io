import { imagesToPDF } from "./images-to-pdf";
import type { ImageInfo } from "./images-to-pdf";

onmessage = async function (e) {
  const images = e.data as ImageInfo[];
  const pdfBlob = await imagesToPDF(images);
  postMessage(pdfBlob);
};
