<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span>{{ t('settings.scale') }}</span>
    </template>
    <n-slider v-model:value="scale" :max="3" :min="1" :step="0.5" :format-tooltip="formatTooltip" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type scaleType = number

const props = defineProps<{
  scale: scaleType
}>()

const emit = defineEmits<{
  (e: 'update:scale', value: scaleType): void
}>()

const scale = useVModel(props, 'scale', emit)

const formatTooltip = (value: number) => `${value}x`
</script>
