/**
 * V3 Needs-Based Methodology: Ban Congressional Stock Trading
 *
 * Policy: Prohibit members of Congress (and their immediate families) from buying or selling
 * individual stocks, to eliminate conflicts of interest and potential insider trading.
 *
 * Overall Score: ~5.8/10 (Moderately Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const congressStockBanMethodology: V3PolicyMethodology = {
  policyId: 'congress-stock-ban',
  policyName: 'Ban Congressional Stock Trading',
  description:
    'Prohibit members of Congress (and their immediate families) from buying or selling individual stocks, to eliminate conflicts of interest and potential insider trading.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning:
        'Neutral. No direct impact on food, health, or shelter. This policy doesn\'t deliver tangible resources to people.',
    },
    safety: {
      score: 6,
      reasoning:
        'Slight positive. Enhancing government integrity can contribute to societal stability and a sense of security in institutions. While not a traditional "safety" issue, trust in Congress is part of a stable society – a recent study found that reports of lawmakers\' stock trading erode Americans\' trust and even their willingness to follow laws. Reducing perceived corruption by banning stock trades could improve compliance and faith in the rule of law.',
    },
    community: {
      score: 7,
      reasoning:
        'Significant positive. This policy addresses social cohesion and trust in government. When people see lawmakers serving the public interest (not profiteering), it strengthens civic belonging and faith in democracy. The cited research shows exposure to Congress\'s stock trading makes citizens view Congress as corrupt and less legitimate. Banning such trades would likely boost perceived legitimacy and restore some trust.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Slight positive. Indirectly, if lawmakers are not influenced by personal stock holdings, they may craft fairer economic policies, which could benefit employment and economic opportunity for citizens at large. It also levels the playing field by ensuring officials don\'t have an unfair financial advantage from insider knowledge. However, these effects on jobs or education are indirect and long-term.',
    },
    selfActualization: {
      score: 5,
      reasoning:
        'Neutral. There is no direct effect on personal fulfillment, arts, or culture. Any benefit here would be abstract (perhaps people feeling better about their society).',
    },
  },

  dimensions: {
    populationAffected: {
      score: 6,
      reasoning:
        'Directly, this reform targets the 535 members of Congress (plus their families), but the indirect beneficiaries are the entire population. All Americans benefit from a government that is more ethical and aligned with the public interest rather than lawmakers\' personal profit.',
      keyPoints: [
        'Directly affects 535 members of Congress + families',
        'Indirect benefit to entire population',
        'All Americans benefit from ethical government',
        'Aligns lawmaker interests with public interest',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Low. This ban does not directly provide food, shelter, healthcare, or security to individuals. Its impact is ethical and institutional – important for good governance, but not a matter of immediate life-or-death for citizens.',
      keyPoints: [
        'Does not directly provide food, shelter, or healthcare',
        'Impact is ethical and institutional',
        'Important for good governance',
        'Not a life-or-death matter',
      ],
    },
    timeToOutcome: {
      score: 9,
      reasoning:
        'Fast. If enacted, the benefits (reduced conflicts of interest and improved trust) would begin immediately. Lawmakers would no longer be making questionable trades, which could instantly increase public confidence in legislative decisions.',
      keyPoints: [
        'Benefits begin immediately upon enactment',
        'Questionable trades stop right away',
        'Instant increase in public confidence possible',
        'No implementation delay needed',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderate. Public support is overwhelming and bipartisan (over 86% of both Democrats and Republicans favor a ban). There is cross-party interest in legislation (e.g. proposals like the Trust in Congress Act). However, Congress has so far been reluctant to regulate itself, so political hurdles remain despite voter pressure.',
      keyPoints: [
        '86%+ support from both Democrats and Republicans',
        'Cross-party interest in legislation',
        'Trust in Congress Act and similar proposals exist',
        'Congress reluctant to self-regulate',
      ],
    },
  },

  overallRationale:
    'The weighted combination – 0.25×5 + 0.30×6 + 0.15×7 + 0.20×6 + 0.10×5 – comes out to approximately 5.8 out of 10, which we can round to ~6/10. This is a moderately beneficial policy. It doesn\'t address basic survival needs, but it strongly supports "higher" needs like fair governance and community trust. In the long run, that trust can yield a healthier democracy and better compliance with laws.',

  sources: [
    'rady-ucsd-stock-trading-trust',
    'trust-in-congress-act',
  ],
};

export default congressStockBanMethodology;
