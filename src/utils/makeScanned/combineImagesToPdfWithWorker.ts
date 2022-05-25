import type { combineImagesToPdfFuncType } from "./combineImagesToPdf";

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
