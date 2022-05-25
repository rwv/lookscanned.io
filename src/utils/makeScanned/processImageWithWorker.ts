import type { processImageFuncType } from "./processImage";

import type { ProcessConfig } from "./processConfig";

export type ToWorkerMessage = {
  imageArrayBufferView: ArrayBufferView;
  config: ProcessConfig;
};

export type FromWorkerMessge = ArrayBufferView;

export const processImageWithWorker: processImageFuncType = async function (
  imageArrayBufferView,
  config
) {
  if (window.Worker) {
    return await new Promise((resolve) => {
      const magicaWorker = new Worker(
        new URL("./worker/processImage.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
      console.log("start Worker");
      magicaWorker.onmessage = (e) => {
        const abv = e.data as FromWorkerMessge;
        magicaWorker.terminate();
        resolve(abv);
      };
      magicaWorker.postMessage(
        {
          imageArrayBufferView,
          config,
        } as ToWorkerMessage,
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
