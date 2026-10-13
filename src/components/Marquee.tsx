import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

const items = [
  'Web Design',
  'UI/UX',
  'Motion',
  'Front-end',
  'IA aplicada',
  'RAG & Agentes',
  'Back-end & APIs',
  'Design Systems',
]

// Interlude strip driven by the scroll itself: the band only moves while the
// page moves, panning opposite to the reading direction.
export default function Marquee() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.mq-inner',
          { xPercent: 0 },
          {
            xPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root },
  )

  const strip = (
    <div className="flex shrink-0 items-center gap-10 px-5" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            {it}
          </span>
          <span className="text-flame">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <section ref={root} className="rule-t rule-b overflow-hidden py-6">
      <div className="mq-inner flex w-max will-change-transform">
        {strip}
        {strip}
        {strip}
      </div>
    </section>
  )
}
