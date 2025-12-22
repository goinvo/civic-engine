/**
 * V3 Needs-Based Methodology: Ban Foreign Ownership of U.S. Farmland
 *
 * Policy: Prohibit (or heavily restrict) foreign entities from purchasing U.S. agricultural
 * land, with particular emphasis on countries designated as foreign adversaries.
 *
 * Overall Score: ~8/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const foreignFarmlandBanMethodology: V3PolicyMethodology = {
  policyId: 'foreign-farmland-ownership-ban',
  policyName: 'Ban Foreign Ownership of U.S. Farmland',
  description:
    'Prohibit (or heavily restrict) foreign entities from purchasing U.S. agricultural land, with particular emphasis on countries designated as foreign adversaries (such as China, Russia, North Korea, and Iran). The objective is to ensure that America\'s food-producing land remains under domestic control for food security, national security, and rural economic stability.',

  needCategories: {
    physiological: {
      score: 8,
      reasoning:
        'Very positive. Control over farmland is ultimately about food production. Keeping land in American hands helps ensure domestic agriculture can feed the nation without dependence on foreign-owned operations. If adversarial nations controlled significant farmland, they could theoretically influence food supply decisions. Maintaining sovereignty over agricultural resources is foundational to long-term food security.',
    },
    safety: {
      score: 9,
      reasoning:
        'Extremely positive. This policy directly addresses national security concerns. Land near military bases or sensitive infrastructure, if owned by foreign adversaries, poses surveillance and sabotage risks. By preventing such ownership, the U.S. reduces a potential vulnerability. Lawmakers have cited spy balloon incidents and proximity of Chinese-owned land to military installations as catalysts for this policy. It provides peace of mind that critical infrastructure is not in hostile hands.',
    },
    community: {
      score: 7,
      reasoning:
        'Moderate positive. Rural communities often worry about absentee (especially foreign) landlords who may not invest in local economies or steward land sustainably. Keeping farmland in domestic hands can strengthen local ownership, support generational farm families, and maintain a sense of community self-determination. However, the impact on community well-being depends on who actually acquires the land domestically.',
    },
    opportunity: {
      score: 6.5,
      reasoning:
        'Moderate positive. By limiting foreign buyers, there may be reduced upward pressure on farmland prices, making it easier for young or new farmers to enter the market. This supports agricultural entrepreneurship and rural job creation. Some foreign investment does create jobs, so the net effect is mixed – but the policy generally favors domestic farmers\' opportunities to acquire land and build agricultural businesses.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. Farmers and rural residents may feel a greater sense of autonomy and pride knowing their nation\'s farmland is domestically controlled. For those who value self-sufficiency and national sovereignty, this policy aligns with their ideals. The psychological comfort of knowing America\'s food future is in American hands can contribute to civic pride and personal sense of security.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'Moderate-high. The policy primarily affects rural Americans, farmers, and agricultural workers directly. Indirectly, since food security touches everyone, the entire population has a stake. However, day-to-day, most Americans won\'t notice immediate changes from this policy. The effect is more about long-term national resilience than immediate individual impact. It\'s broad in scope but diffuse in direct benefit.',
      keyPoints: [
        'Rural farmers and agricultural workers directly affected',
        'Entire nation benefits from food security',
        'Long-term national resilience focus',
        'Day-to-day impact less noticeable for urban populations',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'High. Food is a fundamental survival need. While the U.S. currently has a robust food supply, protecting the means of production (farmland) is a strategic move to ensure that food remains accessible. Loss of control over significant farmland could, in a worst-case scenario, jeopardize food availability or prices. The policy guards against a tail risk to survival-level needs.',
      keyPoints: [
        'Protects fundamental food production capability',
        'Guards against strategic vulnerability',
        'Ensures long-term food security',
        'Prevents potential foreign leverage over food supply',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Fairly quick for new purchases. Once a ban is enacted, it immediately stops further foreign adversary acquisitions. However, addressing existing foreign holdings (if required to divest) could take years. The security and market benefits would accrue gradually as new purchases are blocked. In terms of preventing future harm, the policy is effective immediately upon implementation.',
      keyPoints: [
        'Immediate effect on new foreign purchases',
        'Existing holdings may take years to address',
        'Preventive benefits start immediately',
        'Market effects gradual over time',
      ],
    },
    feasibility: {
      score: 9,
      reasoning:
        'Very high. This policy enjoys overwhelming bipartisan support – about 80% of voters favor restricting foreign adversary farmland ownership. Numerous states have already enacted such laws (20+ states have restrictions on foreign-owned farmland). Legislation at the federal level has been proposed with support from both parties. The main debate is how strict to be (outright ban vs. registration and caps). Implementation is straightforward: land registries can track ownership nationality.',
      keyPoints: [
        '80% voter support',
        '20+ states already have restrictions',
        'Bipartisan federal support',
        'Straightforward implementation via land registries',
        'Debate focuses on degree of restriction',
      ],
    },
  },

  overallRationale:
    'Restricting foreign ownership of U.S. farmland earns a score of approximately 8/10, reflecting strong benefits to safety and physiological (food security) needs with high political feasibility. The policy addresses real national security concerns with broad public and bipartisan backing. It\'s a preventative measure with low downside – the U.S. doesn\'t need foreign adversaries to own American farmland for economic prosperity. Given the clear consensus and importance of protecting food-producing land, this is a high-impact, low-cost policy in terms of political capital.',

  sources: [
    'usda-foreign-farmland-holdings',
    'congress-farmland-security-act',
    'state-farmland-restrictions',
  ],
};

export default foreignFarmlandBanMethodology;
