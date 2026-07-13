import { profile } from '../data/projects'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-shell contact__grid">
        <div>
          <p className="contact__label">Vamos conversar</p>
          <h2>Tem um projeto ou oportunidade em mente?</h2>
        </div>

        <div className="contact__body">
          <p>
            Conte um pouco sobre o que você precisa. Vamos conversar sobre a melhor forma
            de transformar a ideia em uma solução funcional.
          </p>
          <a
            className="button button--primary button--large"
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Falar pelo WhatsApp <span aria-hidden="true">↗</span>
          </a>

          <dl className="contact__links">
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  github.com/rouggerxavier <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
