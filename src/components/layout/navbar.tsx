"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { CartDrawer } from "@/components/layout/cart-drawer";

const navLinks = [
  { href: "/#productos", label: "Productos" },
  { href: "/#nosotros", label: "Nuestra historia" },
  { href: "/#ciencia", label: "Ciencia" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const open = useCartStore((state) => state.open);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-extrabold tracking-tight text-primary">
          CLYN<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Buscar">
            <Search className="size-4.5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Mi cuenta">
            <User className="size-4.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Carrito"
            className="relative"
            onClick={open}
          >
            <ShoppingBag className="size-4.5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
