import type { CSSProperties, MouseEvent, PointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'
import RxMark, { RxSlashes } from './RxMark'
import { profile, type Project } from '../data/projects'
import { openProject } from '../lib/openProject'
import { gsap, MOTION_OK } from '../lib/gsap'

export function Nav() {
  return (
    <nav className="nav" aria-label="Principal" data-depth="0.3">
      <Link to="/" aria-label="Rougger Xavier, início">
        <RxMark className="nav-mark" />
      </Link>
      <div>
        <Link to="/#index">Trabalho</Link>
        <Link to="/#about">Serviços</Link>
        <a href="#contact">Contato</a>
      </div>
    </nav>
  )
}

// The name leans toward the cursor while it's over the row, more up and down since
// the row is far shorter than it is wide.
const follow = (e: PointerEvent<HTMLAnchorElement>) => {
  if (e.pointerType !== 'mouse' || !window.matchMedia(MOTION_OK).matches) return
  const box = e.currentTarget.getBoundingClientRect()
  gsap.to(e.currentTarget.querySelector('.row-title'), {
    x: (e.clientX - box.left - box.width / 2) * 0.05,
    y: (e.clientY - box.top - box.height / 2) * 0.16,
    scale: 1.05,
    duration: 0.7,
    ease: 'power3.out',
    overwrite: 'auto',
  })
}
const release = (e: PointerEvent<HTMLAnchorElement>) => {
  gsap.to(e.currentTarget.querySelector('.row-title'), { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', overwrite: 'auto' })
}

// Closed until the cursor (or keyboard focus) lands on it; the click opens the photo.
export function ProjectRow({ p }: { p: Project }) {
  const navigate = useNavigate()
  const to = `/projeto/${p.slug}`
  const [x, y, zoom] = p.crop
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    openProject(e.currentTarget, p.crop, () => navigate(to))
  }
  return (
    <Link to={to} className="row" onClick={onClick} onPointerMove={follow} onPointerLeave={release}>
      <span className="row-band" style={{ '--x': `${x * 100}%`, '--y': `${y * 100}%`, '--zoom': zoom, ...(p.tint && { '--tint': p.tone, '--veil': 0.86 }) } as CSSProperties}>
        {/* touch never shows the band until the tap, so it takes the light file */}
        <img src={p.shot} srcSet={p.thumb ? `${p.thumb} 800w, ${p.shot} 1776w` : undefined} sizes="(hover: none) 260px, 100vw" alt="" loading="lazy" decoding="async" />
      </span>
      <span className="row-title">
        <h3>{p.short ?? p.title}</h3>
        <span className="row-tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </span>
      <TbArrowUpRight className="row-arrow" aria-hidden />
    </Link>
  )
}

export function Contact() {
  return (
    <footer id="contact" className="contact">
      <RxSlashes className="contact-slashes" />
      <h2 data-depth="0.8">Vamos conversar</h2>
      <div className="contact-links">
        <a href={`https://wa.me/${profile.phone}`}>
          WhatsApp <TbArrowUpRight aria-hidden />
        </a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github}>
          GitHub <TbArrowUpRight aria-hidden />
        </a>
      </div>
      <p className="contact-base">
        <RxMark />
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </p>
    </footer>
  )
}
