<template>
  <v-pagination
    v-show="pdfPageLength >= 2"
    v-model="page_computed"
    :length="pdfPageLength"
    size="x-small"
  />
</template>

<script lang="ts" setup>
import { ref, watch, computed, toRefs } from "vue";
import { getPdfDocument } from "@/utils/pdf";

const pdfPageLength = ref(1);

const props = defineProps<{
  pdfSource: string;
  page: number;
}>();

const { pdfSource } = toRefs(props);

const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const page_computed = computed({
  get: () => props.page,
  set: (page) => emit("update:page", page),
});

watch(pdfSource, async (new_url) => {
  if (new_url != "") {
    const pdf = await getPdfDocument(new_url);
    pdfPageLength.value = pdf.numPages;
    page_computed.value = 1;
  }
});
</script>
