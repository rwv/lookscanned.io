import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./locale";
import VueGtag from "vue-gtag";
import { createHead } from "@vueuse/head";

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.use(i18n);

// Only for lookscanned.io
if (location.hostname == "lookscanned.io") {
  app.use(VueGtag, {
    config: { id: "G-0HFWPLP3L2" },
  });
}

app.mount("#app");
