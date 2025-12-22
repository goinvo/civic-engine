/**
 * V3 Needs-Based Methodology: Mandate "Dark Money" Disclosure
 *
 * Policy: Require disclosure of all political contributions and spending,
 * including by "dark money" groups that currently hide their donors.
 *
 * Overall Score: ~8/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const campaignFinanceDisclosureMethodology: V3PolicyMethodology = {
  policyId: 'campaign-finance-disclosure',
  policyName: 'Mandate "Dark Money" Disclosure',
  description:
    'Require disclosure of all political contributions and spending, including by "dark money" groups that currently hide their donors. Dark money disclosure means voters "have a right to know which wealthy special interests are spending big money to secretly influence our government." By mandating donor transparency, citizens can make informed decisions and feel more confident that the political system isn\'t rigged behind closed doors. Average public support is approximately 85%.',

  needCategories: {
    physiological: {
      score: 5,
      reasoning:
        'Negligible direct impact. Requiring disclosure of "dark money" (hidden sources of political funding) does not provide food, shelter, or healthcare. Any effect on physiological needs would be indirect and long-term, if better governance leads to improved social services. For the scoring, this category isn\'t a primary factor for this policy\'s benefit.',
    },
    safety: {
      score: 7,
      reasoning:
        'Moderately high impact in terms of social/political safety and stability. Transparent campaign financing helps protect the integrity of democracy, which is foundational for national stability. Corruption and unchecked secret influence can lead to policies that harm public safety or national security; by shining light on who funds political messages, the policy aims to prevent covert hostile influences or extreme corruption from swaying power. A government seen as fair and not "bought" is less likely to provoke civil unrest. This transparency contributes to the "rule of law" and institutional security – a safer society where government decisions are made in the open.',
    },
    community: {
      score: 9,
      reasoning:
        'Very high impact. This policy directly ties into civic participation and social trust, key aspects of the Community need. Dark money disclosure means voters have a right to know which wealthy special interests are spending big money to secretly influence government. By mandating donor transparency, citizens can make informed decisions and feel more confident that the political system isn\'t rigged behind closed doors. This boosts trust in institutions and encourages people to engage in the democratic process. It also fosters a sense of fairness within the community – everyone plays by the same rules of open disclosure. A majority of voters consider political corruption a more serious problem than even healthcare costs, so tackling this is a significant community-level benefit.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Moderate impact. While campaign finance transparency doesn\'t directly create jobs or educate people, it influences the policy environment that shapes opportunities. Dark money often enables narrow interests to secure policies (tax breaks, deregulation, contracts) that benefit a few at the expense of the many. By exposing funding sources, the policy can lead to fairer economic and regulatory policies that improve general opportunities. A political system dominated by secret money can crowd out the voices of ordinary people and small businesses; transparency is a step toward leveling the playing field, which in the long run can foster a healthier economy where success is determined more by merit and less by lobbying clout.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Some impact. A transparent democracy can empower individuals to pursue their values and civic goals, an aspect of self-actualization. When people feel their vote matters and government responds to citizens rather than hidden donors, they are more likely to engage in advocacy, community leadership, or public service – forms of personal fulfillment for many. Knowing the political process is fair and open might also reduce the cynicism or hopelessness that stifles personal initiative in civic or creative realms. A healthy democracy supports an environment where individuals can strive for higher needs without being as disillusioned.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. Every citizen and voter is affected by this policy, since it concerns the integrity of the democratic system that governs all. Transparent funding influences the quality of representation all Americans receive. When "dark money" (often coming from a tiny fraction of ultra-wealthy donors or special interests) dominates, the broader public loses out. Polls show over 80% of voters (across all parties) support public disclosure of political contributions to independent groups, indicating that virtually everyone sees themselves as a stakeholder. The effects of implementing disclosure would be society-wide: voters get information, honest candidates have a fairer shot, and elected officials know their funding sources will be scrutinized.',
      keyPoints: [
        'Every citizen/voter affected by democratic integrity',
        '80%+ of voters (all parties) support disclosure',
        'Dark money currently skews representation',
        'Society-wide effects: informed voters, fair candidates',
        '100% of population benefits from clean elections',
      ],
    },
    essentialToSurvival: {
      score: 5,
      reasoning:
        'Low/moderate. In the immediate sense, campaign finance transparency is not about survival or basic needs. You won\'t directly save a life by revealing donor identities. However, over the long run, a less corrupt government is better at delivering survival-related services (like disaster response, public health, food security programs) because decisions are made on merit and public interest. One could argue that the "survival" of a democracy is at stake – too much dark money erodes trust, potentially leading to democratic collapse. Overall, we weight this dimension on the lower side since the chain of effects to literal survival is indirect and long-term.',
      keyPoints: [
        'Not directly life-saving',
        'Better governance improves survival-related services long-term',
        'Democracy\'s "survival" depends on trust',
        'Indirect chain to literal survival',
        'More about institutional health than immediate needs',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Fast. Transparency improvements would take effect almost immediately upon implementation. If a law mandated real-time or regular disclosure of all political donations and spending, voters and watchdog groups would start receiving that information in the next election cycle (if not sooner). If the DISCLOSE Act were passed today, by the upcoming elections all advertisements and political groups would be required to report their funders, giving instant clarity on who is behind campaign messages. This could immediately influence voter perceptions and media reporting. The full impact – such as changes in donor behavior and gradual reduction in the influence of big money – would unfold over a few election cycles, but basic implementation flips a "light switch" on dark money within a year or less.',
      keyPoints: [
        'Takes effect almost immediately upon passage',
        'Disclosure in next election cycle',
        'Instant clarity on funding sources',
        'Immediate influence on voter perceptions',
        'Full behavioral changes over few election cycles',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Moderate. Public support is extremely high (~85%) for requiring disclosure of dark money donors (across Democrats, Republicans, and independents alike). However, feasibility is tempered by political roadblocks: those who benefit from dark money (certain powerful politicians and special interest groups) strongly oppose such laws. In 2022, 49 senators filibustered and blocked the DISCLOSE Act, a bill precisely intended to mandate dark money disclosure. This shows that despite public demand, passing the law federally is challenging under current conditions. The Supreme Court has upheld the constitutionality of disclosure requirements, meaning there is no legal barrier. Some states have implemented their own transparency rules. The policy is straightforward in concept and inexpensive to implement (simply enforce reporting), but political will is the main hurdle.',
      keyPoints: [
        '85% public support across all parties',
        'DISCLOSE Act filibustered in 2022 (49 senators)',
        'Supreme Court upholds constitutionality of disclosure',
        'States have implemented own rules',
        'Straightforward/inexpensive to implement',
        'Political will is main hurdle',
      ],
    },
  },

  overallRationale:
    'Mandate "Dark Money" Disclosure scores approximately 8/10, indicating it is Very Beneficial. Its strongest effects are on the health of our democracy – increasing transparency leads to more accountability, which can reduce corruption and make government more responsive to the people. While its benefits to day-to-day life are indirect, they are pervasive: over time, cleaner politics yields better decisions on all issues (health, safety, economy). The near-universal population impact and boost to community trust drive the score high. This isn\'t marked "extremely" beneficial only because it doesn\'t directly and immediately improve material conditions for individuals; rather, it enables a political environment that is much more likely to address those material needs fairly. Considering that a majority of voters rank political corruption as one of the most serious problems facing the country, tackling dark money is crucial for ensuring government of the people, by the people, for the people.',

  sources: [
    'campaign-legal-center-disclosure-poll',
    'wisconsin-independent-disclose-act',
    'builders-movement-dark-money',
  ],
};

export default campaignFinanceDisclosureMethodology;
