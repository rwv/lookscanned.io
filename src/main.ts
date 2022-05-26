import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createMetaManager } from "vue-meta";

createApp(App).use(router).use(createMetaManager()).use(vuetify).mount("#app");
