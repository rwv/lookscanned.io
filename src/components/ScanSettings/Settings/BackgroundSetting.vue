<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Background</v-list-item-title>
       <v-radio-group
       v-model="backgroundButtons"
       inline="true"
       hide-details="true"
       >
         <v-radio
           label="White"
           value="White"
         ></v-radio>
         <v-radio
           label="Black Border"
           value="Black Border"
         ></v-radio>
         <v-radio
           label="Black"
           value="Black"
         ></v-radio>
       </v-radio-group>
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

const backgroundButtons = computed({
  get: () => props.background,
  set: (background) => emit("update:background", background),
});
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}

</style>
