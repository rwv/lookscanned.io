<template>
  <router-link
    :to="{
      name: 'scan'
    }"
    #="{ navigate, href }"
    custom
  >
    <n-button round tag="a" :href="href" @click="navigate">
      <template #icon>
        <n-icon>
          <AdfScannerOutlined />
        </n-icon>
      </template>
      {{ t('actions.navigateToScan') }}
    </n-button>
  </router-link>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { AdfScannerOutlined } from '@vicons/material'

import { RouterLink } from 'vue-router'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
