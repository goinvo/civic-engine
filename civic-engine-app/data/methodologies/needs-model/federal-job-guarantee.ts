/**
 * V3 Needs-Based Methodology: Federal Job Guarantee (FJG)
 *
 * Policy: Assure that anyone who wants to work can get a public job at a living wage,
 * with the government as employer of last resort.
 *
 * Overall Score: ~8.5/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const federalJobGuaranteeMethodology: V3PolicyMethodology = {
  policyId: 'federal-job-guarantee',
  policyName: 'Federal Job Guarantee',
  description:
    'The Federal Job Guarantee assures that anyone who wants to work can get a public job at a living wage, with the government as employer of last resort. The federal government funds jobs (with benefits and living wages) and works with local agencies/nonprofits to employ people in useful community projects. This policy aims for permanent full employment – eliminating involuntary unemployment and raising labor standards. Average public support is approximately 58%.',

  needCategories: {
    physiological: {
      score: 8,
      reasoning:
        'High benefit. A Job Guarantee fights poverty by providing income through work for anyone willing to work. By design, it would eliminate poverty-level unemployment: everyone can earn a living wage, affording food, shelter, and healthcare. This directly ensures basic needs are met via earned income. Advocates note it would "eliminate involuntary unemployment, reduce poverty, and raise the floor for all low-wage workers." Unlike UBI, the FJG is not universal for those who can\'t or don\'t work, but for the able and willing it guarantees an income above poverty.',
    },
    safety: {
      score: 9,
      reasoning:
        'Extremely high benefit. The Job Guarantee provides economic security and stability on multiple levels. Individually, any worker can fall back on a guaranteed job – this protects people from the insecurity of job loss or exploitation. Systemically, it acts as an automatic stabilizer: in recessions, as private jobs vanish, the public jobs program expands to employ idle workers, preventing mass unemployment. It also strengthens worker bargaining power – if private employers abuse workers, people can exit to the public job. By decommodifying labor, a FJG would force all employers to offer better pay and conditions, improving job security economy-wide.',
    },
    community: {
      score: 8,
      reasoning:
        'High benefit. A federal jobs program inherently involves community participation and projects. The FJG is often described with a "polycentric design," where funding is federal but jobs are created locally based on community-identified needs. This means communities could develop public works – from building parks and caring for the elderly to arts, recreation, and environmental projects. Such projects can build social capital and improve local quality of life. The program would also reduce the social exclusion of unemployment, fostering inclusion and dignity. By investing in marginalized communities through guaranteed jobs, it would reduce inequality and racial inequities.',
    },
    opportunity: {
      score: 10,
      reasoning:
        'Extremely high benefit. The very essence of a Job Guarantee is to expand opportunity for employment to 100% of job-seekers. It ensures everyone has the opportunity to work, train, and gain skills. No one is left idle who wants to contribute. This policy especially helps those who face barriers in the private job market (e.g. the long-term unemployed, youth with little experience, people in areas with few jobs). It provides a stepping stone – giving work experience and training that can lead to private-sector opportunities. Over time, by tightening the labor market, it also pushes private employers to create better opportunities.',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'Moderate benefit. Meaningful work can be a source of personal fulfillment, and the Job Guarantee would strive to provide "fair work" rather than "make-work" – jobs that add value to society. Participants could find purpose in serving their communities, whether in creative arts projects, education support, or environmental restoration. The program could potentially include jobs in cultural and recreational fields, allowing people to pursue their passions with public support. By freeing workers from dead-end, exploitative jobs, it gives people voice to pursue better-fitting work. It promotes dignity, purpose, and even creativity.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very broad. The FJG would be available to all adults seeking work – effectively covering the unemployed, underemployed, new entrants (like graduating students), and those who leave undesirable jobs. In a healthy economy, not everyone will need it at once (many have private jobs), but it serves as a universal option. In terms of potential reach, it could benefit millions of workers directly (currently ~5.8 million unemployed in the U.S. and more underemployed), and indirectly all workers gain bargaining power from its presence.',
      keyPoints: [
        'Available to all adults seeking work',
        '~5.8 million unemployed would directly benefit',
        'Underemployed and job-seekers also covered',
        'All workers gain bargaining power indirectly',
        'Universal option even if not everyone uses it',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'High. Having a job and income is fundamental to survival in a market economy. By guaranteeing a living wage job, the policy ensures anyone can obtain the money needed for food, shelter, healthcare. It\'s as essential as UBI for meeting basic needs – with the caveat that one must work (so those unable to work due to disability or caregiving might not directly benefit without complementary policies). For the able-bodied population, this guarantees a path out of destitution. It literally aims to end involuntary poverty through work.',
      keyPoints: [
        'Job and income fundamental to survival',
        'Guarantees living wage for all willing workers',
        'Path out of destitution for able-bodied',
        'Addresses psychological need for security',
        'Aims to end involuntary poverty through work',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Short to medium term. In theory, once implemented, anyone can be hired immediately. The speed of impact on individuals who sign up is quick – they start earning a paycheck as soon as a local job placement is arranged (which could be within weeks). During recessions, the jobs program would scale up quickly, preventing long gaps. However, practically building out the infrastructure (creating projects, administrative capacity) might take some startup time. Initial jobs created within a few months, full ramp-up could take a year or two.',
      keyPoints: [
        'Individuals hired immediately once implemented',
        'Paychecks start within weeks of placement',
        'Program scales up quickly during recessions',
        'Infrastructure buildout takes startup time',
        'Full ramp-up in 1-2 years',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Moderate. The idea of a job guarantee is gaining traction but still politically novel. Polling shows consistent majority support (~59%) across demographics, and the concept has historical precedents (New Deal, CETA jobs in the 1970s). It can be framed attractively: instead of "handouts," it offers work and community improvements. Some cities or states could pilot it. On the other hand, opponents will cite the potentially large budget cost and "big government" expansion. It requires ongoing management of perhaps millions of public jobs. Elements of it often gain support during crises (e.g. COVID or climate-related job programs).',
      keyPoints: [
        '~59% public support across demographics',
        'Historical precedents: New Deal, CETA',
        'Framed as work not handouts appeals broadly',
        'Budget cost and big government concerns',
        'Requires managing millions of public jobs',
        'Elements gain support during crises',
      ],
    },
  },

  overallRationale:
    'The Federal Job Guarantee scores approximately 8.5/10, firmly in the "very beneficial" range. It powerfully addresses safety and opportunity needs – guaranteeing work and income eliminates a major cause of poverty and insecurity. It also strengthens communities and individual well-being through meaningful work. The policy would have far-reaching positive effects on the economy (full employment, higher wages) and on social justice (reducing racial employment gaps and exploitation). The only things tempering its score are the implementation logistics and political hurdles. If enacted well, it could even approach "extremely beneficial" due to its transformative nature.',

  sources: [
    'jacobin-job-guarantee-poll',
    'job-guarantee-now-org',
  ],
};

export default federalJobGuaranteeMethodology;
