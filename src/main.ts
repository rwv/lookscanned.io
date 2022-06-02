import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createMetaManager } from "vue-meta";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
});

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.use(i18n);
app.use(vuetify);

app.mount("#app");
