<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from "vue";
import { renderPage, getPdfDocument } from "@/utils/pdf";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  pdfSource: string;
  page: number;
}>();

const { page, pdfSource } = toRefs(props);

const imageSrc = ref("");

type PDFDocumentProxy = Awaited<ReturnType<typeof getPdfDocument>>;

// Define Cache Map for PDF Document and Pagfes
const PDFDocumentCache = new Map<string, PDFDocumentProxy>();
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
  const pdfDocument =
    PDFDocumentCache.get(pdfSource) ?? (await getPdfDocument(pdfSource, false));
  if (!PDFDocumentCache.has(pdfSource)) {
    PDFDocumentCache.set(pdfSource, pdfDocument);
  }

  const imgBlob = await renderPage(pdfDocument, page);
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
