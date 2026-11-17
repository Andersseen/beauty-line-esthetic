/**
 * The public site URL (`https://example.com`, no trailing slash), from `VITE_SITE_URL` at build
 * time. Set for the Cloudflare build, where pages are prerendered and there is no request to read
 * the origin from; unset, canonical and Open Graph URLs follow the request origin instead.
 */
export const SITE_URL: string | undefined = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '') || undefined;
