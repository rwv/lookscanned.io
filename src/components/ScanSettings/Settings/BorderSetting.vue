<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span :style="style">{{ t("settings.border.label") }}</span>
    </template>
    <NSwitch v-model:value="borderSwitch"></NSwitch>
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

const style = computed(() => {
  if (borderSwitch.value) {
    return {
      outline: "1px solid var(--n-label-text-color)",
    };
  } else {
    return {};
  }
});
</script>
