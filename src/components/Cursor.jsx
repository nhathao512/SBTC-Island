import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    // Only enable on devices with hover (desktop)
    if (!window.matchMedia('(hover: hover)').matches) return
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    dot.style.opacity = '1'
    ring.style.opacity = '1'

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })
    const xLabel = gsap.quickTo(label, 'x', { duration: 0.2, ease: 'power3.out' })
    const yLabel = gsap.quickTo(label, 'y', { duration: 0.2, ease: 'power3.out' })

    const onMove = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      xLabel(e.clientX)
      yLabel(e.clientY + 30)
    }

    const setLabel = (text, expanded = false) => {
      label.textContent = text
      gsap.to(label, { opacity: text ? 1 : 0, duration: 0.2 })
      ring.classList.toggle('expanded', expanded)
    }

    const onEnterButton = () => setLabel('→', true)
    const onEnterImage = () => setLabel('VIEW', true)
    const onEnterTrex = () => setLabel('LOOK', true)
    const onLeave = () => setLabel('', false)

    window.addEventListener('mousemove', onMove, { passive: true })

    const observe = () => {
      document.querySelectorAll('a, button, .btn-primary, .btn-outline, [data-cursor="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterButton)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('.gallery-item, [data-cursor="image"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterImage)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('[data-cursor="trex"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterTrex)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    observe()
    // Re-observe after a brief delay for dynamically rendered elements
    const t = setTimeout(observe, 1000)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
      <div ref={labelRef} className="cursor-label" style={{ opacity: 0 }} />
    </>
  )
}
