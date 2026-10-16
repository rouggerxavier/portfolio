import { profile, projects, type Project } from './data/projects'

export const SITE = 'https://rouggerxavier.com.br'

export type Meta = {
  title: string
  description: string
  path: string
  image: string
  keywords: string[]
  jsonLd: object[]
}

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  url: SITE,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github],
  address: { '@type': 'PostalAddress', addressRegion: 'PB', addressCountry: 'BR' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal da Paraíba (UFPB)' },
  knowsAbout: ['Web Design', 'UI/UX', 'React', 'TypeScript', 'Python', 'FastAPI', 'RAG', 'Agentes de IA', 'LLM Evals'],
}

// cut at a word boundary so Google doesn't truncate mid-word (~155 chars)
function clip(s: string, max = 155) {
  if (s.length <= max) return s
  return s.slice(0, s.lastIndexOf(' ', max - 1)).replace(/[,.;:—-]+$/, '') + '…'
}

export const homeMeta: Meta = {
  title: 'Rougger Xavier — Web Designer e Engenheiro de IA | Portfólio',
  description:
    'Web designer e engenheiro de IA full-stack na Paraíba. Crio sites, landing pages, agentes de IA e sistemas RAG com React, TypeScript, Python e FastAPI.',
  path: '/',
  image: `${SITE}${projects[0].shot}`,
  keywords: [
    'Rougger Xavier', 'web designer', 'engenheiro de IA', 'desenvolvedor full-stack',
    'desenvolvedor React', 'agentes de IA', 'RAG', 'landing page', 'João Pessoa', 'Paraíba',
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          url: SITE,
          name: `${profile.name} · Portfólio`,
          inLanguage: 'pt-BR',
          publisher: { '@id': `${SITE}/#person` },
        },
        {
          '@type': 'ProfilePage',
          url: SITE,
          mainEntity: { '@id': `${SITE}/#person` },
          hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE}/projeto/${p.slug}` })),
        },
      ],
    },
  ],
}

export function projectMeta(p: Project): Meta {
  const path = `/projeto/${p.slug}`
  return {
    title: `${p.title} — ${p.role} | ${profile.name}`,
    description: clip(p.summary),
    path,
    image: `${SITE}${p.shot && !p.shot.endsWith('.svg') ? p.shot : projects[0].shot}`,
    keywords: [p.title, p.category, ...p.stack, profile.name],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        headline: p.role,
        description: p.summary,
        url: `${SITE}${path}`,
        image: `${SITE}${p.shot}`,
        dateCreated: p.year,
        inLanguage: 'pt-BR',
        keywords: p.stack.join(', '),
        author: person,
        ...(p.live && { sameAs: p.live }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE },
          { '@type': 'ListItem', position: 2, name: p.title, item: `${SITE}${path}` },
        ],
      },
    ],
  }
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** <head> tags for a page. Used at build time (static HTML per route). */
export function headTags(m: Meta) {
  const url = `${SITE}${m.path}`
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="keywords" content="${esc(m.keywords.join(', '))}" />`,
    `<meta name="author" content="${profile.name}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${m.path === '/' ? 'website' : 'article'}" />`,
    `<meta property="og:site_name" content="${profile.name} · Portfólio" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    ...m.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ')
}

/**
 * Plain semantic HTML of the page, placed inside #root at build time so
 * crawlers that don't run JS (GPTBot, ClaudeBot, PerplexityBot, link previews)
 * read real content. React's createRoot replaces it on mount.
 */
export function bodyHtml(p?: Project) {
  const list = (xs: string[]) => `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
  if (p) {
    return `<main class="seo-static"><nav><a href="/">${profile.name}</a> / <a href="/#index">Projetos</a></nav>
<h1>${esc(p.title)}</h1><p>${esc(p.role)} · ${esc(p.category)} · ${p.year}</p>
<p>${esc(p.summary)}</p>
<h2>Problema</h2><p>${esc(p.problem)}</p>
<h2>Funcionalidades</h2>${list(p.features)}
<h2>Responsabilidade</h2><p>${esc(p.responsibility)}</p>
<h2>Desafio</h2><p>${esc(p.challenge)}</p>
<h2>Resultado</h2><p>${esc(p.outcome)}</p>
<h2>Stack</h2>${list(p.stack)}
${p.live ? `<p><a href="${p.live}">Ver ao vivo</a></p>` : ''}${p.repo ? `<p><a href="${p.repo}">Código no GitHub</a></p>` : ''}
</main>`
  }
  return `<main class="seo-static"><h1>${profile.name} — ${profile.role}</h1>
<p>${esc(homeMeta.description)}</p>
<h2>Projetos</h2><ul>${projects
    .map((x) => `<li><a href="/projeto/${x.slug}">${esc(x.title)}</a> — ${esc(x.role)}. ${esc(x.summary)}</li>`)
    .join('')}</ul>
<h2>Contato</h2><p><a href="mailto:${profile.email}">${profile.email}</a> · <a href="${profile.github}">GitHub</a></p>
</main>`
}

/** Client-side: keep title/description/canonical in sync on SPA navigation. */
export function applyMeta(m: Meta) {
  document.title = m.title
  const set = (sel: string, attr: string, val: string) => document.querySelector(sel)?.setAttribute(attr, val)
  set('meta[name="description"]', 'content', m.description)
  set('link[rel="canonical"]', 'href', `${SITE}${m.path}`)
  set('meta[property="og:url"]', 'content', `${SITE}${m.path}`)
  set('meta[property="og:title"]', 'content', m.title)
  set('meta[property="og:description"]', 'content', m.description)
}

/** llms.txt (https://llmstxt.org) */
export function llmsTxt() {
  return `# ${profile.name} — ${profile.role}

> ${homeMeta.description}

${profile.name} estuda ${profile.study} na ${profile.school} (${profile.location}). Trabalha com design de interface, front-end com motion e IA aplicada (RAG, agentes, evals) com back-end em Python/FastAPI. Contato: ${profile.email} · WhatsApp ${profile.phoneLabel}.

## Projetos

${projects.map((p) => `- [${p.title}](${SITE}/projeto/${p.slug}): ${p.role}. ${clip(p.summary, 200)} Stack: ${p.stack.join(', ')}.`).join('\n')}

## Links

- [Portfólio](${SITE}/)
- [GitHub](${profile.github})
`
}

export function sitemapXml(lastmod: string) {
  const urls = ['/', ...projects.map((p) => `/projeto/${p.slug}`)]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((u) => {
    const p = projects.find((x) => `/projeto/${x.slug}` === u)
    const imgs = p?.shot ? [p.shot] : []
    return `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${lastmod}</lastmod>${imgs.map((i) => `\n    <image:image><image:loc>${SITE}${i}</image:loc></image:image>`).join('')}
  </url>`
  })
  .join('\n')}
</urlset>
`
}
