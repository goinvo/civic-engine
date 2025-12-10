/**
 * V3 Needs-Based Methodology: Kids Online Safety Act (KOSA)
 *
 * Policy: Proposed legislation aimed at protecting minors on social media and other online
 * platforms. It would create a legal duty for tech platforms to shield children from harmful
 * content and addictive features.
 *
 * Overall Score: ~6.5/10 (Slightly Beneficial, on the cusp of Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const kidsOnlineSafetyMethodology: V3PolicyMethodology = {
  policyId: 'kids-online-safety-act',
  policyName: 'Kids Online Safety Act (KOSA)',
  description:
    'The Kids Online Safety Act (KOSA) is proposed legislation aimed at protecting minors on social media and other online platforms. It would create a legal duty for tech platforms to shield children from harmful content and addictive features – for example, curbing promotion of self-harm, eating disorders, sexual exploitation, and requiring stricter default privacy and safety settings for users under 17.',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'While this law doesn\'t provide material needs like food or shelter, it does concern children\'s health – particularly mental health. KOSA addresses the health aspect by aiming to reduce the negative mental and emotional impacts (depression, anxiety, suicidal ideation) linked to harmful online content. Youth suicide and self-harm rates have been linked to social media use, so protecting kids could have life-or-death implications in extreme cases.',
    },
    safety: {
      score: 8,
      reasoning:
        'This is the core category for KOSA. It\'s all about security and protection of minors in the online environment. By forcing platforms to actively mitigate dangers – whether from predators, cyberbullying, or exposure to traumatic content – the law seeks to provide kids with a safe digital space. The act would impose penalties on companies whose designs expose kids to harm, effectively incentivizing the removal of dangerous features.',
    },
    community: {
      score: 6.5,
      reasoning:
        'KOSA could benefit the community/social needs of young people by creating a healthier online social environment. If implemented, kids might experience less cyberbullying and hate content, which could improve their sense of belonging and social inclusion. Helping children be safe online can have positive ripple effects for school communities and families. However, community impact is somewhat limited to the online context and youth circles.',
    },
    opportunity: {
      score: 5.5,
      reasoning:
        'This policy doesn\'t directly address education or employment. However, indirectly, if children are mentally healthier and less distracted by toxic online experiences, they can focus better on school and personal development. A teenager not spiraling into an eating disorder due to social media influence is more likely to stay in school and pursue their goals. These effects are real but ancillary.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Ensuring a safer online space for youth can help them explore interests and express themselves more freely without fear of harassment or harmful content. KOSA could foster conditions for personal growth and fulfillment for minors. However, critics worry about censorship which could limit teens\' access to information and communities (especially LGBTQ+ youth). The self-actualization benefit is conditional on how the law is implemented.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'This policy specifically targets minors – roughly the ~50 million children and teenagers in the US are the primary beneficiaries. That\'s a significant population (about 15% of Americans), and it indirectly affects their parents and educators as well. Virtually every family with kids could feel an impact. Outside of that, it doesn\'t directly benefit adults (except giving peace of mind to parents).',
      keyPoints: [
        '~50 million children and teenagers affected',
        'About 15% of Americans directly',
        'Indirectly affects parents and educators',
        'Sizable but not universal population',
      ],
    },
    essentialToSurvival: {
      score: 7,
      reasoning:
        'Protecting children from online exploitation and self-harm content can indeed be essential to their lives in extreme cases – it may prevent tragedies like suicide or dangerous encounters. However, for most, it\'s about improving well-being rather than literally keeping them alive day-to-day. 93% of voters agree that the mental health challenges facing kids today are a serious problem. Over years it could be life-saving for some and life-improving for many.',
      keyPoints: [
        'May prevent suicide and dangerous encounters',
        '93% agree youth mental health is serious problem',
        'Important but not as fundamental as food/physical safety',
        'Long-term health and safety benefits',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'The benefits could be seen relatively quickly once implemented, but not instantaneously. Platforms would likely be given a deadline (perhaps months or a year) to comply. Some changes – like turning on high privacy settings by default for minors – could be done rapidly by companies. Effects like reductions in youth depression rates would take longer to measure, though improvements in online behavior might be noticed within the first year or two.',
      keyPoints: [
        'Some changes immediate upon compliance',
        'Privacy settings can be updated quickly',
        'Mental health improvements take longer to measure',
        'Short-term (1-2 years) for initial impact',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'Politically, KOSA has shown high feasibility – it has rare bipartisan backing (introduced by a Democrat and a Republican, passing the Senate with only 3 dissenting votes). Public demand is strong (86-88% support). The main hurdle is ironing out details and overcoming industry lobbying or constitutional concerns. Some opposition from civil liberties groups who fear over-censorship. Big tech companies can implement the requirements as they already have content filters.',
      keyPoints: [
        '86-88% public support',
        'Passed Senate 91-3',
        'Bipartisan backing',
        'Some civil liberties concerns',
        'Implementation feasible for tech companies',
      ],
    },
  },

  overallRationale:
    'We rate KOSA as a moderately to very beneficial policy, around ~6.5/10. It clearly has substantial benefits: improving the mental and emotional safety of tens of millions of children, which in turn can reduce teen suicide, self-harm, and exploitation incidents. KOSA scores highest on Safety, which is the most heavily weighted category. Where it falls short is the relatively narrower scope (age-specific, doesn\'t directly address material needs) and the caution that implementation must balance safety with rights. If done well, KOSA could be very beneficial; if done poorly, it could have side effects like denying teens access to beneficial information.',

  sources: [
    'issue-one-kosa-poll',
    'kosa-wikipedia',
    'kosa-senate-passage',
  ],
};

export default kidsOnlineSafetyMethodology;
