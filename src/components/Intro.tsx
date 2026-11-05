import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const INTRO_DONE = 'intro:done'

// once per page load: a reload replays the intro, in-app navigation doesn't
let played = false
export const introPlayed = () => played
// a deep link already showed its page: arriving home later shouldn't hold it behind the mark
export const skipIntro = () => {
  played = true
}

export default function Intro() {
  const root = useRef<HTMLDivElement>(null)

  // layout effect: the mark's start state must be set before the first paint
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finish = () => {
      document.body.classList.remove('intro-lock')
      window.dispatchEvent(new Event(INTRO_DONE))
      played = true
    }

    if (played || reduce) {
      if (root.current) root.current.style.display = 'none'
      finish()
      return
    }

    document.body.classList.add('intro-lock')

    const tl = gsap.timeline({
      onComplete: () => {
        if (root.current) root.current.style.display = 'none'
      },
    })

    // the colon appears centered on the mark, then moves to its place while
    // RX and // slide out of it; the whole panel lifts away to reveal the hero
    tl.fromTo(
      '.intro-dot',
      { x: -160, y: -4.5, autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' },
      { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.05 },
      0.15,
    )
      .to('.intro-dot', { x: 0, y: 0, duration: 0.55, ease: 'power3.inOut' }, 0.6)
      .fromTo('.intro-rx', { x: 640 }, { x: 0, duration: 0.7, ease: 'expo.out' }, 0.82)
      .fromTo('.intro-slashes', { x: -340 }, { x: 0, duration: 0.7, ease: 'expo.out' }, 0.82)
      .to(root.current, { yPercent: -100, duration: 0.75, ease: 'expo.inOut' }, 1.68)
      // the hero starts its entrance as the panel clears, so it isn't revealed empty
      .call(finish, undefined, 1.83)

    return () => {
      tl.kill()
      document.body.classList.remove('intro-lock')
    }
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-rx"
    >
      <svg
        viewBox="0 0 1015 314"
        role="img"
        aria-label="RX://"
        className="w-[clamp(180px,27vw,520px)] text-white"
      >
        {/* nested svgs clip RX and // at the colon, so they slide out of it */}
        <svg width="640" height="314" viewBox="0 0 640 314">
          <path
            className="intro-rx"
            fill="currentColor"
            d="M0 0H214C262 0 308 40 308 92V104C308 168 250 210 166 210H96V314H0ZM96 72V138H177C191 138 209 126 209 110V100C209 84 191 72 177 72ZM116 150H223L332.3 314H225.3ZM286 0H399L638 314H525ZM523 0H636L384 314H271Z"
          />
        </svg>
        <svg x="680" width="335" height="314" viewBox="680 0 335 314">
          <path
            className="intro-slashes"
            fill="var(--color-ink)"
            d="M816 0H897L770 314H689ZM934 0H1015L888 314H807Z"
          />
        </svg>
        <path className="intro-dot" fill="var(--color-ink)" d="M628 101a39 39 0 1 0 78 0a39 39 0 1 0-78 0Z" />
        <path className="intro-dot" fill="var(--color-ink)" d="M628 222a39 39 0 1 0 78 0a39 39 0 1 0-78 0Z" />
      </svg>
    </div>
  )
}
