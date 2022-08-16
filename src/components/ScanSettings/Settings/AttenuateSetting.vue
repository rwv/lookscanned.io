<template>
  <n-form-item :label="t('settings.attenuate')">
    <n-slider
      v-model:value="attenuate_computed"
      :max="1"
      :min="0"
      :step="0.01"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { NFormItem, NSlider } from "naive-ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type attenuateType = ScanConfig["attenuate"];

const props = defineProps<{
  attenuate: attenuateType;
}>();

const emit = defineEmits<{
  (e: "update:attenuate", value: attenuateType): void;
}>();

const attenuate_computed = computed({
  get: () => props.attenuate,
  set: (value) => emit("update:attenuate", value),
});
</script>
