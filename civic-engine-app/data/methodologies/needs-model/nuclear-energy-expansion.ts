/**
 * V3 Needs-Based Methodology: Expand Nuclear Energy (ADVANCE Act)
 *
 * Policy: Support and expand nuclear energy production in the U.S., including
 * streamlining regulations and supporting advanced reactor technologies, as
 * embodied in the ADVANCE Act.
 *
 * Overall Score: ~7/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const nuclearEnergyExpansionMethodology: V3PolicyMethodology = {
  policyId: 'expand-nuclear-energy',
  policyName: 'Expand Nuclear Energy (ADVANCE Act)',
  description:
    'Support and expand nuclear energy production in the U.S., including streamlining regulations and supporting advanced reactor technologies, as embodied in the ADVANCE Act. This policy aims to ensure reliable, low-carbon electricity to meet growing energy demands while addressing climate change.',

  needCategories: {
    physiological: {
      score: 7.5,
      reasoning:
        'Moderate-high positive. Reliable energy is essential for heating, cooling, cooking, and powering medical equipment – all tied to physiological well-being. Nuclear provides baseload power that supports these needs consistently. Additionally, as a low-carbon source, it helps mitigate climate change, which threatens physiological needs (extreme weather, food production impacts). Cleaner air from reduced fossil fuel use also benefits health.',
    },
    safety: {
      score: 7,
      reasoning:
        'Moderate-high positive. Energy security is a national safety concern. Nuclear power reduces dependence on imported fossil fuels and provides stable supply even during geopolitical disruptions. Modern nuclear has strong safety records, though legacy concerns (accidents, waste) persist. Climate change mitigation also reduces long-term safety risks from environmental catastrophes. Net effect is positive for safety broadly defined.',
    },
    community: {
      score: 6,
      reasoning:
        'Moderate positive. Nuclear plants create jobs and economic activity in host communities. They provide stable, well-paying employment for decades. However, siting nuclear plants can be contentious – some communities oppose them due to safety concerns or NIMBYism. The policy may strengthen some communities economically while facing resistance in others. Overall modest positive.',
    },
    opportunity: {
      score: 7,
      reasoning:
        'Moderate-high positive. Expanding nuclear creates jobs in construction, operation, and the broader nuclear supply chain. Advanced reactor development supports American innovation and competitiveness in global energy markets. Reliable, affordable electricity is foundational for economic opportunity across all sectors. If nuclear helps keep energy costs stable, businesses and households can thrive.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate positive. Reliable electricity enables education, connectivity, and personal pursuits that require power (from studying at night to running a home business). For those who value environmental sustainability, clean energy sources like nuclear can align with their values and sense of contributing to a better future. The effect is positive but indirect.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'High. Electricity touches virtually everyone. Nuclear currently provides about 20% of U.S. electricity, and expansion would affect millions of households and businesses that rely on the grid. The climate benefits of low-carbon energy also affect the entire population and future generations. Job creation and economic effects are more localized but still significant.',
      keyPoints: [
        'Nuclear provides ~20% of U.S. electricity',
        'Affects millions of households and businesses',
        'Climate benefits for entire population',
        'Job creation concentrated near plants',
      ],
    },
    essentialToSurvival: {
      score: 7,
      reasoning:
        'Moderate-high. Electricity is essential in modern society – for heating/cooling, food preservation, medical devices, and communication. While nuclear is one of many sources, its reliability and low-carbon profile make it important for long-term energy security and climate mitigation. Energy is not directly a survival need like food or water, but modern life depends heavily on it.',
      keyPoints: [
        'Electricity essential for modern survival',
        'Heating, cooling, food preservation, medical devices',
        'Reliability important for energy security',
        'Climate mitigation protects long-term survival',
      ],
    },
    timeToOutcome: {
      score: 4,
      reasoning:
        'Slow. Building new nuclear plants takes many years – often a decade or more from planning to operation. Even with streamlined regulations (ADVANCE Act goal), significant lead times remain. Advanced reactors may be faster but are still in development. The climate and energy security benefits will materialize over the long term. This is a patient investment in future energy infrastructure.',
      keyPoints: [
        'New plants take 10+ years to build',
        'Streamlined regulations help but don\'t eliminate delays',
        'Advanced reactors still in development',
        'Long-term investment in infrastructure',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'High. The ADVANCE Act passed the Senate 88-2, demonstrating overwhelming bipartisan support. Public opinion on nuclear has shifted positive – 59-61% now favor it, up from historical lows. The policy aligns with both climate goals (left priority) and energy independence (right priority). Regulatory streamlining is achievable. The main challenges are financing (nuclear is capital-intensive) and lingering public concerns about waste and safety.',
      keyPoints: [
        'ADVANCE Act passed Senate 88-2',
        '59-61% public support',
        'Bipartisan appeal (climate + energy independence)',
        'Financing and waste concerns remain',
        'Regulatory streamlining achievable',
      ],
    },
  },

  overallRationale:
    'Expanding nuclear energy scores approximately 7/10, indicating it is Very Beneficial. The policy addresses energy security (safety), supports physiological needs through reliable power and climate mitigation, and creates economic opportunities. It enjoys rare bipartisan consensus, as evidenced by the ADVANCE Act\'s near-unanimous Senate passage. The main limitations are the long timeframe for new capacity and ongoing concerns about nuclear waste and costs. As a clean, reliable energy source, nuclear is a valuable part of the energy mix for meeting human needs sustainably.',

  sources: [
    'eia-nuclear-energy-statistics',
    'nei-nuclear-benefits',
    'congress-advance-act',
  ],
};

export default nuclearEnergyExpansionMethodology;
