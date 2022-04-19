import { processImage } from "./processImage";

const workerPath = "/vendors/makeScanned/worker/processImage.worker.js";

export const processImageWithWorker: typeof processImage = async function (
  imageArrayBufferView,
  config
) {
  if (window.Worker) {
    return await new Promise((resolve) => {
      const magicaWorker = new Worker(workerPath);
      console.log("start Worker");
      magicaWorker.onmessage = (e) => {
        const abv: ArrayBufferView = e.data;
        magicaWorker.terminate();
        resolve(abv);
      };
      magicaWorker.postMessage(
        {
          imageArrayBufferView,
          config,
        },
        [imageArrayBufferView.buffer]
      );
    });
  } else {
    return await processImage(imageArrayBufferView, config);
  }
};
