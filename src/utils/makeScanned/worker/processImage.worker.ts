import { processImage } from "../processImage";

import type {
  ToWorkerMessage,
  FromWorkerMessge,
} from "../processImageWithWorker";

onmessage = function (e) {
  console.log("Message received from main script");
  const data = e.data as ToWorkerMessage;
  const imageArrayBufferView = data.imageArrayBufferView;
  const config = data.config;
  (async () => {
    const result = await processImage(imageArrayBufferView, config);
    postMessage(result as FromWorkerMessge, [result.buffer]);
  })();
};
