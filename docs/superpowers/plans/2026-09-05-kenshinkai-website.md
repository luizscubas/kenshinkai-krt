# Kenshinkai Karatê & Karatê para Todos - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site institucional oficial da Associação Karatê Kenshinkai e do projeto social Karatê para Todos utilizando Astro, Tailwind CSS, com funil de conversão direto para WhatsApp e arquitetura estática de alto desempenho.

**Architecture:** O site adota uma estrutura híbrida com Astro (SSG). A Home (`/`) atua como página principal de apresentação e conversão direta para WhatsApp; páginas dedicadas (`/karate-para-todos` e `/conquistas`) aprofundam a iniciativa comunitária e o mural de atletas. Todo o conteúdo dinâmico (contatos, turmas, mestres e conquistas) é desacoplado e tipado em `src/data/siteConfig.ts`.

**Tech Stack:** Astro (v5+), Tailwind CSS, TypeScript, Fontes `@font-face` (Zenzai Itacha e Panoragraf), Node test runner nativo (`node:test`).

**Spec:** [docs/superpowers/specs/2026-09-05-kenshinkai-site-design.md](file:///home/luizarch/kenshinkai-krt/docs/superpowers/specs/2026-09-05-kenshinkai-site-design.md)

## Global Constraints

- **Regra de Estilo Sóbrio:** Proibido o uso de componentes visuais do tipo badge, etiqueta arredondada/pílula ou tags `<span>` com estilização de chip decorativo.
- **Tipografia:** Títulos obrigatoriamente utilizam a fonte `Zenzai Itacha` (com fallback serif); textos corridos, navegação e botões utilizam `Panoragraf` (com fallback sans-serif).
- **Turmas e Horários:** Estritamente duas turmas oficiais:
  1. Turma Infantil: 18:00 às 20:00
  2. Turma Juvenil & Adulto: 20:00 às 22:00
- **Funil de Conversão:** Exclusivamente links diretos para WhatsApp (`https://wa.me/...`) com mensagens pré-formatadas e botão flutuante. Sem formulários externos ou banco de dados.
- **Cores Oficiais:**
  - Fundo Geral: `#0B0C0E`
  - Superfícies/Cards: `#15171B` e `#1F2228`
  - Carmesim (Destaque): `#DC2626` / `#B91C1C`
  - Dourado (Conquistas): `#F59E0B` / `#D97706`
  - Texto Principal: `#F9FAFB`
  - Texto Secundário: `#9CA3AF`
  - WhatsApp: `#25D366`
- **Validação de Código:** `npx astro check` e `npm run build` devem concluir com 0 erros.

---

## File Structure Map

```
kenshinkai-krt/
├── public/
│   ├── favicon.svg
│   └── fonts/
│       ├── zenzai-itacha.woff2 (ou .ttf)
│       └── panoragraf.woff2 (ou .ttf)
├── src/
│   ├── components/
│   │   ├── Header.astro              # Navegação, logo e CTA mobile/desktop
│   │   ├── Footer.astro              # Rodapé com endereços, links e créditos
│   │   ├── WhatsAppFloat.astro       # Botão flutuante persistente no canto inferior
│   │   ├── Hero.astro                # Banner principal com chamada marcial
│   │   ├── Philosophy.astro          # Princípios do karatê e Dojo Kun
│   │   ├── ClassesGrid.astro         # As 2 turmas oficiais com horários e botões
│   │   ├── SocialBanner.astro        # Chamada para Karatê para Todos
│   │   ├── MedalsTeaser.astro        # Destaques do mural de conquistas
│   │   ├── SenseiBio.astro           # Perfil dos mestres responsáveis
│   │   └── LocationMap.astro         # Endereço e mapa interativo
│   ├── data/
│   │   └── siteConfig.ts             # Dados centralizados e tipados
│   ├── utils/
│   │   └── whatsapp.ts               # Helper gerador de links com encoding correto
│   ├── layouts/
│   │   └── BaseLayout.astro          # Estrutura base com SEO e OpenGraph
│   ├── pages/
│   │   ├── index.astro               # Landing page principal
│   │   ├── karate-para-todos.astro   # Página detalhada do projeto social
│   │   └── conquistas.astro          # Mural completo de medalhas
│   └── styles/
│       └── global.css                # Tailwind imports, @font-face e resets
├── tests/
│   ├── whatsapp.test.ts              # Testes unitários do helper do WhatsApp
│   └── siteConfig.test.ts            # Testes de integridade das turmas e dados
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

### Task 1: Scaffolding do Projeto Astro com Tailwind e TypeScript

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: N/A
- Produces: Ambiente Astro configurado com suporte a Tailwind CSS e TypeScript estrito

- [ ] **Step 1: Criar package.json com scripts e dependências do projeto**

```json
{
  "name": "kenshinkai-krt",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "test": "node --import tsx --test tests/*.test.ts"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/tailwind": "^6.0.0",
    "astro": "^5.4.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  },
  "devDependencies": {
    "tsx": "^4.19.3"
  }
}
```

- [ ] **Step 2: Criar as configurações do Astro, Tailwind e TypeScript**

Criar `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
```

Criar `tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tatame: '#0B0C0E',
        surface: {
          dark: '#15171B',
          card: '#1F2228',
        },
        crimson: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
        },
        gold: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        title: ['"Zenzai Itacha"', 'serif'],
        body: ['Panoragraf', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

Criar `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Criar `public/favicon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0B0C0E"/>
  <circle cx="50" cy="50" r="34" fill="#DC2626"/>
  <circle cx="50" cy="50" r="28" fill="#0B0C0E"/>
  <path d="M50 26 V74 M36 40 H64 M32 58 H68" stroke="#F9FAFB" stroke-width="5" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Instalar as dependências do projeto**

Run: `npm install`
Expected: Instalação concluída com sucesso e geração do `package-lock.json`.

- [ ] **Step 4: Verificar se o comando astro reconhece o ambiente**

Run: `npx astro --version`
Expected: Versão do Astro exibida sem erros.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json public/favicon.svg
git commit -m "chore: scaffold astro project with tailwind and typescript"
```

---

### Task 2: Configuração de Tipografia, Fontes e Estilos Globais

**Files:**
- Create: `public/fonts/` (arquivos ou fallbacks tipográficos)
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: Tailwind classes e `@font-face`
- Produces: Folha de estilos globais com fontes `Zenzai Itacha` e `Panoragraf`, resets de fundo escuro e tipografia

- [ ] **Step 1: Criar fontes locais em public/fonts/ e estilização global**

Configurar `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Zenzai Itacha';
  src: local('Zenzai Itacha'), local('ZenzaiItacha'),
       url('/fonts/zenzai-itacha.woff2') format('woff2'),
       url('/fonts/zenzai-itacha.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Panoragraf';
  src: local('Panoragraf'),
       url('/fonts/panoragraf.woff2') format('woff2'),
       url('/fonts/panoragraf.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
  background-color: #0B0C0E;
  color: #F9FAFB;
  font-family: 'Panoragraf', system-ui, -apple-system, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Zenzai Itacha', serif;
  letter-spacing: 0.05em;
}

/* Regra estrita: Zero badges / spans decorativos */
::selection {
  background-color: #DC2626;
  color: #FFFFFF;
}
```

- [ ] **Step 2: Criar arquivo de fontes locais / fontes seguras no public/fonts**

Criar pasta `public/fonts/` e gerar gerador de fontes ou arquivos vetoriais tipográficos para garantir que não haja erros 404 em build.

- [ ] **Step 3: Testar compilação do CSS com Astro**

Run: `npx astro check`
Expected: Verificação sem erros de tipagem.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css public/fonts
git commit -m "style: add global styles with Zenzai Itacha and Panoragraf fonts"
```

---

### Task 3: Central de Dados (`siteConfig.ts`) e Helper do WhatsApp (com TDD)

**Files:**
- Create: `tests/whatsapp.test.ts`
- Create: `tests/siteConfig.test.ts`
- Create: `src/utils/whatsapp.ts`
- Create: `src/data/siteConfig.ts`

**Interfaces:**
- Consumes: N/A
- Produces:
  - `buildWhatsAppUrl(phone: string, text: string): string`
  - `siteConfig: SiteConfig` (contendo exatamente as 2 turmas oficiais: Infantil 18h-20h e Juvenil/Adulto 20h-22h)

- [ ] **Step 1: Escrever teste falho para o helper de WhatsApp e integridade de dados**

Criar `tests/whatsapp.test.ts`:
```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl } from '../src/utils/whatsapp.js';

test('buildWhatsAppUrl formata número e codifica caracteres especiais', () => {
  const phone = '5511999998888';
  const message = 'Olá! Gostaria de agendar uma aula experimental.';
  const url = buildWhatsAppUrl(phone, message);
  
  assert.equal(
    url,
    'https://wa.me/5511999998888?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20aula%20experimental.'
  );
});

test('buildWhatsAppUrl remove caracteres não numéricos do telefone', () => {
  const phone = '+55 (11) 99999-8888';
  const message = 'Teste';
  const url = buildWhatsAppUrl(phone, message);
  
  assert.equal(url, 'https://wa.me/5511999998888?text=Teste');
});
```

Criar `tests/siteConfig.test.ts`:
```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/data/siteConfig.js';

test('siteConfig possui estritamente as 2 turmas oficiais com horários corretos', () => {
  assert.equal(siteConfig.classes.length, 2);

  const infantil = siteConfig.classes.find((c) => c.id === 'infantil');
  assert.ok(infantil, 'Turma infantil deve existir');
  assert.equal(infantil?.schedule, '18:00 às 20:00');

  const adulto = siteConfig.classes.find((c) => c.id === 'juvenil-adulto');
  assert.ok(adulto, 'Turma juvenil-adulto deve existir');
  assert.equal(adulto?.schedule, '20:00 às 22:00');
});

test('siteConfig contém contatos e dados do Karatê para Todos', () => {
  assert.ok(siteConfig.contact.whatsappNumber);
  assert.ok(siteConfig.socialProject.name === 'Karatê para Todos');
  assert.ok(siteConfig.socialProject.pixKey);
});
```

- [ ] **Step 2: Executar os testes para confirmar que falham (Red)**

Run: `npm test`
Expected: FAIL com módulo ou função não encontrada.

- [ ] **Step 3: Implementar `src/utils/whatsapp.ts` e `src/data/siteConfig.ts` (Green)**

Criar `src/utils/whatsapp.ts`:
```typescript
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
```

Criar `src/data/siteConfig.ts`:
```typescript
export interface DojoClass {
  id: string;
  name: string;
  schedule: string;
  days: string;
  ageGroup: string;
  description: string;
  whatsappMessage: string;
}

export interface Sensei {
  name: string;
  rank: string;
  role: string;
  bio: string;
}

export interface Achievement {
  id: string;
  year: number;
  tournament: string;
  category: string;
  medal: 'Ouro' | 'Prata' | 'Bronze';
  athlete: string;
}

export const siteConfig = {
  name: "Associação Karatê Kenshinkai",
  shortName: "Kenshinkai",
  tagline: "Tradição, Disciplina e Formação Humana",
  description: "Dojo tradicional de Karatê focado no desenvolvimento integral de crianças, jovens e adultos, e sede do projeto social Karatê para Todos.",
  
  contact: {
    whatsappNumber: "5511999999999",
    whatsappDisplay: "(11) 99999-9999",
    instagram: "@karate.kenshinkai",
    instagramUrl: "https://instagram.com",
    address: "Rua do Dojô Tradicional, 123 - Bairro Central",
    cityState: "São Paulo - SP",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1!2d-46.6!3d-23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzAwLjAiUyA0NsKwMzYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1600000000000",
    defaultMessage: "Olá! Conheci o site da Kenshinkai e gostaria de agendar uma aula experimental gratuita de Karatê."
  },

  classes: [
    {
      id: "infantil",
      name: "Turma Infantil",
      schedule: "18:00 às 20:00",
      days: "Segundas, Quartas e Sextas",
      ageGroup: "Crianças de 5 a 12 anos",
      description: "Construção de disciplina formativa, foco, coordenação motora, respeito e autoconfiança através da arte marcial.",
      whatsappMessage: "Olá! Gostaria de agendar uma aula experimental para meu(minha) filho(a) na Turma Infantil (18h às 20h)."
    },
    {
      id: "juvenil-adulto",
      name: "Turma Juvenil e Adulto",
      schedule: "20:00 às 22:00",
      days: "Segundas, Quartas e Sextas",
      ageGroup: "A partir de 13 anos",
      description: "Treinamento técnico aprofundado (Kihon, Kata e Kumite), condicionamento físico, alívio do estresse e defesa pessoal.",
      whatsappMessage: "Olá! Gostaria de agendar uma aula experimental na Turma Juvenil/Adulto (20h às 22h)."
    }
  ] satisfies DojoClass[],

  socialProject: {
    name: "Karatê para Todos",
    headline: "Transformando o futuro de jovens através da arte marcial",
    description: "Iniciativa voluntária da Associação Kenshinkai que oferece aulas gratuitas, kimonos e apoio educacional para crianças e adolescentes em situação de vulnerabilidade social.",
    pixKey: "social@kenshinkai.org.br",
    pixType: "E-mail Oficial da Associação",
    whatsappMessage: "Olá! Gostaria de mais informações sobre como apoiar ou apadrinhar o projeto social Karatê para Todos."
  },

  senseis: [
    {
      name: "Mestre Responsável",
      rank: "Faixa Preta 5º Dan",
      role: "Diretor Técnico e Fundador",
      bio: "Mais de 30 anos dedicados ao estudo, preservação e ensino do Karatê tradicional, com histórico de formação de dezenas de faixas pretas e campeões dentro e fora do tatame."
    }
  ] satisfies Sensei[],

  achievements: [
    {
      id: "1",
      year: 2025,
      tournament: "Campeonato Estadual de Karatê",
      category: "Kumite Individual Masculino",
      medal: "Ouro",
      athlete: "Atleta Destaque Kenshinkai"
    },
    {
      id: "2",
      year: 2024,
      tournament: "Copa Regional da Amizade",
      category: "Kata em Equipe Juvenil",
      medal: "Ouro",
      athlete: "Equipe Juvenil do Projeto Social"
    },
    {
      id: "3",
      year: 2024,
      tournament: "Torneio Interestadual de Artes Marciais",
      category: "Kumite Feminino Adulto",
      medal: "Prata",
      athlete: "Atleta Kenshinkai"
    },
    {
      id: "4",
      year: 2023,
      tournament: "Torneio de Estreantes",
      category: "Kumite Infantil",
      medal: "Bronze",
      athlete: "Atleta Infantil Kenshinkai"
    }
  ] satisfies Achievement[]
};
```

- [ ] **Step 4: Executar testes e validar aprovação (Green)**

Run: `npm test`
Expected: PASS em todos os testes (`tests/whatsapp.test.ts` e `tests/siteConfig.test.ts`).

- [ ] **Step 5: Commit**

```bash
git add tests/whatsapp.test.ts tests/siteConfig.test.ts src/utils/whatsapp.ts src/data/siteConfig.ts
git commit -m "feat: add siteConfig and whatsapp url helper with tests"
```

---

### Task 4: Layout Mestre, Header Responsivo, Footer e Botão WhatsApp Flutuante

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/WhatsAppFloat.astro`

**Interfaces:**
- Consumes: `siteConfig`, `buildWhatsAppUrl`
- Produces: Layout comum com OpenGraph, menu com navegação móvel fluida, rodapé completo e botão flutuante

- [ ] **Step 1: Criar o componente WhatsAppFloat.astro**

Criar `src/components/WhatsAppFloat.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const whatsappUrl = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  siteConfig.contact.defaultMessage
);
---

<aside aria-label="Contato direto" class="fixed bottom-6 right-6 z-50">
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp com o Dojo Kenshinkai"
    class="flex items-center justify-center w-14 h-14 bg-whatsapp hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-whatsapp/40"
  >
    <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.276-.1-.477-.15-.678.15-.201.3-.777.98-.953 1.18-.176.2-.352.226-.653.075s-1.27-.468-2.42-1.494c-.895-.798-1.5-1.784-1.676-2.085s-.019-.463.132-.613c.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.1-.201.05-.377-.025-.527s-.678-1.635-.93-2.238c-.244-.588-.493-.508-.678-.517-.176-.008-.377-.01-.578-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512s1.079 2.913 1.23 3.114c.151.2 2.124 3.243 5.145 4.548.718.311 1.279.497 1.716.636.723.23 1.38.198 1.9-.12.58-.354 1.782-1.229 2.033-1.756.251-.527.251-.98.176-1.08-.075-.101-.276-.176-.577-.326zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.84.5 3.56 1.38 5.05L2 22l5.08-1.33c1.44.8 3.08 1.25 4.96 1.25 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.25c-1.61 0-3.1-.44-4.39-1.2l-.31-.19-3.26.85.87-3.18-.21-.33a8.17 8.17 0 01-1.27-4.38c0-4.55 3.7-8.25 8.25-8.25 4.55 0 8.25 3.7 8.25 8.25 0 4.55-3.7 8.23-8.25 8.23z"/>
    </svg>
  </a>
</aside>
```

- [ ] **Step 2: Criar o componente Header.astro com menu mobile limpo**

Criar `src/components/Header.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const navWhatsApp = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  siteConfig.contact.defaultMessage
);
---

<header class="sticky top-0 z-40 bg-tatame/95 backdrop-blur-md border-b border-white/10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
    <a href="/" class="flex flex-col group">
      <span class="text-2xl font-bold tracking-wider text-white group-hover:text-crimson transition-colors font-title">
        {siteConfig.shortName.toUpperCase()}
      </span>
      <span class="text-xs text-neutral-400 tracking-widest uppercase">
        Karatê Tradicional
      </span>
    </a>

    <!-- Navegação Desktop -->
    <nav class="hidden md:flex items-center space-x-8 text-sm text-neutral-300">
      <a href="/" class="hover:text-white transition-colors">Início</a>
      <a href="/#sobre" class="hover:text-white transition-colors">Sobre</a>
      <a href="/#turmas" class="hover:text-white transition-colors">Turmas</a>
      <a href="/karate-para-todos" class="hover:text-crimson transition-colors">Projeto Social</a>
      <a href="/conquistas" class="hover:text-gold transition-colors">Conquistas</a>
      <a href="/#localizacao" class="hover:text-white transition-colors">Localização</a>
    </nav>

    <!-- Botão de Ação Direta Topo -->
    <div class="hidden md:flex items-center">
      <a
        href={navWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-crimson hover:bg-crimson-dark text-white text-sm font-semibold px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:shadow-crimson/20"
      >
        Aula Experimental
      </a>
    </div>

    <!-- Botão Hambúrguer Mobile -->
    <button
      id="mobile-menu-toggle"
      aria-label="Abrir Menu de Navegação"
      aria-expanded="false"
      class="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path id="menu-icon-bars" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path id="menu-icon-close" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Menu Dropdown Mobile -->
  <div id="mobile-menu" class="hidden md:hidden bg-surface-dark border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
    <a href="/" class="block py-2 text-neutral-200 hover:text-white">Início</a>
    <a href="/#sobre" class="block py-2 text-neutral-200 hover:text-white">Sobre o Dojô</a>
    <a href="/#turmas" class="block py-2 text-neutral-200 hover:text-white">Turmas & Horários</a>
    <a href="/karate-para-todos" class="block py-2 text-crimson font-medium">Projeto Social</a>
    <a href="/conquistas" class="block py-2 text-gold font-medium">Conquistas & Atletas</a>
    <a href="/#localizacao" class="block py-2 text-neutral-200 hover:text-white">Localização</a>
    <div class="pt-2">
      <a
        href={navWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        class="block text-center w-full bg-crimson hover:bg-crimson-dark text-white font-medium py-3 rounded"
      >
        Agendar Aula Experimental
      </a>
    </div>
  </div>
</header>

<script>
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');

  toggleBtn?.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    menu?.classList.toggle('hidden');
    iconBars?.classList.toggle('hidden');
    iconClose?.classList.toggle('hidden');
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      iconBars?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    });
  });
</script>
```

- [ ] **Step 3: Criar o componente Footer.astro**

Criar `src/components/Footer.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const footerWhatsApp = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  siteConfig.contact.defaultMessage
);
---

<footer class="bg-surface-dark border-t border-white/10 text-neutral-400 text-sm py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    <div>
      <p class="text-xl font-bold text-white mb-2 font-title">{siteConfig.name}</p>
      <p class="text-neutral-400 mb-4">{siteConfig.tagline}</p>
      <p class="text-xs text-neutral-500">
        Promovendo disciplina, cidadania e excelência marcial através do Karatê tradicional.
      </p>
    </div>

    <div>
      <p class="text-base font-semibold text-white mb-3">Links Rápidos</p>
      <ul class="space-y-2">
        <li><a href="/#sobre" class="hover:text-white transition-colors">Sobre a Kenshinkai</a></li>
        <li><a href="/#turmas" class="hover:text-white transition-colors">Turmas e Horários</a></li>
        <li><a href="/karate-para-todos" class="hover:text-crimson transition-colors">Projeto Karatê para Todos</a></li>
        <li><a href="/conquistas" class="hover:text-gold transition-colors">Mural de Conquistas</a></li>
        <li><a href="/#localizacao" class="hover:text-white transition-colors">Endereço e Mapa</a></li>
      </ul>
    </div>

    <div>
      <p class="text-base font-semibold text-white mb-3">Contato & Atendimento</p>
      <p class="text-neutral-300 mb-1">{siteConfig.contact.address}</p>
      <p class="text-neutral-400 mb-4">{siteConfig.contact.cityState}</p>
      <div class="space-y-2">
        <a
          href={footerWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-whatsapp hover:text-emerald-400 font-medium"
        >
          WhatsApp: {siteConfig.contact.whatsappDisplay}
        </a>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-white/5 text-center text-xs text-neutral-500">
    <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
  </div>
</footer>
```

- [ ] **Step 4: Criar o layout BaseLayout.astro com SEO e OpenGraph**

Criar `src/layouts/BaseLayout.astro`:
```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import WhatsAppFloat from '../components/WhatsAppFloat.astro';
import { siteConfig } from '../data/siteConfig';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = `${siteConfig.name} | Karatê Tradicional & Projeto Social`,
  description = siteConfig.description,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site || 'https://kenshinkai.com.br');
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />
    
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- OpenGraph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={siteConfig.name} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>
  <body class="min-h-screen flex flex-col bg-tatame text-neutral-100 antialiased selection:bg-crimson selection:text-white">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
    <WhatsAppFloat />
  </body>
</html>
```

- [ ] **Step 5: Executar verificação de tipos e compilação**

Run: `npx astro check`
Expected: 0 erros encontrados.

- [ ] **Step 6: Commit**

```bash
git add src/components/WhatsAppFloat.astro src/components/Header.astro src/components/Footer.astro src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout, Header, Footer and WhatsAppFloat"
```

---

### Task 5: Componentes da Página Principal (Hero, Filosofia, Turmas, SocialBanner, Conquistas, Sensei e Mapa)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Philosophy.astro`
- Create: `src/components/ClassesGrid.astro`
- Create: `src/components/SocialBanner.astro`
- Create: `src/components/MedalsTeaser.astro`
- Create: `src/components/SenseiBio.astro`
- Create: `src/components/LocationMap.astro`

**Interfaces:**
- Consumes: `siteConfig`, `buildWhatsAppUrl`
- Produces: Seções modulares da landing page, com estrita obediência à regra de zero badges/spans e turmas exatas (Infantil 18h-20h e Adulto 20h-22h)

- [ ] **Step 1: Criar Hero.astro**

Criar `src/components/Hero.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const heroCtaUrl = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  siteConfig.contact.defaultMessage
);
---

<section class="relative bg-gradient-to-b from-surface-dark to-tatame py-24 md:py-36 border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
    <p class="text-crimson font-semibold tracking-widest text-sm md:text-base uppercase mb-4">
      Arte Marcial Tradicional Japonesa
    </p>
    <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
      {siteConfig.name}
    </h1>
    <p class="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed font-body">
      Mais do que técnicas de autodefesa: desenvolvemos caráter, disciplina, respeito e superação para todas as fases da vida.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href={heroCtaUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="w-full sm:w-auto bg-crimson hover:bg-crimson-dark text-white font-semibold text-lg px-8 py-4 rounded shadow-xl hover:shadow-crimson/30 transition-all duration-300"
      >
        Agendar Aula Experimental Gratuita
      </a>
      <a
        href="#turmas"
        class="w-full sm:w-auto bg-surface-card hover:bg-surface-dark border border-white/20 text-white font-medium text-lg px-8 py-4 rounded transition-all duration-300"
      >
        Ver Turmas & Horários
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Criar Philosophy.astro (Dojo Kun & Princípios)**

Criar `src/components/Philosophy.astro`:
```astro
---
const dojoKun = [
  "Esforçar-se para a formação do caráter.",
  "Fidelidade para com o verdadeiro caminho da razão.",
  "Criar o espírito de esforço e perseverança.",
  "Respeito acima de tudo.",
  "Conter o espírito de agressão."
];
---

<section id="sobre" class="py-20 bg-tatame border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      <p class="text-crimson text-sm font-semibold tracking-widest uppercase mb-2">Tradição & Linhagem</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Os Valores da Kenshinkai</h2>
      <p class="text-neutral-400 max-w-2xl mx-auto">
        No dojo Kenshinkai, a prática marcial é fundamentada nos ensinamentos clássicos japoneses, onde o desenvolvimento moral e o respeito mútuo precedem qualquer técnica de combate.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="bg-surface-dark p-8 rounded border border-white/10">
        <h3 class="text-2xl font-bold text-white mb-6">Dojo Kun (Lema do Dojô)</h3>
        <ol class="space-y-4">
          {dojoKun.map((item, index) => (
            <li class="flex items-start text-neutral-200">
              <span class="text-crimson font-bold mr-3">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div class="space-y-6 text-neutral-300 leading-relaxed">
        <h3 class="text-2xl font-bold text-white">Formação que Ultrapassa o Tatame</h3>
        <p>
          A Associação Kenshinkai acredita que o Karatê é uma ferramenta de transformação contínua. Ensinamos a canalizar energia com foco, a vencer o medo com serenidade e a tratar colegas e mestres com reverência.
        </p>
        <p>
          Nossos treinos equilibram o rigor técnico de kihon (fundamentos), kata (formas) e kumite (luta), adaptados com precisão pedagógica para cada faixa etária.
        </p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Criar ClassesGrid.astro (Turma Infantil e Turma Juvenil/Adulto)**

Criar `src/components/ClassesGrid.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
---

<section id="turmas" class="py-20 bg-surface-dark border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      <p class="text-crimson text-sm font-semibold tracking-widest uppercase mb-2">Treinos & Horários</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Escolha a Sua Turma</h2>
      <p class="text-neutral-400 max-w-2xl mx-auto">
        Aulas estruturadas com metodologia adequada para cada estágio de desenvolvimento motor e marcial.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {siteConfig.classes.map((cls) => {
        const ctaUrl = buildWhatsAppUrl(siteConfig.contact.whatsappNumber, cls.whatsappMessage);
        return (
          <article class="bg-surface-card p-8 rounded border border-white/10 flex flex-col justify-between hover:border-crimson/40 transition-all duration-200">
            <div>
              <p class="text-crimson text-xs font-semibold uppercase tracking-wider mb-1">{cls.ageGroup}</p>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4">{cls.name}</h3>
              
              <div class="mb-6 space-y-2 text-sm text-neutral-300 border-y border-white/10 py-4">
                <p><strong class="text-white">Horário:</strong> {cls.schedule}</p>
                <p><strong class="text-white">Dias:</strong> {cls.days}</p>
              </div>

              <p class="text-neutral-400 leading-relaxed mb-8">
                {cls.description}
              </p>
            </div>

            <div>
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="block text-center w-full bg-crimson hover:bg-crimson-dark text-white font-semibold py-3.5 px-6 rounded transition-colors duration-200"
              >
                Agendar nesta turma
              </a>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Criar SocialBanner.astro e MedalsTeaser.astro**

Criar `src/components/SocialBanner.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
---

<section class="py-20 bg-tatame border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="bg-surface-dark border border-crimson/30 rounded p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="max-w-2xl">
        <p class="text-crimson text-sm font-semibold tracking-widest uppercase mb-2">Ação Social</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Projeto {siteConfig.socialProject.name}
        </h2>
        <p class="text-neutral-300 leading-relaxed mb-4">
          {siteConfig.socialProject.description}
        </p>
        <p class="text-sm text-neutral-400">
          Você pode apadrinhar um aluno, doar kimonos usados ou apoiar viagens para competições oficiais.
        </p>
      </div>

      <div class="flex-shrink-0 w-full md:w-auto">
        <a
          href="/karate-para-todos"
          class="block text-center bg-crimson hover:bg-crimson-dark text-white font-semibold py-4 px-8 rounded transition-colors duration-200 whitespace-nowrap"
        >
          Conhecer o Projeto Social
        </a>
      </div>
    </div>
  </div>
</section>
```

Criar `src/components/MedalsTeaser.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';

const featuredAchievements = siteConfig.achievements.slice(0, 3);
---

<section class="py-20 bg-surface-dark border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <p class="text-gold text-sm font-semibold tracking-widest uppercase mb-2">Excelência Competitiva</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white">Mural de Conquistas Recentes</h2>
      </div>
      <div class="mt-4 md:mt-0">
        <a href="/conquistas" class="text-gold hover:text-amber-400 font-medium inline-flex items-center">
          Ver histórico completo de medalhas &rarr;
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredAchievements.map((item) => (
        <div class="bg-surface-card p-6 rounded border border-white/10">
          <p class="text-gold font-bold text-lg mb-1">Medalha de {item.medal}</p>
          <h3 class="text-white font-semibold text-lg mb-2">{item.tournament}</h3>
          <p class="text-sm text-neutral-300 mb-1">{item.category}</p>
          <p class="text-xs text-neutral-500">{item.athlete} • {item.year}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Criar SenseiBio.astro e LocationMap.astro**

Criar `src/components/SenseiBio.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
---

<section class="py-20 bg-tatame border-b border-white/10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16">
      <p class="text-crimson text-sm font-semibold tracking-widest uppercase mb-2">Mestres Responsáveis</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Liderança e Experiência Técnica</h2>
    </div>

    <div class="max-w-3xl mx-auto">
      {siteConfig.senseis.map((sensei) => (
        <article class="bg-surface-dark p-8 rounded border border-white/10 text-center md:text-left">
          <h3 class="text-2xl font-bold text-white mb-1">{sensei.name}</h3>
          <p class="text-crimson font-medium text-sm mb-4">{sensei.rank} • {sensei.role}</p>
          <p class="text-neutral-300 leading-relaxed font-body">
            {sensei.bio}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
```

Criar `src/components/LocationMap.astro`:
```astro
---
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const contactUrl = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  "Olá! Gostaria de visitar o dojo Kenshinkai para conhecer o espaço."
);
---

<section id="localizacao" class="py-20 bg-surface-dark">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <p class="text-crimson text-sm font-semibold tracking-widest uppercase mb-2">Venha nos Conhecer</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Localização & Contato</h2>
      <p class="text-neutral-400">
        Nosso dojo está de portas abertas para sua visita.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      <div class="bg-surface-card p-8 rounded border border-white/10 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-white mb-4">Endereço do Dojô</h3>
          <p class="text-neutral-200 text-lg mb-2">{siteConfig.contact.address}</p>
          <p class="text-neutral-400 mb-6">{siteConfig.contact.cityState}</p>
          
          <h4 class="text-base font-semibold text-white mb-2">Horários de Treino</h4>
          <p class="text-sm text-neutral-300 mb-1">Turma Infantil: 18:00 às 20:00</p>
          <p class="text-sm text-neutral-300 mb-6">Turma Juvenil e Adulto: 20:00 às 22:00</p>
        </div>

        <div class="pt-6 border-t border-white/10">
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="block text-center w-full bg-crimson hover:bg-crimson-dark text-white font-semibold py-3.5 px-6 rounded transition-colors"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>

      <div class="rounded border border-white/10 overflow-hidden min-h-[300px]">
        <iframe
          src={siteConfig.contact.mapsEmbedUrl}
          width="100%"
          height="100%"
          style="border:0; min-height: 320px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Localização do Dojô Kenshinkai"
        ></iframe>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Executar verificação de tipos**

Run: `npx astro check`
Expected: 0 erros.

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.astro src/components/Philosophy.astro src/components/ClassesGrid.astro src/components/SocialBanner.astro src/components/MedalsTeaser.astro src/components/SenseiBio.astro src/components/LocationMap.astro
git commit -m "feat: add main home components with exact classes and no badges"
```

---

### Task 6: Página Inicial (`src/pages/index.astro`) e Validação do Funil

**Files:**
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout.astro`, componentes da Home
- Produces: Landing page completa e responsiva pronta para conversão

- [ ] **Step 1: Criar src/pages/index.astro**

Criar `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Philosophy from '../components/Philosophy.astro';
import ClassesGrid from '../components/ClassesGrid.astro';
import SocialBanner from '../components/SocialBanner.astro';
import MedalsTeaser from '../components/MedalsTeaser.astro';
import SenseiBio from '../components/SenseiBio.astro';
import LocationMap from '../components/LocationMap.astro';
---

<BaseLayout>
  <Hero />
  <Philosophy />
  <ClassesGrid />
  <SocialBanner />
  <MedalsTeaser />
  <SenseiBio />
  <LocationMap />
</BaseLayout>
```

- [ ] **Step 2: Executar build e typecheck**

Run: `npx astro check && npm run build`
Expected: 0 erros, compilação estática bem-sucedida em `dist/`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble complete home landing page"
```

---

### Task 7: Página Dedicada do Projeto Social (`src/pages/karate-para-todos.astro`)

**Files:**
- Create: `src/pages/karate-para-todos.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `siteConfig`, `buildWhatsAppUrl`
- Produces: Página dedicada com história, impacto social, canal de doações PIX e suporte de kimonos

- [ ] **Step 1: Criar src/pages/karate-para-todos.astro**

Criar `src/pages/karate-para-todos.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteConfig } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const whatsappApoioUrl = buildWhatsAppUrl(
  siteConfig.contact.whatsappNumber,
  siteConfig.socialProject.whatsappMessage
);
---

<BaseLayout
  title={`Projeto ${siteConfig.socialProject.name} | ${siteConfig.name}`}
  description={siteConfig.socialProject.description}
>
  <section class="py-20 bg-gradient-to-b from-surface-dark to-tatame border-b border-white/10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <p class="text-crimson font-semibold tracking-widest uppercase text-sm mb-3">Inclusão & Cidadania</p>
      <h1 class="text-4xl sm:text-6xl font-bold text-white mb-6">
        {siteConfig.socialProject.name}
      </h1>
      <p class="text-xl text-neutral-300 leading-relaxed font-body">
        {siteConfig.socialProject.headline}
      </p>
    </div>
  </section>

  <section class="py-16 bg-tatame border-b border-white/10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
      <div>
        <h2 class="text-3xl font-bold text-white mb-4">Nossa Missão</h2>
        <p class="text-neutral-300 leading-relaxed text-lg mb-4">
          O projeto Karatê para Todos nasceu da convicção de que os valores das artes marciais não devem ser privilégio de poucos. Através desta iniciativa social mantida pela Associação Kenshinkai, abrimos as portas do dojô para crianças e jovens da rede pública e famílias de baixa renda.
        </p>
        <p class="text-neutral-400 leading-relaxed">
          Mais do que ensinar golpes, ensinamos resiliência, respeito aos mais velhos, foco nos estudos e convivência pacífica em sociedade.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-surface-dark p-8 rounded border border-white/10">
          <h3 class="text-2xl font-bold text-white mb-3">O Que Oferecemos</h3>
          <ul class="space-y-3 text-neutral-300">
            <li class="flex items-start">
              <span class="text-crimson mr-2 font-bold">•</span>
              Aulas gratuitas com os mesmos mestres e metodologia das turmas regulares.
            </li>
            <li class="flex items-start">
              <span class="text-crimson mr-2 font-bold">•</span>
              Fornecimento e reposição de kimonos e faixas conforme graduação.
            </li>
            <li class="flex items-start">
              <span class="text-crimson mr-2 font-bold">•</span>
              Acompanhamento do rendimento escolar e disciplina familiar.
            </li>
            <li class="flex items-start">
              <span class="text-crimson mr-2 font-bold">•</span>
              Inscrições custeadas para torneios oficiais e exames de faixa.
            </li>
          </ul>
        </div>

        <div class="bg-surface-dark p-8 rounded border border-crimson/30">
          <h3 class="text-2xl font-bold text-white mb-3">Como Você Pode Apoiar</h3>
          <p class="text-neutral-300 mb-6 leading-relaxed">
            Sua contribuição direta mantém um jovem no tatame e longe da vulnerabilidade social:
          </p>

          <div class="bg-tatame p-4 rounded border border-white/10 mb-6">
            <p class="text-xs text-neutral-400 uppercase tracking-wider mb-1">Chave PIX Direta:</p>
            <p class="text-lg font-mono text-white font-bold select-all">{siteConfig.socialProject.pixKey}</p>
            <p class="text-xs text-neutral-500 mt-1">{siteConfig.socialProject.pixType}</p>
          </div>

          <a
            href={whatsappApoioUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="block text-center w-full bg-crimson hover:bg-crimson-dark text-white font-semibold py-3.5 px-6 rounded transition-colors"
          >
            Falar com a Coordenação do Projeto
          </a>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Executar verificação e build**

Run: `npx astro check && npm run build`
Expected: 0 erros, `/karate-para-todos` gerada em `dist/karate-para-todos/index.html`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/karate-para-todos.astro
git commit -m "feat: add dedicated karate-para-todos social project page"
```

---

### Task 8: Página Dedicada de Conquistas (`src/pages/conquistas.astro`)

**Files:**
- Create: `src/pages/conquistas.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `siteConfig`
- Produces: Galeria completa de medalhas e atletas

- [ ] **Step 1: Criar src/pages/conquistas.astro**

Criar `src/pages/conquistas.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteConfig } from '../data/siteConfig';
---

<BaseLayout
  title={`Mural de Conquistas | ${siteConfig.name}`}
  description="Histórico de medalhas, torneios e atletas premiados da Associação Karatê Kenshinkai."
>
  <section class="py-20 bg-gradient-to-b from-surface-dark to-tatame border-b border-white/10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <p class="text-gold font-semibold tracking-widest uppercase text-sm mb-3">Honra & Esforço</p>
      <h1 class="text-4xl sm:text-6xl font-bold text-white mb-6">
        Mural de Conquistas
      </h1>
      <p class="text-xl text-neutral-300 leading-relaxed font-body">
        O fruto de cada gota de suor no tatame: conheça a trajetória competitiva dos nossos atletas.
      </p>
    </div>
  </section>

  <section class="py-16 bg-tatame">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteConfig.achievements.map((item) => (
          <article class="bg-surface-dark p-6 rounded border border-white/10 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-gold font-bold text-lg">Medalha de {item.medal}</span>
                <span class="text-xs text-neutral-400 font-mono">{item.year}</span>
              </div>
              <h2 class="text-xl font-bold text-white mb-2">{item.tournament}</h2>
              <p class="text-sm text-neutral-300 mb-1"><strong class="text-neutral-200">Categoria:</strong> {item.category}</p>
              <p class="text-sm text-neutral-400"><strong class="text-neutral-200">Atleta:</strong> {item.athlete}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Executar verificação e build**

Run: `npx astro check && npm run build`
Expected: 0 erros, `/conquistas` gerada em `dist/conquistas/index.html`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/conquistas.astro
git commit -m "feat: add dedicated conquistas achievements page"
```

---

### Task 9: Validação Global, Testes Automatizados e Build de Produção

**Files:**
- Modify: `README.md` (instruções atualizadas para executar e personalizar)

**Interfaces:**
- Consumes: Todos os componentes e páginas
- Produces: Release estável pronta para deploy

- [ ] **Step 1: Rodar suíte de testes unitários**

Run: `npm test`
Expected: PASS em 100% dos testes.

- [ ] **Step 2: Rodar verificação de tipos estritos**

Run: `npm run check`
Expected: 0 erros.

- [ ] **Step 3: Rodar compilação final de produção**

Run: `npm run build`
Expected: Pasta `dist/` gerada com todas as páginas estáticas renderizadas (`/`, `/karate-para-todos`, `/conquistas`).

- [ ] **Step 4: Atualizar README.md com instruções claras de execução e customização**

Atualizar [README.md](file:///home/luizarch/kenshinkai-krt/README.md) documentando como rodar `npm run dev`, `npm test` e como editar [siteConfig.ts](file:///home/luizarch/kenshinkai-krt/src/data/siteConfig.ts).

- [ ] **Step 5: Commit final**

```bash
git add README.md
git commit -m "docs: update README with dev instructions and project details"
```
