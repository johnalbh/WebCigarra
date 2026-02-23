"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HiMenu, HiX, HiChevronDown, HiBriefcase, HiHeart } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react";
import { usePathname as useNextPathname } from "next/navigation";

/* ── Nav structure with dropdowns ── */
type NavChild = { href: string; key: string; highlight?: boolean };
type NavItem = {
  href?: string;
  key: string;
  children?: NavChild[];
  featured?: boolean;
};

const navItems: NavItem[] = [
  { href: "/", key: "home" },
  {
    key: "aboutUs",
    children: [
      { href: "/quienes-somos", key: "about" },
      { href: "/equipo", key: "team" },
      { href: "/himno", key: "anthem" },
    ],
  },
  { href: "/programas", key: "programs" },
  { href: "/impacto-empresarial", key: "companies", featured: true },
  {
    key: "getInvolved",
    featured: true,
    children: [
      { href: "/como-ayudar", key: "howToHelp" },
      { href: "/plan-padrino", key: "planPadrino" },
      { href: "/voluntariado", key: "volunteer" },
    ],
  },
  { href: "/noticias", key: "news" },
  { href: "/contacto", key: "contact" },
];

/* ── Dropdown component ── */
function DesktopDropdown({
  label,
  children,
  scrolled,
  pathWithoutLocale,
  t,
  featured,
}: {
  label: string;
  children: NavChild[];
  scrolled: boolean;
  pathWithoutLocale: string;
  t: (key: string) => string;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = children.some((c) => pathWithoutLocale === c.href || pathWithoutLocale.startsWith(c.href + "/"));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-500 ease-out",
          featured
            ? scrolled
              ? "bg-accent-50 text-accent-700 hover:bg-accent-100"
              : "bg-white/15 text-white hover:bg-white/25"
            : isActive
              ? scrolled
                ? "bg-primary-50 text-primary-600"
                : "bg-white/20 text-white"
              : scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10 hover:text-white",
        )}
      >
        {featured && (
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <HiHeart className={cn("h-4 w-4", scrolled ? "text-accent-500" : "text-accent-400")} />
          </motion.span>
        )}
        {label}
        {featured && (
          <span className="relative ml-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
          </span>
        )}
        <HiChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300 ease-out", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[220px] overflow-hidden rounded-xl border border-gray-100 bg-white/95 backdrop-blur-xl py-2 shadow-xl"
          >
            {children.map((child) => (
              <Link
                key={child.key}
                href={child.href as "/"}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  child.highlight && "border-l-2 border-accent-500",
                  pathWithoutLocale === child.href
                    ? "bg-primary-50 text-primary-600"
                    : child.highlight
                      ? "text-gray-700 hover:bg-accent-50 hover:text-accent-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
                )}
              >
                {child.highlight && <HiBriefcase className="h-4 w-4 text-accent-500" />}
                {t(child.key)}
                {child.highlight && (
                  <span className="ml-auto rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-semibold text-accent-700">{t("companies")}</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = useNextPathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const isHome = pathWithoutLocale === "/";

  /* White logo at top (all pages have dark hero), original on scroll. */
  const showWhiteLogo = !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  const otherLocale = locale === "es" ? "en" : "es";
  const switchLocaleHref = `/${otherLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
        scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8 lg:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-principal.webp"
            alt="Fundación Cigarra"
            width={400}
            height={112}
            priority
            style={{
              width: "auto",
              height: "5.5rem",
              transition: "all 700ms ease-out",
            }}
            className={cn(
              showWhiteLogo ? "brightness-0 invert" : "",
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.key}
                label={t(item.key)}
                children={item.children}
                scrolled={scrolled}
                pathWithoutLocale={pathWithoutLocale}
                t={t}
                featured={item.featured}
              />
            ) : (
              <Link
                key={item.key}
                href={item.href as "/"}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-500 ease-out",
                  item.featured
                    ? scrolled
                      ? "bg-accent-50 text-accent-700 hover:bg-accent-100"
                      : "bg-white/15 text-white hover:bg-white/25"
                    : pathWithoutLocale === item.href
                      ? scrolled
                        ? "bg-primary-50 text-primary-600"
                        : "bg-white/20 text-white"
                      : scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white/90 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.featured && <HiBriefcase className={cn("h-4 w-4", scrolled ? "text-accent-500" : "text-accent-400")} />}
                {t(item.key)}
              </Link>
            ),
          )}
        </div>

        {/* Right side: Language + Donate */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={switchLocaleHref}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-500 ease-out",
              scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white/90 hover:bg-white/10",
            )}
          >
            {locale === "es" ? "EN" : "ES"}
          </a>
          <Link
            href="/como-ayudar"
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-500 ease-out hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
          >
            {t("donate")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? (
            <HiX className={cn("h-6 w-6 transition-colors duration-500", scrolled ? "text-gray-800" : "text-white")} />
          ) : (
            <HiMenu className={cn("h-6 w-6 transition-colors duration-500", scrolled ? "text-gray-800" : "text-white")} />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden border-t bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.key}>
                    <button
                      onClick={() => setMobileSubmenu(mobileSubmenu === item.key ? null : item.key)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                        item.featured
                          ? "bg-accent-50 text-accent-700"
                          : item.children.some((c) => pathWithoutLocale === c.href)
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {item.featured && (
                          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            <HiHeart className="h-4 w-4 text-accent-500" />
                          </motion.span>
                        )}
                        {t(item.key)}
                        {item.featured && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                          </span>
                        )}
                      </span>
                      <HiChevronDown
                        className={cn("h-4 w-4 transition-transform duration-300 ease-out", mobileSubmenu === item.key && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-1 border-l-2 border-primary-100 py-1 pl-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.key}
                                href={child.href as "/"}
                                className={cn(
                                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300",
                                  pathWithoutLocale === child.href
                                    ? "bg-primary-50 text-primary-600"
                                    : child.highlight
                                      ? "text-accent-700 hover:bg-accent-50"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-primary-600",
                                )}
                              >
                                {child.highlight && <HiBriefcase className="h-4 w-4 text-accent-500" />}
                                {t(child.key)}
                                {child.highlight && (
                                  <span className="ml-auto rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-semibold text-accent-700">
                                    {t("companies")}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    href={item.href as "/"}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                      item.featured
                        ? "bg-accent-50 text-accent-700"
                        : pathWithoutLocale === item.href
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    {item.featured && <HiBriefcase className="h-4 w-4 text-accent-500" />}
                    {t(item.key)}
                  </Link>
                ),
              )}

              <div className="border-t pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <a
                    href={switchLocaleHref}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300"
                  >
                    {locale === "es" ? "English" : "Español"}
                  </a>
                  <Link
                    href="/como-ayudar"
                    className="flex-1 rounded-full bg-accent-500 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600"
                  >
                    {t("donate")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
