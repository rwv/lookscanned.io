export const logConfig = {
  pdfjs: {
    background: "#ff2600",
    color: "#fff",
    text: "📃 PDF.js",
  },
  webWorker: {
    background: "#E0E0E0",
    color: "#000",
    text: "⚙️ Web Worker",
  },
  imageMagick: {
    background: "#2A3C93",
    color: "#fff",
    text: "✨ ImageMagick",
  },
  scan: {
    background: "#DCD0FF",
    color: "#222",
    text: "🖨️ Scan",
  },
  processImage: {
    background: "#A2E4B8",
    color: "#333",
    text: "🖼️ Process Image",
  },
  combineImages: {
    background: "#A2E4B8",
    color: "#333",
    text: "📃 Combine Images",
  }
};

export type logType = keyof typeof logConfig;
