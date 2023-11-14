import type { ScanConfig } from "./types";
import { getNoiseSVG } from "./noise-svg";

export async function scanCanvas(
  canvas_: HTMLCanvasElement | OffscreenCanvas,
  page: Blob,
  config: ScanConfig,
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) {
    throw new Error("Aborted");
  }

  // Note: Hack to get around TS error
  const canvas = canvas_ as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) {
    throw new Error("Canvas not supported");
  }

  // load blob into image
  const img = await createImageBitmap(page);
  if (signal?.aborted) {
    throw new Error("Aborted");
  }

  const width = img.width;
  const height = img.height;

  canvas.width = width;
  canvas.height = height;

  // fill white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // add blur
  ctx.filter = `blur(${config.blur}px)`;
  if (config.colorspace === "gray") {
    ctx.filter += " grayscale(1)";
  }

  // rotate
  ctx.translate(width / 2, height / 2);
  ctx.rotate(
    ((config.rotate + config.rotate_var * Math.random()) * Math.PI) / 180
  );
  ctx.translate(-width / 2, -height / 2);

  ctx.drawImage(img, 0, 0);

  if (config.noise !== 0) {
    const noiseSVG = getNoiseSVG(config.noise);
    const noiseSVGBlob = new Blob([noiseSVG], { type: "image/svg+xml" });
    const noiseSVGURL = URL.createObjectURL(noiseSVGBlob);

    const noiseImg = new Image();
    noiseImg.src = noiseSVGURL;
    await new Promise((resolve) => (noiseImg.onload = resolve));
    if (signal?.aborted) {
      throw new Error("Aborted");
    }

    // add noise
    ctx.drawImage(noiseImg, -width, -height, width * 2, height * 2);
  }

  if (config.border) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }
}
