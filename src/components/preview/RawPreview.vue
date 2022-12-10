<template>
  <PreviewHolder :src="imageSrc" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useObjectUrl, computedAsync } from "@vueuse/core";
import type { PDF } from "@/utils/pdf";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  page: number;
  pdfInstance: PDF;
}>();

const evaluating = ref(false);
const imageBlob = computedAsync(
  async () => {
    const { blob } = await props.pdfInstance.renderPage(props.page);
    return blob;
  },
  undefined,
  evaluating
);
const blobURL = useObjectUrl(imageBlob);
const imageSrc = computed(() => (evaluating.value ? undefined : blobURL.value));
</script>
