import en from "./translations/en.json";
import ru from "./translations/ru.json";

export const languages = {
  ru: "Русский",
  en: "English",
};

export const defaultLocale = "en";
export const locales = ["ru", "en"];

const translations = {
  en,
  ru,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLocale;
}

export type Lang = keyof typeof translations;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof translations)[typeof defaultLocale]) {
    return translations[lang][key] || translations[defaultLocale][key];
  };
}
