import type { ScanConfig } from './types'
import type { ScanRenderer } from '../types'
import ScanWorker from './scan.worker?worker'
import { createNoiseBlob } from './create-noise-blob'

// to avoid web worker cold start
const workers = [
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker()
]

const noiseBlobCache = new Map<string, Blob>()

export class CanvasScanner implements ScanRenderer {
  config: ScanConfig

  constructor(config: ScanConfig) {
    this.config = config
  }

  async renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal
    }
  ): Promise<{
    blob: Blob
  }> {
    if (options?.signal?.aborted) {
      throw new Error('Aborted')
    }

    const worker = workers.shift() ?? new ScanWorker()
    workers.push(new ScanWorker())

    options?.signal?.addEventListener('abort', () => worker.terminate())

    const noiseBlob = await getNoiseBlob(this.config.noise)

    const blob = await new Promise<Blob>((resolve, reject) => {
      worker.onmessage = (e) => {
        resolve(e.data)
        worker.terminate()
      }
      worker.onerror = (e) => {
        console.error(e)
        reject(e)
        worker.terminate()
      }
      worker.postMessage({
        page: image,
        config: JSON.parse(JSON.stringify(this.config)),
        noise: noiseBlob
      })
    })

    return { blob }
  }
}

async function getNoiseBlob(noise: number) {
  const noiseCacheKey = noise.toFixed(2)
  const cachedNoiseBlob = noiseBlobCache.get(noiseCacheKey)
  if (cachedNoiseBlob) {
    return cachedNoiseBlob
  }
  const noiseBlob = await createNoiseBlob(noise, 1000, 1000)
  noiseBlobCache.set(noiseCacheKey, noiseBlob)
  return noiseBlob
}
