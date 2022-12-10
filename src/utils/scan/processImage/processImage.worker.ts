import { processImage } from "./processImage";

import type {
  ToWorkerMessage,
  FromWorkerMessge,
} from "./processImageWithWorker";

import { getLogger } from "@/utils/log";

const logger = getLogger(["processImage", "webWorker"]);

onmessage = function (e) {
  const data = e.data as ToWorkerMessage;
  const imageBlob = data.imageBlob;
  const config = data.config;
  logger.log(`Image received from main, size: ${imageBlob.size}`);
  logger.log(`Config: ${JSON.stringify(config)}`);
  (async () => {
    logger.log("Start processing image");
    const result = await processImage(imageBlob, config);
    logger.log(`Finish processing image, size: ${result.size}`);
    postMessage(result as FromWorkerMessge);
    logger.log("Send processed image to main");
  })();
};
