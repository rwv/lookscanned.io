<template>
  <div>
    <n-button text @click="onClick">
      <template #icon>
        <n-icon>
          <Attach16Regular />
        </n-icon>
      </template>
      <n-text v-if="filename">
        <n-ellipsis style="max-width: 14em">{{ filename }}</n-ellipsis>
      </n-text>
      <n-text type="error" v-else-if="noFileError">
        {{ t("settings.pdfNoSelectMessage") }}
      </n-text>
      <n-text v-else>
        {{ t("settings.pdfSelectLabel") }}
      </n-text>
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NButton, NIcon, NText, NEllipsis } from "naive-ui";
import { Attach16Regular } from "@vicons/fluent";
import { fileOpen } from "browser-fs-access";

import type { PDFInfoType } from "@/utils/pdf";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps<{
  noFileError: boolean;
}>();

const emit = defineEmits<{
  (e: "update:pdfInfo", info: PDFInfoType): void;
}>();

const blobUrl = ref("");
const filename = ref("");

async function onClick() {
  const blob = await fileOpen({
    description: "PDF Files",
    mimeTypes: ["application/pdf"],
    extensions: [".pdf"],
  });
  URL.revokeObjectURL(blobUrl.value);
  blobUrl.value = URL.createObjectURL(blob);
  filename.value = blob.name;
  const info = {
    source: blobUrl.value,
    filename: filename.value,
  };
  emit("update:pdfInfo", info);
}
</script>
