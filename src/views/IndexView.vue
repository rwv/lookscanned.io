<template>
  <MainContainer>
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

    <v-row no-gutters class="text-center">
      <v-col cols="12" class="text-center mt-10">
        <v-row>
          <FeaturePrivacy />
          <FeatureSpeed />
          <FeatureCustomization />
          <FeatureOpenSource />
          <FeatureMobileFriendly />
          <FeatureOfflineUse />
        </v-row>
      </v-col>
    </v-row>
  </MainContainer>
</template>

<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import { NH1, NP, NSpace, NButton, NIcon } from "naive-ui";
import { AdfScannerOutlined } from "@vicons/material";
import { LogoGithub } from "@vicons/ionicons5";

import FeaturePrivacy from "@/components/Features/FeaturePrivacy.vue";
import FeatureSpeed from "@/components/Features/FeatureSpeed.vue";
import FeatureCustomization from "@/components/Features/FeatureCustomization.vue";
import FeatureOpenSource from "@/components/Features/FeatureOpenSource.vue";
import FeatureMobileFriendly from "@/components/Features/FeatureMobileFriendly.vue";
import FeatureOfflineUse from "@/components/Features/FeatureOfflineUse.vue";
import { RouterLink } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
