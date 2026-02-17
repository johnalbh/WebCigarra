'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573212465421"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-30" />
      <FaWhatsapp className="relative z-10 text-2xl" />
    </a>
  );
}
