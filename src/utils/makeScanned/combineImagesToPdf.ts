import { main } from "./magicaImporter";

import { generateIFile } from "./utils";

export async function combineImagesToPdf(
  imageArrayBufferViews: ArrayBufferView[]
): Promise<Blob> {
  const files = imageArrayBufferViews.map((abv, idx) =>
    generateIFile(abv, `${idx}.png`)
  );

  const filenames = files.map((file) => file.name).join(" ");

  const result = await main({
    debug: true,
    command: `convert ${filenames} document.pdf`,
    inputFiles: files,
  });

  const outputFile = result.outputFiles[0];
  const outputFileContent = outputFile.content;
  const outputFileBlob = new Blob([outputFileContent], {
    type: "application/pdf",
  });

  return outputFileBlob;
}
