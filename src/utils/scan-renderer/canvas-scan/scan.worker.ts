import type { ScanConfig } from './types'
import { scanCanvas } from './scan-canvas'

export interface WorkerMessage {
  page: Blob
  config: ScanConfig
  noise: Blob
}

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { page, config, noise } = e.data
  // disable eslint ban ts-ignore
  const canvas = new OffscreenCanvas(1000, 1000)
  await scanCanvas(canvas, page, config, noise)
  const blob = await canvas.convertToBlob({ type: config.output_format })
  postMessage(blob)
}
