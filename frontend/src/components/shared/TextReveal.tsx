'use client';

import { type ElementType } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_APPLE, DURATION_REVEAL } from '@/lib/animation-config';

interface TextRevealProps {
  /** The text string to reveal word-by-word */
  text: string;
  /** HTML element to render. Default: 'p' */
  as?: ElementType;
  className?: string;
  /** Delay between each word. Default: 0.03s */
  staggerDelay?: number;
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordVariants = {
  hidden: { opacity: 0.15, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL * 0.6, ease: EASE_APPLE },
  },
};

/**
 * Reveals text word-by-word with staggered animation on scroll entry.
 * Creates an emotional "reading pace" effect.
 */
export default function TextReveal({
  text,
  as: Tag = 'p',
  className = '',
  staggerDelay = 0.03,
}: TextRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');
  const MotionTag = motion.create(Tag as 'p');

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={staggerDelay}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}
