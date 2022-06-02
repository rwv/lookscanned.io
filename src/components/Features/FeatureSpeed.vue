<template>
  <FeatureHolder :title="t('features.speed.title')">
    {{ t("features.speed.description") }}
  </FeatureHolder>
</template>

<script setup lang="ts">
import FeatureHolder from "@/components/Features/FeatureHolder.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
