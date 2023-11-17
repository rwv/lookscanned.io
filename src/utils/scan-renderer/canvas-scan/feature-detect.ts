export function featureDetect(): boolean {
  const canvasMethods = [
    "fillStyle",
    "fillRect",
    "filter",
    "translate",
    "rotate",
    "drawImage",
    "strokeStyle",
    "lineWidth",
    "strokeRect",
  ];

  // check CanvasRenderingContext2D.prototype
  const canvasProto = CanvasRenderingContext2D.prototype;
  for (const method of canvasMethods) {
    if (!(method in canvasProto)) {
      return false;
    }
  }

  return true;
}
