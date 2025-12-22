import { V1PolicyMethodology } from '../../v1Methodology';

export const aiSafetyRegulationMethodology: V1PolicyMethodology = {
  policyId: 'ai-safety-regulation',
  policyName: 'AI Safety Regulation',
  description: 'Establish federal standards for AI development, testing, and deployment to ensure safety.',
  totalScore: 45,
  tier: 'TIER 3: INFRASTRUCTURE & TECH',
  factors: {
    population: {
      score: 1.0,
      reasoning: 'AI will eventually touch every aspect of life - universal scope.',
      keyPoints: [
        'AI is being deployed in healthcare, finance, employment',
        'Everyone interacts with AI systems already',
        'Future impact will be even more pervasive',
      ],
    },
    economic: {
      score: 0.4,
      reasoning: 'Moderate direct economic impact now, but regulates a rapidly growing sector.',
      keyPoints: [
        'AI industry is growing rapidly (~$200B+)',
        'May slow some development in exchange for safety',
        'Could prevent catastrophic economic harms',
      ],
    },
    intensity: {
      score: 0.2,
      reasoning: 'Low current daily intensity for most people, but high potential future intensity.',
      keyPoints: [
        'Most people not yet directly harmed by AI',
        'Tail risks (job displacement, misuse) are severe',
        'Preventative policy - benefits hard to measure',
      ],
    },
    duration: {
      score: 0.7,
      reasoning: 'Long-term structural regulation of a transformative technology.',
      keyPoints: [
        'Establishes framework for decades of AI development',
        'Precedent for regulating future technologies',
        'May need updating as technology evolves',
      ],
    },
    equity: {
      score: 0.3,
      reasoning: 'Mixed equity effects - AI risks may fall more on disadvantaged groups.',
      keyPoints: [
        'Algorithmic bias often affects minorities',
        'Job displacement may hit certain sectors harder',
        'But regulation benefits are broadly distributed',
      ],
    },
    externalities: {
      score: 0.9,
      reasoning: 'Massive externalities - truth, democracy, safety all at stake.',
      keyPoints: [
        'Deepfakes threaten information ecosystem',
        'Autonomous weapons pose existential risk',
        'Could shape global AI governance norms',
      ],
    },
    implementation: {
      score: 0.9,
      reasoning: 'Very difficult - technology moves fast, regulators lack expertise.',
      keyPoints: [
        'Defining "AI safety" is technically challenging',
        'Risk of regulatory capture by industry',
        'International coordination required',
      ],
    },
  },
  overallRationale: 'Universal reach and massive externalities (safety/truth), but currently low daily intensity. Implementation is speculative and difficult.',
};
