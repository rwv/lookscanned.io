<template>
  <n-form-item :label="t('settings.colorspace.label')" :show-feedback="false">
    <template #label>
      <n-gradient-text :gradient="linearGradient" v-show="colorspaceSwitch">
        {{ t('settings.colorspace.label') }}
      </n-gradient-text>
      <n-text v-show="!colorspaceSwitch">{{ t('settings.colorspace.label') }}</n-text>
    </template>
    <NSwitch v-model:value="colorspaceSwitch" :rail-style="railStyle">
      <template #checked>{{ t('settings.colorspace.colorful') }}</template>
      <template #unchecked>{{ t('settings.colorspace.grayscale') }}</template>
    </NSwitch>
  </n-form-item>
</template>

<script lang="ts" setup>
import { type CSSProperties, computed } from 'vue'
import { NFormItem, NSwitch, NGradientText, NText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

type colorspaceType = 'sRGB' | 'gray'

const props = defineProps<{
  colorspace: colorspaceType
}>()

const emit = defineEmits<{
  (e: 'update:colorspace', value: colorspaceType): void
}>()

const colorspaceSwitch = computed({
  get: () => props.colorspace !== 'gray',
  set: (colorspace) => emit('update:colorspace', colorspace ? 'sRGB' : 'gray')
})

const linearGradient =
  'linear-gradient(to right top, #845ec2, #a55dbd, #c15db5, #d95fab, #ec64a0, #f76e91, #fd7b84, #ff8a7a, #ffa26e, #ffbd66, #ffda65, #f9f871)'

const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
  const style: CSSProperties = {}
  if (checked) {
    // If colorspace is colorful, the rail is colored.
    // get random color from array
    style.background = linearGradient
    if (focused) {
      style.boxShadow = '0 0 0 2px #FF6F9140'
    }
  } else {
    style.background = '#000000'
    if (focused) {
      style.boxShadow = '0 0 0 2px #00000040'
    }
  }
  return style
}
</script>
