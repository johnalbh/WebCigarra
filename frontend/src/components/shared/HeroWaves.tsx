'use client';

/**
 * Animated SVG background for hero sections.
 * Renders filled gradient waves, flowing wave lines, pulsing glows,
 * rotating geometric rings, shimmer dots, and a flowing accent line.
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
            <stop offset="0%" stopColor="#3fa1d6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3fa1d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7cc0e6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7cc0e6" stopOpacity="0" />
          </radialGradient>

          {/* Gradients for filled waves */}
          <linearGradient id="waveFill1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3fa1d6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3fa1d6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="waveFill2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#167BAE" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#167BAE" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="waveFill3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7cc0e6" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#7cc0e6" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* ── Enhanced glow circles with pulsing ── */}
        <circle cx="1100" cy="200" r="420" fill="url(#glow1)" className="animate-hero-float" />
        <circle cx="200" cy="700" r="350" fill="url(#glow2)" className="animate-hero-float-reverse" />
        <circle cx="700" cy="400" r="300" fill="url(#glow3)" className="animate-hero-glow-pulse" />

        {/* ── Filled gradient waves (bottom) — ocean-like layered effect ── */}
        <path
          d="M-200,700 C100,620 350,740 600,680 C850,620 1050,720 1300,660 C1550,600 1640,680 1640,680 L1640,900 L-200,900 Z"
          fill="url(#waveFill1)"
          className="animate-hero-wave-fill-1"
        />
        <path
          d="M-200,740 C150,680 400,780 650,720 C900,660 1100,760 1350,700 C1600,640 1640,720 1640,720 L1640,900 L-200,900 Z"
          fill="url(#waveFill2)"
          className="animate-hero-wave-fill-2"
        />
        <path
          d="M-200,770 C120,730 380,810 620,760 C860,710 1080,790 1320,740 C1560,690 1640,750 1640,750 L1640,900 L-200,900 Z"
          fill="url(#waveFill3)"
          className="animate-hero-wave-fill-3"
        />

        {/* ── Wave line 1 — slow, large amplitude ── */}
        <path
          d="M-100,600 C200,500 400,700 720,580 C1040,460 1200,640 1540,560"
          fill="none"
          stroke="#7cc0e6"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          className="animate-hero-wave-1"
        />

        {/* ── Wave line 2 — medium speed ── */}
        <path
          d="M-100,650 C180,580 420,720 700,630 C980,540 1180,680 1540,610"
          fill="none"
          stroke="#3fa1d6"
          strokeWidth="1"
          strokeOpacity="0.12"
          className="animate-hero-wave-2"
        />

        {/* ── Wave line 3 — fast, subtle ── */}
        <path
          d="M-100,700 C160,660 380,740 680,680 C980,620 1160,720 1540,660"
          fill="none"
          stroke="#b3dbf1"
          strokeWidth="0.8"
          strokeOpacity="0.10"
          className="animate-hero-wave-3"
        />

        {/* ── Wave line 4 — top area ── */}
        <path
          d="M-100,250 C240,200 500,300 720,230 C940,160 1200,280 1540,220"
          fill="none"
          stroke="#7cc0e6"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          className="animate-hero-wave-2"
        />

        {/* ── Rotating geometric rings ── */}
        <g className="animate-hero-ring-rotate" style={{ transformOrigin: '1200px 300px' }}>
          <circle
            cx="1200"
            cy="300"
            r="120"
            fill="none"
            stroke="#3fa1d6"
            strokeWidth="0.8"
            strokeOpacity="0.10"
            strokeDasharray="8 12"
          />
          <circle
            cx="1200"
            cy="300"
            r="180"
            fill="none"
            stroke="#3fa1d6"
            strokeWidth="0.5"
            strokeOpacity="0.07"
            strokeDasharray="4 16"
          />
          <circle
            cx="1200"
            cy="300"
            r="240"
            fill="none"
            stroke="#7cc0e6"
            strokeWidth="0.4"
            strokeOpacity="0.05"
            strokeDasharray="6 20"
          />
        </g>

        {/* ── Second ring cluster (left side) ── */}
        <g className="animate-hero-ring-rotate-reverse" style={{ transformOrigin: '200px 250px' }}>
          <circle
            cx="200"
            cy="250"
            r="80"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.5"
            strokeOpacity="0.06"
            strokeDasharray="5 15"
          />
          <circle
            cx="200"
            cy="250"
            r="130"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.3"
            strokeOpacity="0.04"
            strokeDasharray="3 18"
          />
        </g>

        {/* ── Shimmer / sparkle dots ── */}
        {[
          { cx: 150, cy: 180, r: 2.5, delay: 0 },
          { cx: 350, cy: 120, r: 2, delay: 1 },
          { cx: 600, cy: 200, r: 3, delay: 2 },
          { cx: 900, cy: 150, r: 2.5, delay: 0.5 },
          { cx: 1100, cy: 500, r: 2, delay: 1.5 },
          { cx: 250, cy: 450, r: 2.5, delay: 3 },
          { cx: 500, cy: 550, r: 2, delay: 0.8 },
          { cx: 800, cy: 400, r: 3, delay: 2.5 },
          { cx: 1300, cy: 650, r: 2, delay: 1.2 },
          { cx: 400, cy: 800, r: 2.5, delay: 3.5 },
          { cx: 1050, cy: 750, r: 2, delay: 0.3 },
          { cx: 700, cy: 100, r: 2, delay: 2.2 },
          { cx: 1350, cy: 180, r: 1.8, delay: 1.8 },
          { cx: 80, cy: 600, r: 2.2, delay: 2.8 },
          { cx: 1250, cy: 450, r: 2, delay: 0.7 },
          { cx: 450, cy: 350, r: 1.5, delay: 3.2 },
        ].map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#b3dbf1"
            fillOpacity="0.08"
            className={i % 3 === 0 ? 'animate-hero-shimmer' : i % 3 === 1 ? 'animate-hero-dot-1' : 'animate-hero-dot-2'}
            style={{ animationDelay: `${dot.delay}s` }}
          />
        ))}

        {/* ── Flowing accent line with dash animation ── */}
        <path
          d="M-50,350 C200,280 450,420 700,320 C950,220 1150,380 1490,300"
          fill="none"
          stroke="#3fa1d6"
          strokeWidth="1.2"
          strokeOpacity="0.10"
          strokeDasharray="12 24"
          className="animate-hero-dash"
        />
        <path
          d="M-50,500 C250,440 500,560 750,470 C1000,380 1200,520 1490,450"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="0.8"
          strokeOpacity="0.06"
          strokeDasharray="8 20"
          className="animate-hero-dash-reverse"
        />

        {/* ── Diagonal accent lines ── */}
        <line
          x1="1000" y1="0" x2="1440" y2="400"
          stroke="#3fa1d6"
          strokeWidth="0.5"
          strokeOpacity="0.05"
        />
        <line
          x1="1100" y1="0" x2="1440" y2="300"
          stroke="#7cc0e6"
          strokeWidth="0.4"
          strokeOpacity="0.04"
        />
      </svg>
    </div>
  );
}
