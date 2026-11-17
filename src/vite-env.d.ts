/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site URL for prerendered builds (see src/app/shared/site-url.ts). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
