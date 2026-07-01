import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '../data/projects'
import './FlowingMenu.css'

gsap.registerPlugin(ScrollTrigger)

const ANIM = { duration: 0.6, ease: 'expo' as const }
const REPS = 6

function FlowRow({
  p,
  open,
  onToggle,
}: {
  p: Project
  open: boolean
  onToggle: () => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<gsap.core.Tween | null>(null)
  const href = p.live || p.repo
  const marqueeImg = p.shot || '/images/projects/grankasa.jpg'

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !innerRef.current) return
    const part = innerRef.current.querySelector('.marquee__part') as HTMLElement | null
    const w = part?.offsetWidth || 0
    if (!w) return
    loopRef.current = gsap.to(innerRef.current, {
      x: -w,
      duration: 16,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      loopRef.current?.kill()
    }
  }, [])

  const edge = (e: React.MouseEvent) => {
    const r = itemRef.current!.getBoundingClientRect()
    const y = e.clientY - r.top
    return y < r.height / 2 ? 'top' : 'bottom'
  }

  const onEnter = (e: React.MouseEvent) => {
    if (!marqueeRef.current || !innerRef.current) return
    const ed = edge(e)
    gsap
      .timeline({ defaults: ANIM })
      .set(marqueeRef.current, { y: ed === 'top' ? '-101%' : '101%' }, 0)
      .set(innerRef.current, { y: ed === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, innerRef.current], { y: '0%' }, 0)
  }
  const onLeave = (e: React.MouseEvent) => {
    if (!marqueeRef.current || !innerRef.current) return
    const ed = edge(e)
    gsap
      .timeline({ defaults: ANIM })
      .to(marqueeRef.current, { y: ed === 'top' ? '-101%' : '101%' }, 0)
      .to(innerRef.current, { y: ed === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <li className="rule-t">
      <div className="flow-row" ref={itemRef}>
        <button
          className="flow-link group px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-flame"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={onToggle}
          aria-expanded={open}
          data-hot
        >
          <span className="font-mono text-sm text-flame">{p.index}</span>
          <span className="font-display text-[clamp(1.6rem,4.5vw,3rem)] font-bold leading-none tracking-tight max-md:min-w-0 max-md:text-[clamp(1.5rem,5.6vw,2rem)] max-md:leading-[1.05] max-md:[overflow-wrap:anywhere]">
            {p.title}
          </span>
          <span className="ml-auto hidden font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft sm:block">
            {p.category}
          </span>
          <span
            className="font-display text-2xl text-ink-soft transition-transform duration-500 ease-out"
            style={{ transform: open ? 'rotate(45deg)' : 'none' }}
            aria-hidden
          >
            +
          </span>
        </button>

        <div className="marquee" ref={marqueeRef}>
          <div className="marquee__inner-wrap">
            <div className="marquee__inner" ref={innerRef} aria-hidden>
              {Array.from({ length: REPS }).map((_, i) => (
                <div className="marquee__part" key={i}>
                  <span>{p.title}</span>
                  <div
                    className="marquee__img"
                    style={{ backgroundImage: `url(${marqueeImg})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* expand-down panel: summary + preview */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 px-1 pb-12 pt-2 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-flame">
                {p.role}
              </p>
              <p className="mt-4 max-w-[56ch] leading-relaxed text-ink-soft max-md:text-ink">
                {p.summary}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  data-hot
                >
                  {p.live ? 'Ver live' : 'Ver no GitHub'} ↗
                </a>
              )}
            </div>

            {p.shot ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group/sh relative block overflow-hidden ring-1 ring-ink/10"
                data-hot
              >
                <img
                  src={p.shot}
                  alt={`Captura de tela do site do projeto ${p.title}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/sh:scale-[1.04]"
                />
              </a>
            ) : (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="flex aspect-[16/10] w-full items-end justify-between bg-paper-2 p-6 ring-1 ring-ink/10"
                data-hot
              >
                <span
                  className="font-display text-[7rem] font-extrabold leading-none"
                  style={{ WebkitTextStroke: '1.5px var(--color-flame)', color: 'transparent' }}
                >
                  {p.index}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                  {p.status || 'GitHub'} ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.idx-head > *', {
        scrollTrigger: { trigger: '.idx-head', start: 'top 85%' },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
      })
      gsap.utils.toArray<HTMLElement>('.rule-t').forEach((row) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 92%' },
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="index" ref={root} className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="idx-head mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-none tracking-tight">
            Índice de projetos
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            {String(projects.length).padStart(2, '0')} entradas / 2026
          </span>
        </div>

        <ul>
          {projects.map((p) => (
            <FlowRow
              key={p.slug}
              p={p}
              open={open === p.slug}
              onToggle={() => setOpen((cur) => (cur === p.slug ? null : p.slug))}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
