<template>
  <n-grid cols="1 m:2" x-gap="25px" y-gap="25px" responsive="screen">
    <n-grid-item>
      <n-card>
        <template #cover>
          <slot name="pdf" />
        </template>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card>
        <template #cover>
          <slot name="scan" />
        </template>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem, NCard } from 'naive-ui'
</script>
