/**
 * V3 Needs-Based Methodology: Invest in Vocational Training
 *
 * Policy: Significantly increase investment in vocational and skills training programs to equip
 * students and workers with practical, job-ready skills through trade schools, apprenticeships,
 * and community college programs.
 *
 * Overall Score: ~8.5/10 (Very Beneficial, Approaching Extremely Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const vocationalTrainingMethodology: V3PolicyMethodology = {
  policyId: 'invest-vocational-training',
  policyName: 'Invest in Vocational Training',
  description:
    'Significantly increase investment in vocational and skills training programs. The aim is to equip students and workers with practical, job-ready skills (e.g. through trade schools, apprenticeships, community college programs) as an alternative or supplement to traditional 4-year college.',

  needCategories: {
    physiological: {
      score: 7,
      reasoning:
        'Indirectly, this policy helps people meet their basic needs of food, shelter, and health by improving their employment prospects. A steady job with a decent wage (often achievable through vocational paths in trades, healthcare tech, manufacturing, etc.) allows individuals to afford nutrition, housing, and healthcare. By lifting people into stable employment, vocational training addresses physiological needs via financial stability.',
    },
    safety: {
      score: 7,
      reasoning:
        'A skilled trade job provides economic security, reducing the instability and stress that come with unemployment or underemployment. In the long run, societies with higher employment tend to have lower crime and greater social stability, so there\'s a community safety benefit as well. While not a police or defense policy, this investment contributes to safety by preventing the insecurity and social unrest that can arise from joblessness.',
    },
    community: {
      score: 7,
      reasoning:
        'Expanding vocational training can strengthen communities by fostering a sense of purpose and belonging. When local industries have skilled workers, communities thrive – families have stable incomes, young people see a future locally, and civic participation can increase. Many vocational programs involve partnerships with local businesses or mentorship, knitting together community bonds.',
    },
    opportunity: {
      score: 9,
      reasoning:
        'This is where the policy shines. By providing alternate educational pathways and career opportunities, this investment directly expands opportunity for a wide segment of the population. Many Americans "don\'t need a traditional four-year degree to enjoy a prosperous life – what they need are skills that will propel them into middle-class jobs." Vocational programs supply exactly that: marketable skills in high-demand fields (skilled trades are projected to grow ~10% this decade, far above average job growth).',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'By helping individuals find fulfilling careers suited to their talents, vocational training can also feed self-actualization. Not everyone\'s personal dream involves an academic degree; some find great personal satisfaction in mastering a craft or trade. This policy supports people in realizing their potential in domains like construction, technology, arts, culinary, etc. It also carries a cultural benefit of dignifying skilled work.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'A large swath of the population stands to benefit. This policy could impact millions of current and future workers: high school students looking for career-focused education, young adults not pursuing college, mid-career workers needing to re-skill, veterans transitioning to civilian jobs, unemployed individuals seeking new careers. Given that around two-thirds of Americans do not have a bachelor\'s degree, the proportion affected is huge.',
      keyPoints: [
        'Impacts millions of current and future workers',
        'Two-thirds of Americans lack bachelor\'s degrees',
        'Benefits across all regions and demographics',
        'Especially helps economically depressed areas',
      ],
    },
    essentialToSurvival: {
      score: 7,
      reasoning:
        'While vocational training isn\'t as immediately life-and-death as a healthcare or safety policy, it is essential to economic survival for many. In modern society, having employable skills is critical to securing basic needs – a job provides income that buys food, housing, healthcare. This addresses the root enabler of basic needs (income). It may not directly stop someone from dying tomorrow, but over time it can prevent poverty-related hardships.',
      keyPoints: [
        'Essential to economic survival',
        'Enables securing basic needs through employment',
        'Prevents poverty-related hardships',
        'Strong correlation with life outcomes',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'The benefits from investing in skills training accrue over a medium timeframe. Many programs can show results relatively quickly – e.g., a 6-month coding bootcamp or a 1-year trade certificate can lead a graduate to a job soon after. We might start seeing improved employment rates and incomes for participants within 1-2 years of program expansion. The policy\'s impact also compounds as more cohorts go through training.',
      keyPoints: [
        'Programs range from 6 months to 2 years',
        'Results visible within 1-2 years',
        'Impact compounds over time',
        'Faster than generational social changes',
      ],
    },
    feasibility: {
      score: 9,
      reasoning:
        'Politically and practically, investing in vocational training is highly feasible. It\'s a broadly popular idea across party lines (82% support for more funding). There are few ideological objections – both conservatives and liberals see value in jobs and skills. It\'s "an area of rare common ground in our deeply divided political environment." Many states already have successful technical education initiatives, so scaling them up is practical.',
      keyPoints: [
        '82% public support',
        'Rare bipartisan common ground',
        'Many successful state initiatives exist',
        'Modest cost relative to government budgets',
        'No significant political roadblocks',
      ],
    },
  },

  overallRationale:
    'This policy is a strong net positive, scoring in the mid-to-high 8 range (~8.5/10). It directly fulfills Opportunity needs and supports basic economic security, which in turn helps satisfy physiological and safety needs for many people. Because it empowers a large portion of society to improve their livelihoods, the aggregate benefit is immense – we could see reduced unemployment, a shrinking skills gap for industries, and thousands (if not millions) of families moved into the middle class. High public support and ease of implementation further bolster its value.',

  sources: [
    'national-skills-coalition-perspectives',
    'sheeo-workforce-grants-study',
    'intercoast-vocational-advantage',
    'sciencedirect-vocational-education',
  ],
};

export default vocationalTrainingMethodology;
