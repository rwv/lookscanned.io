type PageInfo = {
  buffer: ArrayBufferView;
  width: number;
  height: number;
  dpi: number;
};

export async function combineImagesToPDF(infos: PageInfo[]): Promise<Blob> {
  const jsPDF = (await import("jspdf")).default;
  const doc = new jsPDF({
    unit: "in",
  });
  doc.deletePage(1); // delete the default page

  for (const info of infos) {
    const { buffer, width, height, dpi } = info;
    const buffer_ = new Uint8Array(buffer.buffer);
    const physicalWidth = width / dpi;
    const physicalHeight = height / dpi;

    doc.addPage([physicalWidth, physicalHeight]);
    doc.addImage(buffer_, "PNG", 0, 0, physicalWidth, physicalHeight);
  }

  const pdfDocument = doc.output("blob");
  return pdfDocument;
}
