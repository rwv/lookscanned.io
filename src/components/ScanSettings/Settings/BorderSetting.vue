<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>{{ t("settings.border") }}</v-list-item-title>
      <v-switch
        v-model="borderSwitch"
        color="success"
        :label="borderSwitch ? 'Yes' : 'No'"
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
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}
</style>
