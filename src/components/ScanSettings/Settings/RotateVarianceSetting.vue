<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Rotate Variance</v-list-item-title>
      <v-slider
        hide-details
        density="compact"
        max="10"
        min="-10"
        thumb-label
        v-model="rotate_var_computed"
      />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type rotate_varType = ProcessConfig["rotate_var"];

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
