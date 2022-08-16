<template>
  <n-form-item :label="t('settings.rotateVariance')">
    <n-slider
      v-model:value="rotate_var_computed"
      :max="10"
      :min="-10"
      :step="0.1"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSlider } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type rotate_varType = ScanConfig["rotate_var"];

const props = defineProps<{
  rotate_var: rotate_varType;
}>();

const emit = defineEmits<{
  (e: "update:rotate_var", value: rotate_varType): void;
}>();

const rotate_var_computed = computed({
  get: () => props.rotate_var,
  set: (value) => emit("update:rotate_var", value),
});
</script>
