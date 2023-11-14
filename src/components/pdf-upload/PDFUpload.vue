<template>
  <n-card
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <n-button text @click="onClick">
      <template #icon>
        <n-icon>
          <Attach16Regular />
        </n-icon>
      </template>
      <n-text v-if="pdf">
        <n-ellipsis style="max-width: 14em">{{ pdf.name }}</n-ellipsis>
      </n-text>
      <n-text v-else>
        {{ t("settings.pdfSelectLabel") }}
      </n-text>
    </n-button>
  </n-card>
</template>

<script lang="ts" setup>
import { NButton, NIcon, NText, NEllipsis, NCard } from "naive-ui";
import { Attach16Regular } from "@vicons/fluent";
import { fileOpen } from "browser-fs-access";
import { useVModel } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps<{
  pdf: File | undefined;
}>();

const emit = defineEmits<{
  (e: "update:pdf", info: File | undefined): void;
}>();

const pdf = useVModel(props, "pdf", emit);

async function onClick() {
  const file = await fileOpen({
    description: "PDF Files",
    mimeTypes: ["application/pdf"],
    extensions: [".pdf"],
  });
  pdf.value = file;
}
</script>
