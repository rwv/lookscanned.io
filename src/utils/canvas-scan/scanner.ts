import { scanCanvas } from "./scan";
import type { ScanConfig } from "./types";

interface ScanRenderer {
  renderPage(image: Blob): Promise<{
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

  async renderPage(image: Blob): Promise<{
    blob: Blob;
    height: number;
    width: number;
  }> {
    const canvas = document.createElement("canvas");
    await scanCanvas(canvas, image, this.config);
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
