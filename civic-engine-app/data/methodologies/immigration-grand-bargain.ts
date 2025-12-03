import { PolicyMethodology } from './index';

export const immigrationGrandBargain: PolicyMethodology = {
  policyId: 'immigration-grand-bargain',
  policyName: 'Immigration Grand Bargain',
  description: 'A comprehensive deal pairing mandatory E-Verify for all employers (to stop illegal hiring) with a path to citizenship for "Dreamers". Federal policy in justice/immigration with ~76% public support.',
  overallRationale: 'The Immigration Grand Bargain scores well on scale match (Ostrom: 0.8) as immigration is inherently federal, and on inclusivity (Acemoglu: 0.8) by bringing Dreamers into full participation. It achieves high Buchanan consent (0.7) through its balanced trade-off design. The policy intentionally pairs priorities from both parties to create a stable, politically feasible reform that addresses both enforcement and humanitarian concerns.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'This policy is a mix. E-Verify is a centralized database that all employers must use – a government-run system to verify work authorization. This is a fairly significant regulatory intervention in the labor market, requiring businesses to check with a federal database for every hire. On the other hand, the Dreamer legalization component leverages individual decision-making: it allows a large population to formally participate in the economy and make their own choices about work and life, rather than operating in a shadow economy. The overall effect is somewhat mixed: E-Verify centralizes enforcement, while legalization decentralizes labor market participation by integrating undocumented workers into the formal economy.',
      keyPoints: [
        'E-Verify is centralized federal database for employers',
        'Significant regulatory intervention in labor market',
        'Dreamer legalization enables individual decision-making',
        'Integration into formal economy is decentralizing',
        'Mixed: centralized enforcement with decentralized participation',
      ],
      sources: [
        'E-Verify system analysis',
        'Labor market integration research',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'Immigration and citizenship are inherently federal matters (under the U.S. Constitution, Congress controls naturalization and immigration law). A federal policy is the appropriate scale for this issue – states cannot grant citizenship or uniformly enforce immigration law. E-Verify also benefits from being national: a patchwork of state systems would create confusion and loopholes, so a federal mandate matches the national scope of the labor market and immigration. The policy appropriately places this issue at the federal level where it belongs, avoiding the chaos of inconsistent state approaches.',
      keyPoints: [
        'Immigration inherently federal under Constitution',
        'States cannot grant citizenship or enforce uniformly',
        'Federal E-Verify avoids patchwork confusion',
        'National scope matches national labor market',
        'Appropriate scale for immigration policy',
      ],
      sources: [
        'Constitutional immigration authority',
        'Federal vs state immigration enforcement',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: 'The "grand bargain" is a relatively transparent trade-off: enforcement (E-Verify) in exchange for legalization (Dreamers). Each component is straightforward. E-Verify: employers must run new hires through a database; if the hire is unauthorized, they cannot legally employ them. Dreamer path: if you meet certain criteria (came to U.S. as a child, lived here X years, no serious crimes, etc.), you can apply for legal status and eventually citizenship. The rules are clear, and voters can understand what they are getting. The bargain\'s clarity is its political strength – both sides know the deal.',
      keyPoints: [
        'Transparent trade-off: enforcement for legalization',
        'E-Verify rules are clear and straightforward',
        'Dreamer criteria are defined and understandable',
        'Voters can understand what each side gets',
        'Political clarity is the bargain\'s strength',
      ],
      sources: [
        'E-Verify employer requirements',
        'DACA and Dreamer criteria',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: 'There are capture risks on both sides. Business interests (especially agriculture, hospitality, construction) that rely on undocumented labor may try to water down E-Verify or carve out exemptions. On the other side, immigration restrictionist groups may try to add conditions that make the Dreamer path nearly impossible. The policy\'s design as a "bargain" attempts to balance these interests, but implementation could still be gamed. Enforcement of E-Verify depends on government follow-through; powerful sectors might lobby for lax enforcement. The risk is moderate – the broad public support helps, but special interests are active in immigration policy.',
      keyPoints: [
        'Capture risks on both sides of bargain',
        'Business interests may water down E-Verify',
        'Restrictionists may add impossible conditions',
        'Bargain design attempts to balance interests',
        'Moderate risk due to active special interests',
      ],
      sources: [
        'Immigration policy lobbying',
        'E-Verify implementation challenges',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Immigration policy affects the economy but is not a macroeconomic stabilizer in the Keynesian sense. It doesn\'t automatically inject spending in recessions or cool spending in booms. The long-term economic effects of legalizing Dreamers (more tax revenue, higher productivity) and E-Verify (potentially tighter labor supply in some sectors) are complex but not counter-cyclical by design. The policy is economically significant but neutral on stabilization.',
      keyPoints: [
        'Immigration affects economy but not as stabilizer',
        'No automatic counter-cyclical mechanism',
        'Dreamers: more tax revenue, higher productivity',
        'E-Verify: potentially tighter labor supply',
        'Economically significant but stability-neutral',
      ],
      sources: [
        'Immigration and economic growth',
        'Labor market effects of immigration policy',
      ],
    },
    pettit: {
      score: 0.6,
      reasoning: 'For Dreamers, this policy is highly liberating – it removes the constant fear of deportation and dependence on discretionary policies (like DACA renewals). They would gain secure legal status, ending their vulnerability to arbitrary state action. That is a significant reduction in domination for ~2 million people. For other undocumented workers, E-Verify makes life harder (it\'s specifically designed to cut off employment opportunities), which could be seen as increasing their precariousness unless paired with other pathways. The net effect is positive for those legalized but neutral or negative for those not covered, making the overall score moderate.',
      keyPoints: [
        'Highly liberating for Dreamers',
        'Removes fear of deportation and arbitrary action',
        'Secure legal status for ~2 million people',
        'E-Verify makes life harder for non-Dreamers',
        'Net positive for legalized, neutral/negative for others',
      ],
      sources: [
        'DACA and legal status security',
        'Undocumented worker vulnerability',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'The policy somewhat improves "exit" for Dreamers: they can exit the shadow economy and enter the formal one, with all its protections. They gain voice as well – as citizens or legal residents, they can vote and advocate without fear. For undocumented workers who don\'t qualify, E-Verify restricts their options (no exit into legal work). The policy also amplifies voice in that it responds to decades of advocacy by Dreamer activists – their voice has been a major factor in shaping this policy. Mixed effects overall: more exit/voice for some, less for others.',
      keyPoints: [
        'Dreamers can exit shadow economy',
        'Gain voice through citizenship and voting',
        'E-Verify restricts options for non-qualifying workers',
        'Policy responds to Dreamer activism',
        'Mixed: more exit/voice for some, less for others',
      ],
      sources: [
        'Dreamer advocacy movement',
        'Economic integration and voice',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: 'This policy is explicitly designed as a bargain – a mutual exchange where both sides give and get something. That\'s the essence of Buchanan\'s constitutional exchange: parties agree because each gains from the deal. Polls show ~75%+ support for both E-Verify and Dreamer citizenship separately, and pairing them acknowledges that neither side gets 100% of what they want but both get substantial benefits. The "losers" are primarily those who want open borders (they don\'t get it) or those who want mass deportation (they don\'t get it either) – but these are minority positions. The broad middle consents to the compromise.',
      keyPoints: [
        'Explicitly designed as mutual exchange',
        'Both sides give and get something',
        '~75%+ support for each component separately',
        'Neither side gets 100% but both gain substantially',
        'Broad middle consents to the compromise',
      ],
      sources: [
        'Polling on immigration compromise',
        'Bipartisan support for E-Verify and Dreamers',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'The Dreamer legalization component has a Polanyian element: it says that people who have grown up here, worked here, and are part of communities should not be treated purely as illegal labor units to be expelled. It re-embeds these individuals in society with legal protections. E-Verify, on the other hand, strengthens market discipline on labor (if you\'re unauthorized, you can\'t work legally). The net effect is somewhat protective for those legalized (society claims them as members) but reinforces market boundaries for others. The policy partially de-commodifies labor for Dreamers by giving them rights and status beyond their economic utility.',
      keyPoints: [
        'Dreamers re-embedded in society with protections',
        'Not treated purely as labor units to expel',
        'E-Verify strengthens market discipline on labor',
        'Protective for legalized, market boundaries for others',
        'Partially de-commodifies labor for Dreamers',
      ],
      sources: [
        'Labor rights and legal status',
        'Immigration and social integration',
      ],
    },
    rawls: {
      score: 0.7,
      reasoning: 'Dreamers are among the most vulnerable people in American society – they grew up here but lack legal status, often unable to work legally, ineligible for most benefits, and at risk of deportation. Legalizing them significantly improves the position of this worst-off group. They would gain access to education opportunities, legal employment, and eventually voting rights. E-Verify\'s effect on other undocumented workers is more ambiguous – it may push them further into the shadows, worsening their position. But the net direction is positive for the specific worst-off group (Dreamers) targeted by this policy.',
      keyPoints: [
        'Dreamers among most vulnerable in society',
        'Legalization improves worst-off group significantly',
        'Gain access to education, employment, voting',
        'E-Verify may worsen others\' position',
        'Net positive for targeted worst-off group',
      ],
      sources: [
        'Dreamer socioeconomic status',
        'Immigration and vulnerability',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'This policy does not involve taxation of land or economic rents. It\'s about immigration enforcement and legal status, not tax policy. E-Verify doesn\'t tax labor; it restricts access to the labor market for unauthorized workers. Dreamer citizenship doesn\'t capture rents – it simply grants legal status. The policy is orthogonal to Georgist concerns about taxing unearned income. It neither shifts taxes off labor nor captures land value. Neutral on this dimension.',
      keyPoints: [
        'Does not involve taxation of land or rents',
        'About immigration enforcement and status',
        'E-Verify restricts labor market access, not taxation',
        'Dreamer citizenship grants status, not rent capture',
        'Orthogonal to Georgist concerns',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Legalizing Dreamers is highly inclusive: it brings ~2 million people who have been excluded from full economic and political participation into the system. They can start businesses, get professional licenses, attend universities without barriers, and eventually vote. This expands the pool of participants in the economy and democracy. E-Verify, while restrictive for unauthorized workers, arguably makes the system more rule-based and transparent (everyone knows the rules for legal employment). The overall effect is to formalize and include a large population that has been marginalized, which is consistent with building inclusive institutions.',
      keyPoints: [
        'Legalizing Dreamers is highly inclusive',
        'Brings ~2 million into full participation',
        'Can start businesses, get licenses, vote',
        'E-Verify makes system rule-based and transparent',
        'Formalizes and includes marginalized population',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Economic integration of immigrants',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'Walzer\'s own work on immigration is relevant here. He argues that members of a society (those who live among us, work alongside us, share our fate) deserve membership – to deny them is to create a kind of tyranny of citizens over non-citizen residents. The Dreamer path to citizenship embodies this principle: these are people who have lived in the U.S. most of their lives; they belong here by any social criterion even if not legal. Granting them citizenship is using the right criteria (membership in community, contribution, need) rather than a purely legalistic criterion that ignores social reality. E-Verify uses a legalistic market criterion (authorized vs unauthorized labor) which is less sphere-appropriate but is balanced by the inclusive citizenship component.',
      keyPoints: [
        'Walzer: society members deserve membership',
        'Denial creates tyranny over non-citizen residents',
        'Dreamers belong by social criterion of community',
        'Citizenship uses right criteria: membership, contribution, need',
        'E-Verify legalistic but balanced by citizenship',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Membership and community',
      ],
    },
  },
  modifiers: [
    {
      id: 'expanded-legalization',
      name: 'Expanded Legalization',
      description: 'Include parents of Dreamers in path to legal status',
      factorChanges: { rawls: 0.1, buchanan: -0.1 },
    },
    {
      id: 'agricultural-exemption',
      name: 'Agricultural Worker Exemption',
      description: 'Create guest worker program to address farm labor concerns',
      factorChanges: { olson: -0.1, keynes: 0.05 },
    },
  ],
};
