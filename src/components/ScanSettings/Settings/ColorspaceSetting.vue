<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>{{
        t("settings.colorspace.label")
      }}</v-list-item-title>
      <v-switch
        v-model="colorspaceSwitch"
        color="success"
        :label="colorspaceLabel"
        hide-details
        density="compact"
      ></v-switch>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
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

const colorspaceLabel = computed(() => {
  return colorspaceSwitch.value
    ? t("settings.colorspace.colorful")
    : t("settings.colorspace.grayscale");
});
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}
</style>
