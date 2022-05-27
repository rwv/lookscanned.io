<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from "vue";
import { PDF } from "@/utils/pdf";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  pdfSource: string;
  page: number;
}>();

const { page, pdfSource } = toRefs(props);

const imageSrc = ref("");

// Define Cache Map for PDF Document and Pagfes
const PDFCache = new Map<string, PDF>();
const PDFPageCache = new Map<string, string>();

const setToRawPDFImage = async () => {
  const page = props.page;
  const pdfSource = props.pdfSource;
  const cachePageKey = `${pdfSource}-${page}`;

  if (PDFPageCache.has(cachePageKey)) {
    imageSrc.value = PDFPageCache.get(cachePageKey) as string;
    return;
  }

  // Set to Empty First
  imageSrc.value = "";

  // Read pdf Document from Cache
  const pdfInstance = PDFCache.get(pdfSource) ?? new PDF(pdfSource);
  if (!PDFCache.has(pdfSource)) {
    PDFCache.set(pdfSource, pdfInstance);
  }

  const imgBlob = await pdfInstance.renderPage(page);
  const imgSrc = URL.createObjectURL(imgBlob);
  imageSrc.value = imgSrc;
  PDFPageCache.set(cachePageKey, imgSrc);
};

onMounted(setToRawPDFImage);

watch(page, setToRawPDFImage);
watch(pdfSource, () => {
  setToRawPDFImage();
});
</script>
