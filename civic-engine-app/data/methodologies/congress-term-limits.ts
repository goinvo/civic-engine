import { PolicyMethodology } from './index';

export const congressTermLimits: PolicyMethodology = {
  policyId: 'congress-term-limits',
  policyName: 'Congressional Term Limits',
  description: 'Imposes limits on how long members of Congress can serve: typically 4 terms (8 years) in the House and 2 terms (12 years) in the Senate. This would be enacted via a Constitutional Amendment (since the Supreme Court ruled that states cannot set these limits unilaterally). The aim is to refresh legislative bodies regularly, curbing career politicians and encouraging new voices and ideas in government.',
  overallRationale: 'This idea enjoys ~80–86% support in public surveys. It addresses entrenched incumbency by guaranteeing turnover and new representation. The main challenge is feasibility: it requires a Constitutional amendment, which has proven difficult despite decades of public support.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'Term limits are a one-size-fits-all rule for governance, not an economic plan. Implementing them doesn\'t demand any detailed centralized knowledge of local conditions or constant data crunching – it\'s a simple eligibility rule to enforce. The policy avoids any pretense of micromanaging economic activity (which would score low); instead it\'s a straightforward structural change, relatively easy to administer (track service length) and conceptually clear.',
      keyPoints: [
        'One-size-fits-all rule, not economic planning',
        'No detailed centralized knowledge required',
        'Simple eligibility rule to enforce',
        'Avoids micromanaging economic activity',
        'Straightforward structural change',
      ],
      sources: [
        'State term limit studies',
        'Congressional staff influence research',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'The issue of how long federal lawmakers stay in office is inherently a federal/national concern. Addressing it through a Constitutional Amendment (national scope) matches the problem\'s scale perfectly. Polycentric governance is achieved in that the decision involves both federal proposal and state-by-state ratification, aligning multiple levels to tackle a national institutional design question. The governance level is appropriate and inclusive of all states.',
      keyPoints: [
        'Federal issue addressed at federal level',
        'Constitutional Amendment matches national scope',
        'Involves federal proposal and state ratification',
        'Aligns multiple levels of governance',
        'Appropriate and inclusive governance approach',
      ],
      sources: [
        'U.S. Term Limits v. Thornton (1995)',
        'State term limit adoptions',
      ],
    },
    downs: {
      score: 1.0,
      reasoning: '"House members max 8 years, Senators 12 years." There\'s almost nothing arcane about this; it\'s an extremely legible reform. Voters and politicians can easily grasp the rule and its immediate implication: after X years, you simply cannot run again for that chamber. The trade-off (experience vs. fresh blood) is openly debated, but the mechanism itself is crystal clear with no hidden clauses. This exemplifies Downsian clarity.',
      keyPoints: [
        'Extremely simple numeric limits',
        'Nothing arcane about the rule',
        'Voters and politicians easily grasp implications',
        'Mechanism crystal clear, no hidden clauses',
        'Trade-offs openly debated',
      ],
      sources: [
        'Term limit proposal specifications',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: 'By universally capping tenure, the amendment leaves no room for individual exceptions or special-interest loopholes – everyone must abide once it\'s in effect. It prevents entrenched incumbents from indefinitely holding power (a form of political capture). This can reduce certain kinds of lobbyist or interest-group leverage that rely on long-term relationships with career lawmakers. However, there is a nuanced downside: constantly rotating legislators might empower unelected staff or lobbyists who remain in D.C., since inexperienced newcomers lean on them. While the rule is hard to "capture" in the sense of exempting oneself, its side-effects could create other avenues for influence.',
      keyPoints: [
        'Universally caps tenure, no exceptions',
        'Prevents indefinite power holding',
        'Reduces lobbyist leverage via long-term relationships',
        'Potential downside: may empower permanent staff/lobbyists',
        'Hard to capture but side effects possible',
      ],
      sources: [
        'House Roll Call Vote 277, March 29, 1995',
        'Congressional Research Service term limit analysis',
        'Pew Research Center term limits polling',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Term limits don\'t have a direct role in macroeconomic stabilization. They neither inject money into the economy during recessions nor restrain spending in booms. Any economic effects would be second-order (perhaps more fiscal discipline or, conversely, short-term budgeting by lame ducks). These are speculative and not inherent to the policy, so we consider it macro-neutral.',
      keyPoints: [
        'No direct macroeconomic stabilization role',
        'Neither injects money nor restrains spending',
        'Economic effects would be second-order',
        'Effects speculative and not inherent',
        'Macro-neutral policy',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'This reform curtails the possibility of a permanent ruling class, which is a win for non-domination. Citizens cannot be indefinitely subject to the same powerful individual; no lawmaker becomes an "unremovable" lord over their constituency. Regular turnover reaffirms that political power is borrowed and temporary, which empowers the people in a republican sense. By structurally preventing long-term accumulation of power over others, it supports freedom as non-domination. (It loses a little from the ideal only because a term-limited incumbent might still exert influence via informal networks after office, but in office their power is time-bound.)',
      keyPoints: [
        'Curtails possibility of permanent ruling class',
        'Citizens not indefinitely subject to same individual',
        'Power is borrowed and temporary',
        'Empowers people in republican sense',
        'Structurally prevents long-term power accumulation',
      ],
      sources: [
        'National Conference of State Legislatures term limits research',
        'American Political Science Review studies on term limits',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'Exit: Voters get built-in "exit" from any given representative after a fixed period – even if an incumbent is popular, they must leave, making room for an alternative. This ensures renewal and that constituents aren\'t stuck with one option forever. Voice: On the flip side, voters lose the ability to keep voicing support for a particularly effective representative beyond the limit – their "voice" to retain a trusted agent is curtailed. Overall, term limits enhance systemic churn (preventing entrenchment, a form of exit for the system) but slightly constrain individual choice.',
      keyPoints: [
        'Built-in exit from any representative after fixed period',
        'Ensures renewal, not stuck with one option forever',
        'Voice to retain effective representative curtailed',
        'Enhances systemic churn, prevents entrenchment',
        'Slightly constrains individual voter choice',
      ],
      sources: [
        'Electoral competition research',
        'Incumbent advantage studies',
      ],
    },
    buchanan: {
      score: 0.4,
      reasoning: 'The policy inevitably creates some losers: long-serving politicians who wish to continue are forced out, and constituents who would prefer their veteran representative must instead accept a newcomer. There\'s no compensation for those losing an experienced advocate or a desired career opportunity. However, the policy\'s popularity suggests a broad social consent if not unanimity – the public at large consents, but the affected minority (career legislators and their loyal voters) do not. It\'s not a policy everyone agrees benefits them, so it scores on the lower side of the consent spectrum (above the rock-bottom only because it\'s a constitutional change likely achieved through supermajoritarian approval).',
      keyPoints: [
        'Creates losers: career politicians forced out',
        'Constituents may lose preferred veteran representative',
        'No compensation for losing experienced advocate',
        'Broad social consent but not unanimity',
        'Requires supermajoritarian approval',
      ],
      sources: [
        'Public Consultation surveys',
        'Pew Research polling',
      ],
    },
    polanyi: {
      score: 0.2,
      reasoning: 'Congressional term limits are about political structure, not about insulating people from the free market\'s downsides. This reform doesn\'t provide any new social safety net, labor protection, or decommodification of basic needs. It neither commodifies nor decommodifies anything related to livelihood – it\'s largely irrelevant to Polanyi\'s concern of protecting humans from market ruthlessness. Thus, it scores very low here (essentially no direct protective effect on citizens\' economic security).',
      keyPoints: [
        'About political structure, not market protection',
        'No new social safety net provided',
        'No labor protection or decommodification',
        'Irrelevant to Polanyi\'s market protection concerns',
        'No direct protective effect on economic security',
      ],
      sources: [],
    },
    rawls: {
      score: 0.5,
      reasoning: 'There is no direct redistribution or uplift for the least advantaged in society through term limits. All citizens get the procedural benefit of potentially more responsive governance and less entrenched power, which could lead to policies beneficial to the worst-off, but that\'s an indirect and uncertain outcome. Importantly, this rule doesn\'t by itself favor the rich or poor – it\'s egalitarian in process, applying to all officeholders equally. We score it neutral: it neither obviously harms nor specifically helps the poorest, beyond whatever secondary policy changes it might eventually foster.',
      keyPoints: [
        'No direct redistribution for least advantaged',
        'Procedural benefit applies to all citizens',
        'Could lead to policies beneficial to worst-off',
        'Egalitarian in process, applies equally',
        'Neutral: neither harms nor specifically helps poorest',
      ],
      sources: [
        'Diversity in term-limited legislatures',
      ],
    },
    george: {
      score: 0.6,
      reasoning: 'Career political positions can be seen as a kind of rent if incumbents use their secure seat to accrue benefits, influence, and insider advantages. Term limits put a check on this by preventing the indefinite collection of that "incumbency rent." By forcing turnover, the policy opens the field to newcomers (who must prove themselves) and stops individuals from monopolizing a public office for too long. While it\'s not a traditional economic rent like land monopoly, it does curb an unearned positional advantage. (Some points off since corruption or rent-seeking could still happen in a shorter term; it\'s a partial, not complete, remedy.)',
      keyPoints: [
        'Career positions can be seen as rent',
        'Prevents indefinite collection of incumbency rent',
        'Opens field to newcomers',
        'Stops monopolizing public office',
        'Curbs unearned positional advantage',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Term limits foster more inclusive institutions by broadening access to political power. Over time, more people (from different backgrounds, generations, perhaps demographics) will get the chance to serve, as opposed to a static group of incumbents dominating for decades. This diminishes an extractive aspect of the political system (where incumbents could entrench themselves and possibly cater to narrow interests). The rule distributes power more evenly across time and people, aligning with Acemoglu\'s notion of inclusive, pluralistic institutions. It\'s not a complete panacea (newcomers could still be elites or cater to elites), but it meaningfully thwarts the formation of a closed oligarchy in the legislature.',
      keyPoints: [
        'Fosters inclusive institutions',
        'Broadens access to political power',
        'More people get chance to serve over time',
        'Diminishes extractive entrenchment',
        'Distributes power more evenly across time',
      ],
      sources: [
        'OpenSecrets incumbent reelection rate data',
        'State legislative diversity studies post-term limits',
        'Ballotpedia term limits outcome analysis',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'In Walzer\'s view of justice, no one sphere (like money or status) should permanently dictate advantage in another sphere. Term limits reinforce that political office is not a personal possession or a lifetime entitlement. It must be earned (through elections) and then relinquished, preventing politicians from converting incumbency into a decades-long personal domain (which can often be aided by wealth or patronage). By periodically "resetting" who holds power, the policy helps ensure that the distribution of the good of political authority follows civic principles (merit, trust of the electorate at given moments) rather than seniority or war chest size indefinitely. This is more just in the political sphere\'s own terms. (Tempered slightly by the concern that strict limits override voter judgment in cases where a community might legitimately want a long-serving elder statesperson.)',
      keyPoints: [
        'Reinforces office is not permanent possession',
        'Must be earned and then relinquished',
        'Prevents converting incumbency to personal domain',
        'Resets distribution of political authority',
        'Authority follows civic principles, not seniority',
      ],
      sources: [
        'Rotation in office historical tradition',
        'Walzer\'s Spheres of Justice',
      ],
    },
  },
  modifiers: [
    {
      id: 'longer-limits',
      name: 'Longer Term Limits',
      description: '6 House terms (12 years), 3 Senate terms (18 years)',
      factorChanges: { olson: 0.1, hayek: 0.1, buchanan: -0.05 },
    },
    {
      id: 'convention-of-states',
      name: 'Convention of States Path',
      description: 'Pursue amendment through state-called convention rather than Congress',
      factorChanges: { olson: 0.1, ostrom: 0.0 },
    },
    {
      id: 'lifetime-ban-lobbying',
      name: 'Pair with Lobbying Ban',
      description: 'Prohibit former members from lobbying after term limits',
      factorChanges: { pettit: 0.1, walzer: 0.1 },
    },
  ],
};
