import ScrollExpand from './ScrollExpand'
import { projects } from '../data/projects'

const SHOTS = ['grankasa', 'projeto-alana', 'feirao', 'evalops']
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p?.shot)

// Act 1.5: after the hero sheet comes apart, a frame of real project captures
// opens up to full bleed and hands off to the index.
export default function Showcase() {
  return (
    <section aria-label="Projetos em destaque">
      <ScrollExpand
        useWindowScroll
        smoothing={0} // Lenis already smooths the page scroll
        title={<span className="font-display font-extrabold">Do conceito ao deploy</span>}
        scrollHint="ROLE ↓"
        overlayScrim={1}
        className="showcase font-mono"
        media={
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-paper">
            {SHOTS.map((p) => (
              <img
                key={p!.slug}
                src={p!.shot}
                alt=""
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        }
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink">
          {projects.length} projetos <span className="text-flame">●</span> web &amp; IA
        </p>
        <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Trabalho real, <span className="text-flame">no ar.</span>
        </h2>
        <a
          href="#index"
          className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-flame focus-visible:bg-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          data-hot
        >
          Ver o trabalho
        </a>
      </ScrollExpand>
    </section>
  )
}
