<template>
  <n-card>
    <n-space vertical>
      <n-button text @click="onClick">
        <template #icon>
          <n-icon>
            <FolderOpen16Regular />
          </n-icon>
        </template>
        <n-text>
          {{ t('settings.pdfSelectLabel') }}
        </n-text>
      </n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NButton, NIcon, NText, NCard, NSpace } from 'naive-ui'
import { FolderOpen16Regular } from '@vicons/fluent'
import { fileOpen } from 'browser-fs-access'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits<{
  (e: 'update:pdf', info: File | undefined): void
}>()

async function onClick() {
  const file = await fileOpen({
    description: 'PDF Files',
    mimeTypes: ['application/pdf'],
    extensions: ['.pdf']
  })
  emit('update:pdf', file)
}
</script>
