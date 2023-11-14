<template>
  <n-card size="small">
    <n-space justify="space-around" size="large">
      <n-button text @click="emit('action:generate')">
        <template #icon>
          <n-icon>
            <DocumentDownload />
          </n-icon>
        </template>
        {{ t("actions.save") }}
      </n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NSpace, NIcon, NButton } from "naive-ui";
import { DocumentDownload } from "@vicons/carbon";

const emit = defineEmits<{
  (e: "action:generate"): void;
}>();

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
