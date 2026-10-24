type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

export const PIXEL_CURRENCY = "PYG";

const MAX_WAIT_MS = 10_000;
const RETRY_MS = 200;

// El script del píxel se carga después de hidratar la página, así que un evento
// disparado al montar puede llegar antes de que exista fbq: reintentamos.
export function trackPixel(event: string, params?: Record<string, unknown>) {
  const startedAt = Date.now();
  const attempt = () => {
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (fbq) {
      fbq("track", event, params);
    } else if (Date.now() - startedAt < MAX_WAIT_MS) {
      setTimeout(attempt, RETRY_MS);
    }
  };
  attempt();
}
