<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="5" md="4" lg="3">
        <ScanSettingsCard
          @update:pdfSource="(url) => (pdfSource = url)"
          @update:page="(page) => (previewPage = page)"
          @action:preview="preview"
          v-model:config="config"
          :pdfInstance="pdfInstance"
          :scanInstance="scanInstance"
        />
      </v-col>

      <v-col cols="12" sm="7" md="8" lg="9">
        <SideBySidePreview
          :page="previewPage"
          :pdfInstance="pdfInstance"
          :scanInstance="scanInstance"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { defaultConfig } from "@/utils/scan";
import SideBySidePreview from "@/components/preview/SideBySidePreview.vue";
import ScanSettingsCard from "@/components/ScanSettings/ScanSettingsCard.vue";
import { ref, computed } from "vue";
import PDFURL from "@/assets/examples/pdfs/test.pdf";
import { PDF } from "@/utils/pdf";
import { Scan } from "@/utils/scan";

const pdfSource = ref(PDFURL);
const config = ref(defaultConfig);
const previewConfig = ref(
  JSON.parse(JSON.stringify(config.value)) as ScanConfig
);
const previewPage = ref(1);
const pdfInstance = computed(() => {
  return new PDF(pdfSource.value);
});

const scanInstance = computed(() => {
  return new Scan(pdfInstance.value, previewConfig.value);
});

function preview() {
  // Otherwise the previewConfig and config will be the same Object
  previewConfig.value = JSON.parse(JSON.stringify(config.value)) as ScanConfig;
}
</script>
