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

## Content

All copy lives in `src/app/i18n/{es,en,uk}.json`. Lists (services, products, prices…) are objects
keyed by index (`"0"`, `"1"`…) because Etyma catalogs only allow arrays of strings; components iterate
the Spanish catalog's shape, so adding an entry to all three files is enough to show it.

## Deploy (Vercel)

No configuration needed: when the `VERCEL` environment variable is present Analog switches Nitro to
the Build Output API and writes `.vercel/output`. In the Vercel project use the default build command
(`pnpm build`) and leave the output directory empty.
