/**
 * V3 Needs-Based Methodology: Overturn Citizens United
 *
 * Policy: Enact a Constitutional Amendment to overturn Citizens United v. FEC,
 * clarifying that constitutional rights apply only to natural persons (not corporations)
 * and that money spent on elections is not protected speech.
 *
 * Overall Score: ~6.7/10 (Slightly Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const overturnCitizensUnitedMethodology: V3PolicyMethodology = {
  policyId: 'overturn-citizens-united',
  policyName: 'Overturn Citizens United (End Corporate Personhood)',
  description:
    'Enact a Constitutional Amendment to overturn Citizens United v. FEC and related rulings, clarifying that constitutional rights apply only to natural persons (not corporations) and that money spent on elections is not protected speech. This would empower Congress and states to impose limits on political spending by corporations, unions, and super PACs. The goal is to reduce big money influence in politics and restore democratic "one person, one vote" principles. Average public support is approximately 72%.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning:
        'Neutral. There is no direct impact on basic physical needs. Overturning Citizens United would not immediately feed anyone or provide housing or healthcare. Indirectly, if successful, it might lead to lawmakers feeling freer to enact popular social programs (since they\'re less beholden to wealthy donors or corporate lobbies). For instance, policies like expanding healthcare or food assistance could have a better chance in a system with less corporate influence. However, those outcomes are speculative and downstream.',
    },
    safety: {
      score: 6,
      reasoning:
        'Slight positive (long-term). In the short run, campaign finance reform doesn\'t change policing, military, or emergency services. However, with reduced corporate influence, government could more effectively regulate products and industries for public safety (e.g. environmental protections, gun safety laws, consumer protections) without as much pushback from well-funded lobbies. A democracy less dominated by money might address issues like climate change or public health more assertively. Reducing political corruption also enhances national stability.',
    },
    community: {
      score: 10,
      reasoning:
        'Very strong positive. This is the core benefit of the policy: restoring democratic equality and community trust. Currently, 79% of Americans believe that unlimited corporate and big-donor spending "undermines democracy" and reduces trust in government. By overturning Citizens United, citizens feel their voices carry more weight relative to corporations, which can rejuvenate civic participation and faith in the system. It affirms that "democracy should be owned by voters, not bought by the wealthy few." Higher political engagement follows when elections aren\'t dominated by dark money.',
    },
    opportunity: {
      score: 7,
      reasoning:
        'Moderate positive. A government more responsive to voters rather than donors is more likely to enact policies that promote broad economic opportunity (accessible education, fair wages, small business support) rather than policies skewed toward special interests. By ending the outsized influence of money, barriers that favor established wealthy interests might be lowered, allowing newcomers (candidates without big donors, grassroots movements) a fair shot. This could yield an economy with rules that better support the many.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. In a healthier democracy, individuals may feel more empowered and engaged. Knowing that one\'s vote and voice matter (not drowned out by billions in ads) can encourage personal growth through civic action, activism, and volunteering. People might be more inclined to express themselves and pursue community leadership when the system is fair. Reducing the cynicism that "my voice doesn\'t count" can improve individual well-being.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 10,
      reasoning:
        'The entire electorate (all voters) and indeed all citizens are affected by the rules of democracy. This amendment wouldn\'t target a specific demographic; rather it aims to benefit everyone by ensuring political power isn\'t skewed by wealth. 100% of Americans have a stake here, since it concerns who has a voice in government. Wealthy donors would lose disproportionate influence while ordinary voters gain relative influence.',
      keyPoints: [
        'Entire electorate affected',
        '100% of Americans have stake in democratic rules',
        'Aims to benefit everyone equally',
        'Political power not skewed by wealth',
        'Ordinary voters gain relative influence',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Low. This reform does not directly provide food, shelter, safety or healthcare. Its impact is on the political process. One could argue a more representative government will pass policies that do address survival needs of the people, but that\'s an indirect, long-term effect. On its face, this is about rights and fairness, not life-or-death necessities.',
      keyPoints: [
        'No direct impact on survival needs',
        'Affects political process not basic needs',
        'Indirect path to better survival policies',
        'About rights and fairness',
        'Long-term downstream effects possible',
      ],
    },
    timeToOutcome: {
      score: 3,
      reasoning:
        'Long. Passing a constitutional amendment is a lengthy process requiring supermajorities in Congress and ratification by 3/4 of state legislatures. Even in the best case, it could take years to be adopted. After adoption, changes in campaign finance laws and political culture would unfold over subsequent election cycles. While the impact could ultimately be transformative, it is not immediate.',
      keyPoints: [
        'Constitutional amendment process is lengthy',
        'Requires supermajorities in Congress',
        '38 states must ratify',
        'Could take many years to adopt',
        'Political culture shifts over election cycles',
      ],
    },
    feasibility: {
      score: 3,
      reasoning:
        'Very difficult. Constitutional amendments are rare and hard to achieve. Despite strong public support across party lines (~72%) for reining in big money, the political barriers are high. It would need bipartisan champions in Congress willing to curtail a system that currently benefits many incumbents. Additionally, 38 states must agree. There\'s also the question of drafting consensus on defining "money is not speech" in a legally sound way. The idea is popular, but enshrining it in the Constitution faces an uphill battle.',
      keyPoints: [
        '~72% public support but high political barriers',
        'Constitutional amendments are rare',
        'Requires bipartisan Congressional champions',
        '38 states must ratify',
        'Incumbents benefit from current system',
        'Legal drafting complexity',
      ],
    },
  },

  overallRationale:
    'Overturn Citizens United scores approximately 6.7/10, indicating it is Slightly Beneficial. This score reflects a notable net positive impact, primarily driven by the huge gains in community trust and democratic integrity (scoring 10/10 on Community). While the direct material benefits are limited (hence not scoring in the very top tier), the fundamental improvements to governance and long-term policy outcomes make it well above neutral. Importantly, the benefit is contingent on implementation. Given the difficulty of actually passing this amendment, these benefits remain prospective. If achieved, however, it would mark a profound step toward a more equitable and representative society.',

  sources: [
    'issue-one-citizens-united-polling',
    'public-integrity',
  ],
};

export default overturnCitizensUnitedMethodology;
