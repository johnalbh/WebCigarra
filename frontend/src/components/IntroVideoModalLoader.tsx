'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const IntroVideoModal = dynamic(() => import('./IntroVideoModal'), { ssr: false });

const SESSION_KEY = 'cigarra_intro_shown';

export default function IntroVideoModalLoader() {
  const [modalKey, setModalKey] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  const reopen = () => {
    localStorage.removeItem(SESSION_KEY);
    setModalKey((k) => k + 1); // fuerza re-mount del modal
  };

  return (
    <>
      <IntroVideoModal key={modalKey} />

      {isDesktop && <button
        onClick={reopen}
        title="Ver intro"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '100px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '10px 16px',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.9)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Ver intro
      </button>}
    </>
  );
}
