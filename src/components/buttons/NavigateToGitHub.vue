<template>
  <n-button text tag="a" href="https://github.com/rwv/lookscanned.io" target="_blank">
    <template #icon>
      <n-icon>
        <LogoGithub />
      </n-icon>
    </template>
    GitHub
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { LogoGithub } from '@vicons/ionicons5'
</script>
