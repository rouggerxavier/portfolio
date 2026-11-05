import { Link } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'
import { Contact, Nav } from '../components/Shell'
import { RxSlashes } from '../components/RxMark'
import { profile, projects, service } from '../data/projects'
import '../site.css'

// Service landing page (/web-designer-joao-pessoa): the local-search entry point.
// No scroll choreography, so the content reads immediately.
export default function Service() {
  return (
    <div className="site">
      <main>
        <section className="service-hero">
          <RxSlashes className="hero-slashes" />
          <Nav />
          <h1 data-depth="1">{service.title}</h1>
          <p data-depth="0.5">{service.intro}</p>
          <a className="pill" href={`https://wa.me/${profile.phone}`} target="_blank" rel="noreferrer">
            Pedir orçamento no WhatsApp <TbArrowUpRight aria-hidden />
          </a>
        </section>

        <section className="service-block">
          <h2>O que eu faço</h2>
          <div>
            {service.offers.map((o) => (
              <article key={o.name} className="offer">
                <div>
                  <h3>{o.name}</h3>
                  <p>{o.text}</p>
                </div>
                <ul>
                  {projects
                    .filter((p) => o.slugs.includes(p.slug))
                    .map((p) => (
                      <li key={p.slug}>
                        <Link to={`/projeto/${p.slug}`} className="text-link">
                          {p.title}
                        </Link>{' '}
                        <span>{p.role}</span>
                      </li>
                    ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="service-block">
          <h2>Por que comigo</h2>
          <div className="case-columns">
            {service.reasons.map(([k, v]) => (
              <div key={k}>
                <h3>{k}</h3>
                <p>{v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="service-close">
          <h2>Tem um site para tirar do papel em João Pessoa?</h2>
          <a className="pill" href={`https://wa.me/${profile.phone}`} target="_blank" rel="noreferrer">
            WhatsApp {profile.phoneLabel} <TbArrowUpRight aria-hidden />
          </a>
        </section>
      </main>
      <Contact />
    </div>
  )
}
