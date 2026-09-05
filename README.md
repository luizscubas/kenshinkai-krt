# Karatê Kenshinkai & Projeto Social Karatê para Todos 🥋

Plataforma web oficial da **Associação Karatê Kenshinkai**, dojo tradicional dedicado ao ensino do Karatê-Dô, formação de caráter e inclusão comunitária. O projeto integra a presença institucional do dojo, o mural histórico de conquistas de nossos atletas e a divulgação e captação de apoio para o projeto social **Karatê para Todos**.

---

## 📌 Visão Geral do Projeto

O site foi concebido com uma estética marcial moderna e imersiva (tema escuro *Tatame*, acentos *Crimson* e *Gold*), proporcionando carregamento instantâneo, navegação fluida e foco na conversão direta via WhatsApp.

### Páginas Principais

1. **Início (`/`)**:
   - Apresentação da Associação Kenshinkai, lema, filosofia e história do dojo.
   - Apresentação dos Senseis e linhagem marcial.
   - **Turmas Oficiais** com chamada direta para agendamento de aula experimental no WhatsApp.
   - Destaques de atletas e chamada para o projeto social.
   - Endereço físico e mapa interativo integrado.
2. **Projeto Social Karatê para Todos (`/karate-para-todos`)**:
   - Apresentação da iniciativa comunitária que atende jovens e crianças em situação de vulnerabilidade com aulas gratuitas e doação de kimonos.
   - Metas de impacto e prestação de contas.
   - Área de doações diretas com **Chave PIX Oficial** (botão de cópia em 1 clique) e canal de apadrinhamento no WhatsApp.
3. **Mural de Conquistas (`/conquistas`)**:
   - Galeria histórica e interativa de medalhas (Ouro, Prata e Bronze) e troféus conquistados pelos atletas do dojo.
   - Filtros dinâmicos por ano, modalidade e medalha.

---

## 🥋 Turmas Oficiais e Horários

Os treinamentos regulares ocorrem no dojo central nos seguintes horários:

| Turma | Faixa Etária | Horário | Dias de Treino | Foco do Treinamento |
| :--- | :--- | :--- | :--- | :--- |
| **Turma Infantil** | 5 a 12 anos | **18:00 às 20:00** | Segundas, Quartas e Sextas | Disciplina formativa, coordenação motora, foco, respeito e autoconfiança. |
| **Turma Juvenil e Adulto** | A partir de 13 anos | **20:00 às 22:00** | Segundas, Quartas e Sextas | Aprofundamento técnico (*Kihon*, *Kata* e *Kumite*), condicionamento físico e defesa pessoal. |

> Cada card de turma no site possui um botão que abre diretamente o WhatsApp do dojo com mensagem pré-configurada para agendamento de aula experimental gratuita.

---

## 🛠️ Stack Tecnológica

O projeto foi construído priorizando altíssima performance (100 no Lighthouse), SEO semântico e manutenibilidade simples:

- **[Astro v5](https://astro.build/)**: Framework web moderno com arquitetura de geração estática (SSG) ultrarrápida e zero JavaScript desnecessário no cliente.
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Estilização utilitária com paleta marcial personalizada:
  - `tatame` (`#0B0C0E`): Fundo profundo dos tatames tradicionais.
  - `surface-dark` (`#15171B`) & `surface-card` (`#1F2228`): Cartões e superfícies de conteúdo.
  - `crimson` (`#DC2626` / `#B91C1C`): Vermelho de energia, disciplina e botões de ação principal.
  - `gold` (`#F59E0B` / `#D97706`): Dourado de honra e medalhas.
  - `whatsapp` (`#25D366`): Contato e conversão direta.
- **Tipografia Temática**:
  - **Zenzai Itacha**: Tipografia de impacto oriental nos títulos e insígnias.
  - **Panoragraf**: Tipografia geométrica e moderna para subtítulos, chamadas e corpo de texto.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estrita em todo o código e estruturas de dados centrais.
- **Node.js Test Runner & TSX**: Testes automatizados unitários rápidos sem sobrecarga de frameworks externos pesados.

---

## 💻 Comandos e Scripts de Desenvolvimento

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/usuario/kenshinkai-krt.git
cd kenshinkai-krt
npm install
```

### Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento em `http://localhost:4321` com recarregamento em tempo real (HMR). |
| `npm test` | Executa a suíte de testes unitários automatizados (`tests/*.test.ts`) validando integridade de dados e utilitários. |
| `npm run check` | Executa o `astro check` com checagem rigorosa de tipos TypeScript e integridade dos componentes Astro. |
| `npm run build` | Compila a aplicação estática de produção no diretório `dist/`. |
| `npm run preview` | Executa um servidor local para testar os arquivos compilados da pasta `dist/`. |

---

## ⚙️ Como Personalizar o Conteúdo (`src/data/siteConfig.ts`)

Todas as informações essenciais do dojo e do projeto social estão centralizadas em um único arquivo de configuração: [`src/data/siteConfig.ts`](file:///home/luizarch/kenshinkai-krt/src/data/siteConfig.ts).

Não é necessário editar templates HTML ou componentes para atualizar telefones, turmas ou conquistas. Basta atualizar os campos correspondentes:

### 1. Dados de Contato e Endereço (`contact`)

```typescript
contact: {
  // Número com código do país (55) e DDD, apenas dígitos:
  whatsappNumber: "5511999999999",
  // Formato legível exibido nos textos e rodapés:
  whatsappDisplay: "(11) 99999-9999",
  // Instagram oficial:
  instagram: "@karate.kenshinkai",
  instagramUrl: "https://instagram.com/karate.kenshinkai",
  // Endereço físico:
  address: "Rua do Dojô Tradicional, 123 - Bairro Central",
  cityState: "São Paulo - SP",
  // Link de incorporação do Google Maps:
  mapsEmbedUrl: "https://www.google.com/maps/embed?...",
  // Mensagem padrão de saudação no WhatsApp:
  defaultMessage: "Olá! Conheci o site da Kenshinkai e gostaria de agendar uma aula experimental gratuita de Karatê."
}
```

### 2. Horários e Turmas Oficiais (`classes`)

Para ajustar horários ou descrições das turmas infantil ou juvenil/adulto:

```typescript
classes: [
  {
    id: "infantil",
    name: "Turma Infantil",
    schedule: "18:00 às 20:00",
    days: "Segundas, Quartas e Sextas",
    ageGroup: "Crianças de 5 a 12 anos",
    description: "Construção de disciplina formativa, foco, coordenação motora, respeito e autoconfiança...",
    whatsappMessage: "Olá! Gostaria de agendar uma aula experimental para meu(minha) filho(a) na Turma Infantil (18h às 20h)."
  },
  {
    id: "juvenil-adulto",
    name: "Turma Juvenil e Adulto",
    schedule: "20:00 às 22:00",
    days: "Segundas, Quartas e Sextas",
    ageGroup: "A partir de 13 anos",
    description: "Treinamento técnico aprofundado (Kihon, Kata e Kumite), condicionamento físico...",
    whatsappMessage: "Olá! Gostaria de agendar uma aula experimental na Turma Juvenil/Adulto (20h às 22h)."
  }
]
```

### 3. Projeto Social e Chave PIX (`socialProject`)

```typescript
socialProject: {
  name: "Karatê para Todos",
  headline: "Transformando o futuro de jovens através da arte marcial",
  description: "Iniciativa voluntária da Associação Kenshinkai que oferece aulas gratuitas...",
  // Chave PIX que recebe doações diretas:
  pixKey: "social@kenshinkai.org.br",
  pixType: "E-mail Oficial da Associação",
  whatsappMessage: "Olá! Gostaria de mais informações sobre como apoiar ou apadrinhar o projeto social Karatê para Todos."
}
```

### 4. Senseis e Mestres Responsáveis (`senseis`)

```typescript
senseis: [
  {
    name: "Mestre Responsável",
    rank: "Faixa Preta 5º Dan",
    role: "Diretor Técnico e Fundador",
    bio: "Mais de 30 anos dedicados ao estudo, preservação e ensino do Karatê tradicional..."
  }
]
```

### 5. Mural de Conquistas e Medalhas (`achievements`)

Para cadastrar novos títulos e medalhas conquistadas pelos atletas:

```typescript
achievements: [
  {
    id: "1",
    year: 2025,
    tournament: "Campeonato Estadual de Karatê",
    category: "Kumite Individual Masculino",
    medal: "Ouro", // "Ouro" | "Prata" | "Bronze"
    athlete: "Atleta Destaque Kenshinkai"
  }
  // Adicione novas conquistas seguindo este modelo
]
```

---

## 🚀 Publicação e Deploy

O projeto gera uma pasta estática `dist/` totalmente autocontida e otimizada, compatível com qualquer provedor de hospedagem estática:

- **Vercel / Netlify**: Configure `Build Command: npm run build` e `Publish Directory: dist`.
- **Cloudflare Pages / GitHub Pages**: Selecione o preset **Astro** ou direcione para a pasta `dist`.

---

## 📜 Licença

Desenvolvido para a **Associação Karatê Kenshinkai**. Todos os direitos reservados.
