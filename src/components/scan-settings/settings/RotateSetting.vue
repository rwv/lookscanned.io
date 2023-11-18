<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span :style="style" class="rotate-label">{{ t('settings.rotate') }}</span>
    </template>
    <n-slider
      v-model:value="rotate_computed"
      :max="10"
      :min="-10"
      :step="0.1"
      :format-tooltip="formatTooltip"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

type rotateType = number

const props = defineProps<{
  rotate: rotateType
}>()

const emit = defineEmits<{
  (e: 'update:rotate', value: rotateType): void
}>()

const rotate_computed = computed({
  get: () => props.rotate,
  set: (value) => emit('update:rotate', value)
})

const formatTooltip = (value: number) => `${value}°`

const style = computed(() => {
  return {
    transform: `rotate(${rotate_computed.value}deg)`
  }
})
</script>

<style scoped>
.rotate-label {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}
</style>
