import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";

const whatsappContacts = [
  { name: "Sebastian Mendieta", phone: "595991863176" },
  { name: "Franco Andrada", phone: "595982868039" },
];

const instagramUrl = "https://www.instagram.com/clynpy";
const email = "clynpy@gmail.com";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="inline-block" aria-label="CLYN">
            <Logo />
          </Link>
          <p className="text-sm text-primary-foreground/70">
            Cuidado personal inteligente: ve mejor, respira mejor.
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <InstagramIcon className="size-4.5" />
            </a>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Tienda</p>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><Link href="/productos/lentes-antiluz">Lentes antiluz azul</Link></li>
            <li><Link href="/productos/bandas-nasales">Bandas nasales</Link></li>
            <li><Link href="/carrito">Carrito</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Compañía</p>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><Link href="/#nosotros">Nuestra historia</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Contacto</p>
          <ul className="space-y-2 text-primary-foreground/70">
            {whatsappContacts.map((contact) => (
              <li key={contact.phone} className="flex items-center gap-2">
                <Phone className="size-4" />
                <a
                  href={`https://wa.me/${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground"
                >
                  {contact.name}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <InstagramIcon className="size-4" />
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground"
              >
                @clynpy
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" />
              <a href={`mailto:${email}`} className="hover:text-primary-foreground">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} CLYN. Todos los derechos reservados.
      </div>
    </footer>
  );
}
