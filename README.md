# Beauty Line Esthetic

Website for Beauty Line, an aesthetic centre in Alcorcón (Madrid). Spanish, English and Ukrainian.

Built with [AnalogJS](https://analogjs.org) (Angular 22, SSR, file routes) and the Andersseen stack:

| Concern            | Library                                                                         |
| ------------------ | ------------------------------------------------------------------------------- |
| i18n, localized URLs, SEO head | [Etyma](https://github.com/Andersseen/etyma) (`@etyma/core`, `@etyma/angular`, `@etyma/analog`) |
| UI components      | [Volt UI](https://github.com/Andersseen/volt-ui) (`@voltui/components`)          |
| Headless behaviour | [Quartz](https://github.com/Andersseen/quartz) (`@quartz-headless/primitives`)  |
| Motion             | [Angular Movement](https://github.com/Andersseen/angular-movement)              |
| Icons              | [Lumen Icons](https://github.com/Andersseen/lumen-icons)                        |
| Styling            | Tailwind CSS 4                                                                  |
| Agent harness      | [Agentyx](https://github.com/Andersseen/agentyx) (`.agentyx.json`)              |

## Develop

Requires Node `>=22.22` and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # client + SSR server into dist/
pnpm typecheck    # Angular strict template check
pnpm i18n:check   # catalog parity and MessageFormat 2 syntax
```

## Routes

Spanish is the source locale and has no prefix; the others are prefixed. Etyma renders the requested
language on the server and writes `lang`, canonical and `hreflang` links.

| Page       | Spanish    | English       | Ukrainian     |
| ---------- | ---------- | ------------- | ------------- |
| Home       | `/`        | `/en`         | `/uk`         |
| About      | `/about`   | `/en/about`   | `/uk/about`   |
| Treatments | `/prices`  | `/en/prices`  | `/uk/prices`  |
| Contact    | `/contact` | `/en/contact` | `/uk/contact` |

The old Ukrainian prefix `/ua/**` and the duplicate `/es` redirect permanently (301), see
`vite.config.ts`. Unknown URLs render a localized page with a real 404 status.

## SEO

- Per page and language: `<title>`, description, robots, Open Graph (with `og:locale` alternates)
  and Twitter card (`src/app/seo/page-seo.ts`); Etyma adds `lang`, canonical and `hreflang`.
- `BeautySalon` JSON-LD with address, geo, opening hours and phone (`src/app/seo/business-schema.ts`).
- `/sitemap.xml` lists every page in every language with its alternates; `/robots.txt` points to it
  and blocks preview hosts (`*.vercel.app`, `*.workers.dev`, `*.pages.dev`) when served per request.
- Absolute URLs come from `VITE_SITE_URL` when it is set (the prerendered Cloudflare build), and
  from the request host otherwise, so no domain is hard-coded in the repository.
- Social image: `public/og-image.jpg` (1200×630).

## Content

All copy lives in `src/app/i18n/{es,en,uk}.json`. Lists (services, products, prices…) are objects
keyed by index (`"0"`, `"1"`…) because Etyma catalogs only allow arrays of strings; components iterate
the Spanish catalog's shape, so adding an entry to all three files is enough to show it.

## Deploy (Cloudflare Workers, free plan)

`pnpm build:cloudflare` builds with Nitro's `cloudflare-module` preset and **prerenders every page
in every language** plus `sitemap.xml` and `robots.txt` into `dist/analog/public`, using the public
site URL set in that script (`https://www.beauty-line-esthetic.es`; override it with
`VITE_SITE_URL`). Cloudflare serves those files as static assets (free and unmetered); the Worker
only answers what no file matches, such as the localized 404 page, so the free plan's 10 ms CPU
limit is never spent on rendering pages. Redirects for `/ua` and `/es` live in `public/_redirects`,
cache and security headers in `public/_headers`.

Deploy from your machine (or from VS Code's *NPM Scripts* panel). Sign in once with
`pnpm exec wrangler login`, then:

```bash
pnpm run deploy:cloudflare
```

Use `pnpm run …`: a bare `pnpm deploy` is pnpm's own workspace command, not this script.

Try the production build locally first:

```bash
VITE_SITE_URL=http://localhost:8787 pnpm build:cloudflare
```

```bash
pnpm preview:cloudflare
```

CI (`.github/workflows/ci.yml`), shown in GitHub under *Deployments*:

- **Every run:** type check, catalog validation and the prerendered build.
- **Pull requests:** `wrangler versions upload --preview-alias pr-<n>` uploads a preview version
  without touching production, at `https://pr-<n>-beauty-line-esthetic.andriipap01.workers.dev`
  (the `preview` environment).
- **`master`:** `wrangler deploy` to production (the `production` environment,
  `https://www.beauty-line-esthetic.es`).

It needs two repository secrets: `CLOUDFLARE_API_TOKEN` (Account → Workers Scripts → Edit only)
and `CLOUDFLARE_ACCOUNT_ID`.

**Domain.** DNS lives in Cloudflare (the registrar, DonDominio, only points the nameservers
there). `www.beauty-line-esthetic.es` and `beauty-line-esthetic.es` are custom domains of the
Worker (*Workers & Pages → beauty-line-esthetic → Domains*); a Redirect Rule sends the root
domain to `www` (301, path and query kept) and *Always Use HTTPS* is on. `wrangler.jsonc` turns
the public `*.workers.dev` URL off but keeps preview URLs.

## Deploy (Vercel)

Still supported: without `VITE_SITE_URL` pages are server-rendered per request. When the `VERCEL`
environment variable is present Analog switches Nitro to the Build Output API and writes
`.vercel/output`. Use the default build command (`pnpm build`) and leave the output directory empty.
