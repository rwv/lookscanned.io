<template>
  <n-space justify="center">
    <n-pagination
      v-model:page="page"
      :page-count="numPages"
      v-show="numPages >= 2"
      :page-slot="5"
      size="small"
    />
  </n-space>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { NPagination, NSpace } from "naive-ui";
import { computedAsync } from "@vueuse/core";
import type { PDF } from "@/utils/pdf";

const props = defineProps<{
  pdfInstance: PDF;
  page: number;
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const page = computed({
  get: () => props.page,
  set: (page) => emit("update:page", page),
});

const numPages = computedAsync(async () => {
  page.value = 1;
  return await props.pdfInstance.getNumPages();
}, 1);
</script>
