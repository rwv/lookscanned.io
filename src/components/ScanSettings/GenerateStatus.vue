<template>
  <div style="text-align: center">
    <n-spin :size="14" v-if="status === 'processing'" class="icon" />
    <n-icon-wrapper
      :size="14"
      :border-radius="10"
      class="icon"
      v-if="status === 'finished'"
    >
      <n-icon :size="10" :component="Checkmark16Filled" />
    </n-icon-wrapper>
    <n-text v-if="status === 'processing'">{{ text }}</n-text>
    <n-text v-if="status === 'error'" type="error">{{ text }}</n-text>
    <n-text v-if="status === 'finished'" type="success">{{ text }}</n-text>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { NSpin, NText, NIcon, NIconWrapper } from "naive-ui";
import { Checkmark16Filled } from "@vicons/fluent";

const props = defineProps<{
  text: string;
  status: "not-started" | "processing" | "error" | "finished";
}>();

const text = computed(() => props.text);
</script>

<style scoped>
.icon {
  margin-right: 0.5em;
}
</style>
