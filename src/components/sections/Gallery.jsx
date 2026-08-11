import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { siteConfig } from '../../data/site.js'

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const overlayRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(
      imgRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
    )

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose,
    })
  }

  const navigate = (dir) => {
    gsap.fromTo(imgRef.current, { opacity: 0, x: dir * 30 }, { opacity: 1, x: 0, duration: 0.3 })
    setCurrent((c) => (c + dir + images.length) % images.length)
  }
  const prev = () => navigate(-1)
  const next = () => navigate(1)

  const btnStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#F5F5F5',
    cursor: 'none',
    padding: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  }

  return (
    <div ref={overlayRef} className="lightbox-overlay" onClick={close}>
      {/* Close */}
      <button
        style={{ ...btnStyle, position: 'absolute', top: '1.5rem', right: '1.5rem' }}
        onClick={close}
        data-cursor="button"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        style={{ ...btnStyle, position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }}
        onClick={(e) => { e.stopPropagation(); prev() }}
        data-cursor="button"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image */}
      <div ref={imgRef} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
        <img
          src={images[current]}
          alt={`Gallery ${current + 1}`}
          className="lightbox-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        <div
          style={{
            display: 'none',
            width: '60vw',
            height: '60vh',
            maxWidth: 800,
            maxHeight: 600,
            background: '#0A0A0A',
            border: '1px solid #1E1E1E',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: '2rem',
            color: '#1E1E1E',
            letterSpacing: '0.2em',
          }}
        >
          DINO5VN
        </div>
      </div>

      {/* Next */}
      <button
        style={{ ...btnStyle, position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }}
        onClick={(e) => { e.stopPropagation(); next() }}
        data-cursor="button"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'var(--color-muted)',
        }}
      >
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

export default function Gallery() {
  const sectionRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem' }}>GALLERY</div>
          <h2 className="text-section-title">
            THE WORLD<br />
            <span style={{ color: 'var(--color-accent)' }}>THROUGH YOUR EYES</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: '#1E1E1E',
          }}
          className="gallery-grid"
        >
          {siteConfig.gallery.map((imgSrc, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`View image ${i + 1}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
            >
              <img
                src={imgSrc}
                alt={`Server screenshot ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'flex'
                }}
              />
              {/* mini placeholder */}
              <div
                style={{
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  background: '#0A0A0A',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.5rem', color: '#1E1E1E', letterSpacing: '0.2em' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="gallery-item-overlay">
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#F5F5F5',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '0.4rem 0.85rem',
                  }}
                >
                  VIEW
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={siteConfig.gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <style>{`
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
