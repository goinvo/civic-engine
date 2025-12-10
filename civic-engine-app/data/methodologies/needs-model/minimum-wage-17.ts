/**
 * V3 Needs-Based Methodology: Raise Federal Minimum Wage to $17/hour
 *
 * Policy: Increase the federal minimum wage from $7.25 to $17 per hour, with
 * potential phased implementation and future adjustments tied to inflation or
 * median wage growth.
 *
 * Overall Score: ~7/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const minimumWage17Methodology: V3PolicyMethodology = {
  policyId: 'raise-minimum-wage',
  policyName: 'Raise Federal Minimum Wage to $17/hour',
  description:
    'Increase the federal minimum wage from $7.25 to $17 per hour, with potential phased implementation and future adjustments tied to inflation or median wage growth. This aims to ensure that full-time workers can meet basic living costs and to reduce working poverty.',

  needCategories: {
    physiological: {
      score: 8.5,
      reasoning:
        'Very positive. A higher minimum wage directly increases the ability of low-wage workers to afford food, housing, and healthcare. The current $7.25/hour is widely recognized as inadequate to cover basic needs in most regions. Raising it to $17 would significantly boost purchasing power, helping millions of workers meet physiological necessities without relying on government assistance or going hungry.',
    },
    safety: {
      score: 7.5,
      reasoning:
        'Moderate-high positive. Economic security is a key aspect of safety. Workers earning a living wage face less financial stress and instability – fewer worries about eviction, utility shutoffs, or inability to pay for emergencies. This reduces anxiety and the precariousness that can lead to harmful choices. However, some jobs might be lost or hours cut, which would negatively affect safety for those individuals, tempering the score slightly.',
    },
    community: {
      score: 6.5,
      reasoning:
        'Moderate positive. A minimum wage hike can strengthen communities by reducing inequality and poverty. Workers with more income can participate more fully in local economies and civic life. It may also improve morale and reduce resentment between low-wage workers and employers/society. On the flip side, some small businesses in tight-margin communities might struggle, potentially affecting community cohesion if local businesses close.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Slight positive with caveats. For workers who keep their jobs, higher wages can open doors – more ability to save for education, invest in their future, or simply have time (not working multiple jobs) for self-improvement. However, CBO estimates suggest some job losses (potentially 1.3 million), which would reduce opportunities for those individuals. Net effect is positive for most, but not universal.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. When workers are not constantly scrambling to survive paycheck-to-paycheck, they have more mental bandwidth for personal growth, creativity, and pursuing goals beyond basic survival. Valuing work with a living wage can also improve dignity and self-esteem. However, if some lose jobs, their ability to self-actualize through work is impaired. The aggregate effect is mildly positive.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'High. CBO estimates that raising the wage to $17 would directly increase pay for about 8.9 million workers (those earning below $17). Additionally, many more earning slightly above $17 may see wage bumps (the "ripple effect"). In total, tens of millions of workers and their families would benefit. This is a significant portion of the workforce, particularly in sectors like retail, food service, and care work.',
      keyPoints: [
        '8.9 million workers directly affected',
        'Tens of millions with ripple effect wage increases',
        'Concentrated in retail, food service, care work',
        'Significant portion of workforce benefits',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'High. The minimum wage directly influences whether a working person can afford essentials. At $17/hour full-time, a worker earns ~$35,000/year – enough to cover basic survival in many areas (though still tight in high-cost cities). This lifts many above the poverty line. It doesn\'t guarantee survival (one must have a job to benefit), but for those employed, it\'s a substantial improvement in meeting survival needs.',
      keyPoints: [
        '$17/hour = ~$35,000/year full-time',
        'Lifts many above poverty line',
        'Substantial improvement in meeting basic needs',
        'Requires employment to benefit',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Moderate-fast. If implemented in phases (common approach), full benefit is reached after several years (e.g., 5-year phase-in). Workers see incremental raises each year until reaching $17. Even immediate implementation would show effects in the next paycheck. Economic adjustments (price changes, employment shifts) also occur over a few years. Benefits are relatively quick compared to structural reforms.',
      keyPoints: [
        'Phased implementation common (e.g., 5 years)',
        'Incremental raises during phase-in',
        'Effects seen in next paycheck if immediate',
        'Economic adjustments over few years',
      ],
    },
    feasibility: {
      score: 5,
      reasoning:
        'Moderate. Public support is strong – about 70% of Americans favor raising the minimum wage, though support varies by the target amount. Economically, many economists endorse moderate increases; $17 is within the range some consider reasonable but at the higher end. Political feasibility is the main challenge: minimum wage increases have failed at the federal level for over 15 years due to partisan gridlock. Many states have acted independently, showing it\'s achievable at state level.',
      keyPoints: [
        '70% public support for raising minimum wage',
        'Economically endorsed by many experts',
        'Federal action blocked for 15+ years',
        'Many states have acted independently',
        '$17 at higher end but within reasonable range',
      ],
    },
  },

  overallRationale:
    'Raising the minimum wage to $17/hour scores approximately 7/10, indicating it is Very Beneficial. The policy addresses core physiological and safety needs by ensuring workers can afford the basics. It enjoys broad public support and would help millions. The score is tempered by feasibility challenges (political gridlock) and some economic trade-offs (potential job losses). On balance, for the majority of affected workers, a $17 minimum wage would meaningfully improve well-being and reduce poverty.',

  sources: [
    'cbo-minimum-wage-analysis-2024',
    'epi-minimum-wage-research',
    'dol-minimum-wage-history',
  ],
};

export default minimumWage17Methodology;
