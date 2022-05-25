import { combineImagesToPdf } from "../combineImagesToPdf";

import type {
  ToWorkerMessage,
  FromWorkerMessge,
} from "../combineImagesToPdfWithWorker";

onmessage = function (e) {
  console.log("Worker combineImagesToPdf: Received message from main script");
  const data = e.data as ToWorkerMessage;
  const imageArrayBufferViews = data.imageArrayBufferViews;

  async () => {
    const blob = await combineImagesToPdf(imageArrayBufferViews);
    postMessage(blob as FromWorkerMessge);
  };
};
