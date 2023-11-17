import { getNoiseSVG } from './noise-svg'

export async function createNoiseBlob(noise: number, height: number, width: number): Promise<Blob> {
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context is null')
  }

  if (noise === 0) {
    return canvas.convertToBlob({ type: 'image/png' })
  }

  const noiseSVG = getNoiseSVG(noise)
  const noiseSVGBlob = new Blob([noiseSVG], { type: 'image/svg+xml' })
  const noiseSVGURL = URL.createObjectURL(noiseSVGBlob)

  const noiseImg = new Image()
  noiseImg.src = noiseSVGURL

  await new Promise((resolve) => (noiseImg.onload = resolve))

  // add noise
  ctx.drawImage(noiseImg, 0, 0, width, height)

  const blob = await canvas.convertToBlob({ type: 'image/png' })
  return blob
}
