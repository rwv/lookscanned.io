<template>
  <n-image :src="imgSrc" v-if="imgSrc" />
  <n-skeleton v-else height="70vh" />
</template>

<script setup lang="ts">
import { NImage, NSkeleton } from "naive-ui";

defineProps<{
  imgSrc: string | undefined;
}>();
</script>
