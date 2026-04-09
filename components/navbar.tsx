import Link from "next/link";

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

const defaultItems: NavbarItem[] = [
  { href: "/", label: "Home" },
  { href: "/multi-viewer", label: "Multi-Viewer" },
  { href: "/recent", label: "Recent" },
  { href: "/member", label: "Member" },
  { href: "/event", label: "Event" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

function NavbarLink({
  href,
  label,
  isActive,
}: NavbarItem & {
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm leading-none text-white transition-opacity ${
        isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar({
  activeHref = "/",
  brandName = "JKT48 Radar",
  brandTagline = "by JKT48 Data Hub",
  items = defaultItems,
  overlay = false,
}: NavbarProps) {
  return (
    <header
      className={`w-full ${
        overlay
          ? "absolute inset-x-0 top-0 z-20 border-b border-transparent bg-transparent"
          : "border-b border-white/6 bg-[#121416]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-3 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-24">
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="text-[1.25rem] leading-none font-bold tracking-[-0.02em] text-white"
          >
            {brandName}
          </Link>
          <p className="mt-1 text-[0.625rem] leading-none text-white/50">
            {brandTagline}
          </p>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end"
        >
          {items.map((item) => (
            <NavbarLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={item.href === activeHref}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
