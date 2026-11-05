---
name: "Rougger Xavier — A frase monta"
description: "Sistema do preview A; páginas de case preservam o tema dark existente."
colors:
  accent: "#fe4e01"
  text: "#0b0b0c"
  surface: "#fff"
  text-secondary: "#4a4a4d"
  image-placeholder: "#ececec"
  focus: "#c93d00"
  hover-surface: "#f0f0f0"
typography:
  display:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "clamp(48px,7.5vw,112px)"
    fontWeight: 600
    lineHeight: "1.15"
    letterSpacing: "-.035em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontWeight: 400
  navigation:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "17px"
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
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text}"
    rounded: "{rounded.contact}"
  image:
    backgroundColor: "{colors.image-placeholder}"
    rounded: "{rounded.image}"
---

# Design System: Rougger Xavier — A frase monta

## Overview

**Creative North Star: "A frase monta"**

Preview A — A frase monta, derivado do layout explicitamente selecionado no ZIP. A voz estrutural, precisa e quente de PRODUCT.md é aplicada à composição escolhida; esta documentação registra o resultado implementado, sem propor uma nova identidade.

**Key Characteristics:**
- Composição da referência selecionada, adaptada à web responsiva.
- Capturas reais dos projetos e contraste forte entre branco, preto e laranja.
- Movimento ligado à leitura, à interação e à revelação do trabalho.

Escopo: `.preview` e seus componentes. O reset claro de body e scrollbar só se aplica quando `:has(.preview)` corresponde. As rotas `/projeto/:slug` continuam com o sistema dark de `src/index.css`; não generalizar os tokens claros para elas.

## Colors

Acento laranja `--accent` e texto `--text` são variáveis locais de `.preview`; os demais valores no frontmatter registram declarações CSS reais, não novas variáveis globais. Branco é a superfície, cinza é texto secundário e placeholder de captura. O foco usa contorno de 3px em `focus`, offset 6px; nos links sobre o contato laranja o contorno é `#0b0b0c` para preservar o contraste. A seleção de texto usa acento e tinta.

Cases preservados: `--color-paper: oklch(0.07 0.002 60)`, `--color-paper-2: oklch(0.135 0.003 60)`, `--color-ink: oklch(0.94 0.012 82)`, `--color-ink-soft: oklch(0.72 0.012 78)`, `--color-flame: oklch(0.66 0.215 40)`, `--color-flame-deep: oklch(0.56 0.19 37)` e `--color-line: oklch(0.94 0.012 82 / 0.14)`. Não substituir esses tokens pelos do preview.

## Typography

Display e corpo usam **Hanken Grotesk**, com fallback sans-serif. A hierarquia do hero está no frontmatter. Navegação e links usam peso 500. O shell compartilhado parte de Hanken Grotesk, sobrescrito pela família local do preview.

Fontes são carregadas pelo link Google Fonts existente em `index.html`; o fallback permanece disponível. Cases mantêm Bricolage Grotesque (display), Hanken Grotesk (corpo) e Spline Sans Mono (metadados). Nenhuma família foi escolhida nesta documentação.

## Layout

Hero alinhado à esquerda com frase em duas linhas e respostas em cápsulas laranja. Cinco seleções — um site, uma landing page, uma loja, um agente de IA e um sistema — atualizam frase, descrição e dois projetos reais. Grid de duas colunas, gap 32px, segundo projeto deslocado 96px; imagens com altura clamp(360px,41vw,620px). Perfil escuro e contato laranja encerram a página.

Até 640px: margens de 6%; hero com 36px no topo e título clamp(29px,7.4vw,48px), line-height 1.3. Botões de pelo menos 44px; projetos em uma coluna, sem deslocamento, imagens 105vw com máximo de 520px. Perfil e links de contato empilhados.

Navegação compartilhada: altura 88px no desktop e 76px no mobile, ressalvados os overrides específicos descritos acima. Alvos de navegação e contato têm mínimo de 44px. Conteúdo e imagens preservam largura flexível; links de email podem quebrar para caber.

## Elevation & Depth

Superfícies planas: contraste, recorte e escala das imagens fazem a separação; o preview não declara sombras. Não adicionar glassmorphism ou elevação de cards ao sistema.

## Shapes

Imagens compartilhadas têm raio 20px, reduzido para 12px no mobile. Contato compartilhado usa 24px/16px, exceto C, cujo rodapé é reto. Cápsulas usam 999px. Imagens são recortadas com overflow hidden e object-fit cover; não alterar o arquivo de origem para conseguir o recorte.

## Components

Navegação, contato e cards vêm de `PreviewShell.tsx`. Links de projeto abrem os cases internos e continuam permitindo voltar à Home. Âncoras públicas: Perfil `#about`, projetos `#index`, contato `#contact`; o hook compartilhado restaura a âncora na volta do case. `RxMark` é a marca vetorial existente; C usa navegação textual mínima, sem inserir uma marca adicional. Capturas são imagens existentes em `/public/images/projects`; não há raster novo.

Os cinco botões são um grupo com aria-pressed; a descrição atualizada tem aria-live polite. Duas capturas acompanham a necessidade selecionada.

Motion compartilhado: entrada da navegação de y -12 e opacity 0; entradas de conteúdo de y 40, stagger .1, início em .12; duração .8s e expo.out. Revelações por ScrollTrigger em top 96%, uma vez. Hover de captura em ponteiro fino amplia para 1.035 em 600ms com cubic-bezier(.16,1,.3,1). Na seleção, respostas entram de yPercent 105 e opacity 0 em 0.6s expo.out, stagger 0.06; os dois projetos entram de y 24 e opacity 0 em 0.6s. Não há rotação automática das escolhas.

Reduced motion: GSAP de entrada/revelação/parallax só roda com `prefers-reduced-motion: no-preference`; CSS remove animation e transition dentro de `.preview` quando a preferência é reduce. Conteúdo permanece visível e interativo. O motion do ZIP em `hyperframes/index.html` é referência de linguagem, não um vídeo embutido nem promessa de reprodução integral da timeline.

## Do's and Don'ts

- **Do** preservar o layout selecionado e seus comportamentos responsivos.
- **Do** reutilizar capturas reais, dados de projetos e a marca RxMark existentes.
- **Do** manter foco visível, navegação por teclado e reduced motion.
- **Don't** aplicar os tokens claros do preview às páginas de case dark.
- **Don't** introduzir raster, fontes, paleta ou efeitos que não estejam na implementação aprovada para este preview.
