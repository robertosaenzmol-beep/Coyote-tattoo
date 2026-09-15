/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly INSTAGRAM_ACCESS_TOKEN?: string;
  readonly INSTAGRAM_USER_ID?: string;
  readonly KV_REST_API_URL?: string;
  readonly KV_REST_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
