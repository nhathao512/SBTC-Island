import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'
import { siteConfig } from '../../data/site.js'

/* ── Animated stat counter ─────────────────────────────────────── */
function StatCounter({ end, suffix = '', label, delay = 0 }) {
  const numRef  = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (reduced) { if (numRef.current) numRef.current.textContent = end + suffix; return }
        gsap.fromTo({ val: 0 },
          { val: 0 },
          {
            val: end,
            duration: 1.8,
            delay,
            ease: 'power2.out',
            onUpdate() {
              if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].val) + suffix
            },
          }
        )
      },
    })
  }, [])

  return (
    <div ref={cardRef} className="stat-card">
      <div className="stat-number" ref={numRef}>0{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Welcome() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const imgRef     = useRef(null)
  const lineRef    = useRef(null)
  const teamRef    = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(teamRef.current?.children || [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 90%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const allTeam = [
    ...serverConfig.streamers.map(s => ({ ...s, accentColor: 'rgba(255,45,120,0.15)', borderColor: 'rgba(255,45,120,0.25)' })),
    ...serverConfig.admins.map(a => ({ ...a, accentColor: 'rgba(255,45,120,0.08)', borderColor: 'rgba(255,45,120,0.15)' })),
  ]

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Top: Text + Image ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
          className="welcome-grid"
        >
          {/* Text */}
          <div ref={textRef} style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div
              ref={lineRef}
              style={{
                position: 'absolute', left: 0, top: '0.5rem', bottom: '0.5rem',
                width: 2, background: 'var(--color-accent)', transformOrigin: 'top',
              }}
            />
            <div className="text-label" style={{ marginBottom: '1.25rem' }}>CHÀO MỪNG ĐẾN VỚI</div>
            <h2 className="text-section-title" style={{ marginBottom: '1.25rem' }}>
              {siteConfig.shortName}
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem', color: 'var(--color-muted)',
              lineHeight: 1.8, maxWidth: '36rem', marginBottom: '1.25rem',
            }}>
              Server The Isle Evrima hàng đầu Việt Nam — nơi người chơi được sinh tồn, tiến hóa và xây dựng cộng đồng cùng nhau. Ra mắt bởi đội ngũ SBTC với sự dẫn đầu của <strong style={{ color: '#f5f5f5' }}>Thầy Giáo Ba</strong> và cộng đồng streamers SBTC.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem', color: '#3A3A3A',
              lineHeight: 1.7, maxWidth: '32rem',
            }}>
              Server được vận hành bởi Admin <strong style={{ color: '#5a5a5a' }}>KanKan</strong> và <strong style={{ color: '#5a5a5a' }}>PopaCanada</strong> — cam kết mang lại trải nghiệm tốt nhất mỗi ngày.
            </p>
          </div>

          {/* Image */}
          <div
            ref={imgRef}
            style={{
              height: 'clamp(260px, 42vh, 420px)',
              position: 'relative', overflow: 'hidden',
              border: '1px solid #1E1E1E',
            }}
            data-cursor="image"
          >
            <img
              src="/images/server-01.jpg"
              alt="SBTC ISLAND Server"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)',
            }} />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px',
          background: '#1e1e1e',
          marginBottom: '3.5rem',
        }}>
          <StatCounter end={450}  suffix="+"  label="Người Chơi Tối Đa" delay={0}   />
          <StatCounter end={128}  suffix="GB" label="RAM Server"        delay={0.1} />
          <StatCounter end={10}   suffix="Gb" label="Băng Thông"        delay={0.2} />
          <StatCounter end={24}   suffix="/7" label="Online Mỗi Ngày"   delay={0.3} />
        </div>

        {/* ── Team section ── */}
        <div>
          <div className="text-label" style={{ marginBottom: '2rem' }}>ĐỘI NGŨ</div>
          <div
            ref={teamRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: '#1e1e1e',
            }}
          >
            {allTeam.map(member => (
              <div
                key={member.name}
                className="team-card"
                style={{ background: member.accentColor }}
              >
                <div className="team-card__role">{member.role}</div>
                <div className="team-card__name">{member.name}</div>
                {member.handle && (
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem', color: 'var(--color-accent)',
                    marginBottom: '0.5rem', opacity: 0.7,
                  }}>
                    @{member.handle}
                  </div>
                )}
                <div className="team-card__desc">{member.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
