import { useRef } from 'react'
import { gsap, ScrollTrigger, MOTION_OK, useGSAP } from '../lib/gsap'
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
import { capabilities, projects } from '../data/projects'

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

// the two disciplines the work is built on, carried at equal weight
const pillars = [
  {
    title: 'Design & Front-end',
    body: 'Interface, motion e web design que comunicam. React, TypeScript e GSAP — rápido, responsivo e acessível.',
  },
  {
    title: 'IA aplicada & Back-end',
    body: 'RAG, agentes e avaliação sobre APIs que aguentam produção. Python, FastAPI e orquestração de ponta a ponta.',
  },
]

// Act 4: the profile sheet. Every reveal is wired to the scroll: heading and
// prose mask in, and the tool grid tiles in batches as it crosses the viewport.
export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('.ab-reveal', {
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
        })

        // tool grid tiles in as batches
        gsap.set('.cap-tile', { autoAlpha: 0, y: 22 })
        ScrollTrigger.batch('.cap-tile', {
          start: 'top 88%',
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: 'expo.out',
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, { autoAlpha: 0, y: 22, duration: 0.3, overwrite: true }),
        })

        // numbers band counts up when it enters
        gsap.utils.toArray<HTMLElement>('.stat-num', root.current).forEach((el) => {
          const target = Number(el.dataset.num || 0)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.stats',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v)).padStart(2, '0')
            },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-x-16 gap-y-12 rule-t pt-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="ab-reveal mb-6 block font-mono text-xs uppercase tracking-widest text-flame">
            Perfil
          </span>
          <h2 className="ab-reveal max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Produtos completos, do traço ao deploy.
          </h2>
          <p className="ab-reveal mt-7 max-w-[60ch] text-lg leading-relaxed text-ink">
            Entrego produto pronto, não pedaços soltos. Design que comunica,
            front-end rápido e acessível, IA aplicada a problemas reais e APIs
            que aguentam produção. Do primeiro traço ao deploy, na mesma mão:
            menos intermediários, menos ruído, mais produto no ar.
          </p>

          {/* two pillars of equal weight — the positioning stated plainly,
              not quantified into invented percentages */}
          <div className="ab-reveal mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="bg-paper p-5">
                <div className="font-mono text-xs uppercase tracking-wider text-flame">
                  {p.title}
                </div>
                <p className="mt-3 max-w-[42ch] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
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
                  className="cap-tile group flex flex-col items-center justify-center gap-2.5 bg-paper px-2 py-5 text-center transition-colors duration-300 hover:bg-paper-2"
                >
                  {Icon && (
                    <Icon
                      className="text-2xl text-ink-soft transition-colors duration-300 group-hover:text-flame"
                      aria-hidden
                    />
                  )}
                  <span className="font-mono text-[11px] uppercase leading-tight tracking-wide text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* proof band: real, verifiable facts as quiet cotas on a single rule */}
      <div className="stats mx-auto mt-20 max-w-[1400px] rule-t pt-4">
        <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
          O trabalho, em números
        </h3>
        <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3">
          {[
            [projects.length, 'Produtos reais'],
            [projects.filter((p) => p.live).length, 'No ar em produção'],
            [capabilities.length, 'Ferramentas no cinto'],
          ].map(([v, k]) => (
            <div key={String(k)}>
              <div
                className="stat-num font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-extrabold leading-none tracking-tight"
                data-num={v}
              >
                {String(v).padStart(2, '0')}
              </div>
              <span className="mt-4 block h-px w-9 bg-flame/70" aria-hidden />
              <div className="mt-3 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-ink-soft">
                {k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
