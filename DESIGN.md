---
name: "Rougger Xavier — Índice aberto"
description: "Branco, tinta e azul de link; a foto do projeto é o que abre."
colors:
  rx: "#1f3bff"
  ink: "#0e1014"
  ink-soft: "#4b4f58"
  paper: "#ffffff"
  line: "#0e101433"
typography:
  family: "Inter Tight"
  display: { fontSize: "clamp(52px,10.4vw,168px)", fontWeight: 700, lineHeight: ".94", letterSpacing: "-.04em" }
  row: { fontSize: "clamp(38px,7.4vw,112px)", fontWeight: 500, letterSpacing: "-.04em" }
  body: { fontSize: "17px", fontWeight: 400, lineHeight: 1.5 }
---

# DESIGN.md

Referência declarada: jozue.fr. Fundo branco, grotesca pesada e apertada, um cartaz de `://` atrás dos títulos no lugar da assinatura.

## Cor

- `rx`: acento único do site. `rx://` é um endereço, então o azul é o de link. Trocar a marca é trocar `--color-rx`.
- Cada projeto tem `tone` em `src/data/projects.ts`, usado no painel e no bloco da captura. Precisa de 4.5:1 com branco.
- Marca: letras em `currentColor`, `://` em `--mark-accent`.

## Índice

Linhas sempre fechadas. O cursor ou o foco abre a faixa a partir da linha central, 12% além da linha em cima e embaixo, sem empurrar as vizinhas; em toque não há estado aberto, o toque já abre o projeto. O `crop` de cada projeto escolhe uma área da captura sem texto, para não brigar com o nome. Capturas só de interface usam `tint`.

## Motion

Um momento autoral: a foto que abre. GSAP, `power4.inOut` em 0.62s, alinhada ao pixel com a linha (`alignToRow`). Depois, o painel desce sobre a foto com `expo.out`. Com `prefers-reduced-motion`, tudo aparece sem movimento e o clique só navega.

## Regras

Sem kicker, sem numeração de seção, sem cards, sem texto em mono. Divisórias pontilhadas de 1px.
