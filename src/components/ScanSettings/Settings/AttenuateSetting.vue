<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>{{ t("settings.attenuate") }}</v-list-item-title>
      <v-slider
        hide-details
        density="compact"
        max="1"
        min="0"
        thumb-label
        v-model="attenuate_computed"
      />
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ScanConfig } from "@/utils/scan";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type attenuateType = ScanConfig["attenuate"];

const props = defineProps<{
  attenuate: attenuateType;
}>();

const emit = defineEmits<{
  (e: "update:attenuate", value: attenuateType): void;
}>();

const attenuate_computed = computed({
  get: () => props.attenuate,
  set: (value) => emit("update:attenuate", value),
});
</script>
