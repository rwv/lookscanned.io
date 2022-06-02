import { createI18n } from "vue-i18n";

import { en } from "./en";

const currentLocale = navigator?.language;

const i18n = createI18n({
  locale: currentLocale,
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
  },
});

export default i18n;
