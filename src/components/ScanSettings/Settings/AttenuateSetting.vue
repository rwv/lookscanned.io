<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span :style="style" class="noise">
        {{ t("settings.attenuate") }}
      </span>
    </template>
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

const style = computed(() => {
  return {
    "--noise-opacity": attenuate_computed.value,
  };
});
</script>

<style scoped>
.noise {
  position: relative;
  z-index: 1;
  overflow: hidden; /*if you want to crop the image*/
}
.noise:before {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  content: url("./noise.svg");
  opacity: var(--noise-opacity);
}

@media (prefers-color-scheme: dark) {
  .noise:before {
    content: url("./dark-noise.svg");
  }
}
</style>
