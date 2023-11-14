import type { Ref } from "vue";
import { get } from "@vueuse/core";

interface PDFRenderer {
  renderPage(
    page: number,
    scale: number
  ): Promise<{
    blob: Blob;
  }>;
  getNumPages(): Promise<number>;
}

interface ScanRenderer {
  renderPage(image: Blob): Promise<{
    blob: Blob;
    height: number;
    width: number;
  }>;
}

export function useSaveScannedPDF(
  pdfRenderer: PDFRenderer | undefined | Ref<PDFRenderer | undefined>,
  scanRenderer: ScanRenderer | undefined | Ref<ScanRenderer | undefined>,
  scale: Ref<number> | number
) {
  const save = async () => {
    const pdf = get(pdfRenderer);
    const scan = get(scanRenderer);
    const scale_ = get(scale);

    if (!pdf || !scan) {
      throw new Error("No PDF or Scan Renderer");
    }

    const numPages = await pdf.getNumPages();
    console.log(`Number of pages: ${numPages} at scale ${scale_}x`);

    // generate pdf pages 1...n
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);

    const pdfPages = await Promise.all(
      pages.map(async (page) => {
        const { blob } = await pdf.renderPage(page, scale_);
        return blob;
      })
    );

    // generate scan pages
    const scanPages = await Promise.all(
      pdfPages.map(async (pdfPage) => {
        const info = await scan.renderPage(pdfPage);
        return { ...info, dpi: scale_ * 72 };
      })
    );

    // generate pdf from scan pages
    const { imagesToPDF } = await import("@/utils/images-to-pdf");
    const pdfDocument = await imagesToPDF(scanPages);

    return pdfDocument;
  };

  return { save };
}
