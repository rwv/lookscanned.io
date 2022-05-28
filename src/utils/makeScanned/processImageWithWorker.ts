import type { processImageFuncType } from "./processImage";

import type { ScanConfig } from "./ScanConfig";

export type ToWorkerMessage = {
  imageArrayBufferView: ArrayBufferView;
  config: ScanConfig;
};

export type FromWorkerMessge = ArrayBufferView;

import { getLogger } from "@/utils/log";

const logger = getLogger(["processImage"]);

export const processImageWithWorker: processImageFuncType = async function (
  imageArrayBufferView,
  config
) {
  if (window.Worker) {
    logger.log("Web Worker is supported by your browser!");
    return await new Promise((resolve) => {
      const magicaWorker = new Worker(
        new URL("./worker/processImage.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
      logger.log("Start Web Worker");
      magicaWorker.onmessage = (e) => {
        const abv = e.data as FromWorkerMessge;
        logger.log("Get Image from Web Worker");
        magicaWorker.terminate();
        logger.log("Terminate Web Worker");
        resolve(abv);
      };
      magicaWorker.postMessage(
        {
          imageArrayBufferView,
          config,
        } as ToWorkerMessage,
        [imageArrayBufferView.buffer]
      );
      logger.log("Send Origin Image to Web Worker");
    });
  } else {
    logger.log(
      "Web Worker is not supported by your browser, fallback to main thread."
    );
    const processImage = (await import(
      "./processImage"
    )) as unknown as processImageFuncType;
    return await processImage(imageArrayBufferView, config);
  }
};
