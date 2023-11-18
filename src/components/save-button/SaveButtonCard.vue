<template>
  <n-card
    size="small"
    class="animated-progress"
    :style="{ '--progress': (progress ?? 0) * 100 + '%' }"
  >
    <n-space justify="space-around" size="large">
      <n-button text @click="download" v-if="pdf">
        <template #icon>
          <n-icon>
            <DocumentDownload />
          </n-icon>
        </template>
        {{ t('actions.downloadScannedPDF') }}
      </n-button>
      <n-button text @click="emit('generate')" :disabled="saving" v-else>
        <template #icon>
          <n-icon>
            <AdfScannerOutlined />
          </n-icon>
        </template>
        <span v-if="saving">{{ t('actions.generating') }}</span>
        <span v-else>{{ t('actions.generateScannedPDF') }}</span>
      </n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NSpace, NIcon, NButton } from 'naive-ui'
import { DocumentDownload } from '@vicons/carbon'
import { AdfScannerOutlined } from '@vicons/material'
import { useI18n } from 'vue-i18n'
import { fileSave } from 'browser-fs-access'

const { t } = useI18n()

const props = defineProps<{
  progress?: number
  saving?: boolean
  pdf?: File
}>()

const emit = defineEmits<{
  (e: 'generate'): void
}>()

const download = async () => {
  if (!props.pdf) return

  await fileSave(props.pdf, {
    fileName: props.pdf.name,
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf'],
    startIn: 'downloads',
    description: 'PDF File',
    id: 'lookscanned'
  })
}
</script>

<style scoped>
.animated-progress::before {
  content: '';
  width: var(--progress);
  height: 3px;
  background-color: var(--n-color-target);

  position: absolute;
  bottom: 0px;

  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
