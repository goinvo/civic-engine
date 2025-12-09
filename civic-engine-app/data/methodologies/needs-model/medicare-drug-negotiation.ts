/**
 * V3 Needs-Based Methodology: Universal Drug Price Negotiation
 *
 * Policy: Allow the government to negotiate prescription drug prices across
 * all drugs and payers, building on the Medicare negotiation provisions in
 * the Inflation Reduction Act.
 *
 * Overall Score: ~9/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const medicareDrugNegotiationMethodology: V3PolicyMethodology = {
  policyId: 'medicare-drug-negotiation',
  policyName: 'Universal Drug Price Negotiation',
  description:
    'Allow the government to negotiate prescription drug prices, building on Medicare negotiation provisions. High drug costs currently force nearly 30% of Americans to skip or ration prescriptions due to price, leading to worse health outcomes. Negotiating lower drug prices would markedly improve access to life-saving treatments. Public support is overwhelming at approximately 85% across party lines.',

  needCategories: {
    physiological: {
      score: 9,
      reasoning:
        'This policy directly advances health by making essential medications more affordable. High drug costs currently force nearly 30% of Americans to skip or ration prescriptions due to price, leading to worse health outcomes and even projected loss of life (an estimated 1.1 million Medicare patients could die in the next decade from inability to afford medications). Negotiating lower drug prices would markedly improve access to life-saving treatments, addressing basic health needs.',
    },
    safety: {
      score: 8,
      reasoning:
        'By reducing financial strain and the risk of medical bankruptcy, the policy provides greater economic security and stability for families. It acts as a safety net against catastrophic healthcare costs, thus indirectly improving personal and financial safety. When people can afford medications, they are less likely to face health emergencies, creating a more secure society.',
    },
    community: {
      score: 7,
      reasoning:
        'Lower drug prices can strengthen communities by reducing health disparities. Vulnerable groups (uninsured, low-income, those on multiple meds) are most burdened by high costs. Making drugs affordable for all fosters social equity and trust in the healthcare system, though the policy doesn\'t directly target social belonging beyond enabling citizens to participate more fully in community life when they aren\'t debilitated by illness or debt.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'Health is a prerequisite for economic and educational opportunity. Ensuring affordable medications means individuals miss fewer work or school days and suffer fewer long-term health setbacks, allowing them to pursue employment and education more effectively. Families freed from exorbitant drug bills have more disposable income to invest in businesses, education, or other opportunities. Better health outcomes translate to a more productive workforce and economy.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'When basic health needs are met, individuals can focus on higher goals. By alleviating the worry about affording medicine, the policy enables people to lead fuller lives, engage in creative pursuits, and realize personal aspirations. While the effect here is indirect, good health underpins one\'s ability to achieve personal fulfillment.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. Prescription drugs touch most American lives – about 6 in 10 U.S. adults take at least one prescription medication (and 25% take four or more). Negotiating lower prices would benefit a vast portion of the population, especially seniors and those with chronic conditions, but also younger insured and uninsured individuals facing high costs. Tens of millions stand to gain either directly through lower out-of-pocket costs or indirectly via insurance savings.',
      keyPoints: [
        '60% of U.S. adults take at least one prescription medication',
        '25% take four or more medications',
        'Seniors and chronic condition patients benefit most',
        'Insurance savings benefit broader population indirectly',
        'Nearly 30% of Americans skip/ration meds due to cost',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'Very high. Access to medications is critical to survival and basic health. For many conditions (insulin for diabetes, heart medications, cancer drugs), affordable access can be a matter of life or death. The current situation – where cost prevents people from taking prescribed meds and causes preventable mortality – underscores that this policy addresses a fundamental human need (healthcare), nearly on par with food or shelter in importance.',
      keyPoints: [
        'Insulin, heart meds, cancer drugs are life-or-death',
        '1.1 million Medicare patients could die in next decade from inability to afford meds',
        'Cost-driven non-adherence causes preventable mortality',
        'Healthcare is fundamental human need',
        'Nearly on par with food/shelter in importance',
      ],
    },
    timeToOutcome: {
      score: 7,
      reasoning:
        'Moderate/fast. Once implemented, the benefits of price negotiation would materialize relatively quickly (though not overnight). Medicare\'s newly negotiated drug prices (authorized by the 2022 Inflation Reduction Act) are set to take effect in 2026, with an expected 22% price reduction saving $6 billion in the first year for just 10 drugs and $100 billion over 10 years. Within a few years of policy adoption, patients and payers see tangible savings. Some benefits (e.g. lower insulin costs) could be felt even sooner if interim measures or price caps are applied.',
      keyPoints: [
        'Medicare negotiated prices take effect 2026',
        '22% price reduction expected on initial drugs',
        '$6 billion savings in first year (10 drugs)',
        '$100 billion savings over 10 years',
        'Short-to-medium term benefits (1-3 years)',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderately high. Public support is overwhelming (around 85% of voters) for allowing the government to negotiate drug prices, spanning across party lines (including strong majorities of Democrats, independents, and Republicans). A version of this policy has partially passed (Medicare negotiation in the IRA), showing it is achievable. However, full "universal" drug price negotiation (across all drugs or for all payers) would face resistance from the pharmaceutical industry and lobbying groups. Practical implementation would require regulatory infrastructure to conduct negotiations and enforce price limits.',
      keyPoints: [
        '85% public support across party lines',
        'Medicare negotiation already passed (IRA 2022)',
        'Pharmaceutical industry strongly opposes expansion',
        'Regulatory infrastructure needed',
        'Realistically attainable with sustained political will',
      ],
    },
  },

  overallRationale:
    'Universal Drug Price Negotiation scores approximately 9/10, indicating it is Very Beneficial. Given its life-saving potential and broad reach, this policy powerfully addresses core physiological and safety needs by making healthcare more accessible and affordable. The large affected population (60%+ of adults take prescription drugs) and high criticality to well-being drive the score upward. While not a perfect 10 (due to implementation hurdles and the fact that it doesn\'t directly improve all need areas equally), it is one of the most impactful policies for public welfare. Negotiating drug prices would save lives, reduce financial strain on households, and promote equity, with a strongly positive effect on society.',

  sources: [
    'kff-drug-prices-opinion',
    'aha-drug-prices-shortages',
    'cms-drug-negotiation-savings',
  ],
};

export default medicareDrugNegotiationMethodology;
