import { main } from "./magica";

import { generateIFile } from "./generateIFile";

import type { ScanConfig } from "./config";
import { getProcessCommand } from "./getProcessCommand";

export type processImageFuncType = (
  imageBlob: Blob,
  config: ScanConfig
) => Promise<Blob>;

export const processImage: processImageFuncType = async function (
  imageBlob,
  config
) {
  const inputFilename = "image.png";
  const outputFilename = "foo.png";

  const buffer = new Uint8Array(await imageBlob.arrayBuffer());

  const file = generateIFile(buffer, inputFilename);

  const result = await main({
    debug: false,
    command: getProcessCommand(config, inputFilename, outputFilename),
    inputFiles: [file],
  });

  const outputFile = result.outputFiles[0];
  const outputFileBuffer = outputFile.content;
  const outputFileBlob = new Blob([outputFileBuffer], {
    type: "image/png",
  });

  return outputFileBlob;
};
