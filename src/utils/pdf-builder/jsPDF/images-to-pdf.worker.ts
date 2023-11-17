import { imagesToPDF } from './images-to-pdf'
import type { ImageInfo } from './images-to-pdf'

onmessage = async function (e: MessageEvent<ImageInfo[]>) {
  postMessage(await imagesToPDF(e.data))
}
