import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import Magnetic from './Magnetic'
import { projects } from '../data/projects'

// Act 3: the project index as a pinned horizontal sheet. Vertical scroll pans
// the track sideways (containerAnimation), each screenshot parallaxes inside
// its frame and the mono counter + progress line report the position.
export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const el = track.current!
        const dist = () => el.scrollWidth - window.innerWidth

        const pan = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + dist(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = 1 + Math.round(self.progress * (projects.length - 1))
              if (counter.current)
                counter.current.textContent = String(i).padStart(2, '0')
              if (progress.current)
                progress.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })

        // screenshots drift inside their masks while the track pans
        gsap.utils.toArray<HTMLElement>('.pj-shot img', root.current).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: {
                containerAnimation: pan,
                trigger: img.closest('.pj-panel') as HTMLElement,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        // giant index numerals lag behind their panels for depth
        gsap.utils.toArray<HTMLElement>('.pj-num', root.current).forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 24 },
            {
              xPercent: -24,
              ease: 'none',
              scrollTrigger: {
                containerAnimation: pan,
                trigger: num.closest('.pj-panel') as HTMLElement,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

      })
    },
    { scope: root },
  )

  return (
    <section id="index" ref={root} className="pj relative overflow-hidden">
      <div className="flex min-h-svh flex-col justify-center py-6">
        {/* sheet header, fixed while the track pans */}
        <div className="mx-auto mb-6 flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-extrabold leading-none tracking-tight">
            Índice de projetos
          </h2>
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

        {/* horizontal track */}
        <div ref={track} className="pj-track flex w-max items-stretch will-change-transform">
          {projects.map((p) => {
            const href = p.live || p.repo
            return (
              <article key={p.slug} className="pj-panel relative flex items-center">
                <span
                  className="pj-num pointer-events-none absolute -top-[0.1em] right-[2%] select-none font-display text-[clamp(7rem,22vw,17rem)] font-extrabold leading-none text-transparent"
                  style={{ WebkitTextStroke: '1.5px var(--color-line)' }}
                  aria-hidden
                >
                  {p.index}
                </span>

                <div className="pj-body relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="pj-shot group relative block overflow-hidden ring-1 ring-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
                    data-hot
                    aria-label={`Abrir ${p.title}`}
                  >
                    <img
                      src={p.shot}
                      alt={`Captura de tela do projeto ${p.title}`}
                      decoding="async"
                      className="aspect-[16/10] w-[112%] max-w-none object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 right-3 bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {p.live ? 'Ver live ↗' : 'Ver código ↗'}
                    </span>
                  </a>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                      {p.category} · {p.year}
                      {p.status ? (
                        <span className="ml-3 text-flame">{p.status}</span>
                      ) : null}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,3.1rem)] font-extrabold leading-[1.02] tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-flame">
                      {p.role}
                    </p>
                    <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft max-lg:hidden">
                      {p.summary}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    {href && (
                      <Magnetic strength={0.35}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                          data-hot
                        >
                          {p.live ? 'Visitar projeto' : 'Ver no GitHub'} ↗
                        </a>
                      </Magnetic>
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
