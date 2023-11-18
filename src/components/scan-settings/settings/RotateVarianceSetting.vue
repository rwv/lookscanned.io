<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span
        v-for="(character, i) in characters"
        :key="i"
        :style="characterStyle[i]"
        class="rotate-label-character"
      >
        {{ character }}
      </span>
    </template>
    <n-slider
      v-model:value="rotate_var"
      :max="10"
      :min="0"
      :step="0.1"
      :format-tooltip="formatTooltip"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type rotate_varType = number

const props = defineProps<{
  rotate_var: rotate_varType
}>()

const emit = defineEmits<{
  (e: 'update:rotate_var', value: rotate_varType): void
}>()

const rotate_var = useVModel(props, 'rotate_var', emit)

const formatTooltip = (value: number) => `±${value}°`

const label = t('settings.rotateVariance')
// split label into characters
const characters = label.split('')
const amplifier = 2
const degrees = computed(() => {
  return characters.map(() => {
    return (Math.random() * 2 - 1) * rotate_var.value * amplifier
  })
})

const characterStyle = computed(() => {
  return degrees.value.map((degree) => {
    return {
      transform: `rotate(${degree}deg)`
    }
  })
})
</script>

<style scoped>
.rotate-label-character {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}
</style>
