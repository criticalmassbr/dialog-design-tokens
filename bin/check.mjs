#!/usr/bin/env node
/* ============================================================================
   CRIVO DE GOVERNANÇA — roda no projeto CONSUMIDOR.

   Existe por causa de um caso real: a LP de Segurança foi mergeada com paleta
   própria (fonte e cinco valores de marca divergentes do DS). Nada no processo
   pegou; a divergência apareceu depois do deploy, no olho.

   A diferença para a versão anterior deste script: ele agora VIAJA COM O
   PACOTE. Antes ele morava no repositório dos tokens e só verificava os
   projetos que estivessem lá dentro; um projeto em outro repositório ficava
   sem crivo nenhum — exatamente o cenário que a saída da LP para a Org cria.
   Instalado como dependência, o `npx dialog-tokens-check` roda no CI de
   qualquer projeto, esteja ele onde estiver.

   O que ele verifica:

     1. HEX SOLTO — o projeto declara cor de marca cravada em vez de usar o
        token? Pega tanto os hexes do DS (sintoma de cópia manual) quanto os do
        Manual da Marca (sintoma de âncora na fonte errada).
     2. DERIVA — se o projeto mantém CÓPIA dos CSS (o caminho temporário, para
        quem ainda não consegue importar de node_modules), ela ainda bate com a
        do pacote instalado?

   Uso:
     npx dialog-tokens-check          → falha (exit 1) se houver problema
     npx dialog-tokens-check --fix    → re-sincroniza as cópias que derivaram

   Quando ninguém mais mantiver cópia, a checagem 2 fica ociosa sozinha e o
   arquivo continua valendo pela 1.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACOTE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJETO = process.cwd();
const CORRIGIR = process.argv.includes("--fix");

const FONTES = ["dialog-tokens.css", "dialog-marketing.css", "dialog-tailwind-v4.css"];

/** hexes que NÃO podem aparecer cravados em código de projeto.
 *  Os do DS indicam cópia manual em vez de token; os do Manual da Marca
 *  indicam que alguém ancorou na fonte errada (foi o caso da LP). */
const PROIBIDOS = [
  "#07751f", "#019420", "#085f1d", "#edfff0",           // marca do DS
  "#08b02f", "#05751f", "#02380d", "#045817", "#0aea3e", // Manual da Marca
];

const IGNORAR = new Set(["node_modules", ".next", ".git", "dist", "build", "out", ".vercel", "coverage"]);
const EXTENSOES = /\.(tsx?|jsx?|css|scss|svelte|vue)$/;

const problemas = [];
const consertados = [];

/** anda pelo projeto pulando o que é gerado ou instalado */
function* arquivos(dir) {
  let itens;
  try {
    itens = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const item of itens) {
    if (IGNORAR.has(item.name)) continue;
    const p = path.join(dir, item.name);
    if (item.isDirectory()) yield* arquivos(p);
    else yield p;
  }
}

/* ---------- 1. hex de marca cravado no projeto ---------- */
function hexSolto() {
  for (const arquivo of arquivos(PROJETO)) {
    if (!EXTENSOES.test(arquivo)) continue;
    // o próprio arquivo de token (ou uma cópia dele) declara os valores: é o lugar certo
    if (FONTES.includes(path.basename(arquivo))) continue;
    const texto = fs.readFileSync(arquivo, "utf8").toLowerCase();
    const achados = PROIBIDOS.filter((hex) => texto.includes(hex));
    if (achados.length) {
      problemas.push(
        `hex de marca cravado em ${path.relative(PROJETO, arquivo)}: ${achados.join(", ")}\n` +
          `    use o token correspondente (ver README do @dialog/design-tokens)`
      );
    }
  }
}

/* ---------- 2. deriva das cópias ---------- */
function deriva() {
  for (const arquivo of arquivos(PROJETO)) {
    const nome = path.basename(arquivo);
    if (!FONTES.includes(nome)) continue;
    const original = fs.readFileSync(path.join(PACOTE, nome), "utf8");
    const copia = fs.readFileSync(arquivo, "utf8");
    // a cópia carrega um cabeçalho de aviso; compara só o corpo
    const corpo = (t) => t.slice(t.indexOf("/* ==")).replace(/\r\n/g, "\n").trim();
    if (corpo(copia) === corpo(original)) continue;
    const rel = path.relative(PROJETO, arquivo);
    if (CORRIGIR) {
      fs.writeFileSync(arquivo, cabecalho(nome) + original);
      consertados.push(rel);
    } else {
      problemas.push(
        `cópia divergente: ${rel}\n` +
          `    rode \`npx dialog-tokens-check --fix\` ou passe a importar de node_modules`
      );
    }
  }
}

const cabecalho = (nome) =>
  `/* >> CÓPIA de @dialog/design-tokens/${nome} — NÃO EDITE AQUI.\n` +
  `   Fonte da verdade: o pacote. Sincronize com \`npx dialog-tokens-check --fix\`.\n` +
  `   Alteração de token é PR no repositório dialog-design-tokens. */\n`;

/* ---------- saída ---------- */
hexSolto();
deriva();

const versao = JSON.parse(fs.readFileSync(path.join(PACOTE, "package.json"), "utf8")).version;
console.log(`@dialog/design-tokens v${versao} — crivo em ${path.basename(PROJETO)}`);

if (consertados.length) {
  console.log("sincronizadas:");
  consertados.forEach((c) => console.log("  " + c));
}

if (problemas.length) {
  console.error("\nDS: problemas encontrados\n");
  problemas.forEach((p) => console.error("  · " + p));
  console.error("");
  process.exit(1);
}

console.log("DS ok: nenhum hex de marca cravado e nenhuma cópia divergente.");
