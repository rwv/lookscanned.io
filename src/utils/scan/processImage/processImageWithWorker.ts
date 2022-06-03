import type { ScanConfig } from "./config";

export type ToWorkerMessage = {
  imageArrayBufferView: ArrayBufferView;
  config: ScanConfig;
};

export type FromWorkerMessge = ArrayBufferView;

import { getLogger } from "@/utils/log";

const logger = getLogger(["processImage"]);

export const processImageWithWorker = async function (
  imageArrayBufferView: ArrayBufferView,
  config: ScanConfig,
  signal?: AbortSignal
): Promise<ArrayBufferView> {
  if (window.Worker) {
    logger.log("Web Worker is supported by your browser!");
    return await new Promise((resolve, reject) => {
      const magicaWorker = new Worker(
        new URL("./processImage.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      if (signal) {
        signal.addEventListener("abort", () => {
          logger.debug("Abort signal received");
          magicaWorker.terminate();
          reject(new Error("Aborted"));
        });
      }

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
    const processImage = (await import("./processImage")).processImage;
    return await processImage(imageArrayBufferView, config);
  }
};
