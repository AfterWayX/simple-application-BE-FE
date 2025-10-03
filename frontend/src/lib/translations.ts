import enTranslations from '../translations/en/translations.json';
import roTranslations from '../translations/ro/translations.json';

export type Language = 'en' | 'ro';

export const translations = {
  en: enTranslations,
  ro: roTranslations,
};

export const getTranslations = (language: Language) => {
  return translations[language];
};

export const getAvailableLanguages = (): Language[] => {
  return ['en', 'ro'];
};
