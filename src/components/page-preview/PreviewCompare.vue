<template>
  <n-space vertical>
    <SideBySidePreview>
      <template #pdf>
        <ImagePreview :image="image?.blob" />
      </template>
      <template #scan>
        <ImagePreview
          :image="scanning ? undefined : scanImage?.blob"
          :height="image?.height"
          :width="image?.width"
        />
      </template>
    </SideBySidePreview>
    <PreviewPagination v-model:page="page" :numPages="numPages" v-if="numPages >= 2" />
  </n-space>
</template>

<script lang="ts" setup>
import SideBySidePreview from './SideBySidePreview.vue'
import ImagePreview from './ImagePreview.vue'
import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import PreviewPagination from './PreviewPagination.vue'
import { NSpace } from 'naive-ui'

const page = ref(1)
const scanning = ref(false)

interface PDFRenderer {
  renderPage(
    page: number,
    scale: number
  ): Promise<{
    blob: Blob
    width: number
    height: number
  }>
  getNumPages(): Promise<number>
}

interface ScanRenderer {
  renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal
    }
  ): Promise<{
    blob: Blob
  }>
}

const props = defineProps<{
  pdfRenderer?: PDFRenderer
  scanRenderer?: ScanRenderer
  scale: number
}>()

const image = computedAsync(async () => {
  if (!props.pdfRenderer)
    return {
      blob: undefined,
      height: undefined,
      width: undefined
    }

  const { blob, width, height } = await props.pdfRenderer.renderPage(page.value, props.scale)
  return {
    blob,
    width,
    height
  }
})

let controller = new AbortController()

const scanImage = computedAsync(
  async () => {
    controller.abort()
    controller = new AbortController()
    if (!props.scanRenderer || !image.value.blob) return

    const { blob } = await props.scanRenderer.renderPage(image.value.blob, {
      signal: controller.signal
    })
    return {
      blob
    }
  },
  undefined,
  scanning
)

const numPages = computedAsync(async () => {
  page.value = 1
  if (!props.pdfRenderer) return 1
  return await props.pdfRenderer.getNumPages()
}, 1)
</script>
