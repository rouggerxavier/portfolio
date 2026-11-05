---
name: "Rougger Xavier — Índice aberto"
description: "Sistema do preview C; páginas de case preservam o tema dark existente."
colors:
  accent: "#fe4e01"
  text: "#0b0b0c"
  surface: "#fff"
  text-secondary: "#4a4a4d"
  image-placeholder: "#ececec"
  focus: "#c93d00"
  image-overlay: "#0b0b0c99"
typography:
  display:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(64px,10.2vw,150px)"
    fontWeight: 500
    lineHeight: ".97"
    letterSpacing: "-.05em"
  body:
    fontFamily: "Instrument Sans, sans-serif"
    fontWeight: 400
  navigation:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 500
rounded:
  image: "20px"
  image-mobile: "12px"
  contact: "24px"
  contact-mobile: "16px"
  pill: "999px"
spacing:
  content-gap: "32px"
  contact-top: "36px"
components:
  contact:
    backgroundColor: "{colors.text}"
    textColor: "{colors.surface}"
    rounded: "0"
  image:
    backgroundColor: "{colors.image-placeholder}"
    rounded: "{rounded.image}"
---

# Design System: Rougger Xavier — Índice aberto

## Overview

**Creative North Star: "Índice aberto"**

Preview C — Índice aberto, derivado do layout explicitamente selecionado no ZIP. A voz estrutural, precisa e quente de PRODUCT.md é aplicada à composição escolhida; esta documentação registra o resultado implementado, sem propor uma nova identidade.

**Key Characteristics:**
- Composição da referência selecionada, adaptada à web responsiva.
- Capturas reais dos projetos e contraste forte entre branco, preto e laranja.
- Movimento ligado à leitura, à interação e à revelação do trabalho.

Escopo: `.preview` e seus componentes. O reset claro de body e scrollbar só se aplica quando `:has(.preview)` corresponde. As rotas `/projeto/:slug` continuam com o sistema dark de `src/index.css`; não generalizar os tokens claros para elas.

## Colors

Acento laranja `--accent` e texto `--text` são variáveis locais de `.preview`; os demais valores no frontmatter registram declarações CSS reais, não novas variáveis globais. Branco é a superfície, cinza é texto secundário e placeholder de captura. O foco usa contorno de 3px em `focus`, offset 6px; nos links sobre o contato laranja o contorno é `#0b0b0c` para preservar o contraste. A seleção de texto usa acento e tinta.

Cases preservados: `--color-paper: oklch(0.07 0.002 60)`, `--color-paper-2: oklch(0.135 0.003 60)`, `--color-ink: oklch(0.94 0.012 82)`, `--color-ink-soft: oklch(0.72 0.012 78)`, `--color-flame: oklch(0.66 0.215 40)`, `--color-flame-deep: oklch(0.56 0.19 37)` e `--color-line: oklch(0.94 0.012 82 / 0.14)`. Não substituir esses tokens pelos do preview.

## Typography

Display e corpo usam **Instrument Sans**, com fallback sans-serif. A hierarquia do hero está no frontmatter. Navegação e links usam peso 500. O shell compartilhado parte de Hanken Grotesk, sobrescrito pela família local do preview. Cápsulas e contexto: Spline Sans Mono, monospace, peso 500, 15px e tracking -.025em; bordas internas de 1.5px. Sombra do contexto: 0 5px 24px #0b0b0c22.

Fontes são carregadas pelo link Google Fonts existente em `index.html`; o fallback permanece disponível. Cases mantêm Bricolage Grotesque (display), Hanken Grotesk (corpo) e Spline Sans Mono (metadados). Nenhuma família foi escolhida nesta documentação.

## Layout

Hero aberto, mínimo 720px, margens 3.125%, navegação textual em três posições. Apresentação grande à esquerda e descrição em três colunas com gap 32px. Cápsula laranja leva ao índice. Sete links de projetos alternam linhas tipográficas e faixas de imagem sempre abertas nas linhas pares; alturas clamp(140px,15vw,210px) e clamp(280px,31.25vw,440px). Contexto laranja sticky no rodapé da viewport identifica disciplina e campo do projeto ativo. Serviços em grid 25%/1fr e rodapé preto sem arredondamento.

Até 640px: margens 6%, hero sem altura mínima fixa; título clamp(32px,8.1vw,52px). Descrição e serviços em uma coluna. Linhas de índice de 132px, faixas largas de 240px, nomes clamp(30px,8vw,48px). Contexto sticky a 16px do rodapé; texto de 12px. Rodapé com padding 48px 6%.

Navegação compartilhada: altura 88px no desktop e 76px no mobile, ressalvados os overrides específicos descritos acima. Alvos de navegação e contato têm mínimo de 44px. Conteúdo e imagens preservam largura flexível; links de email podem quebrar para caber.

## Elevation & Depth

Profundidade limitada aos elementos já implementados: overlay escuro das faixas e sombra sutil da cápsula contextual. Não adicionar glassmorphism ou elevação de cards ao sistema.

## Shapes

Imagens compartilhadas têm raio 20px, reduzido para 12px no mobile. Contato compartilhado usa 24px/16px, exceto C, cujo rodapé é reto. Cápsulas usam 999px. Imagens são recortadas com overflow hidden e object-fit cover; não alterar o arquivo de origem para conseguir o recorte.

## Components

Navegação, contato e cards vêm de `PreviewShell.tsx`. Links de projeto abrem os cases internos e continuam permitindo voltar à Home. Âncoras públicas: Perfil `#about`, projetos `#index`, contato `#contact`; o hook compartilhado restaura a âncora na volta do case. `RxMark` é a marca vetorial existente; C usa navegação textual mínima, sem inserir uma marca adicional. Capturas são imagens existentes em `/public/images/projects`; não há raster novo.

Cada linha inteira é um link de case. Capturas de fundo são decorativas; o nome textual identifica o link. O contexto visual é aria-hidden e não substitui a navegação. O contador usa o tamanho real de projects, não o 09 estático da referência.

Motion compartilhado: entrada da navegação de y -12 e opacity 0; entradas de conteúdo de y 40, stagger .1, início em .12; duração .8s e expo.out. Revelações por ScrollTrigger em top 96%, uma vez. Hover de captura em ponteiro fino amplia para 1.035 em 600ms com cubic-bezier(.16,1,.3,1). As faixas abrem por clip-path inset(50% 0) a inset(0), 650ms cubic-bezier(.16,1,.3,1); nomes e setas respondem em 300ms. Hover fino, foco de teclado e passagem pelo centro (55% da viewport) ativam o projeto e o contexto. Com reduced motion os estados e navegação continuam funcionais, mas as transições desaparecem; a detecção do projeto ativo não é uma animação.

Reduced motion: GSAP de entrada/revelação/parallax só roda com `prefers-reduced-motion: no-preference`; CSS remove animation e transition dentro de `.preview` quando a preferência é reduce. Conteúdo permanece visível e interativo. O motion do ZIP em `hyperframes/index.html` é referência de linguagem, não um vídeo embutido nem promessa de reprodução integral da timeline.

## Do's and Don'ts

- **Do** preservar o layout selecionado e seus comportamentos responsivos.
- **Do** reutilizar capturas reais, dados de projetos e a marca RxMark existentes.
- **Do** manter foco visível, navegação por teclado e reduced motion.
- **Don't** aplicar os tokens claros do preview às páginas de case dark.
- **Don't** introduzir raster, fontes, paleta ou efeitos que não estejam na implementação aprovada para este preview.
