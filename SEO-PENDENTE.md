# SEO: o que falta

Atualizado em 04/11/2026. Ponto de partida no Search Console: 0 cliques, 12 impressões, posição média 14,5, 7 de 10 páginas indexadas, 0 links externos.

## Já feito

- [x] Home com "web designer em João Pessoa" no `<title>`, na description e no H1.
- [x] Página `/web-designer-joao-pessoa`, com HTML estático, dados estruturados e links para os projetos.
- [x] Link para essa página no menu e no rodapé da home.
- [x] Sitemap e `llms.txt` incluem a página nova.
- [x] Localização e telefone nos dados estruturados da pessoa.
- [x] Indexação solicitada no Search Console para `evalops`, `feirao` e `aurora`.

## Falta (só você pode fazer)

### 1. Publicar

- [ ] Revisar os textos em `service` (`src/data/projects.ts`). Confirme se as ofertas e os motivos descrevem o que você quer vender.
- [ ] Fazer commit e deploy destas mudanças. Sem deploy, nada acima muda no site, exceto os pedidos de indexação.
- [ ] Depois do deploy, no Search Console: Inspeção de URL em `https://rouggerxavier.com.br/web-designer-joao-pessoa` e depois "Solicitar indexação".
- [ ] Solicitar indexação da home também, para o Google ver o título novo.

### 2. Perfil da Empresa no Google (maior ganho para busca local)

- [ ] Criar em https://business.google.com como prestador de serviço, com área de atendimento em João Pessoa e sem endereço público.
- [ ] Colocar `https://rouggerxavier.com.br/web-designer-joao-pessoa` como site do perfil.
- [ ] Pedir avaliações aos clientes atuais.

### 3. Links externos (hoje são 0)

- [ ] Rodapé dos sites de clientes: "Site por Rougger Xavier", com link. Prioridade: Grankasa, Feirão da Construção, Alana Lacerda e MobileTurismo.
- [ ] GitHub: o campo de site do perfil e o homepage do repositório estão vazios. Comandos:

```bash
gh api user -X PATCH -f blog=https://rouggerxavier.com.br
```

```bash
gh repo edit rouggerxavier/portfolio --homepage https://rouggerxavier.com.br
```

- [ ] LinkedIn e Instagram: colocar o link no perfil. Depois, adicionar as URLs em `sameAs`, em `src/seo.ts`.
- [ ] Diretórios locais e de design (Behance, Dribbble, GetNinjas ou similares).

### 4. Decidir: robôs de IA

- [ ] O Cloudflare acrescenta ao `robots.txt` regras que bloqueiam `GPTBot`, `ClaudeBot`, `Google-Extended` e outros. O comentário em `public/robots.txt` diz que eles estão liberados. Para liberar, desligue a opção de `robots.txt` gerenciado no painel do Cloudflare. Para manter o bloqueio, corrija o comentário. A Pesquisa Google não é afetada nos dois casos.

### 5. Medir

- [ ] Rever o Search Console 4 a 6 semanas depois do deploy: impressões em consultas com "web designer" e "João Pessoa", e as 3 páginas no índice.
- [ ] Sem tráfego depois disso, escrever estudos de caso focados em buscas locais, como "criar site em João Pessoa".
