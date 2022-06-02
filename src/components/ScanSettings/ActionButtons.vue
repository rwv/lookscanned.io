<template>
  <v-list-item class="d-flex">
    <div class="d-flex justify-space-around flex-grow-1">
      <v-btn @click="$emit('action:preview')" class="mb-2">
        {{ t("actions.preview") }}
      </v-btn>
      <v-btn @click="$emit('action:generate')" class="mb-2">
        {{ t("actions.save") }}
      </v-btn>
    </div>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
