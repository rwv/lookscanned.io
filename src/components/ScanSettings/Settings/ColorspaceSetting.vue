<template>
  <n-form-item :label="t('settings.colorspace.label')" :show-feedback="false">
    <NSwitch v-model:value="colorspaceSwitch" :rail-style="railStyle">
      <template #checked>{{ t("settings.colorspace.colorful") }}</template>
      <template #unchecked>{{ t("settings.colorspace.grayscale") }}</template>
    </NSwitch>
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { type CSSProperties, computed } from "vue";
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

const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean;
  checked: boolean;
}) => {
  const style: CSSProperties = {};
  if (checked) {
    // If colorspace is colorful, the rail is colored.
    // get random color from array
    style.background =
      "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)";
    if (focused) {
      style.boxShadow = "0 0 0 2px #05193740";
    }
  } else {
    style.background = "#000000";
    if (focused) {
      style.boxShadow = "0 0 0 2px #00000040";
    }
  }
  return style;
};
</script>
