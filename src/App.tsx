import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    if (reduce) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // hold scroll until the intro reveals the page
    if (!sessionStorage.getItem('introSeen')) {
      lenis.stop()
      window.addEventListener(
        INTRO_DONE,
        () => {
          lenis.start()
          ScrollTrigger.refresh()
        },
        { once: true },
      )
    }

    // recalc pin/scrub once fonts are in
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      gsap.ticker.remove(onTick)
      window.removeEventListener('load', refresh)
      lenis.destroy()
    }
  }, [])

  return (
    <>
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
