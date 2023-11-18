<template>
  <n-form-item :show-feedback="false">
    <template #label>
      <span :style="style">{{ t('settings.border.label') }}</span>
    </template>
    <NSwitch v-model:value="border"></NSwitch>
  </n-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NFormItem, NSwitch } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

type borderType = boolean

const props = defineProps<{
  border: borderType
}>()

const emit = defineEmits<{
  (e: 'update:border', value: borderType): void
}>()

const border = useVModel(props, 'border', emit)

const style = computed(() => {
  if (border.value) {
    return {
      outline: '1px solid var(--n-label-text-color)'
    }
  } else {
    return {}
  }
})
</script>
