import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import { profile } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-word', {
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
        yPercent: 110,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
      })
      gsap.from('.ct-fade', {
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={root} className="relative px-5 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1400px] rule-t pt-14">
        <span className="ct-fade mb-8 block font-mono text-xs uppercase tracking-widest text-flame">
          03 / Contato
        </span>

        <h2 className="font-display text-[clamp(2.6rem,11vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <span className="ct-word block">Vamos</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ct-word block text-flame">construir.</span>
          </span>
        </h2>

        <div className="ct-fade mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame"
              data-hot
            >
              {profile.email}
            </a>
          </Magnetic>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] hover:text-flame"
          >
            GitHub ↗
          </a>
        </div>

        {/* drawing title block footer */}
        <footer className="mt-24 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-mono text-[0.65rem] uppercase tracking-wider sm:grid-cols-4">
          {[
            ['Documento', 'Portfólio'],
            ['Autor', profile.name],
            ['Rev.', '2026.0'],
            ['Stack', 'React · GSAP · three.js'],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-4">
              <div className="text-ink-soft">{k}</div>
              <div className="mt-1 text-ink">{v}</div>
            </div>
          ))}
        </footer>
        <p className="py-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
          © {new Date().getFullYear()} {profile.name} — desenhado e construído à mão
        </p>
      </div>
    </section>
  )
}
