import { useEffect, useRef, useState } from 'react'
import { serverConfig } from '../data/server.js'
import { siteConfig } from '../data/site.js'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Server', href: '#welcome' },
  { label: 'Features', href: '#features' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3" style={{ cursor: 'none', textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: '1.5rem',
              letterSpacing: '0.08em',
              color: '#F5F5F5',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.shortName}
          </span>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--color-accent)',
              border: '1px solid rgba(200,116,42,0.4)',
              padding: '0.15rem 0.4rem',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.region}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                cursor: 'none',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={serverConfig.playUrl} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}>
            Play Now →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'none', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#F5F5F5',
                transition: 'transform 0.3s, opacity 0.3s',
                transformOrigin: 'center',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(3px, 3px)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(3px, -3px)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(5,5,5,0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid #1E1E1E',
            padding: '1.5rem 1.5rem',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.85rem 0',
                borderBottom: '1px solid #1E1E1E',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                textDecoration: 'none',
                cursor: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={serverConfig.playUrl}
            className="btn-primary"
            style={{ marginTop: '1.25rem', justifyContent: 'center', width: '100%', display: 'flex' }}
            onClick={() => setMenuOpen(false)}
          >
            Play Now →
          </a>
        </div>
      )}
    </nav>
  )
}
