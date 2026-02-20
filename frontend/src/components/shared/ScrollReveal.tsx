'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variant } from 'motion/react';
import { type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';
import {
  EASE_APPLE,
  DURATION_REVEAL,
  SCALE_INITIAL,
  BLUR_INITIAL,
  Y_OFFSET,
} from '@/lib/animation-config';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  /** Reveal direction for 'once' mode. Default: 'up' */
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /**
   * 'once' — classic whileInView trigger (current behavior).
   * 'scroll' — continuously driven by scroll position (Apple-style).
   */
  mode?: 'once' | 'scroll';
  /** Initial scale in scroll mode. Default: 0.92. Ignored in once mode. */
  scaleFrom?: number;
  /** Enable subtle blur→sharp transition (desktop only). */
  blur?: boolean;
  /** Pixels of parallax y-travel tied to scroll. Default: 0. */
  parallaxOffset?: number;
}

/* ── Once-mode variants (unchanged from original) ── */
const variants: Record<Direction, { hidden: Variant; visible: Variant }> = {
  up: {
    hidden: { opacity: 0, y: Y_OFFSET.medium },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -Y_OFFSET.medium },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -Y_OFFSET.medium },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: Y_OFFSET.medium },
    visible: { opacity: 1, x: 0 },
  },
};

/* ── Scroll-linked continuous mode ── */
function ScrollDriven({
  children,
  className,
  scaleFrom = SCALE_INITIAL,
  blur = false,
  parallaxOffset = 0,
}: {
  children: ReactNode;
  className?: string;
  scaleFrom: number;
  blur: boolean;
  parallaxOffset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Opacity: 0 → 1 over first 40% of scroll range
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Scale: scaleFrom → 1 over first 50% of scroll range
  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleFrom, 1]);

  // Parallax y-offset (desktop only)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [parallaxOffset, -parallaxOffset],
  );

  // Blur (desktop only)
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.3],
    blur && !isMobile ? [BLUR_INITIAL, 0] : [0, 0],
  );
  const filter = useTransform(blurValue, (v) => (v > 0.1 ? `blur(${v}px)` : 'none'));

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, filter, willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Main component ── */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = DURATION_REVEAL,
  className,
  mode = 'once',
  scaleFrom = SCALE_INITIAL,
  blur = false,
  parallaxOffset = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Reduced motion: render immediately with no animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Scroll-linked continuous mode
  if (mode === 'scroll') {
    return (
      <ScrollDriven
        className={className}
        scaleFrom={scaleFrom}
        blur={blur}
        parallaxOffset={parallaxOffset}
      >
        {children}
      </ScrollDriven>
    );
  }

  // Classic once mode (default — backward compatible)
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: EASE_APPLE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
