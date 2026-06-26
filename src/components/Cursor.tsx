import { useEffect, useRef, useState } from 'react'

// Draughtsman crosshair cursor with magnetic dot. Hidden on touch / reduced-motion.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.documentElement.classList.add('has-cursor')
    setActive(true)

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let dx = rx
    let dy = ry
    let raf = 0

    const onMove = (e: MouseEvent) => {
      dx = e.clientX
      dy = e.clientY
      const t = e.target as HTMLElement
      setHot(!!t.closest('a, button, [data-hot]'))
    }
    const loop = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      if (dot.current)
        dot.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!active) return null

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hot ? 56 : 30,
          height: hot ? 56 : 30,
          opacity: hot ? 1 : 0.7,
        }}
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full border"
          style={{ borderColor: hot ? 'var(--color-flame)' : 'var(--color-ink)' }}
        />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[5px] w-[5px] rounded-full"
        style={{ background: 'var(--color-flame)' }}
        aria-hidden
      />
    </>
  )
}
