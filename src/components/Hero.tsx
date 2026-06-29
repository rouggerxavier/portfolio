import { useEffect, useRef, type ComponentType } from 'react'
import { gsap } from 'gsap'
import Magnetic from './Magnetic'
import OrbRaw from './Orb'
import { INTRO_DONE } from './Intro'
import { profile, projects } from '../data/projects'

const Orb = OrbRaw as unknown as ComponentType<Record<string, unknown>>

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.h-meta, .h-sub, .h-cta, .h-orb, .h-block', { opacity: 1, y: 0 })
        gsap.set('.h-word', { yPercent: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true })
      tl.from('.h-orb', { opacity: 0, scale: 0.85, duration: 1.4 })
        .from('.h-meta', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=1.0')
        .from('.h-word', { yPercent: 115, duration: 1.0, stagger: 0.07 }, '-=0.7')
        .from('.h-sub', { y: 18, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.h-cta', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .from('.h-block', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')

      const play = () => tl.play()
      if (sessionStorage.getItem('introSeen')) play()
      else window.addEventListener(INTRO_DONE, play, { once: true })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5"
    >
      {/* Orb centerpiece */}
      <div className="h-orb pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="aspect-square w-[min(92vw,82svh,880px)]">
          <Orb
            hue={0}
            hoverIntensity={0.35}
            rotateOnHover
            forceHoverState
            backgroundColor="#070708"
          />
        </div>
      </div>

      {/* legibility scrim over the glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(closest-side at 50% 48%, rgba(7,7,8,0.72), rgba(7,7,8,0.25) 45%, transparent 70%)',
        }}
      />

      {/* corner metadata (spec-sheet framing) */}
      <div className="h-meta pointer-events-none absolute left-5 top-24 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft sm:left-8">
        Fig. 01
        <br />
        Núcleo / RX
      </div>
      <div className="h-meta pointer-events-none absolute right-5 top-24 text-right font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft sm:right-8">
        2026.0
        <br />
        PB / BR
      </div>

      {/* centered content over the orb's core */}
      <div className="relative z-10 mx-auto w-full max-w-[1000px] text-center">
        <p className="h-meta mb-7 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          {profile.role} <span className="text-flame">●</span> {profile.study}
        </p>

        <h1 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <span className="h-word block">Desenho e construo</span>
          </span>
          <span className="block overflow-hidden">
            <span className="h-word block">
              produtos <span className="text-flame">web &amp; IA</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="h-word block">que vivem.</span>
          </span>
        </h1>

        <p className="h-sub mx-auto mt-8 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
          Uno design e engenharia: UI/UX e motion no front, IA aplicada, RAG e
          APIs no back. Do conceito ao deploy.
        </p>

        <div className="h-cta mt-10 flex flex-wrap items-center justify-center gap-7">
          <Magnetic strength={0.5}>
            <a
              href="#index"
              className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame"
              data-hot
            >
              Ver projetos
              <span className="font-mono text-xs">({projects.length})</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] hover:text-flame"
              data-hot
            >
              Falar comigo →
            </a>
          </Magnetic>
        </div>
      </div>

      {/* bottom drawing title-block */}
      <div className="h-block absolute inset-x-0 bottom-0">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden border-t border-line bg-line font-mono text-[0.62rem] uppercase tracking-wider sm:grid-cols-4">
          {[
            ['Autor', profile.name],
            ['Foco', 'UI/UX · IA'],
            ['Projetos', String(projects.length).padStart(2, '0')],
            ['Rev.', '2026.0'],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper/70 p-3 backdrop-blur-[1px]">
              <div className="text-ink-soft">{k}</div>
              <div className="mt-0.5 text-ink">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
