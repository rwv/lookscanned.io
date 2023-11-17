<template>
  <FeatureHolder :title="t('features.openSource.title')" :icon="LogoGithub">
    <i18n-t keypath="features.openSource.description">
      <template #github>
        <a href="https://github.com/rwv/lookscanned.io" class="plain-link" target="_blank">{{
          t('features.openSource.github')
        }}</a>
      </template>
      <template #scanyourpdf>
        <a href="https://github.com/baicunko/scanyourpdf" class="plain-link" target="_blank">{{
          t('features.openSource.scanyourpdf')
        }}</a>
      </template>
    </i18n-t>
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from '@/components/Features/FeatureHolder.vue'
import { LogoGithub } from '@vicons/ionicons5'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.plain-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
</style>
