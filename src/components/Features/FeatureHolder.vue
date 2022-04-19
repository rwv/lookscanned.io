<template>
  <v-col cols="12" md="4" sm="6" class="px-6">
    <h2 class="v-heading text-h5 text-sm-h5 mb-4">{{ title }}</h2>
    <p class="mx-auto text-justify">
      <slot></slot>
    </p>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
