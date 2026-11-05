import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbArrowDown, TbArrowUpRight } from 'react-icons/tb'
import Intro, { INTRO_DONE, introPlayed } from '../components/Intro'
import { Contact, Nav, ProjectRow } from '../components/Shell'
import { RxSlashes } from '../components/RxMark'
import { profile, projects, service } from '../data/projects'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/lenis'
import '../site.css'

const afterIntro = (run: () => void) => {
  if (introPlayed()) return run()
  window.addEventListener(INTRO_DONE, run, { once: true })
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()

  // arriving with a hash (/#contact): the page has to be free to scroll first
  useEffect(() => {
    if (!hash) return
    let timer = 0
    afterIntro(() => {
      timer = window.setTimeout(() => {
        const target = document.getElementById(hash.slice(1))
        if (!target) return
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(target)
        else target.scrollIntoView()
      }, 120)
    })
    return () => window.clearTimeout(timer)
  }, [hash])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const enter = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out', duration: 1 } })
          .from('.hero h1 .mask > span', { yPercent: 110, stagger: 0.08 }, 0)
          .from('.hero-hi', { y: 18, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from('.hero-slashes path', { y: 40, autoAlpha: 0, stagger: 0.07, duration: 1.2 }, 0.05)
          .from('.hero-foot > *', { y: 18, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.35)
          .from('.hero-cta', { yPercent: 100, duration: 0.8 }, 0.45)
        afterIntro(() => enter.play())

        gsap.to('.hero-slashes', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="site">
      <Intro />
      <main>
        <section className="hero">
          <RxSlashes className="hero-slashes" />
          <Nav />
          <p className="hero-hi">
            Oi,
            <br />
            eu sou Rougger.
          </p>
          <h1>
            <span className="mask">
              <span>web designer</span>
            </span>
            <span className="mask">
              <span>+ engenheiro de IA</span>
            </span>
          </h1>
          <div className="hero-foot">
            <p>Desenho e construo sites, landing pages e agentes de IA, do layout ao deploy.</p>
            <p>Quem desenha a interface é quem constrói.</p>
            <p>
              João Pessoa, Paraíba
              <br />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
          <a className="hero-cta" href="#index">
            Ver trabalhos <TbArrowDown aria-hidden />
          </a>
        </section>

        <section id="index" className="works">
          <h2 className="works-title">
            Trabalhos selecionados<sup>{projects.length}</sup>
          </h2>
          {projects.map((p) => (
            <ProjectRow key={p.slug} p={p} />
          ))}
        </section>

        <section id="about" className="services">
          <h2>Serviços</h2>
          <div>
            <p>
              Sites e portfólios
              <br />
              Landing pages
              <br />
              Lojas e catálogos
              <br />
              Agentes de IA e chat
              <br />
              Sistemas sob medida
            </p>
            <Link to={service.path} className="text-link">
              {service.title} <TbArrowUpRight aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  )
}
