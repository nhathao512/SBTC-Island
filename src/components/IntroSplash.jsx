import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import heroBg from '../assets/hero.png'

const DURATION = 4500  // ms before auto-enter

export default function IntroSplash({ onEnter }) {
  const splashRef  = useRef(null)
  const logoRef    = useRef(null)
  const islandRef  = useRef(null)
  const tagRef     = useRef(null)
  const lineRef    = useRef(null)
  const btnRef     = useRef(null)
  const progressRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Prevent body scroll while splash visible
    document.body.style.overflow = 'hidden'

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.body.style.overflow = ''
      onEnter()
      return
    }

    const tl = gsap.timeline()

    // 1. Logo scale in with glow
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.4, filter: 'blur(20px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      0.3
    )
    // 2. ISLAND text slide from right
    .fromTo(islandRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      0.8
    )
    // 3. Line grow
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.out' },
      1.2
    )
    // 4. Tagline fade
    .fromTo(tagRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      1.6
    )
    // 5. Button pulse in
    .fromTo(btnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
      2.4
    )

    // Progress bar animation
    const start = Date.now()
    let raf
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        handleEnter()
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const handleEnter = () => {
    document.body.style.overflow = ''
    gsap.to(splashRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: onEnter,
    })
  }

  return (
    <div className="intro-splash" ref={splashRef}>
      {/* Background image */}
      <div
        className="intro-splash__bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="intro-splash__overlay" />

      {/* Skip button */}
      <button
        className="intro-splash__skip"
        id="splash-skip"
        onClick={handleEnter}
        data-cursor="button"
      >
        SKIP →
      </button>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
        {/* SBTC label */}
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.7rem, 2vw, 1rem)',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '0.5rem',
          opacity: 0.8,
        }}>
          SBTC VN DINO
        </div>

        {/* Main logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div
            ref={logoRef}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 60px rgba(255,45,120,0.5), 0 0 120px rgba(255,45,120,0.2)',
              opacity: 0,
            }}
          >
            SBTC
          </div>
          <div
            ref={islandRef}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            ISLAND
          </div>
        </div>

        {/* Divider line */}
        <div
          ref={lineRef}
          className="intro-splash__line"
          style={{ transformOrigin: 'center', transform: 'scaleX(0)' }}
        />

        {/* Tagline */}
        <div
          ref={tagRef}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            opacity: 0,
          }}
        >
          ĐẢO KHỦNG LONG · VIỆT NAM · THE ISLE EVRIMA
        </div>

        {/* Enter button */}
        <button
          ref={btnRef}
          id="splash-enter"
          onClick={handleEnter}
          data-cursor="button"
          style={{
            marginTop: '3rem',
            padding: '1rem 3rem',
            background: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'none',
            opacity: 0,
            boxShadow: '0 0 30px rgba(255,45,120,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 0 50px rgba(255,45,120,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,45,120,0.4)'
          }}
        >
          ENTER THE ISLAND →
        </button>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="intro-splash__progress"
        style={{ width: `${progress}%` }}
      />

      {/* Particle dots decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden',
      }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            borderRadius: '50%',
            background: 'rgba(255,45,120,0.4)',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float-dot ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 3 + 's',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes float-dot {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
