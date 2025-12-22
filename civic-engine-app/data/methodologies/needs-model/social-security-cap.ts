/**
 * V3 Needs-Based Methodology: Shore Up Social Security ("Donut Hole")
 *
 * Policy: Strengthen Social Security's finances by applying payroll taxes to very high incomes
 * (creating a "donut hole" above the current tax cap), thereby extending the program's solvency
 * and protecting benefits.
 *
 * Overall Score: ~7.8/10 (Highly Helpful)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const socialSecurityCapMethodology: V3PolicyMethodology = {
  policyId: 'social-security-cap',
  policyName: 'Shore Up Social Security ("Donut Hole")',
  description:
    'Strengthen Social Security finances by applying payroll taxes to very high incomes (creating a "donut hole" above the current tax cap), thereby extending the program\'s solvency and protecting benefits.',

  needCategories: {
    physiological: {
      score: 9,
      reasoning:
        'Strong positive. By securing seniors\' income, this policy ensures they can meet basic needs like food and housing. Social Security is often a lifeline preventing hunger and homelessness for the elderly.',
    },
    safety: {
      score: 9,
      reasoning:
        'Very strong positive. It provides economic security and stability for a vulnerable population, protecting millions from poverty and financial insecurity. Strengthening the trust fund by eliminating ~60–66% of the long-range funding shortfall greatly enhances the program\'s long-term stability (financial safety net).',
    },
    community: {
      score: 7,
      reasoning:
        'Moderate positive. Reducing senior poverty and ensuring retirees\' dignity can improve social cohesion and intergenerational trust. Social Security is a social contract that fosters community solidarity (everyone contributes and benefits in turn), though its day-to-day impact on social belonging is indirect.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Slight positive. Indirectly, relieving younger family members of supporting elderly relatives frees up resources and opportunities for those younger people. Also, older Americans with secure benefits can continue participating in the economy (through consumer spending or even volunteering). However, this policy is not directly about jobs or education for working-age individuals.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate positive. With financial worries eased, retirees can pursue personal fulfillment (hobbies, volunteering, family activities) rather than struggling just to survive. Ensuring a secure retirement thus modestly contributes to individuals\' ability to achieve self-actualization in their later years.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Nearly all working Americans and especially the ~69 million Social Security beneficiaries (about 15% of the U.S. population) stand to benefit. Social Security provides income to 9 in 10 seniors, so shoring up its finances positively impacts a broad swath of society.',
      keyPoints: [
        '~69 million Social Security beneficiaries',
        '15% of U.S. population directly benefits',
        'Social Security provides income to 9 in 10 seniors',
        'Nearly all working Americans have stake in solvency',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'Very high. Social Security is critical for seniors\' basic needs – without it, two-thirds of elderly Americans would be living in poverty. Maintaining full benefits directly affects recipients\' ability to afford food, shelter, and healthcare (i.e. core physiological needs).',
      keyPoints: [
        'Without SS, 2/3 of elderly would live in poverty',
        'Directly affects ability to afford food, shelter, healthcare',
        'Critical for seniors\' basic needs',
        'Prevents ~20% benefit cut projected for 2033-2035',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Moderate. This reform prevents a future crisis (the trust fund depletion projected around 2033–2035) and averts an ~20% benefit cut. The benefits are long-term (securing retirement incomes for coming decades) rather than an immediate increase in today\'s payouts.',
      keyPoints: [
        'Prevents trust fund depletion projected 2033-2035',
        'Averts ~20% benefit cut',
        'Long-term benefits for coming decades',
        'Not an immediate increase in payouts',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'Moderately high. It has overwhelming public support (around 87% nationally) and a detailed proposal exists (e.g. the Social Security 2100 Act with nearly 200 co-sponsors in Congress). Implementing a tax on $400k+ incomes is politically challenging (there is opposition from some lawmakers to tax increases) but plausible given bipartisan voter support and the urgency of solvency.',
      keyPoints: [
        '87% public support nationally',
        'Social Security 2100 Act has ~200 co-sponsors',
        'Bipartisan voter support',
        'Some opposition to tax increases remains',
      ],
    },
  },

  overallRationale:
    'Taking the weighted average of these impacts – 0.25×9 + 0.30×9 + 0.15×7 + 0.20×6 + 0.10×6 – yields ~7.8 out of 10, approximately 8/10. This indicates a highly helpful policy, as it powerfully supports essential physiological and safety needs for a large population.',

  sources: [
    'pgpf-social-security-tax-cap',
    'moneywise-donut-hole-proposal',
    'social-security-2100-act',
  ],
};

export default socialSecurityCapMethodology;
