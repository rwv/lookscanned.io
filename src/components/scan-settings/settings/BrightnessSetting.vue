<template>
  <n-form-item :label="t('settings.brightness')" :show-feedback="false">
    <template #label>
      <span :style="style">
        {{ t("settings.brightness") }}
      </span>
    </template>
    <n-slider
      v-model:value="brightness_computed"
      :max="2"
      :min="0"
      :step="0.01"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { NFormItem, NSlider } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type brightnessType = number;

const props = defineProps<{
  brightness: brightnessType;
}>();

const emit = defineEmits<{
  (e: "update:brightness", value: brightnessType): void;
}>();

const brightness_computed = computed({
  get: () => props.brightness,
  set: (value) => emit("update:brightness", value),
});

const style = computed(() => {
  return {
    filter: `brightness(${brightness_computed.value})`,
  };
});
</script>
