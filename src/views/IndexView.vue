<template>
  <MainContainer>
    <TheIndexViewHead />

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
import TheIndexViewHead from "@/components/Misc/TheIndexViewHead.vue";
import MainContainer from "@/components/MainContainer.vue";

import FeaturePrivacy from "@/components/Features/FeaturePrivacy.vue";
import FeatureSpeed from "@/components/Features/FeatureSpeed.vue";
import FeatureCustomization from "@/components/Features/FeatureCustomization.vue";
import FeatureOpenSource from "@/components/Features/FeatureOpenSource.vue";
import FeatureMobileFriendly from "@/components/Features/FeatureMobileFriendly.vue";
import FeatureOfflineUse from "@/components/Features/FeatureOfflineUse.vue";
</script>
