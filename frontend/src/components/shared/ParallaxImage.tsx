'use client';

import { useRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxImageProps extends Omit<ImageProps, 'style'> {
  /** Parallax speed multiplier. Higher = more travel. Default: 0.15 */
  speed?: number;
  /** Extra classes on the wrapper div */
  containerClassName?: string;
}

/**
 * A Next.js Image with subtle vertical parallax tied to scroll.
 * On mobile or reduced-motion, renders a standard Image.
 */
export default function ParallaxImage({
  speed = 0.15,
  containerClassName = '',
  className = '',
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = speed * 100; // px
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  // No parallax on mobile or reduced-motion
  if (isMobile || prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${containerClassName}`}>
        <Image className={`${className}`} {...imageProps} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div
        style={{ y, willChange: 'transform' }}
        className="h-[120%] w-full"
      >
        <Image className={`h-full w-full object-cover ${className}`} {...imageProps} />
      </motion.div>
    </div>
  );
}
