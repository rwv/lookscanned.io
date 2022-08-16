<template>
  <n-space vertical align="center">
    <div style="max-width: 12rem">
      <img src="@/assets/scanner.svg" style="width: 100%" />
    </div>

    <n-h1>{{ t("base.title") }}</n-h1>
    <n-p style="max-width: 568px">
      {{ t("base.description") }}
    </n-p>

    <n-space size="large">
      <router-link
        :to="{
          name: 'scan',
        }"
        #="{ navigate, href }"
        custom
      >
        <n-button text tag="a" :href="href" @click="navigate">
          <template #icon>
            <n-icon>
              <AdfScannerOutlined />
            </n-icon>
          </template>
          {{ t("actions.navigateToScan") }}
        </n-button>
      </router-link>
      |
      <n-button
        text
        tag="a"
        href="https://github.com/rwv/lookscanned.io"
        target="_blank"
      >
        <template #icon>
          <n-icon>
            <LogoGithub />
          </n-icon>
        </template>
        GitHub
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { NH1, NP, NSpace, NButton, NIcon } from "naive-ui";
import { AdfScannerOutlined } from "@vicons/material";
import { LogoGithub } from "@vicons/ionicons5";

import { RouterLink } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
