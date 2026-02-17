'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

export function useCountUp({ end, duration = 2000, start = 0, enabled = true }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const frameRef = useRef<number>(undefined);
  const startTimeRef = useRef<number>(undefined);

  useEffect(() => {
    if (!enabled) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(start + (end - start) * easedProgress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start, enabled]);

  return count;
}
