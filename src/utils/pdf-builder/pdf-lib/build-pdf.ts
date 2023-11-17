interface ImageInfo {
  blob: Blob
  width: number
  height: number
  ppi: number
}

export async function buildPDF(images: ImageInfo[]): Promise<Blob> {
  const { PDFDocument } = await import('pdf-lib')
  const pdfDoc = await PDFDocument.create()

  for (const image of images) {
    const { blob, width, height, ppi } = image
    const physicalWidthDots = (width / ppi) * 72
    const physicalHeightDots = (height / ppi) * 72
    const page = pdfDoc.addPage([physicalWidthDots, physicalHeightDots])

    const imageBytes = await blob.arrayBuffer()
    let pdfImage
    if (blob.type === 'image/png') {
      pdfImage = await pdfDoc.embedPng(imageBytes)
    } else if (blob.type === 'image/jpeg') {
      pdfImage = await pdfDoc.embedJpg(imageBytes)
    } else {
      throw new Error('Unsupported image format')
    }

    page.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: physicalWidthDots,
      height: physicalHeightDots
    })
  }

  // TODO: use custom metadata
  pdfDoc.setProducer(metadata.producer)
  pdfDoc.setCreator(metadata.creator)

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

const metadata = {
  producer: 'SECnvtToPDF V1.0',
  creator: 'TOSHIBA e-STUDIO2010AC'
}
