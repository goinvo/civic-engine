/**
 * V3 Needs-Based Methodology: National Right to Repair Act
 *
 * Policy: Guarantee consumers and independent repair shops the right to access parts, tools,
 * and information to repair devices (electronics, appliances, vehicles, farm equipment, etc.),
 * preventing manufacturers from monopolizing repairs. This aims to make repairs more affordable
 * and convenient and reduce waste.
 *
 * Overall Score: ~6.5-7/10 (Notably Helpful)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const rightToRepairMethodology: V3PolicyMethodology = {
  policyId: 'right-to-repair',
  policyName: 'National Right to Repair Act',
  description:
    'Guarantee consumers and independent repair shops the right to access parts, tools, and information to repair devices (electronics, appliances, vehicles, farm equipment, etc.), preventing manufacturers from monopolizing repairs. This aims to make repairs more affordable and convenient and reduce waste.',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'Slight positive. By enabling repair of important equipment, the policy helps people maintain their living standards. For instance, a functioning refrigerator, furnace, or car can be crucial to health and comfort, and this law would make it easier and cheaper to keep such essentials in working order. In agriculture, farmers able to fix their machinery can avoid crop losses and contribute to food security. These are indirect boosts to basic needs.',
    },
    safety: {
      score: 6,
      reasoning:
        'Slight positive. The Act increases economic security for individuals by reducing repair costs and unexpected expenses. Households save an average of $330 annually by repairing instead of replacing devices, which can be significant for low-income families\' financial stability. Owning the ability to fix one\'s car or phone when needed (rather than being at the mercy of expensive manufacturer services) also adds a sense of security and self-reliance. On a larger scale, if devices (including medical or safety equipment) can be repaired quickly, communities are more resilient.',
    },
    community: {
      score: 6,
      reasoning:
        'Moderate positive. Right-to-repair empowers local communities – independent repair shops can flourish, and people can help each other with repairs (think community repair clinics or DIY fix-it groups). It promotes fairness and social good: consumers feel less exploited by big corporations, which can increase public trust in the marketplace. Additionally, less e-waste means a cleaner environment, benefiting community health and pride.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'Strong positive. This policy stimulates competition and entrepreneurship in the repair market. Independent local repair businesses can flourish, offering consumers more choices and driving down costs. Freeing up the repair ecosystem encourages innovation (e.g. better third-party repair tools) and can create jobs. Consumers saving money on repairs have more disposable income for other opportunities as well. For farmers and others, being able to maintain equipment without exorbitant fees directly supports their economic opportunity (they avoid downtime and lost productivity) – 95% of surveyed farmers support Right to Repair, with 92% saying it would save them money.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. Being able to repair one\'s own belongings can be empowering and even fulfilling. It encourages a culture of creativity, learning, and sustainability – people take pride in fixing things. While this is not a mass-scale psychological impact, it does contribute to personal satisfaction for hobbyists, tinkerers, and anyone who prefers repairing to discarding.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. Nearly everyone owns products that eventually need repair – phones, cars, appliances, medical devices, etc. This law would benefit consumers nationwide. In fact, 84% of Americans support right-to-repair laws requiring manufacturers to provide repair access, indicating broad relevance. It also specifically aids groups like farmers (who need to fix farm equipment without dealership delays) and small business owners in the repair industry.',
      keyPoints: [
        'Nearly everyone owns repairable products',
        '84% of Americans support right-to-repair',
        'Benefits farmers, small business owners, all consumers',
        'Broad relevance across demographics',
      ],
    },
    essentialToSurvival: {
      score: 6,
      reasoning:
        'Low directly. While not as critical as food or healthcare, there are important indirect benefits. For example, farmers being able to quickly repair tractors can protect their crops (supporting the food supply). Individuals can fix essential household items (like refrigerators or cars) more easily instead of going without them. Overall, it improves quality of life and financial stability rather than immediately saving lives.',
      keyPoints: [
        'Indirect benefits to survival',
        'Farmers can protect crops by repairing equipment quickly',
        'Maintains essential household items',
        'Improves quality of life and financial stability',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Relatively quick. Right-to-repair provisions typically take effect within months of becoming law. Consumers would start seeing cheaper and more accessible repairs as soon as manufacturers comply (no long wait for impact, aside from a short implementation period). The benefits – cost savings, device uptime – would accrue in the short to medium term after enactment.',
      keyPoints: [
        'Provisions take effect within months',
        'Benefits begin as soon as manufacturers comply',
        'Short implementation period',
        'Cost savings accrue in short to medium term',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'Moderately high. There is considerable momentum. Numerous states have passed or are considering such laws, and a federal bill (the proposed FAIR Repair Act/REPAIR Act for vehicles) has gained attention. With broad public support across the political spectrum and even encouragement from the FTC, a national law is plausible. Manufacturers oppose it, which is a hurdle, but bipartisan concern for consumers (and for farmers in rural states) improves its chances.',
      keyPoints: [
        'Numerous states have passed similar laws',
        'Federal bills gaining attention',
        'FTC encouragement',
        'Broad bipartisan public support',
        'Manufacturer opposition is main hurdle',
      ],
    },
  },

  overallRationale:
    'Using the weighted categories – 0.25×6 + 0.30×6 + 0.15×6 + 0.20×8 + 0.10×6 – we get approximately 6.4 out of 10, which we can express as ~6.5 to 7/10. This indicates a notably helpful policy. It may not be life-critical, but it provides widespread economic and practical benefits, empowering consumers and supporting livelihoods in many sectors. The Right to Repair Act scores especially high on opportunity (economic and educational benefits) while also offering modest gains in other need areas.',

  sources: [
    'repair-association-legislation',
    'pirg-farmers-right-to-repair',
    'car-coalition-national-survey',
    'econone-right-to-repair-environmental',
  ],
};

export default rightToRepairMethodology;
