<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from "vue";
import { renderPage, getPdfDocument } from "@/utils/pdf";

import { processImage } from "@/utils/makeScanned";
import type { ProcessConfig } from "@/utils/makeScanned";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  pdfSource: string;
  page: number;
  config: ProcessConfig;
}>();

const { page, pdfSource, config } = toRefs(props);

const imageSrc = ref("");

type PDFDocumentProxy = Awaited<ReturnType<typeof getPdfDocument>>;

// Define Cache Map for PDF Document and Pagfes
const PDFDocumentCache = new Map<string, PDFDocumentProxy>();
const PDFPageCache = new Map<string, string>();

const setToProcessPDFImage = async () => {
  const page = props.page;
  const pdfSource = props.pdfSource;
  const config = JSON.parse(JSON.stringify(props.config)) as ProcessConfig;

  const cachePageKey = `${pdfSource}-${page}-${JSON.stringify(config)}`;

  if (PDFPageCache.has(cachePageKey)) {
    imageSrc.value = PDFPageCache.get(cachePageKey) as string;
    return;
  }

  // Set to Empty First
  imageSrc.value = "";

  // Read pdf Document from Cache
  const pdfDocument =
    PDFDocumentCache.get(pdfSource) ?? (await getPdfDocument(pdfSource, false));
  if (!PDFDocumentCache.has(pdfSource)) {
    PDFDocumentCache.set(pdfSource, pdfDocument);
  }

  const imgBlob = await renderPage(pdfDocument, page);
  const buffer = new Uint8Array(await imgBlob.arrayBuffer());
  const processedImgBuffer = await processImage(buffer, config);
  const processedImgBlob = new Blob([processedImgBuffer], {
    type: "image/png",
  });
  const processedImgSrc = URL.createObjectURL(processedImgBlob);

  imageSrc.value = processedImgSrc;
  PDFPageCache.set(cachePageKey, processedImgSrc);
};

onMounted(setToProcessPDFImage);

watch(page, setToProcessPDFImage);
watch(config, setToProcessPDFImage, { deep: true });
watch(pdfSource, () => {
  setToProcessPDFImage();
});
</script>
