<template>
  <n-button text tag="a" href="https://zczc.cz" target="_blank">
    <template #icon>
      <n-icon>
        <Home12Regular />
      </n-icon>
    </template>
    {{ t('actions.navigateToHomePage') }}
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Home12Regular } from '@vicons/fluent'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
