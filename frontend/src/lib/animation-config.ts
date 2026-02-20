/**
 * Centralized animation constants — Apple-inspired elegance.
 * Every animation component imports from here instead of duplicating magic numbers.
 */

// Primary easing — smooth, Apple-style deceleration
export const EASE_APPLE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Snappier variant for UI micro-interactions
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Spring config — hover-only interactions
export const SPRING_HOVER = { type: 'spring' as const, stiffness: 400, damping: 30 };

// Durations (slower = more elegant)
export const DURATION_REVEAL = 0.8;
export const DURATION_REVEAL_LONG = 1.0;
export const DURATION_HOVER = 0.3;

// Scale values
export const SCALE_INITIAL = 0.92;
export const SCALE_FINAL = 1.0;
export const SCALE_HOVER = 1.02;

// Blur (desktop only)
export const BLUR_INITIAL = 4; // px

// Y-offset for reveals
export const Y_OFFSET = {
  small: 20,
  medium: 30,
  large: 40,
} as const;

// Parallax multipliers (fraction of scroll distance)
export const PARALLAX = {
  subtle: 0.1,
  medium: 0.2,
} as const;

// Stagger delays between children
export const STAGGER = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.15,
} as const;
