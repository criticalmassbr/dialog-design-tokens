# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) ·
Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

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

### Mudou em relação à pasta anterior
- O crivo **viaja com o pacote**. Antes ele só enxergava projetos dentro do
  repositório de mocks; um projeto em outro repositório ficava sem verificação
  nenhuma, que é justamente o cenário criado pela saída da LP para a Org.
- `--ink-chip` entrou depois de uma regressão real: o chip translúcido do hero
  virou `--primary-subtle` (opaco, quase branco) e apareceu como um quadrado
  claro sobre o verde escuro. O papel "chip sobre superfície escura" não existia
  em token nenhum.
