<template>
  <n-space vertical align="center" justify="center" height="100%">
    <div style="max-width: 12em">
      <ScannerSvg style="width: 100%" />
    </div>

    <n-h1>{{ t("base.title") }}</n-h1>
    <n-p style="max-width: 568px">
      {{ t("base.description") }}
    </n-p>

    <n-space vertical :size="0">
      <n-space size="large">
        <NavigateToScan />
        <NavigateToGitHub />
      </n-space>

      <n-space size="large">
        <NavigateToHomePage />
        <NavigateToSupportMe />
      </n-space>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { NH1, NP, NSpace } from "naive-ui";
import NavigateToScan from "@/components/buttons/NavigateToScan.vue";
import NavigateToGitHub from "@/components/buttons/NavigateToGitHub.vue";
import NavigateToHomePage from "@/components/buttons/NavigateToHomePage.vue";
import NavigateToSupportMe from "@/components/buttons/NavigateToSupportMe.vue";

import { useI18n } from "vue-i18n";

import ScannerSvg from "./ScannerSvg.vue";

const { t } = useI18n();
</script>
