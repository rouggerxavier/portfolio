export type Project = {
  index: string
  slug: string
  title: string
  role: string
  category: string
  year: string
  summary: string
  stack: string[]
  repo?: string
  live?: string
  status?: string
  shot?: string
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'grankasa',
    title: 'Grankasa',
    role: 'Agente imobiliário conversacional',
    category: 'Real estate / IA',
    year: '2026',
    summary:
      'Plataforma imobiliária com catálogo, busca de imóveis e chat de agente com streaming SSE. Integração de catálogo Loft/Vista atrás de flag, observabilidade segura do agente e persistência híbrida SQLite/Postgres.',
    stack: ['React', 'Vite', 'shadcn/ui', 'Python', 'SSE', 'PostgreSQL'],
    live: 'https://grankasa.com',
    repo: 'https://github.com/rouggerxavier/Grankasa',
    shot: '/images/projects/grankasa.jpg',
  },
  {
    index: '02',
    slug: 'projeto-alana',
    title: 'Alana Lacerda Arquitetos',
    role: 'Portfólio de arquitetura',
    category: 'Brand / Landing',
    year: '2026',
    summary:
      'Portfólio para arquiteta com grid de projetos filtrável, pipeline de imagens em WebP e contato direto via WhatsApp. Build estático, sem backend nem CMS.',
    stack: ['React', 'Vite', 'TypeScript', 'WebP pipeline'],
    live: 'https://projeto-alana.pages.dev',
    repo: 'https://github.com/rouggerxavier/projeto-alana',
    shot: '/images/projects/projeto-alana.jpg',
  },
  {
    index: '03',
    slug: 'docops',
    title: 'DocOps Agent',
    role: 'Assistente RAG para documentos',
    category: 'AI Engineering / RAG',
    year: '2026',
    summary:
      'Assistente RAG que transforma documentos longos em fluxos úteis: ingestão, chat, resumos, planos de estudo, flashcards, tarefas e calendário. Orquestração com LangGraph, recuperação híbrida Chroma + BM25.',
    stack: ['FastAPI', 'LangGraph', 'Chroma', 'BM25', 'React', 'TypeScript', 'Docker'],
    live: 'https://doc-ops-agent.vercel.app/',
    repo: 'https://github.com/rouggerxavier/DocOps_Agent',
    shot: '/images/projects/docops.jpg',
  },
  {
    index: '04',
    slug: 'evalops',
    title: 'EvalOps Studio',
    role: 'Cockpit de LLMOps',
    category: 'LLMOps / Evals',
    year: '2026',
    summary:
      'Plataforma de observabilidade para LLMs: ingestão de traces, avaliações por rubricas, workflows de prompts, datasets e experimentos, feedback humano e exportação JSONL. Monorepo API + Web + SDK Python.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'SDK Python', 'SQLAlchemy', 'Alembic'],
    live: 'https://eval-ops-web.vercel.app/',
    repo: 'https://github.com/rouggerxavier/EvalOps',
    shot: '/images/projects/evalops.jpg',
  },
  {
    index: '05',
    slug: 'feirao',
    title: 'Feirão da Construção',
    role: 'Catálogo + orçamento via WhatsApp',
    category: 'E-commerce / MVP',
    year: '2026',
    summary:
      'MVP de catálogo com lista de orçamento e conversão por WhatsApp, sem checkout. Pipeline offline de ingestão de planilhas para JSON normalizado. Cobertura unit, integração e E2E.',
    stack: ['Next.js', 'TypeScript', 'Tailwind v4', 'Zustand', 'Zod', 'Playwright'],
    live: 'https://feiraodaconstrucao.com.br',
    repo: 'https://github.com/rouggerxavier/feirao',
    shot: '/images/projects/feirao.jpg',
  },
  {
    index: '06',
    slug: 'aurora',
    title: 'Aurora Support AI',
    role: 'Atendimento e-commerce com IA',
    category: 'AI / Fine-tuning',
    year: '2026',
    summary:
      'Atendimento de e-commerce com IA: backend FastAPI, guardrails, rate limiting, avaliação offline e evolução para pipeline de fine-tuning sobre Vertex AI / Gemini. Repositório público de portfólio.',
    stack: ['Python', 'FastAPI', 'Vertex AI', 'Gemini', 'Evals', 'Playwright', 'CI/CD'],
    repo: 'https://github.com/rouggerxavier/e-commerce_fine_tuning',
    status: 'open source',
  },
  {
    index: '07',
    slug: 'mobileturismo',
    title: 'MobileTurismo',
    role: 'Fretamento de ônibus & turismo',
    category: 'Site / Turismo',
    year: '2026',
    summary:
      'Site para empresa de fretamento de ônibus, micro-ônibus e vans em João Pessoa, voltado a turismo, eventos e transporte corporativo. Hero imersivo, seções de frota e captação de orçamento direto pelo WhatsApp.',
    stack: ['Web', 'Landing page', 'Responsivo', 'WhatsApp'],
    live: 'https://mobileturismo.pages.dev',
    shot: '/images/projects/mobileturismo.jpg',
  },
]

export const profile = {
  name: 'Rougger Xavier',
  role: 'Web Designer & Full-stack Developer',
  study: 'Ciência de Dados & IA — UFPB',
  location: 'Paraíba, Brasil',
  email: 'rouggerxavier@hotmail.com',
  github: 'https://github.com/rouggerxavier',
}

export const focus = [
  { label: 'UI/UX & Web Design', pct: 35 },
  { label: 'Front-end & Motion', pct: 30 },
  { label: 'Back-end & APIs', pct: 20 },
  { label: 'IA aplicada & Dados', pct: 15 },
]

export const capabilities = [
  'UI/UX', 'Web Design', 'Design Systems', 'Motion', 'GSAP', 'three.js',
  'React', 'Next.js', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Acessibilidade',
  'Responsivo', 'Node.js', 'FastAPI', 'RAG',
]
