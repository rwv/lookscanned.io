import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createMetaManager } from "vue-meta";
import i18n from "./locale";
import VueGtag from "vue-gtag";

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.use(i18n);
app.use(vuetify);

// Only for lookscanned.io
if (location.hostname == "lookscanned.io") {
  app.use(VueGtag, {
    config: { id: "G-0HFWPLP3L2" },
  });
}

app.mount("#app");
