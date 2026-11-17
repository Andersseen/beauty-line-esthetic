import { getRequestHeader, type H3Event } from 'h3';

/** Indexable pages, unprefixed (Spanish is the source locale and has no prefix). */
export const PAGES = ['/', '/about', '/prices', '/contact'] as const;
export const LOCALES = ['es', 'en', 'uk'] as const;
export const SOURCE_LOCALE = 'es';

/** Origin of the request: `host` first (as Etyma's canonical links), protocol from the proxy. */
export function requestOrigin(event: H3Event): string {
  const first = (value: string | undefined) => value?.split(',')[0]?.trim() || undefined;
  const host = first(getRequestHeader(event, 'host')) ?? first(getRequestHeader(event, 'x-forwarded-host')) ?? 'localhost';
  const proto = first(getRequestHeader(event, 'x-forwarded-proto')) ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

/** Vercel preview and deployment URLs must not compete with the real domain in search results. */
export function isPreviewHost(origin: string): boolean {
  return /\.vercel\.app$/i.test(new URL(origin).hostname);
}

export function localizedPath(page: string, locale: string): string {
  if (locale === SOURCE_LOCALE) return page;
  return page === '/' ? `/${locale}` : `/${locale}${page}`;
}
