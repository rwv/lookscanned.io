<template>
  <n-form-item :label="t('settings.blur')" :show-feedback="false">
    <template #label>
      <span :style="style" class="blur-label">
        {{ t('settings.blur') }}
      </span>
    </template>
    <n-slider v-model:value="blur" :max="1" :min="0" :step="0.01" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type blurType = number

const props = defineProps<{
  blur: blurType
}>()

const emit = defineEmits<{
  (e: 'update:blur', value: blurType): void
}>()

const blur = useVModel(props, 'blur', emit)

const style = computed(() => {
  return {
    filter: `blur(${blur.value}px)`
  }
})
</script>

<style scoped>
.blur-label {
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
