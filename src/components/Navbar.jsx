import { useEffect, useRef, useState } from 'react'
import { serverConfig } from '../data/server.js'

const NAV_LINKS = [
  { label: 'Trang Chủ',  href: '#hero' },
  { label: 'Tính Năng',  href: '#features' },
  { label: 'Sự Kiện',    href: '#events' },
  { label: 'Live Map',   href: '#livemap' },
  { label: 'Launcher',   href: '#launcher' },
  { label: 'Cộng Đồng',  href: '#community' },
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
        <a href="#hero" style={{ cursor: 'none', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: '1.5rem',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            SBTC
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: '1.5rem',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            color: '#F5F5F5',
          }}>
            ISLAND
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '0.55rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-accent)',
            border: '1px solid rgba(255,45,120,0.35)',
            padding: '0.15rem 0.4rem',
            marginLeft: '0.25rem',
          }}>
            SEA
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                cursor: 'none',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--color-muted)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={serverConfig.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="nav-discord-btn"
            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
          >
            Discord
          </a>
          <a
            href={serverConfig.steam}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id="nav-steam-btn"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
          >
            Tải Game
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'none', background: 'none', border: 'none' }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: '#F5F5F5', transition: 'transform 0.3s, opacity 0.3s',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(3px, -3px)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(5,5,5,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid #1E1E1E',
          padding: '1.5rem',
        }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '0.85rem 0',
                borderBottom: '1px solid #1E1E1E',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '1.25rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--color-text)', textDecoration: 'none', cursor: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <a
              href={serverConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center', display: 'flex' }}
              onClick={() => setMenuOpen(false)}
            >
              Discord
            </a>
            <a
              href={serverConfig.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', display: 'flex' }}
              onClick={() => setMenuOpen(false)}
            >
              Tải Game
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
