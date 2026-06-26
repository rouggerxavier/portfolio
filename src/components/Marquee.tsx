const items = [
  'Web Design',
  'UI/UX',
  'Motion',
  'Front-end',
  'IA aplicada',
  'RAG & Agentes',
  'Back-end & APIs',
  'Design Systems',
]

export default function Marquee() {
  const strip = (
    <div className="flex shrink-0 items-center gap-10 px-5" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            {it}
          </span>
          <span className="text-flame">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="rule-t rule-b overflow-hidden py-6">
      <div className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none">
        {strip}
        {strip}
      </div>
    </section>
  )
}
