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
  metric?: { value: string; label: string }
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
    role: 'Plataforma imobiliária com agente de IA',
    category: 'Real estate / IA',
    year: '2026',
    summary:
      'Comprar imóvel trava em catálogos gigantes e formulários sem fim. Aqui um agente de IA conversa em linguagem natural, busca no acervo em tempo real e responde com streaming, como um corretor que conhece cada imóvel. Persistência híbrida e observabilidade do agente prontas para produção.',
    problem:
      'Organizar a busca de imóveis e a triagem inicial sem expor chaves, dados internos ou prometer integrações ainda não concluídas.',
    features: [
      'Catálogo, filtros e detalhes de imóveis',
      'Chat web com streaming via SSE',
      'Persistência de sessão e fallback controlado',
    ],
    responsibility:
      'Arquitetura e implementação da aplicação, do frontend React ao backend em Python, persistência e deploy.',
    challenge:
      'Integrar o espelho read-only do CRM imobiliário atrás de feature flag, com projeção pública e dados sensíveis restritos ao backend.',
    outcome:
      'Catálogo, contato e chat web funcionais, com observabilidade segura e QA validado em desktop e mobile. A busca do catálogo como ferramenta do agente segue como evolução planejada.',
    stack: ['React', 'Vite', 'shadcn/ui', 'Python', 'SSE', 'PostgreSQL'],
    live: 'https://grankasa.com',
    repo: 'https://github.com/rouggerxavier/Grankasa',
    shot: '/images/projects/grankasa.jpg',
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
    stack: ['React', 'Vite', 'TypeScript', 'WebP pipeline'],
    live: 'https://projeto-alana.pages.dev',
    repo: 'https://github.com/rouggerxavier/projeto-alana',
    shot: '/images/projects/projeto-alana.jpg',
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
    stack: ['FastAPI', 'LangGraph', 'Chroma', 'BM25', 'React', 'TypeScript', 'Docker'],
    live: 'https://doc-ops-agent.vercel.app/',
    repo: 'https://github.com/rouggerxavier/DocOps_Agent',
    shot: '/images/projects/docops.jpg',
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
    repo: 'https://github.com/rouggerxavier/EvalOps',
    shot: '/images/projects/evalops.jpg',
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
      'Milhares de produtos ativos ingeridos e validados, sem banco de dados em runtime e com o fluxo de compra coberto por testes.',
    metric: { value: '3.873', label: 'produtos ativos organizados' },
    stack: ['Next.js', 'TypeScript', 'Tailwind v4', 'Zustand', 'Zod', 'Playwright'],
    live: 'https://feiraodaconstrucao.com.br',
    repo: 'https://github.com/rouggerxavier/feirao',
    shot: '/images/projects/feirao.jpg',
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
    stack: ['Python', 'FastAPI', 'Vertex AI', 'Gemini', 'Evals', 'Playwright', 'CI/CD'],
    repo: 'https://github.com/rouggerxavier/e-commerce_fine_tuning',
    status: 'open source',
    shot: '/images/projects/aurora.png',
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
      'Site responsivo com menu mobile funcional e caminho direto para orçamento; integrações de CRM e analytics ficam fora do escopo atual.',
    stack: ['Web', 'Landing page', 'Responsivo', 'WhatsApp'],
    live: 'https://mobileturismo.pages.dev',
    shot: '/images/projects/mobileturismo.jpg',
  },
]

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
