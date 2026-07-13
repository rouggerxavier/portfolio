const pillars = [
  {
    title: 'Aplicações web completas',
    description:
      'Sites, plataformas e sistemas responsivos, com interfaces rápidas, integrações reais e estrutura preparada para crescer.',
    scope: ['Interfaces e experiência', 'Front-end responsivo', 'Fluxos de conversão'],
  },
  {
    title: 'Automações e integrações com IA',
    description:
      'Automações que organizam dados, reduzem tarefas manuais e conectam inteligência artificial aos processos da empresa.',
    scope: ['Agentes e RAG', 'Guardrails e avaliações', 'Integrações de processos'],
  },
  {
    title: 'APIs, dados e infraestrutura',
    description:
      'APIs, bancos de dados, integrações externas, deploy, monitoramento e manutenção da aplicação.',
    scope: ['APIs e bancos de dados', 'Pipelines e integrações', 'Deploy e observabilidade'],
  },
]

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="section-shell">
        <div className="section-heading">
          <p>Como posso contribuir</p>
          <h2>Uma visão completa do produto, organizada em três pilares.</h2>
        </div>

        <ol className="pillars">
          {pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <span className="pillars__number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
              <ul aria-label={`Escopo de ${pillar.title}`}>
                {pillar.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
