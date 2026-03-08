'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const INTRO_VIDEO_URL =
  'https://cigarra.blob.core.windows.net/branding/brand-assets/intro/full%20hd.mp4';
const SESSION_KEY = 'cigarra_intro_shown';

export default function IntroVideoModal() {
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 28px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            backgroundColor: '#3b9edd', display: 'inline-block',
            boxShadow: '0 0 6px #3b9edd',
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            Intro
          </span>
        </div>
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          fontWeight: 500,
        }}>
          {timeLeft && `${timeLeft} restante`}
        </span>
      </div>

      {/* Video */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={INTRO_VIDEO_URL}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={close}
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
      </div>

      {/* Bottom controls */}
      <div style={{ flexShrink: 0, padding: '0 0 28px' }}>
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            cursor: 'pointer',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
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
          padding: '0 28px',
        }}>
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              padding: '8px 16px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.2s',
            }}
          >
            {muted ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                Activar sonido
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                Silenciar
              </>
            )}
          </button>

          {/* Label */}
          <span style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Reproduciendo intro
          </span>

          {/* Skip button */}
          <button
            onClick={close}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '100px',
              color: '#000',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '8px 20px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Saltar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
