<template>
  <v-list-item>
    <v-file-input
      accept="application/pdf"
      :label="t('settings.pdfSelectLabel')"
      density="compact"
      truncate-length="21"
      :hide-details="!props.noFileError"
      :error="props.noFileError"
      :error-messages="noFileErrorMessage"
      @change="onFileChange"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { PDFInfoType } from "@/utils/pdf";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps<{
  noFileError: boolean;
}>();

const noFileErrorMessage = computed(() => {
  if (props.noFileError) {
    return t("settings.pdfNoSelectMessage");
  } else {
    return [];
  }
});

const emit = defineEmits<{
  (e: "update:pdfInfo", info: PDFInfoType): void;
}>();

const blobUrl = ref("");

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    if (blobUrl.value !== "") {
      URL.revokeObjectURL(blobUrl.value);
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    blobUrl.value = url;
    const info = {
      source: url,
      filename: file.name,
    } as PDFInfoType;
    emit("update:pdfInfo", info);
  }
}
</script>

<style>
.v-file-input > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}
</style>
