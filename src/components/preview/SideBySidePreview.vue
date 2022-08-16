<template>
  <n-grid cols="1 m:2" x-gap="25px" responsive="screen">
    <n-grid-item>
      <n-card>
        <template #cover>
          <RawPreview :pdfInstance="pdfInstance" :page="page" />
        </template>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card>
        <template #cover>
          <scanned-preview :scanInstance="scanInstance" :page="page" />
        </template>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem, NCard } from "naive-ui";

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
