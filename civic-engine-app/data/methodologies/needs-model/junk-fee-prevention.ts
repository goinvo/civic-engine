/**
 * V3 Needs-Based Methodology: Junk Fee Prevention Act
 *
 * Policy: Ban or limit "junk fees" – hidden, excessive, or unexpected fees charged to consumers
 * in sectors like banking, airlines, ticketing, hotels, and telecom. Require upfront transparent
 * pricing and eliminate certain exploitative charges.
 *
 * Overall Score: ~7.0/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const junkFeePreventionMethodology: V3PolicyMethodology = {
  policyId: 'junk-fee-prevention',
  policyName: 'Junk Fee Prevention Act',
  description:
    'A proposed act to ban or limit "junk fees" – hidden, excessive, or unexpected fees charged to consumers in sectors like banking, airlines, ticketing, hotels, and telecom. It would require upfront transparent pricing and eliminate certain exploitative charges (e.g. concert ticket service fees, airline family seating fees, early termination fees for cable/phone, resort fees). The goal is to save consumers money, improve fairness, and increase market competition.',

  needCategories: {
    physiological: {
      score: 6.5,
      reasoning:
        'Moderate positive. By saving consumers money (potentially tens of billions collectively), the policy frees up income that households can spend on basic needs. A family that avoids $100 in ticket fees or $40 in bank fees can use that money for groceries or utilities. Especially for lower-income families, reducing such fees can meaningfully ease the budget for food, healthcare, and housing costs.',
    },
    safety: {
      score: 7.5,
      reasoning:
        'High positive. In this context, safety includes financial security and protection from exploitation. The Junk Fee Prevention Act protects consumers from predatory or surprise charges, enhancing economic safety and stability. It acts as a guardrail against unfair practices. With families less likely to be blindsided by fees (like unexpected bank overdrafts or cancellation penalties), they enjoy greater financial stability and peace of mind.',
    },
    community: {
      score: 6,
      reasoning:
        'Slight positive. Transparent pricing and fairness can increase trust in markets and institutions, which has a mild community benefit. When people feel they are treated fairly by companies (not nickel-and-dimed with hidden fees), it can reduce societal frustration and improve the general social mood. However, this is not a direct community or civic participation policy, so the effect is limited.',
    },
    opportunity: {
      score: 6.5,
      reasoning:
        'Moderate positive. When people keep more of their money, they have greater opportunity to invest in their future. Reduced financial strain can improve access to education (affording school fees or internet bills), employment (having funds to relocate or retrain without penalty fees), or starting a small business (not being locked into a contract with costly exit fees). By fostering fair competition, the policy may lead to better services and innovation.',
    },
    selfActualization: {
      score: 5.5,
      reasoning:
        'Slight positive. Having more disposable income and fewer financial frustrations can allow individuals to pursue personal fulfillment. Money saved from junk fees might be spent on family activities, hobbies, or cultural experiences. Removing stress from surprise fees can improve overall life satisfaction. Still, the impact on self-actualization is indirect and small compared to core economic benefits.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. This policy would benefit virtually all consumers. Junk fees are widespread – Americans encounter hidden fees in everyday expenses (bank accounts, flights, event tickets, hotel bookings, etc.). Excessive ticketing fees can add 20-50% to ticket costs, airlines charge families extra to sit together, banks charged billions in overdraft and late fees yearly, and hotels impose surprise resort fees on a third of guests. Millions would save money on routine transactions.',
      keyPoints: [
        'Benefits virtually all consumers',
        'Junk fees widespread across industries',
        'Ticketing fees add 20-50% to costs',
        'Banks charge billions in overdraft fees yearly',
        'All income levels affected',
      ],
    },
    essentialToSurvival: {
      score: 6,
      reasoning:
        'Moderate. While not directly providing food or shelter, eliminating junk fees improves families\' financial security, leaving them with more disposable income for essential needs. For low-income households, money not lost to predatory fees can go toward groceries, rent, or medical bills. It prevents unwarranted loss of resources rather than providing them directly.',
      keyPoints: [
        'Improves financial security',
        'Frees income for essential needs',
        'Especially helps low-income households',
        'One step removed from core survival needs',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Fast. The benefits would be realized quickly after implementation. Companies would be required to remove or disclose fees likely within one or two billing cycles. Consumers could see immediate relief on their bills – e.g. credit card late fees dropping dramatically in a proposed rule (from ~$30 to $8, saving up to $9 billion a year). Other fee bans would translate to instant savings whenever people make those purchases.',
      keyPoints: [
        'Benefits within 1-2 billing cycles',
        'Credit card late fee rule could save $9 billion/year',
        'Instant savings on purchases',
        'Near-immediate economic relief',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'Moderate. Public support is very high (87%), and the Biden Administration made junk fee elimination a priority. Some measures are already underway via agency rules (CFPB, DOT, FTC). However, passing comprehensive legislation faces challenges: industries that profit from these fees (banks, airlines, entertainment, hospitality) may lobby against it. There is a reasonable chance of partial adoption through a mix of legislation and regulatory action.',
      keyPoints: [
        '87% public support',
        'Some measures already underway',
        'Agency rules from CFPB, DOT, FTC',
        'Industry lobbying is main obstacle',
        'Partial adoption likely',
      ],
    },
  },

  overallRationale:
    'Weighted across needs, the Junk Fee Prevention Act scores ~7.0/10, indicating a solidly beneficial impact. This policy\'s strength lies in financial safety and economic relief – it directly protects people\'s money and thus supports stability and basic needs. The benefits reach a wide population quickly, with virtually no harm (aside from reduced corporate profits for fee-charging businesses). Cracking down on junk fees would significantly help consumers (billions saved, less stress), making it a very positive policy change for economic well-being and fairness in the marketplace.',

  sources: [
    'whitehouse-junk-fees-factsheet',
    'cfpb-late-fee-rule',
    'dot-airline-fee-rules',
    'ftc-junk-fees-enforcement',
  ],
};

export default junkFeePreventionMethodology;
