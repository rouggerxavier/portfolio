import { useRef } from 'react'
import { gsap, SplitText, MOTION_OK, useGSAP } from '../lib/gsap'
import Magnetic from './Magnetic'
import { INTRO_DONE } from './Intro'
import { profile, projects } from '../data/projects'

// Act 1 of the scroll narrative. Loads in with a char choreography, then the
// scrub pulls the drawing apart: headline lines drift on opposing vectors, the
// crosshair rotates like a compass and the cota readout counts the descent.
export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const cotaY = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // entrance, held until the intro overlay clears
        const split = new SplitText('.h-line', { type: 'chars' })
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        tl.from('.h-meta', { y: 14, autoAlpha: 0, duration: 0.6 })
          .from(
            split.chars,
            { yPercent: 120, duration: 0.9, stagger: { each: 0.016, from: 'start' } },
            '-=0.35',
          )
          .from('.h-sub', { y: 18, autoAlpha: 0, duration: 0.7 }, '-=0.5')
          .from('.h-cta > *', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
          .from('.h-cross', { scale: 0.6, autoAlpha: 0, duration: 1.1 }, '-=0.8')
          .from('.h-hint', { autoAlpha: 0, duration: 0.6 }, '-=0.4')

        const play = () => tl.play()
        if (sessionStorage.getItem('introSeen')) play()
        else window.addEventListener(INTRO_DONE, play, { once: true })

        // scrub: the sheet disassembles while pinned
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=130%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (cotaY.current)
                  cotaY.current.textContent = String(Math.round(self.progress * 1300)).padStart(4, '0')
              },
            },
            defaults: { ease: 'none' },
          })
          .to('.h-line-1', { xPercent: -16 }, 0)
          .to('.h-line-2', { xPercent: 12 }, 0)
          .to('.h-line-3', { xPercent: -7 }, 0)
          .to('.h-title', { scale: 0.94, transformOrigin: '50% 100%' }, 0)
          .to('.h-meta, .h-sub, .h-cta', { autoAlpha: 0, y: -40, stagger: 0.05 }, 0)
          .to('.h-cross', { rotation: 120, scale: 1.25, autoAlpha: 0.25 }, 0)
          .to('.h-hint', { autoAlpha: 0 }, 0)
          .fromTo('.h-rule', { scaleY: 0 }, { scaleY: 1 }, 0)

        return () => {
          window.removeEventListener(INTRO_DONE, play)
          split.revert()
        }
      })
    },
    { scope: root },
  )

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden px-5 sm:px-8"
    >
      {/* draughtsman crosshair, rotating with the scrub */}
      <div
        className="h-cross pointer-events-none absolute right-[8%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 lg:block"
        aria-hidden
      >
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line" />
        <span className="absolute inset-[12%] rounded-full border border-line" />
        <span className="absolute inset-[38%] rounded-full border border-line" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame" />
      </div>

      {/* vertical measuring rule drawn by the scroll */}
      <span
        className="h-rule pointer-events-none absolute bottom-0 left-1/2 hidden h-[38vh] w-px origin-top bg-flame/60 lg:block"
        style={{ transform: 'scaleY(0)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="h-meta mb-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          {profile.role} <span className="text-flame">●</span> {profile.study}{' '}
          <span className="text-flame">●</span> {profile.school}
        </p>

        <h1 className="h-title font-display text-[clamp(2.7rem,8.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em] max-md:text-[clamp(2.1rem,9.5vw,2.9rem)] max-md:leading-[1]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="h-line h-line-1 block">Desenho e construo</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="h-line h-line-2 block">
              produtos <span className="text-flame">web &amp; IA</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="h-line h-line-3 block">que vivem.</span>
          </span>
        </h1>

        <p className="h-sub mt-9 max-w-[52ch] text-lg leading-relaxed text-ink">
          Ajudo startups, empresas e profissionais a lançar produtos web e de IA
          de ponta a ponta. Design, engenharia e IA aplicada na mesma mão, do
          conceito ao deploy.
        </p>

        <div className="h-cta mt-10 flex flex-wrap items-center gap-7 max-md:mt-8 max-md:gap-5">
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

      {/* scroll hint + live cota */}
      <div
        className="h-hint pointer-events-none absolute bottom-6 left-5 right-14 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft sm:left-8"
        aria-hidden
      >
        <span className="flex items-center gap-3">
          Role para explorar
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <span className="animate-scrolltick absolute left-0 top-0 h-3 w-px bg-flame" />
          </span>
        </span>
        <span className="hidden sm:block">
          Y <span ref={cotaY}>0000</span> · {profile.location}
        </span>
      </div>
    </section>
  )
}
