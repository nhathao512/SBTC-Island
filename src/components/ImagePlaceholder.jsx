/**
 * Dark image placeholder for when user's image files aren't yet added.
 * Use `src` prop with the expected path — if the image 404s, shows placeholder.
 */
export default function ImagePlaceholder({ src, alt = '', className = '', style = {}, label = 'SBTC ISLAND' }) {
  const handleError = (e) => {
    // Hide the broken img and show the placeholder sibling
    e.currentTarget.style.display = 'none'
    const ph = e.currentTarget.nextSibling
    if (ph) ph.style.display = 'flex'
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover block"
          onError={handleError}
          loading="lazy"
        />
      )}
      {/* Placeholder shown when image missing / errors */}
      <div
        className="w-full h-full flex-col items-center justify-center absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)',
          border: '1px solid #1E1E1E',
          display: src ? 'none' : 'flex',
        }}
      >
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: '1.25rem',
          letterSpacing: '0.2em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}>
          {label}
        </div>
        <div style={{ width: 32, height: 1, background: '#1E1E1E', margin: '0.75rem 0' }} />
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: '#1E1E1E',
          textTransform: 'uppercase',
        }}>
          IMAGE
        </div>
      </div>
    </div>
  )
}
