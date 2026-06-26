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

function Panel({ p }: { p: Project }) {
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
              className="group/shot relative block aspect-[16/10] w-full overflow-hidden bg-paper-2 shadow-[0_36px_70px_-34px_rgba(44,38,32,0.45)] ring-1 ring-ink/10"
              data-hot
            >
              <img
                src={p.shot}
                alt={`Captura de tela do site do projeto ${p.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover/shot:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover/shot:bg-ink/45" />
              <span className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 bg-flame px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-paper opacity-0 transition-all duration-500 ease-out group-hover/shot:translate-y-0 group-hover/shot:opacity-100">
                Ver live ↗
              </span>
            </a>
          ) : (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="group/shot relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-paper-2 p-6 shadow-[0_36px_70px_-34px_rgba(44,38,32,0.45)] ring-1 ring-ink/10"
              data-hot
            >
              <span
                className="self-end font-display text-[8rem] font-extrabold leading-none"
                style={{
                  WebkitTextStroke: '1.5px var(--color-flame)',
                  color: 'transparent',
                }}
              >
                {p.index}
              </span>
              <span className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                {p.status || 'GitHub'}
                <span className="transition-transform group-hover/shot:translate-x-1 group-hover/shot:text-flame">
                  ↗
                </span>
              </span>
            </a>
          )}
          <div className="mt-3 flex justify-between font-mono text-[0.65rem] tracking-wide text-ink-soft">
            <span>{p.live ? host(p.live) : host(p.repo)}</span>
            <span>{p.year}</span>
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
