import { ref, computed } from "vue";
import { fileSave } from "browser-fs-access";
import type { Scan } from "@/utils/makeScanned";

import { getLogger } from "@/utils/log";

const logger = getLogger(["scan"]);

export function GenerateScannedPDFSetup() {
  const renderedPDF = ref(0);
  const renderedPDFLength = ref(0);
  const scannedPDF = ref(0);
  const scannedPDFLength = ref(0);
  const status = ref(
    "not-started" as "not-started" | "processing" | "error" | "finished"
  );
  const error_message = ref("");

  const downloadScannedPDF = async (scanInstance: Scan) => {
    renderedPDF.value = 0;
    renderedPDFLength.value = 0;
    scannedPDF.value = 0;
    scannedPDFLength.value = 0;

    const processCallback = (pageNum: number, totalPageNum: number) => {
      logger.log(`Processed page ${pageNum}/${totalPageNum}`);
      scannedPDF.value += 1;
      scannedPDFLength.value = totalPageNum;
    };

    status.value = "processing";

    try {
      logger.log("Start generating scanned PDF");
      const blobPromise = scanInstance.getScannedPDF(processCallback);
      await fileSave(blobPromise, {
        fileName: "scanned.pdf",
        extensions: [".pdf"],
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

  // statusText computed
  const statusText = computed(() => {
    if (status.value === "finished") {
      return "Finished";
    }
    if (status.value === "error") {
      return `Error: ${error_message.value}`;
    }

    if (renderedPDFLength.value > 0) {
      if (renderedPDF.value < renderedPDFLength.value) {
        // Not finished rendering
        return `Rendering PDF pages: ${renderedPDF.value}/${renderedPDFLength.value}`;
      } else {
        if (scannedPDF.value == 0) {
          return "Rendering finished, waiting for processing";
        }
      }
    }

    if (scannedPDF.value < scannedPDFLength.value) {
      return `Processing PDF pages: ${scannedPDF.value}/${scannedPDFLength.value}`;
    }
    if (
      scannedPDF.value === scannedPDFLength.value &&
      scannedPDFLength.value > 0
    ) {
      return "Combining PDF pages";
    }
    if (status.value === "processing") {
      return `Processing`;
    }
    return "Not Started";
  });

  return {
    renderedPDF,
    renderedPDFLength,
    scannedPDF,
    scannedPDFLength,
    statusText,
    status,
    downloadScannedPDF,
  };
}
