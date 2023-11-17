<template>
  <n-space vertical align="center" justify="center" height="100%">
    <div style="max-width: 12em">
      <ScannerSvg style="width: 100%" />
    </div>

    <n-h1>{{ t('base.title') }}</n-h1>
    <n-p style="max-width: 568px">
      {{ t('base.description') }}
    </n-p>

    <NavigateToScan />

    <n-grid :x-gap="20" :y-gap="0" :cols="2">
      <n-grid-item>
        <NavigateToGitHub />
      </n-grid-item>
      <n-grid-item>
        <NavigateToInBrowserApp />
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup lang="ts">
import { NH1, NP, NSpace, NGrid, NGridItem } from 'naive-ui'
import NavigateToScan from '@/components/buttons/NavigateToScan.vue'
import NavigateToGitHub from '@/components/buttons/NavigateToGitHub.vue'
import NavigateToInBrowserApp from '@/components/buttons/NavigateToInBrowserApp.vue'

import { useI18n } from 'vue-i18n'

import ScannerSvg from './ScannerSvg.vue'

const { t } = useI18n()
</script>
