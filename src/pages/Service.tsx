import { Link } from 'react-router-dom'
import ScrollRail from '../components/ScrollRail'
import RxMark from '../components/RxMark'
import { profile, projects, service } from '../data/projects'

// Service landing page (/web-designer-joao-pessoa): the local-search entry point.
// Same spec-sheet grid as the case studies, without the scroll choreography,
// so the content reads immediately.
export default function Service() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 py-4 backdrop-blur-sm rule-b">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="Rougger Xavier, início" data-hot>
            <RxMark className="h-[1.15rem] w-auto" />
          </Link>
          <Link
            to="/#index"
            className="font-mono text-[0.8rem] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
            data-hot
          >
            ← Projetos
          </Link>
        </nav>
      </header>

      <ScrollRail stations={[]} />

      <main className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <section className="pb-24 pt-36">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-flame">{profile.location}</p>
            <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.6rem,8vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              {service.title}
            </h1>
            <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{service.intro}</p>
            <a
              href={`https://wa.me/${profile.phone}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              data-hot
            >
              Pedir orçamento no WhatsApp ↗
            </a>
          </section>

          <section className="grid gap-x-14 gap-y-10 rule-t pb-24 pt-12 lg:grid-cols-[0.22fr_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">O que eu faço</h2>
            <div>
              {service.offers.map((o) => (
                <article key={o.name} className="grid gap-x-10 gap-y-4 pb-12 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">{o.name}</h3>
                    <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-soft">{o.text}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {projects
                      .filter((p) => o.slugs.includes(p.slug))
                      .map((p) => (
                        <li key={p.slug}>
                          <Link
                            to={`/projeto/${p.slug}`}
                            className="underline decoration-flame decoration-1 underline-offset-4 transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                            data-hot
                          >
                            {p.title}
                          </Link>
                          <span className="text-ink-soft"> — {p.role}</span>
                        </li>
                      ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-x-14 gap-y-10 rule-t pb-24 pt-12 lg:grid-cols-[0.22fr_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">Por que comigo</h2>
            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
              {service.reasons.map(([k, v]) => (
                <div key={k}>
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-flame">{k}</h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-soft">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rule-t pb-24 pt-12">
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
              Tem um site para tirar do papel em João Pessoa?
            </h2>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
              <a
                href={`https://wa.me/${profile.phone}`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                data-hot
              >
                WhatsApp {profile.phoneLabel}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-flame decoration-2 underline-offset-[6px] transition-colors hover:text-flame focus-visible:text-flame focus-visible:outline-none"
                data-hot
              >
                {profile.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
