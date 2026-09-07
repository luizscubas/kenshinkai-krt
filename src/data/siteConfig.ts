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
  id: 'dully' | 'serafim' | 'ricardo';
  shortName: string;
  name: string;
  rank: string;
  role: string;
  modality: string;
  affiliation?: string;
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
    whatsappNumber: "5513997092963",
    whatsappDisplay: "(13) 99709-2963",
    instagram: "@kenshinkaikarate",
    instagramUrl: "https://www.instagram.com/kenshinkaikarate/",
    address: "CRAS Bloco B, R. Moisés de Oliveira, 1233 - Vila Nova, Registro - SP, 11900-000",
    cityState: "Registro - SP",
    mapsEmbedUrl: "https://www.google.com/maps/place/CRAS+Bloco+B/@-24.5174323,-47.8406739,17z/data=!3m1!4b1!4m6!3m5!1s0x94c5349f4a0278b3:0xdc9d21047d33b58f!8m2!3d-24.5174323!4d-47.838099!16s%2Fg%2F11c6qrjyrm?entry=ttu",
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
    pixKey: "68386849000189",
    pixType: "Chave Pix do nosso projeto",
    whatsappMessage: "Olá! Gostaria de mais informações sobre como apoiar ou apadrinhar o projeto social Karatê para Todos."
  },

  senseis: [
    {
      id: "dully",
      shortName: "Dully",
      name: "Sensei Dully",
      rank: "Faixa Preta",
      role: "Instrutor Técnico",
      modality: "Karatê Tradicional e Defesa Pessoal",
      affiliation: "Kenshinkai Honbu Dojo",
      bio: "Com sólida dedicação ao Karatê tradicional, atua na formação técnica e filosófica dos alunos, enfatizando disciplina, autocontrole e o aprimoramento contínuo dos fundamentos marciais."
    },
    {
      id: "serafim",
      shortName: "Serafim",
      name: "Serafim R. de Oliveira Junior",
      rank: "Faixa Preta",
      role: "Sensei e Diretor Técnico",
      modality: "Full Contact Karate Otokojyuku",
      affiliation: "Kenshinkai Honbu Dojo",
      bio: "Instrutor dedicado à preservação do Karatê de contato pleno e formação moral dos alunos. Atua no desenvolvimento técnico de atletas de competição e na condução das turmas do dojo com ênfase na disciplina, respeito e superação constante."
    },
    {
      id: "ricardo",
      shortName: "Ricardo",
      name: "Sensei Ricardo",
      rank: "Faixa Preta",
      role: "Instrutor Técnico",
      modality: "Karatê Tradicional e Condicionamento",
      affiliation: "Kenshinkai Honbu Dojo",
      bio: "Especialista em condicionamento físico marcial e fundamentos de combate, orienta os alunos na busca pelo equilíbrio entre preparo físico rigoroso, autocontrole e respeito às tradições da arte marcial."
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
