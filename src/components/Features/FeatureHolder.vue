<template>
  <n-space vertical :size="0">
    <n-h3>{{ title }}</n-h3>
    <n-p>
      <slot></slot>
    </n-p>
  </n-space>
</template>

<script setup lang="ts">
import { NH3, NP, NSpace } from "naive-ui";

defineProps<{ title: string }>();
</script>
