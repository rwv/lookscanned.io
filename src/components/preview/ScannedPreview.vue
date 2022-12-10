<template>
  <PreviewHolder :imgSrc="imageSrc" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useObjectUrl, computedAsync } from "@vueuse/core";

import type { Scan } from "@/utils/scan";

import PreviewHolder from "./PreviewHolder.vue";

const props = defineProps<{
  page: number;
  scanInstance: Scan;
}>();

const evaluating = ref(false);
const imageBlob = computedAsync(
  async () => {
    const blob = await props.scanInstance.getImageBlob(props.page);
    return blob;
  },
  undefined,
  evaluating
);
const blobURL = useObjectUrl(imageBlob);
const imageSrc = computed(() => (evaluating.value ? undefined : blobURL.value));
</script>
