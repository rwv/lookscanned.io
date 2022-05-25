import { combineImagesToPdf } from "../combineImagesToPdf";

import type { ToWorkerMessage } from "../combineImagesToPdfWithWorker";

onmessage = function (e) {
  console.log("Worker combineImagesToPdf: Received message from main script");
  const data = e.data as ToWorkerMessage;
  const imageArrayBufferViews = data.imageArrayBufferViews;
  combineImagesToPdf(imageArrayBufferViews).then((abv) => {
    postMessage(abv);
  });
};
