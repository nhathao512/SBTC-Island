import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'
import { ExternalLink, Navigation, Shield, Activity, Users } from 'lucide-react'

export default function LiveMap() {
  const sectionRef   = useRef(null)
  const headingRef   = useRef(null)
  const cardRef      = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(cardRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const mapFeatures = [
    {
      icon: Navigation,
      title: 'ĐỊNH VỊ REAL-TIME',
      desc: 'Theo dõi tọa độ, vị trí đàn và hướng di chuyển của các loài khủng long trên toàn bản đồ.',
    },
    {
      icon: Activity,
      title: 'KILLFEED & THỐNG KÊ',
      desc: 'Cập nhật diễn biến săn bắt, các cuộc chạm trán nảy lửa và bảng xếp hạng top survivor.',
    },
    {
      icon: Shield,
      title: 'RADAR AN TOÀN',
      desc: 'Giám sát vùng lãnh thổ, cảnh báo sớm nguy cơ Overpacking và vi phạm Mixpack.',
    },
    {
      icon: Users,
      title: 'THÔNG TIN BẦY ĐÀN',
      desc: 'Tìm kiếm đồng loại, nhận diện tín hiệu kêu gọi và kết nối gia đình nhanh chóng.',
    },
  ]

  return (
    <section
      id="livemap"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(255,45,120,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '3.5rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)' }} />
            HỆ THỐNG BẢN ĐỒ TRỰC TUYẾN
          </div>
          <h2 className="text-section-title">
            THEO DÕI<br />
            <span style={{ color: 'var(--color-accent)' }}>REAL-TIME</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem', color: 'var(--color-muted)',
            lineHeight: 1.8, maxWidth: '55ch', marginTop: '1.25rem',
          }}>
            Hệ thống radar và bản đồ thời gian thực chính thức của server SBTC ISLAND tại{' '}
            <a
              href="https://sbtcisland.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-accent)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontWeight: 600,
              }}
            >
              sbtcisland.com
            </a>
            . Tra cứu vị trí khủng long, killfeed và dữ liệu server tức thì.
          </p>
        </div>

        {/* Showcase Banner Box */}
        <div
          ref={cardRef}
          style={{
            border: '1px solid rgba(255,45,120,0.3)',
            background: 'linear-gradient(135deg, rgba(255,45,120,0.04) 0%, rgba(10,10,10,0.95) 50%, rgba(0,0,0,0.98) 100%)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top radar line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #FF2D78, transparent)',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left: Info & CTAs */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                border: '1px solid rgba(74,222,128,0.35)',
                background: 'rgba(74,222,128,0.08)',
                marginBottom: '1.5rem',
              }}>
                <span className="status-dot" style={{ background: '#4ade80' }} />
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.7rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#4ade80',
                }}>
                  RADAR ĐANG HOẠT ĐỘNG · SEA SERVER
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                textTransform: 'uppercase',
                color: '#f5f5f5',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}>
                TRUY CẬP TRỰC TIẾP<br />
                <span style={{ color: 'var(--color-accent)' }}>SBTCISLAND.COM</span>
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem', color: 'var(--color-muted)',
                lineHeight: 1.8, marginBottom: '2.5rem',
              }}>
                Theo dõi bản đồ với độ trễ thấp nhất, tương tác mượt mà với zoom đa tầng, hiển thị tọa độ X/Y/Z chính xác cùng dữ liệu đàn được đồng bộ trực tiếp từ server.
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a
                  href={serverConfig.livemap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cursor="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 2rem',
                    fontSize: '0.95rem',
                  }}
                >
                  <ExternalLink size={16} />
                  Mở Bản Đồ Real-time (sbtcisland.com)
                </a>
                <a
                  href={serverConfig.checkDino}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  data-cursor="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 1.75rem',
                    fontSize: '0.95rem',
                  }}
                >
                  Check Dino Của Bạn →
                </a>
              </div>
            </div>

            {/* Right: Feature Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}>
              {mapFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid #1e1e1e',
                      transition: 'border-color 0.3s, transform 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,45,120,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#1e1e1e'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,45,120,0.1)',
                      border: '1px solid rgba(255,45,120,0.25)',
                      color: 'var(--color-accent)',
                      marginBottom: '1rem',
                    }}>
                      <Icon size={18} />
                    </div>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: '0.85rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: '#f5f5f5', marginBottom: '0.5rem',
                    }}>
                      {f.title}
                    </div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem', color: 'var(--color-muted)',
                      lineHeight: 1.6,
                    }}>
                      {f.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
