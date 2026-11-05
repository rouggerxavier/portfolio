# Preview C — Índice aberto

Objetivo: implementar o layout explicitamente selecionado **Índice aberto**, com os projetos e cases existentes, para comparação entre os três previews.

Branch: `codex/preview-c-indice-aberto`.

Referências: ZIP fornecido `site-novo-rx.zip`; layout `paginas/Indice.dc.html` e linguagem de motion `hyperframes/index.html` (trecho C). `PRODUCT.md` fornece o contexto de marca. `DESIGN.md` e `.impeccable/design.json` registram os valores reais da implementação.

Proveniência: todas as imagens já existiam no repositório, em `/public/images/projects`; nenhum raster novo foi criado. A marca é o componente vetorial `RxMark` existente (navegação textual mínima nesta Home). As referências `/_blob` do ZIP foram substituídas pelas capturas locais correspondentes. As páginas de case preservam o visual dark e as rotas existentes.

Validação registrada pela execução: navegador em **1440×1000** e **390×844**, além de teste extra em **320px**, imagens, navegação case/volta e reduced motion passaram nos três previews. As cinco seleções de A também passaram. Build e lint passaram; resta apenas o warning preexistente de Fast Refresh em `Intro.tsx`. Os novos warnings foram removidos pela extração do hook de motion. Revisão independente final: **SHIP** nos três previews.

Reprodução da verificação: `node scripts/check-preview.mjs <URL>`. Requer Playwright disponível; para instalação externa, configure `PLAYWRIGHT_MODULE` e/ou `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

Âncoras preservadas: Perfil `#about`, projetos `#index`, contato `#contact`; retorno do case restaura o hash da Home.

Prévia Cloudflare Pages: https://codex-preview-c-indice-abert.portfolio-e48.pages.dev

Publicação isolada por branch; o domínio de produção permanece no deployment anterior.
