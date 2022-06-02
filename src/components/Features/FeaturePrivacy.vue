<template>
  <FeatureHolder :title="t('features.privacy.title')">
    {{ t("features.privacy.description") }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from "@/components/Features/FeatureHolder.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
