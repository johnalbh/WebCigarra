'use client';

import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';

const socialLinks = [
  {
    icon: FaFacebookF,
    href: 'https://www.facebook.com/fundacioncigarra',
    label: 'Facebook',
    hoverBg: 'hover:bg-blue-600',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/fundacioncigarra',
    label: 'Instagram',
    hoverBg: 'hover:bg-pink-600',
  },
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/@fundacioncigarra',
    label: 'YouTube',
    hoverBg: 'hover:bg-red-600',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/fundacion-cigarra',
    label: 'LinkedIn',
    hoverBg: 'hover:bg-blue-700',
  },
];

export default function FloatingSocialBar() {
  const totalSocial = socialLinks.length;

  return (
    <div className="fixed right-4 bottom-36 z-40 flex flex-col gap-2 md:right-6 md:bottom-44">
      {socialLinks.map((social, i) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:text-white hover:scale-110 md:h-10 md:w-10 ${social.hoverBg}`}
        >
          <social.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </motion.a>
      ))}

      {/* Contact button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + totalSocial * 0.1, duration: 0.4, ease: 'easeOut' }}
      >
        <Link
          href="/contacto"
          aria-label="Contacto"
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all duration-300 hover:bg-primary-700 hover:scale-110 md:h-11 md:w-11"
        >
          <HiMail className="h-4.5 w-4.5 md:h-5 md:w-5" />
        </Link>
      </motion.div>
    </div>
  );
}
