import Link from "next/link";
import { AtSign, Globe, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-xl font-extrabold">
            CLYN<span className="text-accent">.</span>
          </p>
          <p className="text-sm text-primary-foreground/70">
            Cuidado personal inteligente: ve mejor, respira mejor.
          </p>
          <div className="flex gap-3 pt-1">
            <AtSign className="size-4.5 opacity-80" />
            <Globe className="size-4.5 opacity-80" />
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Tienda</p>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><Link href="/productos/lentes-antiluz">Lentes antiluz</Link></li>
            <li><Link href="/productos/bandas-nasales">Bandas nasales</Link></li>
            <li><Link href="/carrito">Carrito</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Compañía</p>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><Link href="/#nosotros">Nuestra historia</Link></li>
            <li><Link href="/#ciencia">Ciencia</Link></li>
            <li><Link href="#">Términos y condiciones</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Contacto</p>
          <ul className="space-y-2 text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Mail className="size-4" /> hola@clyn.co
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" /> +57 300 123 4567
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
