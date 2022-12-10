import type { ScanConfig } from "./config";
import type { processImage } from "./processImage";
import ProcessImageWorker from "./processImage.worker.ts?worker";

export const processImageWithWorker = async function (
  data: Parametes<typeof processImage>[0],
  signal?: AbortSignal
): Promise<Blob> {
  if (window.Worker) {
    return await new Promise((resolve, reject) => {
      const worker = new ProcessImageWorker();

      if (signal) {
        signal.addEventListener("abort", () => {
          magicaWorker.terminate();
          reject(new Error("Aborted"));
        });
      }

      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };

      worker.onerror = (e) => {
        reject(e);
        worker.terminate();
      };

      worker.postMessage(data);
    });
  } else {
    throw new Error("Web Workers are not supported in this browser");
  }
};
