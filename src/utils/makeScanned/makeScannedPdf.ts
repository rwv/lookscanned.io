import { PDF } from "@/utils/pdf";
import type { renderAllPagesCallback } from "@/utils/pdf";

import { processImageWithWorker } from "./processImageWithWorker";
import type { ProcessConfig } from "./processConfig";
import { combineImagesToPdfWithWorker } from "./combineImagesToPdfWithWorker";

import pMap from "p-map";

type ProcessCallbackType = (
  pageNum: number,
  totalPageNum: number,
  pageImage: ArrayBufferView
) => void;

export async function makeScannedPdf(
  pdfSource: string,
  config: ProcessConfig,
  pdfCallback: renderAllPagesCallback,
  processCallback: ProcessCallbackType
) {
  const pdfInstance = new PDF(pdfSource);
  const rawPages = await pdfInstance.renderAllPages(pdfCallback);
  const handleEachPage = async (page: Blob, idx: number) => {
    const buffer = new Uint8Array(await page.arrayBuffer());
    const image = await processImageWithWorker(buffer, config);
    processCallback(idx + 1, rawPages.length, image);
    return image;
  };

  const concurrency = navigator.hardwareConcurrency;
  const processedPages = await pMap(rawPages, handleEachPage, {
    concurrency,
  });

  const pdfDocument = await combineImagesToPdfWithWorker(processedPages);
  return pdfDocument;
}
