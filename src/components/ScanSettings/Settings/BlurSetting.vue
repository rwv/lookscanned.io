<template>
  <n-form-item :label="t('settings.blur')" :show-feedback="false">
    <template #label>
      <span :style="style">
        {{ t("settings.blur") }}
      </span>
    </template>
    <n-slider v-model:value="blur_computed" :max="1" :min="0" :step="0.01" />
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSlider } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type blurType = ScanConfig["blur"];

const props = defineProps<{
  blur: blurType;
}>();

const emit = defineEmits<{
  (e: "update:blur", value: blurType): void;
}>();

const blur_computed = computed({
  get: () => props.blur,
  set: (value) => emit("update:blur", value),
});

const style = computed(() => {
  return {
    filter: `blur(${blur_computed.value}px)`,
  };
});
</script>
