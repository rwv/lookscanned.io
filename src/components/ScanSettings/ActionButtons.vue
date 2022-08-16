<template>
  <n-space justify="space-around" size="large">
    <n-button text @click="$emit('action:preview')">
      <template #icon>
        <n-icon>
          <DocumentView />
        </n-icon>
      </template>
      {{ t("actions.preview") }}
    </n-button>

    <n-button text @click="$emit('action:generate')">
      <template #icon>
        <n-icon>
          <DocumentDownload />
        </n-icon>
      </template>
      {{ t("actions.save") }}
    </n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { NSpace, NButton, NIcon } from "naive-ui";
import { DocumentView, DocumentDownload } from "@vicons/carbon";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
