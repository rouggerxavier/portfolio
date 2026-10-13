import { mkdirSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects'
import { bodyHtml, headTags, homeMeta, llmsTxt, projectMeta, sitemapXml } from './src/seo'

// Static SEO: per-route HTML (head + crawlable body), sitemap.xml, llms.txt, 404.html.
function seo(): Plugin {
  let template = ''
  const render = (head: string, body: string) =>
    template.replace('<!--seo-head-->', head).replace('<!--seo-body-->', body)
  return {
    name: 'seo-static',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html
        return render(headTags(homeMeta), bodyHtml())
      },
    },
    closeBundle() {
      const out = 'dist'
      // projeto/<slug>.html, not <slug>/index.html: Pages would 308 to a trailing slash
      mkdirSync(`${out}/projeto`, { recursive: true })
      for (const p of projects) {
        writeFileSync(`${out}/projeto/${p.slug}.html`, render(headTags(projectMeta(p)), bodyHtml(p)))
      }
      const notFound = { ...homeMeta, title: 'Página não encontrada | Rougger Xavier', jsonLd: [] }
      writeFileSync(
        `${out}/404.html`,
        render(headTags(notFound).replace('index, follow, max-image-preview:large', 'noindex'), ''),
      )
      writeFileSync(`${out}/sitemap.xml`, sitemapXml(new Date().toISOString().slice(0, 10)))
      writeFileSync(`${out}/llms.txt`, llmsTxt())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
})
