<template>
  <FeatureHolder :title="t('features.speed.title')" :icon="Flash16Regular">
    {{ t('features.speed.description') }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from '@/components/Features/FeatureHolder.vue'
import { Flash16Regular } from '@vicons/fluent'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
