import type { combineImagesToPdfFuncType } from "./combineImagesToPdf";

export type ToWorkerMessage = {
  imageArrayBufferViews: ArrayBufferView[];
};

export type FromWorkerMessge = Blob;

import { getLogger } from "@/utils/log";

const logger = getLogger(["combineImages"]);

export const combineImagesToPdfWithWorker = async function (
  imageArrayBufferViews: ArrayBufferView[],
  signal?: AbortSignal
): Promise<Blob> {
  if (window.Worker) {
    logger.log("Web Worker is supported by your browser!");

    return await new Promise((resolve, reject) => {
      const magicaWorker = new Worker(
        new URL("./worker/combineImagesToPdf.worker.ts", import.meta.url),
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

      // Receive message
      magicaWorker.onmessage = (e) => {
        const blob = e.data as FromWorkerMessge;
        logger.log(`Get PDF Blob from Web Worker, ${blob.size} bytes`);
        magicaWorker.terminate();
        logger.log("Terminate Web Worker");
        resolve(blob);
      };

      // Send message
      const message = {
        imageArrayBufferViews,
      } as ToWorkerMessage;
      magicaWorker.postMessage(message);
      logger.log("Send Images to Web Worker");
    });
  } else {
    logger.log(
      "Web Worker is not supported by your browser, fallback to main thread."
    );
    const combineImagesToPdf = (await import(
      "./combineImagesToPdf"
    )) as unknown as combineImagesToPdfFuncType;
    return await combineImagesToPdf(imageArrayBufferViews);
  }
};
