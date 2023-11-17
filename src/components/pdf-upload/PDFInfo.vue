<template>
  <n-card>
    <n-space vertical>
      <div class="entry">
        <n-icon class="icon" :component="Attach16Regular" />
        <n-ellipsis style="max-width: 14em" :line-clamp="3">{{ pdf.name }}</n-ellipsis>
      </div>
      <div class="entry">
        <n-icon class="icon" :component="ResizeLarge20Regular" />
        <span>{{ filesize(pdf.size) }}</span>
      </div>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NIcon, NEllipsis, NCard, NSpace } from 'naive-ui'
import { Attach16Regular, ResizeLarge20Regular } from '@vicons/fluent'
import { filesize } from 'filesize'

defineProps<{
  pdf: File
}>()
</script>

<style scoped>
.entry {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
