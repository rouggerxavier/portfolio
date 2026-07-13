import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gsap, SplitText, MOTION_OK, useGSAP } from '../lib/gsap'
import ScrollRail from '../components/ScrollRail'
import Magnetic from '../components/Magnetic'
import { projects, profile, type Project as ProjectData } from '../data/projects'

// Case-study endpoint (/projeto/:slug), scroll-driven end to end: pinned hero
// with parallax plate, the problem statement pulled out of the dark char by
// char, a spec sheet that reveals row by row, a gallery of project records
// (placeholders until real captures land in /images/projects/<slug>/gN.jpg)
// and a handoff to the next project.

const galleryCaptions = [
  { caption: 'Visão geral', wide: true },
  { caption: 'Fluxo principal' },
  { caption: 'Detalhe de interface' },
  { caption: 'Experiência mobile', wide: true },
  { caption: 'Bastidores da construção' },
]

function GalleryFigure({
  slug,
  n,
  caption,
  wide,
}: {
  slug: string
  n: number
  caption: string
  wide?: boolean
}) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className={`pd-g m-0 ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="relative overflow-hidden rounded-[10px] ring-1 ring-ink/10">
        {missing ? (
          <div
            className={`ph relative flex w-full items-center justify-center ${
              wide ? 'aspect-[21/9]' : 'aspect-[4/3]'
            }`}
          >
            <span className="relative z-10 bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
              Registro {String(n).padStart(2, '0')} · em breve
            </span>
          </div>
        ) : (
          <img
            src={`/images/projects/${slug}/g${n}.jpg`}
            alt={`${caption} do projeto`}
            decoding="async"
            onError={() => setMissing(true)}
            className={`w-full object-cover ${wide ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}
          />
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
        <span>{caption}</span>
        <span className="text-flame">{String(n).padStart(2, '0')}</span>
      </figcaption>
    </figure>
  )
}

function ProjectView({ p }: { p: ProjectData }) {
  const root = useRef<HTMLDivElement>(null)
  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]
  const href = p.live || p.repo

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // entrance: the sheet assembles
        const title = new SplitText('.pd-title', { type: 'chars' })
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.pd-meta', { y: 14, autoAlpha: 0, duration: 0.6 }, 0.1)
          .from(
            title.chars,
            { yPercent: 120, duration: 0.9, stagger: 0.02 },
            0.2,
          )
          .from('.pd-role', { y: 16, autoAlpha: 0, duration: 0.6 }, 0.55)
          .from('.pd-hero-fig', { y: 70, autoAlpha: 0, duration: 1.1 }, 0.5)

        // hero scrub: the plate slides under the header, image breathes
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.pd-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
            defaults: { ease: 'none' },
          })
          .to('.pd-title', { xPercent: -5, autoAlpha: 0.3 }, 0)
          .to('.pd-meta, .pd-role', { y: -26, autoAlpha: 0 }, 0)
          .to('.pd-hero-img', { yPercent: 12, scale: 1.06 }, 0)

        // the problem, pulled out of the dark char by char
        const problem = new SplitText('.pd-problem', { type: 'chars' })
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.pd-problem-sec',
              start: 'top top',
              end: '+=170%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
            defaults: { ease: 'none' },
          })
          .fromTo(
            problem.chars,
            { autoAlpha: 0, filter: 'blur(12px)', yPercent: 14, scale: 1.05 },
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              yPercent: 0,
              scale: 1,
              duration: 1.5,
              stagger: 0.08,
            },
            0,
          )
          .to({}, { duration: 1 })

        // spec sheet rows
        gsap.utils.toArray<HTMLElement>('.pd-row', root.current).forEach((row) => {
          gsap.from(row, {
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 36,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'expo.out',
          })
        })

        // metric count-up, when the project has one
        const metricEl = root.current?.querySelector<HTMLElement>('.pd-metric')
        if (metricEl) {
          const digits = Number(metricEl.dataset.value?.replace(/\D/g, '') || 0)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: digits,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metricEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: () => {
              metricEl.textContent = Math.round(obj.v).toLocaleString('pt-BR')
            },
          })
        }

        // gallery: each record uncovers and settles as it crosses the viewport
        gsap.utils.toArray<HTMLElement>('.pd-g', root.current).forEach((fig) => {
          gsap.fromTo(
            fig,
            { clipPath: 'inset(12% 7% 12% 7%)', y: 46, autoAlpha: 0.4 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: fig,
                start: 'top 96%',
                end: 'top 45%',
                scrub: 0.6,
              },
            },
          )
        })

        // handoff: the next title climbs out as the page ends
        const nextTitle = new SplitText('.pd-next-title', { type: 'chars' })
        gsap.from(nextTitle.chars, {
          scrollTrigger: {
            trigger: '.pd-next',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 0.8,
          },
          yPercent: 120,
          stagger: 0.03,
          ease: 'none',
        })

        return () => {
          title.revert()
          problem.revert()
          nextTitle.revert()
        }
      })
    },
    { scope: root, dependencies: [p.slug] },
  )

  return (
    <div ref={root}>
      {/* case-study chrome: back to the index, straight to contact */}
      <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 py-4 backdrop-blur-sm rule-b">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="font-display text-2xl font-extrabold tracking-tight"
            data-hot
          >
            RX<span className="text-flame">/</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/#index"
              className="font-mono text-[0.8rem] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
              data-hot
            >
              ← Projetos
            </Link>
            <Link
              to="/#contact"
              className="font-mono text-xs uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-4 transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
              data-hot
            >
              Contato
            </Link>
          </div>
        </nav>
      </header>

      <ScrollRail stations={[]} />

      <main>
        {/* hero: title plate + parallax capture */}
        <section className="pd-hero relative overflow-hidden px-5 pt-32 sm:px-8">
          <div className="mx-auto max-w-[1400px]">
            <p className="pd-meta flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              <span className="text-flame">{p.index}</span>
              <span>{p.category}</span>
              <span>{p.year}</span>
              {p.status ? <span className="text-flame">{p.status}</span> : null}
            </p>
            <h1 className="pd-title mt-5 font-display text-[clamp(2.6rem,8vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              {p.title}
            </h1>
            <p className="pd-role mt-5 max-w-[52ch] font-mono text-sm uppercase tracking-wider text-flame">
              {p.role}
            </p>

            <div className="pd-hero-fig relative mt-12 overflow-hidden rounded-[10px] ring-1 ring-ink/10">
              <img
                src={p.shot}
                alt={`Captura de tela do projeto ${p.title}`}
                decoding="async"
                className="pd-hero-img aspect-[16/10] w-full object-cover object-top sm:aspect-[16/8]"
              />
            </div>
          </div>
        </section>

        {/* the problem, out of the dark */}
        <section className="pd-problem-sec relative flex min-h-svh items-center overflow-hidden px-5 sm:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.22fr_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft lg:pt-3">
                O problema
              </p>
              <p className="pd-problem max-w-[30ch] font-display text-[clamp(1.7rem,4.2vw,3.6rem)] font-bold leading-[1.14] tracking-[-0.02em]">
                {p.problem}
              </p>
            </div>
          </div>
        </section>

        {/* spec sheet */}
        <section className="relative px-5 pb-28 sm:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="pd-row rule-t pt-12">
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[0.22fr_1fr]">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                  A resposta
                </h2>
                <p className="max-w-[62ch] text-lg leading-relaxed text-ink">
                  {p.summary}
                </p>
              </div>
            </div>

            <div className="pd-row mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-3">
              {[
                ['Responsabilidade', p.responsibility],
                ['Desafio técnico', p.challenge],
                ['Resultado', p.outcome],
              ].map(([k, v]) => (
                <div key={k}>
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-flame">
                    {k}
                  </h3>
                  <span className="mt-4 block h-px w-9 bg-flame/70" aria-hidden />
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-soft">
                    {v}
                  </p>
                </div>
              ))}
            </div>

            <div className="pd-row mt-16 grid gap-x-14 gap-y-8 rule-t pt-12 lg:grid-cols-[0.22fr_1fr]">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                O que entrega
              </h3>
              <div>
                <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 leading-snug">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-flame"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                  {href && (
                    <Magnetic strength={0.4}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                        data-hot
                      >
                        {p.live ? 'Visitar o projeto' : 'Ver no GitHub'} ↗
                      </a>
                    </Magnetic>
                  )}
                  {p.live && p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                      data-hot
                    >
                      Código ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {p.metric ? (
              <div className="pd-row mt-20 rule-t pt-14 text-center">
                <div
                  className="pd-metric font-display text-[clamp(3.4rem,10vw,8rem)] font-extrabold leading-none tracking-tight"
                  data-value={p.metric.value}
                >
                  {p.metric.value}
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                  {p.metric.label}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* gallery: project records (placeholders until real captures land) */}
        <section className="relative px-5 pb-28 sm:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-baseline justify-between gap-3 rule-t pt-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                Registros do projeto
              </h2>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
                Arquivo em atualização
              </span>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2">
              {galleryCaptions.map((g, i) => (
                <GalleryFigure
                  key={g.caption}
                  slug={p.slug}
                  n={i + 1}
                  caption={g.caption}
                  wide={g.wide}
                />
              ))}
            </div>
          </div>
        </section>

        {/* handoff to the next project */}
        <section className="pd-next relative overflow-hidden px-5 pb-10 pt-24 sm:px-8">
          <div className="mx-auto max-w-[1400px] rule-t pt-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              Próximo projeto
            </p>
            <Link
              to={`/projeto/${next.slug}`}
              className="group mt-4 block focus-visible:outline-none"
              data-hot
            >
              <span className="block overflow-hidden pb-[0.1em]">
                <span className="pd-next-title block font-display text-[clamp(2.4rem,7.5vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] transition-colors duration-300 group-hover:text-flame group-focus-visible:text-flame">
                  {next.title}
                </span>
              </span>
              <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 group-hover:text-flame">
                {next.category} · Ver estudo de caso →
              </span>
            </Link>
            <p className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
              <span>
                © {new Date().getFullYear()} {profile.name}
              </span>
              <Link to="/" className="transition-colors hover:text-flame" data-hot>
                rouggerxavier · portfólio
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function Project() {
  const { slug } = useParams()
  const project = projects.find((x) => x.slug === slug)
  if (!project) return <Navigate to="/" replace />
  // key remounts the view (and its triggers) when hopping to the next project
  return <ProjectView key={project.slug} p={project} />
}
