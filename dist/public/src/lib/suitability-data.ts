export interface Question {
  id: number;
  weight: number;
  section: string;
  text: string;
  options: string[];
}

export interface ProfileMetrics {
  retorno: string;
  volatilidade: string;
  "Índice de Sharpe": string;
  "Performance sobre o CDI": string;
}

export interface Profile {
  name: string;
  description: string;
  allocation: Record<string, number>;
  metrics: ProfileMetrics;
}

export const questions: Question[] = [
  { id: 0, weight: 1, section: "Experiência", text: "Qual é sua experiência anterior com investimentos?", options: ["Nenhuma", "Alguma experiência", "Experiente"] },
  { id: 6, weight: 1, section: "Experiência", text: "Com que frequência você revisa seus investimentos?", options: ["Raramente", "Anualmente", "Mensalmente"] },
  { id: 7, weight: 1.5, section: "Objetivos", text: "Qual é sua prioridade ao investir?", options: ["Segurança", "Equilíbrio", "Crescimento"] },
  { id: 8, weight: 1, section: "Objetivos", text: "Você prefere uma carteira automatizada ou personalizada?", options: ["Automatizada", "Indiferente", "Personalizada"] },
  { id: 1, weight: 2, section: "Tolerância", text: "Qual é o seu nível de conforto ao ver seu portfólio cair 10% em um mês?", options: ["Muito desconfortável", "Um pouco desconfortável", "Confortável"] },
  { id: 2, weight: 2.5, section: "Tolerância", text: "Se você tivesse R$ 100.000 investidos, quanto estaria disposto a perder em 6 meses para tentar obter retornos maiores?", options: ["Até R$ 5.000", "Até R$ 15.000", "Até R$ 30.000 ou mais"] },
  { id: 3, weight: 1.5, section: "Tolerância", text: "Qual cenário descreve melhor sua reação a uma crise do mercado?", options: ["Vendo quedas, vendo tudo e saio", "Fico investido e espero", "Vejo como oportunidade e compro mais"] },
  { id: 4, weight: 2, section: "Tolerância", text: "Em um investimento com chance de ganhar R$ 30.000 ou perder R$ 10.000, o que você faria?", options: ["Evito a perda", "Talvez aceitaria", "Aceito o risco"] },
  { id: 5, weight: 2, section: "Tolerância", text: "Se seu investimento caísse 20% em um trimestre, o que você faria?", options: ["Venderia tudo", "Aguardaria recuperação", "Investiria mais"] },
  { id: 9, weight: 1.5, section: "Tolerância", text: "Se você herdasse R$ 1 milhão hoje, como alocaria o valor?", options: ["Deixaria parado no banco", "Investiria aos poucos", "Investiria tudo estrategicamente"] }
];

export const profiles: Record<string, Profile> = {
  conservador: {
    name: 'Portfólio Conservador - Topo Capital',
    description: 'Ideal para investidores que prezam pela segurança e têm baixa tolerância a perdas.',
    allocation: {
      "Renda Fixa - Pós-Fixado": 60.0,
      "Renda Fixa - IPCA +": 15.0,
      "Renda Fixa - Pré": 5.0,
      "Renda Fixa - Ativo": 0.0,
      "Renda Fixa - Reserva de Emergência | Caixa": 20.0,
      "Fundos Imobiliários": 0.0,
      "Renda Variável Brasil": 0.0,
      "Renda Variável Global": 0.0
    },
    metrics: {
      retorno: "12,6% a.a.",
      volatilidade: "0,56% a.a.",
      "Índice de Sharpe": "1,17",
      "Performance sobre o CDI": "109,74%"
    }
  },
  moderado: {
    name: 'Portfólio Moderado - Topo Capital',
    description: 'Equilíbrio entre segurança e retorno, para investidores que aceitam oscilações moderadas.',
    allocation: {
      "Renda Fixa - Pós-Fixado": 50.0,
      "Renda Fixa - IPCA +": 15.0,
      "Renda Fixa - Pré": 5.0,
      "Renda Fixa - Ativo": 5.0,
      "Renda Fixa - Reserva de Emergência | Caixa": 10.0,
      "Fundos Imobiliários": 5.0,
      "Renda Variável Brasil": 7.5,
      "Renda Variável Global": 2.5
    },
    metrics: {
      retorno: "14,8% a.a.",
      volatilidade: "1,33% a.a.",
      "Índice de Sharpe": "1,32",
      "Performance sobre o CDI": "126,98%"
    }
  },
  arrojado: {
    name: 'Portfólio Arrojado - Topo Capital',
    description: 'Para investidores com alta tolerância a risco que buscam retornos elevados.',
    allocation: {
      "Renda Fixa - Pós-Fixado": 45.0,
      "Renda Fixa - IPCA +": 20.0,
      "Renda Fixa - Pré": 2.5,
      "Renda Fixa - Ativo": 5.0,
      "Renda Fixa - Reserva de Emergência | Caixa": 5.0,
      "Fundos Imobiliários": 5.0,
      "Renda Variável Brasil": 7.5,
      "Renda Variável Global": 10.0
    },
    metrics: {
      retorno: "15,3% a.a.",
      volatilidade: "2,16% a.a.",
      "Índice de Sharpe": "1,78",
      "Performance sobre o CDI": "131,47%"
    }
  }
};

export const chartColors = [
  '#002147', // Azul Escuro (primário Topo Capital)
  '#004080', // Azul Médio
  '#2a6f97', // Outro tom de Azul
  '#6a994e', // Esverdeado
  '#f28482', // Avermelhado
  '#f8ad9d', // Vermelho mais claro
  '#c77dff', // Roxo
  '#8338ec'  // Roxo mais escuro
];

export function calculateProfile(answers: Record<number, number>): string {
  let score = 0;
  let maxPossibleScore = 0;

  questions.forEach(q => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      score += answer * q.weight;
    }
    maxPossibleScore += 2 * q.weight;
  });

  const normalizedScore = (score / maxPossibleScore) * 100;

  if (normalizedScore <= 40) return 'conservador';
  else if (normalizedScore <= 70) return 'moderado';
  else return 'arrojado';
}

export function groupQuestionsBySection() {
  const sections: Record<string, Question[]> = {};
  
  questions.forEach(q => {
    if (!sections[q.section]) {
      sections[q.section] = [];
    }
    sections[q.section].push(q);
  });

  return sections;
}
