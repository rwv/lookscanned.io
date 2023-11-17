export type ImageInfo = {
  blob: Blob
  width: number
  height: number
  ppi: number
}

export async function imagesToPDF(images: ImageInfo[], signal?: AbortSignal): Promise<Blob> {
  const jsPDF = (await import('jspdf')).default

  const doc = new jsPDF({
    unit: 'in'
  })
  doc.deletePage(1) // delete the default page

  for (const image of images) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError')
    }

    const { blob, width, height, ppi } = image
    const buffer = new Uint8Array(await blob.arrayBuffer())
    const physicalWidth = width / ppi
    const physicalHeight = height / ppi
    const format = getImageFormat(blob)
    const orientation = physicalWidth > physicalHeight ? 'l' : 'p'

    doc.addPage([physicalWidth, physicalHeight], orientation)
    doc.addImage(buffer, format, 0, 0, physicalWidth, physicalHeight)
  }

  const docBlob = doc.output('blob')
  return docBlob
}

function getImageFormat(blob: Blob): string {
  const type = blob.type
  if (type === 'image/png') {
    return 'PNG'
  } else if (type === 'image/jpeg') {
    return 'JPEG'
  } else {
    throw new Error('Unsupported image format')
  }
}
