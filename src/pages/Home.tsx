import { work, usePreviewMotion } from '../lib/preview'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'
import { PreviewNav, PreviewContact } from '../components/PreviewShell'
import { profile, projects } from '../data/projects'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import './home-preview.css'

const index = ['feirao', 'grankasa', 'docops', 'projeto-alana', 'evalops', 'mobileturismo', 'fluxo-nexo']
const disciplines = ['Design', 'IA', 'IA', 'Design', 'IA', 'Design', 'Sistema']
const fields = ['lojas', 'imóveis', 'documentos', 'arquitetura', 'avaliações', 'turismo', 'finanças']

export default function Home() {
  const root = usePreviewMotion()
  const [active, setActive] = useState<number | null>(null)
  useGSAP(() => {
    const rows = root.current?.querySelectorAll('.index-row') ?? []
    const triggers = Array.from(rows).map((row, i) => ScrollTrigger.create({ trigger: row, start: 'top 55%', end: 'bottom 55%', onToggle: self => { if (self.isActive) setActive(i) }, onLeave: () => setActive(current => current === i ? null : current), onLeaveBack: () => setActive(current => current === i ? null : current) }))
    return () => triggers.forEach(trigger => trigger.kill())
  }, { scope: root })
  const current = active ?? 0
  return <div ref={root} className="preview preview-c" id="top">
    <main>
      <section className="index-hero">
        <PreviewNav minimal />
        <p className="index-intro" data-enter>Oi,<br />sou o Rougger.</p>
        <h1 data-enter>web designer<br />+ engenheiro de IA</h1>
        <div className="index-description" data-enter><p>Desenho e construo sites, landing pages e agentes de IA, do layout ao deploy.</p><p>Quem desenha a interface é quem constrói.</p><p>João Pessoa, Paraíba<br /><a href={`mailto:${profile.email}`}>{profile.email}</a></p></div>
        <a className="index-pill" href="#index" data-enter aria-label="Explorar projetos"><span>Design</span> para <span>Sites</span><b>{String(projects.length).padStart(2, '0')}</b></a>
      </section>
      <section id="index" className="project-index" aria-label="Índice de projetos">
        {index.map((slug, i) => { const p = work(slug); return <Link key={slug} to={`/projeto/${slug}`} className={`index-row ${i % 2 ? 'wide-row' : ''} ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}>
          <div className="index-band"><img src={p.shot} alt="" loading="lazy" width="1280" height="500" /></div>
          <span className="index-name">{slug === 'projeto-alana' ? 'Alana Lacerda' : p.title}</span><TbArrowUpRight className="index-arrow" aria-hidden />
        </Link> })}
        <div className={`index-context ${active === null ? 'context-hidden' : ''}`} aria-hidden="true"><span key={`discipline-${current}`}>{disciplines[current]}</span> para <span key={`field-${current}`}>{fields[current]}</span></div>
      </section>
      <section id="about" className="index-services" data-reveal><h2>Serviços</h2><p>Sites e portfólios<br />Landing pages<br />Lojas e catálogos<br />Agentes de IA e chat<br />Sistemas sob medida</p></section>
    </main>
    <PreviewContact invitation />
  </div>
}
