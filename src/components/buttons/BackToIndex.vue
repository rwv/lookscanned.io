<template>
  <router-link
    :to="{
      name: 'index'
    }"
    #="{ navigate, href }"
    custom
  >
    <n-button text tag="a" :href="href" @click="navigate">
      <template #icon>
        <n-icon>
          <ArrowCircleLeft16Regular />
        </n-icon>
      </template>
      {{ t('actions.backToIndex') }}
    </n-button>
  </router-link>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { ArrowCircleLeft16Regular } from '@vicons/fluent'

import { RouterLink } from 'vue-router'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
