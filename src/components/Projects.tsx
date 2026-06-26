import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

function host(url?: string) {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function Motif({ seed }: { seed: number }) {
  const lines = Array.from({ length: 8 }, (_, i) => {
    const a = ((seed * 37 + i * 53) % 100) / 100
    const b = ((seed * 19 + i * 71) % 100) / 100
    return { x1: a * 100, y1: i * 14 + 4, x2: 100 - b * 100, y2: i * 14 + 10 }
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
      <circle cx="50" cy="58" r={12 + (seed % 5) * 4} fill="none" stroke="var(--color-flame)" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  )
}

function Panel({ p }: { p: Project }) {
  const seed = p.index.charCodeAt(1) + p.title.length
  const href = p.live || p.repo
  return (
    <article className="panel relative flex w-full shrink-0 items-center px-5 sm:px-8 lg:h-screen lg:w-[88vw] lg:max-w-[900px]">
      <span className="pointer-events-none absolute right-4 top-24 select-none font-display text-[28vw] font-extrabold leading-none text-ink opacity-[0.04] lg:top-1/2 lg:-translate-y-1/2 lg:text-[20rem]">
        {p.index}
      </span>

      <div className="relative grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            <span className="text-flame">{p.index}</span>
            <span>{p.category}</span>
            <span>·</span>
            <span>{p.year}</span>
          </div>
          <h3 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.92] tracking-tight">
            {p.title}
          </h3>
          <p className="mt-2 font-mono text-sm uppercase tracking-wider text-flame">
            {p.role}
          </p>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft">
            {p.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-6">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame"
                data-hot
              >
                {p.live ? 'Ver live' : 'Ver no GitHub'} ↗
              </a>
            ) : (
              <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                {p.status}
              </span>
            )}
          </div>
        </div>

        <div className="relative hidden lg:block">
          {p.shot ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group/shot relative block border border-line bg-paper/70"
              data-hot
            >
              {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map(
                (pos) => (
                  <span
                    key={pos}
                    className={`absolute z-10 ${pos} h-2.5 w-2.5 border border-flame`}
                    style={{ margin: -1 }}
                  />
                ),
              )}
              <div className="rule-b flex items-center gap-2 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">
                <span className="h-2 w-2 rounded-full bg-flame" />
                <span className="truncate">{host(p.live)}</span>
                <span className="ml-auto transition-transform group-hover/shot:translate-x-0.5">
                  live ↗
                </span>
              </div>
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.shot}
                  alt={`Captura de tela do site do projeto ${p.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.03]"
                />
              </div>
            </a>
          ) : (
            <div className="relative border border-line p-3">
              {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map(
                (pos) => (
                  <span
                    key={pos}
                    className={`absolute ${pos} h-2.5 w-2.5 border border-flame`}
                    style={{ margin: -1 }}
                  />
                ),
              )}
              <div className="aspect-[100/116] w-full bg-paper/50">
                <Motif seed={seed} />
              </div>
            </div>
          )}
          <div className="mt-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">
            <span>fig. {p.index}</span>
            <span>{p.shot ? `screenshot · ${p.year}` : p.status || 'github ↗'}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // desktop: horizontal pinned scrub
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!
      const getAmount = () => el.scrollWidth - window.innerWidth
      const tween = gsap.to(el, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + getAmount(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.from('.panel', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: section.current, start: 'top 80%' },
      })
      return () => tween.kill()
    })

    // mobile / reduced: vertical reveals
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel')
      panels.forEach((pnl) =>
        gsap.from(pnl, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: pnl, start: 'top 85%' },
        }),
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="index"
      ref={section}
      className="relative py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div
        ref={track}
        className="flex flex-col gap-20 lg:h-screen lg:flex-row lg:gap-0"
      >
        {/* intro panel */}
        <div className="flex w-full shrink-0 flex-col justify-center px-5 sm:px-8 lg:h-screen lg:w-[60vw] lg:max-w-[640px]">
          <span className="font-mono text-xs uppercase tracking-widest text-flame">
            Índice
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-tight">
            Projetos<span className="text-flame">.</span>
          </h2>
          <p className="mt-6 max-w-[42ch] leading-relaxed text-ink-soft">
            Produtos reais com IA aplicada, do backend à interface. Role para
            percorrer o índice.
          </p>
          <div className="mt-8 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink-soft">
            <span>{String(projects.length).padStart(2, '0')} entradas</span>
            <span className="hidden h-px w-16 bg-line lg:block" />
            <span className="hidden lg:inline">role →</span>
          </div>
        </div>

        {projects.map((p) => (
          <Panel key={p.slug} p={p} />
        ))}
      </div>
    </section>
  )
}
