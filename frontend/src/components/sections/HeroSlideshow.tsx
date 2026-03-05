'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDE_INTERVAL = 5000;

interface HeroSlideshowProps {
  images: string[];
  alt: string;
}

export default function HeroSlideshow({ images, alt }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <div
      className="absolute inset-0 z-[1]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        // Skip first image (already rendered server-side behind this overlay)
        i === 0 ? null : (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-500 ${
              i === current
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}
