<template>
  <SideBySidePreview>
    <template #pdf>
      <ImagePreview :image="image.blob" v-if="image" />
    </template>
    <template #scan>
      <ImagePreview :image="scanImage.blob" v-if="scanImage" />
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

interface ScanRenderer {
  renderPage(image: Blob): Promise<{
    blob: Blob;
    height: number;
    width: number;
  }>;
}

const props = defineProps<{
  pdfRenderer?: PDFRenderer;
  scanRenderer?: ScanRenderer;
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

const scanImage = computedAsync(async () => {
  if (!props.scanRenderer || !image.value.blob) return;

  const { blob, height, width } = await props.scanRenderer.renderPage(
    image.value.blob
  );
  return {
    blob,
    height,
    width,
  };
});
</script>
