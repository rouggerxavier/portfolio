import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis, getLenis } from './lib/lenis'
import Background from './components/Background'
import Cursor from './components/Cursor'
import { INTRO_DONE } from './components/Intro'
import Home from './pages/Home'
import Project from './pages/Project'

// route changes land at the top of the new page with fresh trigger positions
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [pathname])
  return null
}

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
      const l = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true })
      lenis = l
      setLenis(l)
      l.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => l.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      removeTick = () => gsap.ticker.remove(tick)

      // hold scroll until the intro reveals the page (mobile uses body.intro-lock);
      // the intro only runs on the home route, so don't lock deep links
      if (!seen && window.location.pathname === '/') {
        l.stop()
        window.addEventListener(INTRO_DONE, () => l.start(), { once: true })
      }
    }

    return () => {
      window.removeEventListener('load', refresh)
      removeTick?.()
      lenis?.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <>
      <Background />
      <Cursor />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:slug" element={<Project />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
