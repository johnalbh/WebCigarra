'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { EASE_APPLE } from '@/lib/animation-config';

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

const easeApple = EASE_APPLE;

export default function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: easeApple }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: title + close */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="line-clamp-1 text-sm font-medium text-white/70">{title}</p>
          <button
            onClick={onClose}
            aria-label="Cerrar video"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ESC
          </button>
        </div>

        {/* Video iframe */}
        <div className="aspect-video overflow-hidden rounded-xl shadow-2xl">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        {/* Hint */}
        <p className="mt-3 text-center text-xs text-white/30">
          Haz clic fuera del video o presiona ESC para cerrar
        </p>
      </motion.div>
    </motion.div>,
    document.body
  );
}
