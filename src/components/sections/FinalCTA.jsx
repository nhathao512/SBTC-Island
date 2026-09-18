import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'

export default function FinalCTA() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const ctaRef     = useRef(null)
  const silRef     = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(silRef.current, {
        opacity: 0, y: 80, scale: 0.9, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(textRef.current.children, {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      gsap.from(ctaRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', overflow: 'hidden',
        background: 'var(--color-bg)', padding: '8rem 2rem',
      }}
    >
      {/* T-Rex silhouette */}
      <div ref={silRef} aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.04, pointerEvents: 'none', zIndex: 1,
      }}>
        <svg viewBox="0 0 400 300" width="800" height="600" fill="#FF2D78" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <ellipse cx="200" cy="200" rx="90" ry="65" />
          <rect x="240" y="130" width="40" height="70" rx="10" />
          <ellipse cx="285" cy="115" rx="55" ry="30" />
          <ellipse cx="330" cy="125" rx="30" ry="16" />
          <path d="M110 210 Q70 220 40 240 Q80 215 110 200Z" />
          <path d="M110 200 Q60 200 20 215 Q65 195 110 190Z" />
          <rect x="155" y="255" width="30" height="40" rx="8" />
          <rect x="205" y="255" width="30" height="40" rx="8" />
          <rect x="250" y="160" width="14" height="28" rx="6" transform="rotate(20, 250, 160)" />
          {[0,1,2,3,4].map(i => (
            <polygon key={i} points={`${185+i*10},${175-i*2} ${190+i*10},${155-i*2} ${195+i*10},${175-i*2}`} />
          ))}
        </svg>
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(255,45,120,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '54rem' }}>
        <div className="text-label" style={{ marginBottom: '2rem' }}>ĐÃ SẴN SÀNG?</div>

        <div ref={textRef}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 10rem)',
            lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em',
          }}>
            <span style={{ display: 'block', color: '#F5F5F5' }}>SẴN SÀNG</span>
            <span style={{ display: 'block', color: 'var(--color-accent)' }}>THAM CHIẾN</span>
            <span style={{ display: 'block', color: '#F5F5F5' }}>CHƯA?</span>
          </h2>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'center', marginTop: '3rem',
        }}>
          <a
            href={serverConfig.steam}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id="final-cta-steam"
            data-cursor="button"
          >
            Tải Game Trên Steam
          </a>
          <a
            href="#launcher"
            className="btn-outline"
            id="final-cta-launcher"
            data-cursor="button"
          >
            Tải Launcher
          </a>
          <a
            href={serverConfig.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="final-cta-discord"
            data-cursor="button"
          >
            Join Discord
          </a>
          <a
            href={serverConfig.livemap}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="final-cta-map"
            data-cursor="button"
          >
            Bản Đồ Real-time ↗
          </a>
        </div>

        {/* Server status */}
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div className="status-badge" style={{ justifyContent: 'center' }}>
            <span className="status-dot" />
            <span className="text-label" style={{ color: 'var(--color-online)' }}>ONLINE</span>
          </div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '0.7rem',
            letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2A2A2A',
          }}>
            SEA REGION · {serverConfig.maxSlots} SLOTS · VER {serverConfig.version}
          </div>
          <div className="text-label" style={{ color: '#2A2A2A', marginTop: '2rem' }}>
            SBTC ISLAND — ĐẢO KHỦNG LONG VIỆT NAM
          </div>
        </div>
      </div>
    </section>
  )
}
