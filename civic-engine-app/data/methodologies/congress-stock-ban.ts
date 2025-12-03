import { PolicyMethodology } from './index';

export const congressStockBan: PolicyMethodology = {
  policyId: 'congress-stock-ban',
  policyName: 'Ban Congressional Stock Trading',
  description: 'Prohibits Members of Congress (and often their spouses and dependent children) from buying or selling individual stocks. Officeholders must either divest these assets or place them in a genuine blind trust. The goal is to eliminate conflicts of interest and insider trading, restoring public trust in legislative integrity.',
  overallRationale: 'This policy has broad public support in the mid-80s% range across parties. It directly addresses conflicts of interest and insider trading concerns by removing the temptation and opportunity for lawmakers to profit from non-public information. The policy aligns Congress with ethics rules already applied to executive branch officials.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'This ethics rule is a simple, top-down prohibition that doesn\'t require fine-grained central economic planning. The government isn\'t dictating market outcomes or prices here, just setting a uniform constraint on officials\' behavior. It\'s relatively easy to implement (monitoring compliance is straightforward compared to managing an economy) and does not assume any "omniscient" bureaucracy – thus it scores well above the central-planning extreme.',
      keyPoints: [
        'Simple top-down prohibition, not economic planning',
        'Government not dictating market outcomes',
        'Uniform constraint on officials\' behavior',
        'Monitoring compliance straightforward',
        'Does not assume omniscient bureaucracy',
      ],
      sources: [
        'STOCK Act disclosure requirements',
        'Blind trust regulations',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'The problem (insider trading and conflicts of interest in Congress) is inherently a federal issue, and the solution is a federal law governing federal officials. The level of governance perfectly matches the scale of the problem – a clear case of aligning decision authority with the scope (national legislators regulated by national rules).',
      keyPoints: [
        'Problem is inherently federal in scope',
        'Solution is federal law for federal officials',
        'Governance level matches problem scale',
        'Decision authority aligns with scope',
        'National legislators regulated by national rules',
      ],
      sources: [
        'Congressional ethics enforcement structure',
      ],
    },
    downs: {
      score: 1.0,
      reasoning: '"No trading individual stocks while in office" is about as clear and legible as it gets. There\'s little room for confusion: if you hold public office, you simply cannot buy or sell stocks (except via blind trusts or broad funds). The rule is easy for the public to understand and for officials to follow, with a transparent "if X then Y" structure (if you are in Congress, then you must divest or use a blind trust).',
      keyPoints: [
        'Maximally clear: no individual stock trading',
        'Little room for confusion',
        'Easy for public to understand',
        'Transparent "if X then Y" structure',
        'Clear compliance path: blind trust or diversified funds',
      ],
      sources: [
        'Ban Congressional Stock Trading Act text',
        'Public understanding polling',
      ],
    },
    olson: {
      score: 0.9,
      reasoning: 'This policy is designed to be capture-resistant. It is universally applied to all members (and their immediate families), leaving no exemptions that lobbyists or interests could exploit. By including spouses/dependents, it closes the common loophole of proxy trading. Enforcement will be key, but the framework itself is hard for any single interest to hijack or game. The near-perfect score reflects the policy\'s broad, no-exceptions approach – slightly shy of 1.0 only because absolute robustness depends on strict enforcement in practice.',
      keyPoints: [
        'Designed to be capture-resistant',
        'Universally applied to all members and families',
        'No exemptions for lobbyists or interests to exploit',
        'Closes loophole of proxy trading via spouses',
        'Framework hard for any interest to hijack',
      ],
      sources: [
        'New York Times congressional trading investigation (2022)',
        'Unusual Whales Congressional Trading Report',
        'STOCK Act 2.0 and TRUST in Congress Act bill histories',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'An ethics rule for Congress has essentially no direct impact on macroeconomic cycles. It doesn\'t change government spending or act as an automatic stabilizer/un-stabilizer. While it might improve long-term governance quality (which could lead to more stable policy), those effects are indirect and speculative. We rate it neutral on economic stability – it neither fights nor fuels recessions or booms in any meaningful way.',
      keyPoints: [
        'No direct impact on macroeconomic cycles',
        'Does not change government spending',
        'Not an automatic stabilizer',
        'Potential indirect effects through better governance',
        'Neutral on economic stability',
      ],
      sources: [],
    },
    pettit: {
      score: 0.7,
      reasoning: 'By curbing lawmakers\' ability to profit from insider knowledge, the policy helps ensure public officials serve the people rather than using their position for personal gain. This reduces a form of arbitrary power – officials can\'t enrich themselves unchecked, which means citizens are less subject to exploitation by those in power. In a republic, it fosters non-domination by reinforcing that lawmakers are answerable to the law and public interest, not their own stock portfolios.',
      keyPoints: [
        'Curbs profiting from insider knowledge',
        'Officials serve people, not personal gain',
        'Reduces arbitrary power of office',
        'Citizens less subject to exploitation',
        'Reinforces lawmakers\' accountability',
      ],
      sources: [
        'DOJ investigation of Sen. Burr COVID trading',
        'Senate Ethics Committee investigations 2020',
        'Executive branch conflict-of-interest regulations (5 CFR 2635)',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'There\'s no new "exit" option or alternative service created for citizens here – it\'s an internal governance reform. However, one can view this reform as a response to the voice of the people: widespread public demand for such a ban indicates citizens exercising voice to reform the system from within. Adopting the ban could increase trust, arguably giving people more reason to engage (voice) rather than exit (become apathetic). Still, the policy itself doesn\'t give individuals a direct exit or feedback mechanism.',
      keyPoints: [
        'No new exit option for citizens',
        'Internal governance reform',
        'Response to public voice demanding reform',
        'May increase trust and engagement',
        'No direct exit or feedback mechanism',
      ],
      sources: [
        'Public trust in Congress research',
      ],
    },
    buchanan: {
      score: 0.2,
      reasoning: 'The ban imposes a restriction on a small group (Congress members and their families), who might strongly prefer to keep their trading freedoms. They are clearly the "losers" in this scenario, sacrificing a privilege. There\'s no direct compensation to them except perhaps improved public esteem. Since virtually everyone else benefits (through increased trust and presumably better governance), it\'s a coercive move against a minority elite for the majority\'s benefit. That\'s far from unanimous consent or Pareto-improvement.',
      keyPoints: [
        'Restricts small group (Congress and families)',
        'Affected parties clearly "losers"',
        'No direct compensation for lost privilege',
        'Coercive move against minority elite',
        'Far from unanimous consent or Pareto improvement',
      ],
      sources: [
        'Voice of the People surveys',
        'Bipartisan polling data',
      ],
    },
    polanyi: {
      score: 0.3,
      reasoning: 'This reform isn\'t about shielding citizens from market forces in terms of livelihood or essentials; it\'s about ethics in government. It doesn\'t decommodify any basic necessity or regulate the labor market, housing, etc. Indirectly, by purifying the political sphere, it could lead to better protections down the line, but those are speculative. In terms of Polanyi\'s focus (protecting humans from being mere market instruments), this has minimal direct effect.',
      keyPoints: [
        'Not about shielding citizens from market forces',
        'About ethics in government, not essentials',
        'Does not decommodify basic necessities',
        'Indirect effects on protection speculative',
        'Minimal direct effect on Polanyi\'s concerns',
      ],
      sources: [],
    },
    rawls: {
      score: 0.5,
      reasoning: 'The ban\'s benefits (like cleaner decision-making and reduced corruption risk) apply to society broadly, not specifically targeting the poor or vulnerable, but also not privileging the rich. It doesn\'t inherently redistribute wealth or opportunities to the worst-off, so it\'s neutral on improving the floor of well-being. However, by potentially leading to fairer policies (since lawmakers won\'t be biased by holdings), it could indirectly help the worst-off over time.',
      keyPoints: [
        'Benefits apply broadly to society',
        'Does not specifically target poor or vulnerable',
        'Does not redistribute wealth to worst-off',
        'Neutral on floor of well-being',
        'May indirectly help worst-off through fairer policy',
      ],
      sources: [],
    },
    george: {
      score: 0.8,
      reasoning: 'This rule eliminates a form of rent-seeking: profiting from insider information and one\'s position of power is essentially an unearned gain (rent) that lawmakers have enjoyed. By banning stock trading, it curtails the ability of officials to extract these unearned profits. This doesn\'t involve taxing productive labor or investment broadly; it specifically targets a source of unfair advantage. In Georgist spirit, it\'s closer to stamping out an "unearned income" channel.',
      keyPoints: [
        'Eliminates form of rent-seeking',
        'Insider trading profits are unearned gains',
        'Curtails extraction of unearned profits',
        'Does not tax productive labor broadly',
        'Targets source of unfair advantage',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Terminating stock trading privileges makes political institutions more inclusive and less extractive. It removes an extractive element (lawmakers leveraging power for personal enrichment) and helps level the field between the governing and the governed. With this reform, Congress is compelled to operate on rules closer to those the public follows, enhancing equality before the law. This strengthens inclusive institutions by reducing the concentration of power/wealth among insiders.',
      keyPoints: [
        'Makes institutions more inclusive, less extractive',
        'Removes extractive element of personal enrichment',
        'Levels field between governing and governed',
        'Congress operates closer to public rules',
        'Reduces concentration of power among insiders',
      ],
      sources: [
        'Institutional quality and official corruption research',
      ],
    },
    walzer: {
      score: 1.0,
      reasoning: 'This policy impeccably adheres to sphere separation: it says that the economic sphere (personal wealth growth) must not dictate actions in the political sphere. Lawmakers shouldn\'t be using public office (a sphere of civic duty and justice) as a means to private financial gain. By banning trades, the logic of governance (representing the public good) is kept pure, uncorrupted by financial self-interest. In Walzer\'s terms, it uses the correct principle in the political sphere – decisions should be made on merit and common good, not on money. This is a maximal example of preventing money from buying influence or policy.',
      keyPoints: [
        'Impeccably adheres to sphere separation',
        'Economic sphere must not dictate political sphere',
        'Public office not for private financial gain',
        'Governance kept pure from financial self-interest',
        'Maximal example of preventing money buying influence',
      ],
      sources: [
        'Walzer, "Spheres of Justice" on corruption between spheres',
        'House and Senate committee stock trading analyses',
        'Public Citizen conflict-of-interest reports',
      ],
    },
  },
  modifiers: [
    {
      id: 'extend-to-judiciary',
      name: 'Extend to Supreme Court',
      description: 'Apply same trading restrictions to Supreme Court justices',
      factorChanges: { buchanan: 0.05, acemoglu: 0.05 },
    },
    {
      id: 'extend-to-executive',
      name: 'Extend to Executive Branch',
      description: 'Apply to President, VP, and senior executive officials',
      factorChanges: { walzer: 0.0, acemoglu: 0.05 },
    },
    {
      id: 'strong-penalties',
      name: 'Strong Enforcement Penalties',
      description: 'Include significant fines and profit forfeiture for violations',
      factorChanges: { olson: 0.05, downs: 0.0 },
    },
  ],
};
