# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) ·
Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [0.3.0] — 2026-09-30

Alinhamento com os protótipos (Admin e app do colaborador), a partir do diff de
foundations feito para a reunião do DS unificado.

### Alterado
- `--font-sans` passa a ser **DM Sans** (decisão do Victor em 25/09; era Rubik).
  O pacote não carrega a fonte: cada projeto carrega a DM Sans (next/font ou
  Google Fonts) e o token só a referencia.

### Adicionado
- `--page-max` (1680px) e `--content-max` (880px): largura única de página e
  limite de formulários e leitura.

### Sem mudança (registrado no diff)
- `--border`/`--input` seguem `#E5E7EB`. O `#D1D5DB` do Admin é resto do
  globals antigo e sai de lá.
- A marca white-label continua sendo `--primary*`. Os `--assist-brand*` do
  Admin existem porque o chrome do Admin ainda é azul; não viram foundation.

## [0.2.0] — 2026-08-27

Camada de luz e profundidade da extensão de marketing, nascida do pedido do
João Rego de uma LP de Segurança mais "tech". A referência dele usava um brilho
ciano que não existe no Manual da Marca; a resposta foi entregar a mesma
sensação de luz com o próprio neon sobre o verde escuro.

### Adicionado
- `--ink-elevated` — superfície elevada sobre `--ink` (cards/painéis em seção
  escura), opaca de propósito: alpha empilhado escurece diferente conforme o
  que há atrás.
- `--ink-grid` — linha de grade/circuito sobre `--ink` (textura de fundo;
  borda de componente continua sendo `--ink-border`).
- `--glow-neon` e `--glow-neon-strong` — halo neon para elementos "acesos"
  sobre `--ink`; efeito de luz, não cor de conteúdo.
- Ponte Tailwind correspondente: `bg-ink-elevated`, `--color-ink-grid`,
  `shadow-glow` e `shadow-glow-strong`.

## [0.1.0] — 2026-08-12

Primeira versão publicável. Extrai a camada de tokens que vivia como pasta em
`dialog-design-mocks/tokens` e a transforma em pacote consumível por qualquer
repositório da organização.

### Adicionado
- `dialog-tokens.css` — foundations de produto (marca, neutros, semânticos,
  tipografia, espaçamento, raio, sombra).
- `dialog-marketing.css` — extensão de superfície institucional: `--ink*`,
  `--accent-neon` e `--ink-chip`.
- `dialog-tailwind-v4.css` — ponte para utilitários do Tailwind v4.
- `bin/check.mjs` — crivo que roda no projeto consumidor (`dialog-tokens-check`).

### Corrigido
- O crivo passou a pegar cor de marca em `rgb()/rgba()`, não só em hex. A LP
  passava no check e mesmo assim servia o verde do Manual em produção: os
  valores estavam escritos como `rgba(8,176,47,0.18)` dentro de gradientes e
  sombras. Cinco arquivos da LP são acusados pela versão nova.

### Mudou em relação à pasta anterior
- O crivo **viaja com o pacote**. Antes ele só enxergava projetos dentro do
  repositório de mocks; um projeto em outro repositório ficava sem verificação
  nenhuma, que é justamente o cenário criado pela saída da LP para a Org.
- `--ink-chip` entrou depois de uma regressão real: o chip translúcido do hero
  virou `--primary-subtle` (opaco, quase branco) e apareceu como um quadrado
  claro sobre o verde escuro. O papel "chip sobre superfície escura" não existia
  em token nenhum.
