import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons/lib'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiThreedotjs,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiLangchain,
  SiGit,
  SiGithub,
} from 'react-icons/si'
import {
  TbLayoutGrid,
  TbBrush,
  TbWaveSine,
  TbDevices,
  TbDatabaseSearch,
  TbRobot,
  TbShare2,
  TbAdjustmentsHorizontal,
  TbChecklist,
  TbTerminal2,
  TbInfinity,
  TbCloud,
} from 'react-icons/tb'
import { capabilities, focus } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const capIcons: Record<string, IconType> = {
  uiux: TbLayoutGrid,
  webdesign: TbBrush,
  motion: TbWaveSine,
  responsive: TbDevices,
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  gsap: SiGreensock,
  three: SiThreedotjs,
  node: SiNodedotjs,
  python: SiPython,
  fastapi: SiFastapi,
  rag: TbDatabaseSearch,
  agents: TbRobot,
  langchain: SiLangchain,
  langgraph: TbShare2,
  finetune: TbAdjustmentsHorizontal,
  evals: TbChecklist,
  cli: TbTerminal2,
  git: SiGit,
  github: SiGithub,
  cicd: TbInfinity,
  cloud: TbCloud,
}

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
      // count-up percentages
      gsap.utils.toArray<HTMLElement>('.pct').forEach((el) => {
        const target = Number(el.dataset.pct || 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.bars', start: 'top 80%' },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}%`
          },
        })
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
            Design e IA, do traço ao deploy.
          </h2>
          <p className="ab-reveal mt-7 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
            Trabalho nos dois lados com o mesmo cuidado: web design e UI/UX
            (hierarquia, tipografia, motion, acessibilidade) e engenharia de IA
            aplicada (RAG, agentes, avaliação, APIs). Levo do conceito ao deploy
            com React e TypeScript.
          </p>

          <div className="bars ab-reveal mt-10 space-y-4">
            {focus.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs uppercase tracking-wider">
                  <span>{f.label}</span>
                  <span className="pct text-ink-soft" data-pct={f.pct}>
                    {f.pct}%
                  </span>
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
            Skills &amp; Tools
          </h3>
          <ul className="grid grid-cols-3 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {capabilities.map(({ label, icon }) => {
              const Icon = capIcons[icon]
              return (
                <li
                  key={label}
                  className="group flex flex-col items-center justify-center gap-2.5 bg-paper px-2 py-5 text-center transition-colors duration-300 hover:bg-paper-2"
                >
                  {Icon && (
                    <Icon
                      className="text-2xl text-ink-soft transition-colors duration-300 group-hover:text-flame"
                      aria-hidden
                    />
                  )}
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-wider text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
