import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scene3D from './Scene3D'
import Magnetic from './Magnetic'
import { profile, projects } from '../data/projects'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.h-anim', { opacity: 1, y: 0 })
        gsap.set('.h-word', { yPercent: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.h-meta', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 })
        .from(
          '.h-word',
          { yPercent: 115, duration: 1.05, stagger: 0.08 },
          '-=0.2',
        )
        .from('.h-sub', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.h-cta', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .from('.h-frame', { opacity: 0, scale: 0.9, duration: 1.1 }, '-=1.2')
        .from('.h-block', { opacity: 0, duration: 0.8 }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="blueprint-grid relative min-h-screen overflow-hidden"
    >
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-8 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
        {/* Left: type */}
        <div>
          <div className="h-meta mb-7 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
            <span className="h-meta">{profile.role}</span>
            <span className="h-meta text-flame">●</span>
            <span className="h-meta">{profile.study}</span>
          </div>

          <h1 className="font-display text-[clamp(2.9rem,9vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <span className="h-word block">Construo</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block">
                produtos com <span className="text-flame">IA</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-word block">de ponta a ponta.</span>
            </span>
          </h1>

          <p className="h-sub mt-8 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Transformo modelos, agentes e pipelines em sistemas reais: API,
            autenticação, RAG, avaliação, deploy e interfaces que as pessoas
            gostam de usar.
          </p>

          <div className="h-cta mt-10 flex flex-wrap items-center gap-7">
            <Magnetic strength={0.5}>
              <a
                href="#index"
                className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame"
              >
                Ver projetos
                <span className="font-mono text-xs">({projects.length})</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] hover:text-flame"
              >
                Falar comigo →
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right: 3D drawing inside a title block */}
        <div className="relative hidden lg:block">
          <div className="h-frame relative aspect-square w-full border border-line">
            {/* corner ticks */}
            {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map(
              (pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-3 w-3 border border-flame`}
                  style={{ margin: -1 }}
                />
              ),
            )}
            <Scene3D />
            <span className="absolute left-3 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft">
              fig. 01 — system
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft">
              wireframe / live
            </span>
          </div>

          {/* title block */}
          <div className="h-block mt-4 grid grid-cols-3 border border-line font-mono text-[0.65rem] uppercase tracking-wider">
            <div className="rule-r border-r border-line p-3">
              <div className="text-ink-soft">Autor</div>
              <div className="mt-1 text-ink">R. Xavier</div>
            </div>
            <div className="border-r border-line p-3">
              <div className="text-ink-soft">Local</div>
              <div className="mt-1 text-ink">PB / BR</div>
            </div>
            <div className="p-3">
              <div className="text-ink-soft">Rev.</div>
              <div className="mt-1 text-ink">2026.0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="inline-block animate-bounce">↓</span> role
      </div>
    </section>
  )
}
