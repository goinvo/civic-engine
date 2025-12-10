/**
 * V3 Needs-Based Methodology: "Buy American" Mandates
 *
 * Policy: "Buy American" mandates require that federally funded infrastructure
 * projects use U.S.-made materials (such as steel, iron, and manufactured components).
 *
 * Overall Score: ~6/10 (Slightly Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const buyAmericanMandatesMethodology: V3PolicyMethodology = {
  policyId: 'buy-american-mandates',
  policyName: '"Buy American" Mandates',
  description:
    '"Buy American" mandates require that federally funded infrastructure projects use U.S.-made materials (such as steel, iron, and manufactured components). Recent policy (e.g., the Build America, Buy America Act and Biden\'s executive orders) has tightened these rules – raising domestic content requirements from 55% to 75% by 2029. In practice, if a bridge or highway is built with federal dollars, the steel, cement, and other inputs must largely be sourced from American factories. The rationale is to boost domestic manufacturing, create jobs, and ensure high labor and environmental standards in production. About 75% of Americans favor buying American-made products in principle, and both parties have supported strengthening these requirements.',

  needCategories: {
    physiological: {
      score: 5.5,
      reasoning:
        'Neutral to slight positive. On the surface, procurement rules don\'t feed or shelter people. However, there are indirect physiological impacts: By potentially creating manufacturing jobs, more workers can afford basic necessities. Some argue that having domestic supply chains for critical goods (steel, energy equipment, etc.) is important for national resilience – in a crisis, relying on U.S.-made materials could be crucial to swiftly rebuilding infrastructure that delivers clean water, electricity, healthcare supplies, etc. These outcomes are speculative and long-term. In the short run, Buy American may slightly increase costs of infrastructure, which could mean fewer projects get built per dollar spent. On balance, these effects likely cancel out to roughly neutral, with a small positive tilt for the resilience argument.',
    },
    safety: {
      score: 5,
      reasoning:
        'Neutral. This policy is not explicitly about personal safety or security. There is a national security component often cited: ensuring domestic production of key materials (steel, microchips, etc.) could protect the country from supply disruptions in war or global crises. Depending on foreign steel or components could be risky for defense and infrastructure safety, and thus Buy American may improve stability/security. However, for everyday safety (crime, physical harm), this mandate doesn\'t change much. It neither significantly improves nor endangers public safety in the near term. Infrastructure built will be safe or unsafe based on engineering, not where the steel came from.',
    },
    community: {
      score: 7,
      reasoning:
        'Moderate positive. The mandates can have a revitalizing effect on local communities, especially those hurt by deindustrialization. When government spending is channeled to factories in American towns, it can breathe new life into those areas – more jobs mean more stable families and civic pride in "making things in America." Both rural and urban industrial communities stand to gain. There is a social cohesion element: the policy appeals to patriotic sentiment, giving communities a sense of contributing to national progress. However, there is a slight community downside: trade partners might retaliate with their own measures, which could hurt export-oriented communities (e.g., farmers or industries relying on overseas sales). Overall, the local benefits are tangible and visible.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Moderate positive. Job creation and economic opportunity are central goals of Buy American rules. By requiring domestic sourcing, demand for U.S. manufacturing and construction jobs should increase. A major infrastructure bill with Buy American provisions can lead U.S. steel mills to hire more workers and new factories to open. Companies interested in federal contracts may invest in U.S. production facilities, boosting industrial growth and worker training. That said, economists note trade-offs: mandating more expensive domestic goods can inflate project costs and slow down project timelines. With higher costs, the government might complete fewer projects overall. On net, we still lean positive on opportunity: the concentrated gains for American workers and industries are a primary intent, even if at a high cost per job.',
    },
    selfActualization: {
      score: 5,
      reasoning:
        'Neutral. This policy does not target arts, culture, or personal fulfillment. There might be a diffuse psychological benefit in terms of national pride and dignity of work – a factory worker might feel a sense of pride in contributing to national projects, and communities might celebrate American-made accomplishments. Such feelings can contribute to personal and collective esteem, somewhat related to higher Maslow needs. However, these effects are indirect and not guaranteed for everyone.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'High (but diffuse). In principle, all taxpayers and citizens are stakeholders, since this influences how federal money is spent. The direct beneficiaries are workers and businesses in industries like steel, cement, heavy equipment, and other manufacturing linked to infrastructure. This could be on the order of hundreds of thousands of workers. Indirectly, residents of industrial regions benefit from economic revival. The general public might gain from a stronger domestic industrial base. However, the effects on the overall population are somewhat diffuse – most people won\'t immediately feel a change in their daily lives from a procurement rule. Some groups could be negatively affected if projects are delayed or scaled back due to cost increases.',
      keyPoints: [
        '75% of Americans favor buying American-made products',
        'Direct beneficiaries: manufacturing workers, steel/cement/equipment industries',
        'Indirect benefits for industrial regions',
        'Effects diffuse across general population',
        'Some groups may face negative impacts (export industries, delayed projects)',
      ],
    },
    essentialToSurvival: {
      score: 4,
      reasoning:
        'Low. Using American-made materials in infrastructure doesn\'t directly fulfill immediate survival needs for the public. It\'s not providing food, healthcare, or immediate security. One could argue that increasing domestic production capacity is essential for national security, which in a war scenario could be tied to survival. However, under normal conditions, this policy is not life-or-death for citizens. It\'s an economic policy with long-term strategic implications.',
      keyPoints: [
        'Not directly tied to food, healthcare, or shelter',
        'National security argument is speculative/long-term',
        'Economic policy, not survival policy',
        'Strategic importance but not immediate necessity',
      ],
    },
    timeToOutcome: {
      score: 5,
      reasoning:
        'Moderate/gradual. The effects of Buy American mandates unfold over a medium to long term. There is no immediate dramatic change for most people; rather, as new federal projects are planned and bid out, contractors will adjust sourcing. This ramp-up is gradual – the content threshold is set to reach 75% by 2029. Job creation might start quickly in sectors that see increased orders (a steel mill getting a government contract could add shifts within months), but significant expansion (like building new factories) could take years. In the long run, one hopes to see a more robust domestic industrial base (perhaps measurable in 5–10 years).',
      keyPoints: [
        'Gradual ramp-up to 75% domestic content by 2029',
        'Some sectors see quick job gains',
        'Significant expansion takes years',
        'Long-term goal: robust domestic industrial base',
        'Not overnight transformation',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'High (with some challenges). Politically, "Buy American" is very feasible because it\'s popular across the spectrum and largely has been enacted through a mix of legislation and executive action already. There is a long-standing Buy American Act (since 1933) and it has been reinforced by recent bipartisan infrastructure laws. No major political faction is against the idea in principle. The challenges come in implementation: the federal government has to issue waivers in cases where domestic goods are not available or excessively costly. International trade agreements and diplomatic concerns put pressure on how far these mandates can go. Allies have complained and threatened counter-measures. Despite these caveats, the core policy is firmly in place and expanding.',
      keyPoints: [
        'Buy American Act exists since 1933',
        'Reinforced by recent bipartisan infrastructure laws',
        'Popular across political spectrum',
        'Implementation challenges: waivers, availability',
        'Trade agreement and diplomatic pressures',
        'Core policy firmly in place and expanding',
      ],
    },
  },

  overallRationale:
    'Buy American mandates score approximately 6/10, indicating they are Slightly Beneficial. The policy produces a mixed yet net-positive outcome. On one hand, it clearly aims to shore up domestic industry and create blue-collar jobs, which is a social and economic good. It also potentially improves environmental and labor standards by sourcing from U.S. producers that must follow stricter rules. These benefits justify putting the policy above neutral. However, the downsides and trade-offs (higher costs to taxpayers, potential delays in infrastructure, strained trade relations) keep it from scoring in the very high beneficial range. It helps certain groups substantially (manufacturing workers, domestic producers) and aligns with long-term strategic goals, but with efficiency costs that dilute the net effect. In conclusion, Buy American mandates are a well-intentioned policy that scores as a small net positive – beneficial for the economy and communities, but not a game-changer on the order of policies that directly address more fundamental human needs.',

  sources: [
    'defense-news-buy-american',
    'ntu-buy-american-policy',
    'cato-steeled-protectionism',
    'us-chamber-buy-american',
  ],
};

export default buyAmericanMandatesMethodology;
