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
  /** short punch line shown on the detail hero */
  tagline?: string
  /** long-form description; paragraphs separated by blank lines */
  overview?: string[]
  /** key technical / product highlights for the detail page */
  highlights?: string[]
  /** desktop captures shown in the detail gallery */
  gallery?: string[]
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'grankasa',
    title: 'Grankasa',
    role: 'Plataforma imobiliária com agente de IA',
    category: 'Real estate / IA',
    year: '2026',
    summary:
      'Comprar imóvel trava em catálogos gigantes e formulários sem fim. Aqui um agente de IA conversa em linguagem natural, busca no acervo em tempo real e responde com streaming, como um corretor que conhece cada imóvel. Persistência híbrida e observabilidade do agente prontas para produção.',
    stack: ['React', 'Vite', 'shadcn/ui', 'Python', 'SSE', 'PostgreSQL'],
    live: 'https://grankasa.com',
    repo: 'https://github.com/rouggerxavier/Grankasa',
    shot: '/images/projects/grankasa.jpg',
    gallery: [
      '/images/projects/grankasa/01.webp',
      '/images/projects/grankasa/02.webp',
      '/images/projects/grankasa/03.webp',
      '/images/projects/grankasa/04.webp',
    ],
    tagline: 'Catálogo de imóveis e um agente que faz a triagem do lead — não roteirizado.',
    overview: [
      'Grankasa é uma plataforma imobiliária de ponta a ponta: catálogo de imóveis, busca, contato e um agente conversacional que faz triagem do lead sobre um backend FastAPI. O frontend é React + Vite + shadcn/ui; a API expõe catálogo, contato e o chat do agente.',
      'O agente da Fase 1 responde em web chat via POST /agent/chat com streaming SSE quando o cliente pede text/event-stream. A arquitetura alvo é um agente adaptativo — sem respostas hardcoded, sem listas de bairros no código, sem templates únicos — com handoff para humano cujo telefone vem de env/config, e fallback de UX diferenciado no frontend para falha de IA, rede e sessão inválida.',
      'A integração de catálogo Loft/Vista já existe no backend, read-only, atrás do flag PUBLIC_CATALOG_SOURCE (default legacy); o push de leads é dry-run por enquanto. Persistência é híbrida SQLite/Postgres + JSON, com observabilidade segura do agente que nunca vaza prompt bruto nos logs.',
    ],
    highlights: [
      'Chat de agente com streaming SSE (POST /agent/chat)',
      'Integração Loft/Vista atrás de feature flag (PUBLIC_CATALOG_SOURCE)',
      'Persistência híbrida SQLite/Postgres + JSON',
      'Observabilidade segura do agente, sem vazar prompt bruto',
      'Fallback de UX separado para falha de IA, rede e sessão inválida',
    ],
  },
  {
    index: '02',
    slug: 'projeto-alana',
    title: 'Alana Lacerda Arquitetos',
    role: 'Portfólio que vira canal de clientes',
    category: 'Brand / Landing',
    year: '2026',
    summary:
      'Uma arquiteta precisa que o trabalho fale por si e traga clientes, sem CMS para manter. Portfólio filtrável, imagens otimizadas em WebP e contato direto no WhatsApp. Site estático: carrega rápido, custa quase nada para rodar e não quebra.',
    stack: ['React', 'Vite', 'TypeScript', 'WebP pipeline'],
    live: 'https://projeto-alana.pages.dev',
    repo: 'https://github.com/rouggerxavier/projeto-alana',
    shot: '/images/projects/projeto-alana.jpg',
    gallery: [
      '/images/projects/projeto-alana/01.webp',
      '/images/projects/projeto-alana/02.webp',
      '/images/projects/projeto-alana/03.webp',
      '/images/projects/projeto-alana/04.webp',
    ],
    tagline: 'Um portfólio de arquitetura que trata as fotos como o produto.',
    overview: [
      'Landing/portfólio estático para uma arquiteta, partindo de um mock exportado do Stitch e reorganizado como projeto frontend real em React + Vite + TypeScript. A grid de projetos é filtrável e as fotos reais de cada obra são o centro da experiência.',
      'As imagens passam por um pipeline offline (npm run prepare:images) que extrai os ZIPs originais, converte para WebP e regenera um manifesto tipado consumido pela grid — nada de otimização manual nem CMS em runtime.',
      'O contato acontece pela rota /contato: o formulário monta uma mensagem de briefing e encaminha o atendimento por wa.me para o WhatsApp real, sem backend. Build 100% estático, servido no Cloudflare Pages.',
    ],
    highlights: [
      'Grid de projetos filtrável por categoria',
      'Pipeline offline de imagens → WebP com manifesto gerado',
      'Formulário de briefing que converte via WhatsApp (wa.me)',
      'Build estático, sem backend nem CMS',
    ],
  },
  {
    index: '03',
    slug: 'docops',
    title: 'DocOps Agent',
    role: 'Documentos longos viram ação',
    category: 'AI Engineering / RAG',
    year: '2026',
    summary:
      'Documentos densos escondem respostas que ninguém tem tempo de procurar. O DocOps transforma cada arquivo em chat, resumos, planos de estudo, flashcards e tarefas. Recuperação híbrida para respostas que citam a fonte, orquestradas com LangGraph.',
    stack: ['FastAPI', 'LangGraph', 'Chroma', 'BM25', 'React', 'TypeScript', 'Docker'],
    live: 'https://doc-ops-agent.vercel.app/',
    repo: 'https://github.com/rouggerxavier/DocOps_Agent',
    shot: '/images/projects/docops.jpg',
    gallery: [
      '/images/projects/docops/01.webp',
      '/images/projects/docops/02.webp',
      '/images/projects/docops/03.webp',
      '/images/projects/docops/04.webp',
    ],
    tagline: 'Documentos longos viram chat, resumos, flashcards e tarefas — com fonte.',
    overview: [
      'DocOps Agent é um assistente RAG para fluxos de documento: ingestão, chat, resumos, artefatos, planos de estudo, tarefas, notas, flashcards e apoio de calendário. O backend é FastAPI + SQLAlchemy + LangGraph com recuperação híbrida Chroma (vetorial) + BM25 (léxica); o frontend é React + TypeScript + Vite.',
      'A orquestração em LangGraph coordena os passos de recuperação e geração para que as respostas citem a fonte, em vez de alucinar sobre o documento. A API vive sob o prefixo /api, com docs interativas em /api/docs-ui e health/ready para operação.',
      'Autenticação por JWT e inferência via Gemini; o repositório traz Docker e helper scripts para subir backend e frontend localmente.',
    ],
    highlights: [
      'Recuperação híbrida Chroma (vetorial) + BM25 (léxica)',
      'Orquestração de passos com LangGraph',
      'Ingestão de PDF/Word/texto e geração de artefatos (resumos, flashcards, planos)',
      'Respostas que citam a fonte',
      'API FastAPI sob /api com docs e health/ready',
    ],
  },
  {
    index: '04',
    slug: 'evalops',
    title: 'EvalOps Studio',
    role: 'Controle para LLMs em produção',
    category: 'LLMOps / Evals',
    year: '2026',
    summary:
      'Colocar um LLM em produção sem medir é apostar no escuro. O EvalOps reúne traces, avaliação por rubricas, datasets e experimentos num só cockpit. SDK Python para instrumentar qualquer app e exportação para auditar cada resposta.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'SDK Python', 'SQLAlchemy', 'Alembic'],
    live: 'https://eval-ops-web.vercel.app/',
    repo: 'https://github.com/rouggerxavier/EvalOps',
    shot: '/images/projects/evalops.jpg',
    gallery: [
      '/images/projects/evalops/01.webp',
      '/images/projects/evalops/02.webp',
      '/images/projects/evalops/03.webp',
      '/images/projects/evalops/04.webp',
    ],
    tagline: 'Um cockpit denso e opinativo para observar e avaliar LLMs.',
    overview: [
      'EvalOps Studio é um cockpit de LLMOps: observabilidade de traces, avaliações baseadas em rubricas, workflows de prompts e experimentos, e feedback humano — opinativo, dark e denso. É um monorepo com API FastAPI + SQLAlchemy + Alembic, Web em Next.js 14 (App Router, Server Components e Server Actions, CSS puro) e um SDK evalops-python.',
      'O produto foi entregue em fases: identidade/orgs/projetos e API keys, ingestão de traces via SDK, dashboard de traces (overview/lista/detalhe), rubricas e avaliações síncronas, prompts/datasets/experimentos, feedback/exports/quota e endurecimento de MVP.',
      'A fase atual é uma refatoração interna 1:1 com o preview cockpit, adicionando endpoints de attention, coverage, sdk-status, flags de trace, rerun/compare, notificações, RAG consolidado, resumo de avaliação e listagem de exports. Sem Tailwind nem CSS-in-JS: apenas CSS puro e lucide-react.',
    ],
    highlights: [
      'Ingestão de traces via SDK Python (evalops-python)',
      'Avaliações por rubricas + resumo de avaliação',
      'Prompts, datasets e experimentos com comparação',
      'Feedback humano e exportação JSONL',
      'Monorepo API + Web (Next.js 14) + SDK, CSS puro',
    ],
  },
  {
    index: '05',
    slug: 'feirao',
    title: 'Feirão da Construção',
    role: 'Catálogo que vende pelo WhatsApp',
    category: 'E-commerce / MVP',
    year: '2026',
    summary:
      'Nem toda loja precisa de checkout completo para começar a vender. Catálogo com lista de orçamento que fecha direto no WhatsApp, alimentado por um pipeline que vira planilha em dados limpos. Coberto por testes unit, integração e E2E.',
    stack: ['Next.js', 'TypeScript', 'Tailwind v4', 'Zustand', 'Zod', 'Playwright'],
    live: 'https://feiraodaconstrucao.com.br',
    repo: 'https://github.com/rouggerxavier/feirao',
    shot: '/images/projects/feirao.jpg',
    gallery: [
      '/images/projects/feirao/01.webp',
      '/images/projects/feirao/02.webp',
      '/images/projects/feirao/03.webp',
      '/images/projects/feirao/04.webp',
    ],
    tagline: 'Catálogo + lista de orçamento que converte pelo WhatsApp — sem checkout.',
    overview: [
      'MVP orientado a catálogo + lista de orçamento + conversão via WhatsApp, sem checkout e sem banco de dados em runtime. Next.js (App Router) + React + TypeScript + Tailwind v4, com Zustand para a lista local de orçamento e React Hook Form + Zod na validação.',
      'Os dados vêm de um pipeline offline: a planilha entra apenas na ingestão em Node/TypeScript, que aplica limpeza, exclusão de serviços e normalização, gera JSON em src/data/generated e o runtime consome via repositórios/serviços. Enriquecimento de taxonomia, candidatos a destaque e pesos de prioridade de venda são todos artefatos gerados.',
      'Qualidade é parte do MVP: testes unit e integração no Vitest e E2E no Playwright cobrindo o funil crítico home → produto → lista → WhatsApp.',
    ],
    highlights: [
      'Lista de orçamento local com Zustand, sem checkout',
      'Conversão do funil direto por WhatsApp',
      'Pipeline offline de planilha → JSON normalizado',
      'Enriquecimento de taxonomia e pesos de prioridade de venda',
      'Cobertura unit + integração (Vitest) e E2E (Playwright)',
    ],
  },
  {
    index: '06',
    slug: 'aurora',
    title: 'Aurora Support AI',
    role: 'Atendimento de e-commerce que aprende',
    category: 'AI / Fine-tuning',
    year: '2026',
    summary:
      'Atendimento de e-commerce trava quando o volume cresce. A Aurora responde com IA sob guardrails e rate limiting, medida por avaliação offline e evoluindo para fine-tuning sobre Vertex AI. Aberta, do protótipo à esteira de CI/CD.',
    stack: ['Python', 'FastAPI', 'Vertex AI', 'Gemini', 'Evals', 'Playwright', 'CI/CD'],
    repo: 'https://github.com/rouggerxavier/e-commerce_fine_tuning',
    status: 'open source',
    shot: '/images/projects/aurora.png',
    tagline: 'Assistente de suporte de e-commerce com guardrails que não mentem.',
    overview: [
      'Aurora Support AI é um assistente de suporte para e-commerce com backend FastAPI e inferência via Vertex AI + Gemini (google-genai). Além do POST /chat, a API expõe gestão de pedidos e tickets (GET/POST/PATCH /api/orders e /api/tickets) e um frontend HTML integrado ao próprio FastAPI (dashboard, orders, tickets, order-detail).',
      'O foco do projeto são guardrails honestos: o assistente não promete ações executadas, não alega acesso a sistema interno, escala com segurança sem claims falsos e faz parsing robusto de identificadores de pedido (AUR-####). Sessão e histórico ficam no payload da conversa, com tratamento de 429 (rate limit) e Retry-After.',
      'A qualidade evoluiu por rodadas de smoke com Playwright — de NO-GO (v1) a GO condicional (v2) e reteste direcionado (v3) — e o repositório está pronto para evoluir num pipeline de avaliação offline e fine-tuning. Projeto público de portfólio.',
    ],
    highlights: [
      'Backend FastAPI + Vertex AI / Gemini, frontend HTML integrado',
      'Guardrails honestos: sem prometer ação, sem claims de sistema interno',
      'Rate limiting com tratamento de 429 e Retry-After',
      'Avaliação offline por rodadas de smoke (Playwright): NO-GO → GO',
      'Pronto para pipeline de fine-tuning',
    ],
  },
  {
    index: '07',
    slug: 'mobileturismo',
    title: 'MobileTurismo',
    role: 'Site que capta orçamentos de fretamento',
    category: 'Site / Turismo',
    year: '2026',
    summary:
      'Uma empresa de fretamento vive dos orçamentos que chegam. Site com hero imersivo, apresentação de frota e um caminho curto até o pedido no WhatsApp. Feito para transformar visita em contato, direto do celular.',
    stack: ['Web', 'Landing page', 'Responsivo', 'WhatsApp'],
    live: 'https://mobileturismo.pages.dev',
    shot: '/images/projects/mobileturismo.jpg',
    gallery: [
      '/images/projects/mobileturismo/01.webp',
      '/images/projects/mobileturismo/02.webp',
      '/images/projects/mobileturismo/03.webp',
      '/images/projects/mobileturismo/04.webp',
    ],
    tagline: 'Landing de fretamento que capta orçamento direto pelo WhatsApp.',
    overview: [
      'Landing page da Mobile Turismo — fretamento de ônibus, micro-ônibus e vans em João Pessoa (PB), voltada a turismo, eventos e transporte corporativo. Gerada a partir do handoff do Google Stitch e implementada em Vite + React 19 + TypeScript + Tailwind v4 para produção.',
      'A página tem header fixo com barra de progresso de scroll, hero com CTAs e badge de experiência, seções de sobre/serviços e uma galeria da frota. A captação acontece por um formulário de orçamento e por um CTA/FAB de WhatsApp sempre à mão.',
      'CSS custom cobre as animações de scroll, botões e a barra de progresso; build estático servido no Cloudflare Pages.',
    ],
    highlights: [
      'Hero imersivo com CTAs e barra de progresso de scroll',
      'Seções de serviços e galeria da frota',
      'Formulário de orçamento + FAB de WhatsApp',
      'Build estático (Vite + React 19), deploy no Cloudflare Pages',
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const profile = {
  name: 'Rougger Xavier',
  role: 'Web Designer & AI Engineer',
  study: 'Ciência de Dados & IA',
  school: 'UFPB',
  location: 'Paraíba, Brasil',
  email: 'rouggerxavier@hotmail.com',
  github: 'https://github.com/rouggerxavier',
  // `phone` = só dígitos com DDI+DDD (para wa.me); `phoneLabel` = como aparece e é copiado.
  phone: '5583996353706',
  phoneLabel: '+55 (83) 99635-3706',
}

export const focus = [
  { label: 'UI/UX & Web Design', pct: 30 },
  { label: 'IA aplicada & RAG', pct: 30 },
  { label: 'Front-end & Motion', pct: 20 },
  { label: 'Back-end & APIs', pct: 20 },
]

export type Capability = { label: string; icon: string }

export const capabilities: Capability[] = [
  // Design & UX
  { label: 'UI/UX', icon: 'uiux' },
  { label: 'Web Design', icon: 'webdesign' },
  { label: 'Motion', icon: 'motion' },
  { label: 'Responsivo', icon: 'responsive' },
  // Front-end
  { label: 'React', icon: 'react' },
  { label: 'Next.js', icon: 'next' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'Tailwind', icon: 'tailwind' },
  { label: 'GSAP', icon: 'gsap' },
  { label: 'three.js', icon: 'three' },
  { label: 'Node.js', icon: 'node' },
  // IA aplicada
  { label: 'Python', icon: 'python' },
  { label: 'FastAPI', icon: 'fastapi' },
  { label: 'RAG', icon: 'rag' },
  { label: 'Agentes', icon: 'agents' },
  { label: 'LangChain', icon: 'langchain' },
  { label: 'LangGraph', icon: 'langgraph' },
  { label: 'Fine-tuning', icon: 'finetune' },
  { label: 'Evals', icon: 'evals' },
  // Infra & tooling
  { label: 'Command Line', icon: 'cli' },
  { label: 'Git', icon: 'git' },
  { label: 'GitHub', icon: 'github' },
  { label: 'CI/CD', icon: 'cicd' },
  { label: 'Cloud', icon: 'cloud' },
]
