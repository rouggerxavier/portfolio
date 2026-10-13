import { useEffect, useState } from 'react'

const links = [
  { href: '#index', label: 'Projetos' },
  { href: '#about', label: 'Perfil' },
  { href: '#contact', label: 'Contato' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid ? 'bg-paper/85 rule-b py-4 backdrop-blur-sm' : 'py-7'
      }`}
    >
      {/* 3-col grid keeps the nav links centered on the viewport regardless of
          the uneven side widths (narrow logo vs. wide CTA), which a plain
          justify-between would push off-center */}
      <nav className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <a
          href="#top"
          className="justify-self-start font-display text-2xl font-extrabold tracking-tight"
        >
          RX
          <span className="text-flame">/</span>
        </a>

        <ul className="hidden items-center gap-9 justify-self-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block py-1 font-mono text-[0.8rem] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-300 hover:text-ink focus-visible:text-ink focus-visible:outline-none"
              >
                {l.label}
                {/* draughtsman underline: draws in from left on hover/focus */}
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-flame transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 justify-self-end font-mono text-xs uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-4 transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none max-md:-my-2 max-md:py-2"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
          </span>
          Disponível p/ projetos
        </a>
      </nav>
    </header>
  )
}
