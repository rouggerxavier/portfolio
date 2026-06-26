# Portfólio · Rougger Xavier

Site de portfólio interativo apresentando meus projetos (Grankasa, Feirão da
Construção, MobileTurismo, Alana Lacerda Arquitetos). Foco em motion e 3D para
uma experiência viva.

## Stack

- **Vite + React + TypeScript** — SPA, build estático
- **Tailwind CSS v4** (`@tailwindcss/vite`) — estilo utilitário + tema custom
- **GSAP** (+ ScrollTrigger) — animações de entrada e scroll
- **three.js** via **@react-three/fiber** + **@react-three/drei** — cena 3D de fundo (blob com distorção + estrelas, reativo ao ponteiro)

## Estrutura

```
src/
  components/
    Scene3D.tsx   # fundo three.js (Canvas, blob distorcido, stars)
    Nav.tsx       # navbar com glass ao rolar
    Hero.tsx      # headline animada com GSAP
    Projects.tsx  # grid de projetos, tilt 3D no hover, reveal por scroll
    About.tsx     # bio + stack
    Contact.tsx   # CTA + footer
  data/
    projects.ts   # fonte de verdade dos cards de projeto
  index.css       # tema Tailwind v4 + utilitários (glass, gradient, grain)
  App.tsx
```

## Comandos

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:5173)
npm run build    # build de produção em dist/
npm run preview  # serve o build
```

## Editar projetos

Tudo em `src/data/projects.ts`. Cada projeto tem título, tagline, descrição,
stack, ano, cor de acento e (opcional) link do repositório.

> **TODO:** `MobileTurismo` está com descrição placeholder e sem `repo` — completar
> quando o repositório estiver disponível.
