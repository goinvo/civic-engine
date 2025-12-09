/**
 * V3 Needs-Based Methodology: Immigration Grand Bargain
 *
 * Policy: Mandatory E-Verify + Dreamers' Citizenship - pairs mandatory E-Verify for all employers
 * (to curb illegal hiring of undocumented workers) with a pathway to citizenship for Dreamers
 * (undocumented immigrants brought to the U.S. as children).
 *
 * Overall Score: ~7.5/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const immigrationGrandBargainMethodology: V3PolicyMethodology = {
  policyId: 'immigration-grand-bargain',
  policyName: 'Immigration Grand Bargain (E-Verify + Dreamers Citizenship)',
  description:
    'This "grand bargain" pairs mandatory E-Verify for all employers (to curb illegal hiring of undocumented workers) with a pathway to citizenship for Dreamers (undocumented immigrants brought to the U.S. as children). It\'s essentially an immigration compromise: enhanced enforcement on illegal employment in exchange for legal status for a deserving group.',

  needCategories: {
    physiological: {
      score: 6.5,
      reasoning:
        'Moderate benefit. While not directly providing food or shelter, legal status does improve access to healthcare and social services for Dreamers. With better jobs, they can afford housing and other necessities more easily. Economic stability and healthcare access for legalized immigrants provides meaningful indirect benefits to basic needs.',
    },
    safety: {
      score: 8,
      reasoning:
        'Strong positive. Provides security and stability to ~1-2 million Dreamers who would no longer fear deportation. By granting lawful status, their personal safety and stability in the community increase significantly. There\'s also a rule-of-law security aspect – mandatory E-Verify strengthens national protection against illegal labor practices. Safety is the highest-weight need (30%), and here it\'s meaningfully addressed.',
    },
    community: {
      score: 7,
      reasoning:
        'Positive impact. Integrating Dreamers secures their sense of belonging. These individuals grew up in the U.S.; legalization lets them fully join civic life (eventually even voting and serving), enhancing social cohesion. The policy also signals a compassionate, fair approach to immigration, which can improve community relations. Dreamers move from the shadows to active community members.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'Strong positive. A path to citizenship unlocks employment and education opportunities for Dreamers. They can legally work in better jobs, pursue careers, and contribute more fully to the economy. Employers benefit from a stable, legal workforce. Meanwhile, E-Verify ensures job opportunities are reserved for legal workers, potentially improving wages and employment for citizens/legal residents.',
    },
    selfActualization: {
      score: 7,
      reasoning:
        'Positive impact. Freed from legal limbo, Dreamers can pursue their personal goals (higher education, professional advancement, community leadership) and fulfill their potential. This addresses self-fulfillment needs by allowing these individuals to thrive rather than merely survive.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'The direct beneficiaries (Dreamers) are a relatively small fraction of the U.S. population (estimate ~1-2 million people). However, the indirect impact is broader: Mandatory E-Verify affects the entire labor market (all employers and new hires nationwide). By curbing unauthorized employment, it could influence industries that rely on undocumented labor. In total, millions of people\'s lives and workplaces would be touched.',
      keyPoints: [
        'Direct beneficiaries: ~1-2 million Dreamers',
        'E-Verify affects entire labor market',
        'Influences industries relying on undocumented labor',
        'Significant but not universal reach',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'For Dreamers, this policy is highly critical to their basic security – it literally determines whether they can live without fear in the only country they call home. That\'s a fundamental life stability issue (bordering on a survival need if deportation could put them at risk). For the average American, the policy is less about immediate survival, but it does enhance social stability and the rule of law.',
      keyPoints: [
        'Critical to Dreamers\' basic security',
        'Determines ability to live without fear of deportation',
        'Fundamental life stability issue',
        'Enhances social stability and rule of law',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'The benefits for Dreamers would materialize quickly once enacted – e.g. immediate legal protection (no deportation) and work authorization, followed by a multi-year path to citizenship. Mandatory E-Verify could be implemented on a rolling basis; its impact on hiring could start within months of passage. This is relatively swift in policy terms (within a year, major outcomes would appear).',
      keyPoints: [
        'Immediate legal protection for Dreamers',
        'Work authorization starts quickly',
        'E-Verify implementation within months',
        'Major outcomes within a year',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Politically, an immigration grand bargain has been difficult historically – immigration reforms often stall due to partisan divides. However, this particular pairing has elements appealing to both sides (strong enforcement + compassionate legalization). With 72-76% public support for immigration solutions like legal status for Dreamers and broad backing for E-Verify (around 70%), the concept is popular. Opposition branding it "amnesty" or disputes over details could derail it.',
      keyPoints: [
        '72-76% public support for Dreamer citizenship',
        '~70% support for E-Verify',
        'Appeals to both parties',
        'Historical difficulty with immigration reform',
        'Opposition may brand as "amnesty"',
      ],
    },
  },

  overallRationale:
    'This policy rates as "very beneficial" at ~7.5/10. It delivers significant benefits in high-weight areas (Safety, Opportunity, Community), directly improving the lives of a vulnerable population while also strengthening law compliance. The economic gains are notable – legalization of immigrants like Dreamers could boost U.S. GDP by an estimated $121 billion per year and increase tax revenues by $31 billion annually. It resolves an injustice for Dreamers who have "earned" their place, and responds to labor needs (3.1 million unfilled jobs) in a controlled way.',

  sources: [
    'abic-immigration-rhetoric',
    'dignity-act-everify',
    'national-skills-coalition-perspectives',
    'i9-compliance-dignity-act',
  ],
};

export default immigrationGrandBargainMethodology;
