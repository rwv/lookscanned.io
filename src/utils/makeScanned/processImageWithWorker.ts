import type { processImageFuncType } from "./processImage";

export const processImageWithWorker: processImageFuncType = async function (
  imageArrayBufferView,
  config
) {
  if (window.Worker) {
    return await new Promise((resolve) => {
      const magicaWorker = new Worker(
        new URL("./worker/processImage.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
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
    const processImage = (await import(
      "./processImage"
    )) as unknown as processImageFuncType;
    return await processImage(imageArrayBufferView, config);
  }
};
