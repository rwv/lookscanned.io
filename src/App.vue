<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-global-style />
    <n-message-provider>
      <main class="view"><RouterView :key="route.fullPath" /></main>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import {
  useOsTheme,
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
} from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
import { RouterView } from "vue-router";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null));
</script>
