import { useEffect, useState } from 'react'

const links = [
  { href: '#index', label: 'Índice', n: '01' },
  { href: '#about', label: 'Perfil', n: '02' },
  { href: '#contact', label: 'Contato', n: '03' },
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
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'bg-paper/85 rule-b backdrop-blur-sm' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          RX
          <span className="text-flame">/</span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex items-baseline gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span className="font-mono text-[0.65rem] text-flame">{l.n}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-wider underline decoration-flame decoration-2 underline-offset-4 transition-colors hover:text-flame"
        >
          Disponível p/ projetos
        </a>
      </nav>
    </header>
  )
}
