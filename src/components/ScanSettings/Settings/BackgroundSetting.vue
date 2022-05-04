<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Background</v-list-item-title>
      <v-switch
        v-model="backgroundSwitch"
        color="success"
        :label="backgroundSwitch ? 'Yes' : 'No'"
        hide-details
        density="compact"
      ></v-switch>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type backgroundType = ProcessConfig["background"];

const props = defineProps<{
  background: backgroundType;
}>();

const emit = defineEmits<{
  (e: "update:background", value: backgroundType): void;
}>();

const backgroundSwitch = computed({
  get: () => props.background == true,
  set: (background) => emit("update:background", background ? true : false),
});
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}
</style>
