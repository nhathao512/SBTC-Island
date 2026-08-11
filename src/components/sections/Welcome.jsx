import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import { siteConfig } from '../../data/site.js'

export default function Welcome() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -60,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(imgRef.current, {
        opacity: 0,
        x: 60,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(lineRef.current, {
        scaleY: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)' }}
    >
      <div
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
        className="welcome-grid"
      >
        {/* Text */}
        <div ref={textRef} style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: 0,
              top: '0.5rem',
              bottom: '0.5rem',
              width: 2,
              background: 'var(--color-accent)',
              transformOrigin: 'top',
            }}
          />
          <div className="text-label" style={{ marginBottom: '1.5rem' }}>
            WELCOME TO
          </div>
          <h2 className="text-section-title" style={{ marginBottom: '2rem' }}>
            {siteConfig.shortName}
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              lineHeight: 1.9,
              maxWidth: '36rem',
              marginBottom: '2rem',
            }}
          >
            A new world built for those who are ready to<br />
            survive, explore and conquer.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#3A3A3A',
              lineHeight: 1.7,
              maxWidth: '32rem',
            }}
          >
            {siteConfig.name} — Asia's premier dinosaur survival experience. Join thousands of players from Vietnam and SEA region in a world unlike any other.
          </p>
        </div>

        {/* Image */}
        <div
          ref={imgRef}
          style={{
            height: 'clamp(300px, 50vh, 500px)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #1E1E1E',
          }}
          data-cursor="image"
        >
          <ImagePlaceholder
            src={siteConfig.gallery[0]}
            alt="DINO5VN Server"
            className="w-full h-full"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .welcome-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
