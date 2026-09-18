import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TrexScene from '../three/TrexScene.jsx'
import { serverConfig } from '../../data/server.js'

/* ── Server status badge ── */
function ServerStatus() {
  return (
    <div className="status-badge">
      <span className="status-dot" />
      <span className="text-label" style={{ color: 'var(--color-online)', letterSpacing: '0.2em' }}>
        ONLINE
      </span>
      <span style={{ width: 1, height: 10, background: 'rgba(74,222,128,0.2)', display: 'inline-block', margin: '0 0.4rem' }} />
      <span className="text-label">SEA REGION</span>
    </div>
  )
}

/* ── Badge row ── */
function BadgeRow() {
  const badges = [
    { text: `${serverConfig.maxSlots} SLOTS` },
    { text: `VER ${serverConfig.version}` },
    { text: `${serverConfig.ram} RAM` },
    { text: `${serverConfig.bandwidth} BANDWIDTH` },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
      {badges.map(b => (
        <span key={b.text} style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.68rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-muted)',
          border: '1px solid #1e1e1e',
          background: 'rgba(255,255,255,0.02)',
          padding: '0.28rem 0.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
        }}>
          <span style={{
            width: 4, height: 4, borderRadius: '50%',
            background: 'var(--color-accent)', display: 'inline-block',
          }} />
          {b.text}
        </span>
      ))}
    </div>
  )
}

/* ── Hero Section ── */
export default function Hero() {
  const textColRef = useRef(null)

  useEffect(() => {
    if (textColRef.current) gsap.set(textColRef.current, { opacity: 1, y: 0 })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const els = textColRef.current?.querySelectorAll('[data-anim]')
      if (els?.length) {
        gsap.set(els, { opacity: 0, y: 24 })
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.09, duration: 0.7, ease: 'power3.out', delay: 0.3 })
      }
    })
    return () => {
      ctx.revert()
      if (textColRef.current) gsap.set(textColRef.current, { clearProps: 'all' })
    }
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative', minHeight: '88vh',
        display: 'flex', alignItems: 'flex-start',
        overflow: 'visible', paddingTop: '4.5rem', paddingBottom: '2rem',
        background: 'var(--color-bg)',
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      {/* T-Rex 3D Interactive Model — không gian rộng thoáng, không bị che cắt đầu đuôi */}
      <div
        className="hero-trex-container"
        style={{
          position: 'absolute',
          top: '1rem',
          right: 0,
          width: 'clamp(550px, 72vw, 1150px)',
          height: 'calc(100% - 2rem)',
          maxHeight: '760px',
          zIndex: 3,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 20%, black 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 20%, black 100%)',
        }}
      >
        <TrexScene />
      </div>

      {/* Left gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '70%',
        background: 'linear-gradient(to right, #050505 45%, rgba(5,5,5,0.85) 65%, transparent 100%)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Top/bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.7) 100%)',
      }} />

      {/* Pink glow at right */}
      <div style={{
        position: 'absolute', top: '20%', right: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Text content */}
      <div
        ref={textColRef}
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: '90rem', width: '100%',
          margin: '0 auto', padding: '0 2rem',
          pointerEvents: 'none',
        }}
      >
        <div style={{ maxWidth: '36rem', pointerEvents: 'auto' }}>
          <div data-anim style={{ marginBottom: '2rem' }}>
            <ServerStatus />
          </div>

          {/* Main title */}
          <div data-anim>
            <h1 className="text-hero glow-pink" style={{
              color: 'var(--color-accent)',
              marginBottom: '0',
              lineHeight: 0.85,
            }}>
              SBTC
            </h1>
            <div className="text-hero" style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(4rem, 12vw, 14rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              marginBottom: '0.5rem',
            }}>
              ISLAND
            </div>
          </div>

          {/* Subtitle */}
          <div data-anim style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
            letterSpacing: '0.25em',
            color: 'var(--color-muted)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ĐẢO KHỦNG LONG SỐ 1 VIỆT NAM
          </div>

          <div data-anim style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            letterSpacing: '0.2em',
            color: '#3a3a3a',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            Cùng Thầy Giáo Ba & KanKan · The Isle Evrima
          </div>

          {/* CTAs */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={serverConfig.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="hero-steam-btn"
              data-cursor="button"
            >
              Tải Game Trên Steam
            </a>
            <a
              href="#launcher"
              className="btn-outline"
              id="hero-launcher-btn"
              data-cursor="button"
            >
              Tải Launcher
            </a>
            <a
              href={serverConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              id="hero-discord-btn"
              data-cursor="button"
            >
              Join Discord
            </a>
          </div>

          <div data-anim>
            <BadgeRow />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0.3, zIndex: 10,
        animation: 'heroFloat 2s ease-in-out infinite',
      }}>
        <div className="text-label">Scroll</div>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--color-muted), transparent)' }} />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}
