import { main } from "./magica";

import { generateIFile } from "./generateIFile";

import type { ScanConfig } from "./config";
import { getProcessCommand } from "./getProcessCommand";

export const processImage = async function (data: {
  image: Blob;
  config: ScanConfig;
}): Promise<Blob> {
  const { image, config } = data;

  const inputFilename = "image.png";
  const outputFilename = "foo.png";

  const buffer = new Uint8Array(await image.arrayBuffer());

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
