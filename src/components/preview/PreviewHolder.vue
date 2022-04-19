<template>
  <v-img :src="showImgSrc" :transition="false" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import placeholderUrl from "@/assets/previewPagePlaceholder.svg";

const props = defineProps<{
  imgSrc: string;
}>();

const showImgSrc = computed(() => {
  if (props.imgSrc == "") {
    return placeholderUrl;
  } else {
    return props.imgSrc;
  }
});
</script>
