<template>
  <v-list-item two-line>
    <v-list-item-header>
      <v-list-item-title>Punch Holes</v-list-item-title>
      <v-radio-group
      v-model="punchHoleButtons"
      inline="true"
      hide-details="true"
      >
        <v-radio
          label="None"
          value="None"
        ></v-radio>
        <v-radio
          label="A4"
          value="A4"
        ></v-radio>
        <v-radio
          label="Letter"
          value="Letter"
        ></v-radio>
      </v-radio-group>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { ProcessConfig } from "@/utils/makeScanned";
import { computed } from "vue";

type punchHoleType = ProcessConfig["punchHoles"];

const props = defineProps<{
  punchHoles: punchHoleType;
}>();

const emit = defineEmits<{
  (e: "update:punchHoles", value: punchHoleType): void;
}>();

const punchHoleButtons = computed({
  get: () => props.punchHoles,
  set: (punchHoles) => emit("update:punchHoles", punchHoles),
});
</script>

<style>
.v-select > div.v-input__control > div > div.v-field__overlay {
  background-color: inherit;
}

</style>
