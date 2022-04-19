<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Noise</v-list-item-title>
      <v-slider
        hide-details
        density="compact"
        max="1"
        min="0"
        thumb-label
        v-model="attenuate_computed"
      />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type attenuateType = ProcessConfig["attenuate"];

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
