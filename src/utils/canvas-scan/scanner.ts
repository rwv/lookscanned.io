import { scanCanvas } from "./scan-canvas";
import type { ScanConfig } from "./types";

interface ScanRenderer {
  renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal;
    }
  ): Promise<{
    blob: Blob;
    height: number;
    width: number;
  }>;
}

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
    height: number;
    width: number;
  }> {
    if (options?.signal?.aborted) {
      throw new Error("Aborted");
    }

    if ("OffscreenCanvas" in window) {
      // TODO: use web worker
      const canvas = new OffscreenCanvas(10, 10);
      await scanCanvas(canvas, image, this.config);
      const blob = await canvas.convertToBlob();
      const height = canvas.height;
      const width = canvas.width;
      return { blob, height, width };
    } else {
      const canvas = document.createElement("canvas");
      await scanCanvas(canvas, image, this.config);
      if (options?.signal?.aborted) {
        throw new Error("Aborted");
      }

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob failed"));
          }
        }, this.config.output_format)
      );
      const height = canvas.height;
      const width = canvas.width;
      canvas.remove();
      return { blob, height, width };
    }
  }
}
