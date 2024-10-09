import type { ScanConfig } from './types'

export async function scanCanvas(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  page: Blob,
  config: ScanConfig,
  noise: Blob,
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) {
    throw new Error('Aborted')
  }

  const imgPromise = createImageBitmap(page)
  const noiseImagePromise = createImageBitmap(noise)

  // Note: Hack to get around TS error
  const ctx = canvas.getContext('2d') as
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
  if (!ctx) {
    throw new Error('Canvas not supported')
  }

  // load blob into image
  const img = await imgPromise
  if (signal?.aborted) {
    throw new Error('Aborted')
  }

  const width = img.width
  const height = img.height

  canvas.width = width
  canvas.height = height

  // fill white
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  // add blur
  ctx.filter = `blur(${config.blur}px)`
  if (config.colorspace === 'gray') {
    ctx.filter += ' grayscale(1)'
  }

  // add brightness
  ctx.filter += ` brightness(${config.brightness})`

  // modify yellowish
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * 0.8 + 240 * 0.2 // Red
    data[i + 1] = data[i + 1] * 0.8 + 234 * 0.2 // Green
    data[i + 2] = data[i + 2] * 0.8 + 214 * 0.2 // Blue
  }
  ctx.putImageData(imageData, 0, 0)

  // add contrast
  ctx.filter += ` contrast(${config.contrast})`

  // rotate
  ctx.translate(width / 2, height / 2)
  ctx.rotate(((config.rotate + config.rotate_var * Math.random()) * Math.PI) / 180)
  ctx.translate(-width / 2, -height / 2)

  ctx.drawImage(img, 0, 0)

  const noiseImage = await noiseImagePromise
  ctx.drawImage(noiseImage, 0, 0, width, height)

  if (config.border) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, width, height)
  }
}
