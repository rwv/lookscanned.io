<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Rotate</v-list-item-title>
      <v-slider
        hide-details
        density="compact"
        max="45"
        min="-45"
        thumb-label
        v-model="rotate_computed"
      />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type rotateType = ProcessConfig["rotate"];

const props = defineProps<{
  rotate: rotateType;
}>();

const emit = defineEmits<{
  (e: "update:rotate", value: rotateType): void;
}>();

const rotate_computed = computed({
  get: () => props.rotate,
  set: (value) => emit("update:rotate", value),
});
</script>
