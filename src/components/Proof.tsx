const capabilities = [
  'Aplicações web completas',
  'APIs e integrações',
  'Automações com IA',
  'Deploy e manutenção',
]

export default function Proof() {
  return (
    <section className="proof" aria-label="Competências principais">
      <div className="section-shell proof__inner">
        {capabilities.map((capability, index) => (
          <div key={capability} className="proof__item">
            <span aria-hidden="true">0{index + 1}</span>
            <strong>{capability}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
