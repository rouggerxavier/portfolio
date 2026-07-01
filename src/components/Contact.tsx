import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TbCopy, TbCheck } from 'react-icons/tb'
import Magnetic from './Magnetic'
import { profile } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

// live readout: local time in Rougger's timezone (Paraíba / BRT)
const timeFmt = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'America/Recife',
})

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const [time, setTime] = useState(() => timeFmt.format(new Date()))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(timeFmt.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="contact" ref={root} className="relative px-5 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1400px] rule-t pt-14">
        {/* live instrument readout: section id + availability + local clock */}
        <div className="ct-fade mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
          <span className="text-flame">03 / Contato</span>
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
            </span>
            Disponível para projetos
          </span>
          <span className="tabular-nums" aria-hidden>
            {profile.location.split(',')[0]} · {time} BRT
          </span>
        </div>

        <h2 className="font-display text-[clamp(2.6rem,11vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <span className="ct-word block">Vamos</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ct-word block text-flame">construir.</span>
          </span>
        </h2>

        <p className="ct-fade mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
          Tem um produto web ou de IA em mente? Me manda uma linha: respondo
          rápido e a gente tira do papel.
        </p>

        {/* actions: copy-to-clipboard (delight) + open mail + github */}
        <div className="ct-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email copiado' : `Copiar email: ${profile.email}`}
              className={`inline-flex items-center gap-3 border border-line px-6 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                copied ? 'bg-flame' : 'bg-ink'
              }`}
              data-hot
            >
              {copied ? (
                <TbCheck className="text-base" aria-hidden />
              ) : (
                <TbCopy className="text-base" aria-hidden />
              )}
              {copied ? 'Copiado' : 'Copiar email'}
            </button>
          </Magnetic>

          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm normal-case tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
            data-hot
          >
            {profile.email} ↗
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
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
