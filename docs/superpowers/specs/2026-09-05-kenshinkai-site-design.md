# Especificação de Design: Site Institucional Karatê Kenshinkai & Karatê para Todos

- **Data:** 2026-09-05
- **Status:** Aprovado
- **Repositório:** `kenshinkai-krt`
- **Classificação do Projeto:** Architectural (Greenfield)

---

## 1. Visão Geral e Objetivos

O projeto consiste no desenvolvimento do site institucional oficial da **Associação Karatê Kenshinkai** e da iniciativa social **Karatê para Todos**. 

### Objetivos Primários:
1. **Captação de Novos Alunos:** Foco central em conversão direta para agendamento de aulas experimentais gratuitas via WhatsApp nas duas turmas do dojo.
2. **Autoridade e Tradição Marcial:** Apresentar a história, linhagem, princípios e mestres responsáveis do dojo com seriedade e respeito à cultura japonesa.
3. **Visibilidade ao Impacto Social:** Dedicar espaço de destaque ao projeto **Karatê para Todos**, promovendo inclusão e atraindo apoiadores, doações de kimonos e patrocínios para atletas.
4. **Mural de Conquistas:** Homenagear o histórico competitivo dos atletas da Kenshinkai em campeonatos estaduais, nacionais e internacionais.

---

## 2. Stack Tecnológica & Dependências

- **Framework:** [Astro](https://astro.build/) (versão mais recente estável)
- **Estilização:** Tailwind CSS com tema estendido sob medida
- **Linguagem:** TypeScript (modo estrito)
- **Renderização:** Estática (SSG - Static Site Generation) para máxima performance, SEO e custo zero de hospedagem
- **Hospedagem Alvo:** Vercel, Netlify ou GitHub Pages

---

## 3. Identidade Visual & Diretrizes de Design

### 3.1 Paleta de Cores
- **Fundo Principal (Black Tatame):** `#0B0C0E`
- **Superfícies e Cards (Dark Charcoal):** `#15171B` e `#1F2228`
- **Bordas e Linhas de Contraste:** `rgba(255, 255, 255, 0.08)` e `rgba(220, 38, 38, 0.25)`
- **Acento Primário (Vermelho Carmesim / Hi-no-maru):** `#DC2626` e `#B91C1C`
- **Acento de Honra (Dourado Medalha / Conquistas):** `#F59E0B` e `#D97706`
- **Textos Principais:** `#F9FAFB` (Branco Puro / Alto contraste)
- **Textos Secundários / Apoio:** `#9CA3AF` (Cinza neutro legível)
- **Canal WhatsApp:** `#25D366`

### 3.2 Tipografia
- **Títulos e Cabeçalhos (H1, H2, H3, H4, H5, H6):** `Zenzai Itacha` (estética caligráfica e marcial japonesa).
- **Corpo de Texto, Parágrafos, Navegação e Botões:** `Panoragraf` (geométrica, moderna, com renderização móvel nítida).
- **Configuração de Fontes:** As fontes serão declaradas via `@font-face` em `src/styles/global.css` com arquivos correspondentes em `public/fonts/` e fallbacks seguros configurados (`font-serif` para Zenzai Itacha e `font-sans` para Panoragraf).

### 3.3 Regra de Design Sóbrio
- **Zero Badges e Zero Spans Decorativos:** Fica expressamente vedado o uso de componentes visuais no estilo "pílula", etiquetas circulares, tags ou `<span>` com estilização de badges/chips. O layout deve ser limpo, hierárquico e tipográfico, apoiando-se em títulos, parágrafos, espaçamentos e bordas elegantes.

---

## 4. Arquitetura de Informação e Páginas

O site adota uma estrutura **Híbrida**:

### 4.1 Página Principal (`/` - `src/pages/index.astro`)
1. **Header Fixo / Sticky:**
   - Nome e identidade Kenshinkai.
   - Navegação: Início, Sobre, Turmas, Karatê para Todos, Conquistas, Localização.
   - Botão rápido de WhatsApp no topo.
   - Menu hambúrguer adaptado para smartphones.
2. **Hero Section:**
   - Título impactante em *Zenzai Itacha*.
   - Subtítulo em *Panoragraf* enfatizando disciplina, tradição e desenvolvimento integral.
   - Chamada para ação (CTA) principal: **"Agendar Aula Experimental Gratuita"** com link direto para WhatsApp.
3. **Sobre o Dojo & Tradição:**
   - Apresentação da fundação, linhagem e filosofia Kenshinkai.
   - Apresentação dos mestres e princípios do dojô (Dojo Kun).
4. **Turmas & Horários Oficiais:**
   - Estrutura clara das 2 turmas oficiais:
     - **Turma Infantil:** 18:00 às 20:00 (Segundas, Quartas e Sextas). Foco em disciplina formativa, respeito e coordenação motora.
     - **Turma Juvenil & Adulto:** 20:00 às 22:00 (Segundas, Quartas e Sextas). Foco em técnica marcial tradicional, condicionamento, autodefesa e kumite.
   - Cada turma conta com seu próprio botão para iniciar conversa no WhatsApp já com mensagem customizada.
5. **Chamada Editorial: Projeto Karatê para Todos:**
   - Bloco resumido explicando a relevância social da iniciativa na comunidade.
   - Botão de navegação direcionando para a página dedicada `/karate-para-todos`.
6. **Destaque: Conquistas & Atletas:**
   - Vitrine dos principais pódios e campeonatos recentes.
   - Botão direcionando para a página dedicada `/conquistas`.
7. **Localização e Acesso:**
   - Endereço completo, instruções de acesso e mapa do Google Maps embutido.
8. **Footer:**
   - Informações institucionais, links rápidos e créditos.
9. **Botão Flutuante do WhatsApp:**
   - Presente em todas as páginas, fixo no canto inferior direito.

### 4.2 Página: Projeto Social (`/karate-para-todos` - `src/pages/karate-para-todos.astro`)
- História completa da iniciativa social e impacto na vida de crianças e jovens em situação de vulnerabilidade.
- Metodologia de ensino e critérios de participação social.
- Seção **"Como Apoiar"**:
  - Chave PIX oficial para doações diretas.
  - Informações para doação de kimonos, faixas e equipamentos de proteção.
  - Canal para empresas que desejam patrocinar viagens e inscrições dos atletas.
- Botão direto para contato de apadrinhamento no WhatsApp.

### 4.3 Página: Conquistas (`/conquistas` - `src/pages/conquistas.astro`)
- Registro histórico e cronológico dos campeonatos disputados (citadinos, estaduais, nacionais e internacionais).
- Listagem dos atletas homenageados com suas categorias e medalhas (Ouro, Prata, Bronze).
- Galeria de imagens dos pódios e premiações.

---

## 5. Funil de Conversão e Automação do WhatsApp

Todas as conversões são feitas exclusivamente via WhatsApp Web / WhatsApp Mobile por meio do protocolo `https://wa.me/{numero}?text={mensagem_codificada}`.

### Mensagens Pré-formatadas:
- **Botão Hero e Flutuante Geral:**
  > *"Olá! Conheci o site da Kenshinkai e gostaria de agendar uma aula experimental de Karatê."*
- **Botão Turma Infantil (18:00 às 20:00):**
  > *"Olá! Gostaria de agendar uma aula experimental para meu(minha) filho(a) na Turma Infantil (18h às 20h)."*
- **Botão Turma Juvenil/Adulto (20:00 às 22:00):**
  > *"Olá! Gostaria de agendar uma aula experimental de Karatê na Turma Juvenil/Adulto (20h às 22h)."*
- **Botão Apoio ao Karatê para Todos:**
  > *"Olá! Gostaria de mais informações sobre como apoiar ou apadrinhar o projeto social Karatê para Todos."*

---

## 6. Arquitetura de Dados (`src/data/siteConfig.ts`)

Todas as informações dinâmicas e editáveis ficam centralizadas em um arquivo TypeScript com tipagem completa:

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
  photo?: string;
}

export interface Achievement {
  id: string;
  year: number;
  tournament: string;
  category: string;
  medal: 'gold' | 'silver' | 'bronze';
  athlete: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    instagram: string;
    address: string;
    mapsEmbedUrl: string;
    defaultWhatsappMessage: string;
  };
  classes: DojoClass[];
  socialProject: {
    name: string;
    headline: string;
    description: string;
    pixKey: string;
    whatsappMessage: string;
  };
  senseis: Sensei[];
  achievements: Achievement[];
}
```

---

## 7. Estrutura de Pastas do Projeto

```
kenshinkai-krt/
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   │   ├── Zenzai-Itacha.*
│   │   └── Panoragraf.*
│   └── images/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── WhatsAppButton.astro
│   │   ├── Hero.astro
│   │   ├── Philosophy.astro
│   │   ├── ClassesGrid.astro
│   │   ├── SocialBanner.astro
│   │   ├── MedalsTeaser.astro
│   │   ├── SenseiBio.astro
│   │   └── LocationMap.astro
│   ├── data/
│   │   └── siteConfig.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── karate-para-todos.astro
│   │   └── conquistas.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 8. SEO, OpenGraph e Otimizações

- **Meta Tags Globais:** Título e descrição otimizados para busca orgânica local e termos do dojô.
- **OpenGraph & Twitter Cards:** Configuração para exibição de miniatura, título e descrição ao compartilhar no WhatsApp e redes sociais.
- **Semântica HTML:** Uso correto de tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Performance:** Carregamento assíncrono com `font-display: swap`, imagens responsivas e CSS utilitário enxuto.

---

## 9. Critérios de Sucesso e Validação

- [ ] Execução bem-sucedida de `npx astro check` com zero erros de TypeScript.
- [ ] Execução de `npm run build` gerando bundle estático perfeito em `dist/`.
- [ ] Teste de todos os links e botões do WhatsApp com codificação correta de caracteres.
- [ ] Layout 100% responsivo validado em resoluções mobile (375px/414px) e desktop (1280px+).
- [ ] Respeito estrito à proibição de badges e spans decorativos.
- [ ] Renderização fiel das fontes Zenzai Itacha (títulos) e Panoragraf (textos).
