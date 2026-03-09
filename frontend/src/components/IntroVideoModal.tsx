'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const INTRO_VIDEO_URL =
  'https://cigarra.blob.core.windows.net/branding/brand-assets/intro/full%20hd.mp4';
const SESSION_KEY = 'cigarra_intro_shown';

export default function IntroVideoModal() {
  const t = useTranslations('intro');
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) return;
    // localStorage con expiración de 7 días
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const { expires } = JSON.parse(stored);
      if (Date.now() < expires) return;
    }
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ expires }));
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    videoRef.current?.pause();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    const remaining = v.duration - v.currentTime;
    const m = Math.floor(remaining / 60);
    const s = Math.floor(remaining % 60);
    setTimeLeft(`${m}:${s.toString().padStart(2, '0')}`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  if (!visible) return null;

  return (
    // Backdrop — page visible and blurred behind
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '800px',
          background: '#0a0a0a',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              backgroundColor: '#3b9edd', display: 'inline-block',
              boxShadow: '0 0 6px #3b9edd',
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}>
              {t('label')}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '10px',
              letterSpacing: '0.1em',
            }}>
              {timeLeft && t('timeLeft', { time: timeLeft })}
            </span>
            <button
              onClick={close}
              title="Cerrar"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '28px', height: '28px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video with title overlay */}
        <div style={{ aspectRatio: '16/9', backgroundColor: '#000', position: 'relative' }}>
          {/* Title overlay — bottom left */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
            padding: '48px 32px 28px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}>
            <p style={{
              margin: 0,
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '6px',
            }}>
              {t('subtitle')}
            </p>
            <h2 style={{
              margin: 0,
              color: '#fff',
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              {t('title')}
            </h2>
          </div>
          <video
            ref={videoRef}
            src={INTRO_VIDEO_URL}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={close}
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Bottom controls */}
        <div style={{ padding: '0 0 16px' }}>
          {/* Progress bar */}
          <div
            onClick={handleSeek}
            style={{
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              cursor: 'pointer',
              marginBottom: '14px',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${progress}%`,
              backgroundColor: '#3b9edd',
              transition: 'width 0.2s linear',
            }} />
          </div>

          {/* Controls row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em',
                padding: '7px 14px', cursor: 'pointer',
              }}
            >
              {muted ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                  {t('unmute')}
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  {t('mute')}
                </>
              )}
            </button>

            <span style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '9px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {t('playing')}
            </span>

            {/* Skip */}
            <button
              onClick={close}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(255,255,255,0.88)',
                border: 'none', borderRadius: '100px',
                color: '#000', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.05em', padding: '7px 18px', cursor: 'pointer',
              }}
            >
              {t('skip')}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
