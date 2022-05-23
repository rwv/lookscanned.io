<template>
  <v-app>
    <metainfo> </metainfo>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useMeta } from "vue-meta";

import NavBar from "@/components/NavBar.vue";

const prefetchUrls = [
  "/vendors/pdf.js/pdf.worker.min.js",
  "/vendors/makeScanned/worker/processImage.worker.js",
  "/vendors/makeScanned/worker/combineImagesToPdf.worker.js",
  "/vendors/magica/magick.wasm",
];

const prefetchUrlsMeta = prefetchUrls.map((url) => ({
  rel: "prefetch",
  href: url,
}));

useMeta({
  title: "Look Scanned",
  description:
    "Look Scanned is a pure frontend site that makes your PDFs look scanned! No need for printers and scanners anymore - everything you need to do is just a few clicks.",
  link: prefetchUrlsMeta,
});
</script>

<style>
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
</style>
