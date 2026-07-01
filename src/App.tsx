import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Intro, { INTRO_DONE } from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Smooth scroll (Lenis) only on real pointer devices. On touch, Lenis fights
    // native momentum scroll and the URL-bar resize — the source of the mobile
    // "self-scrolling" jank. Touch keeps native scrolling instead.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    // Don't let the mobile address-bar show/hide resize re-trigger ScrollTrigger.
    ScrollTrigger.config({ ignoreMobileResize: true })

    // recalc trigger positions once fonts/layout settle and after the intro
    const refresh = () => ScrollTrigger.refresh()
    const seen = sessionStorage.getItem('introSeen')
    if (!seen) window.addEventListener(INTRO_DONE, refresh, { once: true })
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    let lenis: Lenis | null = null
    let removeTick: (() => void) | null = null
    if (!reduce && fine) {
      const l = new Lenis({ lerp: 0.1, smoothWheel: true })
      lenis = l
      l.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => l.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      removeTick = () => gsap.ticker.remove(tick)

      // hold scroll until the intro reveals the page (mobile uses body.intro-lock)
      if (!seen) {
        l.stop()
        window.addEventListener(INTRO_DONE, () => l.start(), { once: true })
      }
    }

    return () => {
      window.removeEventListener('load', refresh)
      removeTick?.()
      lenis?.destroy()
    }
  }, [])

  return (
    <>
      <Background />
      <Cursor />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}
