<template>
  <n-form-item :label="t('settings.colorspace.label')" :show-feedback="false">
    <NSwitch v-model:value="colorspaceSwitch">
      <template #checked>{{ t("settings.colorspace.colorful") }}</template>
      <template #unchecked>{{ t("settings.colorspace.grayscale") }}</template>
    </NSwitch>
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSwitch } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type colorspaceType = ScanConfig["colorspace"];

const props = defineProps<{
  colorspace: colorspaceType;
}>();

const emit = defineEmits<{
  (e: "update:colorspace", value: colorspaceType): void;
}>();

const colorspaceSwitch = computed({
  get: () => props.colorspace !== "gray",
  set: (colorspace) => emit("update:colorspace", colorspace ? "sRGB" : "gray"),
});
</script>
