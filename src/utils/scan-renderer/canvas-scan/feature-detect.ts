export function featureDetect(): boolean {
  const windowObjects = [
    'OffscreenCanvas',
    'createImageBitmap',
    'Worker',
    'CanvasRenderingContext2D',
    'OffscreenCanvasRenderingContext2D'
  ]
  for (const object of windowObjects) {
    if (!(object in window)) {
      return false
    }
  }

  const canvasMethods = [
    'fillStyle',
    'fillRect',
    'filter',
    'translate',
    'rotate',
    'drawImage',
    'strokeStyle',
    'lineWidth',
    'strokeRect'
  ]

  // check CanvasRenderingContext2D.prototype
  const canvasProto = CanvasRenderingContext2D.prototype
  for (const method of canvasMethods) {
    if (!(method in canvasProto)) {
      return false
    }
  }

  // check OffscreenCanvas.prototype
  const offscreenCanvasProto = OffscreenCanvasRenderingContext2D.prototype
  for (const method of canvasMethods) {
    if (!(method in offscreenCanvasProto)) {
      return false
    }
  }

  return true
}
