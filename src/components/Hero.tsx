import { useRef } from 'react'
import { gsap, SplitText, MOTION_OK, useGSAP } from '../lib/gsap'
import ScrollExpand from './ScrollExpand'
import { INTRO_DONE } from './Intro'
import { projects } from '../data/projects'

const SHOTS = ['grankasa', 'projeto-alana', 'feirao', 'evalops']
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p?.shot)

// Act 1 of the scroll narrative. The headline loads in over a framed mosaic of
// real project captures; the scroll lifts it away and opens the frame until the
// projects alone fill the screen.
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // entrance, held until the intro overlay clears
        const split = new SplitText('.h-line', { type: 'chars' })
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        tl.from('.scroll-expand__frame', { scale: 0.92, autoAlpha: 0, duration: 1.1 })
          .from(
            split.chars,
            { yPercent: 120, duration: 0.9, stagger: { each: 0.016, from: 'start' } },
            '-=0.8',
          )
          .from('.scroll-expand__hint', { autoAlpha: 0, duration: 0.6 }, '-=0.4')

        const play = () => tl.play()
        if (sessionStorage.getItem('introSeen')) play()
        else window.addEventListener(INTRO_DONE, play, { once: true })

        return () => {
          window.removeEventListener(INTRO_DONE, play)
          split.revert()
        }
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative">
      <ScrollExpand
        useWindowScroll
        smoothing={0} // Lenis already smooths the page scroll
        className="hero-expand"
        media={
          <div className="relative grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-paper">
            {SHOTS.map((p) => (
              <img
                key={p!.slug}
                src={p!.shot}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        }
        title={
          <h1 className="font-display text-[clamp(2.7rem,8.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink max-md:text-[clamp(2.1rem,9.5vw,2.9rem)] max-md:leading-[1]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="h-line block">Desenho e construo</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="h-line block">
                produtos <span className="text-flame">web &amp; IA</span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="h-line block">que vivem.</span>
            </span>
          </h1>
        }
        scrollHint={
          <span className="inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
            Role para explorar
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="animate-scrolltick absolute left-0 top-0 h-3 w-px bg-flame" />
            </span>
          </span>
        }
      />
    </section>
  )
}
