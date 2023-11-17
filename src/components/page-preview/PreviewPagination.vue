<template>
  <n-space justify="center">
    <n-pagination
      v-model:page="page"
      :page-count="numPages"
      v-show="numPages >= 2"
      :page-slot="5"
      size="small"
    />
  </n-space>
</template>

<script lang="ts" setup>
import { NPagination, NSpace } from 'naive-ui'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  page: number
  numPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const page = useVModel(props, 'page', emit)
</script>
