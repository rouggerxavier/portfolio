import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText, MOTION_OK, useGSAP } from '../lib/gsap'
import { TbCopy, TbCheck, TbChevronDown } from 'react-icons/tb'
import Magnetic from './Magnetic'
import { profile } from '../data/projects'

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
  const [copied, setCopied] = useState<string | null>(null)
  const [channelsOpen, setChannelsOpen] = useState(false)
  const copyTimer = useRef<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => setTime(timeFmt.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  // Act 5: the closing plate. The giant invitation is inked char by char,
  // scrubbed to the arrival; the instrument readouts follow the same scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = new SplitText('.ct-word', { type: 'chars' })
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top 92%',
              end: 'top 28%',
              scrub: 0.8,
            },
            defaults: { ease: 'none' },
          })
          .from(split.chars, {
            yPercent: 120,
            stagger: 0.05,
          })
        gsap.from('.ct-fade', {
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        })
        return () => split.revert()
      })
    },
    { scope: root },
  )

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(key)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(null), 1600)
  }

  const waMessage = 'Olá Rougger! Vi seu portfólio e quero começar um projeto.'
  const channels = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      display: profile.phoneLabel,
      href: `https://wa.me/${profile.phone}?text=${encodeURIComponent(waMessage)}`,
      copyValue: profile.phoneLabel,
      external: true,
    },
    {
      key: 'email',
      label: 'Email',
      display: profile.email,
      href: `mailto:${profile.email}?subject=${encodeURIComponent(
        'Quero começar um projeto',
      )}&body=${encodeURIComponent(waMessage)}`,
      copyValue: profile.email,
      external: false,
    },
  ]

  return (
    <section id="contact" ref={root} className="relative px-5 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1400px] rule-t pt-14">
        {/* live instrument readout: section id + availability + local clock */}
        <div className="ct-fade mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
          <span className="text-flame">Contato</span>
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
            <span className="ct-word block">Traga a</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ct-word block text-flame">ideia.</span>
          </span>
        </h2>

        <p className="ct-fade mt-8 max-w-[46ch] text-lg leading-relaxed text-ink">
          Eu devolvo um produto completo: desenhado, construído e no ar. O mesmo
          cuidado que você acabou de ver, aplicado ao seu.
        </p>

        {/* actions: one dominant CTA that discloses the direct channels */}
        <div className="ct-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => setChannelsOpen((o) => !o)}
              aria-expanded={channelsOpen}
              aria-controls="contact-channels"
              className="inline-flex items-center gap-3 bg-flame px-8 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              data-hot
            >
              Começar um projeto
              <TbChevronDown
                className={`text-base transition-transform duration-500 ease-out ${
                  channelsOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>
          </Magnetic>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none max-md:inline-flex max-md:min-h-[44px] max-md:items-center"
          >
            GitHub ↗
          </a>
        </div>

        {/* direct channels: inline disclosure animated purely in CSS
            (grid-rows height + staggered fade of each row) */}
        <div
          id="contact-channels"
          className="grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ gridTemplateRows: channelsOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden" inert={!channelsOpen}>
            <div
              className="mt-6 max-w-[560px] border border-line transition-opacity duration-500 ease-out motion-reduce:transition-none"
              style={{ opacity: channelsOpen ? 1 : 0 }}
            >
              <div className="border-b border-line px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
                Canais diretos
              </div>

              {channels.map((c, i) => (
                <div
                  key={c.key}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none [&:not(:last-child)]:border-b [&:not(:last-child)]:border-line"
                  style={{
                    opacity: channelsOpen ? 1 : 0,
                    transform: channelsOpen ? 'none' : 'translateY(12px)',
                    transitionDelay: channelsOpen ? `${160 + i * 90}ms` : '0ms',
                  }}
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-flame">
                      {c.label}
                    </div>
                    <div className="mt-1 font-mono text-sm text-ink">
                      {c.display}
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-ink transition-colors hover:border-flame hover:bg-flame hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper max-md:min-h-[44px]"
                      data-hot
                    >
                      Abrir ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => copy(c.copyValue, c.key)}
                      aria-label={
                        copied === c.key
                          ? `${c.label} copiado`
                          : `Copiar ${c.label}: ${c.copyValue}`
                      }
                      className="inline-flex items-center justify-center border border-line p-2.5 text-ink transition-colors hover:border-flame hover:text-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper max-md:min-h-[44px] max-md:min-w-[44px]"
                      data-hot
                    >
                      {copied === c.key ? (
                        <TbCheck className="text-base text-flame" aria-hidden />
                      ) : (
                        <TbCopy className="text-base" aria-hidden />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* friction-reducers */}
        <p className="ct-fade mt-6 font-mono text-xs uppercase tracking-wider text-ink-soft">
          Resposta normalmente em poucas horas
          <span className="mx-2.5 text-flame" aria-hidden>
            ·
          </span>
          Sem compromisso
        </p>

        {/* drawing title block footer */}
        <footer className="mt-24 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-mono text-[0.65rem] uppercase tracking-wider sm:grid-cols-4">
          {[
            ['Documento', 'Portfólio'],
            ['Autor', profile.name],
            ['Rev.', '2026.0'],
            ['Stack', 'React · GSAP · Lenis'],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-4">
              <div className="text-ink-soft">{k}</div>
              <div className="mt-1 text-ink">{v}</div>
            </div>
          ))}
        </footer>
        <p className="py-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
          © {new Date().getFullYear()} {profile.name} · desenhado e construído à mão
        </p>
      </div>
    </section>
  )
}
