/**
 * V3 Needs-Based Methodology: Universal Pre-K
 *
 * Policy: A Universal Pre-Kindergarten program would provide free, high-quality
 * pre-K education to all 3- and 4-year-olds nationwide.
 *
 * Overall Score: ~8/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const universalPreKMethodology: V3PolicyMethodology = {
  policyId: 'universal-pre-k',
  policyName: 'Universal Pre-K',
  description:
    'A Universal Pre-Kindergarten program would provide free, high-quality pre-K education to all 3- and 4-year-olds nationwide. This means any family could enroll their preschool-age children in an early education program, typically a full-day classroom setting, at no cost. The goals are to improve children\'s school readiness and long-term outcomes, while also relieving parents of childcare costs so they can participate in the workforce. Several states (e.g. Oklahoma, Florida, West Virginia) already offer near-universal pre-K with notable success, and public support for a federal program is high (70% of Americans favor federal funding for universal pre-K, including a majority of Republicans).',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'Slight positive. At first glance, education isn\'t about food or shelter. However, universal pre-K can indirectly support basic well-being. Children in pre-K often receive meals and health screenings, ensuring nutrition and early healthcare referrals, especially for low-income families. By enabling parents to work, it also boosts family income, which helps provide food and housing stability. Research indicates high-quality early education leads to better health outcomes in adulthood (e.g. lower rates of obesity and illness). While these effects are secondary and long-term, they move the needle above neutral for physiological needs.',
    },
    safety: {
      score: 7,
      reasoning:
        'Moderate positive. In the immediate term, offering supervised, high-quality pre-K keeps young children in safe learning environments during the day. This can reduce instances of childhood accidents or neglect that might occur in substandard childcare situations. More importantly, the long-term impact on safety is significant: studies have found that children who attend early education are less likely to engage in criminal activity later in life, reducing juvenile crime and incarceration rates. By "building strong children" upfront, society may face fewer safety issues down the road.',
    },
    community: {
      score: 8,
      reasoning:
        'High positive. Universal pre-K promotes social belonging and civic participation in multiple ways. Firstly, it brings children of all backgrounds together at a young age, fostering socialization across class and racial lines during formative years. This can improve empathy and community cohesion. Secondly, it is often implemented in local schools or centers, becoming a community institution that involves parents and families (through events, volunteering, etc.), thereby boosting civic engagement. Providing every child an equal start in education resonates as a community value – New Mexico voters passed a constitutional amendment with ~70% support to fund early childhood education. By leveling the educational playing field, universal pre-K strengthens the social fabric.',
    },
    opportunity: {
      score: 10,
      reasoning:
        'Extremely positive. This is where universal pre-K shines brightest. It directly expands educational opportunities to an entire age group. Early education has proven effects on cognitive and academic skills, especially for disadvantaged children who might otherwise start school behind. Achievement gaps shrink when all kids have access to quality pre-K, leading to higher high school graduation and college attendance rates years later. In economic terms, pre-K enables parents (especially mothers) to rejoin the workforce, boosting employment and income – studies show free preschool can increase parents\' earnings substantially. This policy enhances both short-term economic opportunity (jobs for parents, jobs in early education) and long-term opportunity (human capital gains for the next generation). The return on investment is huge: analyses find $2.50 or more in societal savings for every $1 invested.',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'Moderate positive. Education is fundamentally linked to personal fulfillment. By sparking a love of learning at an early age, universal pre-K helps children eventually pursue their interests, talents, and creativity – key aspects of self-actualization. It can expose kids to art, music, and play-based learning that are crucial for creativity. For parents, having reliable pre-K might free up time and reduce stress, allowing them to engage in furthering their own goals (such as career advancement or personal development). While these effects are somewhat intangible, they do contribute positively to individuals reaching their full potential.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. This policy would benefit millions of people nationwide. Every family with young children stands to gain (roughly 3.5 to 4 million children are in each age cohort of 3- and 4-year-olds in the US, plus their parents). In addition, society at large benefits from a better-educated populace and a stronger economy long-term. Essentially, a whole generation is covered, cutting across all regions and demographics. Even those without children benefit indirectly via economic growth and reduced social problems.',
      keyPoints: [
        '~7-8 million children in the 3-4 age cohort',
        'All families with young children benefit directly',
        'Cuts across all regions and demographics',
        'Bipartisan appeal (red states like Oklahoma, Georgia, West Virginia implementing)',
        'Indirect benefits for entire society',
      ],
    },
    essentialToSurvival: {
      score: 6,
      reasoning:
        'Moderate. Education itself is not as immediately life-critical as food or emergency healthcare. However, from a holistic perspective, early education can be seen as essential for a healthy, functional life. It\'s not going to keep someone alive next week, but it can profoundly shape life outcomes. By enabling parental employment, it helps families secure their basic needs (income for food, shelter). Quality pre-K also provides a safe, nurturing environment each day – for some vulnerable young children, this can be protective in terms of abuse or neglect. Still, relative to a policy like universal healthcare, it\'s a step removed from direct survival needs.',
      keyPoints: [
        'Education foundational for long-term thriving',
        'Enables parents to earn income for basic needs',
        'Safe environment protects vulnerable children',
        'Not immediately life-critical like healthcare',
        'Profound long-term life outcome impacts',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Mixed (short-term and long-term benefits). Universal pre-K has a dual timeline of benefits. On one hand, some outcomes are immediate: as soon as a free pre-K program is available, parents get financial relief and childcare – they may return to work or save money that would have gone to private preschool. Children also start learning and socializing right away. On the other hand, the biggest gains (education, earnings, social outcomes) manifest over years and decades as this cohort grows up. It takes ~15 years to see the full effect on high school graduation rates. That said, research has documented measurable improvements by third grade for kids who attended pre-K. Some benefits are realized in the very short term (within a year), while the most transformative benefits accrue in the long term (10-20 years).',
      keyPoints: [
        'Immediate: parental employment and financial relief',
        'Short-term: measurable gains by third grade',
        'Long-term: graduation rates, career outcomes (10-20 years)',
        'Mixed timeline with both short and long-term payoffs',
        'Near-term wins make long-term wait palatable',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Moderate. Politically, universal pre-K has strong public support (around 70% approval nationally) and bipartisan appeal, but the challenge lies in funding and implementation. Democrats widely endorse it – President Biden pushed for universal pre-K in his 2021 agenda. Republicans are more divided: while many conservatives like the idea (especially when framed as "preparedness" rather than "government daycare"), there is concern over federal spending and control. Some red states (Oklahoma, West Virginia) have shown it can be done successfully at state level. The feasibility at the federal level hinges on budget negotiations – it\'s expensive upfront. It nearly became reality in 2022 via the Build Back Better bill (blocked by a single Senate vote). Implementing it also requires scaling up infrastructure (classrooms, teachers), which is a practical challenge.',
      keyPoints: [
        '70% public approval nationally',
        'Bipartisan appeal but funding concerns',
        'State-level successes (Oklahoma, West Virginia, Florida)',
        'Nearly passed in 2022 (Build Back Better)',
        'Infrastructure/implementation challenges remain',
        'Achievable with sustained advocacy and funding',
      ],
    },
  },

  overallRationale:
    'Universal Pre-K scores approximately 8/10, indicating it is Very Beneficial. The policy powerfully advances the Opportunity and Community needs, and even contributes to Safety and Physiological well-being in the long run through improved life outcomes. Virtually an entire population cohort benefits, and the positive impacts (better education, higher earnings, reduced crime) ripple out to society. There are few downsides – the main "harm" might be the fiscal cost, but evidence suggests the investment pays for itself many times over. Because it\'s not directly life-saving and takes time to fully realize, we stop short of calling it extremely beneficial (9+). However, given the strong evidence base and multi-faceted returns, it firmly sits in the "very beneficial" tier. This is a policy with both immediate and enduring rewards.',

  sources: [
    'gallup-pre-k-poll',
    'first-focus-early-learning',
    'edweek-pre-k-support',
    'yale-pre-k-parental-income',
    'georgetown-pre-k',
    'mdrc-pre-k',
  ],
};

export default universalPreKMethodology;
