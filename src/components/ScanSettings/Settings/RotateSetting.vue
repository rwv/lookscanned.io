<template>
  <n-form-item :label="t('settings.rotate')" :show-feedback="false">
    <n-slider
      v-model:value="rotate_computed"
      :max="10"
      :min="-10"
      :step="0.1"
      :format-tooltip="formatTooltip"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSlider } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type rotateType = ScanConfig["rotate"];

const props = defineProps<{
  rotate: rotateType;
}>();

const emit = defineEmits<{
  (e: "update:rotate", value: rotateType): void;
}>();

const rotate_computed = computed({
  get: () => props.rotate,
  set: (value) => emit("update:rotate", value),
});

const formatTooltip = (value: number) => `${value}°`;
</script>
