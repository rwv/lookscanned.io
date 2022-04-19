import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createMetaManager } from "vue-meta";

loadFonts();

createApp(App).use(router).use(createMetaManager()).use(vuetify).mount("#app");
