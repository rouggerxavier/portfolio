import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Magnetic from './Magnetic'
import { INTRO_DONE } from './Intro'
import { profile, projects } from '../data/projects'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.h-anim, .h-meta, .h-sub, .h-cta, .h-block', { opacity: 1, y: 0 })
        gsap.set('.h-word', { yPercent: 0 })
        return
      }
      gsap.set(root.current, { autoAlpha: 1 })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true })
      tl.from('.h-meta', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 })
        .from('.h-word', { yPercent: 115, duration: 1.05, stagger: 0.08 }, '-=0.2')
        .from('.h-sub', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
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
      className="relative min-h-screen"
    >
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:pt-24">
        <div>
          <div className="h-meta mb-7 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
            <span className="h-meta">{profile.role}</span>
            <span className="h-meta text-flame">●</span>
            <span className="h-meta">{profile.study}</span>
          </div>

          <h1 className="font-display text-[clamp(2.6rem,7.2vw,7rem)] font-extrabold leading-[0.86] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <span className="h-word block">Desenho</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block">e construo</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block">produtos</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block text-flame">web &amp; IA</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block">que vivem.</span>
            </span>
          </h1>

          <p className="h-sub mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            Uno design e engenharia: interfaces com UI/UX e motion caprichados,
            e back-end com IA aplicada, RAG e APIs. Do conceito ao deploy, em
            produtos web que funcionam de verdade.
          </p>

          <div className="h-cta mt-10 flex flex-wrap items-center gap-7">
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

        {/* right: technical title block (3D field shows behind globally) */}
        <div className="h-block hidden lg:block">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-mono text-[0.65rem] uppercase tracking-wider">
            {[
              ['Autor', 'R. Xavier'],
              ['Local', 'PB / BR'],
              ['Foco', 'UI/UX · IA'],
              ['Estudo', 'UFPB'],
              ['Projetos', String(projects.length).padStart(2, '0')],
              ['Rev.', '2026.0'],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper/70 p-4 backdrop-blur-[1px]">
                <div className="text-ink-soft">{k}</div>
                <div className="mt-1 text-ink">{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-[34ch] font-mono text-[0.65rem] uppercase leading-relaxed tracking-wider text-ink-soft">
            Fig. 01 — campo estrutural reativo. Mova o ponteiro / role a página.
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="inline-block animate-bounce">↓</span> role
      </div>
    </section>
  )
}
