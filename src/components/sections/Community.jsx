import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'

export default function Community() {
  const sectionRef  = useRef(null)
  const contentRef  = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="community"
      ref={sectionRef}
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-surface)' }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/server-04.jpg"
          alt="Community"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.88) 50%, rgba(5,5,5,0.94) 100%)',
        }} />
        {/* Pink glow overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255,45,120,0.06) 0%, transparent 70%)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '90rem', margin: '0 auto', padding: '0 2rem',
      }}>
        <div ref={contentRef} style={{ maxWidth: '52rem' }}>
          <div className="text-label" style={{ marginBottom: '1.5rem' }}>CỘNG ĐỒNG</div>
          <h2 className="text-section-title" style={{ marginBottom: '1.5rem' }}>
            GIA NHẬP<br />
            <span style={{ color: 'var(--color-accent)' }}>SBTC ISLAND</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem', color: 'var(--color-muted)',
            lineHeight: 1.9, maxWidth: '44ch', marginBottom: '2rem',
          }}>
            Discord là trung tâm của cộng đồng SBTC ISLAND — nơi bạn nhận thông báo server, tham gia sự kiện, tìm squad và gặp gỡ những người bạn đồng hành từ Việt Nam và Đông Nam Á.
          </p>

          {/* Discord feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {[
              '🔔 Nhận thông báo server mới nhất',
              '🦖 Tìm kiếm squad & đồng đội',
              '🎮 Tham gia sự kiện và showmatch',
              '📢 Cập nhật luật & tính năng',
              '🎁 Nhận thông báo mở case Dino Gift',
            ].map(line => (
              <p key={line} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.8,
              }}>
                {line}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={serverConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="community-discord-btn"
              data-cursor="button"
            >
              Join Discord →
            </a>
            <a
              href="#launcher"
              className="btn-primary"
              id="community-launcher-btn"
              data-cursor="button"
            >
              Tải Launcher
            </a>
            <a
              href={serverConfig.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              data-cursor="button"
            >
              Tải Game Trên Steam
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
