import type { combineImagesToPdfFuncType } from "./combineImagesToPdf";

const workerPath = "/vendors/makeScanned/worker/combineImagesToPdf.worker.js";

export const combineImagesToPdfWithWorker: combineImagesToPdfFuncType =
  async function (imageArrayBufferViews) {
    if (window.Worker) {
      return await new Promise((resolve) => {
        const magicaWorker = new Worker(workerPath);
        magicaWorker.onmessage = (e) => {
          const abv: Blob = e.data;
          magicaWorker.terminate();
          resolve(abv);
        };
        magicaWorker.postMessage({
          imageArrayBufferViews,
        });
      });
    } else {
      const combineImagesToPdf = (await import(
        "./combineImagesToPdf"
      )) as unknown as combineImagesToPdfFuncType;
      return await combineImagesToPdf(imageArrayBufferViews);
    }
  };
