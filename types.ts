
export enum Confidence {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Decision {
  id: string;
  createdAt: string;
  jiraId: string;
  problem: string;
  options: string;
  tradeoffs: string;
  finalDecision: string;
  confidence: Confidence;
  author: string;
}

export type View = 'timeline' | 'create' | 'detail';
