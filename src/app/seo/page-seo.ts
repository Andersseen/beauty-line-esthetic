import { DOCUMENT, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { injectAppI18n } from '../i18n/inject';
import { injectOrigin } from './origin';

/** Pages with their own title and description in the `seo` catalog section. */
export type SeoPage = 'home' | 'about' | 'prices' | 'contact' | 'notFound';

/** Unprefixed path of each indexable page. */
const PATHS: Readonly<Record<Exclude<SeoPage, 'notFound'>, string>> = {
  home: '/',
  about: '/about',
  prices: '/prices',
  contact: '/contact',
};

/** Open Graph locale for each app locale. */
const OG_LOCALES: Readonly<Record<string, string>> = { es: 'es_ES', en: 'en_GB', uk: 'uk_UA' };

export const OG_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 } as const;

/**
 * Title, description, robots, Open Graph and Twitter tags for a page, in the active locale.
 *
 * Etyma already owns `<html lang>`, the canonical link and the hreflang set; this covers the rest
 * of the head. Call it from a page constructor; it re-runs when the locale changes.
 */
export function injectPageSeo(page: SeoPage): void {
  const i18n = injectAppI18n();
  const title = inject(Title);
  const meta = inject(Meta);
  const document = inject(DOCUMENT);
  const origin = injectOrigin();
  const indexable = page !== 'notFound';

  effect(() => {
    const locale = i18n.locale();
    const t = i18n.t;
    const pageTitle = t(`seo.${page}.title`);
    const description = t(`seo.${page}.description`);
    const image = origin + OG_IMAGE.path;

    title.setTitle(pageTitle);
    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({
      name: 'robots',
      content: indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:site_name', content: t('seo.siteName') });
    meta.updateTag({ property: 'og:title', content: pageTitle });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:width', content: String(OG_IMAGE.width) });
    meta.updateTag({ property: 'og:image:height', content: String(OG_IMAGE.height) });
    meta.updateTag({ property: 'og:image:alt', content: t('seo.imageAlt') });
    meta.updateTag({ property: 'og:locale', content: OG_LOCALES[locale] ?? locale });

    // One `og:locale:alternate` per other language: drop the previous set, then add the new one.
    for (const tag of Array.from(document.head.querySelectorAll('meta[property="og:locale:alternate"]'))) {
      tag.remove();
    }
    meta.addTags(
      i18n.locales
        .filter((other) => other !== locale)
        .map((other) => ({ property: 'og:locale:alternate', content: OG_LOCALES[other] ?? other })),
    );

    if (indexable) {
      meta.updateTag({ property: 'og:url', content: origin + i18n.path(PATHS[page]) });
    } else {
      meta.removeTag('property="og:url"');
    }

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: pageTitle });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  });
}
