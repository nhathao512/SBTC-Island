import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import { serverConfig } from '../../data/server.js'
import { siteConfig } from '../../data/site.js'

export default function Community() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 40,
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
      id="community"
      ref={sectionRef}
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-surface)' }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <ImagePlaceholder
          src={siteConfig.discordImage}
          alt="Community"
          className="w-full h-full"
          label="COMMUNITY"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.85) 50%, rgba(5,5,5,0.92) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '90rem',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div ref={contentRef} style={{ maxWidth: '50rem' }}>
          <div className="text-label" style={{ marginBottom: '1.5rem' }}>COMMUNITY</div>
          <h2 className="text-section-title" style={{ marginBottom: '1.5rem' }}>
            JOIN<br />
            <span style={{ color: 'var(--color-accent)' }}>{siteConfig.community}</span>
          </h2>

          {[
            'Meet the community.',
            'Get server updates.',
            'Join events.',
            'Find your squad.',
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                marginBottom: '0.25rem',
              }}
            >
              {line}
            </p>
          ))}

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={serverConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor="button"
            >
              Join Discord →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
