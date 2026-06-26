import { useEffect, useState } from 'react'

const links = [
  { href: '#index', label: 'Índice' },
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
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
          RX
          <span className="text-flame">/</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block py-1 font-mono text-[0.8rem] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                {/* draughtsman underline: draws in from left on hover */}
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-flame transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
