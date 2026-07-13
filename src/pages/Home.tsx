import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Intro from '../components/Intro'
import Nav from '../components/Nav'
import ScrollRail from '../components/ScrollRail'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import Marquee from '../components/Marquee'
import Projects from '../components/Projects'
import About from '../components/About'
import Contact from '../components/Contact'

export default function Home() {
  const { hash } = useLocation()

  // arriving from another route with a hash (e.g. /#contact): wait for the
  // pins to settle, then jump to the target section
  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView()
    }, 450)
    return () => window.clearTimeout(t)
  }, [hash])

  return (
    <>
      <Intro />
      <Nav />
      <ScrollRail />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}
