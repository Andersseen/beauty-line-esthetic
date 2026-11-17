import { getRequestHeader, type H3Event } from 'h3';

/** Indexable pages, unprefixed (Spanish is the source locale and has no prefix). */
export const PAGES = ['/', '/about', '/prices', '/contact'] as const;
export const LOCALES = ['es', 'en', 'uk'] as const;
export const SOURCE_LOCALE = 'es';

/** Public site URL baked in at build time (prerendered Cloudflare build), if any. */
const SITE_URL = process.env['VITE_SITE_URL']?.replace(/\/+$/, '') || undefined;

/**
 * The site origin: the configured site URL when there is one, otherwise the request's (`host`
 * first, as Etyma's canonical links, protocol from the proxy).
 */
export function requestOrigin(event: H3Event): string {
  if (SITE_URL) return SITE_URL;
  const first = (value: string | undefined) => value?.split(',')[0]?.trim() || undefined;
  const host = first(getRequestHeader(event, 'host')) ?? first(getRequestHeader(event, 'x-forwarded-host')) ?? 'localhost';
  const proto = first(getRequestHeader(event, 'x-forwarded-proto')) ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

/** Preview and platform URLs must not compete with the real domain in search results. */
export function isPreviewHost(origin: string): boolean {
  return /\.(vercel\.app|workers\.dev|pages\.dev)$/i.test(new URL(origin).hostname);
}

export function localizedPath(page: string, locale: string): string {
  if (locale === SOURCE_LOCALE) return page;
  return page === '/' ? `/${locale}` : `/${locale}${page}`;
}
