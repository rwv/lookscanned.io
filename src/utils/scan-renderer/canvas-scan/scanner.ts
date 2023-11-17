import { scanCanvas } from "./scan-canvas";
import type { ScanConfig } from "./types";
import type { ScanRenderer } from "../types";
import ScanWorker from "./scan.worker?worker";

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

    const uuid = Math.random().toString(36).substring(2, 15);

    console.time(`scanCanvas ${uuid}`);
    const worker = new ScanWorker();
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
    console.timeEnd(`scanCanvas ${uuid}`);

    return { blob };
  }
}
