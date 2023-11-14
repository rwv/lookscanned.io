import type { ScanConfig } from "./types";
import { getNoiseSVG } from "./noise-svg";

export async function scanCanvas(
  canvas: HTMLCanvasElement,
  page: Blob,
  config: ScanConfig,
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) {
    throw new Error("Aborted");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas not supported");
  }

  // load blob into image
  const img = new Image();
  img.src = URL.createObjectURL(page);
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  if (signal?.aborted) {
    throw new Error("Aborted");
  }

  canvas.width = img.width;
  canvas.height = img.height;

  // fill white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // add blur
  ctx.filter = `blur(${config.blur}px)`;
  if (config.colorspace === "gray") {
    ctx.filter += " grayscale(1)";
  }

  // rotate
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(
    ((config.rotate + config.rotate_var * Math.random()) * Math.PI) / 180
  );
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

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
    ctx.drawImage(
      noiseImg,
      -canvas.width,
      -canvas.height,
      canvas.width * 2,
      canvas.height * 2
    );
  }

  if (config.border) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }
}
