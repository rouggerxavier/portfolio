import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#top', label: 'Início' },
  { href: '#projects', label: 'Projetos' },
  { href: '#about', label: 'Sobre' },
  { href: '#contact', label: 'Contato' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = () => dialogRef.current?.showModal()
  const closeMenu = () => dialogRef.current?.close()

  return (
    <header className={`site-header ${solid ? 'site-header--solid' : ''}`}>
      <nav className="site-nav" aria-label="Navegação principal">
        <a href="#top" className="brand-mark" aria-label="Rougger Xavier, início">
          RX<span aria-hidden="true">/</span>
        </a>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="menu-trigger"
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-label="Abrir menu"
        >
          Menu
          <span aria-hidden="true">+</span>
        </button>
      </nav>

      <dialog ref={dialogRef} className="mobile-menu" aria-label="Menu principal">
        <div className="mobile-menu__head">
          <span className="brand-mark" aria-hidden="true">
            RX<span>/</span>
          </span>
          <button type="button" onClick={closeMenu} aria-label="Fechar menu">
            Fechar <span aria-hidden="true">×</span>
          </button>
        </div>
        <ul>
          {links.map((link, index) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                <span aria-hidden="true">0{index + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  )
}
