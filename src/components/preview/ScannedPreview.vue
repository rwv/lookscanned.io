<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import type { PDF } from "@/utils/pdf";

import { processImage } from "@/utils/makeScanned";
import type { ProcessConfig } from "@/utils/makeScanned";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  page: number;
  config: ProcessConfig;
  pdfInstance: PDF;
}>();

const imageSrc = ref("");

// Define Cache Map for Pages
const PDFPageCache = new Map<string, Blob>();

// Watch pdfSource and Page
const cachePageKey = computed(
  () =>
    `${props.pdfInstance.pdfSource}-${props.page}-${JSON.stringify(
      props.config
    )}`
);

const setToProcessPDFImage = async () => {
  // Set to Empty First
  URL.revokeObjectURL(imageSrc.value);
  imageSrc.value = "";

  const page = props.page;
  const pdfInstance = props.pdfInstance;
  const config = JSON.parse(JSON.stringify(props.config)) as ProcessConfig;

  const cachePageKey_ = cachePageKey.value;

  if (PDFPageCache.has(cachePageKey_)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const imgBlob = PDFPageCache.get(cachePageKey_)!;
    const imgSrc = URL.createObjectURL(imgBlob);
    imageSrc.value = imgSrc;
    return;
  }

  const imgBlob = await pdfInstance.renderPage(page);
  const buffer = new Uint8Array(await imgBlob.arrayBuffer());
  const processedImgBuffer = await processImage(buffer, config);
  const processedImgBlob = new Blob([processedImgBuffer], {
    type: "image/png",
  });
  const processedImgSrc = URL.createObjectURL(processedImgBlob);
  PDFPageCache.set(cachePageKey_, processedImgBlob);

  // When pdf config page are same
  if (cachePageKey_ == cachePageKey.value) {
    imageSrc.value = processedImgSrc;
  }
};

onMounted(setToProcessPDFImage);

watch(cachePageKey, setToProcessPDFImage);
</script>
