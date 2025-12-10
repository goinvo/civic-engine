/**
 * V3 Needs-Based Methodology: Expand Child Tax Credit
 *
 * Policy: Restore and expand the Child Tax Credit (CTC) to its higher 2021 levels, which included
 * larger per-child benefits and monthly payments, and made the credit fully refundable.
 *
 * Overall Score: ~8.6/10 (Very Beneficial, Nearly Extremely Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const expandedChildTaxCreditMethodology: V3PolicyMethodology = {
  policyId: 'expanded-child-tax-credit',
  policyName: 'Expand Child Tax Credit',
  description:
    'Restore and expand the Child Tax Credit (CTC) to its higher 2021 levels, which included larger per-child benefits and monthly payments, and made the credit fully refundable. In 2021, this expansion provided families up to $3,000 per child (6-17 years) or $3,600 (under 6) annually, including those with little or no income. The proposal would significantly increase financial support to families with children, aiming to reduce child poverty and improve child development outcomes.',

  needCategories: {
    physiological: {
      score: 9.5,
      reasoning:
        'Extremely positive. This policy directly supports physiological needs by providing money for food, shelter, and healthcare for children. During the 2021 expansion, child hunger and material hardship declined as families could better afford groceries and rent. The CTC expansion alone was responsible for lifting over 2 million children above the poverty line in 2021. Few policies so concretely translate into fuller fridges, secure housing, and access to medicine for millions.',
    },
    safety: {
      score: 8.5,
      reasoning:
        'Very positive. Economic security in the household creates a safer, more stable environment for children. With extra income from the CTC, families are less likely to face evictions, utility shutoffs, or homelessness – all threats to a child\'s safety. This financial cushion also reduces parental stress, leading to more stable family dynamics. Lifting children out of poverty reduces long-term risk of adverse outcomes (such as crime or poor health) that arise from deep poverty.',
    },
    community: {
      score: 7,
      reasoning:
        'Moderate positive. Reducing child poverty strengthens communities in the long run – children who grow up healthier and better educated become more engaged and productive community members. The policy signals that society values supporting children, which can bolster social cohesion and collective morale. Parents who feel less economically desperate may have more bandwidth to engage in community or school activities.',
    },
    opportunity: {
      score: 8.5,
      reasoning:
        'Very positive. Investing in children yields large opportunity gains. With reduced poverty, kids have better nutrition and living conditions, improving their ability to learn and thrive. Parents might use CTC funds for educational needs – childcare, books, internet access – enhancing child development. Over time, children raised in less financial stress have better educational and employment outcomes, breaking cycles of poverty. Making the credit available to very low-income parents enables them to work or pursue training.',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'Moderate positive. By alleviating financial strain, the policy allows parents and children to pursue higher-level needs. Parents with basic bills covered can invest time in personal growth (education, hobbies) or their children\'s development. Children in stable homes can focus on learning and creativity rather than worrying about hunger or housing. The CTC payments were even used by some families for enrichment activities (youth sports or books) once essential expenses were met.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'High. This policy targets families with children, especially low- and middle-income households. Roughly 35-40 million families received the CTC in 2021; an expansion would affect tens of millions of children nationwide. In 2021, the expanded credit lifted 2.1 million children out of poverty. Virtually all American children in eligible households stand to benefit, with the largest gains concentrated among the ~10 million children in poverty or near-poverty.',
      keyPoints: [
        '35-40 million families received CTC in 2021',
        '2.1 million children lifted out of poverty by expansion',
        '2.9 million total children lifted out of poverty',
        'Largest gains for ~10 million children in/near poverty',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'Very high. This policy directly provides financial resources that families use for food, housing, clothing, and healthcare for their children. The expanded CTC in 2021 drove child poverty to a record low of 5.2%. Parents reported spending the monthly CTC payments on essentials like groceries, rent, utilities, and school supplies. In terms of basic physiological needs, few policies are as directly impactful as this – it is essentially income support to ensure children\'s survival and healthy development.',
      keyPoints: [
        'Drove child poverty to record low 5.2%',
        'Used for groceries, rent, utilities, school supplies',
        'Directly provides resources for survival',
        'Income support ensuring healthy development',
      ],
    },
    timeToOutcome: {
      score: 9,
      reasoning:
        'Fast. The benefits manifest quickly. In the 2021 rollout, monthly payments went out starting just a few months after enactment, and poverty rates dropped within that year. Families feel the impact as soon as the first checks arrive – less financial stress and more ability to purchase necessities. Child hunger and financial instability decline essentially as soon as the policy is in effect.',
      keyPoints: [
        'Monthly payments within months of enactment',
        'Poverty rates dropped within the year',
        'Impact felt with first checks',
        'Immediate reduction in child hunger',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Moderate. Public support is high (85%), and evidence of the expansion\'s success in 2021 is strong (poverty reduction, improved welfare). However, political feasibility is a challenge – the expanded CTC lapsed due to cost concerns and lack of bipartisan agreement. It would require significant federal expenditures (hundreds of billions over several years). Some debates about work incentives exist, though studies showed minimal labor supply impact. It\'s achievable only with coalition prioritizing child poverty reduction.',
      keyPoints: [
        '85% public support',
        'Strong evidence from 2021 success',
        'Lapsed due to cost concerns',
        'Requires hundreds of billions in funding',
        'Minimal evidence of work disincentive effects',
      ],
    },
  },

  overallRationale:
    'The expanded Child Tax Credit rates as one of the most beneficial policies in terms of human well-being, scoring ~8.6/10. It powerfully addresses the two highest-weighted needs (Physiological and Safety) by reducing poverty and instability for millions of children. This approach nearly reaches "extremely beneficial" given its profound impact on basic needs and opportunities for the next generation. Expanding the CTC is a highly effective way to improve children\'s lives, leading to less hunger, less poverty, and better long-term prospects for society. The only factors tempering a perfect score are its cost and feasibility hurdles – but in terms of human impact, it\'s a game-changer.',

  sources: [
    'census-ctc-poverty-impact',
    'whitehouse-cea-ctc-impacts',
    'cbpp-ctc-analysis',
  ],
};

export default expandedChildTaxCreditMethodology;
