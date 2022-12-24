<template>
  <MainContainer>
    <div style="margin-bottom: 25px">
      <BackToIndex />
    </div>
    <n-grid
      x-gap="25"
      y-gap="25"
      :cols="12"
      item-responsive
      responsive="screen"
    >
      <n-grid-item span="12 s:5 m:4 l:3">
        <ScanSettingsCard
          @update:pdfInfo="(info) => (pdfInfo = info)"
          @update:page="(page) => (previewPage = page)"
          @action:preview="preview"
          v-model:config="config"
          :pdfInstance="pdfInstance"
          :scanInstance="scanInstance"
        />
      </n-grid-item>
      <n-grid-item span="12 s:7 m:8 l:9">
        <SideBySidePreview
          :page="previewPage"
          :pdfInstance="pdfInstance"
          :scanInstance="scanInstance"
        />
      </n-grid-item>
    </n-grid>
  </MainContainer>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem } from "naive-ui";
import MainContainer from "@/components/MainContainer.vue";
import type { ScanConfig } from "@/utils/scan";
import { defaultConfig } from "@/utils/scan";
import SideBySidePreview from "@/components/preview/SideBySidePreview.vue";
import ScanSettingsCard from "@/components/ScanSettings/ScanSettingsCard.vue";
import { ref, computed } from "vue";
import PDFURL from "@/assets/examples/pdfs/test.pdf";
import { PDF } from "@/utils/pdf";
import { Scan } from "@/utils/scan";
import type { PDFInfoType } from "@/utils/pdf";
import BackToIndex from "@/components/buttons/BackToIndex.vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

useHead({
  title: t("base.scanTitle") + " - " + t("base.title"),
  meta: [{ name: "description", content: t("base.description") }],
});

const pdfInfo = ref({
  source: PDFURL,
  filename: "test.pdf",
} as PDFInfoType);

const config = ref(defaultConfig);
const previewConfig = ref(
  JSON.parse(JSON.stringify(config.value)) as ScanConfig
);
const previewPage = ref(1);
const pdfInstance = computed(() => {
  return new PDF(pdfInfo.value, previewConfig.value.scale);
});

let controller = new AbortController();

const scanInstance = computed(() => {
  controller.abort();
  controller = new AbortController();
  const signal = controller.signal;

  return new Scan(pdfInstance.value, previewConfig.value, signal);
});

function preview() {
  // Otherwise the previewConfig and config will be the same Object
  previewConfig.value = JSON.parse(JSON.stringify(config.value)) as ScanConfig;
}
</script>
