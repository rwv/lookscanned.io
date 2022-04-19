<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Colorspace</v-list-item-title>
      <v-switch
        v-model="colorspaceSwitch"
        color="success"
        :label="colorspaceSwitch ? 'Colorful' : 'Gray'"
        hide-details
        density="compact"
      ></v-switch>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type colorspaceType = ProcessConfig["colorspace"];

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
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}
</style>
