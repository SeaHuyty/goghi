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
    <nav aria-label="Main" className="flex items-center gap-1 rounded-full bg-background/70 p-1">
      {links.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              active ? "bg-card text-foreground shadow-card ring-1 ring-border" : "text-muted hover:text-foreground"
            }`}
          >
            <Icon className={`size-[18px] ${active ? "text-foreground" : ""}`} /> <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
