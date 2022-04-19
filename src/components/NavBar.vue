<template>
  <v-app-bar elevation="4">
    <v-app-bar-title tag="h1">
      <router-link :to="{ name: 'index' }" class="nav-link"
        >Look Scanned</router-link
      >
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn :href="GITHUB_URL" @click.prevent="openGitHub" icon="mdi-github" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const GITHUB_URL = "https://github.com/rwv/lookscanned.io";

const openGitHub = () => window.open(GITHUB_URL, "_blank");
</script>

<style lang="scss" scoped>
.nav-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
</style>
