import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, MOTION_OK, useGSAP } from '../lib/gsap'

// Custom scrollbar in the drawing-ruler idiom: tick marks, a cinnabar progress
// line, clickable section stations and a live mono readout of the scroll cota.
// The native scrollbar is hidden in index.css; keyboard/touch scrolling is
// untouched, so this stays presentational (aria-hidden) plus anchor shortcuts.

type Station = { id: string; label: string }

const defaultStations: Station[] = [
  { id: 'top', label: 'Início' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'index', label: 'Projetos' },
  { id: 'about', label: 'Perfil' },
  { id: 'contact', label: 'Contato' },
]

export default function ScrollRail({
  stations = defaultStations,
}: {
  stations?: Station[]
}) {
  const root = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const pct = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(stations[0]?.label ?? '')
  const [marks, setMarks] = useState<Record<string, number>>({})

  useGSAP(
    (context) => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, (ctx) => {
        // Defer creation one tick so every section pin already exists; triggers
        // created after the pins get their start/end adjusted for pin spacing.
        const boot = gsap.delayedCall(0, () =>
          ctx.add(() => {
            const setFill = fill.current
              ? gsap.quickSetter(fill.current, 'scaleY')
              : null
            ScrollTrigger.create({
              start: 0,
              end: 'max',
              onUpdate: (self) => {
                setFill?.(self.progress)
                if (pct.current)
                  pct.current.textContent = String(Math.round(self.progress * 100)).padStart(3, '0')
              },
            })

            const sts = stations.flatMap((s) => {
              const el = document.getElementById(s.id)
              if (!el) return []
              const st = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onToggle: (self) => self.isActive && setCurrent(s.label),
              })
              return [{ id: s.id, st }]
            })

            // station dots proportional to the real (pin-adjusted) positions
            const place = () => {
              const max = ScrollTrigger.maxScroll(window)
              if (!max) return
              const next: Record<string, number> = {}
              sts.forEach(({ id, st }) => {
                next[id] = gsap.utils.clamp(0, 1, st.start / max)
              })
              setMarks(next)
            }
            ScrollTrigger.addEventListener('refresh', place)
            place()
            return () => ScrollTrigger.removeEventListener('refresh', place)
          }),
        )
        return () => boot.kill()
      })
      void context
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-y-0 right-0 z-40 hidden w-9 select-none sm:flex"
    >
      {/* ruler ticks + progress line */}
      <div className="rail-ticks relative mx-auto h-full w-px bg-line" aria-hidden>
        <span
          ref={fill}
          className="absolute inset-x-0 top-0 h-full origin-top bg-flame"
          style={{ transform: 'scaleY(0)', width: '2px', left: '-0.5px' }}
        />
        {stations.map((s) =>
          marks[s.id] !== undefined ? (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={`Ir para ${s.label}`}
              data-hot
              className="group absolute -left-[5.5px] flex h-3 w-3 items-center justify-center"
              style={{ top: `calc(${(marks[s.id] * 100).toFixed(2)}% - 6px)` }}
            >
              <span className="pointer-events-none h-[5px] w-[5px] rotate-45 border border-ink-soft bg-paper transition-colors duration-300 group-hover:border-flame group-hover:bg-flame" />
              <span className="pointer-events-none absolute right-5 whitespace-nowrap bg-paper px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </a>
          ) : null,
        )}
      </div>

      {/* live cota readout */}
      <div
        className="pointer-events-none absolute bottom-5 right-full mr-1 flex flex-col items-end gap-1 pr-1"
        aria-hidden
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft [writing-mode:vertical-rl]">
          {current}
        </span>
        <span className="font-mono text-[0.65rem] tracking-widest text-flame">
          <span ref={pct}>000</span>
        </span>
      </div>
    </div>
  )
}
