/**
 * V3 Needs-Based Methodology: Free and Easy Voter ID
 *
 * Policy: Requires that any state with voter ID laws must provide eligible citizens with a free ID
 * and free access to any necessary underlying documents (e.g. birth certificates), using a
 * streamlined process.
 *
 * Overall Score: ~6.2/10 (Slightly Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const freeEasyVoterIdMethodology: V3PolicyMethodology = {
  policyId: 'free-and-easy-voter-id',
  policyName: 'Free and Easy Voter ID',
  description:
    'Requires that any state with voter ID laws must provide eligible citizens with a free ID and free access to any necessary underlying documents (e.g. birth certificates), using a streamlined process. This aims to remove financial and logistical barriers to obtaining voter identification.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning:
        'Neutral. There is little direct effect on basic survival needs like food, shelter, or health. Any impact is indirect (e.g. an ID might help someone access food assistance or medical services, but the policy itself doesn\'t provide those resources).',
    },
    safety: {
      score: 5.5,
      reasoning:
        'Slight positive. This policy can improve the stability and fairness of society, which relates to safety in a broad sense. By fostering an inclusive democracy, it may increase trust in institutions and reduce social grievances (thus contributing to societal stability/protection of rights). However, it does not address personal security or crime directly.',
    },
    community: {
      score: 7.5,
      reasoning:
        'Strong positive. By eliminating cost barriers to voting, this policy expands civic participation and social inclusion. It upholds the ideal of equal access to democratic participation, helping marginalized groups engage in community decision-making. This strengthens the sense of community and democratic legitimacy.',
    },
    opportunity: {
      score: 6.5,
      reasoning:
        'Moderately positive. An ID is often a gateway to opportunities – it\'s needed for employment paperwork, opening bank accounts, enrolling in education, travel, etc. Providing free IDs could economically empower those who currently lack identification, indirectly improving job prospects and mobility. While not primarily an economic policy, it removes a practical barrier that has held some people back.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. Being able to vote and have a voice in society can enhance personal fulfillment and dignity. For individuals who previously faced exclusion due to lack of ID, obtaining an ID and voting can boost self-esteem and empowerment. This fulfills higher-level needs of civic belonging and personal growth to a small extent.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'High. This reform would benefit a large number of voters, especially in states with strict ID requirements. Research shows as of 2020 about 29 million eligible voters lacked a current driver\'s license, and over 7 million had no current government-issued photo ID. Those without ID are disproportionately from marginalized groups – citizens of color are nearly 4 times more likely than white citizens to lack a current photo ID.',
      keyPoints: [
        '29 million eligible voters lack current driver\'s license',
        '7+ million lack government-issued photo ID',
        'Citizens of color 4x more likely to lack photo ID',
        'Benefits millions facing ID-related barriers',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Low. Voting access is not directly related to immediate survival needs like food or shelter. However, having a government-issued ID can indirectly assist with survival needs – for example, ID is often required to access social services, housing, or healthcare. The core benefit is civic (protecting voting rights) rather than nutritional or medical.',
      keyPoints: [
        'Not directly related to survival needs',
        'ID can help access social services',
        'Core benefit is civic participation',
        'Indirect assistance with basic needs',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Moderate. If enacted, benefits could be realized within an election cycle. States would need to set up issuance of free IDs and document fee waivers, which could happen in months to a year. Voters lacking ID could obtain one before the next major election, quickly reducing disenfranchisement. Positive outcomes – higher voter turnout and inclusion – would begin to appear in the short to medium term.',
      keyPoints: [
        'Benefits realized within an election cycle',
        'Setup in months to a year',
        'Voters can obtain ID before next election',
        'Short to medium term outcomes',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderate-High. With 81% public support, this policy is broadly popular, suggesting political will could be mustered. Some states already offer free voter IDs, but covering underlying document fees (e.g. ~$50 for a birth certificate) is an added step. Partisan differences could pose obstacles (voter ID laws are contested along party lines), yet making IDs free is a compromise often proposed to ensure IDs don\'t suppress votes.',
      keyPoints: [
        '81% public support',
        'Some states already offer free voter IDs',
        'Document fees add complexity',
        'Partisan differences are an obstacle',
        'No insurmountable technical barriers',
      ],
    },
  },

  overallRationale:
    'After applying category weights, Free and Easy Voter ID scores ~6.2/10, placing it as slightly beneficial. It has a clear benefit to community and opportunity needs, while being neutral on basic survival needs. The policy is net beneficial (above 5) but not revolutionary across all Maslow categories. In summary, ensuring free voter IDs would remove a harmful barrier to democratic participation (significant social benefits) with minimal downsides, yielding a positive but modest overall impact on societal well-being.',

  sources: [
    'voteriders-id-research',
    'brennan-voter-id-access',
  ],
};

export default freeEasyVoterIdMethodology;
