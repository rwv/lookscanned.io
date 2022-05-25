import type { combineImagesToPdfFuncType } from "./combineImagesToPdf";

export type ToWorkerMessage = {
  imageArrayBufferViews: ArrayBufferView[];
};

export const combineImagesToPdfWithWorker: combineImagesToPdfFuncType =
  async function (imageArrayBufferViews) {
    if (window.Worker) {
      return await new Promise((resolve) => {
        const magicaWorker = new Worker(
          new URL("./worker/combineImagesToPdf.worker.ts", import.meta.url),
          {
            type: "module",
          }
        );

        // Receive message
        magicaWorker.onmessage = (e) => {
          const abv: Blob = e.data;
          magicaWorker.terminate();
          resolve(abv);
        };

        // Send message
        const message = {
          imageArrayBufferViews,
        } as ToWorkerMessage;
        magicaWorker.postMessage(message);
      });
    } else {
      const combineImagesToPdf = (await import(
        "./combineImagesToPdf"
      )) as unknown as combineImagesToPdfFuncType;
      return await combineImagesToPdf(imageArrayBufferViews);
    }
  };
