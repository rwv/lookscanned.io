<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title style="text-align: center">{{
        text
      }}</v-list-item-title>
      <v-progress-linear indeterminate v-if="status == 'processing'" />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  text: string;
  status: "not-started" | "processing" | "error" | "finished";
}>();

const text = computed(() => props.text);
</script>
