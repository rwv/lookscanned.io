import { processImage } from "./processImage";

onmessage = async function (
  e: MessageEvent<Parameters<typeof processImage>[0]>
) {
  postMessage(await processImage(e.data));
};
