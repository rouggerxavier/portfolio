export type Project = {
  index: string
  slug: string
  title: string
  role: string
  category: string
  year: string
  summary: string
  problem: string
  features: string[]
  responsibility: string
  challenge: string
  outcome: string
  stack: string[]
  repo?: string
  live?: string
  status?: string
  shot: string
  metric?: { value: string; label: string }
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'grankasa',
    title: 'Grankasa',
    role: 'Plataforma imobiliária com catálogo e agente web',
    category: 'Aplicação web / IA',
    year: '2026',
    summary:
      'Aplicação imobiliária full stack com catálogo público, contato e chat conversacional, construída para evoluir com segurança entre fontes de dados e provedores de IA.',
    problem:
      'Organizar a busca de imóveis e a triagem inicial sem expor chaves, dados internos ou prometer integrações ainda não concluídas.',
    features: [
      'Catálogo, filtros e detalhes de imóveis',
      'Chat web com streaming via SSE',
      'Persistência de sessão e fallback controlado',
    ],
    responsibility:
      'Arquitetura e implementação da aplicação, do frontend React ao backend FastAPI, persistência e deploy.',
    challenge:
      'Integrar o espelho read-only da Loft/Vista atrás de feature flag, com projeção pública e dados sensíveis restritos ao backend.',
    outcome:
      'Catálogo, contato e chat web funcionais, com observabilidade segura e QA validado em desktop e mobile. A busca do catálogo como ferramenta do agente permanece como evolução planejada.',
    stack: ['React', 'Vite', 'FastAPI', 'SSE', 'PostgreSQL', 'Docker'],
    live: 'https://grankasa.com',
    shot: '/images/projects/grankasa.jpg',
  },
  {
    index: '02',
    slug: 'feirao',
    title: 'Feirão da Construção',
    role: 'Catálogo comercial com conversão pelo WhatsApp',
    category: 'E-commerce / Dados',
    year: '2026',
    summary:
      'Catálogo de materiais de construção com departamentos, busca, lista de orçamento e envio do pedido direto para o WhatsApp.',
    problem:
      'Transformar uma planilha operacional extensa em um catálogo navegável, consistente e simples de atualizar.',
    features: [
      'Busca e navegação por departamentos',
      'Lista local de orçamento',
      'Funil de compra validado por testes E2E',
    ],
    responsibility:
      'Produto, arquitetura e implementação do MVP, incluindo interface, pipeline de catálogo, testes e deploy.',
    challenge:
      'Normalizar, validar e classificar o catálogo offline antes de gerar os artefatos consumidos pela aplicação.',
    outcome:
      '3.873 produtos ativos ingeridos e validados, sem banco de dados em runtime e com o fluxo home → produto → lista → WhatsApp coberto por testes.',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'Zod', 'Vitest', 'Playwright'],
    live: 'https://feiraodaconstrucao.com.br',
    shot: '/images/projects/feirao.jpg',
    metric: { value: '3.873', label: 'produtos ativos organizados' },
  },
  {
    index: '03',
    slug: 'docops',
    title: 'DocOps Agent',
    role: 'Documentos longos transformados em trabalho útil',
    category: 'RAG / Aplicação web',
    year: '2026',
    summary:
      'Assistente RAG para ingerir documentos, conversar com as fontes e gerar resumos, tarefas, planos de estudo, notas e flashcards.',
    problem:
      'Reduzir o tempo gasto procurando informação e convertendo documentos densos em materiais acionáveis.',
    features: [
      'Chat e resumos sobre documentos',
      'Flashcards, tarefas e planos de estudo',
      'Artefatos e comparações salvos',
    ],
    responsibility:
      'Arquitetura e implementação full stack, incluindo API, orquestração, recuperação e interface React.',
    challenge:
      'Combinar recuperação vetorial com BM25 e orquestrar diferentes saídas sem perder o vínculo com o documento de origem.',
    outcome:
      'Fluxo completo de ingestão, chat e geração de artefatos disponível em uma aplicação com backend FastAPI e frontend React.',
    stack: ['FastAPI', 'LangGraph', 'Chroma', 'BM25', 'React', 'Docker'],
    live: 'https://doc-ops-agent.vercel.app/',
    shot: '/images/projects/docops.jpg',
  },
  {
    index: '04',
    slug: 'evalops',
    title: 'EvalOps Studio',
    role: 'Observabilidade e avaliação para aplicações com LLM',
    category: 'LLMOps / Plataforma',
    year: '2026',
    summary:
      'Plataforma para reunir traces, avaliações por rubrica, datasets e experimentos de aplicações com inteligência artificial.',
    problem:
      'Evitar que mudanças de prompt ou modelo reduzam a qualidade silenciosamente em aplicações com LLM.',
    features: [
      'Tracing de chamadas e ferramentas',
      'Rubricas e avaliações versionadas',
      'Experimentos, datasets e feedback humano',
    ],
    responsibility:
      'Definição do produto e implementação da plataforma, do SDK Python ao backend, dados e dashboard.',
    challenge:
      'Modelar traces, custos, latência e qualidade com isolamento por organização e contratos auditáveis.',
    outcome:
      'Uma base central para inspecionar respostas, comparar versões e exportar evidências sem depender de telas isoladas em cada agente.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'SDK Python', 'SQLAlchemy', 'Alembic'],
    live: 'https://eval-ops-web.vercel.app/',
    shot: '/images/projects/evalops.jpg',
  },
  {
    index: '05',
    slug: 'projeto-alana',
    title: 'Alana Lacerda Arquitetos',
    role: 'Portfólio de arquitetura orientado a contato',
    category: 'Site / Portfólio',
    year: '2026',
    summary:
      'Site estático com portfólio filtrável, páginas de projeto, imagens reais e contato direcionado para o WhatsApp.',
    problem:
      'Apresentar projetos visuais com qualidade e criar um caminho curto entre descoberta, confiança e contato.',
    features: [
      'Arquivo filtrável de projetos',
      'Galerias e páginas individuais',
      'Formulário de briefing para WhatsApp',
    ],
    responsibility:
      'Refatoração do handoff visual, arquitetura dos componentes, pipeline de imagens e implementação responsiva.',
    challenge:
      'Organizar fotos reais por projeto e convertê-las para WebP mantendo mapeamento, proporção e contexto arquitetônico.',
    outcome:
      'Portfólio estático e navegável, com imagens locais otimizadas e fluxo de contato sem depender de CMS ou backend.',
    stack: ['React', 'Vite', 'TypeScript', 'WebP', 'Cloudflare Pages'],
    live: 'https://projeto-alana.pages.dev',
    shot: '/images/projects/projeto-alana.jpg',
  },
  {
    index: '06',
    slug: 'aurora',
    title: 'Aurora Support AI',
    role: 'Suporte de e-commerce com guardrails',
    category: 'IA / Qualidade',
    year: '2026',
    summary:
      'Assistente de suporte em português com Vertex AI, API, interface web, políticas de resposta e uma trilha de QA reproduzível.',
    problem:
      'Responder com consistência sem inventar ações, expor sistemas internos ou falhar de forma confusa sob rate limit.',
    features: [
      'Chat com sessão e histórico',
      'Guardrails antes e depois do modelo',
      'Pedidos, tickets e escalonamento seguro',
    ],
    responsibility:
      'Arquitetura, implementação do MVP e ciclos de QA orientados por evidência.',
    challenge:
      'Separar comportamento, políticas e conhecimento mutável, tratando erro 429 e claims indevidos de forma explícita.',
    outcome:
      'O projeto evoluiu de protótipo para demo tecnicamente defensável; o reteste v3 encerrou os bloqueadores originais e preservou relatórios de evidência.',
    stack: ['Python', 'FastAPI', 'Vertex AI', 'Gemini', 'Guardrails', 'Evals'],
    repo: 'https://github.com/rouggerxavier/e-commerce_fine_tuning',
    status: 'Código público',
    shot: '/images/projects/aurora.png',
  },
  {
    index: '07',
    slug: 'mobileturismo',
    title: 'MobileTurismo',
    role: 'Landing page para pedidos de fretamento',
    category: 'Site / Conversão',
    year: '2026',
    summary:
      'Landing page para uma empresa de fretamento em João Pessoa, com apresentação da frota e orçamento preparado para o WhatsApp.',
    problem:
      'Explicar serviços e veículos rapidamente no celular e reduzir a distância até o pedido de orçamento.',
    features: [
      'Serviços e galeria da frota',
      'Formulário que prepara a solicitação',
      'CTAs e navegação por âncoras',
    ],
    responsibility:
      'Refatoração do handoff, componentização React, responsividade e fluxo de orçamento.',
    challenge:
      'Converter o formulário visual em uma mensagem clara para WhatsApp sem simular persistência ou envio por backend.',
    outcome:
      'Site responsivo com menu mobile funcional e caminho direto para orçamento; integrações de CRM e analytics permanecem fora do escopo atual.',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'WhatsApp'],
    live: 'https://mobileturismo.pages.dev',
    shot: '/images/projects/mobileturismo.jpg',
  },
]

const whatsappMessage =
  'Olá, Rougger! Vi seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.'

export const profile = {
  name: 'Rougger Xavier',
  role: 'Desenvolvedor Full Stack & IA',
  location: 'João Pessoa, PB',
  email: 'rouggerxavier@hotmail.com',
  github: 'https://github.com/rouggerxavier',
  phone: '5583996353706',
  phoneLabel: '+55 (83) 99635-3706',
  whatsapp: `https://wa.me/5583996353706?text=${encodeURIComponent(whatsappMessage)}`,
}

export const capabilities = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'APIs',
  'RAG',
  'Agentes de IA',
  'Evals',
  'Docker',
  'CI/CD',
]
