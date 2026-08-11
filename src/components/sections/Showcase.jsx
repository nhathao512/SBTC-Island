import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import { siteConfig } from '../../data/site.js'

const CARDS = [
  { title: 'SERVER WORLD', sub: 'Explore the World', img: 0 },
  { title: 'COMMUNITY', sub: 'Meet the Players', img: 1 },
  { title: 'ADVENTURES', sub: 'Create Your Story', img: 2 },
]

export default function Showcase() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
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
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem' }}>SHOWCASE</div>
          <h2 className="text-section-title">
            INSIDE<br />
            <span style={{ color: 'var(--color-accent)' }}>DINO5VN</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="showcase-card"
              data-cursor="image"
              style={{
                height: 'clamp(280px, 40vh, 420px)',
                position: 'relative',
              }}
            >
              <ImagePlaceholder
                src={siteConfig.gallery[card.img]}
                alt={card.title}
                className="w-full h-full"
                label={card.title}
              />
              <div className="showcase-overlay" />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#F5F5F5',
                    marginBottom: '0.25rem',
                  }}
                >
                  {card.title}
                </div>
                <div className="text-label">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
