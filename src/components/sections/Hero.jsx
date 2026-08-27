import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TrexScene from '../three/TrexScene.jsx'
import { serverConfig } from '../../data/server.js'
import { siteConfig } from '../../data/site.js'

/* ── Server status badge ───────────────────────────────────────────── */
function ServerStatus() {
  return (
    <div className="status-badge">
      <span className="status-dot" />
      <span className="text-label" style={{ color: 'var(--color-online)', letterSpacing: '0.2em' }}>
        {serverConfig.status}
      </span>
      <span style={{ width: 1, height: 10, background: 'rgba(74,222,128,0.2)', display: 'inline-block', margin: '0 0.4rem' }} />
      <span className="text-label">{serverConfig.region} REGION</span>
    </div>
  )
}

/* ── Server IP copy widget ─────────────────────────────────────────── */
function ServerIP() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(serverConfig.ip).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '0.75rem 1rem',
      border: '1px solid #1E1E1E',
      background: 'rgba(255,255,255,0.03)',
      marginTop: '1.5rem',
      maxWidth: '26rem',
    }}>
      <div>
        <div className="text-label" style={{ marginBottom: '0.25rem' }}>SERVER IP</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: 'var(--color-text)', letterSpacing: '0.05em' }}>
          {serverConfig.ip}
        </div>
      </div>
      <button
        onClick={copy}
        data-cursor="button"
        style={{
          marginLeft: 'auto',
          padding: '0.4rem 0.85rem',
          border: '1px solid #1E1E1E',
          background: copied ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
          cursor: 'none',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: copied ? 'var(--color-online)' : 'var(--color-muted)',
          transition: 'all 0.2s',
        }}
      >
        {copied ? 'COPIED!' : 'COPY'}
      </button>
    </div>
  )
}

/* ── Hero Section ──────────────────────────────────────────────────── */
export default function Hero() {
  const textColRef = useRef(null)

  useEffect(() => {
    // Always visible first
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
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'visible',
        paddingTop: '5.5rem',
        paddingBottom: '3rem',
        background: 'var(--color-bg)',
        clipPath: 'inset(0 0 0 0)',  /* clip without hiding overflow */
      }}
    >
      {/* ── BACKGROUND: T-Rex (z-index 1, right side, full height) ── */}
      <div style={{
        position: 'absolute',
        /* Right half of the hero, extend 60px beyond bottom so controls bar is hidden outside section */
        top: 0, right: 0,
        width: '68%',
        height: 'calc(100% + 60px)',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <TrexScene />
      </div>

      {/* ── Gradient: fade left so text is readable over the T-Rex ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        /* Fade: solid black on left → transparent in middle → transparent on right */
        width: '70%',
        background: 'linear-gradient(to right, #050505 45%, rgba(5,5,5,0.85) 65%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ── Subtle top/bottom vignette for depth ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.7) 100%)',
      }} />

      {/* ── FOREGROUND: Text content (z-index 10, left side) ── */}
      <div
        ref={textColRef}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '90rem',
          width: '100%',
          margin: '0 auto',
          padding: '0 2rem',
          /* Pass mouse events through to T-Rex iframe on the right */
          pointerEvents: 'none',
        }}
      >
        {/* Constrain text to roughly left 50% — re-enable pointer events here */}
        <div style={{ maxWidth: '34rem', pointerEvents: 'auto' }}>
          <div data-anim style={{ marginBottom: '2rem' }}>
            <ServerStatus />
          </div>

          <h1 data-anim className="text-hero" style={{ color: '#F5F5F5', marginBottom: '0.5rem' }}>
            {siteConfig.shortName}
          </h1>

          <div data-anim style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            {siteConfig.community}
          </div>

          <div data-anim style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
            marginBottom: '1rem',
            lineHeight: 1.15,
          }}>
            ENTER THE WORLD<br />OF {siteConfig.shortName}
          </div>

          <div data-anim style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Your world.&nbsp; Your survival.&nbsp; Your adventure.
          </div>

          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a href={serverConfig.playUrl} className="btn-primary" data-cursor="button">
              Play Now →
            </a>
            <a href={serverConfig.discord} target="_blank" rel="noopener noreferrer" className="btn-outline" data-cursor="button">
              Join Discord
            </a>
          </div>

          <div data-anim>
            <ServerIP />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
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
