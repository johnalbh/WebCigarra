import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          color: '#1e293b',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1
            style={{
              fontSize: '8rem',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              color: '#0ea5e9',
            }}
          >
            404
          </h1>
          <p style={{ fontSize: '1.25rem', margin: '1rem 0 2rem', color: '#64748b' }}>
            La pagina que buscas no existe.
          </p>
          <Link
            href="/es"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: '#0ea5e9',
              color: '#fff',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
