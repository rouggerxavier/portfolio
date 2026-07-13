import { capabilities, profile } from '../data/projects'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-shell about__grid">
        <div className="about__mark" aria-hidden="true">
          <span>RX</span>
          <small>João Pessoa / PB</small>
        </div>

        <div className="about__content">
          <div className="section-heading section-heading--compact">
            <p>Sobre mim</p>
            <h2>Clareza para resolver, cuidado para manter.</h2>
          </div>

          <div className="about__text">
            <p>
              Sou Rougger Xavier, desenvolvedor Full Stack em João Pessoa. Gosto de
              transformar problemas práticos em produtos organizados, fáceis de usar e
              possíveis de manter, combinando desenvolvimento web, dados e inteligência
              artificial quando ela realmente melhora o processo.
            </p>
            <p>
              Trabalho do frontend à infraestrutura: desenho fluxos, construo interfaces,
              APIs e integrações, organizo dados e preparo o deploy. Valorizo usabilidade,
              decisões técnicas explícitas e uma base que continue saudável depois da
              entrega. Atuo de forma remota e estou aberto a oportunidades profissionais e
              projetos selecionados.
            </p>
          </div>

          <div className="toolbox" aria-label="Tecnologias e competências">
            <span>Ferramentas que uso</span>
            <ul>
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="about__location">{profile.location} · trabalho remoto</p>
        </div>
      </div>
    </section>
  )
}
