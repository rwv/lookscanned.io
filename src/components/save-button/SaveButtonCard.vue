<template>
  <n-card size="small" class="animated-border">
    <n-space justify="space-around" size="large">
      <n-button text @click="emit('save')" :disabled="saving">
        <template #icon>
          <n-icon>
            <DocumentDownload />
          </n-icon>
        </template>
        {{ t("actions.save") }} ({{ progress }})
      </n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NSpace, NIcon, NButton } from "naive-ui";
import { DocumentDownload } from "@vicons/carbon";

defineProps<{
  progress?: number;
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: "save"): void;
}>();

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
