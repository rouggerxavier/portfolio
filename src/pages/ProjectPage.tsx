import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, getProject } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const p = getProject(slug)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!p) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('.pd-reveal', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'expo.out',
        })
      }
      gsap.utils.toArray<HTMLElement>('.pd-fig').forEach((fig) => {
        gsap.from(fig, {
          scrollTrigger: { trigger: fig, start: 'top 88%' },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [p, slug])

  if (!p) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-start justify-center px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-widest text-flame">
          404
        </span>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-extrabold leading-none tracking-tight">
          Projeto não encontrado
        </h1>
        <Link
          to="/#index"
          className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame"
          data-hot
        >
          ← Voltar ao índice
        </Link>
      </main>
    )
  }

  const idx = projects.findIndex((x) => x.slug === p.slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const href = p.live || p.repo

  return (
    <main ref={root} className="px-5 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[1400px]">
        {/* breadcrumb / title block header */}
        <div className="pd-reveal flex items-center justify-between rule-b pb-5 font-mono text-xs uppercase tracking-wider text-ink-soft">
          <Link to="/#index" className="transition-colors hover:text-flame" data-hot>
            ← Índice
          </Link>
          <span>
            <span className="text-flame">{p.index}</span> / {p.category}
          </span>
        </div>

        {/* hero */}
        <header className="grid gap-8 pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="pd-reveal font-mono text-xs uppercase tracking-widest text-flame">
              {p.role}
            </p>
            <h1 className="pd-reveal mt-4 font-display text-[clamp(2.4rem,8vw,6rem)] font-extrabold leading-[0.92] tracking-tight">
              {p.title}
            </h1>
            {p.tagline && (
              <p className="pd-reveal mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
                {p.tagline}
              </p>
            )}
          </div>

          <div className="pd-reveal flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-end">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame"
                data-hot
              >
                Ver live ↗
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-flame hover:text-flame"
                data-hot
              >
                {p.status === 'open source' ? 'Open source ↗' : 'GitHub ↗'}
              </a>
            )}
          </div>
        </header>

        {/* meta title block */}
        <dl className="pd-reveal mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-mono text-xs uppercase tracking-wider sm:grid-cols-4">
          {[
            ['Categoria', p.category],
            ['Ano', p.year],
            ['Papel', p.role],
            ['Estado', p.status || (p.live ? 'Em produção' : 'Repositório')],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-4">
              <dt className="text-ink-soft">{k}</dt>
              <dd className="mt-1 normal-case text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {/* overview + highlights */}
        <div className="mt-16 grid gap-x-16 gap-y-12 rule-t pt-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="pd-reveal">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-flame">
              Visão geral
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              {(p.overview ?? [p.summary]).map((para, i) => (
                <p key={i} className="max-w-[64ch]">
                  {para}
                </p>
              ))}
            </div>

            <h3 className="mb-4 mt-10 font-mono text-xs uppercase tracking-widest text-ink-soft">
              Stack
            </h3>
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="border border-line px-3 py-1.5 font-mono text-xs transition-colors hover:border-flame hover:text-flame"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {p.highlights && (
            <div className="pd-reveal">
              <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-flame">
                Destaques
              </h2>
              <ol className="divide-y divide-line border-y border-line">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 py-4">
                    <span className="font-mono text-sm text-flame">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-ink">{h}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* gallery */}
        {p.gallery && p.gallery.length > 0 ? (
          <section className="mt-20 rule-t pt-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold leading-none tracking-tight">
                Telas
              </h2>
              <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                {String(p.gallery.length).padStart(2, '0')} capturas / desktop
              </span>
            </div>

            <div className="space-y-10">
              {p.gallery.map((src, i) => (
                <figure key={src} className="pd-fig">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/sh block overflow-hidden ring-1 ring-line"
                    data-hot
                  >
                    <img
                      src={src}
                      alt={`${p.title} — captura ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover/sh:scale-[1.015]"
                    />
                  </a>
                  <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                    Fig. {String(i + 1).padStart(2, '0')} — {p.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-20 rule-t pt-14">
            <div className="flex flex-col items-start gap-4 border border-line bg-paper-2 p-10">
              <span className="font-mono text-xs uppercase tracking-widest text-flame">
                Sem demo live
              </span>
              <p className="max-w-[56ch] leading-relaxed text-ink-soft">
                Este é um projeto de backend/API — o valor está no código, nos
                guardrails e no pipeline de avaliação, não numa tela pública.
                Explore o repositório para ver a arquitetura por dentro.
              </p>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame"
                  data-hot
                >
                  Ver no GitHub ↗
                </a>
              )}
            </div>
          </section>
        )}

        {/* prev / next */}
        <nav className="mt-24 grid grid-cols-2 gap-px overflow-hidden rule-t border-x border-b border-line bg-line">
          <Link
            to={`/projeto/${prev.slug}`}
            className="group bg-paper p-6 transition-colors hover:bg-paper-2 sm:p-8"
            data-hot
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft">
              ← Anterior
            </span>
            <span className="mt-2 block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-flame sm:text-2xl">
              {prev.title}
            </span>
          </Link>
          <Link
            to={`/projeto/${next.slug}`}
            className="group bg-paper p-6 text-right transition-colors hover:bg-paper-2 sm:p-8"
            data-hot
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft">
              Próximo →
            </span>
            <span className="mt-2 block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-flame sm:text-2xl">
              {next.title}
            </span>
          </Link>
        </nav>

        <div className="py-16 text-center">
          <Link
            to="/#index"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-soft underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame"
            data-hot
          >
            ← Todos os projetos
          </Link>
        </div>
      </div>
    </main>
  )
}
