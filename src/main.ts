import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createMetaManager } from "vue-meta";
import i18n from "./locale";

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.use(i18n);
app.use(vuetify);

app.mount("#app");
