import { defineEventHandler, setHeader } from 'h3';

import { isPreviewHost, requestOrigin } from '../utils/site';

export default defineEventHandler((event) => {
  const origin = requestOrigin(event);
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');

  if (isPreviewHost(origin)) {
    return 'User-agent: *\nDisallow: /\n';
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
});
