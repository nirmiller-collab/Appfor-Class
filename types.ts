
export enum Stage {
  Intro = 0,
  EnergySource = 1,
  Habitat = 2,
  SubHabitat = 3,
  Movement = 4,
  BodyPlan = 5,
  Defense = 6,
  Reproduction = 7,
  Synthesis = 8,
  TradeOff = 9,
  VisualOutput = 10,
  Reflection = 11
}

export interface Choice {
  id: string;
  label: string;
  description: string;
  icon?: string;
  pros?: string;
  cons?: string;
  challenges?: string[];
  opportunities?: string[];
}

export interface RubricScore {
  criterion: string;
  level: 'מצוין' | 'טוב' | 'בסיסי' | 'חסר';
  feedback: string;
  score: number; // 1-4 for internal calculation
}

export interface Evaluation {
  scores: RubricScore[];
  summaryCategory: 'חשיבה אבולוציונית חזקה' | 'חשיבה אבולוציונית טובה' | 'הבנה בסיסית' | 'נדרש חיזוק';
  generalFeedback: string;
}

export interface AnimalState {
  energySource?: string;
  habitat?: string;
  subHabitat?: string;
  movement?: string;
  bodyPlan?: string;
  bodyPlanJustification: string;
  defense: string[];
  reproduction?: string;
  name: string;
  description: string;
  structuralAdaptation: string;
  structuralNeed: string;
  physiologicalAdaptation: string;
  behavioralAdaptation: string;
  tradeOff: string;
  imageUrl?: string;
  aiFeedback?: string;
  evaluation?: Evaluation;
}

export interface EvolutionaryData {
  energySources: Choice[];
  habitats: Choice[];
  subHabitats: Record<string, Choice[]>;
  movements: Choice[];
  bodyPlans: Choice[];
  defenseMechanisms: Choice[];
  reproductionStrategies: Choice[];
}
