<template>
  <v-container>
    <v-row no-gutters class="text-center">
      <v-col cols="12" class="mb-4 middle">
        <div style="max-width: 12rem">
          <img :src="IconUrl" style="width: 100%" />
        </div>

        <h1 class="v-heading text-h3 text-sm-h3 mb-4">Look Scanned</h1>
        <p class="mx-auto text-justify mb-8" style="max-width: 568px">
          Look Scanned is a pure frontend site that makes your PDFs look
          scanned! No need for printers and scanners anymore - everything you
          need to do is just a few clicks.
        </p>

        <v-btn :to="{ name: 'scan' }">Start Scanning</v-btn>
      </v-col>

      <v-col cols="12" class="text-center mt-10">
        <v-row>
          <FeatureHolder title="🔐 Privacy">
            Your data stay on your device. We don't store any of your data.
            Everything is processed on your browser.
          </FeatureHolder>

          <FeatureHolder title="⚡️ Speed">
            Based on WebAssembly, No waiting for your PDF to be scanned. Just
            click the button and your PDF will be scanned in a second.
          </FeatureHolder>

          <FeatureHolder title="⚙️ Customization">
            Tweak the settings to make your PDF look better. See the preview in
            real time. What You See Is What You Get.
          </FeatureHolder>

          <FeatureHolder title="💡 Open Source">
            Look Scanned is open source and available on GitHub.
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

import IconUrl from "@/assets/scanner.png";
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
