<template>
  <n-form-item :label="t('settings.brightness')" :show-feedback="false">
    <template #label>
      <span :style="style" class="brightness-label">
        {{ t('settings.brightness') }}
      </span>
    </template>
    <n-slider v-model:value="brightness" :max="2" :min="0" :step="0.01" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type brightnessType = number

const props = defineProps<{
  brightness: brightnessType
}>()

const emit = defineEmits<{
  (e: 'update:brightness', value: brightnessType): void
}>()

const brightness = useVModel(props, 'brightness', emit)

const style = computed(() => {
  return {
    filter: `brightness(${brightness.value})`
  }
})
</script>

<style scoped>
.brightness-label {
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
