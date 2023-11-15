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
        <n-space vertical>
          <PDFUpload @update:pdf="pdf = $event" />
          <PDFInfo :pdf="pdf" v-if="pdf" />

          <ScanSettingsCard v-model:config="config" />

          <SaveButtonCard
            @save="downloadSave"
            :progress="progress"
            :saving="saving"
          />
        </n-space>
      </n-grid-item>
      <n-grid-item span="12 s:7 m:8 l:9">
        <PreviewCompare
          :pdfRenderer="pdfRenderer"
          :scanRenderer="scanRenderer"
          :scale="config.scale"
        />
      </n-grid-item>
    </n-grid>
  </MainContainer>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem, NSpace } from "naive-ui";
import MainContainer from "@/components/MainContainer.vue";
import {
  type ScanConfig,
  defaultConfig,
  MagicaScanner,
} from "@/utils/scanner/magica-scan";
import ScanSettingsCard from "@/components/canvas-scan/canvas-scan-settings/ScanSettingsCard.vue";
import PDFUpload from "@/components/pdf-upload/PDFUpload.vue";
import { ref, computed, onMounted, watch } from "vue";
import PDFURL from "@/assets/examples/pdfs/test.pdf";
import BackToIndex from "@/components/buttons/BackToIndex.vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import { PDF } from "@/utils/pdf-new";
import PreviewCompare from "@/components/page-preview/PreviewCompare.vue";
import SaveButtonCard from "@/components/save-button/SaveButtonCard.vue";
import { useSaveScannedPDF } from "@/composables/save-scanned-pdf";
import PDFInfo from "@/components/pdf-upload/PDFInfo.vue";
import { ScanCacher } from "@/utils/scanner/scan-cacher";

const { t } = useI18n();

useHead({
  title: t("base.scanTitle") + " - " + t("base.title"),
  meta: [{ name: "description", content: t("base.description") }],
});

const pdf = ref<File | undefined>(undefined);

onMounted(async () => {
  const response = await fetch(PDFURL);
  const blob = await response.blob();
  pdf.value = new File([blob], "example.pdf");
});

const config = ref<ScanConfig>(defaultConfig);
const pdfRenderer = computed(() => {
  if (!pdf.value) return;

  return new PDF(pdf.value);
});

const scanRenderer = ref(new ScanCacher(new MagicaScanner(config.value)));
watch(
  config,
  (newConfig) => {
    scanRenderer.value = new ScanCacher(new MagicaScanner(newConfig));
  },
  { deep: true }
);

const scale = computed(() => config.value.scale);

const { save, progress, saving } = useSaveScannedPDF(
  pdfRenderer,
  scanRenderer,
  scale
);
const downloadSave = async () => {
  const pdfBlob = await save();
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  const originalFilename = pdf.value?.name ?? "doc.pdf";
  const filename = `${originalFilename.replace(/\.[^/.]+$/, "")}-scan.pdf`;

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
</script>
