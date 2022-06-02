<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { PDF } from "@/utils/pdf";

import PreviewHolder from "./PreviewHolder.vue";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  page: number;
  pdfInstance: PDF;
}>();

const imageSrc = ref("");

const refKey = computed(() => `${props.pdfInstance.id}-${props.page}`);

const setToRawPDFImage = async () => {
  URL.revokeObjectURL(imageSrc.value);
  imageSrc.value = "";
  const refKey_ = refKey.value;
  const { blob } = await props.pdfInstance.renderPage(props.page);

  if (refKey_ == refKey.value) {
    const imgSrc = URL.createObjectURL(blob);
    imageSrc.value = imgSrc;
  }
};

onMounted(setToRawPDFImage);

// Watch pdfSource and Page
const pdfSourceAndPage = computed(
  () => `${props.pdfInstance.pdfSource}_${props.page}`
);

watch(pdfSourceAndPage, setToRawPDFImage);
</script>
