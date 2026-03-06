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
            padding: '2rem 1rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
            {/* 404 number */}
            <p
              style={{
                fontSize: '9rem',
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
                margin: '1rem 0 2rem',
                color: '#94a3b8',
                lineHeight: 1.7,
              }}
            >
              Lo sentimos, la página que buscas no existe o fue movida.
              <br />
              Pero puedes volver al inicio o contactarnos directamente.
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
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
                }}
              >
                ← Volver al inicio
              </Link>
              <Link
                href="/es/contacto"
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
                }}
              >
                ✉️ Contacto
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
                  background: 'rgba(37,211,102,0.15)',
                  color: '#25d366',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '1px solid rgba(37,211,102,0.25)',
                }}
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Contact info cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={cardStyle}>
                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>📞</span>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' }}>Teléfonos</p>
                <a href="tel:+573212465421" style={cardLinkStyle}>+57 321 246 5421</a>
                <a href="tel:+573112224696" style={cardLinkStyle}>+57 311 222 4696</a>
              </div>

              <div style={cardStyle}>
                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>🕐</span>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' }}>Horarios</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Lun - Vie: 8:00 AM - 5:00 PM
                  <br />
                  Sáb: 8:00 AM - 12:00 PM
                </p>
              </div>

              <div style={cardStyle}>
                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>📍</span>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' }}>Dirección</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Calle 71Q sur No. 27-60
                  <br />
                  Barrio Puertas del Paraíso
                  <br />
                  Bogotá, Colombia
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Floating social sidebar (right) */}
        <div
          style={{
            position: 'fixed',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 50,
          }}
        >
          <a href="https://www.facebook.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={sidebarSocialStyle} aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://www.instagram.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={sidebarSocialStyle} aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          </a>
          <a href="https://www.youtube.com/@fundacioncigarra" target="_blank" rel="noopener noreferrer" style={sidebarSocialStyle} aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
          <a href="https://www.linkedin.com/company/fundacion-cigarra" target="_blank" rel="noopener noreferrer" style={sidebarSocialStyle} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a
            href="https://wa.me/573212465421"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...sidebarSocialStyle,
              background: '#25d366',
              color: '#fff',
              border: 'none',
            }}
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </div>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1.5rem 2rem',
            textAlign: 'center',
          }}
        >
          {/* Bottom social row (visible on mobile where sidebar may be hard to tap) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <a href="https://www.facebook.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={footerSocialStyle} aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.instagram.com/fundacioncigarra" target="_blank" rel="noopener noreferrer" style={footerSocialStyle} aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://www.youtube.com/@fundacioncigarra" target="_blank" rel="noopener noreferrer" style={footerSocialStyle} aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/fundacion-cigarra" target="_blank" rel="noopener noreferrer" style={footerSocialStyle} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
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

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '1rem',
  padding: '1.25rem 1rem',
};

const cardLinkStyle: React.CSSProperties = {
  display: 'block',
  margin: '0.25rem 0 0',
  fontSize: '0.8rem',
  color: '#94a3b8',
  textDecoration: 'none',
};

const sidebarSocialStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.1)',
  color: '#cbd5e1',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.1)',
};

const footerSocialStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
  color: '#94a3b8',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.1)',
};
