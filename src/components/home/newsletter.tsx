const whatsappContacts = [{ name: "CLYN", phone: "595973477019" }];

const instagramUrl = "https://www.instagram.com/clynpy";
const email = "clynpy@gmail.com";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.84-1.23-4.7-4.1-4.84-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.05.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.22.55.34.07.13.07.72-.17 1.4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function Newsletter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-5 py-10 text-primary-foreground sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-[#25D366]/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-[#E1306C]/30 blur-3xl" />

        <div className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1 text-xs font-medium tracking-wide text-primary-foreground/70 uppercase">
            Estamos en línea
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold sm:text-3xl">
            Contáctanos
          </h2>
          <p className="mx-auto mt-2 max-w-md text-primary-foreground/70">
            Comunícate con nosotros por WhatsApp, Instagram o email para
            resolver tus consultas.
          </p>
        </div>

        {/* Mobile: compact tap rows — the hover-lift card treatment doesn't do
            anything useful on touch, so this trades it for a shorter list. */}
        <div className="relative mt-8 flex flex-col gap-3 sm:hidden">
          {whatsappContacts.map((contact) => (
            <a
              key={contact.phone}
              href={`https://wa.me/${contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition active:scale-[0.98] active:bg-white/10"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30">
                <WhatsAppIcon className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">WhatsApp</p>
                <p className="truncate text-sm text-primary-foreground/60">{contact.name}</p>
              </div>
              <ArrowIcon />
            </a>
          ))}

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition active:scale-[0.98] active:bg-white/10"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-[#FEE411] via-[#E1306C] to-[#5B51D8] text-white shadow-lg shadow-[#E1306C]/30">
              <InstagramIcon className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Instagram</p>
              <p className="truncate text-sm text-primary-foreground/60">@clynpy</p>
            </div>
            <ArrowIcon />
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition active:scale-[0.98] active:bg-white/10"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EA4335] text-white shadow-lg shadow-[#EA4335]/30">
              <MailIcon className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Email</p>
              <p className="truncate text-sm text-primary-foreground/60">{email}</p>
            </div>
            <ArrowIcon />
          </a>
        </div>

        {/* Desktop / tablet: unchanged. */}
        <div className="relative mt-10 hidden gap-5 sm:grid sm:grid-cols-3">
          {whatsappContacts.map((contact) => (
            <a
              key={contact.phone}
              href={`https://wa.me/${contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/50 hover:bg-white/10 hover:shadow-[0_8px_30px_-6px_rgba(37,211,102,0.45)]"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30">
                  <WhatsAppIcon className="size-6" />
                </span>
                <ArrowIcon />
              </div>
              <div className="mt-6">
                <p className="font-semibold">WhatsApp</p>
                <p className="text-sm text-primary-foreground/60">{contact.name}</p>
              </div>
            </a>
          ))}

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C]/50 hover:bg-white/10 hover:shadow-[0_8px_30px_-6px_rgba(225,48,108,0.45)]"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-tr from-[#FEE411] via-[#E1306C] to-[#5B51D8] text-white shadow-lg shadow-[#E1306C]/30">
                <InstagramIcon className="size-6" />
              </span>
              <ArrowIcon />
            </div>
            <div className="mt-6">
              <p className="font-semibold">Instagram</p>
              <p className="text-sm text-primary-foreground/60">@clynpy</p>
            </div>
          </a>

          <a
            href={`mailto:${email}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#EA4335]/50 hover:bg-white/10 hover:shadow-[0_8px_30px_-6px_rgba(234,67,53,0.45)]"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#EA4335] text-white shadow-lg shadow-[#EA4335]/30">
                <MailIcon className="size-6" />
              </span>
              <ArrowIcon />
            </div>
            <div className="mt-6">
              <p className="font-semibold">Email</p>
              <p className="truncate text-sm text-primary-foreground/60">{email}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
