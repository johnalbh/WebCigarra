import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fundación Cigarra';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #38bdf8 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Fundacion Cigarra
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: '700px',
              textAlign: 'center',
            }}
          >
            Transformando vidas a traves del arte y la educacion en Ciudad Bolivar
          </div>
          <div
            style={{
              marginTop: '24px',
              fontSize: '18px',
              opacity: 0.7,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Desde 2002
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
