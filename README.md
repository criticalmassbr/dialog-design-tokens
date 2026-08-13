# @dialog/design-tokens

**Fonte da verdade em código** das *foundations* do Dialog DS: cor, tipografia,
espaçamento, raio e sombra. Todo projeto novo consome daqui. Nenhum projeto
declara valor de marca por conta própria.

> **Isto não é o Design System inteiro.** Aqui vivem só as foundations (Tier 0).
> **Componentes não moram aqui** — eles vivem no Storybook, sob responsabilidade
> da Tech. A divisão de donos é a do handoff: *foundations → Design ·
> componentes → Tech*.

---

## Por que este repositório existe

O Storybook do DS foi criado **dentro do projeto Burst** e ainda não é exposto a
outros consumidores (decisão da Tech, para não versionar durante a fase de
mudança intensa; o destino futuro é o `dialog-frontend`). Consequência prática:
**não havia nada consumível**, e o primeiro projeto novo — a LP de Segurança —
copiou valores na mão. Copiou do Manual da Marca em vez do DS, e ninguém
percebeu até o deploy.

A primeira versão desta camada nasceu como uma pasta dentro do repositório de
mocks. Isso resolvia um repositório só. Quando a LP saiu para a Org, a pasta
deixaria de alcançá-la — e duas cópias divergindo em silêncio é exatamente o
problema original de volta. Por isso virou **pacote versionado**: dependência
tem versão, tem PR e tem histórico; cópia não tem nada disso.

---

## Como consumir

Sem registry privado montado, a instalação é direto do Git, com a versão
fixada por tag:

```bash
npm i github:criticalmassbr/dialog-design-tokens#v0.1.0
```

Fixar a tag é deliberado: ninguém é atualizado sem querer, e atualizar token
vira um PR visível no projeto.

No CSS de entrada do projeto (`globals.css`), **nesta ordem**:

```css
@import "tailwindcss";

@import "@dialog/design-tokens/tokens.css";        /* foundations de produto */
@import "@dialog/design-tokens/marketing.css";     /* só LP / institucional  */
@import "@dialog/design-tokens/tailwind-v4.css";   /* ponte p/ utilitários   */
```

A ordem importa: a ponte do Tailwind lê os valores declarados acima dela.
Projeto de produto importa só o primeiro e o terceiro.

### Se o bundler não resolver import de pacote no CSS

Copie os três arquivos para `src/styles/` e importe por caminho relativo. É o
caminho **temporário**, e nesse caso o crivo abaixo passa a ser obrigatório no
CI: ele detecta quando a cópia envelhece.

---

## Crivo de governança

O verificador viaja com o pacote e roda no projeto consumidor:

```bash
npx dialog-tokens-check
```

Ele falha (exit 1) quando encontra:

1. **Hex de marca cravado** no código do projeto — tanto os valores do DS
   (sintoma de cópia manual em vez de token) quanto os do Manual da Marca
   (sintoma de âncora na fonte errada, que foi o caso da LP).
2. **Cópia divergente** dos CSS, para quem mantém cópia local.
   `npx dialog-tokens-check --fix` re-sincroniza.

Coloque no CI do projeto e no `package.json`:

```json
{ "scripts": { "check:ds": "dialog-tokens-check" } }
```

---

## Arquivos

| Arquivo | O que é | Quem usa |
|---|---|---|
| `dialog-tokens.css` | Foundations de **produto**. A marca é declarada aqui e em nenhum outro lugar. | todos |
| `dialog-marketing.css` | Extensão de **superfície institucional**: verde escuro de fundo, acento neon e chip sobre escuro. | só LP / institucional |
| `dialog-tailwind-v4.css` | Ponte que expõe os tokens como utilitários do Tailwind v4. Não define valor nenhum. | projetos em Tailwind v4 |

### Por que existe uma camada de marketing

Não é "outro DS". Aplicamos o DS **puro** sobre a LP de Segurança e medimos: o
hero institucional caía para o quase-preto do texto de produto, o destaque do
título perdia contraste e a pílula de eyebrow desaparecia. O DS de produto não
tem token para **superfície escura** nem para **acento neon**, que são os dois
pilares visuais de uma página de comunicação.

A camada existe para nomear esses papéis, e ela **não redefine a marca**: o
verde primário continua vindo do DS. Números medidos que sustentam a decisão:

| | contraste | |
|---|---|---|
| branco sobre `#08B02F` (paleta anterior da LP) | 2,89:1 | reprova AA |
| branco sobre `#07751F` (primária do DS) | 5,88:1 | passa AA |
| primária do DS sobre a superfície escura | 2,27:1 | reprova (daí o neon) |
| neon sobre a superfície escura | 8,16:1 | passa AA |

---

## Regras de governança

1. **Alterar token é PR neste repositório.** Projeto nenhum edita a própria
   cópia; se editar, o crivo acusa.
2. **Versão por tag.** Mudança de valor sobe *minor*; correção sem impacto
   visual sobe *patch*. O `CHANGELOG.md` registra o que mudou e por quê.
3. **Foundations aqui, componentes no Storybook.** Se a dúvida for "isto é
   token ou componente?", token é valor sem forma; componente tem comportamento.
4. **Dono:** Design (Victor). A Tech consome e propõe por PR.

---

## O que vem depois

Quando a Tech publicar o pacote do DS com os componentes, este repositório vira
a camada Tier 0 dele (ou é absorvido por ele). O modelo mental para os projetos
não muda: continua sendo `npm i` + `@import`.
