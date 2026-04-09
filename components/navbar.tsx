"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export type NavbarItem = {
  href: string;
  label: string;
};

type NavbarProps = {
  activeHref?: string;
  brandName?: string;
  brandTagline?: string;
  items?: NavbarItem[];
  overlay?: boolean;
};

type NavbarLinkProps = NavbarItem & {
  isActive: boolean;
  onClick?: () => void;
};

const defaultItems: NavbarItem[] = [
  { href: "/", label: "Home" },
  { href: "/multi-viewer", label: "Multi-Viewer" },
  { href: "/recent", label: "Recent" },
  { href: "/member", label: "Member" },
  { href: "/event", label: "Event" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

function NavbarLink({ href, label, isActive, onClick }: NavbarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm leading-none text-white transition-opacity ${
        isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
      }`}
    >
      {label}
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d={open ? "M5 5L19 19" : "M4 7H20"} />
      <path d={open ? "M19 5L5 19" : "M4 12H20"} />
      {!open ? <path d="M4 17H20" /> : null}
    </svg>
  );
}

export function Navbar({
  activeHref = "/",
  brandName = "JKT48 Radar",
  brandTagline = "by JKT48 Data Hub",
  items = defaultItems,
  overlay = false,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentHref = pathname ?? activeHref;

  return (
    <header
      className={`w-full ${
        overlay
          ? "absolute inset-x-0 top-0 z-20 border-b border-transparent bg-transparent"
          : "border-b border-white/6 bg-[#121416]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-3 sm:px-10 lg:px-24">
        <div className="flex items-start justify-between gap-6 lg:items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/svg/Logo.svg"
              alt="JKT48 Radar Logo"
              width={40}
              height={40}
              className="h-8 w-8 sm:h-9 sm:w-9"
              priority
            />
            <span className="flex flex-col items-start">
              <span className="text-[1.25rem] leading-none font-bold tracking-[-0.02em] text-white">
                {brandName}
              </span>
              <span className="mt-1 text-[0.625rem] leading-none text-white/50">
                {brandTagline}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-3 lg:flex"
          >
            {items.map((item) => (
              <NavbarLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={item.href === currentHref}
              />
            ))}
          </nav>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="-mr-1 mt-1 inline-flex items-center justify-center p-0 text-white lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>

        <nav
          aria-label="Primary mobile"
          className={`${mobileOpen ? "mt-5 flex" : "hidden"} flex-col gap-4 lg:hidden`}
        >
          {items.map((item) => (
            <NavbarLink
              key={`mobile-${item.href}`}
              href={item.href}
              label={item.label}
              isActive={item.href === currentHref}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
