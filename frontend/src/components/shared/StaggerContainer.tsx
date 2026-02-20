'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import {
  EASE_APPLE,
  SCALE_INITIAL,
  STAGGER,
  Y_OFFSET,
  DURATION_REVEAL,
} from '@/lib/animation-config';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  /** Enable scale-up animation (0.92→1) on children. */
  scaleUp?: boolean;
}

export default function StaggerContainer({
  children,
  className,
  staggerDelay = STAGGER.normal,
  scaleUp = false,
}: StaggerContainerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  scaleUp = false,
}: {
  children: ReactNode;
  className?: string;
  /** Enable scale-up animation (0.92→1). */
  scaleUp?: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: Y_OFFSET.small,
          ...(scaleUp ? { scale: SCALE_INITIAL } : {}),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(scaleUp ? { scale: 1 } : {}),
          transition: {
            duration: DURATION_REVEAL,
            ease: EASE_APPLE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
