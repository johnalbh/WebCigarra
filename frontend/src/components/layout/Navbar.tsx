"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  HiMenu, HiX, HiChevronDown, HiBriefcase, HiHeart, HiArrowRight,
  HiUserGroup, HiUsers, HiMusicNote, HiLightBulb, HiGift, HiHand,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import { motion, AnimatePresence } from "motion/react";
import { usePathname as useNextPathname } from "next/navigation";

/* ── Nav structure with dropdowns ── */
type NavChild = { href: string; key: string; descKey: string; icon: IconType; highlight?: boolean };
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
      { href: "/quienes-somos", key: "about", descKey: "aboutDesc", icon: HiUserGroup },
      { href: "/equipo", key: "team", descKey: "teamDesc", icon: HiUsers },
      { href: "/himno", key: "anthem", descKey: "anthemDesc", icon: HiMusicNote },
    ],
  },
  { href: "/programas", key: "programs" },
  { href: "/impacto-empresarial", key: "companies", featured: true },
  {
    key: "getInvolved",
    featured: true,
    children: [
      { href: "/como-ayudar", key: "howToHelp", descKey: "howToHelpDesc", icon: HiLightBulb },
      { href: "/plan-padrino", key: "planPadrino", descKey: "planPadrinoDesc", icon: HiGift },
      { href: "/voluntariado", key: "volunteer", descKey: "volunteerDesc", icon: HiHand },
    ],
  },
  { href: "/noticias", key: "news" },
  { href: "/videos", key: "videos" },
  { href: "/contacto", key: "contact" },
];

/* ── Dropdown component (charity:water style with hover descriptions) ── */
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
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isActive = children.some((c) => pathWithoutLocale === c.href || pathWithoutLocale.startsWith(c.href + "/"));

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
      setHoveredKey(null);
    }, 150);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-500 ease-out",
          featured
            ? scrolled
              ? "bg-accent-50 text-accent-700 hover:bg-accent-100"
              : "bg-white/15 text-white hover:bg-white/25"
            : isActive || open
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
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[320px] overflow-hidden rounded-xl border border-gray-100 bg-white backdrop-blur-xl shadow-2xl shadow-black/10"
          >
            {children.map((child, i) => {
              const isHovered = hoveredKey === child.key;
              const isChildActive = pathWithoutLocale === child.href;
              return (
                <div key={child.key}>
                  <Link
                    href={child.href}
                    onClick={() => {
                      setOpen(false);
                      setHoveredKey(null);
                    }}
                    onMouseEnter={() => setHoveredKey(child.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={cn(
                      "group block px-5 py-4 transition-all duration-200",
                      isChildActive
                        ? "bg-primary-50"
                        : isHovered
                          ? "bg-gray-50"
                          : "bg-white",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2.5">
                        <child.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors duration-200",
                            isChildActive
                              ? "text-primary-500"
                              : isHovered
                                ? featured ? "text-accent-500" : "text-primary-500"
                                : "text-gray-400",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[15px] font-semibold transition-colors duration-200",
                            isChildActive
                              ? "text-primary-600"
                              : isHovered
                                ? "text-gray-900"
                                : "text-gray-700",
                          )}
                        >
                          {t(child.key)}
                        </span>
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiArrowRight
                          className={cn(
                            "h-4 w-4",
                            featured ? "text-accent-500" : "text-primary-500",
                          )}
                        />
                      </motion.span>
                    </div>
                    <AnimatePresence mode="wait">
                      {isHovered && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="mt-1.5 ml-[30px] text-[13px] leading-relaxed text-gray-500"
                        >
                          {t(child.descKey)}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </Link>
                  {i < children.length - 1 && (
                    <div className="mx-5 border-t border-gray-100" />
                  )}
                </div>
              );
            })}
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

  /* Pages without a dark hero section — force scrolled (opaque) header */
  const lightPages = ["/donacion/respuesta"];
  const isLightPage = lightPages.some((p) => pathWithoutLocale.startsWith(p));

  /* White logo at top (pages with dark hero), original on scroll or light pages. */
  const showWhiteLogo = !scrolled && !isLightPage;

  useEffect(() => {
    if (isLightPage) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLightPage]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  const otherLocale = locale === "es" ? "en" : "es";
  const intlPathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-linear-to-b from-black/40 to-transparent lg:bg-transparent lg:from-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8 lg:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-principal.webp"
            alt="Fundación Cigarra"
            width={400}
            height={112}
            priority
            className={cn(
              "h-12 w-auto transition-all duration-700 ease-out lg:h-24",
              scrolled && "lg:h-18",
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
                href={item.href!}
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
          <Link
            href={intlPathname}
            locale={otherLocale}
            className={cn(
              "rounded-lg px-3 py-1.5 text-2xl leading-none transition-all duration-500 ease-out hover:scale-110",
              scrolled ? "hover:bg-gray-100" : "hover:bg-white/10",
            )}
            title={locale === "es" ? "English" : "Español"}
          >
            {locale === "es" ? "🇬🇧" : "🇨🇴"}
          </Link>
          <Link
            href={locale === "en" ? "/donate" : "/como-ayudar"}
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-500 ease-out hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
          >
            {locale === "en" ? "Donate Now" : t("donate")}
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
                                href={child.href}
                                className={cn(
                                  "flex items-start gap-3 rounded-lg px-4 py-2.5 transition-all duration-300",
                                  pathWithoutLocale === child.href
                                    ? "bg-primary-50"
                                    : "hover:bg-gray-50",
                                )}
                              >
                                <child.icon
                                  className={cn(
                                    "mt-0.5 h-4 w-4 shrink-0",
                                    pathWithoutLocale === child.href
                                      ? "text-primary-500"
                                      : "text-gray-400",
                                  )}
                                />
                                <div>
                                  <span
                                    className={cn(
                                      "text-sm font-medium",
                                      pathWithoutLocale === child.href
                                        ? "text-primary-600"
                                        : "text-gray-700",
                                    )}
                                  >
                                    {t(child.key)}
                                  </span>
                                  <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                                    {t(child.descKey)}
                                  </p>
                                </div>
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
                    href={item.href!}
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
                  <Link
                    href={intlPathname}
                    locale={otherLocale}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300"
                  >
                    <span className="text-xl leading-none">{locale === "es" ? "🇬🇧" : "🇨🇴"}</span>
                    {locale === "es" ? "English" : "Español"}
                  </Link>
                  <Link
                    href={locale === "en" ? "/donate" : "/como-ayudar"}
                    className="flex-1 rounded-full bg-accent-500 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600"
                  >
                    {locale === "en" ? "Donate Now" : t("donate")}
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
