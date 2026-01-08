/**
 * Democratic Reform Implementation Approaches
 *
 * 5 approaches to making democracy work better for everyone.
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const democraticReformApproaches: ImplementationApproach[] = [
  {
    id: 'ranked-choice-voting',
    problemAreaId: 'democratic-reform',
    title: 'Ranked Choice Voting / Alternative Voting Systems',
    summary:
      'Change how we vote so people can rank candidates in order of preference, reducing spoiler effects and rewarding candidates with broad appeal.',
    mechanism:
      'Voters rank candidates: 1st choice, 2nd choice, 3rd choice, etc. If no one gets 50%+, the last-place candidate is eliminated and their voters\' 2nd choices are redistributed. Process repeats until someone has a majority. Variations include Approval voting (vote for all you approve) and STAR voting.',
    tradeoffs: {
      benefits: [
        'Eliminates "spoiler" candidates',
        'Winners have broader support (majority, not plurality)',
        'Reduces negative campaigning (need 2nd-choice votes)',
        'Third parties become viable without "wasting" votes',
        'Reduces polarization incentives',
      ],
      costs: [
        'More complex ballots may confuse some voters',
        'Results take longer to determine',
        'Unfamiliar system requires voter education',
        'Major parties may lose structural advantage',
        'Some voters don\'t use rankings (ballot exhaustion)',
      ],
    },
    source:
      'Alaska (statewide, 2022), Maine (statewide), NYC (municipal), 50+ US cities; used nationally in Australia, Ireland',
    voices_support: [
      {
        persona: 'Third-party voter (Christopher Keene, 34)',
        argument:
          "I vote Libertarian but everyone says I'm 'throwing my vote away.' With ranked choice, I can vote my conscience AND have a backup. That's just fair.",
      },
      {
        persona: 'Moderate Republican (Howard Platt, 52)',
        argument:
          'I left the party because primaries reward extremists. RCV lets me vote for reasonable candidates without helping the other side win. It rewards sanity.',
      },
      {
        persona: 'Political scientist (Dr. Miranda Shaw, 47)',
        argument:
          "Our winner-take-all system mathematically produces two parties and punishes moderation. RCV doesn't guarantee better outcomes, but it removes structural barriers to them.",
      },
      {
        persona: 'City council candidate (Dean Fitzgerald, 39)',
        argument:
          "I ran against two similar candidates. We split the vote and the guy nobody liked won with 35%. RCV would have elected who the majority actually preferred.",
      },
      {
        persona: 'Democracy reform advocate (Serena Okafor, 36)',
        argument:
          "Australia has used RCV for a century. Higher turnout, more parties, functional government. This isn't experimental — we're just behind.",
      },
      {
        persona: 'Exhausted voter (Diana Kowalski, 45)',
        argument:
          "I'm tired of voting against people instead of for people. I want to vote for who I actually like without doing game theory about who's 'electable.'",
      },
    ],
    voices_opposition: [
      {
        persona: 'Election administrator (Carol Hutchins, 58)',
        argument:
          "I have to explain this to poll workers, voters, and skeptics. Complexity erodes trust. When results take days and involve 'rounds,' people cry fraud even when it's legitimate.",
      },
      {
        persona: 'Democratic party official (Vincent Morales, 49)',
        argument:
          "RCV hurt us in Alaska — we lost a seat we'd have won under normal rules. This isn't neutral reform; it changes who wins.",
      },
      {
        persona: 'Republican party official (Pamela Whitmore, 54)',
        argument:
          "Democrats push RCV in cities where it helps them. When it hurt them in Alaska, suddenly they had concerns. It's partisan games dressed as reform.",
      },
      {
        persona: 'Elderly voter (Harold Jennings, 78)',
        argument:
          "I've voted the same way for 60 years. Now I need to rank five people? I just want to vote for my candidate. Keep it simple.",
      },
      {
        persona: 'Constitutional originalist (Dr. Russell Beckett, 61)',
        argument:
          "The Constitution doesn't mention ranking. One person, one vote — that's the principle. RCV gives some voters more influence than others.",
      },
      {
        persona: 'Election security advocate (Alan Jeffries, 43)',
        argument:
          "More complexity means more attack surface. Hand recounts are harder. Audits are harder. I don't trust machines to do instant runoffs correctly.",
      },
    ],
    evidence: [
      'Maine/Alaska: Higher third-party vote shares, competitive general elections',
      'NYC 2021: Slower results, some voter confusion, but successful implementation',
      'Australia: 100+ years of RCV; stable multiparty democracy, high turnout',
      'Academic studies: Mixed evidence on reducing polarization; clearer evidence on reducing spoiler effects',
    ],
    endorsing_orgs: ['FairVote', 'RepresentUs', 'Unite America'],
    opposing_orgs: ['Some state Republican parties', 'Some state Democratic parties'],
    order: 1,
  },
  {
    id: 'campaign-finance-reform',
    problemAreaId: 'democratic-reform',
    title: 'Campaign Finance Reform',
    summary:
      'Reduce the influence of big money in politics through donation limits, disclosure requirements, public financing, or constitutional amendments to overturn Citizens United.',
    mechanism:
      'Stricter donation limits (individual and PAC). Full disclosure of all political spending. Public financing with matching funds for small donors (NYC model). "Democracy vouchers" where every citizen gets funds to donate (Seattle). Constitutional amendment to allow Congress to regulate campaign spending.',
    tradeoffs: {
      benefits: [
        'Reduces appearance/reality of corruption',
        'Candidates spend less time fundraising',
        'Amplifies small donor voices',
        'More candidates can run (public financing)',
        'Reduces donor influence on policy',
      ],
      costs: [
        'May violate First Amendment (speech = spending)',
        'Incumbents may benefit (name recognition advantage)',
        'Dark money finds new channels',
        'Taxpayer funding of campaigns unpopular with some',
        'Enforcement is difficult; loopholes proliferate',
      ],
    },
    source:
      'NYC matching funds; Seattle democracy vouchers; Arizona Clean Elections; various federal proposals; Citizens United reversal amendments',
    voices_support: [
      {
        persona: 'Former Congresswoman (Rep. Sandra Bowman, 62)',
        argument:
          "I spent 4 hours a day in a call center dialing for dollars. I couldn't do my job because I was always fundraising. Public financing would let legislators legislate.",
      },
      {
        persona: 'Small donor (Priya Ramirez, 29)',
        argument:
          "My $25 contribution is meaningless next to a billionaire's Super PAC. Matching funds would make my voice count. Democracy vouchers would mean everyone has a voice.",
      },
      {
        persona: 'Anti-corruption advocate (Walter Hastings, 55)',
        argument:
          "Look at who funds campaigns, then look at how legislators vote. It's not complicated. Money buys access, access shapes policy. This is legalized bribery.",
      },
      {
        persona: 'Progressive economist (Dr. Theresa Holloway, 48)',
        argument:
          "Concentrated wealth becomes concentrated political power. You can't have political equality alongside unlimited political spending. Pick one.",
      },
      {
        persona: 'Local candidate (Demetrius Hall, 38)',
        argument:
          "I can't run because I don't have rich friends. Seattle's democracy vouchers let regular people fund regular candidates. I could actually compete.",
      },
      {
        persona: 'Republican reformer (Geoffrey Dawson, 51)',
        argument:
          "This isn't left or right. Donors own both parties. I want representatives who answer to voters, not bundlers. Public financing cuts the strings.",
      },
    ],
    voices_opposition: [
      {
        persona: 'First Amendment lawyer (Theodore Holcomb, 57)',
        argument:
          "Spending money on speech IS speech. Citizens United was correctly decided. The government shouldn't decide who can speak about politics.",
      },
      {
        persona: 'Libertarian (Jessica Sterling, 41)',
        argument:
          "If I want to spend my money telling people to vote for someone, that's my right. Campaign finance laws are incumbent protection dressed as reform.",
      },
      {
        persona: 'Conservative donor (Bradford Mills, 63)',
        argument:
          "The left wants to silence opposition. They can't win the argument, so they want to stop us from speaking. This is about power, not principle.",
      },
      {
        persona: 'Political consultant (Lydia Chambers, 44)',
        argument:
          "Money finds a way. Every limit creates workarounds. We've had campaign finance 'reform' for 50 years and money in politics has only increased.",
      },
      {
        persona: 'Free speech absolutist (Dr. Garrett Nelson, 49)',
        argument:
          "I don't like billionaires funding Super PACs either. But I also don't like the government deciding which speech is allowed. The cure is worse than the disease.",
      },
      {
        persona: 'Taxpayer (Leonard Webb, 54)',
        argument:
          "You want to use my taxes to fund politicians I disagree with? No thanks. If candidates can't raise money, maybe their ideas aren't popular enough.",
      },
    ],
    evidence: [
      'NYC matching funds: More diverse candidates, more competitive primaries, reduced reliance on big donors',
      'Seattle vouchers: Increased small donor participation, especially in underrepresented communities',
      "Post-Citizens United: Super PAC spending exploded; unclear impact on electoral outcomes",
      'International: Most democracies have stricter limits; functional democracy still exists',
    ],
    endorsing_orgs: ['Common Cause', 'End Citizens United', 'Represent.Us'],
    opposing_orgs: ['ACLU (on some provisions)', 'Institute for Free Speech'],
    order: 2,
  },
  {
    id: 'independent-redistricting',
    problemAreaId: 'democratic-reform',
    title: 'Independent Redistricting',
    summary:
      'Take the power to draw electoral districts away from partisan legislators and give it to independent commissions, reducing gerrymandering.',
    mechanism:
      'Nonpartisan or bipartisan commissions draw district lines. Criteria: equal population, compactness, keeping communities together. Explicit ban on considering partisan data. Transparent process with public input. Judicial review of final maps.',
    tradeoffs: {
      benefits: [
        'Reduces "safe seats" and increases competition',
        'Makes more votes matter (fewer foregone conclusions)',
        'Legislators chosen by voters, not vice versa',
        'Bipartisan support in principle',
        'Reduces extreme partisanship (need to win general, not just primary)',
      ],
      costs: [
        '"Independent" commissions can still be gamed',
        'Minority representation may suffer (VRA concerns)',
        'No such thing as truly neutral criteria',
        'Party in power loses advantage, so resists',
        'Slower process, potential for gridlock',
      ],
    },
    source:
      'California Citizens Redistricting Commission; Arizona; Michigan; Colorado; some court-ordered redistricting',
    voices_support: [
      {
        persona: 'Competitive district voter (Janet Fairbanks, 52)',
        argument:
          "I live in one of the few swing districts. My representative actually listens because she might lose. Everyone deserves that accountability.",
      },
      {
        persona: 'Political scientist (Dr. Bennett Clarke, 58)',
        argument:
          "When legislators draw their own districts, they choose their voters instead of voters choosing them. It's a fundamental inversion of democracy.",
      },
      {
        persona: 'Former Republican in blue state (Charles Ingram, 61)',
        argument:
          "My vote hasn't mattered in 20 years. The district is drawn so Democrats always win. Give me a fighting chance — or at least make them work for it.",
      },
      {
        persona: 'Former Democrat in red state (Sandra Wilcox, 55)',
        argument:
          "Same here, opposite party. Gerrymandering isn't partisan — both sides do it where they can. Independent commissions are the only fair solution.",
      },
      {
        persona: 'Good-government advocate (Philip Reinhardt, 47)',
        argument:
          "California's commission made races competitive. Suddenly legislators had to appeal to the middle, not just their base. The legislature got more functional.",
      },
      {
        persona: 'Mathematician (Dr. Evelyn Thornburg, 43)',
        argument:
          "We can measure gerrymandering now — compactness scores, efficiency gaps, ensemble analysis. There's no excuse for obviously manipulated maps.",
      },
    ],
    voices_opposition: [
      {
        persona: 'State legislator (Rep. Dwayne Harrington, 54)',
        argument:
          "The Constitution gives state legislatures redistricting power. Unelected commissions are an end-run around constitutional process.",
      },
      {
        persona: 'Voting rights attorney (Monique Baptiste, 46)',
        argument:
          "Majority-minority districts were hard-won. 'Neutral' criteria that ignore race can dilute minority voting power. Gerrymandering isn't always bad — it can protect representation.",
      },
      {
        persona: 'Republican strategist (Clark Dennison, 49)',
        argument:
          "Democrats push this where Republicans drew maps. When Democrats control redistricting, suddenly they're silent. It's selective outrage.",
      },
      {
        persona: 'Democratic strategist (Rachel Goldberg, 44)',
        argument:
          "Republicans have done this nationwide through REDMAP. Unilateral disarmament doesn't make sense. Fix it everywhere or nowhere.",
      },
      {
        persona: 'Rural representative (Rep. Earl Stockton, 58)',
        argument:
          "Compact districts sound nice, but my rural district has to be huge to get equal population. City people drawing maps don't understand rural representation.",
      },
      {
        persona: 'Skeptic of independence (Reginald Porter, 52)',
        argument:
          "Who picks the 'independent' commissioners? How is that not political? You're just hiding the politics behind a veneer of neutrality.",
      },
    ],
    evidence: [
      'California (commission since 2010): More competitive races, increased turnout in previously safe districts',
      'Arizona: Legal challenges, but commission survived; maps generally rated less gerrymandered',
      'Academic consensus: Gerrymandering reduces competition; independent commissions generally produce fairer maps',
      'Counter-evidence: Some commissions deadlock; "independent" is hard to operationalize',
    ],
    endorsing_orgs: ['Common Cause', 'League of Women Voters', 'RepresentUs'],
    opposing_orgs: ['State parties (when advantaged)', 'Some originalist legal groups'],
    order: 3,
  },
  {
    id: 'expand-voting-access',
    problemAreaId: 'democratic-reform',
    title: 'Expand Voting Access',
    summary:
      'Make it easier to vote through automatic registration, early voting, vote-by-mail, Election Day as a holiday, and removing barriers like strict ID requirements.',
    mechanism:
      'Automatic voter registration (opt-out, not opt-in). Same-day registration. Universal vote-by-mail (like Oregon, Washington, Colorado). Extended early voting periods. Make Election Day a federal holiday. Restore voting rights for people with felony convictions. Limit voter ID requirements or provide free IDs.',
    tradeoffs: {
      benefits: [
        'Higher participation, especially among marginalized groups',
        'Convenience reduces barriers for working people',
        'Modernizes outdated registration systems',
        'Every eligible citizen can vote easily',
        'Matches peer democracies',
      ],
      costs: [
        'Potential for fraud (disputed — see evidence)',
        'Vote-by-mail changes campaign dynamics',
        'Costs for election administration',
        "Those who don't vote by choice now counted as non-participants",
        'May benefit one party (disputed)',
      ],
    },
    source:
      'Oregon (vote-by-mail since 2000); Washington; Colorado; automatic registration in 20+ states; various federal proposals (John Lewis Voting Rights Act, Freedom to Vote Act)',
    voices_support: [
      {
        persona: 'Single mother (Keisha Brewer, 32)',
        argument:
          "I work two jobs. Polls close at 7. I can't stand in line for two hours. Mail voting means I can actually participate without losing a shift.",
      },
      {
        persona: 'Disability rights advocate (Gordon Teller, 47)',
        argument:
          "Polling places aren't always accessible. Voting by mail lets people with disabilities vote independently, privately, and without physical barriers.",
      },
      {
        persona: 'Election administrator (Brenda Halvorsen, 54)',
        argument:
          "We've had vote-by-mail for 25 years. No fraud problems. Higher turnout. Lower costs. I don't understand why other states make this so hard.",
      },
      {
        persona: 'Military veteran (Sgt. Devon Price, 34)',
        argument:
          "I voted by mail from Afghanistan. If it's secure enough for soldiers overseas, it's secure enough for civilians at home.",
      },
      {
        persona: 'Civil rights historian (Dr. Coretta Jennings, 56)',
        argument:
          "Every barrier to voting has a history of being used to exclude Black voters. Strict ID laws, limited polling places, registration hurdles — it's the same playbook.",
      },
      {
        persona: 'Young voter (Tyler Morrison, 22)',
        argument:
          "I moved three times in two years. Re-registering every time is a nightmare. Automatic registration would mean I'm always ready to vote where I live.",
      },
    ],
    voices_opposition: [
      {
        persona: 'Election security advocate (Nathan Everett, 49)',
        argument:
          "In-person voting with ID is auditable. Vote-by-mail creates chain-of-custody questions. I'm not saying fraud is rampant, but the system should be airtight.",
      },
      {
        persona: 'Conservative voter (Gary Hendricks, 61)',
        argument:
          "Voting should require a little effort. If you can't be bothered to show up with ID, maybe you shouldn't vote. Easy voting means uninformed voting.",
      },
      {
        persona: 'Republican state legislator (Rep. Wayne Ashford, 52)',
        argument:
          "Democrats push mail voting because it helps Democrats. This isn't about access — it's about advantage.",
      },
      {
        persona: 'Rural voter (Donna Blackwell, 57)',
        argument:
          "I like going to the polls on Election Day. It's a civic ritual. My whole community shows up. Making it a mail-in chore loses something important.",
      },
      {
        persona: 'Anti-fraud activist (Lorraine Tucker, 48)',
        argument:
          "I've seen ballot harvesting. I've seen nursing homes where staff 'help' residents vote. Mail voting makes this easier, not harder. One person, one vote requires verification.",
      },
      {
        persona: 'Traditionalist (Douglas Emory, 63)',
        argument:
          "Voting is a privilege and responsibility. Same-day registration, no ID, automatic enrollment — it cheapens citizenship. We're not trying to maximize turnout; we're trying to ensure legitimate elections.",
      },
    ],
    evidence: [
      'Oregon/Washington/Colorado: High turnout, very low fraud rates (<0.001%)',
      'Automatic registration states: Registration rates up 90%+, turnout modestly higher',
      'Voter ID studies: Strict ID reduces turnout by 2-3%, especially among minorities',
      "Fraud studies: Heritage Foundation database shows ~1,300 proven cases over 40 years out of billions of ballots — fraud is rare",
      "Partisan effects: Mixed evidence; mail voting doesn't consistently favor either party",
    ],
    endorsing_orgs: ['ACLU', 'Brennan Center for Justice', 'League of Women Voters'],
    opposing_orgs: ['Heritage Foundation', 'True the Vote'],
    order: 4,
  },
  {
    id: 'election-integrity-security',
    problemAreaId: 'democratic-reform',
    title: 'Election Integrity / Security',
    summary:
      'Ensure elections are secure and trustworthy through voter ID requirements, citizenship verification, audit trails, and limits on mail voting.',
    mechanism:
      'Require government-issued photo ID to vote. Verify citizenship during registration. Paper ballot backups for all electronic voting. Post-election audits (risk-limiting audits). Limit mail voting to those who request absentee. Regular voter roll maintenance (remove deceased, moved). Secure ballot chain of custody.',
    tradeoffs: {
      benefits: [
        'Increases public confidence in elections',
        'Clear verification of voter eligibility',
        'Paper trails enable auditing',
        'Standards for election administration',
        'Reduces theoretical fraud opportunity',
      ],
      costs: [
        'May suppress legitimate votes (ID barriers)',
        'Solutions in search of a problem (fraud is rare)',
        'Costs of implementation',
        'Unequal impact across communities',
        'May be motivated by partisan advantage',
      ],
    },
    source:
      'Georgia voting law (2021); various state ID requirements; CISA election security guidelines; bipartisan audit requirements',
    voices_support: [
      {
        persona: 'Election integrity advocate (Randall Simmons, 54)',
        argument:
          "You need ID to buy cold medicine, board a plane, or cash a check. Showing ID to vote isn't suppression — it's basic verification that every democracy uses.",
      },
      {
        persona: 'Small-government conservative (Wayne Holbrook, 58)',
        argument:
          "I trust local elections more than federal ones because I know the poll workers. Paper ballots, voter ID, chain of custody — keep it simple and verifiable.",
      },
      {
        persona: 'Immigrant naturalized citizen (Alejandra Montes, 48)',
        argument:
          "I worked years for citizenship. I want to know my vote isn't cancelled by someone here illegally. Citizenship verification protects what I earned.",
      },
      {
        persona: 'Cybersecurity expert (Dr. Frank Nakagawa, 44)',
        argument:
          "Election machines are a known vulnerability. Paper ballot backups, air-gapped systems, post-election audits — this isn't paranoia, it's basic security hygiene.",
      },
      {
        persona: 'Republican voter (Maria Delgado, 55)',
        argument:
          "I lost confidence in elections after 2020. Whether fraud was real or not, half the country has doubts. Strict procedures rebuild trust.",
      },
      {
        persona: 'Poll worker (Ed Schumacher, 68)',
        argument:
          "I've worked polls for 20 years. The rules have gotten looser. I've seen sketchy things. I can't prove fraud, but tighter controls would make me more confident.",
      },
    ],
    voices_opposition: [
      {
        persona: 'Voting rights attorney (DeShawn Williams, 43)',
        argument:
          "Voter ID laws are a solution to a problem that doesn't exist. In-person voter fraud is essentially zero. But these laws block thousands of legitimate voters — disproportionately Black and poor.",
      },
      {
        persona: 'Elderly voter (Beatrice Holloway, 84)',
        argument:
          "I've voted in every election since 1960. Now they tell me my expired license doesn't count and I need to go to DMV? I'm 84. This isn't security — it's harassment.",
      },
      {
        persona: 'Political scientist (Dr. Leonard Cross, 51)',
        argument:
          "Every study shows fraud is vanishingly rare. These laws are pretextual — they're designed to reduce turnout among Democratic constituencies. The history is explicit.",
      },
      {
        persona: 'Native American voter (Kara Whitefeather, 38)',
        argument:
          "My reservation doesn't have street addresses. The state says I need a residential address on my ID. This isn't about security — it's about keeping us from voting.",
      },
      {
        persona: 'ACLU lawyer (Monica Patterson, 41)',
        argument:
          "Georgia shortened early voting, limited drop boxes, and made it illegal to give water to people in line — right after Black turnout surged. The intent is clear.",
      },
      {
        persona: 'Election administrator (Vera Hutchinson, 52)',
        argument:
          "Unfunded mandates. The state passes laws requiring new equipment, new procedures, new audits — and sends no money. My budget is already stretched.",
      },
    ],
    evidence: [
      'Voter ID impact: Studies show 2-3% turnout reduction; larger effects on minority and elderly voters',
      'Fraud prevalence: Multiple comprehensive studies find fraud rate below 0.001%',
      "Confidence paradox: Strict ID states don't have higher confidence in elections; partisan media matters more",
      'International: Most democracies have voter ID, but also automatic registration and national ID systems (US lacks context)',
      'Security: CISA consistently affirms 2020 and 2024 elections were secure; paper ballot improvements are bipartisan',
    ],
    endorsing_orgs: ['Heritage Foundation', 'True the Vote', 'Election Assistance Commission (for audits)'],
    opposing_orgs: ['ACLU', 'NAACP', 'Brennan Center'],
    order: 5,
  },
];
