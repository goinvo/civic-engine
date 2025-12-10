/**
 * V3 Needs-Based Methodology: Simplified Tax Filing (IRS Direct File Program)
 *
 * Policy: Make the IRS "Direct File" system permanent and nationwide, allowing taxpayers
 * to file their returns for free directly with the IRS via a government-provided online platform.
 *
 * Overall Score: ~6.6/10 (Slightly Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const simplifiedTaxFilingMethodology: V3PolicyMethodology = {
  policyId: 'simplified-tax-filing',
  policyName: 'Simplified Tax Filing (IRS Direct File)',
  description:
    'Make the IRS "Direct File" system permanent and nationwide, allowing taxpayers to file their returns for free directly with the IRS via a government-provided online platform. This simplifies tax filing by pre-filling data (like W-2 wage info) and removes the need for paid third-party software or services for most filers. The 2024 pilot programs saw high satisfaction (94%) and ~73% of filers say they\'d use a direct IRS filing option. Average public support is approximately 73%.',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'Slight positive. While filing taxes is not directly related to food or health, the policy can improve financial resources for basic needs. By simplifying filing, more eligible low-income families will file and receive refundable credits they qualify for. Estimates show Direct File could deliver $5–12 billion per year in unclaimed tax credits (like EITC and CTC) to low-income households who currently miss out. Those billions of dollars would help families pay for groceries, rent, utilities, healthcare, etc. Additionally, families save on tax prep fees ($160-$300) which frees up cash for needs.',
    },
    safety: {
      score: 6,
      reasoning:
        'Neutral to slight positive. Tax filing reform has minimal direct impact on physical safety or national security. However, it provides economic security benefits: reducing the stress and anxiety associated with tax season for millions, and helping families claim tax refunds can stabilize their finances (financial stability is a component of overall security). The program could also reduce identity theft risk since data stays with IRS rather than scattered through private preparers. These factors improve personal sense of security marginally.',
    },
    community: {
      score: 6,
      reasoning:
        'Slight positive. A simpler, fairer tax filing system can increase trust in government and civic engagement. When people see the government delivering a convenient service (instead of forcing them through convoluted paperwork or pricey middlemen), it boosts institutional credibility. By removing cost barriers to filing, more people (especially marginalized groups) will participate in the tax system – a civic duty – potentially feeling more included. This promotes a sense of fairness and inclusion.',
    },
    opportunity: {
      score: 7,
      reasoning:
        'Moderate positive. Simplifying taxes yields time and cost savings that benefit productivity and economic opportunity. Americans spend on average 8-13 hours and $160-$290 every year on tax preparation. Direct File would return that time back to households (over $11 billion worth of time and fees saved annually). People can use those hours for work, education, or family. Financially, billions saved on fees and gained in refunds can be invested in education, businesses, or paying down debt. Simplifying compliance can particularly help small entrepreneurs and gig workers.',
    },
    selfActualization: {
      score: 5,
      reasoning:
        'Neutral. This policy doesn\'t have a strong link to personal fulfillment or creative pursuits. That said, reducing bureaucratic burdens can improve overall quality of life slightly – less frustration with taxes means more peace of mind and time for personal growth, hobbies, or family. It also embodies a culture shift where government is working for people, which could empower individuals to feel more in control of their finances. Any such effects are minor.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very large. Virtually all ~150 million American taxpayers are potential beneficiaries of simplified filing. In surveys, ~73% of Americans indicated they would be interested in using an IRS Direct File service, suggesting over a hundred million users could adopt it. Importantly, low-income filers who qualify for credits but often don\'t file (due to barriers) stand to gain. A majority of households would experience some benefit (time or cost savings).',
      keyPoints: [
        '~150 million American taxpayers potential beneficiaries',
        '73% would use Direct File service',
        'Low-income filers gain most from easier credit access',
        'Majority of households save time or money',
        'Broad and inclusive population impact',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Low. This is a convenience and efficiency reform; it does not directly provide food, shelter, or security. However, there is an indirect link to basic needs: by making it easier to claim tax credits (like EITC or CTC), it puts money in the pockets of low-income families that can be used for essential needs. Many vulnerable households currently leave these funds unclaimed due to filing obstacles. Simplified filing would help deliver those resources.',
      keyPoints: [
        'Convenience/efficiency reform primarily',
        'Indirect link to basic needs via tax credits',
        '$5-12 billion in unclaimed credits could reach families',
        'Helps vulnerable households access existing benefits',
        'Not direct provision of survival needs',
      ],
    },
    timeToOutcome: {
      score: 9,
      reasoning:
        'Immediate. Once implemented, the benefits are realized annually during tax season. Taxpayers each year will save time and possibly money right away. The 2024 pilot demonstrated savings in that first year. There\'s no long wait for outcomes – each tax filing cycle, millions would notice the easier process and possibly larger refunds.',
      keyPoints: [
        'Benefits realized immediately during tax season',
        'Time and money savings from first use',
        '2024 pilot demonstrated immediate savings',
        'Each filing cycle shows impact',
        'No long wait for outcomes',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderate to High. A pilot program has already been launched by the IRS in 2024, with successful outcomes (94% user satisfaction). The Treasury has authority and funding from recent legislation to expand it. The main opposition comes from the tax preparation industry which lobbies against a free government alternative. Politically, there is significant public support, and many policymakers favor it. Making Direct File permanent is quite achievable.',
      keyPoints: [
        '94% user satisfaction in 2024 pilot',
        'Treasury has authority and funding',
        'Tax prep industry lobbies against it',
        'Significant public support (~73%)',
        'Many policymakers favor expansion',
        'Trending upward in 2025',
      ],
    },
  },

  overallRationale:
    'Simplified Tax Filing scores approximately 6.6/10, indicating it is Slightly Beneficial. The efficiency gains and financial benefits for many Americans make this a clear net positive, though not revolutionary for core survival needs. It falls in the moderately beneficial range. There are virtually no harms to speak of – aside from potential job losses in the tax prep industry – so the score is safely above neutral. The policy could deliver billions in unclaimed tax credits to low-income families while saving time and money for all taxpayers.',

  sources: [
    'economic-security-project-direct-file',
    'treasury-direct-file-announcement',
    'mn-budget-direct-file',
  ],
};

export default simplifiedTaxFilingMethodology;
