import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { projects } from '../data/projects'

// Act 3: one project at a time on a pinned stage. Each screenshot holds for a
// beat of reading, then shrinks and sinks into the dark while the next one
// surfaces from depth — the scroll conducts the whole exchange. The mono
// counter and progress line report the position in the sequence.
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
            end: () => '+=' + slides.length * window.innerHeight * 0.85,
            scrub: 1,
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

          // reading dwell
          tl.to({}, { duration: 1 })

          if (i < slides.length - 1) {
            const next = slides[i + 1]
            const nextFig = next.querySelector('.sh-fig')
            const nextInfo = next.querySelectorAll('.sh-info > *')

            // out: the sheet swallows the project
            tl.to(
              fig,
              {
                scale: 0.8,
                autoAlpha: 0,
                filter: 'blur(12px)',
                duration: 0.55,
                ease: 'power2.in',
              },
              '>',
            )
              .to(
                info,
                { y: -28, autoAlpha: 0, duration: 0.4, stagger: 0.04 },
                '<',
              )
              .set(slide, { autoAlpha: 0 })
              .set(next, { autoAlpha: 1 })
              // in: the next one surfaces from depth
              .fromTo(
                nextFig,
                { scale: 1.16, autoAlpha: 0, filter: 'blur(12px)' },
                {
                  scale: 1,
                  autoAlpha: 1,
                  filter: 'blur(0px)',
                  duration: 0.55,
                  ease: 'power2.out',
                },
              )
              .fromTo(
                nextInfo,
                { y: 30, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 },
                '<0.15',
              )
          } else {
            // last project holds a little longer before the unpin
            tl.to({}, { duration: 0.4 })
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

        {/* pinned stage: slides swap in place */}
        <div className="sh-stage relative flex-1">
          {projects.map((p) => {
            const href = p.live || p.repo
            return (
              <article
                key={p.slug}
                className="sh-slide flex flex-col items-center justify-center gap-6"
              >
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(10rem,34vw,26rem)] font-extrabold leading-none text-transparent"
                  style={{ WebkitTextStroke: '1px var(--color-line)' }}
                  aria-hidden
                >
                  {p.index}
                </span>

                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="sh-fig group relative block overflow-hidden ring-1 ring-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
                  data-hot
                  aria-label={`Abrir ${p.title}`}
                >
                  <img
                    src={p.shot}
                    alt={`Captura de tela do projeto ${p.title}`}
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {p.live ? 'Ver live ↗' : 'Ver código ↗'}
                  </span>
                </a>

                <div className="sh-info relative z-10 w-full">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-none tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                      {p.category} · {p.year}
                      {p.status ? (
                        <span className="ml-3 text-flame">{p.status}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-flame">
                      {p.role}
                    </p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft max-md:hidden">
                      {p.stack.slice(0, 5).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
