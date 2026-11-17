/// <reference types="vite/client" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://analogjs.org/docs/integrations/vercel — on Vercel (`VERCEL` env set) Analog switches
// Nitro to the Build Output API automatically and writes `.vercel/output`.
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
      // Every page is server-rendered per request: Etyma derives canonical and hreflang URLs
      // from the request origin, which a build-time render does not have.
      prerender: { routes: [] },
      nitro: {
        routeRules: {
          // The Ukrainian locale used to live at /ua; its canonical tag is `uk`.
          '/ua': { redirect: { to: '/uk', statusCode: 301 } },
          '/ua/**': { redirect: { to: '/uk/**', statusCode: 301 } },
          // The source locale has no prefix: /es is a duplicate of /.
          '/es': { redirect: { to: '/', statusCode: 301 } },
        },
      },
    }),
  ],
}));
