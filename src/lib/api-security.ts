/**
 * Same-origin check for state-changing Route Handlers under /api.
 * Server Actions get this for free from Next.js; plain Route Handlers don't.
 */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  // Same-origin requests from a browser always send Origin on fetch/POST;
  // a missing Origin (e.g. curl, server-to-server) is rejected by callers
  // that need this check — external callers like webhooks don't use it.
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/**
 * Best-effort in-memory rate limiter, keyed per process. This does NOT
 * persist across serverless instances/restarts — it's a defense-in-depth
 * layer against naive spam, not a substitute for an edge/WAF rate limit.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}
