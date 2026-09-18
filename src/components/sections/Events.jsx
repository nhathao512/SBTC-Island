import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EVENTS, SERVER_FEATURES, SERVER_SCHEDULE } from '../../data/events.js'
import { serverConfig } from '../../data/server.js'

/* ── Countdown / Status badge ─────────────────────────────────────── */
function EventBadge({ status }) {
  const map = {
    UPCOMING: { label: 'SẮP DIỄN RA', color: '#FF2D78' },
    LIVE:     { label: 'ĐANG DIỄN RA', color: '#4ade80' },
    COMPLETED:{ label: 'ĐÃ DIỄN RA', color: '#a3a3a3' },
  }
  const { label, color } = map[status] || map.UPCOMING
  return (
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700,
      fontSize: '0.65rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color,
      border: `1px solid ${color}40`,
      background: `${color}10`,
      padding: '0.25rem 0.75rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
    }}>
      {status === 'LIVE' && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#4ade80',
          boxShadow: '0 0 8px #4ade80',
          display: 'inline-block',
        }} />
      )}
      {label}
    </span>
  )
}

/* ── Showmatch Card ─────────────────────────────────────────────── */
function ShowmatchCard({ event, onZoom }) {
  const cardRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      ref={cardRef}
      id="showmatch"
      style={{
        position: 'relative',
        border: '1px solid rgba(255,45,120,0.25)',
        background: 'rgba(255,45,120,0.03)',
        overflow: 'hidden',
      }}
    >
      {/* Top glow accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(to right, transparent, #FF2D78, transparent)',
      }} />

      {/* Event image — hiển thị toàn bộ kích thước thật, không bị cắt xén */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: '#070707',
          cursor: onZoom ? 'zoom-in' : 'default',
        }}
        onClick={() => onZoom && onZoom(event.image)}
        title="Bấm để phóng to poster HD"
      >
        {!imgFailed ? (
          <img
            src={event.image}
            alt={event.title}
            onError={() => setImgFailed(true)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: 'none',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div style={{
            width: '100%', minHeight: 280,
            background: 'linear-gradient(135deg, #1a0010 0%, #0a0a0a 40%, #001020 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '3rem 2rem', gap: '1rem',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(2rem,6vw,4rem)',
              color: '#FF2D78', letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: '0 0 40px rgba(255,45,120,0.5)',
            }}>
              {event.title}
            </div>
            <div style={{
              display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center',
            }}>
              {event.highlights?.map(h => (
                <div key={h} style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '1.1rem',
                  letterSpacing: '0.2em', color: '#f5f5f5',
                  textTransform: 'uppercase',
                }}>
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: '0.75rem', right: '0.75rem',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.65rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#e5e5e5',
          background: 'rgba(0,0,0,0.85)',
          padding: '0.3rem 0.65rem',
          border: '1px solid #333',
        }}>
          Phóng To Poster
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Badge + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <EventBadge status={event.status} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem', color: 'var(--color-muted)',
          }}>
            {event.date} · {event.time} · Discord SBTCISLAND
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.95rem', color: 'var(--color-muted)',
          lineHeight: 1.8, maxWidth: '70ch',
        }}>
          {event.description}
        </p>

        {/* Rules grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {event.rules?.map((rule, idx) => (
            <div key={rule.title} style={{
              padding: '1.25rem',
              border: '1px solid #1e1e1e',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.75rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--color-accent)', marginBottom: '0.75rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{
                  border: '1px solid rgba(255,45,120,0.4)',
                  padding: '0.1rem 0.4rem',
                  fontSize: '0.65rem',
                  color: '#fff',
                  background: 'rgba(255,45,120,0.15)',
                }}>
                  {rule.tag || String(idx + 1).padStart(2, '0')}
                </span>
                {rule.title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {rule.items.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.6,
                    paddingLeft: '1rem', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0,
                      color: 'var(--color-accent)',
                    }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Format badges */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            event.format?.mode,
            event.format?.bo,
            event.format?.timePerMatch,
          ].filter(Boolean).map(tag => (
            <span key={tag} style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#f5f5f5',
              border: '1px solid #2a2a2a',
              padding: '0.3rem 0.85rem',
              background: 'rgba(255,255,255,0.04)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={event.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          data-cursor="button"
          style={{ alignSelf: 'flex-start' }}
        >
          Xem Chi Tiết trên Discord →
        </a>
      </div>
    </div>
  )
}

/* ── Feature Card ───────────────────────────────────────────────── */
function FeatureCard({ feat, index, onZoom }) {
  const cardRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      ref={cardRef}
      style={{
        border: '1px solid #1e1e1e',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,45,120,0.3)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1e1e1e'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Infographic Image — hiển thị trọn vẹn hình ảnh, không bị cắt xén */}
      <div
        style={{
          width: '100%',
          background: '#070707',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #1e1e1e',
          cursor: onZoom ? 'zoom-in' : 'default',
        }}
        onClick={() => onZoom && onZoom(feat.image)}
        title="Bấm để phóng to ảnh HD"
      >
        {!imgFailed ? (
          <img
            src={feat.image}
            alt={feat.title}
            onError={() => setImgFailed(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          />
        ) : (
          <div style={{
            width: '100%', minHeight: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0d0d0d',
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: '1.1rem',
              letterSpacing: '0.2em', color: '#1e1e1e',
              textTransform: 'uppercase',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Tag */}
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-accent)',
          background: 'rgba(0,0,0,0.85)',
          padding: '0.2rem 0.5rem',
          border: '1px solid rgba(255,45,120,0.4)',
        }}>
          {feat.tag}
        </div>

        {/* Zoom badge hint */}
        <div style={{
          position: 'absolute', bottom: '0.5rem', right: '0.5rem',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.6rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#e5e5e5',
          background: 'rgba(0,0,0,0.8)',
          padding: '0.2rem 0.5rem',
          border: '1px solid #333',
        }}>
          Phóng To
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: '1.15rem',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: '#f5f5f5', marginBottom: '0.6rem',
          lineHeight: 1.2,
        }}>
          {feat.title}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.82rem', color: 'var(--color-muted)',
          lineHeight: 1.7, marginBottom: '1rem',
        }}>
          {feat.summary}
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: 'auto' }}>
          {feat.details.map((d, i) => (
            <li key={i} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem', color: '#888',
              paddingLeft: '1rem', position: 'relative', lineHeight: 1.5,
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>›</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── Schedule Banner ────────────────────────────────────────────── */
function ScheduleBanner({ schedule }) {
  return (
    <div style={{
      border: '1px solid rgba(255,45,120,0.2)',
      background: 'rgba(255,45,120,0.04)',
      padding: '1.5rem 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
    }}>
      <div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.65rem',
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--color-accent)', marginBottom: '0.4rem',
        }}>
          LỊCH RESTART CỐ ĐỊNH MỖI NGÀY
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {schedule.restarts.map(r => (
            <span key={r.time} style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: '1.4rem',
              color: '#f5f5f5', letterSpacing: '0.05em',
            }}>
              {r.time}
            </span>
          ))}
        </div>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.82rem', color: 'var(--color-muted)',
        lineHeight: 1.7, maxWidth: '40ch',
        borderLeft: '2px solid rgba(255,45,120,0.3)',
        paddingLeft: '1.5rem',
      }}>
        {schedule.note}
      </p>
    </div>
  )
}

/* ── Main Export ────────────────────────────────────────────────── */
export default function Events() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef   = useRef([])
  const [modalImg, setModalImg] = useState(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(cardsRef.current.filter(Boolean), {
        opacity: 0, y: 50,
        stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section
      id="events"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '4rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem' }}>SỰ KIỆN & CẬP NHẬT</div>
          <h2 className="text-section-title">
            TIN TỨC<br />
            <span style={{ color: 'var(--color-accent)' }}>MỚI NHẤT</span>
          </h2>
        </div>

        {/* Server schedule banner */}
        <div style={{ marginBottom: '4rem' }}>
          <ScheduleBanner schedule={SERVER_SCHEDULE} />
        </div>

        {/* Showmatch events */}
        {EVENTS.map((ev, i) => (
          <div
            key={ev.id}
            ref={el => (cardsRef.current[i] = el)}
            style={{ marginBottom: '3rem' }}
          >
            <ShowmatchCard event={ev} onZoom={setModalImg} />
          </div>
        ))}

        {/* New Features heading */}
        <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <div className="text-label" style={{ marginBottom: '0.75rem' }}>TÍNH NĂNG MỚI</div>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            textTransform: 'uppercase', color: '#f5f5f5',
          }}>
            CẬP NHẬT SERVER
          </h3>
        </div>

        {/* Feature cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {SERVER_FEATURES.map((feat, i) => (
            <div
              key={feat.id}
              ref={el => (cardsRef.current[EVENTS.length + i] = el)}
            >
              <FeatureCard feat={feat} index={i} onZoom={setModalImg} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal phóng to ảnh */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.94)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            cursor: 'zoom-out',
          }}
        >
          <div
            style={{ position: 'relative', maxWidth: '94vw', maxHeight: '92vh' }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={modalImg}
              alt="Chi tiết ảnh"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                display: 'block',
                borderRadius: 4,
                boxShadow: '0 0 50px rgba(255,45,120,0.25)',
                border: '1px solid rgba(255,45,120,0.35)',
              }}
            />
            <button
              onClick={() => setModalImg(null)}
              aria-label="Đóng ảnh"
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: '#fff',
                border: '2px solid #fff',
                fontSize: '1.1rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
