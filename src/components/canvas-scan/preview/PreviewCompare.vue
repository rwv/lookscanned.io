<template>
  <SideBySidePreview>
    <template #pdf>
      <ImagePreview :image="image.blob" v-if="image" />
    </template>
  </SideBySidePreview>
</template>

<script lang="ts" setup>
import SideBySidePreview from "./SideBySidePreview.vue";
import ImagePreview from "./ImagePreview.vue";
import { ref } from "vue";
import { computedAsync } from "@vueuse/core";

const page = ref(1);

interface PDFRenderer {
  renderPage(
    page: number,
    scale: number
  ): Promise<{
    blob: Blob;
    height: number;
    width: number;
  }>;
  getNumPages(): Promise<number>;
}

const props = defineProps<{
  pdfRenderer?: PDFRenderer;
  scale: number;
}>();

const image = computedAsync(async () => {
  if (!props.pdfRenderer)
    return {
      blob: undefined,
      height: undefined,
      width: undefined,
    };

  const { blob, height, width } = await props.pdfRenderer.renderPage(
    page.value,
    props.scale
  );
  return {
    blob,
    height,
    width,
  };
});
</script>
