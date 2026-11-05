import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import { gsap, useGSAP, MOTION_OK, ScrollTrigger } from './gsap'

export const work = (slug: string) => projects.find(p => p.slug === slug)!

export function usePreviewMotion() {
  const { hash } = useLocation()
  // arriving from another route with a hash (e.g. /#contact): wait for the
  // pins to settle, then jump to the target section
  useEffect(() => {
    if (!hash) return
    const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 450)
    return () => window.clearTimeout(timer)
  }, [hash])
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.out' } })
        .from('.preview-nav', { opacity: 0, y: -12 })
        .from('[data-enter]', { y: 40, opacity: 0, stagger: 0.1 }, 0.12)
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 96%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
        gsap.fromTo(el, { yPercent: 4 }, { yPercent: -4, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    return () => mm.revert()
  }, { scope: root })
  return root
}
