import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { projects } from '../data/projects'

// Act 3: one project at a time on a pinned stage, split in half: the capture
// on one side, the project brief on the other. Each project holds for a long
// beat of reading, then shrinks and sinks into the dark while the next one
// surfaces from depth — the scroll conducts the whole exchange, unhurried.
export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const slides = gsap.utils.toArray<HTMLElement>('.sh-slide', root.current)
        if (!slides.length) return

        // stage starts with only the first project on the sheet
        slides.forEach((s, i) => gsap.set(s, { autoAlpha: i === 0 ? 1 : 0 }))

        const starts: number[] = []
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            // generous runway: ~1.3 viewport heights of scroll per project
            end: () => '+=' + slides.length * window.innerHeight * 1.3,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const t = tl.time()
              let i = 0
              starts.forEach((s, j) => {
                if (t >= s) i = j
              })
              if (counter.current)
                counter.current.textContent = String(i + 1).padStart(2, '0')
              if (progress.current)
                progress.current.style.transform = `scaleX(${
                  slides.length > 1 ? i / (slides.length - 1) : 1
                })`
            },
          },
          defaults: { ease: 'none' },
        })

        slides.forEach((slide, i) => {
          starts.push(tl.duration())
          const fig = slide.querySelector('.sh-fig')
          const info = slide.querySelectorAll('.sh-info > *')

          // long reading dwell before anything moves
          tl.to({}, { duration: 1.4 })

          if (i < slides.length - 1) {
            const next = slides[i + 1]
            const nextFig = next.querySelector('.sh-fig')
            const nextInfo = next.querySelectorAll('.sh-info > *')

            // out: the sheet swallows the project, slowly
            tl.to(
              fig,
              {
                scale: 0.82,
                autoAlpha: 0,
                filter: 'blur(12px)',
                duration: 1,
                ease: 'power2.in',
              },
              '>',
            )
              .to(
                info,
                { y: -30, autoAlpha: 0, duration: 0.8, stagger: 0.05 },
                '<',
              )
              .set(slide, { autoAlpha: 0 })
              .set(next, { autoAlpha: 1 })
              // in: the next one surfaces from depth, just as unhurried
              .fromTo(
                nextFig,
                { scale: 1.16, autoAlpha: 0, filter: 'blur(12px)' },
                {
                  scale: 1,
                  autoAlpha: 1,
                  filter: 'blur(0px)',
                  duration: 1,
                  ease: 'power2.out',
                },
              )
              .fromTo(
                nextInfo,
                { y: 34, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 },
                '<0.25',
              )
          } else {
            // last project holds before the unpin
            tl.to({}, { duration: 0.6 })
          }
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="index" ref={root} className="relative overflow-hidden">
      <div className="flex min-h-svh flex-col px-5 py-6 sm:px-8">
        {/* instrument row: no title, just position */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 pt-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Projetos <span className="text-flame">/</span> 2026
          </span>
          <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-ink-soft">
            <span>
              <span ref={counter} className="text-flame">
                01
              </span>{' '}
              / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="relative hidden h-px w-36 bg-line sm:block" aria-hidden>
              <span
                ref={progress}
                className="absolute inset-0 origin-left bg-flame"
                style={{ transform: 'scaleX(0)' }}
              />
            </span>
          </div>
        </div>

        {/* pinned stage: slides swap in place, half capture / half brief */}
        <div className="sh-stage relative flex-1">
          {projects.map((p) => {
            const href = p.live || p.repo
            return (
              <article
                key={p.slug}
                className="sh-slide flex items-center justify-center"
              >
                <div className="mx-auto grid w-full max-w-[1400px] items-center gap-x-14 gap-y-7 lg:grid-cols-[1.15fr_0.85fr]">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="sh-fig group relative block overflow-hidden rounded-[10px] ring-1 ring-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
                    data-hot
                    aria-label={`Abrir ${p.title}`}
                  >
                    <img
                      src={p.shot}
                      alt={`Captura de tela do projeto ${p.title}`}
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] max-lg:max-h-[38svh]"
                    />
                    <span className="absolute bottom-3 right-3 rounded-md bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {p.live ? 'Ver live ↗' : 'Ver código ↗'}
                    </span>
                  </a>

                  <div className="sh-info relative">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                      <span className="text-flame">{p.index}</span>
                      <span className="mx-3">·</span>
                      {p.category} · {p.year}
                      {p.status ? (
                        <span className="ml-3 text-flame">{p.status}</span>
                      ) : null}
                    </p>
                    <h3 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,3rem)] font-extrabold leading-[1.02] tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-flame">
                      {p.role}
                    </p>
                    <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft max-md:line-clamp-3">
                      {p.summary}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                      {p.stack.slice(0, 6).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                      <Link
                        to={`/projeto/${p.slug}`}
                        className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                        data-hot
                      >
                        Estudo de caso →
                      </Link>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                          data-hot
                        >
                          {p.live ? 'Visitar ↗' : 'GitHub ↗'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
