<template>
  <n-button text tag="a" href="https://zczc.cz" target="_blank">
    <template #icon>
      <n-icon>
        <Heart />
      </n-icon>
    </template>
    {{ t('actions.navigateToSupportMe') }}
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Heart } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
