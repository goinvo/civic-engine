/**
 * V3 Needs-Based Methodology: Police Accountability Standards
 *
 * Policy: Mandate de-escalation training, ban chokeholds, and create a national
 * misconduct registry to prevent abusive officers from switching agencies.
 *
 * Overall Score: ~8/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const policeAccountabilityMethodology: V3PolicyMethodology = {
  policyId: 'police-accountability-standards',
  policyName: 'Police Accountability Standards',
  description:
    'Mandate de-escalation training, ban chokeholds, and create a national misconduct registry to prevent abusive officers from switching agencies. This policy aims to reduce police violence and restore community trust while setting federal standards for use of force.',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'Moderate positive. While not directly providing food or shelter, reducing police violence prevents injuries and deaths. Fewer excessive force incidents means fewer hospitalizations and fatalities, directly preserving physical well-being for those who might otherwise be victims.',
    },
    safety: {
      score: 9,
      reasoning:
        'Extremely positive. This is the core strength of the policy. It directly addresses Safety needs by aiming to reduce police violence and protect lives. De-escalation training has been shown to reduce use-of-force incidents by 28% and civilian injuries by 26%. Banning chokeholds and preventing "wandering officers" further protect individuals from harm.',
    },
    community: {
      score: 8,
      reasoning:
        'Very positive. Improves trust between law enforcement and communities, especially minorities and others disproportionately affected by police use of force. When police are held accountable, social cohesion and faith in institutions improve. About 81% of Americans support a national misconduct registry.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Moderate positive. Safer communities enable better economic and educational outcomes. When people feel safe interacting with police, they can more freely pursue employment, education, and civic engagement without fear of unjust violence.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate positive. Reduced fear of police violence allows individuals to participate more fully in society, pursue personal goals, and engage in civic life. Communities freed from fear of police misconduct can focus on personal growth and collective progress.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Extremely broad impact. Nationwide, hundreds of millions of people stand to benefit. Virtually every community interacts with law enforcement, so setting federal standards would improve safety for a broad swath of the U.S. population. This includes civilians (especially minorities disproportionately affected) and officers themselves (who may face fewer violent confrontations).',
      keyPoints: [
        'Affects virtually every community in the U.S.',
        'Disproportionately benefits minorities affected by police use of force',
        'Also benefits officers through fewer violent confrontations',
        'Federal standards create nationwide consistency',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'Very essential. The policy addresses life-and-death situations – police use of force can result in fatalities. Reducing unjustified violence directly saves lives. De-escalation training reduces use-of-force incidents by 28% and civilian injuries by 26%. Banning chokeholds (a dangerous restraint) prevents deaths.',
      keyPoints: [
        'Police use of force can be fatal',
        '28% fewer use-of-force incidents with de-escalation training',
        '26% fewer civilian injuries',
        'Prevents "wandering officers" with abuse histories from being rehired',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Intermediate timeframe. Some benefits would be realized quickly after implementation. Banning chokeholds could immediately reduce deadly encounters, and a misconduct registry would swiftly flag abusive officers. Training and policy changes take months to implement, but cultural shifts and full restoration of community trust take years.',
      keyPoints: [
        'Chokehold bans effective immediately',
        'Misconduct registry swiftly flags problem officers',
        'Training implementation takes months',
        'Cultural shifts may take years',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Moderate feasibility. Strong public support across party lines: over 80% of Americans (including 82% of Republicans and 92% of Democrats) favor prosecuting officers who use excessive force. 81% support a national misconduct registry (70% of Republicans favor). Policy sidesteps qualified immunity (a known sticking point). Past attempts like George Floyd Justice in Policing Act passed House but stalled in Senate.',
      keyPoints: [
        '80%+ bipartisan support for accountability measures',
        '81% support national misconduct registry',
        'Avoids divisive qualified immunity issue',
        'George Floyd Act passed House, stalled in Senate',
        'Police union resistance remains a hurdle',
      ],
    },
  },

  overallRationale:
    'Police Accountability Standards scores approximately 8/10 (Very Beneficial). It addresses a high-weight Safety need with broad population impact and life-saving potential. Research supports that these reforms can reduce police violence and injuries. De-escalation training has proven effectiveness (28% fewer use-of-force incidents). While not without political challenges, the overwhelming public backing (80%+ across parties) and proven strategies make this policy a strong net positive for society\'s safety and social stability.',

  sources: [
    'vop-police-reform-survey',
    'ap-norc-police-poll',
    'uc-deescalation-study',
    'apha-crisis-response',
  ],
};

export default policeAccountabilityMethodology;
