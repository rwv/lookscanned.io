<template>
  <n-form-item :label="t('settings.contrast')" :show-feedback="false">
    <template #label>
      <span :style="style" class="contrast-label">
        {{ t('settings.contrast') }}
      </span>
    </template>
    <n-slider v-model:value="contrast" :max="2" :min="0" :step="0.01" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type contrastType = number

const props = defineProps<{
  contrast: contrastType
}>()

const emit = defineEmits<{
  (e: 'update:contrast', value: contrastType): void
}>()

const contrast = useVModel(props, 'contrast', emit)

const style = computed(() => {
  return {
    filter: `contrast(${contrast.value})`
  }
})
</script>

<style scoped>
.contrast-label {
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
