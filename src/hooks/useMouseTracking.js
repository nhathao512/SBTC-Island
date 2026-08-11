import { useRef, useEffect } from 'react'

/**
 * Returns a ref { x, y } with normalized mouse position [-1, 1].
 * Uses NO React state — zero re-renders per frame.
 */
export default function useMouseTracking() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    // Touch support
    const onTouch = (e) => {
      const t = e.touches[0]
      if (!t) return
      mouse.current.x = (t.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((t.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return mouse
}
