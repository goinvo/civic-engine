/**
 * V3 Needs-Based Methodology: Voluntary National Service (Expanded AmeriCorps)
 *
 * Policy: Greatly expand voluntary national service programs (like AmeriCorps, Peace Corps),
 * providing robust incentives for young adults to serve for one year by age 25.
 *
 * Overall Score: ~7.5/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const nationalServiceVoluntaryMethodology: V3PolicyMethodology = {
  policyId: 'national-service-voluntary',
  policyName: 'Voluntary National Service (Expanded AmeriCorps)',
  description:
    'Greatly expand voluntary national service programs (like AmeriCorps, Peace Corps, etc.), aiming to provide robust incentives for young adults to serve for one year by age 25. Service includes work in education, disaster relief, infrastructure, conservation, and other community projects. The program would offer benefits such as college tuition assistance or student debt relief in exchange for service. This is not mandatory; participation is optional but encouraged through incentives. Average public support is approximately 80%.',

  needCategories: {
    physiological: {
      score: 7,
      reasoning:
        'Moderate positive. While national service is not a direct welfare program, many service projects fight poverty and improve basic living conditions. AmeriCorps members build affordable housing (addressing shelter needs), help run food banks or aid distribution (addressing hunger), and assist in public health outreach. During disasters, they provide food, water, shelter, and medical support on the ground. By enlarging these efforts, the policy would enhance the capacity to meet physiological needs in underserved communities.',
    },
    safety: {
      score: 7,
      reasoning:
        'Moderate positive. National service contributes to public safety and security in multiple ways. Service members bolster disaster response and recovery (floods, wildfires, hurricanes), making communities more resilient and protected. Some may work in public safety programs or assist vulnerable populations, enhancing overall stability. Additionally, by giving young people purpose and a stake in their communities, national service can indirectly reduce crime or social unrest (engaged youth are less likely to engage in harmful activities).',
    },
    community: {
      score: 9,
      reasoning:
        'Extremely positive. This is where national service shines. Bringing together participants from diverse backgrounds to work for the common good strengthens social bonds and civic unity. Participants report a powerful sense of belonging and understanding of other cultures/regions through their service. Alumni are far more likely to remain engaged citizens – they vote, volunteer, and lead at higher rates than others. National service essentially serves as "civic glue," bridging divides and building empathy across class, racial, and regional lines.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'Strong positive. The program offers participants valuable training, work experience, and educational benefits, improving their employment and education prospects. Research finds that every $1 invested in national service yields about $4 in economic returns – via reduced public spending, higher earnings for alumni, and better educational outcomes. Members receive education awards (around $6,000) which helped pay for college. Many develop marketable skills during service (leadership, teamwork, project management) that enhance their job opportunities.',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'High positive. Voluntary service can be a profoundly fulfilling personal experience. Participants often describe it as transformative, instilling a sense of purpose, confidence, and patriotism defined by service rather than symbols. They forge deep relationships, gain perspective on the nation\'s diversity, and feel part of something larger than themselves. This policy would offer many young people a chance for personal growth, exploration, and finding direction through travel, teamwork, and challenges.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'Broad. The primary beneficiaries are the young adults who serve (potentially hundreds of thousands per year if scaled up) and the communities they serve in. If the goal of "1 year of service by age 25" were widely achieved, millions of Americans would participate in a decade. Indirectly, society at large benefits from the projects (e.g. disaster recovery efforts help entire towns). Support spans demographics and parties (around 77–83% approval across political groups).',
      keyPoints: [
        'Hundreds of thousands of young adults could serve annually',
        'Millions would participate over a decade',
        'Communities receive direct service benefits',
        '77-83% approval across political groups',
        'Disaster recovery helps entire towns',
      ],
    },
    essentialToSurvival: {
      score: 6,
      reasoning:
        'Low to moderate. National service addresses social and civic needs more than immediate survival. However, some service projects do provide basic necessities – members help build homes for the homeless, assist in food security programs, or deliver disaster aid. In disaster responses (floods, wildfires), service members literally help protect lives. So while survival isn\'t the primary goal, the program indirectly supports it in crisis situations and for vulnerable groups.',
      keyPoints: [
        'Addresses social/civic needs primarily',
        'Some projects provide basic necessities',
        'Disaster response helps protect lives',
        'Builds homes for homeless families',
        'Assists food security programs',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Medium-term. Some benefits are immediate – every year of service yields tangible outputs (homes built, students tutored, trees planted, etc.) and participants receive their education awards right after service. Community cohesion benefits and increased civic engagement accrue over longer periods as alumni carry forward their experience. The full societal payoff (e.g. a generation with higher civic participation) unfolds over years.',
      keyPoints: [
        'Tangible outputs each year of service',
        'Education awards received immediately after service',
        'Community cohesion builds over time',
        'Alumni carry civic engagement forward',
        'Full generational impact unfolds over years',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'High. Voluntary national service is politically feasible: it has strong bipartisan public support (~80%) and does not face constitutional hurdles. The main requirement is funding and administrative expansion of programs. Studies and pilot programs (AmeriCorps, state service programs) already provide a blueprint. As long as Congress allocates the budget, scaling up service positions is achievable. Relative to many programs, this is straightforward to implement and trending stable in support.',
      keyPoints: [
        '~80% bipartisan public support',
        'No constitutional hurdles',
        'AmeriCorps provides existing blueprint',
        'Main requirement is funding allocation',
        'Straightforward to scale up',
        'Trending stable in political support',
      ],
    },
  },

  overallRationale:
    'Voluntary National Service scores approximately 7.5/10, indicating it is Very Beneficial. This expansion scores especially high on Community and Opportunity, yielding a strongly positive net impact. It would significantly strengthen social fabric and individual growth, with only minimal drawbacks (chiefly the budgetary cost). With robust feasibility (~80% support), its benefits are likely to be realized if enacted. The program serves as "civic glue" bridging divides while providing valuable skills and education benefits to participants.',

  sources: [
    'fulcrum-americorps-impact',
    'voices-for-service',
  ],
};

export default nationalServiceVoluntaryMethodology;
