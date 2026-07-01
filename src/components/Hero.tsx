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
        gsap.set('.h-meta, .h-sub, .h-cta, .h-orb', { opacity: 1, y: 0 })
        gsap.set('.h-word', { yPercent: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true })
      tl.from('.h-orb', { opacity: 0, scale: 0.85, duration: 1.4 })
        .from('.h-meta', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=1.0')
        .from('.h-word', { yPercent: 115, duration: 1.0, stagger: 0.07 }, '-=0.7')
        .from('.h-sub', { y: 18, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.h-cta', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')

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

      {/* centered content over the orb's core */}
      <div className="relative z-10 mx-auto w-full max-w-[1000px] text-center">
        <p className="h-meta mb-7 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          {profile.role} <span className="text-flame">●</span> {profile.study}{' '}
          <span className="text-flame">●</span> {profile.school}
        </p>

        <h1 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] max-md:text-[clamp(1.95rem,8.4vw,2.6rem)] max-md:leading-[0.98]">
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

        <p className="h-sub mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed text-ink">
          Ajudo startups, empresas e profissionais a lançar produtos web e de IA
          de ponta a ponta. Design, engenharia e IA aplicada na mesma mão, do
          conceito ao deploy.
        </p>

        <div className="h-cta mt-10 flex flex-wrap items-center justify-center gap-7 max-md:mt-8 max-md:gap-5">
          <Magnetic strength={0.5}>
            <a
              href="#index"
              className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              data-hot
            >
              Ver o trabalho
              <span className="font-mono text-xs">({projects.length})</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none max-md:inline-flex max-md:min-h-[44px] max-md:items-center"
              data-hot
            >
              Começar um projeto →
            </a>
          </Magnetic>
        </div>
      </div>

    </section>
  )
}
