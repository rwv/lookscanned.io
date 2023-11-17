<template>
  <FeatureHolder :title="t('features.offlineUse.title')" :icon="CloudOffline">
    {{ t('features.offlineUse.description') }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from '@/components/Features/FeatureHolder.vue'
import { CloudOffline } from '@vicons/carbon'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
