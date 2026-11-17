/// <reference types="vite/client" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const PAGES = ['/', '/about', '/prices', '/contact'];
const PREFIXED_LOCALES = ['en', 'uk'];

/** Old and duplicate locale URLs. Keep in sync with public/_redirects. */
const REDIRECTS = {
  // The Ukrainian locale used to live at /ua; its canonical tag is `uk`.
  '/ua': { redirect: { to: '/uk', statusCode: 301 } },
  '/ua/**': { redirect: { to: '/uk/**', statusCode: 301 } },
  // The source locale has no prefix: /es is a duplicate of /.
  '/es': { redirect: { to: '/', statusCode: 301 } },
  '/es/**': { redirect: { to: '/**', statusCode: 301 } },
} as const;

/**
 * With a public site URL (the Cloudflare build sets `VITE_SITE_URL`) every page is prerendered
 * in every language, so the Worker's free-tier CPU budget is never spent on rendering: the
 * HTML, sitemap and robots.txt are static assets. Without it (local `pnpm build`, Vercel) pages
 * are server-rendered per request and take their origin from the request.
 */
const siteUrl = process.env['VITE_SITE_URL'];
const prerenderRoutes = siteUrl
  ? [
      ...PAGES,
      ...PREFIXED_LOCALES.flatMap((locale) => PAGES.map((page) => (page === '/' ? `/${locale}` : `/${locale}${page}`))),
      '/sitemap.xml',
      '/robots.txt',
    ]
  : [];

export default defineConfig(() => ({
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    tailwindcss(),
    analog({
      ssr: true,
      prerender: { routes: prerenderRoutes },
      nitro: {
        // `/about.html`, not `/about/index.html`: Cloudflare then serves `/about` as is, with no
        // redirect to `/about/` (which would disagree with the canonical URL).
        prerender: { autoSubfolderIndex: false, crawlLinks: false },
        // On Cloudflare these redirects live in public/_redirects (applied before the Worker).
        routeRules: siteUrl ? {} : REDIRECTS,
      },
    }),
  ],
}));
