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

export type SiteConfig = typeof siteConfig;
