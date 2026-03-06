import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es">
      <head>
        <title>Página no encontrada | Fundación Cigarra</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: '#0c1e2b',
          color: '#e2e8f0',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Link href="/es">
            <img
              src="/images/logo-principal.webp"
              alt="Fundación Cigarra"
              style={{ height: '64px', filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </header>

        {/* Main */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '540px' }}>
            {/* 404 number */}
            <p
              style={{
                fontSize: '10rem',
                fontWeight: 800,
                margin: 0,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: 0.9,
              }}
            >
              404
            </p>

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: '0.5rem 0 0',
                color: '#f1f5f9',
              }}
            >
              Página no encontrada
            </h1>

            <p
              style={{
                fontSize: '1rem',
                margin: '1rem 0 2.5rem',
                color: '#94a3b8',
                lineHeight: 1.7,
              }}
            >
              Lo sentimos, la página que buscas no existe o fue movida.
              <br />
              Pero puedes volver al inicio o contactarnos directamente.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/es"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 14px rgba(34,197,94,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                ← Volver al inicio
              </Link>
              <a
                href="https://wa.me/573212465421"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'background 0.2s',
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </main>

        {/* Footer with contact info */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginBottom: '1.25rem',
            }}
          >
            <a
              href="tel:+573212465421"
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              📞 +57 321 246 5421
            </a>
            <a
              href="mailto:info@cigarra.org"
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              ✉️ info@cigarra.org
            </a>
            <span>📍 Calle 71Q sur No. 27-60, Bogotá</span>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <a href="https://www.facebook.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={socialStyle} aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.instagram.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={socialStyle} aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://www.youtube.com/@fundacioncigarra" target="_blank" rel="noopener noreferrer" style={socialStyle} aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
            © {new Date().getFullYear()} Fundación Cigarra — Transformando vidas en Ciudad Bolívar
          </p>
        </footer>
      </body>
    </html>
  );
}

const socialStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  color: '#94a3b8',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'background 0.2s',
};
