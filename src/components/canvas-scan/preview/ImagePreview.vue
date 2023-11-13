<template>
  <n-image :src="imageURL" v-if="imageURL" />
  <n-skeleton v-else height="70vh" />
</template>

<script lang="ts" setup>
import { NImage, NSkeleton } from "naive-ui";
import { toRef } from "vue";
import { useObjectUrl } from "@vueuse/core";

const props = defineProps<{
  image?: Blob;
}>();

const image = toRef(props, "image");

const imageURL = useObjectUrl(image);
</script>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
}
</style>
