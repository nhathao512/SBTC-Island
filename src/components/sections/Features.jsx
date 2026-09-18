import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Mic2, Map, Palette, Gift } from 'lucide-react'
import { serverConfig } from '../../data/server.js'

const FEATURES = [
  {
    num: '01',
    title: 'VOICE CHAT',
    desc: 'Proximity voice chat trong game — nghe tiếng khủng long gần bạn và giao tiếp với đồng đội theo khoảng cách thực tế.',
    Icon: Mic2,
    tag: 'IsleVOIP',
  },
  {
    num: '02',
    title: 'LIVE MAP',
    desc: 'Bản đồ real-time trên trình duyệt — xem vị trí dino, killfeed, leaderboard và thống kê server mọi lúc.',
    Icon: Map,
    tag: 'IslePilot',
  },
  {
    num: '03',
    title: 'SKIN EDITOR',
    desc: 'Tùy chỉnh màu sắc khủng long của bạn trực tiếp trên web — thiết kế skin độc quyền và apply ngay trong game.',
    Icon: Palette,
    tag: 'Exclusive',
  },
  {
    num: '04',
    title: 'DINO GIFT',
    desc: 'Tích lũy điểm DG mỗi ngày — đăng nhập, hoàn thành nhiệm vụ để mở case skin độc quyền SBTC ISLAND.',
    Icon: Gift,
    tag: 'Daily Reward',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(cardsRef.current, {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-surface)' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '4rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem' }}>TÍNH NĂNG</div>
          <h2 className="text-section-title">
            TẠI SAO CHỌN{' '}
            <span style={{ color: 'var(--color-accent)' }}>SBTC ISLAND?</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: '#1e1e1e',
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              ref={el => (cardsRef.current[i] = el)}
              className="feature-card"
            >
              {/* Number */}
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: '3.5rem',
                color: '#1A1A1A', lineHeight: 1, marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}>
                {f.num}
              </div>

              {/* Icon + tag row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ color: 'var(--color-accent)', opacity: 0.9 }}>
                  <f.Icon size={22} strokeWidth={1.5} />
                </div>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.6rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(255,45,120,0.25)',
                  padding: '0.15rem 0.5rem',
                }}>
                  {f.tag}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: '1.6rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#F5F5F5', marginBottom: '0.85rem',
              }}>
                {f.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem', color: 'var(--color-muted)',
                lineHeight: 1.7, marginBottom: '2rem',
              }}>
                {f.desc}
              </p>

              {/* Arrow */}
              <div className="feature-arrow" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '1.2rem',
                color: 'var(--color-accent)', letterSpacing: '0.1em',
              }}>
                →
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a
            href={serverConfig.islepilot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            data-cursor="button"
          >
            Xem Toàn Bộ Tính Năng →
          </a>
        </div>
      </div>
    </section>
  )
}
