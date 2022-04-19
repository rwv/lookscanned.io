import { processImage } from "../processImage";

onmessage = function (e) {
  console.log("Message received from main script");
  const imageArrayBufferView = e.data.imageArrayBufferView;
  const config = e.data.config;
  processImage(imageArrayBufferView, config).then((abv) => {
    postMessage(abv, [abv.buffer]);
  });
};
