import { PDFDocument } from "pdf-lib";

interface ImageInfo {
  blob: Blob;
  width: number;
  height: number;
  dpi: number;
}

export async function buildPDF(images: ImageInfo[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const image of images) {
    const { blob, width, height, dpi } = image;
    const physicalWidthDots = (width / dpi) * 72;
    const physicalHeightDots = (height / dpi) * 72;
    const page = pdfDoc.addPage([physicalWidthDots, physicalHeightDots]);

    const imageBytes = await blob.arrayBuffer();
    let pdfImage;
    if (blob.type === "image/png") {
      pdfImage = await pdfDoc.embedPng(imageBytes);
    } else if (blob.type === "image/jpeg") {
      pdfImage = await pdfDoc.embedJpg(imageBytes);
    } else {
      throw new Error("Unsupported image format");
    }

    page.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: physicalWidthDots,
      height: physicalHeightDots,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
