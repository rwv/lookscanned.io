import { combineImagesToPdf } from "../combineImagesToPdf";

onmessage = function (e) {
  console.log("Worker combineImagesToPdf: Received message from main script");
  const imageArrayBufferViews = e.data.imageArrayBufferViews;
  combineImagesToPdf(imageArrayBufferViews).then((abv) => {
    postMessage(abv);
  });
};
