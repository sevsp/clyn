type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

export const PIXEL_CURRENCY = "PYG";

export function trackPixel(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.("track", event, params);
}
