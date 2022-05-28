<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card elevation="4">
        <RawPreview :pdfInstance="pdfInstance" :page="page" />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card elevation="4">
        <scanned-preview :scanInstance="scanInstance" :page="page" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import RawPreview from "./RawPreview.vue";
import ScannedPreview from "./ScannedPreview.vue";
import type { PDF } from "@/utils/pdf";
import type { Scan } from "@/utils/scan";

defineProps<{
  page: number;
  pdfInstance: PDF;
  scanInstance: Scan;
}>();
</script>
