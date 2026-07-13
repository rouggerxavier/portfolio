# Portfólio · Rougger Xavier

Portfólio pessoal de Rougger Xavier, desenvolvedor Full Stack em João Pessoa.
Apresenta aplicações web, APIs, integrações e automações com inteligência
artificial por meio de estudos de caso editoriais.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 para tokens e integração de build
- CSS próprio para layout, responsividade e motion
- OGL para a composição interativa do hero em desktop

O conteúdo principal é HTML semântico e permanece visível sem JavaScript de
animação. O orb é carregado sob demanda apenas em telas com ponteiro preciso e
sem preferência por redução de movimento.

## Estrutura

```text
src/
  components/
    Nav.tsx          navegação desktop e dialog mobile
    Hero.tsx         posicionamento, CTAs e composição RX
    Proof.tsx        prova rápida de capacidade
    Projects.tsx     destaque e estudos de caso editoriais
    Expertise.tsx    três pilares profissionais
    About.tsx        perfil e ferramentas
    Contact.tsx      CTA principal e contatos secundários
    Footer.tsx       rodapé essencial
    Orb.tsx          composição OGL carregada sob demanda
  data/projects.ts   fonte de verdade dos projetos e perfil
  index.css          tokens, layout e estados responsivos
```

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

Não há script `typecheck` separado: `npm run build` executa `tsc -b` antes do
build de produção.

## Conteúdo dos projetos

Cada entrada em `src/data/projects.ts` contém problema, funcionalidades,
responsabilidade, desafio técnico, resultado, tecnologias e links. Métricas só
devem ser incluídas quando houver evidência no repositório do projeto.

As imagens ficam em `public/images/projects/` e devem manter dimensões explícitas
no componente para evitar layout shift.

## SEO e deploy

- Metadata, Open Graph, Twitter Card e JSON-LD: `index.html`
- Sitemap: `public/sitemap.xml`
- Regras de indexação: `public/robots.txt`
- Fallback SPA e cache: `vercel.json` e `public/_redirects`

O build estático é gerado em `dist/` e pode ser publicado na Vercel ou no
Cloudflare Pages.
