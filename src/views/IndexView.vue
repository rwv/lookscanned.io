<template>
  <v-container>
    <v-row no-gutters class="text-center">
      <v-col cols="12" class="mb-4 middle">
        <div style="max-width: 12rem">
          <img :src="IconUrl" style="width: 100%" />
        </div>

        <h1 class="v-heading text-h3 text-sm-h3 mb-4">{{ t("base.title") }}</h1>
        <p class="mx-auto text-justify mb-8" style="max-width: 568px">
          Look Scanned is a pure frontend site that makes your PDFs look
          scanned! No need for printers and scanners anymore - everything you
          need to do is just a few clicks.
        </p>

        <div>
          <v-btn class="mr-2" :to="{ name: 'scan' }">Start Scanning</v-btn>
          <v-btn class="ml-2" :href="GITHUB_URL" @click.prevent="openGitHub"
            >GitHub</v-btn
          >
        </div>
      </v-col>

      <v-col cols="12" class="text-center mt-10">
        <v-row>
          <FeaturePrivacy />
          <FeatureSpeed />

          <FeatureHolder title="⚙️ Customization">
            Tweak the settings to make your PDF look better. See the preview in
            real time. What You See Is What You Get.
          </FeatureHolder>

          <FeatureHolder title="💡 Open Source">
            Look Scanned is open source and available on
            <a
              href="https://github.com/rwv/lookscanned.io"
              class="plain-link"
              target="_blank"
              >GitHub</a
            >. Also, this site is inspired by another open source project
            <a
              href="https://github.com/baicunko/scanyourpdf"
              class="plain-link"
              target="_blank"
              >baicunko/scanyourpdf</a
            >
          </FeatureHolder>

          <FeatureHolder title="📱 Mobile Friendly">
            Look Scanned is mobile friendly. It works on all modern browsers and
            devices.
          </FeatureHolder>

          <FeatureHolder title="🦕 Offline Use">
            Look Scanned is offline-capable. It works even if you don't have a
            network connection.
          </FeatureHolder>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import FeatureHolder from "@/components/Features/FeatureHolder.vue";
import FeaturePrivacy from "@/components/Features/FeaturePrivacy.vue";
import FeatureSpeed from "@/components/Features/FeatureSpeed.vue";

import IconUrl from "@/assets/scanner.svg";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const GITHUB_URL = "https://github.com/rwv/lookscanned.io";

const openGitHub = () => window.open(GITHUB_URL, "_blank");
</script>

<style scoped>
.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.advantage-icon {
  font-size: 8em;
}
</style>

<style lang="scss" scoped>
.plain-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
</style>
