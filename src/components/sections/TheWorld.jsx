import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'

export default function TheWorld() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const word1 = useRef(null)
  const word2 = useRef(null)
  const word3 = useRef(null)
  const titleRef   = useRef(null)
  const steamRef   = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo(imgRef.current,
        { scale: 1.1 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5,
          },
        }
      )
      gsap.from([word1.current, word2.current, word3.current], {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
      gsap.from(steamRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: steamRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Top heading */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}>
        <div className="text-label" style={{ marginBottom: '1rem' }}>THẾ GIỚI KHỦNG LONG</div>
        <h2 className="text-section-title">
          ĐÂY LÀ<br />
          <span style={{ color: 'var(--color-accent)' }}>THE ISLE</span>
        </h2>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginTop: '1.5rem',
        }}>
          Sinh Tồn.&nbsp;&nbsp; Tiến Hóa.&nbsp;&nbsp; Thống Trị.
        </p>
      </div>

      {/* Full-width banner with parallax */}
      <div style={{
        position: 'relative', width: '100%',
        height: 'clamp(300px, 55vh, 650px)',
        overflow: 'hidden',
      }} data-cursor="image">
        <div ref={imgRef} style={{ width: '100%', height: '100%' }}>
          <img
            src="/images/server-02.jpg"
            alt="SBTC ISLAND World"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.5) 100%)',
        }} />
        {/* Overlay words */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-around', padding: '0 4rem',
        }}>
          {[
            { ref: word1, label: 'KHÁM PHÁ' },
            { ref: word2, label: 'SINH TỒN' },
            { ref: word3, label: 'THỐNG TRỊ' },
          ].map(w => (
            <div
              key={w.label}
              ref={w.ref}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'rgba(245,245,245,0.9)',
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
              }}
            >
              {w.label}
            </div>
          ))}
        </div>
      </div>

      {/* Steam CTA box */}
      <div
        ref={steamRef}
        style={{
          maxWidth: '90rem', margin: '4rem auto 0',
          padding: '0 2rem',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2rem',
          alignItems: 'center',
          padding: '2.5rem',
          border: '1px solid #1e1e1e',
          background: 'var(--color-surface)',
        }}
          className="steam-cta-grid"
        >
          <div>
            <div className="text-label" style={{ marginBottom: '0.75rem' }}>
              CHƯA CÓ GAME?
            </div>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              textTransform: 'uppercase',
              color: '#f5f5f5',
              marginBottom: '0.75rem',
            }}>
              Tải The Isle Trên Steam
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7,
            }}>
              The Isle là game sinh tồn khủng long multiplayer. Bạn sinh ra là một con khủng long, phải ăn, uống, lớn lên và chiến đấu để tồn tại trong một thế giới mở rộng lớn với hàng trăm người chơi.
            </p>
          </div>
          <a
            href={serverConfig.steam}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-cursor="button"
            style={{ whiteSpace: 'nowrap' }}
          >
            Tải Trên Steam →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .steam-cta-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          [ref="word1"], [ref="word2"], [ref="word3"] { display: none; }
        }
      `}</style>
    </section>
  )
}
