import { ref, computed } from "vue";
import { makeScannedPdf } from "@/utils/makeScanned";
import { fileSave } from "browser-fs-access";
import type { ProcessConfig } from "@/utils/makeScanned";

export function GenerateScannedPDFSetup() {
  const renderedPDF = ref(0);
  const renderedPDFLength = ref(0);
  const scannedPDF = ref(0);
  const scannedPDFLength = ref(0);
  const status = ref(
    "not-started" as "not-started" | "processing" | "error" | "finished"
  );
  const error_message = ref("");

  const downloadScannedPDF = async (
    pdfSource: string,
    config: ProcessConfig
  ) => {
    renderedPDF.value = 0;
    renderedPDFLength.value = 0;
    scannedPDF.value = 0;
    scannedPDFLength.value = 0;

    const pdfCallback = (pageNum: number, totalPageNum: number) => {
      console.log(`rendered page ${pageNum}/${totalPageNum}`);
      renderedPDF.value += 1;
      renderedPDFLength.value = totalPageNum;
    };

    const processCallback = (pageNum: number, totalPageNum: number) => {
      console.log(`processed page ${pageNum}/${totalPageNum}`);
      scannedPDF.value += 1;
      scannedPDFLength.value = totalPageNum;
    };

    status.value = "processing";

    const config_ = JSON.parse(JSON.stringify(config)) as ProcessConfig;
    try {
      const blobPromise = makeScannedPdf(
        pdfSource,
        config_,
        pdfCallback,
        processCallback
      );
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
      console.error(e);
      error_message.value = JSON.stringify(e);
      status.value = "error";
      return;
    }
  };

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
