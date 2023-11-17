<template>
  <FeatureHolder :title="t('features.mobileFriendly.title')" :icon="Phone16Regular">
    {{ t('features.mobileFriendly.description') }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from '@/components/Features/FeatureHolder.vue'
import { Phone16Regular } from '@vicons/fluent'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
