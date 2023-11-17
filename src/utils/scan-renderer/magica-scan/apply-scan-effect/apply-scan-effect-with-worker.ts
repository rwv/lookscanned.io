import type { applyScanEffect } from './apply-scan-effect'

import Worker from './apply-scan-effect.worker.ts?worker'

export const applyScanEffectWithWorker = async function (
  data: Parameters<typeof applyScanEffect>[0],
  signal?: AbortSignal
): Promise<ReturnType<typeof applyScanEffect>> {
  if (window.Worker) {
    return await new Promise<ReturnType<typeof applyScanEffect>>((resolve, reject) => {
      const worker = new Worker()

      if (signal) {
        signal.addEventListener('abort', () => {
          worker.terminate()
          reject(new Error('Aborted'))
        })
      }

      worker.onmessage = (e: MessageEvent<ReturnType<typeof applyScanEffect>>) => {
        resolve(e.data)
        worker.terminate()
      }

      worker.onerror = (e) => {
        reject(e)
        worker.terminate()
      }

      worker.postMessage(data)
    })
  } else {
    throw new Error('Web Workers are not supported in this browser')
  }
}
