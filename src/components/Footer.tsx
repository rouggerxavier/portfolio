import { profile } from '../data/projects'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer__inner">
        <div>
          <strong>{profile.name}</strong>
          <span>Desenvolvedor Full Stack &amp; IA</span>
        </div>
        <nav aria-label="Navegação do rodapé">
          <a href="#projects">Projetos</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
        </nav>
        <p>© {new Date().getFullYear()} · João Pessoa / remoto</p>
      </div>
    </footer>
  )
}
