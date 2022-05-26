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

useMeta({
  title: "Look Scanned",
  description:
    "Look Scanned is a pure frontend site that makes your PDFs look scanned! No need for printers and scanners anymore - everything you need to do is just a few clicks.",
});
</script>

<style>
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
</style>
