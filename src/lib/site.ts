const FALLBACK = "http://localhost:3000";

/** Returns the origin of `value` if it is a valid http(s) URL, otherwise undefined. */
export function validOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Public base URL of the site. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://sandbox.example.com).
 * A missing or malformed value falls back to localhost instead of breaking the build.
 */
export const SITE_URL = validOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? FALLBACK;
