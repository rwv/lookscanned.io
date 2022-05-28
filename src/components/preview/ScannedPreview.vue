<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import type { Scan } from "@/utils/scan";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  page: number;
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

  try {
    const blob = await props.scanInstance.getImageBlob(page);
    const imgSrc = URL.createObjectURL(blob);
    // When pdf config page are same
    if (refKey_ == refKey.value) {
      imageSrc.value = imgSrc;
    }
  } catch (e) {
    console.error(e);
  }
};

onMounted(setToProcessPDFImage);

watch(refKey, setToProcessPDFImage);
</script>
