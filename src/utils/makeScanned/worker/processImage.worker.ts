import { processImage } from "../processImage";

onmessage = function (e) {
  console.log("Message received from main script");
  const imageArrayBufferView = e.data.imageArrayBufferView;
  const config = e.data.config;
  (async () => {
    const result = await processImage(imageArrayBufferView, config);
    postMessage(result, [result.buffer]);
  })();
};
