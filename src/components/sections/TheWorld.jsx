import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import { siteConfig } from '../../data/site.js'

export default function TheWorld() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const word1 = useRef(null)
  const word2 = useRef(null)
  const word3 = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      // Parallax on image
      gsap.fromTo(imgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      // Words stagger
      const words = [word1.current, word2.current, word3.current]
      gsap.from(words, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Top heading */}
      <div
        ref={titleRef}
        style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}
      >
        <div className="text-label" style={{ marginBottom: '1rem' }}>THE WORLD</div>
        <h2 className="text-section-title">
          THIS IS<br />
          <span style={{ color: 'var(--color-accent)' }}>{siteConfig.shortName}</span>
        </h2>
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            marginTop: '1.5rem',
          }}
        >
          A World.&nbsp;&nbsp; A Community.&nbsp;&nbsp; An Adventure.
        </p>
      </div>

      {/* Full-width banner */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(300px, 55vh, 650px)',
          overflow: 'hidden',
        }}
        data-cursor="image"
      >
        <div ref={imgRef} style={{ width: '100%', height: '100%' }}>
          <ImagePlaceholder
            src={siteConfig.banner}
            alt="DINO5VN World"
            className="w-full h-full"
            label="BANNER"
          />
        </div>

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.5) 100%)',
          }}
        />

        {/* Overlay words */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 4rem',
          }}
        >
          {[
            { ref: word1, label: 'EXPLORE' },
            { ref: word2, label: 'SURVIVE' },
            { ref: word3, label: 'CONQUER' },
          ].map((w) => (
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
    </section>
  )
}
