<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Blur</v-list-item-title>
      <v-slider
        hide-details
        density="compact"
        max="1"
        min="0"
        thumb-label
        v-model="blur_computed"
      />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type blurType = ScanConfig["blur"];

const props = defineProps<{
  blur: blurType;
}>();

const emit = defineEmits<{
  (e: "update:blur", value: blurType): void;
}>();

const blur_computed = computed({
  get: () => props.blur,
  set: (value) => emit("update:blur", value),
});
</script>
