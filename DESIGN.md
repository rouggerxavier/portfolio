# DESIGN.md

Lane: **blueprint técnico / Swiss spec-sheet**. Tema **dark** (superfície
quase-preta quente), tinta = foreground claro, acento cinábrio. O site é uma
prancha de desenho técnica viva: rigor de grid e cotas, mão humana no papel.

## Color (OKLCH)

Estratégia: **Committed** — cinábrio carrega o acento; tinta + papel escuro
fazem o resto. Tokens reais em `src/index.css` (`@theme`):

| Role | Token | OKLCH |
|---|---|---|
| Papel (bg) | `--color-paper` | `oklch(0.07 0.002 60)` |
| Papel painel | `--color-paper-2` | `oklch(0.135 0.003 60)` |
| Tinta (fg) | `--color-ink` | `oklch(0.94 0.012 82)` |
| Tinta suave | `--color-ink-soft` | `oklch(0.72 0.012 78)` |
| Acento (cinábrio) | `--color-flame` | `oklch(0.66 0.215 40)` |
| Acento fundo | `--color-flame-deep` | `oklch(0.56 0.19 37)` |
| Linha de grid | `--color-line` | `oklch(0.94 0.012 82 / 0.14)` |

Sem `#000`/`#fff` nos tokens (o body usa `--color-paper`). Sem gradient text.
Cinábrio em ~15-25% da superfície (hover, números, sublinhados, fios), não
neutro tímido. Contraste alto por construção (tinta clara sobre papel escuro).

## Typography

- Display: **Bricolage Grotesque** (700/800). Headlines enormes, tracking apertado.
- Corpo: **Hanken Grotesk** (400/500/600). 65-75ch máx.
- Mono/spec: **Spline Sans Mono** (400/500). Números de índice, cotas, metadata
  do "title block". Uso deliberado (voz de prancha), não costume.
- Escala fluida `clamp()`, ratio ≥1.25. Menor tier de mono ≥11px (legibilidade
  acima da estética de miniatura).

## Layout

- Grid visível como voz (fios finos em `--color-line`, `rule-t`/`rule-b`).
- Assimétrico, left-aligned. Nada de stack centralizado genérico.
- Header: grid 3 colunas (`1fr auto 1fr`) para centrar os links na viewport
  independente da largura das laterais.
- Projetos (Act 3): palco fixado (pin), um projeto por vez, meio a meio —
  captura de um lado, brief do outro. Acima do palco, um **índice persistente**
  (todos os 7 títulos) que salta direto para o dwell de cada projeto no scroll:
  a narrativa é *oferecida*, não forçada.
- Perfil (Act 4): duas colunas de peso igual (Design & Front-end / IA & Back-end)
  como statement — sem percentuais inventados — mais grade de ferramentas e uma
  faixa de números reais (produtos, no ar, ferramentas).
- Title block (rodapé do Contato) com metadata mono, como desenho técnico.

## Motion

- GSAP + Lenis (smooth scroll só em ponteiro fino; touch usa scroll nativo).
- Narrativa em atos, cada reveal casado ao conteúdo: entrada com split headline
  (`words,chars` p/ não quebrar palavra), manifesto que materializa char a char,
  palco de projetos que engole um e traz o próximo, barras/números scrubbed.
- Backdrop ambiente: `DotField` (canvas), lattice de pontos cinábrio→tinta que
  reage ao ponteiro. Não é blob neon (anti-referência explícita).
- Ease-out exponencial. `prefers-reduced-motion` respeitado: o palco fixado vira
  stack estático legível; o índice cai para `scrollIntoView`.

## Bans herdados

gradient text · glassmorphism decorativo · cards idênticos · kickers uppercase
repetidos · side-stripe borders · em dash · percentuais/skill-bars inventados.
