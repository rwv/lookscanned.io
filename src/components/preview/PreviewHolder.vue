<template>
  <n-image :src="src" v-if="src" />
  <n-skeleton v-else height="70vh" />
</template>

<script setup lang="ts">
import { NImage, NSkeleton } from "naive-ui";

defineProps<{
  src?: string;
}>();
</script>
