import { combineImagesToPdf } from "../combineImagesToPdf";

import type {
  ToWorkerMessage,
  FromWorkerMessge,
} from "../combineImagesToPdfWithWorker";

import { getLogger } from "@/utils/log";

const logger = getLogger(["scan", "imageMagick", "processImage", "webWorker"]);

onmessage = function (e) {
  const data = e.data as ToWorkerMessage;
  const imageArrayBufferViews = data.imageArrayBufferViews;
  logger.log(`${imageArrayBufferViews.length} images received from main`);

  (async () => {
    logger.log("Start combining images");
    const blob = await combineImagesToPdf(imageArrayBufferViews);
    logger.log(`Finish combining images, size: ${blob.size}`);
    postMessage(blob as FromWorkerMessge);
    logger.log("Send processed image to main");
  })();
};
