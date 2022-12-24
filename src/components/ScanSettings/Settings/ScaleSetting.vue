<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span>{{ t("settings.scale") }}</span>
    </template>
    <n-slider
      v-model:value="scale"
      :max="3"
      :min="1"
      :step="1"
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

type scaleType = ScanConfig["scale"];

const props = defineProps<{
  scale: scaleType;
}>();

const emit = defineEmits<{
  (e: "update:scale", value: scaleType): void;
}>();

const scale = computed({
  get: () => props.scale,
  set: (value) => emit("update:scale", value),
});

const formatTooltip = (value: number) => `${value}x`;
</script>
