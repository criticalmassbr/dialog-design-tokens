# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) ·
Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [0.4.2] — 2026-11-24

Espaçamento v2 (decisão do Victor em 24/11, prancha "DS · Espaçamento v2", opção A): o ar vem da hierarquia.

### Alterado
- `--space-section` passa de 24 para **32**: seção → seção, com ou sem card. Card a card (lista e grade) segue 16.

### Adicionado
- `--space-32` (32px) na escala, que pulava de 24 para 40. O 40 fica para faixas de apresentação (hero).
- `--space-section-mobile` (24), `--space-page-header` (24: cabeçalho → abas ou conteúdo, e abas → conteúdo; 16 no
  celular), `--space-crumb` (8: breadcrumb → título) e `--space-notice` (16: aviso → o que ele comenta; 12 no celular).

## [0.4.1] — 2026-11-24

### Adicionado
- Os seis tons de alerta (decisão do Victor em 24/11, prancha "DS · Alertas: quantos tons"): sucesso, atenção,
  erro e informação, que já existiam, mais **Neutro** (`--neutral-tone`, `--neutral-subtle`: um limite do
  sistema, sem urgência) e **IA** (`--ai-tone`, `--ai-tone-subtle`: conteúdo gerado ou sugerido pela IA).
- O "Guia" (passo a passo na cor da marca) não virou tom: é uma ação, então segue a primária em botão ou chip.
- Ponte Tailwind: `bg-neutral-subtle`, `text-ai-tone`, `bg-ai-tone-subtle`.

## [0.4.0] — 2026-11-24

DS único: o Admin é o padrão e o app do colaborador (PWA) alinha 100% a ele.
Decisão do Victor em 23/11, depois do teste sem sombra no PWA.

### Alterado
- `--primary-hover` passa a ser derivado da marca:
  `color-mix(in srgb, var(--primary) 86%, white)` (era `#019420`). O cliente
  white-label troca só `--primary` e o hover acompanha. Atenção: declare a
  marca no mesmo elemento onde os tokens vivem (`:root`/`html`), senão o hover
  herda o valor calculado com o verde.

### Adicionado
- Elevação por papel: `--shadow-card` (none), `--shadow-hover` (só card
  clicável), `--border-hover`, `--shadow-overlay` (menu, modal, faixa fixa).
  Card selecionado/aberto não tem sombra.
- Contornos: `--divider`, `--border-width` (1px), `--border-width-emphasis` (1.5px).
- Raio por papel: `--radius-field` 12, `--radius-card` 16, `--radius-panel` 20,
  `--radius-pill`.
- Régua de controles: `--control-sm` 32, `--control-md` 36, `--control-lg` 40.
- Espaço por papel: `--space-card` 20, `--space-card-mobile` 16,
  `--space-section` 24, `--space-row` 12.
- `--text-card-title` (16px, peso 600).
- Ponte Tailwind: `rounded-field/card/panel/pill`, `shadow-card/hover/overlay`,
  `border-divider`, `border-border-hover`.

### Sem mudança
- Primitivos x1–x4 de sombra, raio e espaço continuam; componentes passam a usar
  os papéis.

## [0.3.1] — 2026-09-30

### Alterado
- `--border` e `--input` passam a `#D1D5DB` (neutral-300), a borda que o Admin já
  usava. Decisão do Victor sobre o diff: mais contraste nos cards e campos.

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
