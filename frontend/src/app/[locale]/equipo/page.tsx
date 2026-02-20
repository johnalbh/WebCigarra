'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import {
  HiUserGroup,
  HiArrowRight,
  HiHeart,
  HiStar,
} from 'react-icons/hi';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ---------- team data ---------- */
const departments = [
  {
    name: 'Direccion y Administracion',
    members: [
      { name: 'Carolyn Acosta', role: 'Fundadora y Directora', photo: '/images/team/carolyn-acosta.webp' },
      { name: 'Esperanza Duque Castro', role: 'Administradora', photo: '/images/team/esperanza-duque.webp' },
      { name: 'Karol Vanessa Gonzalez Rocha', role: 'Auxiliar Administrativa', photo: '/images/team/karol-gonzalez.webp' },
      { name: 'Cristina Rocio Parra Lamprea', role: 'Trabajadora Social', photo: '/images/team/cristina-parra.webp' },
      { name: 'Rubiela Pinzon', role: 'Contadora', photo: '/images/team/silueta.webp' },
      { name: 'Zulma Rodriguez', role: 'Revisora Fiscal', photo: '/images/team/silueta.webp' },
      { name: 'Erika Tatiana Santamaria Hernandez', role: 'Asistente de Informacion', photo: '/images/team/tatiana-santamaria.webp' },
      { name: 'Maritzabel Escobar Meneses', role: 'Nutricionista', photo: '/images/team/maritzabel-escobar.webp' },
    ],
  },
  {
    name: 'Equipo Docente',
    members: [
      { name: 'Narda Gissela Rocha Candela', role: 'Coordinadora General', photo: '/images/team/narda-rocha.webp' },
      { name: 'Yeimi Rocio Forero Medina', role: 'Coordinadora Pedagogica', photo: '/images/team/yeimi-forero.webp' },
      { name: 'Elvin Yezid Barbos Silva', role: 'Docente de Musica', photo: '/images/team/elvin-barbos.webp' },
      { name: 'Sandra Lenith Beltran Suarez', role: 'Docente', photo: '/images/team/sandra-beltran.webp' },
      { name: 'Andrea Liliana Capera Prada', role: 'Docente', photo: '/images/team/andrea-capera.webp' },
      { name: 'John Edilberto Charry', role: 'Docente', photo: '/images/team/john-charry.webp' },
      { name: 'Ruth Correa Millan', role: 'Docente', photo: '/images/team/ruth-correa.webp' },
      { name: 'Luz Dary Corredor Lemus', role: 'Docente', photo: '/images/team/luz-corredor.webp' },
      { name: 'Paola Andrea Delgadillo Lucas', role: 'Docente', photo: '/images/team/paola-delgadillo.webp' },
      { name: 'Durbys Yineth Parra Castaneda', role: 'Docente', photo: '/images/team/durbys-parra.webp' },
      { name: 'Yeimy Lucrecia Quiroga Quitian', role: 'Docente', photo: '/images/team/yeimy-quiroga.webp' },
      { name: 'Andres Fernando Quitian Ovalle', role: 'Docente', photo: '/images/team/andres-quitian.webp' },
      { name: 'Yuri Consuelo Salinas Hernandez', role: 'Docente', photo: '/images/team/yuri-salinas.webp' },
      { name: 'Jonnatan Villegas Huertas', role: 'Docente', photo: '/images/team/jonnatan-villegas.webp' },
      { name: 'Ruth Kattia', role: 'Docente', photo: '/images/team/ruth-kattia.webp' },
      { name: 'Lina Paola Amaya Ordonez', role: 'Docente', photo: '/images/team/lina-amaya.webp' },
      { name: 'Venjy Alejandra Castillo Gavilan', role: 'Docente', photo: '/images/team/venjy-castillo.webp' },
    ],
  },
  {
    name: 'Servicios Generales',
    members: [
      { name: 'Ruth Bravo Bermudez', role: 'Economa', photo: '/images/team/ruth-bravo.webp' },
      { name: 'Maritza Fuquen Ramirez', role: 'Servicios Generales', photo: '/images/team/maritza-fuquen.webp' },
      { name: 'Lilia Moreno Gonzalez', role: 'Economa', photo: '/images/team/lilia-moreno.webp' },
      { name: 'John Fredy Perez Pineda', role: 'Servicios Generales', photo: '/images/team/john-perez.webp' },
      { name: 'Yulieth Rojas Salinas', role: 'Economa', photo: '/images/team/yulieth-rojas.webp' },
    ],
  },
  {
    name: 'Mantenimiento',
    members: [
      { name: 'Fanny Marin Luz', role: 'Almacenista', photo: '/images/team/fanny-marin.webp' },
      { name: 'Jesus Antonio Mendez Lozano', role: 'Mantenimiento', photo: '/images/team/jesus-mendez.webp' },
      { name: 'Orlando Callejas Valencia', role: 'Mantenimiento', photo: '/images/team/orlando-callejas.webp' },
    ],
  },
];

const ALL_FILTER = 'Todos';

const departmentColors: Record<string, string> = {
  'Direccion y Administracion': 'from-primary-500 to-primary-700',
  'Equipo Docente': 'from-accent-500 to-amber-600',
  'Servicios Generales': 'from-emerald-500 to-teal-600',
  'Mantenimiento': 'from-violet-500 to-purple-600',
};

const stats = [
  { value: '33+', label: 'Miembros' },
  { value: '4', label: 'Departamentos' },
];

/* ---------- founder card ---------- */
function FounderCard() {
  const founder = departments[0].members[0];

  return (
    <ScrollReveal>
      <div className="mb-16">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="grid items-center md:grid-cols-[280px_1fr]">
            {/* Photo side */}
            <div className="relative h-72 md:h-full">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10" />
            </div>

            {/* Content side */}
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

              <p className="text-sm leading-relaxed text-gray-600">
                Visionaria y lider de la Fundacion Cigarra desde sus inicios en 2002.
                Su dedicacion y amor por los ninos de Ciudad Bolivar ha transformado
                la vida de miles de familias a traves de la educacion, el arte y la
                cultura.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary-50 px-5 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                  <HiHeart className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm font-medium text-primary-700">
                  Mas de 22 anos transformando vidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ---------- member card ---------- */
function MemberCard({ member }: { member: { name: string; role: string; photo: string } }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-colors duration-300 hover:border-gray-200"
    >
      {/* Circular photo */}
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full ring-4 ring-gray-100 transition-all duration-300 group-hover:ring-primary-200">
        <Image
          src={member.photo}
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

/* ---------- main page component ---------- */
export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filteredDepartments =
    activeFilter === ALL_FILTER
      ? departments
      : departments.filter((d) => d.name === activeFilter);

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Subtle accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
          >
            Fundacion Cigarra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Nuestro Equipo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            Las personas que hacen posible la transformacion
          </motion.p>

          {/* Stats inline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex justify-center gap-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-sm font-medium tracking-wide text-primary-300/70 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Section header */}
          <ScrollReveal>
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
                Conocenos
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Un equipo comprometido con el <span className="text-primary-600">cambio</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Cada miembro de nuestro equipo aporta su talento y dedicacion para
                transformar la vida de nuestros ninos y jovenes.
              </p>
            </div>
          </ScrollReveal>

          {/* Department filter pills */}
          <ScrollReveal delay={0.1}>
            <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
              {[ALL_FILTER, ...departments.map((d) => d.name)].map((filter) => (
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

          {/* Founder Featured Card (only show when "Todos" or "Direccion" is active) */}
          {(activeFilter === ALL_FILTER || activeFilter === departments[0].name) && (
            <FounderCard />
          )}

          {/* Department sections */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredDepartments.map((dept) => {
                /* Skip the founder from the grid (she has her own card) */
                const membersForGrid =
                  dept.name === departments[0].name
                    ? dept.members.slice(1)
                    : dept.members;

                return (
                  <div key={dept.name} className="mb-16 last:mb-0">
                    {/* Department header */}
                    <ScrollReveal>
                      <div className="mb-8 flex items-center gap-4">
                        <div
                          className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${
                            departmentColors[dept.name] || 'from-primary-500 to-primary-700'
                          }`}
                        />
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 md:text-2xl">
                            {dept.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {dept.members.length} {dept.members.length === 1 ? 'miembro' : 'miembros'}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Members grid */}
                    <StaggerContainer
                      staggerDelay={0.06}
                      className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    >
                      {membersForGrid.map((member) => (
                        <StaggerItem key={member.name}>
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

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative overflow-hidden bg-primary-500">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
              Quieres ser parte del equipo?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
              Estamos siempre en busca de personas apasionadas que quieran
              aportar su talento y dedicacion a nuestra comunidad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold text-primary-600 transition-colors duration-300 hover:bg-gray-50"
              >
                Contactanos
                <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/como-ayudar"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Como Ayudar
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
