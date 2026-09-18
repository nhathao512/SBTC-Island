import { useState } from 'react'
import { Sparkles } from 'lucide-react'

// Page background — overlays use same color to "erase" Sketchfab chrome
const BG = '#050505'

// autospin=0.25: T-Rex tự động xoay 360 độ.
// Khi người dùng kéo chuột hoặc chạm vào mô hình, Sketchfab sẽ điều khiển theo thao tác của người dùng.
// Khi thả chuột ra, mô hình tiếp tục tự xoay mượt mà.
const EMBED_SRC =
  'https://sketchfab.com/models/96fba56efbc944e381b7d18d14357ed2/embed' +
  '?autostart=1&autospin=0.25&scrollwheel=0&ui_theme=dark&transparent=1&camera=0&ui_infos=0&ui_stop=0&ui_controls=0&ui_hint=0&annotation=0&dnt=1&preload=1'

const SKINS = [
  {
    id: 'origin',
    name: 'Nguyên Bản',
    color: '#8B5A2B',
    filter: 'none',
    glow: 'rgba(139,90,43,0.25)',
  },
  {
    id: 'sbtc',
    name: 'SBTC Neon',
    color: '#FF2D78',
    filter: 'sepia(0.65) hue-rotate(285deg) saturate(3.8) contrast(1.1) brightness(1.05)',
    glow: 'rgba(255,45,120,0.35)',
  },
  {
    id: 'crimson',
    name: 'Huyết Long',
    color: '#E11D48',
    filter: 'sepia(0.6) hue-rotate(325deg) saturate(4.0) contrast(1.15) brightness(1.0)',
    glow: 'rgba(225,29,72,0.35)',
  },
  {
    id: 'emerald',
    name: 'Độc Long',
    color: '#10B981',
    filter: 'sepia(0.6) hue-rotate(85deg) saturate(3.5) contrast(1.1) brightness(1.05)',
    glow: 'rgba(16,185,129,0.35)',
  },
  {
    id: 'cyan',
    name: 'Băng Long',
    color: '#06B6D4',
    filter: 'sepia(0.55) hue-rotate(155deg) saturate(3.5) contrast(1.1) brightness(1.1)',
    glow: 'rgba(6,182,212,0.35)',
  },
  {
    id: 'gold',
    name: 'Kim Long',
    color: '#EAB308',
    filter: 'sepia(0.85) hue-rotate(5deg) saturate(3.2) contrast(1.15) brightness(1.15)',
    glow: 'rgba(234,179,8,0.35)',
  },
  {
    id: 'obsidian',
    name: 'Hắc Báo',
    color: '#262626',
    filter: 'grayscale(1) contrast(1.5) brightness(0.8)',
    glow: 'rgba(255,255,255,0.15)',
  },
]

export default function TrexScene() {
  const [selectedSkin, setSelectedSkin] = useState(SKINS[0])

  return (
    <div
      data-cursor="trex"
      onWheel={(e) => {
        window.scrollBy({ top: e.deltaY, behavior: 'auto' })
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic ambient rim glow based on selected skin */}
      <div style={{
        position: 'absolute',
        top: '20%', right: '15%',
        width: 420, height: 420,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${selectedSkin.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'background 0.5s ease',
      }} />

      {/* Sketchfab viewer: autospin xoay tự động + CSS filter đổi màu skin tức thì */}
      <iframe
        title="MÔ HÌNH KHỦNG LONG TYRANNOSAURUS REX by BioVerse"
        src={EMBED_SRC}
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          border: 'none',
          display: 'block',
          filter: selectedSkin.filter,
          transition: 'filter 0.4s ease',
        }}
        loading="lazy"
      />

      {/* ── Soft cover for bottom-left watermark icon ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 68,
        height: 48,
        background: BG,
        zIndex: 15,
        pointerEvents: 'none',
      }} />

      {/* ── Interactive Skin Palette & Control Bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.4rem',
          pointerEvents: 'auto',
        }}
      >
        {/* Interaction Hint */}
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.65rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#aaa',
          background: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.3rem 0.75rem',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.45rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 8px #4ade80',
          }} />
          Tự xoay 360° · Kéo chuột để xoay tự do
        </div>

        {/* Floating Skin Selector Box */}
        <div style={{
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '0.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
        }}>
          {/* Header row with current skin name */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '0.75rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#f5f5f5',
            }}>
              <Sparkles size={13} color="var(--color-accent)" />
              <span>Skin: <strong style={{ color: selectedSkin.color }}>{selectedSkin.name}</strong></span>
            </div>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.6rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Click đổi màu
            </span>
          </div>

          {/* Color Swatches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {SKINS.map((skin) => {
              const isSelected = selectedSkin.id === skin.id
              return (
                <button
                  key={skin.id}
                  onClick={() => setSelectedSkin(skin)}
                  title={`Đổi màu skin: ${skin.name}`}
                  aria-label={skin.name}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: skin.color,
                    border: isSelected ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.25)',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isSelected ? `0 0 12px ${skin.color}` : 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.transform = 'scale(1.15)'
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
