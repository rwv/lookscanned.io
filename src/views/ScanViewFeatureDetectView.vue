<template>
  <CanvasScanView v-if="supportCanvasScan" />
  <MagicaScanView v-else />
</template>

<script lang="ts" setup>
import { featureDetect } from '@/utils/scan-renderer/canvas-scan'
import CanvasScanView from './CanvasScanView.vue'
import MagicaScanView from './MagicaScanView.vue'

const supportCanvasScan = featureDetect()
</script>
