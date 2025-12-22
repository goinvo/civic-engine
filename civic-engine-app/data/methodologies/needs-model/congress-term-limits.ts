/**
 * V3 Needs-Based Methodology: Congressional Term Limits
 *
 * Policy: Impose limits (e.g. two terms for Senators, three terms for House members) on how
 * long any individual can serve in Congress, requiring turnover and preventing career politicians.
 *
 * Overall Score: ~5.5/10 (Neutral to Mildly Helpful)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const congressTermLimitsMethodology: V3PolicyMethodology = {
  policyId: 'congress-term-limits',
  policyName: 'Congressional Term Limits',
  description:
    'Impose limits (e.g. two terms for Senators, three terms for House members) on how long any individual can serve in Congress, requiring turnover and preventing career politicians.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning: 'No direct impact. It does not feed, house, or heal anyone.',
    },
    safety: {
      score: 5,
      reasoning:
        'Uncertain impact. Proponents claim it could reduce corruption and improve governance, which might enhance long-term national stability. However, research suggests term limits may fail to reduce corruption and can even worsen it. One study found that U.S. states with legislative term limits saw increases in the frequency of political corruption events. The theory is that a surge of inexperienced lawmakers leads to greater reliance on lobbyists and a "last-term" mindset where outgoing officials have incentives to secure personal gain (the study observed a "penultimate effect" of lawmakers focusing on post-office opportunities over public service). Additionally, the loss of experienced legislators can hinder the government\'s ability to craft effective, protective policies (complex policymaking is a skill built over time). Given these trade-offs, it\'s not clear that term limits improve the safety/stability of society; they might even pose some risks to effective governance.',
    },
    community: {
      score: 6,
      reasoning:
        'Mild positive. Voters overwhelmingly favor term limits, so enacting them could boost public satisfaction and the sense that government is "of the people." It might increase civic engagement or voter turnout, at least initially, by signaling a political system that refreshes itself and limits entrenched power. New voices in Congress could also mean more communities see someone from their background have a chance to serve, potentially increasing feelings of representation.',
    },
    opportunity: {
      score: 5.5,
      reasoning:
        'Neutral to slight positive. Term limits create opportunities for new leaders by regularly opening up seats, potentially allowing a more diverse set of people to serve in Congress (those who might not defeat an incumbent otherwise). This is a positive for political opportunity and perhaps for fresh policy ideas. However, it doesn\'t directly translate to jobs or education for the general populace. Any broader economic opportunity effects are indirect (e.g. a less entrenched legislature could enact policies that benefit the workforce, but this is speculative).',
    },
    selfActualization: {
      score: 5,
      reasoning:
        'Minimal effect. This policy might marginally increase citizens\' sense of empowerment in their government (knowing there\'s no permanent ruling class and maybe feeling anyone could serve in Congress for a short time). But it doesn\'t tangibly affect personal creative or fulfillment needs.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'Broad but indirect. In principle, all citizens would benefit from a political system with regular turnover. New candidates would have more chances to win office, and constituents might get more responsive representation if lawmakers know they can\'t stay indefinitely. However, the effect on each citizen\'s daily life is indirect and depends on how government performance changes as a result.',
      keyPoints: [
        'All citizens could benefit from regular turnover',
        'New candidates would have more chances',
        'Effect on daily life is indirect',
        'Depends on how government performance changes',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Very low. This structural change doesn\'t provide any immediate material needs or security. Its effects are on the political process rather than on individuals\' basic survival or health.',
      keyPoints: [
        'No immediate material needs provided',
        'Effects are on political process',
        'Not related to basic survival or health',
        'Structural/governance change only',
      ],
    },
    timeToOutcome: {
      score: 5,
      reasoning:
        'Very slow. Implementing term limits likely requires a constitutional amendment, which could take years (if it succeeds at all). Even after adoption, current members might finish their allowed terms, and the turnover benefits (or drawbacks) would play out over multiple election cycles. This is a long-term reform with little immediate payoff.',
      keyPoints: [
        'Requires constitutional amendment',
        'Could take years to implement',
        'Current members would finish terms first',
        'Benefits play out over multiple election cycles',
      ],
    },
    feasibility: {
      score: 5,
      reasoning:
        'Low. Despite strong public support (on the order of 80–87% in polls), it faces steep political barriers. The only way to impose congressional term limits is to amend the U.S. Constitution. Efforts in Congress have repeatedly stalled (e.g. a 2024 House proposal died in committee, and a 2025 Senate proposal had only 17 co-sponsors). Some states are calling for an amendment convention, but as of 2025 only 9 of the required 34 states had done so. In short, enactment is unlikely in the near term.',
      keyPoints: [
        '80-87% public support in polls',
        'Requires constitutional amendment',
        '2024 House proposal died in committee',
        '2025 Senate proposal had only 17 co-sponsors',
        'Only 9 of required 34 states support convention',
      ],
    },
  },

  overallRationale:
    'Given the mixed impacts, we estimate roughly 5 to 6 out of 10 (around ~5.5/10). This indicates essentially a neutral to mildly helpful effect. While the idea is popular and could reinvigorate democracy with new voices, evidence hints it might not significantly improve (and could even impair) governance outcomes. Therefore, its net benefit to societal needs is modest at best – it satisfies a public desire for fairness more than it solves concrete problems.',

  sources: [
    'fulcrum-term-limits-pros-cons',
    'term-limits-corruption-study',
  ],
};

export default congressTermLimitsMethodology;
