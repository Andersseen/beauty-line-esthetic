import { defineEventHandler, setHeader } from 'h3';

import { LOCALES, PAGES, SOURCE_LOCALE, localizedPath, requestOrigin } from '../utils/site';

/** Every page in every language, each listing all its language alternates (hreflang). */
export default defineEventHandler((event) => {
  const origin = requestOrigin(event);
  setHeader(event, 'content-type', 'application/xml; charset=utf-8');

  const urls = PAGES.flatMap((page) =>
    LOCALES.map((locale) => {
      const alternates = [
        ...LOCALES.map(
          (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${origin}${localizedPath(page, alt)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localizedPath(page, SOURCE_LOCALE)}"/>`,
      ].join('\n');
      return `  <url>\n    <loc>${origin}${localizedPath(page, locale)}</loc>\n${alternates}\n  </url>`;
    }),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
});
