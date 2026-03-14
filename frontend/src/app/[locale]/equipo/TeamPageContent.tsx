'use client';

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  HiUserGroup, HiHeart, HiStar, HiMail, HiPhone,
  HiDocumentText, HiUpload, HiCheckCircle, HiXCircle,
  HiIdentification, HiClipboardList,
} from 'react-icons/hi';
import { getStrapiMedia } from '@/lib/strapi';

interface TeamMember {
  name: string;
  role: string;
  bio?: string | null;
  photo?: { url: string; alternativeText?: string } | null;
  department: string;
  order: number;
}

const DEPT_LABELS: Record<string, string> = {
  direction: 'Dirección y Administración',
  education: 'Equipo Docente',
  arts: 'Arte y Cultura',
  administration: 'Administración',
  general_services: 'Servicios Generales',
  maintenance: 'Mantenimiento',
  volunteers: 'Voluntariado',
};

const DEPT_COLORS: Record<string, string> = {
  direction: 'from-primary-500 to-primary-700',
  education: 'from-accent-500 to-amber-600',
  arts: 'from-purple-500 to-violet-600',
  administration: 'from-blue-500 to-sky-600',
  general_services: 'from-emerald-500 to-teal-600',
  maintenance: 'from-violet-500 to-purple-600',
  volunteers: 'from-rose-500 to-pink-600',
};

const DEPT_ORDER = ['direction', 'education', 'arts', 'administration', 'general_services', 'maintenance', 'volunteers'];

const FALLBACK_PHOTO = '/images/team/silueta.webp';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
const ALL_FILTER = 'Todos';

const smoothEase = [0.22, 1, 0.36, 1] as const;

function getMemberPhoto(member: TeamMember): string {
  if (member.photo?.url) {
    return getStrapiMedia(member.photo.url) ?? FALLBACK_PHOTO;
  }
  return FALLBACK_PHOTO;
}

function FounderCard({ founder }: { founder: TeamMember }) {
  return (
    <ScrollReveal>
      <div className="mb-16">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="grid items-center md:grid-cols-[280px_1fr]">
            <div className="relative h-72 md:h-full">
              <Image
                src={getMemberPhoto(founder)}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10" />
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5">
                <HiStar className="h-4 w-4 text-accent-600" />
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                  Fundadora
                </span>
              </div>

              <h3 className="mb-2 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                {founder.name}
              </h3>

              <p className="mb-4 text-sm font-medium text-primary-600">
                {founder.role}
              </p>

              {founder.bio && (
                <p className="text-sm leading-relaxed text-gray-600">
                  {founder.bio}
                </p>
              )}

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary-50 px-5 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                  <HiHeart className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm font-medium text-primary-700">
                  Más de 24 años transformando vidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-colors duration-300 hover:border-gray-200"
    >
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full ring-4 ring-gray-100 transition-all duration-300 group-hover:ring-primary-200">
        <Image
          src={getMemberPhoto(member)}
          alt={member.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">
        {member.name}
      </h3>
      <p className="text-xs font-medium text-primary-600">
        {member.role}
      </p>
    </motion.div>
  );
}

const inputClasses =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300';

const areaOptions = [
  'Docencia', 'Administracion', 'Trabajo Social', 'Nutricion',
  'Servicios Generales', 'Mantenimiento', 'Voluntariado', 'Otro',
];

function ApplicationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '', document: '', email: '', phone: '', area: '', experience: '', motivation: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const formLoadTime = useRef(0);

  useEffect(() => { formLoadTime.current = Date.now(); }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => { formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') { setErrorMsg('Solo se permiten archivos PDF'); setFormState('error'); return; }
    if (selected.size > 1 * 1024 * 1024) { setErrorMsg('El archivo excede 1 MB'); setFormState('error'); return; }
    setFile(selected);
    setErrorMsg('');
    if (formState === 'error') setFormState('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMsg('');
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      if (file) body.append('resume', file);
      body.append('_hp', honeypot);
      body.append('_ts', String(formLoadTime.current));
      body.append('_turnstile', turnstileToken);
      const res = await fetch('/api/apply', { method: 'POST', body });
      if (res.ok) {
        setFormState('success');
        setFormData({ fullName: '', document: '', email: '', phone: '', area: '', experience: '', motivation: '' });
        setFile(null);
        setTimeout(() => { setIsOpen(false); }, 300);
      } else {
        const data = await res.json() as { error?: string };
        setErrorMsg(data.error || 'Error al enviar la postulación');
        setFormState('error');
      }
    } catch {
      setErrorMsg('Error al enviar la postulación');
      setFormState('error');
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary-500">
      <HeroWaves />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
              ¿Quieres ser parte del equipo?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              Estamos siempre en busca de personas apasionadas que quieran aportar su talento y dedicación a nuestra comunidad.
            </p>

            <AnimatePresence mode="wait">
              {!isOpen && formState !== 'success' && (
                <motion.div key="cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="mt-10">
                  <button onClick={handleOpen} className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold text-primary-600 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl">
                    <HiDocumentText className="h-5 w-5" />
                    Postularme ahora
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </motion.div>
              )}
              {!isOpen && formState === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-10 max-w-md rounded-2xl bg-white/15 px-8 py-6 backdrop-blur-sm">
                  <HiCheckCircle className="mx-auto h-10 w-10 text-green-300" />
                  <p className="mt-3 font-heading text-lg font-bold text-white">Postulación enviada</p>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">Hemos recibido tu postulación y hoja de vida. Nos pondremos en contacto contigo pronto.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <AnimatePresence>
          {isOpen && (
            <motion.div ref={formCardRef} initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 48 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-xl shadow-black/10">
                <form onSubmit={handleSubmit} className="px-8 py-10 md:px-12 md:py-12">
                  <div className="mb-10">
                    <h3 className="font-heading text-[28px] font-bold tracking-tight text-gray-900">Formulario de postulación</h3>
                    <p className="mt-2 text-[15px] text-gray-400 leading-relaxed">Todos los campos con <span className="text-red-400">*</span> son obligatorios</p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">Nombre completo <span className="text-red-400">*</span></label>
                      <input id="fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Tu nombre completo" className={inputClasses} />
                    </div>
                    <div>
                      <label htmlFor="document" className="mb-1.5 block text-sm font-medium text-gray-700">Cédula / Documento <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <HiIdentification className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                        <input id="document" type="text" required value={formData.document} onChange={(e) => setFormData({ ...formData, document: e.target.value })} placeholder="Número de documento" className={`${inputClasses} pl-10`} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="applyEmail" className="mb-1.5 block text-sm font-medium text-gray-700">Correo electrónico <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <HiMail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                        <input id="applyEmail" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@correo.com" className={`${inputClasses} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="applyPhone" className="mb-1.5 block text-sm font-medium text-gray-700">Teléfono <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <HiPhone className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                        <input id="applyPhone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+57 300 000 0000" className={`${inputClasses} pl-10`} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-gray-700">Área de interés <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <HiClipboardList className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                      <select id="area" required value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className={`${inputClasses} appearance-none pl-10 pr-10`}>
                        <option value="" disabled>Selecciona un área</option>
                        {areaOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="experience" className="mb-1.5 block text-sm font-medium text-gray-700">Experiencia relevante</label>
                    <textarea id="experience" rows={3} value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="Describe brevemente tu experiencia laboral o voluntaria relevante..." className={`${inputClasses} resize-none`} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="motivation" className="mb-1.5 block text-sm font-medium text-gray-700">¿Por qué quieres unirte? <span className="text-red-400">*</span></label>
                    <textarea id="motivation" required rows={3} value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} placeholder="Cuéntanos tu motivación para ser parte de la Fundación Cigarra..." className={`${inputClasses} resize-none`} />
                  </div>

                  <div className="mt-5">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Hoja de vida (PDF) <span className="text-red-400">*</span></label>
                    <div onClick={() => fileInputRef.current?.click()} className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-8 text-center transition-all duration-200 hover:border-primary-400 hover:bg-primary-50/30">
                      <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="hidden" />
                      {file ? (
                        <div className="flex items-center justify-center gap-3">
                          <HiDocumentText className="h-8 w-8 text-primary-600" />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB — Click para cambiar</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <HiUpload className="mx-auto h-8 w-8 text-gray-300 transition-colors group-hover:text-primary-500" />
                          <p className="mt-2 text-sm font-medium text-gray-600">Click para seleccionar archivo</p>
                          <p className="mt-1 text-xs text-gray-400">Solo PDF, máximo 1 MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  <div className="mt-6">
                    <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={setTurnstileToken} options={{ theme: 'light', size: 'normal' }} />
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button type="submit" disabled={formState === 'sending'} className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary-600 px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto">
                      {formState === 'sending' ? (
                        <><svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Enviando...</>
                      ) : (
                        <>Enviar Postulación<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                      )}
                    </button>
                    <p className="text-xs text-gray-300">Los campos con * son obligatorios</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {formState === 'error' && (
                      <motion.div key="error" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="mt-8 flex items-start gap-4 rounded-xl bg-red-50 p-5">
                        <HiXCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
                        <div>
                          <p className="font-semibold text-red-800">Error</p>
                          <p className="mt-1 text-sm text-red-600 leading-relaxed">{errorMsg || 'Error al enviar la postulación. Por favor intenta de nuevo.'}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function TeamPageContent({ members }: { members: TeamMember[] }) {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  // Group by department in defined order
  const departments = DEPT_ORDER
    .map((deptKey) => ({
      key: deptKey,
      label: DEPT_LABELS[deptKey] ?? deptKey,
      members: members.filter((m) => m.department === deptKey).sort((a, b) => a.order - b.order),
    }))
    .filter((d) => d.members.length > 0);

  const founder = members.find((m) => m.department === 'direction' && m.order === 1) ?? members[0];

  const filteredDepts = activeFilter === ALL_FILTER
    ? departments
    : departments.filter((d) => d.label === activeFilter);

  const totalMembers = members.length;
  const totalDepts = departments.length;

  const stats = [
    { value: `${totalMembers}+`, label: 'Miembros' },
    { value: String(totalDepts), label: 'Departamentos' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: smoothEase }} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Fundación Cigarra
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }} className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Nuestro Equipo
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }} className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-primary-200/80">
            Las personas que hacen posible la transformación
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }} className="mt-10 flex justify-center gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-sm font-medium tracking-wide text-primary-300/70 uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">Conócenos</span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Un equipo comprometido con el <span className="text-primary-600">cambio</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Cada miembro de nuestro equipo aporta su talento y dedicación para transformar la vida de nuestros niños y jóvenes.
              </p>
            </div>
          </ScrollReveal>

          {/* Department filter pills */}
          <ScrollReveal delay={0.1}>
            <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
              {[ALL_FILTER, ...departments.map((d) => d.label)].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Founder card */}
          {founder && (activeFilter === ALL_FILTER || activeFilter === DEPT_LABELS['direction']) && (
            <FounderCard founder={founder} />
          )}

          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {filteredDepts.map((dept) => {
                const membersForGrid = dept.key === 'direction'
                  ? dept.members.filter((m) => m !== founder)
                  : dept.members;

                return (
                  <div key={dept.key} className="mb-16 last:mb-0">
                    <ScrollReveal>
                      <div className="mb-8 flex items-center gap-4">
                        <div className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${DEPT_COLORS[dept.key] ?? 'from-primary-500 to-primary-700'}`} />
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 md:text-2xl">{dept.label}</h3>
                          <p className="text-sm text-gray-500">{dept.members.length} {dept.members.length === 1 ? 'miembro' : 'miembros'}</p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <StaggerContainer scaleUp staggerDelay={0.06} className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {membersForGrid.map((member) => (
                        <StaggerItem scaleUp key={member.name}>
                          <MemberCard member={member} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ApplicationForm />
    </>
  );
}
