<template>
  <n-grid :x-gap="40" :y-gap="30" cols="2" responsive="screen">
    <n-grid-item>
      <FeaturePrivacy />
    </n-grid-item>
    <n-grid-item>
      <FeatureSpeed />
    </n-grid-item>
    <n-grid-item>
      <FeatureCustomization />
    </n-grid-item>
    <n-grid-item>
      <FeatureOpenSource />
    </n-grid-item>
    <n-grid-item>
      <FeatureMobileFriendly />
    </n-grid-item>
    <n-grid-item>
      <FeatureOfflineUse />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'

import FeaturePrivacy from '@/components/Features/FeaturePrivacy.vue'
import FeatureSpeed from '@/components/Features/FeatureSpeed.vue'
import FeatureCustomization from '@/components/Features/FeatureCustomization.vue'
import FeatureOpenSource from '@/components/Features/FeatureOpenSource.vue'
import FeatureMobileFriendly from '@/components/Features/FeatureMobileFriendly.vue'
import FeatureOfflineUse from '@/components/Features/FeatureOfflineUse.vue'
</script>
