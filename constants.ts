
import { Decision, Confidence } from './types';

export const INITIAL_DECISIONS: Decision[] = [
  {
    id: '1',
    createdAt: '2024-05-15T10:30:00Z',
    jiraId: 'PROD-442',
    problem: 'Search latency is exceeding 2s for power users with >10k entities.',
    options: '1. Materialized views in Postgres\n2. Introduce ElasticSearch\n3. Client-side caching',
    // Fix: Use template literals (backticks) to prevent the single quote in "won't" from prematurely closing the string and causing syntax errors.
    tradeoffs: `ElasticSearch adds infra complexity but solves long-term scale. Materialized views are "free" but won't scale beyond next year.`,
    finalDecision: 'Implement Materialized Views as a tactical 6-month fix.',
    confidence: Confidence.MEDIUM,
    author: 'Sarah Chen'
  },
  {
    id: '2',
    createdAt: '2024-05-10T14:15:00Z',
    jiraId: 'PROD-389',
    problem: 'The onboarding drop-off is 45% at the "Connect Calendar" step.',
    options: '1. Make calendar optional\n2. Add social proof on the screen\n3. Move step to after the first dashboard load',
    tradeoffs: 'Moving the step increases immediate activation but makes the core value prop (scheduling) invisible until later.',
    finalDecision: 'Make calendar optional during onboarding. Prompt again on second session.',
    confidence: Confidence.HIGH,
    author: 'Sarah Chen'
  }
];
