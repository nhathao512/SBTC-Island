import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { serverConfig } from '../../data/server.js'
import { Download, Monitor, Key, ShieldCheck, HelpCircle } from 'lucide-react'

export default function LauncherDownload() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRef    = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(cardRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const shortcuts = [
    { key: 'F6', desc: 'Bật / Tắt hiển thị HUD thông số' },
    { key: 'F7', desc: 'Mở bảng nhiệm vụ Prime & phần thưởng' },
    { key: 'F8', desc: 'Mở Dashboard người chơi & BXH' },
    { key: 'F9', desc: 'Bật / Tắt Minimap trực tiếp trong game' },
    { key: 'Ctrl + / -', desc: 'Thu phóng kích thước Minimap' },
    { key: 'Ctrl + 0', desc: 'Đặt lại tỉ lệ Minimap mặc định' },
  ]

  return (
    <section
      id="launcher"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-bg)', position: 'relative' }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '3.5rem' }}>
          <div className="text-label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={14} />
            CÔNG CỤ HỖ TRỢ CHƠI GAME
          </div>
          <h2 className="text-section-title">
            SBTC ISLAND<br />
            <span style={{ color: 'var(--color-accent)' }}>LAUNCHER</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem', color: 'var(--color-muted)',
            lineHeight: 1.8, maxWidth: '55ch', marginTop: '1.25rem',
          }}>
            Tải Launcher chính thức của server để tự động kết nối nhanh, đồng bộ Minimap real-time, phím tắt hỗ trợ và nhận các bản cập nhật mới nhất.
          </p>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          style={{
            border: '1px solid #1e1e1e',
            background: 'var(--color-surface)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative',
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #FF2D78, transparent)',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: Download Action */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                border: '1px solid rgba(255,45,120,0.3)',
                background: 'rgba(255,45,120,0.06)',
                marginBottom: '1.5rem',
              }}>
                <ShieldCheck size={14} color="var(--color-accent)" />
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.7rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                }}>
                  PHIÊN BẢN CHÍNH THỨC · WINDOWS 64-BIT
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: '2rem',
                textTransform: 'uppercase', color: '#f5f5f5',
                marginBottom: '1rem',
              }}>
                TẢI VỀ CÀI ĐẶT
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.88rem', color: 'var(--color-muted)',
                lineHeight: 1.7, marginBottom: '2rem',
              }}>
                Tương thích hoàn toàn với Windows 10 & Windows 11. Hỗ trợ tự động kết nối vào server SBTC ISLAND không cần nhập IP thủ công.
              </p>

              {/* Download Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <a
                  href="https://drive.google.com/drive/folders/1gJuFWH28fXH2e8UF32q-z9e2eE2ZCOn0?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cursor="button"
                  id="btn-download-launcher"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2.5rem',
                    fontSize: '1rem',
                  }}
                >
                  <Download size={18} strokeWidth={2.5} />
                  Tải Launcher v1.4 (.exe)
                </a>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.75rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#666',
                }}>
                  <span>HĐH: Windows 10 / 11</span>
                  <span>·</span>
                  <span>Dung lượng: ~116 MB</span>
                  <span>·</span>
                  <span>Định dạng: Setup .EXE</span>
                  <span>·</span>
                  <span>Bảo mật: An toàn</span>
                </div>
              </div>

              {/* Note / Support */}
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                border: '1px solid #1a1a1a',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              }}>
                <HelpCircle size={16} color="var(--color-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0,
                }}>
                  Nếu trình duyệt hoặc Windows Defender cảnh báo file mới, vui lòng chọn <strong style={{ color: '#f5f5f5' }}>Keep / Run anyway</strong> hoặc liên hệ Discord hỗ trợ.
                </p>
              </div>
            </div>

            {/* Right: Keybindings & In-game HUD Guide */}
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.8rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--color-accent)', marginBottom: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Key size={14} />
                PHÍM TẮT TRONG GAME VỚI LAUNCHER
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {shortcuts.map(sc => (
                  <div
                    key={sc.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      border: '1px solid #1a1a1a',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--color-accent)',
                      background: 'rgba(255,45,120,0.1)',
                      border: '1px solid rgba(255,45,120,0.25)',
                      padding: '0.2rem 0.6rem',
                    }}>
                      {sc.key}
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      color: 'var(--color-muted)',
                      textAlign: 'right',
                    }}>
                      {sc.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
