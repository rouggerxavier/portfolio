import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, MOTION_OK } from './gsap'

const REACH = 10 // px at the screen edge, for data-depth="1"

// Layers marked data-depth drift against the cursor, each by its own amount. Uses the
// `translate` property so it stays out of the way of the GSAP transforms on the same nodes.
export function useCursorDepth() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!window.matchMedia(`(hover: hover) and (pointer: fine) and ${MOTION_OK}`).matches) return
    const layers = [...document.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => ({ el, depth: Number(el.dataset.depth) }))
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    const onMove = (e: PointerEvent) => {
      targetX = (1 - (2 * e.clientX) / window.innerWidth) * REACH
      targetY = (1 - (2 * e.clientY) / window.innerHeight) * REACH
    }
    const tick = () => {
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < 0.02) return
      const ease = 1 - Math.pow(0.93, gsap.ticker.deltaRatio())
      x += (targetX - x) * ease
      y += (targetY - y) * ease
      for (const { el, depth } of layers) el.style.translate = `${(x * depth).toFixed(2)}px ${(y * depth).toFixed(2)}px`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    gsap.ticker.add(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [pathname])
}
