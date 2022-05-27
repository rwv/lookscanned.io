<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from "vue";
import { PDF } from "@/utils/pdf";

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

// Define Cache Map for PDF Document and Pagfes
const PDFCache = new Map<string, PDF>();
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

  const pdfInstance = PDFCache.get(pdfSource) ?? new PDF(pdfSource);
  if (!PDFCache.has(pdfSource)) {
    PDFCache.set(pdfSource, pdfInstance);
  }

  const imgBlob = await pdfInstance.renderPage(page);
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
