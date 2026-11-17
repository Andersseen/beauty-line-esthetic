import { injectI18n } from '@etyma/angular';

import { i18n } from './i18n';

/** The app's typed handle on Etyma: `t('nav.home')` is checked against the Spanish catalog. */
export const injectAppI18n = () => injectI18n(i18n);

type AppI18n = ReturnType<typeof injectAppI18n>;

/** Every message key of the Spanish source catalog. */
export type AppMessageKey = Parameters<AppI18n['t']>[0];

/**
 * Key of an entry inside a catalog list (`servicesSection.sections.3.title`).
 *
 * The index always comes from iterating the source catalog's own shape (see `indicesOf`), so the
 * key exists by construction; the cast only bridges the numeric index into the literal key type.
 */
export function listKey(list: string, index: number, field?: string): AppMessageKey {
  return (field === undefined ? `${list}.${index}` : `${list}.${index}.${field}`) as AppMessageKey;
}
