import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locale'
import VueGtag from 'vue-gtag'
import { createHead } from '@unhead/vue'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(i18n)

// Only for lookscanned.io
if (location.hostname.endsWith('lookscanned.io')) {
  app.use(VueGtag, {
    config: { id: 'G-0HFWPLP3L2' }
  })
}

app.mount('#app')
