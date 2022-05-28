<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import type { PDF } from "@/utils/pdf";

import type { ProcessConfig } from "@/utils/makeScanned";
import type { Scan } from "@/utils/makeScanned";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  page: number;
  config: ProcessConfig;
  pdfInstance: PDF;
  scanInstance: Scan;
}>();

const imageSrc = ref("");

// Watch pdfSource and Page
const refKey = computed(() => `${props.scanInstance.id}-${props.page}`);

const setToProcessPDFImage = async () => {
  // Set to Empty First
  URL.revokeObjectURL(imageSrc.value);
  imageSrc.value = "";

  const page = props.page;
  const refKey_ = refKey.value;

  const blob = await props.scanInstance.getImageBlob(page);
  const imgSrc = URL.createObjectURL(blob);

  // When pdf config page are same
  if (refKey_ == refKey.value) {
    imageSrc.value = imgSrc;
  }
};

onMounted(setToProcessPDFImage);

watch(refKey, setToProcessPDFImage);
</script>
