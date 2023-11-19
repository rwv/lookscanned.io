<script setup lang="ts">
import { h } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { watch } from 'vue'
import { useMessage, NIcon } from 'naive-ui'
import { Refresh } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const message = useMessage()

watch(offlineReady, (ready) => {
  if (ready) {
    console.log('Service Worker Offline is Ready')
    message.info(t('base.serviceWorker.offlineReady'))
  }
})

watch(needRefresh, (refresh) => {
  if (refresh) {
    console.log('Service Worker need to refresh')
    message.info(
      () =>
        h(
          'span',
          {
            onClick: () => {
              message.destroyAll()
              console.log('updateServiceWorker')
              updateServiceWorker(true)
            },
            style: 'cursor: pointer'
          },
          t('base.serviceWorker.needRefresh')
        ),
      {
        icon: () => h(NIcon, null, { default: () => h(Refresh) }),
        closable: true,
        keepAliveOnHover: true,
        duration: 5000
      }
    )
  }
})
</script>

<template>
  <div></div>
</template>
