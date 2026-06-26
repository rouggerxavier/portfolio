import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

// deterministic blueprint motif per project
function Motif({ seed }: { seed: number }) {
  const lines = Array.from({ length: 7 }, (_, i) => {
    const a = ((seed * 37 + i * 53) % 100) / 100
    const b = ((seed * 19 + i * 71) % 100) / 100
    return { x1: a * 100, y1: i * 16 + 4, x2: 100 - b * 100, y2: i * 16 + 12 }
  })
  return (
    <svg viewBox="0 0 100 116" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="98" height="114" fill="none" stroke="var(--color-line)" />
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={i % 3 === 0 ? 'var(--color-flame)' : 'var(--color-ink)'}
          strokeWidth={i % 3 === 0 ? 1.4 : 0.6}
          strokeOpacity={i % 3 === 0 ? 0.9 : 0.4}
        />
      ))}
      <circle cx="50" cy="58" r={14 + (seed % 5) * 3} fill="none" stroke="var(--color-flame)" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  )
}

export default function Projects() {
  const root = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.idx-head > *', {
        scrollTrigger: { trigger: '.idx-head', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
      })
      gsap.utils.toArray<HTMLElement>('.idx-row').forEach((row) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 92%' },
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onMove = (e: React.MouseEvent) => {
    if (!preview.current) return
    gsap.to(preview.current, {
      x: e.clientX + 24,
      y: e.clientY - 90,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <section
      id="index"
      ref={root}
      onMouseMove={onMove}
      className="relative px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="idx-head mb-12 flex flex-wrap items-end justify-between gap-4 rule-b pb-6">
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-none tracking-tight">
            Índice de projetos
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            {String(projects.length).padStart(2, '0')} entradas / 2026
          </span>
        </div>

        <ul>
          {projects.map((p) => {
            return (
              <li
                key={p.slug}
                className="idx-row group rule-b"
                onMouseEnter={() => setActive(p)}
                onMouseLeave={() => setActive((cur) => (cur?.slug === p.slug ? null : cur))}
              >
                <a
                  href={p.live || p.repo || '#index'}
                  target={p.live || p.repo ? '_blank' : undefined}
                  rel="noreferrer"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors sm:gap-8 sm:py-7"
                >
                  <span className="font-mono text-sm text-flame">{p.index}</span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-bold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-4xl">
                        {p.title}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                        {p.role}
                      </span>
                    </div>
                    {/* expand-on-hover detail (grid-rows transition, no layout-prop animation) */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-[70ch] pt-3 text-sm leading-relaxed text-ink-soft">
                          {p.summary}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                          {p.stack.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 self-start pt-1">
                    <div className="hidden text-right font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft sm:block">
                      <div>{p.category}</div>
                      <div className="text-flame">
                        {p.live ? 'live ↗' : p.status || (p.repo ? 'github ↗' : '')}
                      </div>
                    </div>
                    <span className="font-display text-xl transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-flame">
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* cursor-following preview */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-44 lg:block"
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.35s ease' }}
        aria-hidden
      >
        {active && (
          <div className="border border-ink bg-paper p-2 shadow-[6px_6px_0_var(--color-ink)]">
            <div className="aspect-[100/116] w-full bg-paper-2">
              <Motif seed={active.index.charCodeAt(1) + active.title.length} />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-wider">
              <span>{active.index}</span>
              <span className="text-flame">{active.category}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
