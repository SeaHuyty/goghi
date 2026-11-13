import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-20 px-3 pt-3">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full bg-card/70 pl-4 pr-2 shadow-card ring-1 ring-border backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="goghi home">
          <Logo size={32} />
          <span className="text-lg font-bold tracking-tight">
            goghi
          </span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
