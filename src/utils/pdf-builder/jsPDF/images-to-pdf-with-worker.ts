import type { ImageInfo } from './images-to-pdf'
import ImagesToPDFWorker from './images-to-pdf.worker.ts?worker'

export async function imagesToPDFWithWorker(
  images: ImageInfo[],
  signal?: AbortSignal
): Promise<Blob> {
  if (window.Worker) {
    return await new Promise<Blob>((resolve, reject) => {
      const worker = new ImagesToPDFWorker()

      if (signal) {
        signal.addEventListener('abort', () => {
          worker.terminate()
          reject(new Error('Aborted'))
        })
      }

      worker.onmessage = (e: MessageEvent<Blob>) => {
        const blob = e.data
        worker.terminate()
        resolve(blob)
      }

      worker.onerror = (e) => {
        worker.terminate()
        reject(e)
      }

      worker.postMessage(images)
    })
  } else {
    // https://caniuse.com/webworkers
    throw new Error('Web Workers are not supported in this browser')
  }
}
