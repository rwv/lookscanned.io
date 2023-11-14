<template>
  <n-card
    size="small"
    class="animated-progress"
    :style="{ '--progress': (progress ?? 0) * 100 + '%' }"
  >
    <n-space justify="space-around" size="large">
      <n-button text @click="emit('save')" :disabled="saving">
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps<{
  progress?: number;
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: "save"): void;
}>();
</script>

<style scoped>
.animated-progress::before {
  content: "";
  width: var(--progress);
  height: 3px;
  background-color: var(--n-color-target);

  position: absolute;
  bottom: 0px;

  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
