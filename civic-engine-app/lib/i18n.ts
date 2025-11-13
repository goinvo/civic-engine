/**
 * Simple i18n utility for static demo
 * In production, consider using next-i18next or next-intl
 */

import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

export type Locale = 'en' | 'es' | 'zh';

const translations = {
  en: enCommon,
  es: esCommon,
  zh: enCommon, // Placeholder - would add Chinese translations later
};

/**
 * Get translation by key path (e.g., "nav.logo")
 */
export function getTranslation(
  locale: Locale,
  keyPath: string,
  params?: Record<string, string>
): string {
  const keys = keyPath.split('.');
  let value: any = translations[locale] || translations.en;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        }
      }
      break;
    }
  }

  // Replace parameters if provided
  if (typeof value === 'string' && params) {
    Object.entries(params).forEach(([key, replacement]) => {
      value = value.replace(`{${key}}`, replacement);
    });
  }

  return typeof value === 'string' ? value : keyPath;
}

/**
 * Get locale display name
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    zh: '中文',
  };
  return names[locale] || names.en;
}

/**
 * Simple hook-like function for use in client components
 * Usage: const t = useTranslations('en');
 */
export function useTranslations(locale: Locale = 'en') {
  return {
    t: (keyPath: string, params?: Record<string, string>) =>
      getTranslation(locale, keyPath, params),
    locale,
  };
}
