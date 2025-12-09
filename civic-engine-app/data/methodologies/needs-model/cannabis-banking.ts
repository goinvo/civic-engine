/**
 * V3 Needs-Based Methodology: Cannabis Banking (SAFER Act)
 *
 * Policy: The Secure and Fair Enforcement Regulation (SAFER) Banking Act would
 * allow banks and insurers to legally serve state-legal cannabis businesses,
 * addressing the current cash-only situation of dispensaries.
 *
 * Overall Score: ~6/10 (Slightly Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const cannabisBankingMethodology: V3PolicyMethodology = {
  policyId: 'cannabis-banking',
  policyName: 'Cannabis Banking (SAFER Act)',
  description:
    'The Secure and Fair Enforcement Regulation (SAFER) Banking Act would allow banks and insurers to legally serve state-legal cannabis businesses. This addresses the current cash-only situation of dispensaries, which is linked to robbery risk and lack of financial transparency. By giving banks a safe harbor, the policy aims to improve public safety, enable small cannabis businesses to access loans, and bring a gray-market industry into the regulated financial system.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning:
        'Neutral. This banking reform does not directly provide food, shelter, healthcare or other basic needs to the general population. Its effects on physiological needs are minimal or indirect. Any impact on healthcare is only via improved tax revenue that states could use for services, but there is no direct link.',
    },
    safety: {
      score: 8,
      reasoning:
        'High positive. SAFER Banking is framed largely as a public safety measure. Forcing cannabis retailers to hold large amounts of cash has made them targets for armed robbery. Allowing banking would take cash off the streets, reducing violent robberies at dispensaries and improving safety for employees and customers. State Attorneys General from 32 states (across party lines) have called this a "critical public safety issue," noting that the cash-only status quo "presents a considerable safety issue for the public."',
    },
    community: {
      score: 6,
      reasoning:
        'Slight positive. The policy could strengthen community well-being in areas with cannabis businesses. Reducing crime and integrating these businesses into the community\'s financial fabric can improve civic trust and legitimacy. It also enables civic participation in the form of transparent taxation – bringing an illicit-adjacent market into the open improves governance and community oversight. However, the effect is somewhat niche, benefiting communities in the 38 states (75% of Americans) where cannabis is legal in some form.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Moderate positive. This reform opens economic opportunities in the cannabis sector. If banks are protected, they can extend loans and financial services to small cannabis entrepreneurs, fostering business growth. More stable financing and payment options could create jobs (the legal cannabis industry already supports ~425,000 jobs and could grow further once unshackled from cash). States would also collect taxes more efficiently and transparently, potentially reinvesting in public services. That said, the opportunity boost is concentrated in one industry; it\'s not an economy-wide jobs program.',
    },
    selfActualization: {
      score: 5,
      reasoning:
        'Neutral. There is little direct connection to arts, culture, or personal fulfillment needs. One might argue that legitimizing a previously "shady" industry could reduce stigma and allow those passionate about cannabis commerce to pursue their goals openly (a form of personal fulfillment). However, such effects are indirect and minor.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 6,
      reasoning:
        'Moderate. The beneficiaries are a subset of the population: cannabis business owners, employees, and customers in states with legal cannabis (roughly 3 in 4 Americans live in such states). The general public benefits indirectly from safer communities (fewer armed robberies and associated violence) and from tax revenue gains, but the impact is not as universal as a national healthcare or education policy.',
      keyPoints: [
        '75% of Americans live in states with legal cannabis',
        'Direct benefits to cannabis business owners, employees, customers',
        'Indirect safety benefits for surrounding communities',
        'Tax revenue gains benefit broader population',
      ],
    },
    essentialToSurvival: {
      score: 4,
      reasoning:
        'Low. This policy is not critical to basic survival needs like food, water, or life-saving healthcare for the populace. It addresses safety (protecting human life and property in a specific context), which is important but not on the scale of a policy reducing nationwide crime or war. It will likely prevent some injuries or fatalities from armed robberies, but it\'s a targeted safety improvement rather than a broad survival necessity.',
      keyPoints: [
        'Not directly tied to food, water, shelter, or healthcare',
        'Addresses safety in specific retail context',
        'May prevent some robbery-related injuries/fatalities',
        'Targeted rather than universal survival impact',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Fast. The benefits would appear quickly once enacted. Banks and credit unions could almost immediately begin servicing cannabis businesses (given regulatory clarity), meaning dispensaries could deposit cash and reduce on-site cash holdings right away. That would instantly lower robbery risk. Access to credit and electronic payments would kick in promptly, helping businesses and improving tax compliance without a long lag. Time-to-benefit is on the order of months or even weeks for safety outcomes.',
      keyPoints: [
        'Banks can begin servicing immediately upon passage',
        'Cash reduction at dispensaries happens within weeks',
        'Robbery risk decreases rapidly',
        'Credit and payment access kicks in promptly',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderate-high. Politically, this reform has shown bipartisan support. The issue is unique in uniting banks, law enforcement, and cannabis advocates – a "coalition of necessity." The House passed earlier versions of SAFE Banking multiple times from 2019–2021 with large bipartisan majorities. In 2023, a re-tooled SAFER Act advanced out of the Senate Banking Committee on a bipartisan 14–9 vote. Dozens of state AGs (including many Republicans) have publicly urged Congress to pass it. Remaining hurdles are the historically tough stance in the Senate and some opposition linking it (incorrectly) to drug endorsement.',
      keyPoints: [
        'House passed multiple times with bipartisan majorities',
        'Senate Banking Committee advanced 14-9',
        '32 state AGs support (across party lines)',
        'Unites banks, law enforcement, cannabis advocates',
        'More feasible than most contentious federal reforms',
      ],
    },
  },

  overallRationale:
    'Cannabis Banking (SAFER Act) scores approximately 6/10, indicating it is Slightly Beneficial. This policy is a net positive, addressing a pressing safety concern and economic fairness issue in a growing industry. It scores well on Safety and provides moderate Opportunity, though it\'s narrow in population scope and not vital to basic survival needs. Its benefits outweigh any negligible harms (there\'s little to no downside except perhaps that it indirectly bolsters the cannabis trade – which some oppose morally, but the law itself has no effect on legalization status). With solid feasibility and quick payoff, the SAFER Banking Act lands as a beneficial policy, but only for a specific sector, giving it a modest overall impact score in the slightly beneficial range.',

  sources: [
    'csbs-safer-banking-act',
    'jdsupra-state-ags-cannabis-banking',
    'wiki-safe-banking-act',
  ],
};

export default cannabisBankingMethodology;
