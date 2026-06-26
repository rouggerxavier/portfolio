import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const INTRO_DONE = 'intro:done'

export default function Intro() {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('introSeen')

    const finish = () => {
      document.body.classList.remove('intro-lock')
      window.dispatchEvent(new Event(INTRO_DONE))
      sessionStorage.setItem('introSeen', '1')
    }

    if (seen || reduce) {
      if (root.current) root.current.style.display = 'none'
      finish()
      return
    }

    document.body.classList.add('intro-lock')
    const counter = { v: 0 }

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        if (root.current) root.current.style.display = 'none'
        finish()
      },
    })

    tl.from('.intro-meta', { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 })
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (num.current)
              num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`
          },
        },
        '-=0.2',
      )
      .to('.intro-mark', { opacity: 1, duration: 0.4 }, '-=0.6')
      .to('.intro-fade', { opacity: 0, duration: 0.5 }, '+=0.25')
      .to(
        root.current,
        { yPercent: -100, duration: 1, ease: 'expo.inOut' },
        '-=0.1',
      )

    return () => {
      tl.kill()
      document.body.classList.remove('intro-lock')
    }
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-paper px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="intro-fade flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
        <span className="intro-meta">Rougger Xavier</span>
        <span className="intro-meta">Portfólio / Rev. 2026.0</span>
      </div>

      <div className="intro-fade flex items-end justify-between">
        <span
          className="intro-mark font-display text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tight opacity-0"
        >
          RX<span className="text-flame">/</span>
        </span>
        <span
          ref={num}
          className="font-mono text-[clamp(2.5rem,9vw,7rem)] font-medium leading-none text-ink"
        >
          000
        </span>
      </div>

      <div className="intro-fade">
        <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
          <span className="intro-meta">Carregando experiência</span>
          <span className="intro-meta">three.js · gsap · lenis</span>
        </div>
        <div className="h-px w-full bg-line">
          <span
            ref={bar}
            className="block h-full origin-left scale-x-0 bg-flame"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  )
}
