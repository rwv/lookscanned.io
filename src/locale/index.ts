import { createI18n } from "vue-i18n";

import { en } from "./en";
import { zhCN } from "./zh-CN";

const currentLocale = navigator?.language;

const i18n = createI18n({
  locale: currentLocale,
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
    zh: zhCN,
  } as { [key: string]: Partial<typeof en> },
});

export default i18n;
