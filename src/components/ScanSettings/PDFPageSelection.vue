<template>
  <v-pagination
    v-show="pdfPageLength >= 2"
    v-model="page_computed"
    :length="pdfPageLength"
    size="x-small"
  />
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
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
