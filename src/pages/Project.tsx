import { useRef, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { TbArrowLeft, TbArrowUpRight } from 'react-icons/tb'
import { Contact, ProjectRow } from '../components/Shell'
import RxMark, { RxSlashes } from '../components/RxMark'
import { projects, type Project as ProjectData } from '../data/projects'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../lib/gsap'
import '../site.css'

// Case page (/projeto/:slug). The hero photo is the one that opened from the index
// row: it stays pinned while the panel in the project's colour drops over it, then
// the panel scrolls away and leaves the photo on screen.
function ProjectView({ p }: { p: ProjectData }) {
  const root = useRef<HTMLDivElement>(null)
  const idx = projects.findIndex((x) => x.slug === p.slug)
  const more = [1, 2, 3].map((n) => projects[(idx + n) % projects.length])
  const alt = p.shotAlt ?? `Captura de tela do projeto ${p.title}`

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const enter = gsap
          .timeline({ delay: 0.15, defaults: { ease: 'expo.out', duration: 0.9 } })
          .fromTo('.case-panel-bg', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 }, 0)
          .from('.case-fade', { autoAlpha: 0, duration: 0.5 }, 0.35)
          .from('.case-intro > *', { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, 0.25)
        SplitText.create('.case-headline', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => {
            enter.from(self.lines, { yPercent: 110, stagger: 0.06 }, 0.2)
          },
        })

        gsap.to('.case-photo img', {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: '.case-hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [p.slug] },
  )

  return (
    <div ref={root} className="site" style={{ '--tone': p.tone, '--x': `${p.crop[0] * 100}%` } as CSSProperties}>
      <nav className="case-nav" aria-label="Principal">
        <Link to="/#index">
          <TbArrowLeft aria-hidden /> Projetos
        </Link>
        <a href="#contact">Contato</a>
      </nav>

      <main>
        <section className="case-hero">
          <div className="case-photo">
            <img src={p.shot} alt={alt} decoding="async" />
          </div>
          <div className="case-panel">
            <div className="case-panel-bg">
              <RxSlashes className="case-slashes" />
            </div>
            {/* keeps the headline legible over any capture, and leaves with the panel */}
            <div className="case-fade" />
            <Link to="/" className="case-mark" aria-label="Rougger Xavier, início">
              <RxMark />
            </Link>
            <div className="case-intro">
              <div>
                <h1>{p.title}</h1>
                <p className="case-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              </div>
              <p>{p.problem}</p>
            </div>
            <p className="case-headline">{p.role}</p>
          </div>
        </section>

        <section className="case-story">
          <p>{p.summary}</p>
        </section>

        <section className="case-frame">
          <img src={p.shot} alt="" loading="lazy" decoding="async" />
        </section>

        {p.gallery && (
          <section className="case-gallery" aria-label={`Telas de ${p.title}`}>
            {p.gallery.map((src, i) => (
              <img key={src} src={src} alt={`Tela ${i + 1} de ${p.title}`} loading="lazy" decoding="async" />
            ))}
          </section>
        )}

        <section className="case-facts">
          <div className="case-columns">
            {[
              ['Responsabilidade', p.responsibility],
              ['Desafio técnico', p.challenge],
              ['Resultado', p.outcome],
            ].map(([k, v]) => (
              <div key={k}>
                <h2>{k}</h2>
                <p>{v}</p>
              </div>
            ))}
          </div>
          {p.metric && (
            <p className="case-metric">
              <strong>{p.metric.value}</strong> {p.metric.label}
            </p>
          )}
          <div className="case-spec">
            <div>
              <h2>O que entrega</h2>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Stack</h2>
              <p className="case-stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </p>
              <p className="case-meta">
                {p.category}, {p.year}
                {p.status ? `, ${p.status}` : ''}
              </p>
            </div>
          </div>
          <p className="case-links">
            {p.live && (
              <a className="pill" href={p.live} target="_blank" rel="noreferrer">
                Visitar o projeto <TbArrowUpRight aria-hidden />
              </a>
            )}
            {p.repo && (
              <a className={p.live ? 'text-link' : 'pill'} href={p.repo} target="_blank" rel="noreferrer">
                {p.live ? 'Código' : 'Ver no GitHub'} <TbArrowUpRight aria-hidden />
              </a>
            )}
          </p>
        </section>

        <section className="case-more">
          <h2>Mais projetos</h2>
          {more.map((m) => (
            <ProjectRow key={m.slug} p={m} />
          ))}
        </section>
      </main>
      <Contact />
    </div>
  )
}

export default function Project() {
  const { slug } = useParams()
  const project = projects.find((x) => x.slug === slug)
  if (!project) return <Navigate to="/" replace />
  // key remounts the view (and its triggers) when hopping to another project
  return <ProjectView key={project.slug} p={project} />
}
