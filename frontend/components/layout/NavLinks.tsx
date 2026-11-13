"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserIcon } from "@/components/ui/Icons";

const links = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/profile", label: "Profile", Icon: UserIcon },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center gap-1">
      {links.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              active ? "bg-brand-soft text-link" : "text-muted hover:bg-card hover:text-foreground"
            }`}
          >
            <Icon /> <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
