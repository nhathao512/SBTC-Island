import { serverConfig } from '../../data/server.js'

const NAV   = ['Trang Chủ', 'Tính Năng', 'Sự Kiện', 'Live Map', 'Cộng Đồng']
const ANCHORS = ['#hero', '#features', '#events', '#livemap', '#community']

export default function Footer() {
  return (
    <footer style={{ background: '#030303', borderTop: '1px solid #1A1A1A', padding: '5rem 0 3rem' }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>
        {/* Top */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3rem', marginBottom: '4rem',
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: '2.5rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: 'var(--color-accent)', marginBottom: '0.25rem',
            }}>
              SBTC
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: '2.5rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#F5F5F5', marginBottom: '0.5rem', marginTop: '-0.5rem',
            }}>
              ISLAND
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#3a3a3a', marginBottom: '1.5rem',
            }}>
              THE ISLE EVRIMA · SEA REGION
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
              color: '#3A3A3A', lineHeight: 1.7, maxWidth: '20rem',
            }}>
              Server The Isle số 1 Việt Nam. Sinh tồn, tiến hóa, thống trị — cùng cộng đồng SBTC.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-label" style={{ marginBottom: '1.5rem' }}>ĐIỀU HƯỚNG</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {NAV.map((label, i) => (
                <a
                  key={label}
                  href={ANCHORS[i]}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: '0.9rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#3A3A3A', textDecoration: 'none', cursor: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#3A3A3A')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="text-label" style={{ marginBottom: '1.5rem' }}>LIÊN KẾT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {[
                { label: 'Discord', href: serverConfig.discord },
                { label: 'Steam — Tải Game', href: serverConfig.steam },
                { label: 'Live Map', href: serverConfig.islepilot },
                { label: 'Check Dino', href: serverConfig.checkDino },
                { label: 'Facebook', href: serverConfig.facebook },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: '0.9rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#3A3A3A', textDecoration: 'none', cursor: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#3A3A3A')}
                >
                  {s.label} →
                </a>
              ))}
            </div>

            {/* Restart schedule */}
            <div style={{
              padding: '0.75rem 1rem',
              border: '1px solid #1A1A1A',
              background: 'rgba(255,45,120,0.03)',
            }}>
              <div className="text-label" style={{ marginBottom: '0.4rem' }}>
                RESTART CỐ ĐỊNH
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem', color: '#3A3A3A', letterSpacing: '0.05em',
              }}>
                11:00 · 18:00 · 22:00 (VN)
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#1A1A1A', marginBottom: '2rem' }} />

        {/* Bottom */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
            color: '#2A2A2A', letterSpacing: '0.05em',
          }}>
            © 2026 SBTC ISLAND. All rights reserved.
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
            color: '#1E1E1E', letterSpacing: '0.05em', textAlign: 'right',
          }}>
            3D MODEL — Tyrannosaurus Rex via{' '}
            <a
              href="https://sketchfab.com/elibrary"
              target="_blank" rel="noopener noreferrer"
              style={{ color: '#2A2A2A', textDecoration: 'underline', cursor: 'none' }}
            >
              Sketchfab
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  )
}
