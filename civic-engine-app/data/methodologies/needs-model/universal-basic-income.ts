/**
 * V3 Needs-Based Methodology: Universal Basic Income (UBI)
 *
 * Policy: Provide a universal, unconditional cash payment to all individuals,
 * creating a baseline income floor regardless of employment status.
 *
 * Overall Score: ~7.5/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const universalBasicIncomeMethodology: V3PolicyMethodology = {
  policyId: 'universal-basic-income',
  policyName: 'Universal Basic Income (UBI)',
  description:
    'Universal Basic Income proposes a universal, unconditional cash payment to all individuals, providing a baseline income floor regardless of employment. For example, a UBI of $1,000/month would go to every adult. The goal is to eliminate poverty and give everyone a cushion to escape exploitative situations and meet basic needs. Average public support is approximately 55%.',

  needCategories: {
    physiological: {
      score: 8,
      reasoning:
        'High benefit. UBI directly puts cash in people\'s hands to pay for food, housing, and healthcare, thus powerfully addressing basic survival needs. By providing an income floor, UBI could lift millions out of poverty and improve nutrition and housing stability. Analyses suggest that a universal income could broadly eliminate poverty in the U.S. if set at a sufficient level. The expanded Child Tax Credit in 2021 briefly lifted 3.7 million children out of poverty without reducing work participation, illustrating how unconditional income improves families\' basic well-being.',
    },
    safety: {
      score: 8,
      reasoning:
        'High benefit. UBI provides economic security and stability. Because payments continue regardless of job status, a UBI acts as an automatic stabilizer during recessions – people maintain some income and consumer demand even if they lose jobs. This financial safety net can reduce anxiety and stress, and give people confidence to leave abusive jobs or relationships knowing they won\'t lose all income. Evidence from cash experiments shows recipients had significantly lower stress and anxiety levels and improved mental health. By guaranteeing a minimum income floor, UBI protects against extreme destitution.',
    },
    community: {
      score: 6,
      reasoning:
        'Moderate benefit. UBI is an individual benefit, not directly a community program, but it can strengthen community indirectly. Unconditional income can boost trust in institutions and society – studies find cash transfer recipients report higher trust in social institutions. It reduces stigma and "us vs. them" divisions since everyone receives it. With less poverty, communities may see reduced crime (cash pilots have correlated with lower crime rates in Stockton). People might engage more in civic life if they aren\'t struggling to survive. Still, UBI does not inherently create social interactions or collective endeavors.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'High benefit. By providing a financial cushion, UBI can greatly expand opportunity for education, employment and entrepreneurship. The stability of a basic income allows people to take risks and pursue better jobs or training. In Stockton\'s UBI experiment, recipients were twice as likely to secure full-time jobs compared to non-recipients, as the extra $500/month gave them time and resources to job-hunt, study, or start a business. Unconditional cash also enables people to relocate or invest in their skills. Proponents note that a UBI can "increase the population\'s willingness to take risks," strengthening entrepreneurship.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate benefit. UBI\'s freedom can facilitate personal fulfillment. With basic financial needs met, individuals can devote time to creative endeavors, caregiving, or community projects that they find meaningful. Notably, UBI recognizes unpaid roles – for example, it provides income to parents or caregivers who might otherwise have to abandon those passions. Studies also show cash grants tend to boost happiness and overall life satisfaction. While UBI doesn\'t directly fund arts or education, the flexibility of an income floor lets people choose their path to fulfillment.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 10,
      reasoning:
        'Universal. UBI by definition covers the entire population. Every citizen (or resident, depending on design) receives the benefit, so the breadth of impact is maximal. This broad reach amplifies its societal benefit (everyone gets a share). However, because everyone benefits, the magnitude per person might be limited by budget (e.g. $1,000/mo may not alone lift all out of poverty, but it significantly helps most people). Still, for coverage, UBI is as broad as it gets.',
      keyPoints: [
        'Covers entire population by definition',
        'Every citizen/resident receives benefit',
        'Broad reach amplifies societal benefit',
        'Maximum population coverage possible',
        'Universal design eliminates means-testing gaps',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'Moderately high. Money is not food or shelter in itself, but it can be used to obtain all essential needs. A sufficient UBI would ensure no one is unable to afford basic necessities. In that sense, it\'s critical to survival indirectly. Unlike direct food aid or healthcare, cash relies on individuals to purchase needs, but it offers great flexibility. UBI is very important to basic needs – especially if set at a high enough level, it prevents hunger and homelessness by giving everyone the means to pay for essentials.',
      keyPoints: [
        'Cash can obtain all essential needs',
        'Prevents hunger and homelessness',
        'Flexibility to address individual priorities',
        'Critical to survival indirectly',
        'Effectiveness depends on payment level',
      ],
    },
    timeToOutcome: {
      score: 9,
      reasoning:
        'Immediate to short-term. Once implemented, UBI payments would start helping people right away (within the first month). There is virtually no delay in benefit: as soon as checks go out, people have more money to spend on food, rent, etc. Empirical results show rapid improvements in well-being and financial stability in the first year of cash transfer programs. UBI scores immediate on time-to-outcome for individual benefits. Macroeconomic effects like poverty reduction would be seen within the first year.',
      keyPoints: [
        'Benefits start immediately upon implementation',
        'No delay in receiving payments',
        'Rapid improvements in well-being documented',
        'Poverty reduction visible within first year',
        'Long-term effects like entrepreneurship take longer',
      ],
    },
    feasibility: {
      score: 5,
      reasoning:
        'Challenging. Politically, a universal UBI in the US faces significant hurdles. While a small majority of Americans support the idea (~55%), support is shallow and partisan – about 65% of Democrats vs only ~42% of Republicans favor it. The cost is very large and funding mechanism contentious (could require new taxes like VAT or wealth tax). No major country has implemented a full UBI; it\'s still mostly at pilot stages. That said, pandemic stimulus checks built some momentum for cash payments, and some cities/states are trialing guaranteed income.',
      keyPoints: [
        '~55% public support overall',
        '65% Democrats vs 42% Republicans support',
        'Very large cost requiring new taxes',
        'No major country has full UBI yet',
        'Pandemic stimulus built momentum',
        'Cities/states trialing guaranteed income',
      ],
    },
  },

  overallRationale:
    'Universal Basic Income scores approximately 7.5/10, which falls in the "very beneficial" range. UBI strongly advances physiological and safety needs by reducing poverty and insecurity, and it improves opportunity and personal well-being. Its universal reach and immediate impact add to its appeal. The main caveats are feasibility and the fact that it\'s a cash tool (so its effectiveness depends on recipients\' ability to use the cash in markets – e.g. it won\'t directly build houses or provide healthcare unless paired with adequate supply). Nonetheless, UBI as envisioned is a very positive policy for human well-being, provided it\'s funded sensibly.',

  sources: [
    'basicincome-ubi-support-poll',
    'scientific-american-ubi-poverty',
    'vox-stockton-ubi-experiment',
    'wikipedia-ubi',
  ],
};

export default universalBasicIncomeMethodology;
