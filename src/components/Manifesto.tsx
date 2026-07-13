import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

// Act 2: a pinned statement read by the scroll. Words start as faint ink on
// the sheet and are inked in one by one as the scrub advances; a horizontal
// measuring rule tracks the reading progress underneath.

type Word = { t: string; flame?: boolean }

const statement: Word[] = [
  { t: 'Design' },
  { t: 'que' },
  { t: 'comunica.' },
  { t: 'Engenharia' },
  { t: 'que' },
  { t: 'aguenta' },
  { t: 'produção.' },
  { t: 'IA' },
  { t: 'aplicada' },
  { t: 'a' },
  { t: 'problemas' },
  { t: 'reais.' },
  { t: 'Do' },
  { t: 'primeiro' },
  { t: 'traço' },
  { t: 'ao' },
  { t: 'deploy,' },
  { t: 'tudo' },
  { t: 'pela' },
  { t: 'mesma', flame: true },
  { t: 'mão.', flame: true },
]

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>('.mf-word', root.current)
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=220%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
            defaults: { ease: 'none' },
          })
          .fromTo(
            words,
            { opacity: 0.13 },
            { opacity: 1, duration: 0.5, stagger: 0.09 },
            0,
          )
          .fromTo('.mf-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.5 + 0.09 * words.length }, 0)
          // breathing room at the end so the last words settle before unpin
          .to({}, { duration: 0.6 })
      })
    },
    { scope: root },
  )

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden px-5 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.22fr_1fr]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft lg:pt-3">
            Como eu trabalho
          </p>
          <div>
            <p className="max-w-[24ch] font-display text-[clamp(1.9rem,4.8vw,4.2rem)] font-bold leading-[1.12] tracking-[-0.02em]">
              {statement.map((w, i) => (
                <span key={i} className="inline-block whitespace-pre">
                  <span
                    className={`mf-word inline-block ${w.flame ? 'text-flame' : ''}`}
                  >
                    {w.t}
                  </span>
                  {i < statement.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
            <span
              className="mf-rule mt-12 block h-px w-full max-w-[36rem] origin-left bg-flame/70"
              style={{ transform: 'scaleX(0)' }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
