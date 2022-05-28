import { processImage } from "../processImage";

import type {
  ToWorkerMessage,
  FromWorkerMessge,
} from "../processImageWithWorker";

import { getLogger } from "@/utils/log";

const logger = getLogger(["processImage", "webWorker"]);

onmessage = function (e) {
  const data = e.data as ToWorkerMessage;
  const imageArrayBufferView = data.imageArrayBufferView;
  const config = data.config;
  logger.log(
    `Image received from main, size: ${imageArrayBufferView.byteLength}`
  );
  logger.log(`Config: ${JSON.stringify(config)}`);
  (async () => {
    logger.log("Start processing image");
    const result = await processImage(imageArrayBufferView, config);
    logger.log(`Finish processing image, size: ${result.byteLength}`);
    postMessage(result as FromWorkerMessge, [result.buffer]);
    logger.log("Send processed image to main");
  })();
};
