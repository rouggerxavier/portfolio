import { Link } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'
import RxMark from './RxMark'
import { profile, type Project } from '../data/projects'
import './preview.css'

export function PreviewNav({ minimal = false }: { minimal?: boolean }) {
  return <nav className={`preview-nav ${minimal ? 'minimal-nav' : ''}`} aria-label="Principal">
    {minimal ? <a href="#about">Perfil</a> : <Link to="/" aria-label="Rougger Xavier, início"><RxMark /></Link>}
    {minimal && <a href="#index">Trabalho</a>}
    <div>{!minimal && <a href="#about">Perfil</a>}<a href="#contact">Contato</a></div>
  </nav>
}

export function WorkCard({ project, imageFirst = true }: { project: Project; imageFirst?: boolean }) {
  return <Link to={`/projeto/${project.slug}`} className="work-card" data-reveal>
    <div className="work-image"><img src={project.shot} alt={`Site ${project.title}`} loading="lazy" width="800" height="900" /></div>
    <div className="work-caption"><div>{imageFirst ? <><h2>{project.title}</h2><p>{project.role}</p></> : <><p>{project.title}</p><h2>{project.role}</h2></>}</div><TbArrowUpRight aria-hidden /></div>
  </Link>
}

export function PreviewContact({ invitation = false }: { invitation?: boolean }) {
  return <footer id="contact" className={`preview-contact ${invitation ? 'contact-dark' : ''}`} data-reveal>
    <h2>{invitation ? 'Vamos conversar' : 'Contato'}</h2>
    <div className="contact-links"><a href={`https://wa.me/${profile.phone}`}>WhatsApp <TbArrowUpRight aria-hidden /></a><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github}>GitHub <TbArrowUpRight aria-hidden /></a></div>
  </footer>
}

