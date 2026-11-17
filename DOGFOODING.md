# Dogfooding log

Findings from migrating this site from Next.js/React to Analog with the Andersseen libraries.
Each entry: what happened, the workaround used here, and what the library could do.

## Angular Movement (1.2.0)

1. **Percentage `x` is not applied.** A variant `{ x: '101%' }` left the element in place (the
   `translate` property ends up without a valid value). Workaround: animate `left` instead
   (`src/app/ui/box-reveal.ts`). Expected: `x`/`y` accept `%` (and other CSS lengths) as strings.
2. **`moveText` drops word spaces inside a flex container.** The split leaves the space as a bare
   text node between per-character `inline-block` spans; in an `inline-flex` parent it collapses, so
   "Sobre mí" renders as "Sobremí". Workaround: `inline-block` + `whitespace-pre` on the host
   (`src/app/layout/header.ts`). Suggestion: wrap spaces in their own span (`&nbsp;` or
   `white-space: pre`) when splitting.
3. **CSS initial states must use individual transform properties.** A pre-hydration hidden state
   written as `transform: translateY(75px)` stacks with the library's `translate`, leaving content
   permanently offset. Worth a line in the docs (SSR / "avoid a flash" section).

## Quartz (`@quartz-headless/primitives` 0.16.0)

1. **`qzNavbarMenu` hides with `display: none` immediately**, so a closing animation on the menu
   panel cannot run. The header here animates the panel's entrance only; the overlay uses
   `*movePresence` outside the menu. Suggestion: a `data-qz-closing` phase or a presence hook.
2. Focus trap moves focus to the first menu link on open; a `:focus-within` "dim the others" style
   then dims every link. Used `:has(a:focus-visible)` instead — maybe worth a docs note.

## Volt UI

1. npm has **1.3.3**, the repo is at **1.4.1** (which moves popover/tabs onto Quartz). This site
   uses 1.3.3 and pulls Quartz directly for the navbar.
2. No colour preset fits a brand palette; the site sets Volt's tokens (`--primary`, `--surface`…)
   on `:root` and imports only `themes/core.css` + `themes/styles/soft.css`. Works well — a
   documented "bring your own colours" recipe would make it obvious.

3. **`volt-toggle-group-item`'s `class` input styles the host, not the inner `<button>`** that
   carries `data-selected`, `aria-checked` and the visual classes. Restyling the selected pill had
   to go through scoped tokens (`--primary`, `--muted`, `--radius`) plus a component stylesheet for
   size (`src/app/layout/language-switcher.ts`). Suggestion: merge `class` into the button, or add
   a `buttonClass` input.
4. **No size below `sm`** for toggle-group items (and buttons): a compact header switch needed CSS
   on the inner button.
5. **Ghost button hover is `data-[hover]:bg-accent`**, so an app's `hover:bg-*` in `class` does not
   replace it (tailwind-merge only dedupes the same variant). Passing `data-[hover]:bg-*` works;
   worth a line in the styling docs.

## Lumen Icons (0.2.0)

1. The published package declares `@angular/core ^21.0.0` only; Angular 22 needs a
   `pnpm.peerDependencyRules` override (repo is at 0.3.0 with `^21 || ^22`, not published yet).
2. No `leaf` / plant icon (used `sun` for "natural products"). `message-circle` covered the old
   WhatsApp icon exactly.
3. `size` accepts only `12 | 14 | 16 | 20 | 24 | 32`, so the old 28px icons became 24/32.

## Etyma (1.0.0)

1. Catalog arrays may only contain strings. The site's content (services, products, price lists)
   was arrays of objects; it became index-keyed objects plus a small `listKey()` helper whose cast
   bridges the numeric index into the literal key type. A typed helper for "list of records" keys
   (or support for arrays of objects) would remove the cast.
2. **Canonical/hreflang origin ignores `x-forwarded-host`** (it uses `host` plus
   `x-forwarded-proto`). Fine on Vercel, where both carry the public domain, but behind a proxy
   that rewrites `host` the canonical would point at the internal host. The site's own `og:url`,
   JSON-LD and sitemap follow the same rule so they never disagree (`src/app/seo/origin.ts`).
   Suggestion: honour `x-forwarded-host`, or document the `origin` option for that case.
3. Everything else worked first time: SSR in the right language, `hreflang`/canonical, navigation
   based locale switching that keeps the page and component state.
