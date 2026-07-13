import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../data/projects'

const Orb = lazy(() => import('./Orb'))

export default function Hero() {
  const [enhancedVisual, setEnhancedVisual] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)',
    )
    const sync = () => setEnhancedVisual(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__identity">{profile.name} — Full Stack &amp; IA</p>
          <h1>Transformo ideias em produtos digitais que funcionam de verdade.</h1>
          <p className="hero__description">
            Desenvolvimento de aplicações web, integrações e automações com inteligência
            artificial, do planejamento ao deploy.
          </p>

          <div className="hero__actions" aria-label="Ações principais">
            <a className="button button--primary" href="#projects">
              Ver projetos <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button--secondary"
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Falar sobre um projeto <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="availability">
            <span aria-hidden="true" /> Disponível para projetos selecionados
          </p>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-meta hero__visual-meta--top">RX / 2026</div>
          <div className="hero__orb-shell">
            {enhancedVisual ? (
              <Suspense fallback={<div className="hero__orb-static" />}>
                <Orb
                  hue={0}
                  hoverIntensity={0.16}
                  rotateOnHover
                  forceHoverState={false}
                  backgroundColor="#080808"
                />
              </Suspense>
            ) : (
              <div className="hero__orb-static" />
            )}
            <strong>RX</strong>
          </div>
          <div className="hero__visual-meta hero__visual-meta--bottom">
            FRONTEND / BACKEND / IA
          </div>
        </div>
      </div>
    </section>
  )
}
