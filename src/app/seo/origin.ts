import { DOCUMENT, inject } from '@angular/core';
import { injectRequest } from '@analogjs/router/tokens';

function firstHeader(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.split(',')[0]?.trim() || undefined;
}

/**
 * The site origin of the current render (`https://example.com`), with no trailing slash.
 *
 * On the server it comes from the request (`host`, then the proxy's protocol), so the same build
 * is correct on localhost, preview deployments and the production domain. In the browser it is
 * `location.origin`.
 */
export function injectOrigin(): string {
  const request = injectRequest();
  if (request) {
    // `host` first, like Etyma's canonical/hreflang links, so og:url and canonical always agree.
    const host = firstHeader(request.headers.host) ?? firstHeader(request.headers['x-forwarded-host']);
    const proto =
      firstHeader(request.headers['x-forwarded-proto']) ??
      ((request.socket as { encrypted?: boolean } | undefined)?.encrypted ? 'https' : 'http');
    if (host) return `${proto}://${host}`;
  }
  return inject(DOCUMENT).location?.origin ?? '';
}
