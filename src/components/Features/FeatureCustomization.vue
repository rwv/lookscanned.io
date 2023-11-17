<template>
  <FeatureHolder :title="t('features.customization.title')" :icon="AreaCustom">
    {{ t('features.customization.description') }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from '@/components/Features/FeatureHolder.vue'
import { AreaCustom } from '@vicons/carbon'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
