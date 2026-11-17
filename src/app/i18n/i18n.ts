import { defineI18n } from '@etyma/core';

import es from './es.json';

/**
 * Spanish is the source locale: it is served without a prefix (`/`, `/prices`) and is what a
 * half-translated page falls back to. English and Ukrainian live under `/en` and `/uk` and are
 * loaded lazily.
 */
export const i18n = defineI18n({
  locales: ['es', 'en', 'uk'],
  sourceLocale: 'es',
  source: es,
  loaders: {
    en: () => import('./en.json'),
    uk: () => import('./uk.json'),
  },
});

/** The source catalog doubles as the content model: lists are iterated from its shape. */
export const sourceCatalog = es;
