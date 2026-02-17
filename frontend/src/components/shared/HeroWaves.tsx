'use client';

/**
 * Animated SVG background for hero sections.
 * Renders flowing wave lines, soft gradient circles, and subtle dots.
 * Pure CSS animations — no JS runtime cost.
 */
export default function HeroWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for the large glow circles */}
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3fa1d6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3fa1d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Soft gradient circles ── */}
        <circle cx="1100" cy="200" r="350" fill="url(#glow1)" className="animate-hero-float" />
        <circle cx="200" cy="700" r="280" fill="url(#glow2)" className="animate-hero-float-reverse" />

        {/* ── Wave line 1 — slow, large amplitude ── */}
        <path
          d="M-100,600 C200,500 400,700 720,580 C1040,460 1200,640 1540,560"
          fill="none"
          stroke="#7cc0e6"
          strokeWidth="1.5"
          strokeOpacity="0.12"
          className="animate-hero-wave-1"
        />

        {/* ── Wave line 2 — medium speed ── */}
        <path
          d="M-100,650 C180,580 420,720 700,630 C980,540 1180,680 1540,610"
          fill="none"
          stroke="#3fa1d6"
          strokeWidth="1"
          strokeOpacity="0.10"
          className="animate-hero-wave-2"
        />

        {/* ── Wave line 3 — fast, subtle ── */}
        <path
          d="M-100,700 C160,660 380,740 680,680 C980,620 1160,720 1540,660"
          fill="none"
          stroke="#b3dbf1"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          className="animate-hero-wave-3"
        />

        {/* ── Wave line 4 — top area, very subtle ── */}
        <path
          d="M-100,250 C240,200 500,300 720,230 C940,160 1200,280 1540,220"
          fill="none"
          stroke="#7cc0e6"
          strokeWidth="0.8"
          strokeOpacity="0.06"
          className="animate-hero-wave-2"
        />

        {/* ── Geometric ring ── */}
        <circle
          cx="1200"
          cy="300"
          r="120"
          fill="none"
          stroke="#3fa1d6"
          strokeWidth="0.6"
          strokeOpacity="0.08"
          className="animate-hero-float"
        />
        <circle
          cx="1200"
          cy="300"
          r="180"
          fill="none"
          stroke="#3fa1d6"
          strokeWidth="0.4"
          strokeOpacity="0.05"
          className="animate-hero-float-reverse"
        />

        {/* ── Scattered dots ── */}
        {[
          { cx: 150, cy: 180, r: 2, o: 0.10 },
          { cx: 350, cy: 120, r: 1.5, o: 0.08 },
          { cx: 600, cy: 200, r: 2.5, o: 0.07 },
          { cx: 900, cy: 150, r: 2, o: 0.09 },
          { cx: 1100, cy: 500, r: 1.5, o: 0.08 },
          { cx: 250, cy: 450, r: 2, o: 0.06 },
          { cx: 500, cy: 550, r: 1.8, o: 0.07 },
          { cx: 800, cy: 400, r: 2.2, o: 0.08 },
          { cx: 1300, cy: 650, r: 1.5, o: 0.06 },
          { cx: 400, cy: 800, r: 2, o: 0.05 },
          { cx: 1050, cy: 750, r: 1.8, o: 0.07 },
          { cx: 700, cy: 100, r: 1.5, o: 0.06 },
        ].map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#b3dbf1"
            fillOpacity={dot.o}
            className={i % 2 === 0 ? 'animate-hero-dot-1' : 'animate-hero-dot-2'}
          />
        ))}

        {/* ── Diagonal accent lines ── */}
        <line
          x1="1000" y1="0" x2="1440" y2="400"
          stroke="#3fa1d6"
          strokeWidth="0.5"
          strokeOpacity="0.04"
        />
        <line
          x1="1100" y1="0" x2="1440" y2="300"
          stroke="#7cc0e6"
          strokeWidth="0.4"
          strokeOpacity="0.03"
        />
      </svg>
    </div>
  );
}
