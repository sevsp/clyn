/**
 * Dominio público del sitio. Detrás de Netlify el servidor ve hosts internos
 * (URLs de deploy), así que no se puede confiar en Host/Origin para saber
 * cuál es la URL real.
 */
export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
