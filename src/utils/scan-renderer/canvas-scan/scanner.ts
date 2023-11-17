import type { ScanConfig } from "./types";
import type { ScanRenderer } from "../types";
import ScanWorker from "./scan.worker?worker";

// to avoid web worker cold start
const workers = [
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker(),
  new ScanWorker(),
];

export class CanvasScanner implements ScanRenderer {
  config: ScanConfig;

  constructor(config: ScanConfig) {
    this.config = config;
  }

  async renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal;
    }
  ): Promise<{
    blob: Blob;
  }> {
    if (options?.signal?.aborted) {
      throw new Error("Aborted");
    }

    const worker = workers.shift() ?? new ScanWorker();
    workers.push(new ScanWorker());

    options?.signal?.addEventListener("abort", () => worker.terminate());

    const blob = await new Promise<Blob>((resolve, reject) => {
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (e) => {
        console.error(e);
        reject(e);
        worker.terminate();
      };
      worker.postMessage({
        page: image,
        config: JSON.parse(JSON.stringify(this.config)),
      });
    });

    return { blob };
  }
}
