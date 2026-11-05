import { work, usePreviewMotion } from '../lib/preview'
import { useState } from 'react'
import { PreviewNav, PreviewContact, WorkCard } from '../components/PreviewShell'
import { service, profile } from '../data/projects'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import './home-preview.css'

const needs = [
  ['um site', 'arquitetura'],
  ['uma landing page', 'novos clientes'],
  ['uma loja', 'vender mais'],
  ['um agente de IA', 'seus clientes'],
  ['um sistema', 'sua operação'],
]

export default function Home() {
  const root = usePreviewMotion()
  const [selected, setSelected] = useState(0)
  const offer = service.offers[selected]
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('.answer-text', { yPercent: 105, opacity: 0, duration: 0.6, ease: 'expo.out', stagger: 0.06 })
      gsap.from('.selected-work', { y: 24, opacity: 0, duration: 0.6, ease: 'expo.out' })
    })
    return () => mm.revert()
  }, { scope: root, dependencies: [selected], revertOnUpdate: true })

  return <div ref={root} className="preview preview-a" id="top">
    <PreviewNav />
    <main>
      <section className="sentence-hero">
        <h1 data-enter>Preciso de <span className="answer"><span key={`need-${selected}`} className="answer-text">{needs[selected][0]}</span></span><br />para <span className="answer"><span key={`for-${selected}`} className="answer-text">{needs[selected][1]}</span></span></h1>
        <div className="needs" role="group" aria-label="O que você precisa?" data-enter>
          {needs.map(([label], i) => <button key={label} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{label}</button>)}
        </div>
        <p className="offer-text" aria-live="polite" data-enter>{offer.text}</p>
      </section>
      <section id="index" className="selected-work" aria-label="Projetos selecionados">
        {offer.slugs.slice(0, 2).map(slug => <WorkCard key={slug} project={work(slug)} />)}
      </section>
      <section id="about" className="preview-about" data-reveal>
        <h2>Design e código na <span>mesma mão.</span></h2>
        <div className="about-copy"><p>Quem desenha a interface é quem constrói, então o que foi aprovado é o que vai ao ar.</p><p>{profile.name}, web designer e engenheiro de IA em João Pessoa, Paraíba.</p></div>
      </section>
    </main>
    <PreviewContact />
  </div>
}
