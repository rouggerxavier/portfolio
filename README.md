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

Tudo em `src/data/projects.ts`. Cada projeto tem índice, título, role, categoria,
ano, resumo, stack, e (opcional) `repo`, `live`, `status` e `shot` (screenshot).

### Screenshots dos sites

Os cards mostram capturas reais dos sites em `public/images/projects/<slug>.jpg`,
como imagem editorial (zoom no hover, tag "Ver live"). Para regerar, rode um
Playwright apontando para cada `live` (viewport ~1366x854, esperar o intro do
site assentar) e salve com o nome do slug.

> Projetos sem `live` (ex.: Aurora) usam um tile com o número do índice + link do
> repositório. `projeto-alana` e `mobileturismo` usam links `*.pages.dev`
> (Cloudflare) por ora; trocar por domínio próprio quando disponível em `live`.

## Deploy

Build estático em `dist/` (SPA de página única). Funciona em qualquer host estático.

**Cloudflare Pages** (mesmo dos outros projetos)
- Build command: `npm run build`
- Output directory: `dist`
- `public/_redirects` já faz o fallback SPA (`/* /index.html 200`).

**Vercel**
- `vercel.json` já define framework, build, output, rewrites e cache dos assets.
- Ou via CLI: `vercel --prod`.

Local: `npm run build && npm run preview`.
