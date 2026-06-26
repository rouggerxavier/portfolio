# DESIGN.md

Lane: **blueprint técnico / Swiss spec-sheet**. Tema claro, papel quente.

## Color (OKLCH)

Estratégia: **Committed** — cinábrio carrega o acento; tinta + papel fazem o resto.

| Role | Token | OKLCH |
|---|---|---|
| Papel (bg) | `--color-paper` | `oklch(0.966 0.008 78)` |
| Papel painel | `--color-paper-2` | `oklch(0.932 0.011 78)` |
| Tinta | `--color-ink` | `oklch(0.205 0.014 62)` |
| Tinta suave | `--color-ink-soft` | `oklch(0.46 0.012 62)` |
| Acento (cinábrio) | `--color-flame` | `oklch(0.605 0.205 38)` |
| Acento fundo | `--color-flame-deep` | `oklch(0.5 0.18 36)` |
| Linha de grid | `--color-line` | `oklch(0.205 0.014 62 / 0.16)` |

Sem `#000`/`#fff`. Sem gradient text. Cinábrio em ~15-25% da superfície (hover,
números, sublinhados, fios), não neutro tímido.

## Typography

- Display: **Bricolage Grotesque** (700/800). Headlines enormes, tracking apertado.
- Corpo: **Hanken Grotesk** (400/500/600). 65-75ch máx.
- Mono/spec: **Spline Sans Mono** (400/500). Números de índice, cotas, metadata
  do "title block". Uso deliberado (voz de prancha), não costume.
- Escala fluida `clamp()`, ratio ≥1.25.

## Layout

- Grid visível como voz (fios verticais/horizontais finos em `--color-line`).
- Assimétrico, left-aligned. Nada de stack centralizado genérico.
- Projetos = índice de prancha: linhas numeradas que expandem no hover, não cards.
- Title block (canto inferior) com metadata mono, como desenho técnico.

## Motion

- GSAP: entrada coreografada (split headline, stagger), ScrollTrigger reveals,
  índice que expande, botões/links magnéticos, cursor custom com estado.
- three.js: estrutura wireframe em tinta (não blob neon), reativa ao ponteiro.
- Ease-out exponencial. `prefers-reduced-motion` respeitado.

## Bans herdados

gradient text · glassmorphism decorativo · cards idênticos · kickers uppercase
repetidos · side-stripe borders · em dash.
