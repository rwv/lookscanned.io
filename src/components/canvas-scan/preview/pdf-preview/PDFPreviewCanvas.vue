<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from "vue";
import { computedAsync } from "@vueuse/core";
import { standardFontDataFactory } from "@/utils/pdf/standardFontDataFactory";
import { getDocument } from "@/utils/pdf/getDocument";
import { drawOnCanvas } from "@/utils/pdf/draw-on-canvas";

const canvas = ref<HTMLCanvasElement | null>(null);
const controller = ref<AbortController>(new AbortController());

const props = defineProps<{
  pdf: Blob;
  page: number;
  scale: number;
}>();

const page = toRef(props, "page");
const scale = toRef(props, "scale");

const pdfDocument = computedAsync(async () => {
  const array = new Uint8Array(await props.pdf.arrayBuffer());
  const pdfDocument = await getDocument({
    data: array,
    StandardFontDataFactory: standardFontDataFactory,
  }).promise;
  return () => pdfDocument;
});

const draw = async () => {
  if (!canvas.value) return;
  if (!pdfDocument.value) return;

  canvas.value.getContext("2d")?.reset();
  controller.value.abort();
  controller.value = new AbortController();

  await drawOnCanvas(
    canvas.value,
    pdfDocument.value(),
    props.page,
    props.scale,
    {
      signal: controller.value.signal,
    }
  );
};

watch(page, draw);
watch(scale, draw);
watch(pdfDocument, draw);
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
}
</style>
