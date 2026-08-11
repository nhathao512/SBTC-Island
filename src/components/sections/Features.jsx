import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Swords, Map, Trophy, Users } from 'lucide-react'

const FEATURES = [
  {
    num: '01',
    title: 'SURVIVE',
    desc: 'Enter a world where every choice matters. Hunt, craft, and outlast the wilderness.',
    Icon: Swords,
  },
  {
    num: '02',
    title: 'EXPLORE',
    desc: 'Discover vast territories, hidden caves, and ancient ruins across a prehistoric continent.',
    Icon: Map,
  },
  {
    num: '03',
    title: 'COMPETE',
    desc: 'Rise through the ranks. Prove yourself in events, raids, and clan warfare.',
    Icon: Trophy,
  },
  {
    num: '04',
    title: 'CONNECT',
    desc: 'Find your tribe. Build alliances, forge friendships, and make history together.',
    Icon: Users,
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
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
      style={{ background: 'var(--color-bg)' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>
        {/* Heading */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem' }}>FEATURES</div>
          <h2 className="text-section-title">
            WHY <span style={{ color: 'var(--color-accent)' }}>DINO5VN</span>?
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            border: '1px solid #1E1E1E',
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              ref={(el) => (cardsRef.current[i] = el)}
              className="feature-card"
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '3.5rem',
                  color: '#1A1A1A',
                  lineHeight: 1,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {f.num}
              </div>

              {/* Icon */}
              <div style={{ marginBottom: '1rem', color: 'var(--color-accent)', opacity: 0.8 }}>
                <f.Icon size={20} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#F5F5F5',
                  marginBottom: '0.85rem',
                }}
              >
                {f.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                {f.desc}
              </p>

              {/* Arrow */}
              <div
                className="feature-arrow"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                }}
              >
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
