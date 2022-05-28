<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card elevation="4">
        <RawPreview :pdfInstance="pdfInstance" :page="page" />
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
import type { PDF } from "@/utils/pdf";

defineProps<{
  pdfSource: string;
  page: number;
  config: ProcessConfig;
  pdfInstance: PDF;
}>();
</script>
