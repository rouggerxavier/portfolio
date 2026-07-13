# Portfólio · Rougger Xavier

Site de portfólio como experiência scroll-driven: uma narrativa contínua do
hero ao contato, coreografada com GSAP ScrollTrigger (seções pinadas, texto
revelado letra a letra pelo scroll, showcase de um projeto por vez e uma barra
de rolagem própria no idioma de régua técnica).

## Stack

- **Vite + React + TypeScript** — SPA, build estático
- **Tailwind CSS v4** (`@tailwindcss/vite`) — estilo utilitário + tema custom
- **GSAP 3.15** (ScrollTrigger, SplitText, ScrollTo via `src/lib/gsap.ts`) — toda a coreografia de scroll
- **Lenis** — smooth scroll em ponteiros finos (touch usa scroll nativo)

## Estrutura

```
src/
  lib/
    gsap.ts         # registro central de plugins + query MOTION_OK
  components/
    Background.tsx  # dot lattice de fundo (DotField, canvas)
    Cursor.tsx      # cursor custom (mira de desenhista)
    Intro.tsx       # overlay de carregamento (contador + barra)
    Nav.tsx         # navbar fixa
    ScrollRail.tsx  # scrollbar custom: régua, progresso, estações clicáveis
    Hero.tsx        # ato 1: pin + SplitText; o scrub desmonta a prancha
    Manifesto.tsx   # ato 2: pin; chars saem da escuridão (blur + profundidade)
    Marquee.tsx     # faixa que se move apenas com o scroll (scrub)
    Projects.tsx    # ato 3: showcase pinado meio a meio; a foto mergulha no escuro e a próxima emerge
    About.tsx       # ato 4: barras de foco scrubadas, grid em batch
    Contact.tsx     # ato 5: convite inkado por chars + canais diretos
  pages/
    Home.tsx        # rota / (a narrativa completa)
    Project.tsx     # rota /projeto/:slug (estudo de caso scroll-driven)
  data/
    projects.ts     # fonte de verdade dos projetos e do perfil
  index.css         # tema Tailwind v4, trilha horizontal, fallbacks
  App.tsx           # Lenis + refresh do ScrollTrigger + composição
```

Acessibilidade de movimento: toda a coreografia vive atrás de
`prefers-reduced-motion: no-preference` (via `gsap.matchMedia`). Com redução de
movimento, o documento fica estático e o showcase de projetos empilha na
vertical (fallback em CSS).

## Comandos

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:5173)
npm run lint     # oxlint
npm run build    # tsc -b + build de produção em dist/
npm run preview  # serve o build
```

## Estudos de caso

Cada projeto tem um endpoint em `/projeto/<slug>` (React Router; o fallback SPA
de `public/_redirects` cobre o refresh). A galeria "Registros do projeto" exibe
placeholders até existirem capturas reais em
`public/images/projects/<slug>/g1.jpg` … `g5.jpg` (basta subir os arquivos; a
página troca sozinha, sem mudança de código).

## Editar projetos

Tudo em `src/data/projects.ts`. Cada projeto tem índice, título, role, categoria,
ano, resumo, stack, e (opcional) `repo`, `live`, `status` e `shot` (screenshot).

### Screenshots dos sites

Os painéis mostram capturas reais dos sites em `public/images/projects/<slug>.jpg`.
Para regerar, rode um Playwright apontando para cada `live` (viewport ~1366x854,
esperar o intro do site assentar) e salve com o nome do slug.

> Projetos sem `live` (ex.: Aurora) apontam para o repositório. `projeto-alana`
> e `mobileturismo` usam links `*.pages.dev` (Cloudflare) por ora; trocar por
> domínio próprio quando disponível em `live`.

## Deploy

Build estático em `dist/` (SPA de página única). Funciona em qualquer host estático.

**Cloudflare Pages** (projeto `portfolio`, ver `wrangler.toml`)

```bash
npm run build
npx wrangler pages deploy dist --branch <branch>   # preview por branch
```

- `public/_redirects` já faz o fallback SPA (`/* /index.html 200`).

**Vercel**
- `vercel.json` já define framework, build, output, rewrites e cache dos assets.

Local: `npm run build && npm run preview`.
