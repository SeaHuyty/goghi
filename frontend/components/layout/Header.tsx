import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="goghi home">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-lg font-bold text-brand-ink">
            g
          </span>
          <span className="text-lg font-bold tracking-tight">goghi</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
