import { V1PolicyMethodology } from '../../v1Methodology';

export const universalBackgroundChecksMethodology: V1PolicyMethodology = {
  policyId: 'universal-background-checks',
  policyName: 'Universal Background Checks',
  description: 'Require background checks for all gun sales, including private and gun show sales.',
  totalScore: 43,
  tier: 'TIER 4: TARGETED JUSTICE & SAFETY',
  factors: {
    population: {
      score: 0.3,
      reasoning: 'Directly affects gun buyers and sellers - a subset of the population.',
      keyPoints: [
        'About 40% of US households own guns',
        'Private sales estimated at 20-40% of transactions',
        'Affects ~5-10 million transactions annually',
      ],
    },
    economic: {
      score: 0.1,
      reasoning: 'Minimal economic volume - small transaction fees for background checks.',
      keyPoints: [
        'Background check fees are modest (~$25-50)',
        'Gun industry is relatively small economically',
        'No major market restructuring',
      ],
    },
    intensity: {
      score: 0.9,
      reasoning: 'Life-or-death intensity - gun violence prevention affects survival.',
      keyPoints: [
        'Prevents some prohibited persons from obtaining guns',
        'Gun violence is leading cause of death for children',
        'Each prevented death is infinitely valuable',
      ],
    },
    duration: {
      score: 0.7,
      reasoning: 'Permanent change to gun sales process with ongoing safety effects.',
      keyPoints: [
        'Establishes permanent requirement',
        'Effects accumulate as prohibited persons are blocked',
        'Creates cultural shift in gun transfer norms',
      ],
    },
    equity: {
      score: 0.5,
      reasoning: 'Mixed equity effects - violence disproportionately affects minorities and low-income communities.',
      keyPoints: [
        'Gun violence concentrated in disadvantaged areas',
        'But policy applies universally to all gun buyers',
        'May reduce urban violence disparities',
      ],
    },
    externalities: {
      score: 0.5,
      reasoning: 'Moderate spillovers to gun culture and potentially other violence reduction.',
      keyPoints: [
        'May shift norms around gun ownership responsibility',
        'Creates precedent for gun regulation',
        'Reduces illegal gun trafficking somewhat',
      ],
    },
    implementation: {
      score: 0.5,
      reasoning: 'Moderate difficulty - existing NICS system, but enforcement of private sales challenging.',
      keyPoints: [
        'NICS background check system already exists',
        'Private sale enforcement is difficult',
        'State-level variation in current laws',
      ],
    },
  },
  overallRationale: 'High intensity (life/death safety) but low economic volume. Affects gun buyers (subset of pop).',
};
