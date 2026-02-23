"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/shared/StaggerContainer";
import HeroWaves from "@/components/shared/HeroWaves";
import {
  HiHeart,
  HiUserGroup,
  HiChevronDown,
  HiStar,
  HiSparkles,
  HiShieldCheck,
  HiGlobeAlt,
  HiAcademicCap,
  HiCheckCircle,
  HiArrowRight,
  HiClipboardCheck,
  HiDocumentReport,
  HiPhotograph,
  HiMail,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import { FaChild, FaHandHoldingHeart, FaChartLine, FaPaypal } from "react-icons/fa";


const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Pricing tier config ── */
const tierKeys = ["monthly", "semester", "annual", "gold", "platinum", "ultra"] as const;
const tierConfig = [
  {
    key: "monthly" as const,
    price: 65000,
    priceUSD: 15,
    children: 1,
    highlighted: false,
    icon: HiHeart,
    color: "border-primary-200 hover:border-primary-400",
    iconBg: "bg-primary-100 text-primary-600",
    badgeBg: "bg-primary-50 text-primary-700",
    link: "https://subscription-landing.epayco.co/plan/9993771eb5d4c1974062db2",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_MONTHLY || "",
    includeKeys: ["educationComplete", "nutritionDaily", "monthlyReport"],
  },
  {
    key: "semester" as const,
    price: 330000,
    priceUSD: 80,
    children: 1,
    highlighted: false,
    icon: HiShieldCheck,
    color: "border-primary-200 hover:border-primary-400",
    iconBg: "bg-primary-100 text-primary-600",
    badgeBg: "bg-primary-50 text-primary-700",
    link: "https://subscription-landing.epayco.co/plan/99937a3eea2b9882807efb0",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_SEMESTER || "",
    includeKeys: ["educationComplete", "nutritionDaily", "bimonthlyReports", "childPhoto"],
  },
  {
    key: "annual" as const,
    price: 650000,
    priceUSD: 155,
    children: 1,
    highlighted: true,
    icon: HiStar,
    color: "border-accent-300 ring-2 ring-accent-200 shadow-lg shadow-accent-500/10",
    iconBg: "bg-accent-100 text-accent-600",
    badgeBg: "bg-accent-50 text-accent-700",
    link: "https://subscription-landing.epayco.co/plan/99937be6d46e7149f0f5292",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ANNUAL || "",
    includeKeys: ["educationComplete", "nutritionDaily", "quarterlyReports", "annualCertificate", "personalizedLetter"],
  },
  {
    key: "gold" as const,
    price: 1200000,
    priceUSD: 290,
    children: 2,
    highlighted: false,
    icon: HiSparkles,
    color: "border-accent-200 hover:border-accent-400",
    iconBg: "bg-accent-100 text-accent-600",
    badgeBg: "bg-accent-50 text-accent-700",
    link: "https://subscription-landing.epayco.co/plan/99937daa95cda6af90e37f2",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_GOLD || "",
    includeKeys: ["educationFor2", "nutritionFor2", "quarterlyReports", "annualCertificate", "lettersFrom2"],
  },
  {
    key: "platinum" as const,
    price: 1650000,
    priceUSD: 400,
    children: 3,
    highlighted: false,
    icon: HiGlobeAlt,
    color: "border-primary-200 hover:border-primary-400",
    iconBg: "bg-primary-100 text-primary-600",
    badgeBg: "bg-primary-50 text-primary-700",
    link: "https://subscription-landing.epayco.co/plan/999380649eb24bc4e0c3f52",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_PLATINUM || "",
    includeKeys: ["educationFor3", "nutritionFor3", "quarterlyReports", "annualCertificate", "lettersFrom2", "eventInvitation"],
  },
  {
    key: "ultra" as const,
    price: 2100000,
    priceUSD: 510,
    children: 4,
    highlighted: false,
    icon: HiStar,
    color: "border-primary-200 hover:border-primary-400",
    iconBg: "bg-primary-100 text-primary-600",
    badgeBg: "bg-primary-50 text-primary-700",
    link: "https://subscription-landing.epayco.co/plan/999382045fa92aa320e4d12",
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ULTRA || "",
    includeKeys: [
      "educationFor4",
      "nutritionFor4",
      "quarterlyReports",
      "annualCertificate",
      "lettersFrom2",
      "eventInvitation",
      "socialMediaRecognition",
    ],
  },
];

/* ── How It Works steps config ── */
const stepKeys = ["choose", "meet", "follow"] as const;
const stepConfig = [
  { key: "choose" as const, number: "01", icon: HiClipboardCheck, color: "from-primary-500 to-primary-700" },
  { key: "meet" as const, number: "02", icon: FaChild, color: "from-accent-500 to-accent-700" },
  { key: "follow" as const, number: "03", icon: FaChartLine, color: "from-primary-400 to-primary-600" },
];

/* ── What's Included config ── */
const includedKeys = ["education", "nutrition", "reports", "certificate", "photos", "letter"] as const;
const includedConfig = [
  { key: "education" as const, icon: HiAcademicCap, color: "bg-primary-50 text-primary-600", iconBg: "bg-primary-100" },
  { key: "nutrition" as const, icon: HiHeart, color: "bg-rose-50 text-rose-600", iconBg: "bg-rose-100" },
  { key: "reports" as const, icon: HiDocumentReport, color: "bg-accent-50 text-accent-600", iconBg: "bg-accent-100" },
  { key: "certificate" as const, icon: HiCheckCircle, color: "bg-green-50 text-green-600", iconBg: "bg-green-100" },
  { key: "photos" as const, icon: HiPhotograph, color: "bg-purple-50 text-purple-600", iconBg: "bg-purple-100" },
  { key: "letter" as const, icon: HiMail, color: "bg-sky-50 text-sky-600", iconBg: "bg-sky-100" },
];

/* ── FAQ keys ── */
const faqKeys = ["taxDeductible", "cancel", "graduation", "payment", "visit", "percentage"] as const;

/* ── Trust badge config ── */
const trustBadgeConfig = [
  { key: "nit" as const, icon: HiShieldCheck },
  { key: "taxDeductible" as const, icon: HiDocumentReport },
  { key: "transparency" as const, icon: HiCheckCircle },
];

/* ── FAQ Accordion Item ── */
function FAQItem({ questionKey, index }: { questionKey: string; index: number }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("planPadrino");

  return (
    <ScrollReveal delay={index * 0.05}>
      <div
        className={`mb-4 overflow-hidden rounded-xl border transition-all duration-300 ${
          open ? "border-primary-200 bg-primary-50/50" : "border-gray-100 bg-white hover:border-gray-200"
        }`}
      >
        <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-6 py-5 text-left">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                open ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-600"
              }`}
            >
              <HiQuestionMarkCircle className="h-5 w-5" />
            </div>
            <span className={`font-heading text-lg font-semibold transition-colors duration-300 ${open ? "text-primary-800" : "text-gray-900"}`}>
              {t(`faqs.${questionKey}.q`)}
            </span>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: smoothEase }}>
            <HiChevronDown className={`h-5 w-5 shrink-0 transition-colors duration-300 ${open ? "text-primary-600" : "text-gray-400"}`} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-20">
                <p className="text-gray-600 leading-relaxed">{t(`faqs.${questionKey}.a`)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function PlanPadrinoPage() {
  const t = useTranslations("planPadrino");
  const tFaq = useTranslations("faq");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const isPayPal = locale === "en";

  const formatPrice = (tier: (typeof tierConfig)[number]) => {
    if (isPayPal) {
      return `$${tier.priceUSD.toLocaleString("en-US")}`;
    }
    return `$${tier.price.toLocaleString("es-CO")}`;
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
          >
            {t("heroTagline")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Plan <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">{t("heroTitle")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            {t("heroDescription")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
            >
              <HiHeart className="h-5 w-5" />
              {t("viewPlans")}
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <HiQuestionMarkCircle className="h-5 w-5" />
              {t("howItWorks")}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {trustBadgeConfig.map((badge) => (
              <div key={badge.key} className="flex items-center gap-2 text-sm text-primary-300/70">
                <badge.icon className="h-4 w-4 text-accent-400" />
                <span>{t(`trustBadges.${badge.key}`)}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. HOW IT WORKS
          ═══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t("stepByStep")}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                {t("howItWorksTitle")} <span className="text-primary-600">Plan {t("heroTitle")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">{t("howItWorksSubtitle")}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {stepConfig.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="absolute -top-4 right-6">
                      <span className="font-accent text-6xl font-bold text-primary-100 transition-colors duration-300 group-hover:text-primary-200">
                        {step.number}
                      </span>
                    </div>

                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-md`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">{t(`steps.${step.key}.title`)}</h3>
                    <p className="text-gray-500 leading-relaxed">{t(`steps.${step.key}.description`)}</p>

                    {index < stepConfig.length - 1 && (
                      <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                        <HiArrowRight className="h-8 w-8 text-primary-200" />
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. PRICING CARDS
          ═══════════════════════════════════════════════════════ */}
      <section id="planes" className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                {t("sponsorshipPlans")}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                {t("chooseLevel")} <span className="text-primary-600">{t("commitment")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">{t("chooseLevelSubtitle")}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {tierConfig.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.key}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 ${tier.color}`}
                  >
                    {tier.highlighted && (
                      <div className="absolute top-0 right-0 z-10 rounded-bl-xl bg-accent-500 px-4 py-1.5">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                          <HiStar className="h-3.5 w-3.5" />
                          {t("mostPopular")}
                        </span>
                      </div>
                    )}

                    <div className={`p-6 pb-4 ${tier.highlighted ? "bg-accent-50/50" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tier.iconBg}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900">{t(`tiers.${tier.key}.name`)}</h3>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold ${tier.highlighted ? "text-accent-600" : "text-primary-500"}`}
                          >
                            <FaChild className="h-3 w-3" />
                            {tier.children} {tier.children === 1 ? t("child") : t("children")}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-heading text-3xl font-bold ${tier.highlighted ? "text-accent-700" : "text-gray-900"}`}>
                            {formatPrice(tier)}
                          </span>
                          <span className="text-sm font-medium text-gray-400">
                            {isPayPal ? "USD" : "COP"}/{t(`tiers.${tier.key}.period`)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed">{t(`tiers.${tier.key}.description`)}</p>
                    </div>

                    <div className="mx-6 border-t border-gray-100" />

                    <div className="flex-1 p-6 pt-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">{t("includes")}</p>
                      <ul className="space-y-2.5">
                        {tier.includeKeys.map((includeKey) => (
                          <li key={includeKey} className="flex items-start gap-2.5">
                            <HiCheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlighted ? "text-accent-500" : "text-primary-500"}`} />
                            <span className="text-sm text-gray-600">{t(`tierIncludes.${includeKey}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 pt-0">
                      {isPayPal && tier.paypalPlanId ? (
                        <a
                          href={`https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=${tier.paypalPlanId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading font-semibold text-white transition-all duration-300 ${
                            tier.highlighted
                              ? "bg-[#0070ba] hover:bg-[#005ea6] shadow-md shadow-[#0070ba]/20"
                              : "bg-[#0070ba] hover:bg-[#005ea6]"
                          }`}
                        >
                          <FaPaypal className="h-4 w-4" />
                          {t("subscribePayPal")}
                        </a>
                      ) : isPayPal ? (
                        <Link
                          href={"/contacto" as "/contacto"}
                          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading font-semibold text-white transition-all duration-300 ${
                            tier.highlighted
                              ? "bg-accent-500 hover:bg-accent-400 shadow-md shadow-accent-500/20"
                              : "bg-primary-500 hover:bg-primary-400"
                          }`}
                        >
                          <FaHandHoldingHeart className="h-4 w-4" />
                          {t("contactToSubscribe")}
                        </Link>
                      ) : (
                        <a
                          href={tier.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading font-semibold text-white transition-all duration-300 ${
                            tier.highlighted
                              ? "bg-accent-500 hover:bg-accent-400 shadow-md shadow-accent-500/20"
                              : "bg-primary-500 hover:bg-primary-400"
                          }`}
                        >
                          <FaHandHoldingHeart className="h-4 w-4" />
                          {t("sponsorNow")}
                        </a>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. WHAT'S INCLUDED
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t("planBenefits")}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                {t("whatIncludes")} <span className="text-primary-600">{t("sponsorship")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">{t("whatIncludesSubtitle")}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {includedConfig.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.key}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col rounded-xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-md ${item.color}`}
                  >
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${item.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">{t(`includedItems.${item.key}.title`)}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">{t(`includedItems.${item.key}.description`)}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TESTIMONIAL / IMPACT
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900 section-padding">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left">
              <div>
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 font-heading text-sm font-semibold text-accent-400 mb-6">
                  {t("testimonials")}
                </span>

                <div className="relative">
                  <span className="font-accent text-8xl leading-none text-accent-500/20 absolute -top-6 -left-4">&ldquo;</span>
                  <blockquote className="relative z-10 pl-6">
                    <p className="font-accent text-2xl leading-relaxed text-white/90 italic md:text-3xl">{t("testimonialQuote")}</p>
                    <footer className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
                        <HiUserGroup className="h-6 w-6 text-accent-400" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-white">{t("testimonialAuthor")}</p>
                        <p className="text-sm text-primary-300/70">{t("testimonialRole")}</p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20">
                    <FaChild className="h-7 w-7 text-accent-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">1,877+</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">{t("childrenHelped")}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/20">
                    <HiSparkles className="h-7 w-7 text-primary-300" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">23</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">{t("yearsTrajectory")}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                    <HiAcademicCap className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">14</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">{t("activePrograms")}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20">
                    <HiHeart className="h-7 w-7 text-rose-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">$7.045</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">{t("costPerChildPerDay")}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FAQ SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {tFaq("title")}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                {t("faqTitle")} <span className="text-primary-600">{t("faqHighlight")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-gray-500">{t("faqSubtitle")}</p>
            </div>
          </ScrollReveal>

          <div>
            {faqKeys.map((key, index) => (
              <FAQItem key={key} questionKey={key} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. BOTTOM CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 py-24">
        <HeroWaves />
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <FaHandHoldingHeart className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">{t("changeLifeToday")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t("changeLifeDescription")}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {isPayPal ? (
                <Link
                  href="/como-ayudar"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-heading font-bold text-accent-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
                >
                  <FaPaypal className="h-5 w-5" />
                  {t("donateUSD")}
                </Link>
              ) : (
                <a
                  href="https://subscription-landing.epayco.co/subscription-landing/landing/699938851815d78a6a75f635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-heading font-bold text-accent-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
                >
                  <HiHeart className="h-5 w-5" />
                  {t("sponsorCOP")}
                </a>
              )}
              <Link
                href={"/contacto" as "/contacto"}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {tContact("contactUs")}
                <HiArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {trustBadgeConfig.map((badge) => (
                <div key={badge.key} className="flex items-center gap-2 text-sm text-white/70">
                  <badge.icon className="h-4 w-4 text-white/90" />
                  <span>{t(`trustBadges.${badge.key}`)}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
