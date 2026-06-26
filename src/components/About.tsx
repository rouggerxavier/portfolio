import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { capabilities, focus, profile } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ab-reveal', {
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      })
      gsap.from('.bar-fill', {
        scrollTrigger: { trigger: '.bars', start: 'top 80%' },
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.1,
        stagger: 0.12,
        ease: 'expo.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-x-16 gap-y-12 rule-t pt-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="ab-reveal mb-6 block font-mono text-xs uppercase tracking-widest text-flame">
            02 / Perfil
          </span>
          <h2 className="ab-reveal max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Engenharia de IA com olho de produto.
          </h2>
          <p className="ab-reveal mt-7 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
            Sou estudante de Ciência de Dados & IA na UFPB. Construo do modelo à
            interface: RAG, agentes, fine-tuning e avaliação no backend; React e
            TypeScript no produto. Gosto de detalhe, rigor e de entregar coisas
            que funcionam de verdade.
          </p>

          <div className="bars ab-reveal mt-10 space-y-4">
            {focus.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs uppercase tracking-wider">
                  <span>{f.label}</span>
                  <span className="text-ink-soft">{f.pct}%</span>
                </div>
                <div className="h-2 w-full bg-paper-2">
                  <div
                    className="bar-fill h-full bg-flame"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-reveal">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-ink-soft">
            Capacidades
          </h3>
          <ul className="flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <li
                key={c}
                className="border border-line px-3 py-1.5 font-mono text-xs transition-colors hover:border-flame hover:text-flame"
              >
                {c}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-mono text-xs uppercase tracking-wider">
            {[
              ['Foco', 'AI · Full-stack'],
              ['Base', profile.location],
              ['Estudo', 'UFPB'],
              ['Nível', 'Intermediário+'],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-4">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="mt-1 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
