import { projects, type Project } from '../data/projects'

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="project-actions">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Acessar projeto <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer">
          Ver código <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <dl className="project-details">
      <div>
        <dt>Problema</dt>
        <dd>{project.problem}</dd>
      </div>
      <div>
        <dt>Responsabilidade</dt>
        <dd>{project.responsibility}</dd>
      </div>
      <div>
        <dt>Desafio técnico</dt>
        <dd>{project.challenge}</dd>
      </div>
      <div>
        <dt>Resultado</dt>
        <dd>{project.outcome}</dd>
      </div>
    </dl>
  )
}

function ProjectImage({ project }: { project: Project }) {
  const [width, height] =
    project.slug === 'aurora'
      ? [1911, 872]
      : project.slug === 'projeto-alana'
        ? [1600, 927]
        : [1776, 1110]
  const image = (
    <img
      src={project.shot}
      alt={`Interface do projeto ${project.title}`}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  )

  return project.live ? (
    <a
      className="project-image"
      href={project.live}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir ${project.title}`}
    >
      {image}
    </a>
  ) : (
    <div className="project-image">{image}</div>
  )
}

export default function Projects() {
  const [featured, ...secondary] = projects

  return (
    <section id="projects" className="section projects">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p>Projetos selecionados</p>
            <h2>Problemas reais, decisões explícitas e produto no ar.</h2>
          </div>
          <p>
            Uma seleção de aplicações web, plataformas de dados e produtos com
            inteligência artificial construídos de ponta a ponta.
          </p>
        </div>

        <article className="featured-project">
          <div className="featured-project__media">
            <span className="featured-project__flag">Projeto em destaque</span>
            <ProjectImage project={featured} />
          </div>
          <div className="featured-project__content">
            <div className="project-meta">
              <span>{featured.index}</span>
              <span>{featured.category}</span>
              <span>{featured.year}</span>
            </div>
            <h3>{featured.title}</h3>
            <p className="project-role">{featured.role}</p>
            <p className="project-summary">{featured.summary}</p>
            <ul className="feature-list" aria-label="Principais funcionalidades">
              {featured.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <ProjectDetails project={featured} />
            <ul className="stack-list" aria-label="Tecnologias utilizadas">
              {featured.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <ProjectActions project={featured} />
          </div>
        </article>

        <div className="project-list">
          {secondary.map((project) => (
            <article className="project-entry" key={project.slug}>
              <div className="project-entry__media">
                <ProjectImage project={project} />
                {project.metric && (
                  <div className="project-metric">
                    <strong>{project.metric.value}</strong>
                    <span>{project.metric.label}</span>
                  </div>
                )}
              </div>

              <div className="project-entry__content">
                <div className="project-meta">
                  <span>{project.index}</span>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-summary">{project.summary}</p>
                <ul className="feature-list" aria-label="Principais funcionalidades">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <ProjectDetails project={project} />
                <ul className="stack-list" aria-label="Tecnologias utilizadas">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <ProjectActions project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
