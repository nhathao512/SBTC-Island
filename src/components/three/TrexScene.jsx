const EMBED_SRC =
  'https://sketchfab.com/models/96fba56efbc944e381b7d18d14357ed2/embed' +
  '?autostart=1&ui_theme=dark&transparent=1&camera=0&ui_infos=0&ui_stop=0&ui_controls=0&ui_hint=0&annotation=0&dnt=1&preload=1'

// Page background — overlays use same color to "erase" Sketchfab chrome
const BG = '#050505'

export default function TrexScene() {
  return (
    <div
      data-cursor="trex"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sketchfab viewer — full size, no shift so T-Rex isn't clipped */}
      <iframe
        title="MÔ HÌNH KHỦNG LONG TYRANOSAURUS REX by BioVerse"
        src={EMBED_SRC}
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{
          position: 'absolute',
          top: '-36px', left: 0,
          width: '100%', height: 'calc(100% + 88px)',
          border: 'none',
          display: 'block',
        }}
        loading="lazy"
      />

      {/* ── Black overlay: covers the Sketchfab TITLE BAR at top ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 56,
        background: BG,
        zIndex: 10,
        pointerEvents: 'none',   // clicks still pass through to viewer
      }} />

      {/* ── Black overlay: covers the CONTROLS BAR at bottom ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 52,
        background: BG,
        zIndex: 10,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
