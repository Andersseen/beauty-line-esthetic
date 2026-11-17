# Beauty Line Esthetic — agent notes

Client website and **dogfooding project** for the Andersseen libraries (Etyma, Volt UI, Quartz,
Angular Movement, Lumen Icons). Prefer those libraries as the building blocks for everything; reach
for anything else only when none of them covers the need, and log the gap in `DOGFOODING.md`.

## UI atoms: Volt UI first

Every button, card, badge, tab, popover, separator and similar atom must be a Volt UI component
(`@voltui/components`), not hand-built markup with Tailwind. Before building UI:

1. Load the `volt-ui` skills (`.claude/skills/volt-ui*`) for which component fits and how to compose it.
2. Ask the `volt-ui` MCP server (`https://voltui.dev/api/mcp`, in `.mcp.json`) for exact selectors,
   inputs and examples — never guess an API.
3. Only if Volt has no fitting component, use Quartz primitives for the behaviour; log the gap in
   `DOGFOODING.md`.

Brand styling goes through Volt's `class` input (merged by Volt) and the tokens in `src/styles.css`.

## Commands

- `pnpm dev` — Analog dev server with SSR (port 5173)
- `pnpm typecheck` — strict Angular template type check (run after every template change)
- `pnpm i18n:check` — Etyma catalog validation (run after every catalog change)
- `pnpm build` — production build; `node dist/analog/server/index.mjs` serves it (Nitro route rules
  such as the `/ua` redirects only apply here, not in `pnpm dev`)

## Layout

- `src/app/pages/*.page.ts` — Analog file routes (default-exported components)
- `src/app/layout/` — header (Quartz navbar), footer, language switcher, WhatsApp button
- `src/app/sections/` — home page sections
- `src/app/ui/` — reusable blocks (box reveal, magic card, page entrance)
- `src/app/i18n/` — catalogs and the typed `injectAppI18n()` / `listKey()` helpers
- `src/app/shared/business.ts` — phone, map, location: non-translatable facts

## Rules

- Copy goes in all three catalogs (`es` is the source). Never hard-code visible text.
- Catalog lists are index-keyed objects; iterate them with `indicesOf(sourceCatalog.x)` and build
  keys with `listKey('x', i, 'field')`.
- Links: `[routerLink]="i18n.path('/prices')"` so they stay in the active locale.
- Components are standalone, `OnPush`, zoneless and signal-based. Browser-only code (Lottie, Cobe,
  timers, observers) runs in `afterNextRender`; server render must not touch `window`.
- Angular Movement animates the individual `translate`/`scale`/`rotate` CSS properties: an initial
  state written in CSS must use those properties, not `transform`.
- Brand colours are `main-50 … main-950` (Tailwind) and are mapped onto Volt's tokens in
  `src/styles.css`.
