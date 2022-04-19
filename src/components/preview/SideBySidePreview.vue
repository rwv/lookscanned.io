<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card elevation="4">
        <RawPreview :pdfSource="pdfSource" :page="page" />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card elevation="4">
        <ScannedPreview :pdfSource="pdfSource" :page="page" :config="config" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import RawPreview from "./RawPreview.vue";
import ScannedPreview from "./ScannedPreview.vue";
import type { ProcessConfig } from "@/utils/makeScanned";

defineProps<{
  pdfSource: string;
  page: number;
  config: ProcessConfig;
}>();
</script>
