"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { HiX, HiArrowRight, HiPhone } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

/* ── Easing curves ── */
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;
const easeIn  = [0.55, 0,    1,    0.45] as const;

/* ── Panel: slides from right on both sizes, full-screen on mobile ── */
const panelVariants = {
  hidden:   { x: "100%" },
  visible:  { x: 0,      transition: { duration: 0.42, ease: easeOut } },
  exit:     { x: "100%", transition: { duration: 0.32, ease: easeIn  } },
};

/* ── Stagger container for list items ── */
const listVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.045, delayChildren: 0.16 } },
};

const itemVariants = {
  hidden:   { opacity: 0, x: 16 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOut } },
};

/* ────────────────────────────────────────────────────────────── */
/* NavLink — text-first, hover arrow (Apple pattern)             */
/* ────────────────────────────────────────────────────────────── */
function NavLink({
  href,
  label,
  active,
  onClose,
}: {
  href: string;
  label: string;
  active: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "group flex items-center justify-between rounded-xl",
          /* mobile: larger touch target */
          "py-3.5 lg:py-2.5",
          "text-[16px] font-medium lg:text-[15px]",
          active ? "text-primary-600" : "text-gray-800 hover:text-gray-950",
        )}
      >
        <span className={cn(
          "transition-all duration-200",
          active ? "font-semibold" : "group-hover:translate-x-0.5",
        )}>
          {label}
          {active && (
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-500 align-middle" />
          )}
        </span>
        <HiArrowRight
          className={cn(
            "h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
            active ? "text-primary-400" : "text-gray-400",
          )}
        />
      </Link>
    </motion.div>
  );
}

/* Section label */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
      {children}
    </p>
  );
}

/* Thin divider */
function Divider() {
  return <div className="my-5 border-t border-gray-100 lg:my-6" />;
}

/* ── Props ── */
interface FullMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  otherLocale: string;
  intlPathname: string;
  pathWithoutLocale: string;
}

export default function FullMenuDrawer({
  isOpen,
  onClose,
  locale,
  otherLocale,
  intlPathname,
  pathWithoutLocale,
}: FullMenuDrawerProps) {
  const t  = useTranslations("nav");
  const td = useTranslations("drawer");

  const active = (href: string) =>
    pathWithoutLocale === href || pathWithoutLocale.startsWith(href + "/");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] hidden lg:block"
            onClick={onClose}
          />

          {/* Panel — full screen mobile, 420px side panel desktop */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-[70] flex h-full w-full flex-col bg-white lg:max-w-[420px]"
            style={{ boxShadow: "-4px 0 40px rgba(0,0,0,0.10)" }}
          >

            {/* ── MOBILE header: logo + close ── */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 lg:hidden">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/images/logo-principal.webp"
                  alt="Fundación Cigarra"
                  width={200}
                  height={56}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <HiX className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* ── DESKTOP header: close + donate ── */}
            <div className="hidden items-center justify-between px-7 py-5 lg:flex">
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              >
                <HiX className="h-4 w-4" />
              </button>
              <Link
                href={locale === "en" ? "/donate" : "/como-ayudar"}
                onClick={onClose}
                className="rounded-full bg-accent-500 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/35"
              >
                {t("donate")}
              </Link>
            </div>

            {/* ── Scrollable body ── */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="flex-1 overflow-y-auto px-6 pb-4 lg:px-7"
            >
              {/* Mobile top spacing */}
              <div className="h-5 lg:h-0" />

              {/* Conoce la Fundación */}
              <section>
                <Label>{td("foundation")}</Label>
                {[
                  { href: "/quienes-somos", label: t("about") },
                  { href: "/equipo",        label: t("team") },
                  { href: "/himno",         label: t("anthem") },
                ].map((item) => (
                  <NavLink key={item.href} {...item} active={active(item.href)} onClose={onClose} />
                ))}
              </section>

              <Divider />

              {/* Programas */}
              <section>
                <Label>{td("programs")}</Label>
                <motion.div
                  variants={itemVariants}
                  className="mb-2 grid grid-cols-2 gap-x-2 gap-y-1"
                >
                  {[
                    { href: "/programas/primera-infancia", label: td("primeraInfancia") },
                    { href: "/programas/danza",            label: td("danzaMusica") },
                    { href: "/programas/refuerzo-escolar", label: td("refuerzoEscolar") },
                    { href: "/programas/tecnologia",       label: td("tecnologia") },
                    { href: "/programas/psicologia",       label: td("psicologia") },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 lg:px-2.5 lg:py-2",
                        active(item.href)
                          ? "font-semibold text-primary-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="/programas"
                    onClick={onClose}
                    className="group inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 lg:px-2.5"
                  >
                    {td("allPrograms")}
                    <HiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </section>

              <Divider />

              {/* Cómo Ayudar — gradient CTA card */}
              <motion.section variants={itemVariants}>
                <Label>{td("help")}</Label>
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 p-5 text-white shadow-lg shadow-accent-500/20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
                    {locale === "es" ? "Marca la diferencia" : "Make a difference"}
                  </p>
                  <p className="mt-1.5 text-lg font-bold leading-snug lg:text-base">
                    {locale === "es" ? "Transforma una vida hoy" : "Transform a life today"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { href: "/como-ayudar",  label: t("howToHelp") },
                      { href: "/plan-padrino", label: t("planPadrino") },
                      { href: "/voluntariado", label: t("volunteer") },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-semibold transition-all lg:py-1.5",
                          active(item.href)
                            ? "bg-white text-accent-600 shadow-sm"
                            : "bg-white/20 text-white hover:bg-white/30",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.section>

              <Divider />

              {/* Empresas — outlined card */}
              <motion.section variants={itemVariants}>
                <Label>{td("corporate")}</Label>
                <Link
                  href="/impacto-empresarial"
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300",
                    active("/impacto-empresarial")
                      ? "border-primary-200 bg-primary-50"
                      : "border-gray-100 bg-gray-50 hover:border-primary-200 hover:bg-primary-50/60",
                  )}
                >
                  <div>
                    <p className={cn(
                      "font-semibold transition-colors",
                      "text-[15px]",
                      active("/impacto-empresarial")
                        ? "text-primary-700"
                        : "text-gray-800 group-hover:text-primary-700",
                    )}>
                      {t("corporateImpact")}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {locale === "es"
                        ? "Alianzas que transforman comunidades"
                        : "Partnerships that transform communities"}
                    </p>
                  </div>
                  <HiArrowRight className={cn(
                    "h-5 w-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5",
                    active("/impacto-empresarial")
                      ? "text-primary-400"
                      : "text-gray-300 group-hover:text-primary-400",
                  )} />
                </Link>
              </motion.section>

              <Divider />

              {/* Contenido */}
              <section>
                <Label>{td("content")}</Label>
                {[
                  { href: "/noticias", label: t("news") },
                  { href: "/videos",   label: t("videos") },
                ].map((item) => (
                  <NavLink key={item.href} {...item} active={active(item.href)} onClose={onClose} />
                ))}
              </section>

              {/* Bottom padding for scroll clearance */}
              <div className="h-4" />
            </motion.div>

            {/* ── MOBILE sticky footer: full-width donate CTA ── */}
            <div className="border-t border-gray-100 px-6 pb-8 pt-4 lg:hidden">
              <Link
                href={locale === "en" ? "/donate" : "/como-ayudar"}
                onClick={onClose}
                className="block w-full rounded-full bg-accent-500 py-4 text-center text-base font-bold text-white shadow-lg shadow-accent-500/30 transition-all active:scale-[0.98]"
              >
                {t("donate")}
              </Link>
            </div>

            {/* ── DESKTOP footer: contact + language ── */}
            <div className="hidden items-center justify-between border-t border-gray-100 px-7 py-4 lg:flex">
              <Link
                href="/contacto"
                onClick={onClose}
                className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
              >
                <HiPhone className="h-4 w-4" />
                {t("contact")}
              </Link>
              <Link
                href={intlPathname}
                locale={otherLocale}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700"
                title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
              >
                <span className="text-lg leading-none">
                  {locale === "es" ? "🇬🇧" : "🇨🇴"}
                </span>
                <span>{locale === "es" ? "English" : "Español"}</span>
              </Link>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
