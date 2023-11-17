<template>
  <n-button text tag="a" href="https://inbrowser.app" target="_blank">
    <template #icon>
      <n-icon>
        <Box16Regular />
      </n-icon>
    </template>
    InBrowser.App
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Box16Regular } from '@vicons/fluent'
</script>
