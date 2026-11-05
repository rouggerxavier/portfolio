import { work, usePreviewMotion } from '../lib/preview'
import { PreviewNav, PreviewContact, WorkCard } from '../components/PreviewShell'
import { profile } from '../data/projects'
import { Link } from 'react-router-dom'
import { TbArrowDown } from 'react-icons/tb'
import './home-preview.css'

export default function Home() {
  const root = usePreviewMotion()
  return <div ref={root} className="preview preview-b" id="top">
    <main>
      <section className="maker-hero">
        <img className="maker-backdrop" src={work('feirao').shot} alt="" fetchPriority="high" />
        <PreviewNav />
        <div className="maker-title" data-enter><h1>Desenho e<br />construo<br />produtos</h1><span>web &amp; IA</span></div>
        <Link to="/projeto/feirao" className="maker-feature" aria-label="Ver Feirão da Construção" data-enter><img src={work('feirao').shot} alt="Site Feirão da Construção" fetchPriority="high" width="650" height="900" /></Link>
        <a className="maker-scroll" href="#index" data-enter>Explore o trabalho <TbArrowDown aria-hidden /></a>
      </section>
      <section id="index" className="maker-work" aria-label="Projetos selecionados">
        <div><WorkCard project={work('grankasa')} imageFirst={false} /><WorkCard project={work('docops')} imageFirst={false} /></div>
        <div><WorkCard project={work('projeto-alana')} imageFirst={false} /><WorkCard project={work('mobileturismo')} imageFirst={false} /></div>
      </section>
      <section className="maker-statement" aria-label="Design e código, IA aplicada">
        <div data-parallax>Design &amp; Código</div><div data-parallax>IA aplicada</div>
      </section>
      <section id="about" className="preview-about maker-about" data-reveal><h2>Quem desenha é<br />quem constrói.</h2><p>{profile.name}, web designer e engenheiro de IA em João Pessoa. O que foi aprovado é o que vai ao ar.</p></section>
    </main>
    <PreviewContact />
  </div>
}
