<template>
  <n-space justify="center">
    <n-pagination
      v-model:page="page_computed"
      :page-count="pdfPageLength"
      v-show="pdfPageLength >= 2"
      :page-slot="5"
      size="small"
    />
  </n-space>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { NPagination, NSpace } from "naive-ui";
import type { PDF } from "@/utils/pdf";

const pdfPageLength = ref(1);

const props = defineProps<{
  pdfInstance: PDF;
  page: number;
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const page_computed = computed({
  get: () => props.page,
  set: (page) => emit("update:page", page),
});

const pdfSource = computed(() => props.pdfInstance.pdfSource);

watch(pdfSource, async () => {
  pdfPageLength.value = await props.pdfInstance.getNumPages();
  page_computed.value = 1;
});
</script>
