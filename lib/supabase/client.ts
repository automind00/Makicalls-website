"use client";

import { createBrowserClient } from "@supabase/ssr";

let cached: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Browser-side Supabase client. Use in client components only.
 * Types are read from explicit imports in `lib/supabase/types.ts`
 * to keep call sites loosely-typed without breaking on Supabase's
 * heavy generic shape requirements.
 */
export function getSupabaseBrowserClient() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars eksik — .env.local'da NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY tanımla.",
    );
  }

  cached = createBrowserClient(url, key);
  return cached;
}
