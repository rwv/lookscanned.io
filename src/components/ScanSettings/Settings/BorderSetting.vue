<template>
  <n-form-item :label="t('settings.border.label')" :show-feedback="false">
    <NSwitch v-model:value="borderSwitch">
      <template #checked>{{ t("settings.border.true") }}</template>
      <template #unchecked>{{ t("settings.border.false") }}</template>
    </NSwitch>
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSwitch } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type borderType = ScanConfig["border"];

const props = defineProps<{
  border: borderType;
}>();

const emit = defineEmits<{
  (e: "update:border", value: borderType): void;
}>();

const borderSwitch = computed({
  get: () => props.border == true,
  set: (border) => emit("update:border", border ? true : false),
});
</script>
