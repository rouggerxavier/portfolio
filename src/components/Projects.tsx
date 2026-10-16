import { Link } from 'react-router-dom'
import { TbArrowRight, TbArrowUpRight } from 'react-icons/tb'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import { projects } from '../data/projects'

// Act 3: the work as a pile of large sheets. Each project is a card that takes
// most of the viewport, its capture bleeding to the card's edges under the
// brief; scrolling slides the next sheet up over it while the last one sinks
// back, smaller and darker, so the stack keeps a visible history of the run.
const total = String(projects.length).padStart(2, '0')

export default function Projects() {
  return (
    <section id="index" className="relative pt-24">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.035em]">
          Projetos
        </h2>
        <p className="pb-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {total} entradas · Web, IA e dados
        </p>
      </div>

      <ScrollStack
        useWindowScroll
        smoothScroll={false}
        className="projects-stack mt-12"
        stackPosition="8%"
        itemDistance={80}
        itemStackDistance={0}
        itemScale={0.04}
        baseScale={0.86}
        dimAmount={0.45}
        holdDistance={120}
      >
        {projects.map((p) => {
          const href = p.live || p.repo
          return (
            <ScrollStackItem key={p.slug}>
              <article className="relative h-full w-full">
                <img
                  src={p.shot}
                  alt={p.shotAlt ?? `Captura de tela do projeto ${p.title}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.07_0.002_60/0.92)_0%,oklch(0.07_0.002_60/0.6)_26%,transparent_52%),linear-gradient(to_bottom,oklch(0.07_0.002_60/0.6)_0%,transparent_16%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_100%,oklch(0.66_0.215_40/0.16),transparent_70%)]"
                />

                <header className="absolute inset-x-5 top-5 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] sm:inset-x-9 sm:top-7">
                  <span className="flex items-center gap-6">
                    <span>
                      <span className="text-flame">{p.index}</span>
                      <span className="text-ink-soft"> / {total}</span>
                    </span>
                    <span className="text-ink-soft max-sm:hidden">{p.category}</span>
                  </span>
                  <span className="flex items-center gap-6 text-ink-soft">
                    <span className="max-sm:hidden">{p.year}</span>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 text-ink transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                        data-hot
                      >
                        {new URL(href).host.replace(/^www\./, '')}
                        <TbArrowUpRight className="text-flame" aria-hidden />
                      </a>
                    )}
                  </span>
                </header>

                <div className="absolute inset-x-5 bottom-6 grid items-end gap-x-10 gap-y-5 sm:inset-x-9 sm:bottom-9 lg:grid-cols-[1.6fr_1fr]">
                  <h3 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.88] tracking-[-0.04em] [text-wrap:balance]">
                    {p.title}
                    <span className="text-flame">.</span>
                  </h3>
                  <div className="flex flex-col gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-flame">{p.role}</p>
                    <p className="max-w-[52ch] leading-relaxed text-ink/80 line-clamp-3 lg:line-clamp-4">
                      {p.summary}
                    </p>
                    <ul className="flex flex-wrap gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft max-sm:hidden">
                      {p.stack.slice(0, 5).map((s) => (
                        <li key={s} className="border border-line px-2.5 py-1.5">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/projeto/${p.slug}`}
                      className="mt-1 inline-flex min-h-[48px] w-fit items-center gap-3 bg-ink px-6 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                      data-hot
                    >
                      Ver projeto <TbArrowRight aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollStackItem>
          )
        })}
      </ScrollStack>
    </section>
  )
}
