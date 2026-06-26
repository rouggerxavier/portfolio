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
}

export const projects: Project[] = [
  {
    index: '01',
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
  },
  {
    index: '02',
    slug: 'grankasa',
    title: 'Grankasa',
    role: 'Agente imobiliário conversacional',
    category: 'Real estate / IA',
    year: '2026',
    summary:
      'Plataforma imobiliária com catálogo, busca de imóveis e chat de agente com streaming SSE. Integração de catálogo Loft/Vista atrás de flag, observabilidade segura do agente e persistência híbrida SQLite/Postgres.',
    stack: ['React', 'Vite', 'shadcn/ui', 'Python', 'SSE', 'PostgreSQL'],
    live: 'https://grankasa.vercel.app/',
    repo: 'https://github.com/rouggerxavier/Grankasa',
  },
  {
    index: '03',
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
  },
  {
    index: '04',
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
    index: '05',
    slug: 'feirao',
    title: 'Feirão da Construção',
    role: 'Catálogo + orçamento via WhatsApp',
    category: 'E-commerce / MVP',
    year: '2026',
    summary:
      'MVP de catálogo com lista de orçamento e conversão por WhatsApp, sem checkout. Pipeline offline de ingestão de planilhas para JSON normalizado. Cobertura unit, integração e E2E.',
    stack: ['Next.js', 'TypeScript', 'Tailwind v4', 'Zustand', 'Zod', 'Playwright'],
    live: 'https://feiraodaconstrucao.com.br/',
    repo: 'https://github.com/rouggerxavier/feirao',
  },
  {
    index: '06',
    slug: 'crm-feirao',
    title: 'CRM Feirão',
    role: 'CRM comercial B2B com WhatsApp',
    category: 'B2B / CRM',
    year: '2026',
    summary:
      'CRM para fluxo comercial via WhatsApp: catálogo inteligente, pré-orçamento com handoff humano obrigatório, gestão de leads, timeline de eventos, follow-up e opt-out. Integração Evolution API com agente LLM.',
    stack: ['TypeScript', 'Evolution API', 'LLM', 'CSV pipeline'],
    repo: 'https://github.com/rouggerxavier/CRM_feirao',
    status: 'case privado',
  },
  {
    index: '07',
    slug: 'mobileturismo',
    title: 'MobileTurismo',
    role: 'Aplicação de turismo mobile',
    category: 'Mobile / Travel',
    year: '2026',
    summary:
      'Aplicação de turismo focada em experiência mobile, descoberta de pontos e roteiros. Detalhes técnicos a completar; repositório a vincular.',
    stack: ['React Native', 'Mobile', 'Maps'],
    status: 'em construção',
  },
  {
    index: '08',
    slug: 'projeto-alana',
    title: 'Alana Lacerda Arquitetos',
    role: 'Portfólio de arquitetura',
    category: 'Brand / Landing',
    year: '2026',
    summary:
      'Portfólio para arquiteta com grid de projetos filtrável, pipeline de imagens em WebP e contato direto via WhatsApp. Build estático, sem backend nem CMS.',
    stack: ['React', 'Vite', 'TypeScript', 'WebP pipeline'],
    repo: 'https://github.com/rouggerxavier/projeto-alana',
  },
]

export const profile = {
  name: 'Rougger Xavier',
  role: 'AI Engineer & Full-stack Developer',
  study: 'Ciência de Dados & IA — UFPB',
  location: 'Paraíba, Brasil',
  email: 'rougger.xavier.1anob@gmail.com',
  github: 'https://github.com/rouggerxavier',
}

export const focus = [
  { label: 'AI Engineering & RAG', pct: 35 },
  { label: 'Backend & APIs', pct: 25 },
  { label: 'Frontend / Product UX', pct: 20 },
  { label: 'Data / LLMOps & Evals', pct: 20 },
]

export const capabilities = [
  'RAG', 'Agentes', 'Fine-tuning', 'Evals', 'FastAPI', 'LangGraph',
  'React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind', 'Vertex AI',
  'Gemini', 'Docker', 'PostgreSQL', 'CI/CD',
]
