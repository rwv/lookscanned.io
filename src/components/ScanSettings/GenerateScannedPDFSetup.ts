import { ref, computed } from "vue";
import { fileSave } from "browser-fs-access";
import type { Scan } from "@/utils/scan";

import { getLogger } from "@/utils/log";

const logger = getLogger(["scan"]);

export function GenerateScannedPDFSetup() {
  const scannedPDF = ref(0);
  const scannedPDFLength = ref(0);
  const status = ref(
    "not-started" as "not-started" | "processing" | "error" | "finished"
  );
  const error_message = ref("");

  const downloadScannedPDF = async (scanInstance: Scan) => {
    status.value = "processing";
    scannedPDF.value = 0;
    scannedPDFLength.value = 0;

    const processCallback = (pageNum: number, totalPageNum: number) => {
      logger.log(`Processed page ${pageNum}/${totalPageNum}`);
      scannedPDF.value += 1;
      scannedPDFLength.value = totalPageNum;
    };

    try {
      logger.log("Start generating scanned PDF");
      const blobPromise = scanInstance.getScannedPDF(processCallback);
      const originFilename = scanInstance.pdfInstance.pdfFilename;
      const filename = `${originFilename.replace(/\.[^/.]+$/, "")}-scan.pdf`;
      await fileSave(blobPromise, {
        fileName: filename,
        extensions: [".pdf"],
        mimeTypes: ["application/pdf"],
        startIn: "downloads",
        id: "lookscanned",
      });
      status.value = "finished";
      return;
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        status.value = "finished";
        return;
      }
      logger.error(e);
      error_message.value = JSON.stringify(e);
      status.value = "error";
      return;
    }
  };

  const processStatusText = computed(() => {
    if (scannedPDF.value < scannedPDFLength.value) {
      return `Processing PDF pages: ${scannedPDF.value}/${scannedPDFLength.value}`;
    }
    if (
      scannedPDF.value === scannedPDFLength.value &&
      scannedPDFLength.value > 0
    ) {
      return "Combining PDF pages";
    }
    return "Processing";
  });

  // statusText computed
  const statusText = computed(() => {
    switch (status.value) {
      case "not-started":
        return "Not started";
      case "processing":
        return processStatusText.value;
      case "error":
        return `Error: ${error_message.value}`;
      case "finished":
        return "Finished";
    }

    return "";
  });

  return {
    statusText,
    status,
    downloadScannedPDF,
  };
}
