'use client';

import { useReducedMotion } from 'motion/react';

/**
 * Returns true when the user prefers reduced motion.
 * Every animation component should call this and gracefully degrade.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
