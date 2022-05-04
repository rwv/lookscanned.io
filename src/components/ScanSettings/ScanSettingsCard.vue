<template>
  <v-card elevation="4" min-height="268">
    <PDFSelection
      @update:pdfSource="(url) => (pdfSource = url)"
      :noFileError="noFileError"
    />

    <!-- Scan Settings -->
    <ColorspaceSetting v-model:colorspace="config.colorspace" />
    <BackgroundSetting v-model:background="config.background" />
    <PunchHoleSetting v-model:punchHoles="config.punchHoles" />
    <RotateSetting v-model:rotate="config.rotate" />
    <RotateVarianceSetting v-model:rotate_var="config.rotate_var" />
    <BlurSetting v-model:blur="config.blur" />
    <AttenuateSetting v-model:attenuate="config.attenuate" />

    <PDFPageSelection v-model:page="page" :pdfSource="pdfSource" />

    <ActionButtons
      @action:preview="$emit('action:preview')"
      @action:generate="generateAction"
    />
    <GenerateStatus
      v-if="status != 'not-started'"
      :status="status"
      :text="statusText"
    />
  </v-card>
</template>

<script lang="ts" setup>
import PDFSelection from "./PDFSelection.vue";

import BackgroundSetting from "./Settings/BackgroundSetting.vue";
import PunchHoleSetting from "./Settings/PunchHoleSetting.vue";
import RotateSetting from "./Settings/RotateSetting.vue";
import RotateVarianceSetting from "./Settings/RotateVarianceSetting.vue";
import ColorspaceSetting from "./Settings/ColorspaceSetting.vue";
import BlurSetting from "./Settings/BlurSetting.vue";
import AttenuateSetting from "./Settings/AttenuateSetting.vue";

import ActionButtons from "./ActionButtons.vue";
import PDFPageSelection from "./PDFPageSelection.vue";
import GenerateStatus from "./GenerateStatus.vue";

import type { ProcessConfig } from "@/utils/makeScanned";
import { ref, watch, computed } from "vue";

import { GenerateScannedPDFSetup } from "./GenerateScannedPDFSetup";

// Handle pdfSource changes
const pdfSource = ref("");
const page = ref(1);
const noFileError = ref(false);

const props = defineProps<{
  config: ProcessConfig;
}>();

const emit = defineEmits<{
  (e: "update:pdfSource", url: string): void;
  (e: "update:config", config: ProcessConfig): void;
  (e: "update:page", page: number): void;
  (e: "action:preview"): void;
  (e: "action:generate"): void;
}>();

watch(pdfSource, (new_url) => {
  if (new_url) {
    noFileError.value = false;
    emit("update:pdfSource", new_url);
  }
});

watch(page, (new_page) => {
  if (new_page) {
    emit("update:page", new_page);
  }
});

const config = computed({
  get: () => props.config,
  set: (config) => emit("update:config", config),
});

const { statusText, downloadScannedPDF, status } = GenerateScannedPDFSetup();

function generateAction() {
  if (pdfSource.value) {
    noFileError.value = false;
    downloadScannedPDF(pdfSource.value, config.value);
  } else {
    noFileError.value = true;
  }
}
</script>
