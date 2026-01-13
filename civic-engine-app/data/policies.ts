import { Policy } from '../types/policy';

/**
 * Real consensus policy data from "The Hidden Consensus" Report (2025) & "The Converging Center" (2025)
 * Sources: Program for Public Consultation (PPC), Gallup, Pew Research, Voice of the People.
 * All policies listed have supermajority bipartisan support or strong cross-partisan consensus.
 */

export const policies: Policy[] = [
  // --- POLICIES MAPPED TO PROBLEM AREAS ---
  {
    id: 'congress-stock-ban',
    rank: 2,
    title: 'Ban Congressional Stock Trading',
    description: 'Members of Congress are making millions trading stocks while writing the laws that move markets. They vote on legislation affecting companies they own shares in. This isn\'t just unethical; it\'s corruption in plain sight. When both parties overwhelmingly agree on something, it should be law. Congress should serve the people, not their portfolios.',
    category: 'governance',
    scope: 'federal',
    icon: 'Ban',
    averageSupport: 86,
    partySupport: {
      democrats: 88,
      republicans: 87,
      independents: 81,
    },
    sources: [
      {
        organization: 'Voice of the People / PPC',
        title: 'Congressional Ethics Survey',
        url: 'https://vop.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    notes: [
      'Most leading reform bills and advocacy campaigns extend the ban to spouses and dependents, which aligns with public expectations about closing proxy-trading loopholes and contributes to the high approval.',
    ],
    details: [
      {
        title: 'Blind Trusts Mandate',
        description: 'Lawmakers must divest assets or place them in a Qualified Blind Trust managed by an independent trustee.',
      },
      {
        title: 'Family Inclusion',
        description: 'The ban extends to spouses and dependent children to prevent proxy trading.',
      },
    ],
    resourceFlow: {
      from: 'Legislators (relinquishing portfolio control)',
      to: 'Institutional Legitimacy',
      channel: 'Ethics legislation (Blind Trust requirement)',
    },
    ifThen: [
      'If elected, you must sell individual stocks or move them to a blind trust',
      'If you hold office, you cannot profit from non-public information about the economy',
      'If you violate the rule, you face significant financial penalties',
    ],
    causalChain: {
      immediate: 'Prohibit individual stock trading by officials and their families',
      outcome: 'Eliminates conflicts of interest and disproves the "rigged system" narrative',
    },
    commonQuestions: [
      {
        question: 'Can they still invest?',
        answer: 'Yes, they can invest in broad, diversified mutual funds or index funds (like the S&P 500).',
      },
      {
        question: 'Why include spouses?',
        answer: 'Data shows high support for spousal bans because otherwise, members could simply direct trades through their husbands or wives.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-02-15',
    problemAreaId: 'democratic-reform',
    approachId: 'campaign-finance-reform',
  },
  {
    id: 'congress-term-limits',
    rank: 3,
    title: 'Congressional Term Limits',
    description: 'Career politicians have turned public service into a lifetime appointment. The average Senator is 65 years old. Some have held power for four decades while the country\'s problems only grow worse. Americans overwhelmingly want fresh voices and new ideas in Congress. Term limits ensure our representatives focus on solving problems, not protecting their seats.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 83,
    partySupport: {
      democrats: 80,
      republicans: 86,
      independents: 84,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Constitutional Reform Survey',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 83,
      },
    ],
    notes: [
      'Specifically refers to the 4 House (8 years) / 2 Senate (12 years) term-limit model favored by voters.',
    ],
    details: [
      {
        title: 'The 4-House / 2-Senate Model',
        description: 'The public specifically favors limiting House members to 4 terms and Senators to 2 terms.',
      },
      {
        title: 'Constitutional Path',
        description: 'Requires a Constitutional Amendment to bypass previous Supreme Court rulings.',
      },
    ],
    resourceFlow: {
      from: 'Incumbent Power',
      to: 'New Representation',
      channel: 'Article V Constitutional Amendment',
    },
    ifThen: [
      'If a Representative serves 8 years, they cannot run for the House again',
      'If passed, leadership turnover becomes regular and mandatory',
      'If enacted, the "career politician" model is structurally eliminated',
    ],
    causalChain: {
      immediate: 'Ratify Amendment limiting legislative tenure',
      outcome: 'Reduces gerontocracy and encourages legislators to focus on immediate problem-solving rather than career maintenance',
    },
    commonQuestions: [
      {
        question: 'Doesn\'t this remove experience?',
        answer: 'Voters overwhelmingly reject this argument, preferring "fresh blood" and responsiveness over institutional tenure.',
      },
      {
        question: 'Is it retroactive?',
        answer: 'Most viable proposals grandfather in current terms to ensure passage, starting the "clock" on the next election.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-01-20',
    problemAreaId: 'democratic-reform',
  },
  {
    id: 'medicare-drug-negotiation',
    rank: 5,
    title: 'Universal Drug Price Negotiation',
    description: 'Americans pay more for prescription drugs than any other country on Earth, often 2-3 times more for the exact same medication. Seniors are cutting pills in half. Families are rationing insulin. Meanwhile, pharmaceutical companies spend more on marketing than research. Every other developed nation negotiates drug prices. It\'s time America stopped being the world\'s piggy bank for Big Pharma.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Pill',
    averageSupport: 85,
    partySupport: {
      democrats: 92,
      republicans: 77,
      independents: 89,
    },
    sources: [
      {
        organization: 'KFF Health Tracking Poll',
        title: 'Prescription Drug Priorities',
        url: 'https://kff.org',
        year: 2024,
        supportPercentage: 85,
      },
    ],
    notes: [
      'Refers to universal negotiation across all drugs, not only the limited set authorized in the IRA.',
    ],
    details: [
      {
        title: 'Universal Authority',
        description: 'Expand negotiation beyond the limited list in the IRA to cover all high-cost drugs.',
      },
      {
        title: 'Inflation Penalties',
        description: 'Impose tax penalties on drug companies that raise prices faster than inflation.',
      },
    ],
    resourceFlow: {
      from: 'Pharmaceutical Revenues',
      to: 'Seniors & Taxpayers',
      channel: 'Government purchasing power',
    },
    ifThen: [
      'If a drug company sells to Medicare, they must agree to a negotiated fair price',
      'If a drug price rises 10% when inflation is 3%, the company pays a penalty',
      'If enacted, out-of-pocket costs for seniors decrease significantly',
    ],
    causalChain: {
      immediate: 'Authorize Medicare to negotiate all drug prices',
      outcome: 'Reduces federal spending and lowers cost of living for patients',
    },
    commonQuestions: [
      {
        question: 'Do Republicans support this?',
        answer: 'Yes. 77% of Republicans favor negotiation, viewing current prices as a result of monopoly power rather than free markets.',
      },
      {
        question: 'Will it hurt innovation?',
        answer: 'Pharma argues yes. Proponents note that marketing budgets often exceed R&D, and taxpayer grants fund much early-stage research.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-09-01',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-price-regulation',
  },
  {
    id: 'campaign-finance-disclosure',
    rank: 8,
    title: 'Mandate "Dark Money" Disclosure',
    description: 'Billions of dollars flow into our elections from anonymous donors. You have no idea who\'s trying to buy your vote. Foreign money is seeping into state ballot initiatives. This isn\'t democracy; it\'s an auction. Americans across the political spectrum believe you have the right to know who\'s paying for political ads. Transparency isn\'t partisan; it\'s patriotic.',
    category: 'governance',
    scope: 'federal',
    icon: 'Eye',
    averageSupport: 85,
    partySupport: {
      democrats: 88,
      republicans: 83,
      independents: 88,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Campaign Finance Report',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 85,
      },
    ],
    notes: [
      'Represents support for the DISCLOSE Act and for banning foreign funding of ballot initiatives',
    ],
    details: [
      {
        title: 'Foreign Spending Ban',
        description: 'Strong bipartisan support for banning foreign entities from funding state ballot initiatives (closing a current loophole).',
      },
      {
        title: 'Transparency',
        description: 'Voters demand the right to know who is paying for political advertisements.',
      },
    ],
    resourceFlow: {
      from: 'Anonymous Special Interests',
      to: 'Public Awareness',
      channel: 'Federal Disclosure Mandates',
    },
    ifThen: [
      'If a Super PAC spends millions on ads, they must list their top donors',
      'If a foreign entity tries to fund a ballot measure, they are blocked',
      'If you see a political ad, you can trace exactly who paid for it',
    ],
    causalChain: {
      immediate: 'Require disclosure of donors >$10k and ban foreign ballot funding',
      outcome: 'Reduces hidden influence and protects election sovereignty',
    },
    commonQuestions: [
      {
        question: 'Does this limit free speech?',
        answer: 'No. It regulates transparency, not speech. You can still spend money, you just have to identify yourself.',
      },
      {
        question: 'Why ballot measures?',
        answer: 'Current law bans foreign money for candidates but is looser on "issues," creating a national security vulnerability voters want closed.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-05-01',
    problemAreaId: 'democratic-reform',
    approachId: 'campaign-finance-reform',
  },
  {
    id: 'vocational-training',
    rank: 10,
    title: 'Invest in Vocational Training',
    description: 'We\'ve spent decades telling every kid they need a four-year degree while ignoring the electricians, welders, and technicians who keep this country running. The result? Crushing student debt and millions of unfilled skilled jobs. It\'s time to honor work again. Trade schools and apprenticeships deserve the same investment and respect as universities.',
    category: 'education',
    scope: 'federal',
    icon: 'Hammer',
    averageSupport: 82,
    partySupport: {
      democrats: 88,
      republicans: 80,
      independents: 78,
    },
    sources: [
      {
        organization: 'National Skills Coalition',
        title: 'Public Perspectives Poll',
        url: 'https://nationalskillscoalition.org',
        year: 2025,
        supportPercentage: 82,
      },
    ],
    notes: [
      'Emphasizes funding for skills training, apprenticeships, and short-term credentials over traditional 4-year degrees.',
    ],
    details: [
      {
        title: 'Skills Over Degrees',
        description: '92% support making it easier for employers to hire based on skills rather than college degrees.',
      },
      {
        title: 'Pell Grant Expansion',
        description: 'Support for allowing Pell Grants to cover short-term credential programs (e.g., welding, coding).',
      },
    ],
    resourceFlow: {
      from: 'Traditional Degree Funding',
      to: 'Apprenticeships & Trade Skills',
      channel: 'Dept of Education & Labor Grants',
    },
    ifThen: [
      'If you want to be a welder, you can use federal grants for your certification',
      'If you have skills but no degree, you are eligible for federal contract jobs',
      'If companies hire apprentices, they receive tax incentives',
    ],
    causalChain: {
      immediate: 'Fund short-term credentialing and drop degree mandates',
      outcome: 'Closes the skills gap, reduces student debt, and boosts economic mobility for non-college workers',
    },
    commonQuestions: [
      {
        question: 'Is this anti-college?',
        answer: 'No, it levels the playing field, ensuring trade education receives support comparable to traditional universities.',
      },
      {
        question: 'Who benefits?',
        answer: 'Employers (who need skilled workers) and the working class (who need debt-free career pathways).',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-06-01',
    problemAreaId: 'economic-opportunity',
    approachId: 'economy-job-training',
  },

  {
    id: 'free-easy-voter-id',
    rank: 13,
    title: 'Free and Easy Voter ID',
    description: 'Here\'s a compromise both parties should embrace: require ID to vote, but make getting that ID completely free and easy. Republicans get election security. Democrats get guaranteed access. No American should have to pay to exercise their right to vote, because that\'s a poll tax. This simple solution ends the partisan fighting and protects everyone\'s voice.',
    category: 'governance',
    scope: 'federal',
    icon: 'IdCard',
    averageSupport: 81,
    partySupport: {
      democrats: 69,
      republicans: 95,
      independents: 80,
    },
    sources: [
      {
        organization: 'Pew Research Center',
        title: 'Election Security Poll',
        url: 'https://pewresearch.org',
        year: 2025,
        supportPercentage: 81,
      },
    ],
    notes: [
      '81% support voter ID requirements. This policy adds the condition that IDs and necessary documents must be free and accessible so it does not function as a poll tax. The "Grand Compromise": Republicans get security (ID requirement), Democrats get access (Free/Easy mandate).',
    ],
    details: [
      {
        title: 'Eliminate Costs',
        description: 'States must waive fees for ID cards and underlying documents like birth certificates',
      },
      {
        title: 'Accessibility',
        description: 'Requires mobile DMV units and extended hours to reach rural/working-class voters',
      },
    ],
    resourceFlow: {
      from: 'State Bureaucracy',
      to: 'Voter Enfranchisement',
      channel: 'Federal Election Standards',
    },
    ifThen: [
      'If you need an ID to vote, the state must give it to you for free',
      'If you live in a rural area, mobile ID units will visit your community',
      'If implemented, arguments about "voter suppression" vs "fraud" are neutralized',
    ],
    causalChain: {
      immediate: 'Mandate free access to voter IDs',
      outcome: 'Secures elections while preventing economic disenfranchisement',
    },
    commonQuestions: [
      {
        question: 'Who pays for it?',
        answer: 'The state or federal government covers the cost of the ID to ensure it is not a "poll tax"',
      },
      {
        question: 'Is this bipartisan?',
        answer: 'Yes. 81% support it. Partisans disagree on the *burden* of ID, not the ID itself.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-04-20',
    problemAreaId: 'democratic-reform',
    approachId: 'expand-voting-access',
  },
  {
    id: 'childcare-tax-credit',
    rank: 15,
    title: 'Expand Child Tax Credit',
    description: 'Childcare now costs more than college tuition in most states. Parents are being forced to choose between their careers and their kids. When we expanded the Child Tax Credit in 2021, child poverty dropped nearly in half. Then Congress let it expire and child poverty spiked back up. Investing in families works. Every child deserves a fair start.',
    category: 'economy',
    scope: 'federal',
    icon: 'Baby',
    averageSupport: 85,
    partySupport: {
      democrats: 92,
      republicans: 76,
      independents: 84,
    },
    sources: [
      {
        organization: 'First Five Years Fund',
        title: 'Child Care Poll',
        url: 'https://ffyf.org',
        year: 2025,
        supportPercentage: 85,
      },
    ],
    notes: [
      'Viewed as "economic infrastructure" enabling workforce participation',
    ],
    details: [
      {
        title: 'Workforce Enabler',
        description: 'Allows parents to remain in the workforce by offsetting the high cost of care',
      },
      {
        title: 'Poverty Reduction',
        description: 'Previous expansions cut child poverty nearly in half.',
      },
    ],
    resourceFlow: {
      from: 'Federal Tax Revenue',
      to: 'Working Families',
      channel: 'IRS Tax Credits',
    },
    ifThen: [
      'If you have a child, you receive a larger tax credit to help pay for care',
      'If you are a parent, you can afford to keep your job instead of staying home',
      'If implemented, child poverty rates decline significantly',
    ],
    causalChain: {
      immediate: 'Expand tax credits for families',
      outcome: 'Boosts labor participation and improves long-term outcomes for children',
    },
    commonQuestions: [
      {
        question: 'Is this welfare?',
        answer: 'Proponents frame it as a tax cut for families and an investment in the future workforce.',
      },
      {
        question: 'How much is it?',
        answer: 'Proposals range, but often target ~$3,000-$4,000 per child',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-03-20',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-tax-credits',
  },
  {
    id: 'scotus-term-limits',
    rank: 16,
    title: 'Supreme Court Term Limits (18 Years)',
    description: 'Supreme Court vacancies have become apocalyptic political battles because the stakes are impossibly high. A single death or retirement can reshape American law for a generation. The current system incentivizes presidents to appoint young ideologues who might serve 40 years. Regular 18-year terms would lower the temperature, ensure the Court evolves with the country, and give every president a fair number of appointments.',
    category: 'governance',
    scope: 'federal',
    icon: 'Scale',
    averageSupport: 78,
    partySupport: {
      democrats: 82,
      republicans: 57,
      independents: 70,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Judicial Reform Survey',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 78,
      },
    ],
    notes: [
      'Establishes a regular schedule of appointments to lower the political stakes of vacancies',
    ],
    details: [
      {
        title: 'Regular Appointments',
        description: 'Guarantees every President gets 2 appointments per term, ending the "actuarial lottery"',
      },
      {
        title: 'Senior Status',
        description: 'After 18 years, Justices move to "senior status" on lower courts, preserving their lifetime judicial appointment',
      },
    ],
    resourceFlow: {
      from: 'Lifetime Tenure',
      to: 'Regular Rotation',
      channel: 'Legislative Act (Good Behavior Clause interpretation)',
    },
    ifThen: [
      'If a Justice serves 18 years, they rotate off the Supreme Court',
      'If a President serves one term, they appoint exactly two Justices',
      'If implemented, confirmation battles become less apocalyptic',
    ],
    causalChain: {
      immediate: 'Limit active SCOTUS service to 18 years',
      outcome: 'Ensures the Court reflects evolving constitutional values and lowers political temperature',
    },
    commonQuestions: [
      {
        question: 'Is this constitutional?',
        answer: 'Debated. Proponents argue "good behavior" allows for senior status rotation; opponents say it requires an Amendment',
      },
      {
        question: 'Does it affect current Justices?',
        answer: 'Most proposals apply prospectively to future justices to avoid legal challenges.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-02-28',
    problemAreaId: 'democratic-reform',
  },
  {
    id: 'ultra-millionaire-tax',
    rank: 17,
    title: 'Ultra-Millionaire Wealth Tax',
    description: 'In 1990, there were 66 billionaires in America. Today, there are over 900. Their wealth grew by $2 trillion during the pandemic alone while working families struggled to pay rent. A modest 2% tax on wealth over $50 million affects only the top 0.1% and would fund schools, healthcare, and infrastructure for everyone else. The ultra-wealthy can afford to contribute more to the country that made their fortunes possible.',
    category: 'economy',
    scope: 'federal',
    icon: 'DollarSign',
    averageSupport: 67,
    partySupport: {
      democrats: 85,
      republicans: 50,
      independents: 65,
    },
    sources: [
      {
        organization: 'Data for Progress; other wealth tax polls',
        title: 'Wealth Tax Polling (2023-2025)',
        url: 'https://www.dataforprogress.org',
        year: 2025,
        supportPercentage: 67,
      },
    ],
    notes: [
      'Targets extreme wealth accumulation; specifically affects only the top 0.1%',
    ],
    details: [
      {
        title: 'Targeted Revenue',
        description: 'Applies only to assets >$50M, avoiding the "mere" upper-middle class',
      },
      {
        title: 'Fairness',
        description: 'Driven by the belief that the tax code currently favors capital over labor',
      },
    ],
    resourceFlow: {
      from: 'Ultra-Wealthy Asset Holders',
      to: 'Public Investment',
      channel: 'IRS Wealth Tax',
    },
    ifThen: [
      'If you have $49 million, you pay $0 in wealth tax',
      'If you have $1 billion, you contribute 3% annually on the excess',
      'If enacted, it generates significant revenue for housing and healthcare',
    ],
    causalChain: {
      immediate: 'Levy tax on extreme wealth',
      outcome: 'Reduces inequality and funds public goods',
    },
    commonQuestions: [
      {
        question: 'Is it constitutional?',
        answer: 'Likely to face Supreme Court challenges regarding "direct taxes." Supporters argue it is constitutional; opponents disagree.',
      },
      {
        question: 'Will the wealthy leave?',
        answer: 'Proposals often include "exit taxes" to prevent capital flight.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-03-15',
    problemAreaId: 'economic-opportunity',
  },
  {
    id: 'end-citizens-united',
    rank: 18,
    title: 'End Corporate Personhood',
    description: 'The Supreme Court ruled that corporations have the same rights as people and that unlimited political spending is "free speech." The result? Billionaires and corporations now drown out the voices of ordinary Americans. Our democracy wasn\'t designed to be for sale to the highest bidder. A constitutional amendment can restore the basic principle that government should serve people, not corporations.',
    category: 'governance',
    scope: 'federal',
    icon: 'Building',
    averageSupport: 72,
    partySupport: {
      democrats: 85,
      republicans: 60,
      independents: 75,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Campaign Finance Report',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 72,
      },
    ],
    notes: [
      'Widely viewed as a necessary precursor to meaningful campaign finance reform.',
    ],
    details: [
      {
        title: 'Human Rights Only',
        description: 'Clarifies that Constitutional rights belong to natural persons, not artificial entities',
      },
      {
        title: 'Regulate Spending',
        description: 'Allows Congress to limit political spending without violating the First Amendment',
      },
    ],
    resourceFlow: {
      from: 'Corporate Political Treasuries',
      to: 'Voter Sovereignty',
      channel: 'Constitutional Amendment',
    },
    ifThen: [
      'If passed, Congress can place limits on corporate election spending',
      'If enacted, "Super PACs" can be regulated or banned',
      'If implemented, corporations lose the right to unlimited political speech',
    ],
    causalChain: {
      immediate: 'Ratify Amendment defining personhood',
      outcome: 'Restores ability to regulate campaign finance and reduces corporate influence',
    },
    commonQuestions: [
      {
        question: 'Is this hard to pass?',
        answer: 'Yes. Amendments require 2/3 of Congress and 3/4 of states. However, support is high.',
      },
      {
        question: 'Does this ban lobbying?',
        answer: 'No, but it allows for stricter regulation of lobbying expenditures.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-05-01',
    problemAreaId: 'democratic-reform',
    approachId: 'campaign-finance-reform',
  },
  {
    id: 'minimum-wage-17',
    rank: 22,
    title: 'Raise Minimum Wage ($17)',
    description: 'If you work full-time in America, you shouldn\'t live in poverty. But the federal minimum wage has been $7.25 since 2009, and its purchasing power is at a 66-year low. Meanwhile, CEO pay has skyrocketed. A $17 minimum wage indexed to inflation isn\'t radical; it\'s restoring the basic promise that hard work should pay off. No one working 40 hours a week should need food stamps to survive.',
    category: 'economy',
    scope: 'federal',
    icon: 'TrendingUp',
    averageSupport: 70,
    partySupport: {
      democrats: 90,
      republicans: 48,
      independents: 72,
    },
    sources: [
      {
        organization: 'The Harris Poll and others',
        title: 'Minimum Wage Survey',
        url: 'https://theharrispoll.com',
        year: 2025,
        supportPercentage: 70,
      },
    ],
    notes: [
      'Harris and others find ~80% support for raising the federal minimum wage in general; the exact preferred level varies by poll. Approximately 70% support raising it toward a living wage (~$15-17 range). 63% support indexing to inflation.',
    ],
    details: [
      {
        title: 'Inflation Indexing',
        description: 'Automatically adjusts the wage based on cost of living, removing the need for constant legislation',
      },
      {
        title: 'Living Standard',
        description: '72% agree a full-time job should keep a worker above the poverty line',
      },
    ],
    resourceFlow: {
      from: 'Corporate Profits',
      to: 'Low-Wage Workers',
      channel: 'Federal Wage Mandate',
    },
    ifThen: [
      'If you work minimum wage, your pay increases gradually to $17',
      'If inflation goes up, your wage automatically adjusts',
      'If enacted, the subminimum wage for tipped workers is eliminated ',
    ],
    causalChain: {
      immediate: 'Raise wage floor and index it',
      outcome: 'Reduces poverty and reliance on social safety nets',
    },
    commonQuestions: [
      {
        question: 'Will this cause inflation?',
        answer: 'Economists debate this. Proponents argue it boosts demand; opponents argue it raises prices.',
      },
      {
        question: 'Why $17?',
        answer: 'Reflects inflation since the "Fight for $15" began. In high-cost areas, demand is even higher',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-02-10',
    problemAreaId: 'economic-opportunity',
    approachId: 'economy-raise-minimum-wage',
  },
  {
    id: 'public-option-healthcare',
    rank: 23,
    title: 'Healthcare Public Option',
    description: 'Healthcare in America is rationed by wealth. Millions skip care because they can\'t afford it. Insurance companies deny claims to boost profits. A public option gives everyone a choice: keep your private insurance if you like it, or buy into a nonprofit alternative. Competition lowers costs. Nobody gets kicked off their plan. And no American has to choose between bankruptcy and treatment.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'HeartPulse',
    averageSupport: 65,
    partySupport: {
      democrats: 85,
      republicans: 48,
      independents: 65,
    },
    sources: [
      {
        organization: 'KFF',
        title: 'Health Reform Poll',
        url: 'https://kff.org',
        year: 2019,
        supportPercentage: 65,
      },
    ],
    notes: [
      'KFF 2019 found about 65% support for a public option. Other polls (2019-2020) show similar levels (~65-67%). The preferred vehicle for universal coverage, bridging the gap between ACA and Single Payer.',
    ],
    details: [
      {
        title: 'Competition',
        description: 'Introduces a non-profit competitor to drive down private premiums',
      },
      {
        title: 'Safety Net',
        description: 'Ensures everyone has an affordable option without banning private insurance',
      },
    ],
    resourceFlow: {
      from: 'Private Insurance Monopoly',
      to: 'Public Choice',
      channel: 'Medicare/ACA Exchange Expansion',
    },
    ifThen: [
      'If you don\'t like your private plan, you can buy into the public option',
      'If private insurers charge too much, they lose customers to the public plan',
      'If enacted, universal coverage is achieved voluntarily',
    ],
    causalChain: {
      immediate: 'Establish public health insurance plan',
      outcome: 'Lowers costs through competition and guarantees coverage access',
    },
    commonQuestions: [
      {
        question: 'Is this "Medicare for All"?',
        answer: 'No. It is optional. Medicare for All typically replaces private insurance; this competes with it.',
      },
      {
        question: 'Do Republicans support it?',
        answer: 'Surprisingly, yes (approx 50%), as it preserves choice while addressing costs',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-09-05',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-public-option',
  },
  {
    id: 'affordable-housing-supply',
    rank: 26,
    title: 'Affordable Housing Supply (NHIA)',
    description: 'Housing costs are crushing American families. Young people can\'t afford to buy homes. Renters face impossible choices. The core problem is simple: we\'re not building enough. The solution isn\'t just subsidies for renters; it\'s incentivizing construction in neighborhoods that need revitalization. More starter homes means more families can build wealth and more communities can thrive.',
    category: 'economy',
    scope: 'federal',
    icon: 'Home',
    averageSupport: 71,
    partySupport: {
      democrats: 80,
      republicans: 64,
      independents: 70,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Housing Policy Survey',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    notes: [
      'Focuses on supply-side incentives (building homes) rather than just subsidies',
    ],
    details: [
      {
        title: 'Appraisal Gap Fix',
        description: 'Covers the difference between construction cost and market value in distressed areas',
      },
      {
        title: 'Owner-Occupied',
        description: 'Credits are restricted to homes sold to residents, not corporate investors',
      },
    ],
    resourceFlow: {
      from: 'Tax Credits',
      to: 'New Housing Inventory',
      channel: 'Neighborhood Homes Investment Act',
    },
    ifThen: [
      'If a developer fixes up a blighted home, they get a tax credit to make it profitable',
      'If you are a buyer, more starter homes become available',
      'If enacted, neighborhoods are revitalized without gentrifying displacement',
    ],
    causalChain: {
      immediate: 'Incentivize construction of starter homes',
      outcome: 'Increases housing supply and lowers costs',
    },
    commonQuestions: [
      {
        question: 'Does this help renters?',
        answer: 'Indirectly, by freeing up rental units as people buy homes. Other policies (LIHTC) target rentals directly.',
      },
      {
        question: 'Is this NIMBY?',
        answer: 'No, it fights NIMBYism. 71% believe more affordable housing makes communities better',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-07-15',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-zoning-reform',
  },
  {
    id: 'mental-health-988',
    rank: 27,
    title: '988 Mental Health Lifeline',
    description: 'Mental health is healthcare. When someone is in crisis, they need immediate help, not a busy signal or a transfer to police. The 988 Lifeline saves lives, but it needs sustainable funding and specialized support for vulnerable populations. We send mobile crisis teams instead of armed officers. We connect people to care instead of jail cells. This is how we treat mental health like the emergency it is.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Phone',
    averageSupport: 64,
    partySupport: {
      democrats: 72,
      republicans: 50,
      independents: 60,
    },
    sources: [
      {
        organization: 'NAMI / Ipsos',
        title: 'Mental Health Priorities',
        url: 'https://nami.org',
        year: 2025,
        supportPercentage: 64,
      },
    ],
    notes: [
      '64% prioritize mental health funding; 74% awareness of 988 in 2025',
    ],
    details: [
      {
        title: 'Georouting',
        description: 'Routes calls to local centers based on location, not area code, for better response',
      },
      {
        title: 'Specialized Care',
        description: 'Debate centers on dedicated support for LGBTQ+ youth ("Press 3")',
      },
    ],
    resourceFlow: {
      from: 'Telecom Fees / Federal Grants',
      to: 'Crisis Call Centers',
      channel: '988 Lifeline Network',
    },
    ifThen: [
      'If you dial 988, you connect to a counselor near you',
      'If funding is stable, wait times decrease',
      'If specialized options exist, vulnerable youth get targeted help',
    ],
    causalChain: {
      immediate: 'Fund and optimize 988 infrastructure',
      outcome: 'Reduces suicide rates and police involvement in mental health crises',
    },
    commonQuestions: [
      {
        question: 'Who pays for it?',
        answer: 'A mix of federal grants and state telecom fees (like 911)',
      },
      {
        question: 'Does it involve police?',
        answer: 'The goal is to send mobile crisis teams, not police, unless there is an imminent safety threat.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-30',
    problemAreaId: 'healthcare-costs',
  },
  {
    id: 'universal-pre-k',
    rank: 29,
    title: 'Universal Pre-K',
    description: 'By the time kids from poor families start kindergarten, they\'re already behind. Early education closes that gap and lets parents work. Oklahoma, one of the reddest states, has had universal pre-K for over 20 years with remarkable results. This isn\'t daycare; it\'s giving every child the foundation they need to succeed. The research is clear: investing early pays off for a lifetime.',
    category: 'education',
    scope: 'federal',
    icon: 'BookOpen',
    averageSupport: 70,
    partySupport: {
      democrats: 88,
      republicans: 53,
      independents: 70,
    },
    sources: [
      {
        organization: 'Gallup',
        title: 'Federal Pre-K Funding Poll',
        url: 'https://news.gallup.com',
        year: 2024,
        supportPercentage: 70,
      },
    ],
    notes: [
      'Red states like Oklahoma demonstrate success; viewed as "educational preparedness"',
    ],
    details: [
      {
        title: 'Economic ROI',
        description: 'Enables parents to work and improves long-term student outcomes',
      },
      {
        title: 'State Momentum',
        description: 'Voters in states like New Mexico have approved funding with 70% support',
      },
    ],
    resourceFlow: {
      from: 'Federal/State Partnership',
      to: 'Early Childhood Centers',
      channel: 'Education Grants',
    },
    ifThen: [
      'If you have a 4-year-old, they can attend pre-K for free',
      'If parents have access to pre-K, they can return to the workforce',
      'If implemented, achievement gaps shrink',
    ],
    causalChain: {
      immediate: 'Fund universal access to pre-K',
      outcome: 'Boosts economy and educational attainment',
    },
    commonQuestions: [
      {
        question: 'Is it mandatory?',
        answer: 'No. It is an option for parents, not a requirement.',
      },
      {
        question: 'Is it just daycare?',
        answer: 'No. It follows an educational curriculum to prepare kids for kindergarten.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-05-25',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-universal-pre-k',
  },
  {
    id: 'buy-american',
    rank: 30,
    title: '"Buy American" Mandates',
    description: 'When taxpayers fund a bridge, the steel should be American. We shipped our manufacturing overseas for decades, hollowing out communities and leaving us dependent on foreign supply chains. The pandemic showed us the cost of that mistake. Rebuilding American industry means good jobs, stronger communities, and a more secure nation. Your tax dollars should build American prosperity.',
    category: 'economy',
    scope: 'federal',
    icon: 'Factory',
    averageSupport: 75,
    partySupport: {
      democrats: 65,
      republicans: 72,
      independents: 70,
    },
    sources: [
      {
        organization: 'Cato Institute / Reuters',
        title: 'Industrial Policy Survey',
        url: 'https://cato.org',
        year: 2025,
        supportPercentage: 75,
      },
    ],
    notes: [
      'Combines "America First" nationalism with pro-labor manufacturing policy',
    ],
    details: [
      {
        title: 'Thresholds',
        description: 'Requires 75% domestic content by 2029 for federal projects',
      },
      {
        title: 'Broad Appeal',
        description: 'Republicans support it for jobs; Democrats for labor/environmental standards',
      },
    ],
    resourceFlow: {
      from: 'Infrastructure Spending',
      to: 'US Manufacturing Base',
      channel: 'Build America, Buy America Act',
    },
    ifThen: [
      'If a bridge is built with federal money, the steel must be American',
      'If a company wants a government contract, they must manufacture here',
      'If enacted, domestic industrial capacity grows',
    ],
    causalChain: {
      immediate: 'Mandate domestic procurement',
      outcome: 'Reshores manufacturing but may increase project costs',
    },
    commonQuestions: [
      {
        question: 'Does it cost more?',
        answer: 'Often yes. Critics argue it fuels inflation; supporters say it builds resilience',
      },
      {
        question: 'What about allies?',
        answer: 'It causes friction with trade partners (EU/Asia), requiring diplomatic waivers',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-06-01',
    problemAreaId: 'economic-opportunity',
  },

  // ===========================================
  // POLICIES WITH FULL METHODOLOGY
  // These have detailed evidence-based V2 scoring
  // ===========================================

  {
    id: 'universal-basic-income',
    rank: 31,
    title: 'Universal Basic Income (UBI)',
    description: 'Work is changing. Automation is accelerating. And our safety net was built for a different era. A Universal Basic Income gives everyone a floor to stand on: the freedom to leave a bad job, start a business, care for family, or weather hard times. It\'s not about replacing work; it\'s about giving people the security to take risks and live with dignity. Alaska has done it for decades. It\'s time to think bigger.',
    category: 'economy',
    scope: 'federal',
    icon: 'Wallet',
    averageSupport: 55,
    partySupport: {
      democrats: 65,
      republicans: 42,
      independents: 58,
    },
    sources: [
      {
        organization: 'Various Polling (Gallup, Hill-HarrisX)',
        title: 'Universal Basic Income Polling',
        url: 'https://news.gallup.com',
        year: 2025,
        supportPercentage: 55,
      },
    ],
    notes: [
      'Full methodology available with detailed 13-factor analysis. Score varies widely by framing and amount.',
    ],
    details: [
      {
        title: 'Cash Freedom',
        description: 'Individuals decide how to spend based on their local knowledge, avoiding bureaucratic decision-making.',
      },
      {
        title: 'Automatic Stabilizer',
        description: 'Payments continue regardless of employment, maintaining consumer demand during recessions.',
      },
    ],
    resourceFlow: {
      from: 'Tax Revenue (varies by funding mechanism)',
      to: 'All Citizens',
      channel: 'Direct cash transfer',
    },
    ifThen: [
      'If you are a citizen, you receive the same monthly payment as everyone else',
      'If you lose your job, your UBI continues without interruption',
      'If you want to start a business or leave a bad job, you have a cushion',
    ],
    causalChain: {
      immediate: 'Distribute equal cash payments to all adults',
      outcome: 'Eliminates extreme poverty, provides "F-you money" for freedom from exploitation',
    },
    commonQuestions: [
      {
        question: 'How is it funded?',
        answer: 'Proposals vary: income tax, VAT, land value tax, carbon tax, or wealth tax. The funding mechanism affects how progressive/equitable it is.',
      },
      {
        question: 'Won\'t people stop working?',
        answer: 'Pilots show minimal work reduction. UBI provides security to take risks, train, or care for family.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    hasV2Methodology: true,
    problemAreaId: 'economic-opportunity',
    approachId: 'economy-universal-basic-income',
  },
  {
    id: 'federal-job-guarantee',
    rank: 32,
    title: 'Federal Job Guarantee',
    description: 'If you want to work, you should be able to work. A Federal Job Guarantee ensures that anyone willing to contribute can find meaningful employment at a living wage, whether that\'s caring for the elderly, rebuilding infrastructure, or restoring the environment. When the private sector fails to hire, communities shouldn\'t suffer. This isn\'t make-work; it\'s putting Americans to work on the problems we\'ve neglected for too long.',
    category: 'economy',
    scope: 'federal',
    icon: 'Briefcase',
    averageSupport: 58,
    partySupport: {
      democrats: 72,
      republicans: 44,
      independents: 56,
    },
    sources: [
      {
        organization: 'Data for Progress / CBPP',
        title: 'Job Guarantee Polling',
        url: 'https://www.cbpp.org',
        year: 2025,
        supportPercentage: 58,
      },
    ],
    notes: [
      'Full methodology available. Scores highest on stability, exit/voice, and protection (decommodifying labor).',
    ],
    details: [
      {
        title: 'Employer of Last Resort',
        description: 'Government provides jobs when private sector fails to hire, eliminating involuntary unemployment.',
      },
      {
        title: 'Polycentric Design',
        description: 'Federal funding with local implementation: communities identify needed projects.',
      },
    ],
    resourceFlow: {
      from: 'Federal Budget',
      to: 'Workers via Public Jobs',
      channel: 'Local government and nonprofit implementation',
    },
    ifThen: [
      'If you want work, the government guarantees a job at a living wage',
      'If the private sector treats you poorly, you can exit to the public option',
      'If a recession hits, the program automatically expands (stabilizer)',
    ],
    causalChain: {
      immediate: 'Offer public employment to all willing workers',
      outcome: 'Eliminates unemployment, strengthens worker bargaining power across economy',
    },
    commonQuestions: [
      {
        question: 'What kind of jobs?',
        answer: 'Community-identified needs: caregiving, infrastructure, environmental restoration, education support.',
      },
      {
        question: 'How is it different from UBI?',
        answer: 'JG provides income through work; UBI provides cash unconditionally. JG scores higher on exit/voice (1.0 vs 0.8).',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    hasV2Methodology: true,
    problemAreaId: 'economic-opportunity',
  },
  {
    id: 'medicare-for-all',
    rank: 33,
    title: 'Medicare for All (Single-Payer)',
    description: 'Healthcare is a human right, not a privilege for those who can afford it. In the richest country on Earth, no one should die because they can\'t afford treatment. No one should go bankrupt from a medical bill. No one should stay in a job they hate just to keep their insurance. Medicare for All means one card, one system, and care based on need, not wealth. Every other developed nation has figured this out. So can we.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Hospital',
    averageSupport: 63,
    partySupport: {
      democrats: 85,
      republicans: 38,
      independents: 60,
    },
    sources: [
      {
        organization: 'KFF Health Tracking Poll',
        title: 'Medicare for All Polling',
        url: 'https://kff.org',
        year: 2025,
        supportPercentage: 63,
      },
    ],
    notes: [
      'Full methodology available. Highest scores on protection (1.0), the floor (1.0), and sphere justice (1.0).',
    ],
    details: [
      {
        title: 'Healthcare as a Right',
        description: 'Distributes healthcare by need, not ability to pay. Everyone shows the same card at the hospital.',
      },
      {
        title: 'Administrative Simplicity',
        description: 'One payer, one set of rules. Eliminates navigating dozens of plans, networks, and deductibles.',
      },
    ],
    resourceFlow: {
      from: 'Progressive Taxation',
      to: 'Universal Coverage',
      channel: 'Government single-payer administration',
    },
    ifThen: [
      'If you are a resident, you are covered for all medically necessary care',
      'If you lose your job, your healthcare continues unchanged',
      'If you need treatment, you get it based on medical need, not wealth',
    ],
    causalChain: {
      immediate: 'Establish universal public health insurance',
      outcome: 'Eliminates medical bankruptcy, frees workers from employer/insurer domination',
    },
    commonQuestions: [
      {
        question: 'What about private insurance?',
        answer: 'Most proposals eliminate duplicative private insurance for covered services but may allow supplementary coverage.',
      },
      {
        question: 'How is it different from Public Option?',
        answer: 'Single-payer replaces private insurance; public option competes with it. M4A scores higher on protection and sphere justice.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    hasV2Methodology: true,
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-single-payer',
  },

  // --- NEW POLICIES FOR MISSING APPROACHES ---

  {
    id: 'ranked-choice-voting',
    rank: 34,
    title: 'Ranked Choice Voting',
    description: 'Our current voting system forces you to pick one candidate, even when you like several. The result? "Spoiler" candidates, negative campaigning, and winners who most voters didn\'t support. Ranked Choice Voting lets you rank candidates in order of preference. If your first choice loses, your vote transfers to your second choice. It rewards coalition-building, punishes attack ads, and ensures winners have broad support.',
    category: 'governance',
    scope: 'federal',
    icon: 'ListOrdered',
    averageSupport: 62,
    partySupport: {
      democrats: 72,
      republicans: 48,
      independents: 68,
    },
    sources: [
      {
        organization: 'FairVote / Pew Research',
        title: 'Voting Reform Survey',
        url: 'https://fairvote.org',
        year: 2025,
        supportPercentage: 62,
      },
    ],
    notes: [
      'Already used in Alaska, Maine, and dozens of cities. Support grows as familiarity increases.',
    ],
    details: [
      {
        title: 'End Spoiler Effect',
        description: 'Vote your conscience without "wasting" your vote or helping your least favorite candidate win.',
      },
      {
        title: 'Better Campaigns',
        description: 'Candidates seek second-choice votes, leading to more positive, coalition-building campaigns.',
      },
    ],
    resourceFlow: {
      from: 'Winner-Take-All System',
      to: 'Majority Winners',
      channel: 'Election Reform Legislation',
    },
    ifThen: [
      'If you rank your candidates, your vote counts even if your first choice loses',
      'If no candidate gets 50%, instant runoffs determine the winner',
      'If implemented, third parties become viable without being spoilers',
    ],
    causalChain: {
      immediate: 'Adopt ranked choice voting for federal elections',
      outcome: 'Reduces polarization, increases voter satisfaction, and elects candidates with broader support',
    },
    commonQuestions: [
      {
        question: 'Is it confusing?',
        answer: 'Voters in RCV jurisdictions report high satisfaction. It\'s as simple as ranking your preferences.',
      },
      {
        question: 'Does it help third parties?',
        answer: 'Yes. You can support a third party without fear of "wasting" your vote.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'democratic-reform',
    approachId: 'ranked-choice-voting',
  },
  {
    id: 'independent-redistricting',
    rank: 35,
    title: 'Independent Redistricting Commissions',
    description: 'Politicians shouldn\'t choose their voters; voters should choose their politicians. But in most states, legislators draw their own district lines, creating "safe seats" where elections are decided before a single vote is cast. Independent commissions take redistricting out of partisan hands, creating competitive districts where your vote actually matters.',
    category: 'governance',
    scope: 'federal',
    icon: 'Map',
    averageSupport: 71,
    partySupport: {
      democrats: 78,
      republicans: 62,
      independents: 74,
    },
    sources: [
      {
        organization: 'Campaign Legal Center / Gallup',
        title: 'Redistricting Reform Poll',
        url: 'https://campaignlegal.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    notes: [
      'States with independent commissions show higher voter turnout and satisfaction.',
    ],
    details: [
      {
        title: 'Nonpartisan Process',
        description: 'Commissioners are selected through a merit-based process, not appointed by politicians.',
      },
      {
        title: 'Transparency',
        description: 'Public hearings and clear criteria replace backroom deals.',
      },
    ],
    resourceFlow: {
      from: 'Partisan Gerrymandering',
      to: 'Fair Districts',
      channel: 'State Constitutional Amendments / Federal Law',
    },
    ifThen: [
      'If your state has a commission, district lines are drawn fairly',
      'If implemented, more elections become competitive',
      'If adopted nationally, Congress better reflects the actual vote',
    ],
    causalChain: {
      immediate: 'Mandate independent redistricting commissions',
      outcome: 'Ends gerrymandering and restores competitive elections',
    },
    commonQuestions: [
      {
        question: 'How do you pick commissioners?',
        answer: 'Typically through a randomized selection from applicants screened for partisan ties.',
      },
      {
        question: 'Does it work?',
        answer: 'States like California and Arizona show more competitive races after adopting commissions.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'democratic-reform',
    approachId: 'independent-redistricting',
  },
  {
    id: 'election-security',
    rank: 36,
    title: 'Election Security & Paper Ballots',
    description: 'Every American should be confident their vote counts. That means paper ballots you can verify, rigorous audits after every election, and protection against foreign interference. This isn\'t partisan; it\'s patriotic. Secure elections are the foundation of democracy, and we should invest in making them bulletproof.',
    category: 'governance',
    scope: 'federal',
    icon: 'ShieldCheck',
    averageSupport: 82,
    partySupport: {
      democrats: 85,
      republicans: 80,
      independents: 82,
    },
    sources: [
      {
        organization: 'Verified Voting / Pew Research',
        title: 'Election Security Survey',
        url: 'https://verifiedvoting.org',
        year: 2025,
        supportPercentage: 82,
      },
    ],
    notes: [
      'Paper ballots and risk-limiting audits enjoy near-universal support.',
    ],
    details: [
      {
        title: 'Paper Trail',
        description: 'All votes must have a voter-verified paper record that can be audited.',
      },
      {
        title: 'Risk-Limiting Audits',
        description: 'Statistical audits after every election confirm results are accurate.',
      },
    ],
    resourceFlow: {
      from: 'Vulnerable Systems',
      to: 'Verified Results',
      channel: 'Federal Funding & Standards',
    },
    ifThen: [
      'If you vote, you can verify your ballot before it\'s cast',
      'If results are close, audits can confirm accuracy',
      'If foreign actors try to interfere, paper ballots provide a backup',
    ],
    causalChain: {
      immediate: 'Mandate paper ballots and post-election audits',
      outcome: 'Ensures election integrity and voter confidence',
    },
    commonQuestions: [
      {
        question: 'Are electronic machines bad?',
        answer: 'Not inherently, but they must produce a paper trail. Paperless machines are the concern.',
      },
      {
        question: 'Who pays for this?',
        answer: 'Federal grants help states upgrade equipment and train election workers.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'democratic-reform',
    approachId: 'election-integrity-security',
  },
  {
    id: 'rent-stabilization',
    rank: 37,
    title: 'Rent Stabilization Protections',
    description: 'Families are being priced out of their homes overnight. Landlords can raise rent by 30%, 50%, even 100% with no warning. This forces families to move, disrupts children\'s schooling, and destroys communities. Rent stabilization doesn\'t freeze rents; it limits how fast they can rise, giving families stability and time to plan.',
    category: 'housing',
    scope: 'federal',
    icon: 'Home',
    averageSupport: 63,
    partySupport: {
      democrats: 78,
      republicans: 45,
      independents: 65,
    },
    sources: [
      {
        organization: 'Data for Progress / Pew Research',
        title: 'Housing Policy Survey',
        url: 'https://dataforprogress.org',
        year: 2025,
        supportPercentage: 63,
      },
    ],
    notes: [
      'Support varies by framing; "rent caps" poll lower than "protections against extreme rent hikes."',
    ],
    details: [
      {
        title: 'Anti-Gouging',
        description: 'Limits annual rent increases to a reasonable percentage, often tied to inflation.',
      },
      {
        title: 'Just Cause Eviction',
        description: 'Landlords must have a legitimate reason to evict, preventing displacement for profit.',
      },
    ],
    resourceFlow: {
      from: 'Landlord Windfalls',
      to: 'Tenant Stability',
      channel: 'State/Local Rent Laws',
    },
    ifThen: [
      'If your landlord raises rent, it must be within a reasonable annual limit',
      'If you\'re a long-term tenant, you have stability to plan your future',
      'If implemented, communities remain intact instead of being displaced',
    ],
    causalChain: {
      immediate: 'Limit excessive rent increases',
      outcome: 'Provides housing stability and preserves community cohesion',
    },
    commonQuestions: [
      {
        question: 'Does this reduce housing supply?',
        answer: 'Critics argue yes; proponents say well-designed policies exempt new construction.',
      },
      {
        question: 'Is this rent control?',
        answer: 'Modern "rent stabilization" is more flexible than traditional rent control, allowing reasonable increases.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-rent-stabilization',
  },
  {
    id: 'housing-vouchers',
    rank: 38,
    title: 'Expand Housing Choice Vouchers',
    description: 'For millions of families, the difference between homelessness and stability is a voucher that helps pay rent. But only 1 in 4 eligible families receives help because funding is capped. Expanding Section 8 vouchers lets families choose where to live, opens opportunities in better neighborhoods, and costs less than building new affordable units.',
    category: 'housing',
    scope: 'federal',
    icon: 'Ticket',
    averageSupport: 68,
    partySupport: {
      democrats: 82,
      republicans: 52,
      independents: 68,
    },
    sources: [
      {
        organization: 'Center on Budget and Policy Priorities',
        title: 'Housing Assistance Survey',
        url: 'https://cbpp.org',
        year: 2025,
        supportPercentage: 68,
      },
    ],
    notes: [
      'Vouchers let recipients choose their housing, promoting integration and opportunity.',
    ],
    details: [
      {
        title: 'Universal Eligibility',
        description: 'Make vouchers available to all income-eligible families, not just the lucky few.',
      },
      {
        title: 'Source of Income Laws',
        description: 'Prohibit landlords from discriminating against voucher holders.',
      },
    ],
    resourceFlow: {
      from: 'HUD Budget',
      to: 'Low-Income Families',
      channel: 'Section 8 Program',
    },
    ifThen: [
      'If you qualify, you receive a voucher to help pay market rent',
      'If you want to move to a better school district, your voucher moves with you',
      'If landlords accept vouchers, they get reliable government-backed rent',
    ],
    causalChain: {
      immediate: 'Fund vouchers for all eligible households',
      outcome: 'Ends housing waitlists and gives families choice',
    },
    commonQuestions: [
      {
        question: 'Why don\'t landlords accept vouchers?',
        answer: 'Paperwork and inspection requirements deter some. Source-of-income laws help address this.',
      },
      {
        question: 'Is this expensive?',
        answer: 'Less than building new affordable units; it leverages existing housing stock.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-vouchers',
  },
  {
    id: 'first-time-homebuyer',
    rank: 39,
    title: 'First-Time Homebuyer Support',
    description: 'Homeownership built the middle class, but it\'s slipping out of reach. Young families can\'t save for a down payment while paying rent that keeps climbing. First-time buyer programs provide down payment assistance, favorable mortgage rates, and tax credits to help families get on the first rung of the ladder.',
    category: 'housing',
    scope: 'federal',
    icon: 'Key',
    averageSupport: 74,
    partySupport: {
      democrats: 82,
      republicans: 65,
      independents: 74,
    },
    sources: [
      {
        organization: 'NAR / Pew Research',
        title: 'Homeownership Survey',
        url: 'https://nar.realtor',
        year: 2025,
        supportPercentage: 74,
      },
    ],
    notes: [
      'Down payment assistance is the most popular intervention; mortgage rate buydowns also poll well.',
    ],
    details: [
      {
        title: 'Down Payment Help',
        description: 'Grants or forgivable loans help families clear the biggest hurdle to ownership.',
      },
      {
        title: 'Tax Credits',
        description: 'First-time buyers receive credits to offset closing costs and early mortgage payments.',
      },
    ],
    resourceFlow: {
      from: 'Federal Tax Revenue',
      to: 'First-Time Buyers',
      channel: 'FHA / State HFAs',
    },
    ifThen: [
      'If you\'ve never owned a home, you qualify for down payment assistance',
      'If you complete homebuyer education, you get favorable mortgage terms',
      'If enacted, homeownership rates rise among young families',
    ],
    causalChain: {
      immediate: 'Expand down payment assistance and buyer tax credits',
      outcome: 'Increases homeownership and wealth-building for working families',
    },
    commonQuestions: [
      {
        question: 'Does this raise home prices?',
        answer: 'Critics argue demand-side support can; ideally paired with supply-side reforms.',
      },
      {
        question: 'Who qualifies?',
        answer: 'Typically first-time buyers below income limits; programs vary by state.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-first-time-buyer',
  },
  {
    id: 'paid-family-leave',
    rank: 40,
    title: 'Paid Family & Medical Leave',
    description: 'America is the only wealthy nation without guaranteed paid family leave. When a baby is born, when a parent gets cancer, when a spouse needs care, workers shouldn\'t have to choose between their families and their paychecks. Paid leave is good for workers, good for businesses, and good for babies. It\'s time to join the rest of the developed world.',
    category: 'family',
    scope: 'federal',
    icon: 'Baby',
    averageSupport: 84,
    partySupport: {
      democrats: 93,
      republicans: 74,
      independents: 84,
    },
    sources: [
      {
        organization: 'Pew Research Center',
        title: 'Family Leave Survey',
        url: 'https://pewresearch.org',
        year: 2025,
        supportPercentage: 84,
      },
    ],
    notes: [
      'One of the most popular unimplemented policies; support has grown steadily.',
    ],
    details: [
      {
        title: 'Wage Replacement',
        description: 'Workers receive a portion of their salary while on leave, funded by payroll contributions.',
      },
      {
        title: 'Job Protection',
        description: 'Guarantees you can return to your job after leave.',
      },
    ],
    resourceFlow: {
      from: 'Payroll Contributions',
      to: 'Working Families',
      channel: 'Social Insurance Fund',
    },
    ifThen: [
      'If you have a baby, you get paid leave without losing your job',
      'If a family member gets seriously ill, you can provide care',
      'If implemented, infant health improves and workforce participation increases',
    ],
    causalChain: {
      immediate: 'Establish national paid family and medical leave program',
      outcome: 'Supports families during critical moments without economic devastation',
    },
    commonQuestions: [
      {
        question: 'How is it funded?',
        answer: 'Typically a small payroll tax split between employers and employees.',
      },
      {
        question: 'How long is the leave?',
        answer: 'Proposals range from 4-12 weeks. Most developed nations offer longer.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-paid-leave',
  },
  {
    id: 'childcare-subsidies',
    rank: 41,
    title: 'Direct Childcare Subsidies',
    description: 'Childcare costs more than college in most states. Parents are dropping out of the workforce because they can\'t afford to work. Direct subsidies help families pay for quality care, keeping parents employed and children in nurturing environments. This isn\'t just about convenience; it\'s about economic survival for working families.',
    category: 'family',
    scope: 'federal',
    icon: 'Building',
    averageSupport: 79,
    partySupport: {
      democrats: 89,
      republicans: 67,
      independents: 80,
    },
    sources: [
      {
        organization: 'First Five Years Fund',
        title: 'Child Care Affordability Poll',
        url: 'https://ffyf.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    notes: [
      'Subsidies that go directly to families poll higher than provider-side funding.',
    ],
    details: [
      {
        title: 'Income-Based',
        description: 'Families pay a capped percentage of income; subsidies cover the rest.',
      },
      {
        title: 'Provider Choice',
        description: 'Parents choose licensed providers; money follows the child.',
      },
    ],
    resourceFlow: {
      from: 'Federal/State Funds',
      to: 'Working Families',
      channel: 'CCDF / State Programs',
    },
    ifThen: [
      'If you need childcare, you pay only what you can afford',
      'If you work irregular hours, subsidies still apply',
      'If implemented, more parents can enter or stay in the workforce',
    ],
    causalChain: {
      immediate: 'Expand childcare subsidies to all working families',
      outcome: 'Makes childcare affordable and boosts labor force participation',
    },
    commonQuestions: [
      {
        question: 'Do subsidies drive up prices?',
        answer: 'Critics say yes; proponents argue supply-side investments can offset this.',
      },
      {
        question: 'Who qualifies?',
        answer: 'Income thresholds vary; proposals often cover families up to 200-400% of poverty line.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-subsidies',
  },
  {
    id: 'eitc-expansion',
    rank: 42,
    title: 'Expand Earned Income Tax Credit',
    description: 'The EITC is one of the most effective anti-poverty programs in America, rewarding work while lifting families out of poverty. But it largely excludes childless workers and phases out too quickly. Expanding the EITC means more workers keep more of what they earn, making work pay and reducing reliance on other programs.',
    category: 'economy',
    scope: 'federal',
    icon: 'Receipt',
    averageSupport: 72,
    partySupport: {
      democrats: 85,
      republicans: 58,
      independents: 72,
    },
    sources: [
      {
        organization: 'Tax Policy Center / Pew',
        title: 'Tax Credit Survey',
        url: 'https://taxpolicycenter.org',
        year: 2025,
        supportPercentage: 72,
      },
    ],
    notes: [
      'EITC expansion enjoys bipartisan support as it rewards work, not dependence.',
    ],
    details: [
      {
        title: 'Include Childless Workers',
        description: 'Expand eligibility and credit amount for workers without children.',
      },
      {
        title: 'Raise Phase-Out',
        description: 'Increase income limits so more working families benefit.',
      },
    ],
    resourceFlow: {
      from: 'IRS Tax Code',
      to: 'Low-Income Workers',
      channel: 'Refundable Tax Credit',
    },
    ifThen: [
      'If you work at low wages, you get a tax credit that boosts your income',
      'If you\'re childless, you now qualify for a meaningful credit',
      'If implemented, poverty rates among workers drop significantly',
    ],
    causalChain: {
      immediate: 'Expand EITC eligibility and amounts',
      outcome: 'Makes work pay and reduces poverty without creating dependency',
    },
    commonQuestions: [
      {
        question: 'Why exclude childless workers?',
        answer: 'Historical policy; expanding to them has bipartisan support as a work incentive.',
      },
      {
        question: 'How much is the credit?',
        answer: 'Varies by income and family size; can be several thousand dollars.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'economic-opportunity',
    approachId: 'economy-expand-eitc',
  },
  {
    id: 'strengthen-unions',
    rank: 43,
    title: 'Protect Right to Organize (PRO Act)',
    description: 'When workers have a voice, wages rise for everyone. But companies have spent decades rigging the rules to crush organizing drives. The PRO Act restores balance: it bans captive audience meetings, prevents misclassifying employees as contractors, and ensures workers can form unions without retaliation. A strong labor movement built the middle class; we need to rebuild it.',
    category: 'economy',
    scope: 'federal',
    icon: 'Users',
    averageSupport: 65,
    partySupport: {
      democrats: 82,
      republicans: 45,
      independents: 67,
    },
    sources: [
      {
        organization: 'Gallup / Data for Progress',
        title: 'Labor Union Survey',
        url: 'https://news.gallup.com',
        year: 2025,
        supportPercentage: 65,
      },
    ],
    notes: [
      'Union approval is at 70%+; specific reforms poll slightly lower due to business opposition framing.',
    ],
    details: [
      {
        title: 'Ban Captive Audiences',
        description: 'Employers can\'t force workers to attend anti-union meetings.',
      },
      {
        title: 'Strengthen Penalties',
        description: 'Real consequences for companies that illegally retaliate against organizers.',
      },
    ],
    resourceFlow: {
      from: 'Corporate Power',
      to: 'Worker Voice',
      channel: 'PRO Act / NLRB Enforcement',
    },
    ifThen: [
      'If you want to organize, you can do so without employer intimidation',
      'If your employer breaks the law, they face meaningful penalties',
      'If more workers unionize, wages rise across industries',
    ],
    causalChain: {
      immediate: 'Pass the PRO Act and strengthen NLRB',
      outcome: 'Increases worker power, raises wages, and reduces inequality',
    },
    commonQuestions: [
      {
        question: 'Why is union membership declining?',
        answer: 'Decades of legal changes and aggressive employer tactics have tilted the playing field.',
      },
      {
        question: 'Does this force union membership?',
        answer: 'No. It protects the right to organize; workers still vote on union representation.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'economic-opportunity',
    approachId: 'economy-strengthen-unions',
  },
  {
    id: 'education-funding',
    rank: 44,
    title: 'Increase Public School Funding',
    description: 'A child\'s education shouldn\'t depend on their zip code. But property-tax-based funding means rich districts thrive while poor districts struggle. Federal investment in public schools can close resource gaps, hire more teachers, and ensure every child has access to a quality education regardless of where they live.',
    category: 'education',
    scope: 'federal',
    icon: 'GraduationCap',
    averageSupport: 77,
    partySupport: {
      democrats: 90,
      republicans: 62,
      independents: 78,
    },
    sources: [
      {
        organization: 'PDK Poll / Gallup',
        title: 'Education Priorities Survey',
        url: 'https://pdkpoll.org',
        year: 2025,
        supportPercentage: 77,
      },
    ],
    notes: [
      'Funding increases poll well when tied to specific improvements like smaller class sizes.',
    ],
    details: [
      {
        title: 'Title I Expansion',
        description: 'Increase funding for high-poverty schools to close resource gaps.',
      },
      {
        title: 'Equity Formula',
        description: 'Direct more federal dollars to districts with the greatest need.',
      },
    ],
    resourceFlow: {
      from: 'Federal Education Budget',
      to: 'High-Need Schools',
      channel: 'Title I / State Grants',
    },
    ifThen: [
      'If you attend a high-poverty school, you get more resources, not fewer',
      'If federal funding increases, districts can hire more teachers',
      'If implemented, achievement gaps begin to close',
    ],
    causalChain: {
      immediate: 'Increase federal education funding for high-need districts',
      outcome: 'Reduces inequality and improves outcomes in underfunded schools',
    },
    commonQuestions: [
      {
        question: 'Does more money improve outcomes?',
        answer: 'Research shows it does, especially in underfunded districts. Money enables smaller classes and better materials.',
      },
      {
        question: 'Who controls the spending?',
        answer: 'Local districts decide how to use funds within federal guidelines.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-increase-funding',
  },
  {
    id: 'school-mental-health-services',
    rank: 45,
    title: 'Expand School Mental Health Services',
    description: 'One in three teens reports persistent feelings of sadness or hopelessness. Yet most schools lack adequate counselors—the national average is one counselor for every 385 students, far above the recommended 250:1 ratio. Expanding school-based mental health services means students get help where they already are, before crises escalate.',
    category: 'education',
    scope: 'federal',
    icon: 'Heart',
    averageSupport: 86,
    partySupport: {
      democrats: 92,
      republicans: 82,
      independents: 84,
    },
    sources: [
      {
        organization: 'Data for Progress',
        title: 'Student Mental Health Survey',
        url: 'https://dataforprogress.org',
        year: 2024,
        supportPercentage: 86,
      },
    ],
    notes: [
      'Support remains strong across all demographics and regions.',
    ],
    details: [
      {
        title: 'Staff Training Requirements',
        description: 'Require school staff training in recognizing mental health warning signs and making appropriate referrals.',
      },
      {
        title: 'Community Partnerships',
        description: 'Fund partnerships between K-12 schools and local mental health providers.',
      },
    ],
    resourceFlow: {
      from: 'Federal/State Education & Health Budgets',
      to: 'School Districts & Mental Health Providers',
      channel: 'Grants for counselors and training programs',
    },
    ifThen: [
      'If your child struggles, trained staff can connect them to help',
      'If schools partner with providers, students access care without leaving campus',
      'If implemented, crisis interventions decrease as early support increases',
    ],
    causalChain: {
      immediate: 'Increase mental health counselors and staff training in schools',
      outcome: 'Students get early intervention before problems become crises',
    },
    commonQuestions: [
      {
        question: 'Should schools handle mental health?',
        answer: 'Schools are where kids spend most of their time. Embedding services there removes barriers like transportation and stigma.',
      },
      {
        question: 'What about parent involvement?',
        answer: 'Parents are notified and involved. School counselors connect families to resources, not replace parental authority.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-invest-teachers',
  },
  {
    id: 'universal-pre-k',
    rank: 46,
    title: 'Universal Pre-K for All 4-Year-Olds',
    description: 'The brain develops more in the first five years than any other time. Yet access to quality pre-school depends on your zip code and income. Universal pre-K gives every child the same strong start, closing achievement gaps before they begin and freeing parents to work.',
    category: 'education',
    scope: 'federal',
    icon: 'Baby',
    averageSupport: 71,
    partySupport: {
      democrats: 85,
      republicans: 55,
      independents: 72,
    },
    sources: [
      {
        organization: 'Gallup',
        title: 'Pre-K Education Survey',
        url: 'https://news.gallup.com/poll/175646/favor-federal-funds-expand-pre-education.aspx',
        year: 2024,
        supportPercentage: 71,
      },
    ],
    notes: [
      'Support has increased from 54% in 2014 to 71% today.',
      'Conservative states like Florida, Texas, and Arkansas have expanded state pre-K programs.',
    ],
    details: [
      {
        title: 'State-Federal Partnership',
        description: 'Federal grants match state investments to expand quality pre-K slots.',
      },
      {
        title: 'Quality Standards',
        description: 'Require qualified teachers, small class sizes, and developmentally appropriate curriculum.',
      },
    ],
    resourceFlow: {
      from: 'Federal Education Budget + State Matching Funds',
      to: 'Public Schools & Licensed Pre-K Providers',
      channel: 'Grants for pre-K expansion',
    },
    ifThen: [
      'If you have a 4-year-old, free quality pre-school is available',
      'If both parents work, you have childcare during work hours',
      'If implemented, kindergarten readiness improves across income levels',
    ],
    causalChain: {
      immediate: 'Provide free pre-K to all 4-year-olds regardless of income',
      outcome: 'Children enter kindergarten ready to learn; achievement gaps narrow',
    },
    commonQuestions: [
      {
        question: 'Is pre-K actually effective?',
        answer: 'Research shows quality pre-K improves school readiness, graduation rates, and adult earnings—especially for low-income children.',
      },
      {
        question: 'Why universal, not just for low-income families?',
        answer: 'Universal programs avoid stigma, are politically durable, and benefit middle-class families who often don\'t qualify for targeted aid.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-increase-funding',
  },
  {
    id: 'career-technical-education',
    rank: 47,
    title: 'Expand Career & Technical Education',
    description: 'Not every student wants or needs a four-year degree. Millions of good-paying jobs in healthcare, manufacturing, IT, and trades go unfilled while students graduate with debt and no clear path. Expanding CTE and apprenticeships gives students real skills and debt-free careers.',
    category: 'education',
    scope: 'federal',
    icon: 'Wrench',
    averageSupport: 84,
    partySupport: {
      democrats: 84,
      republicans: 86,
      independents: 81,
    },
    sources: [
      {
        organization: 'PDK Poll / Gallup',
        title: 'Education Priorities Survey',
        url: 'https://pdkpoll.org',
        year: 2025,
        supportPercentage: 84,
      },
    ],
    notes: [
      'One of the most bipartisan education issues—supported equally across parties.',
      'Community and technical colleges viewed favorably by 84%+ of all voters.',
    ],
    details: [
      {
        title: 'High School CTE Expansion',
        description: 'Fund career pathways in high schools: healthcare, IT, manufacturing, construction.',
      },
      {
        title: 'Apprenticeship Programs',
        description: 'Expand registered apprenticeships that combine paid work with classroom training.',
      },
    ],
    resourceFlow: {
      from: 'Federal Perkins Act Funding + State/Employer Match',
      to: 'High Schools, Community Colleges, Employers',
      channel: 'Grants for equipment, instructors, and apprentice wages',
    },
    ifThen: [
      'If you prefer hands-on learning, you can train for a career in high school',
      'If you complete an apprenticeship, you earn while you learn—no debt',
      'If employers participate, they get trained workers; students get jobs',
    ],
    causalChain: {
      immediate: 'Expand career and technical education and apprenticeship pathways',
      outcome: 'More students enter middle-class careers without college debt',
    },
    commonQuestions: [
      {
        question: 'Does CTE limit college options?',
        answer: 'No. Modern CTE programs often include dual enrollment credits. Students can pursue both career credentials and college preparation.',
      },
      {
        question: 'Are these real careers?',
        answer: 'Median wages for skilled trades often exceed those of many college graduates. Electricians, nurses, and IT technicians are in high demand.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-standards-accountability',
  },
  {
    id: 'teacher-pay-increase',
    rank: 48,
    title: 'Raise Teacher Salaries to Competitive Levels',
    description: 'Teachers earn 20% less than comparably educated professionals. The result: shortages in math, science, and special education; talented people choosing other careers; and 300,000 teachers leaving the profession annually. Competitive salaries attract and retain the teachers our kids need.',
    category: 'education',
    scope: 'state',
    icon: 'GraduationCap',
    averageSupport: 64,
    partySupport: {
      democrats: 73,
      republicans: 55,
      independents: 62,
    },
    sources: [
      {
        organization: 'PDK Poll / Gallup',
        title: 'Teacher Pay Assessment',
        url: 'https://pdkpoll.org/2025-poll-results/',
        year: 2025,
        supportPercentage: 64,
      },
    ],
    notes: [
      '64% of Americans believe teacher pay is too low.',
      'Adjusted for inflation, teachers earn 5% less than a decade ago.',
    ],
    details: [
      {
        title: 'Minimum Salary Floor',
        description: 'Establish a $60,000 minimum starting salary for teachers, as proposed in the Pay Teachers Act.',
      },
      {
        title: 'High-Need Bonuses',
        description: 'Additional pay for teachers in shortage subjects (math, science, special ed) and underserved schools.',
      },
    ],
    resourceFlow: {
      from: 'State Education Budgets + Federal Grants',
      to: 'Teacher Compensation',
      channel: 'Direct salary increases and bonuses',
    },
    ifThen: [
      'If teaching pays competitively, more talented people enter the profession',
      'If experienced teachers stay, students benefit from expertise',
      'If shortage subjects pay more, hard-to-fill positions get filled',
    ],
    causalChain: {
      immediate: 'Raise teacher salaries to be competitive with other professions',
      outcome: 'Teacher shortages decrease; quality improves; students benefit',
    },
    commonQuestions: [
      {
        question: 'Aren\'t teachers already well-paid?',
        answer: 'Average salary is $72K but varies wildly by state. More importantly, teachers earn 20% less than similarly educated workers in other fields.',
      },
      {
        question: 'Does higher pay mean better teaching?',
        answer: 'Higher pay attracts more applicants, allowing schools to be selective. Countries with the best schools pay teachers like other professionals.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-invest-teachers',
  },
  {
    id: 'school-phone-restrictions',
    rank: 49,
    title: 'Restrict Cell Phones in Schools',
    description: 'Students check their phones 100+ times per day. Teachers compete with TikTok and Snapchat for attention. Research links phone use to declining test scores, rising anxiety, and social disconnection. Restricting phones during school hours lets kids focus on learning and each other.',
    category: 'education',
    scope: 'state',
    icon: 'PhoneOff',
    averageSupport: 86,
    partySupport: {
      democrats: 84,
      republicans: 90,
      independents: 83,
    },
    sources: [
      {
        organization: 'PDK Poll / Gallup',
        title: 'Cell Phone Restrictions Survey',
        url: 'https://pdkpoll.org/2025-poll-results/',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    notes: [
      '40% support complete bans; 46% support restrictions except at lunch/breaks.',
      'Only 11% believe there should be no restrictions at all.',
    ],
    details: [
      {
        title: 'Phone-Free Classrooms',
        description: 'Require phones to be stored in lockers, pouches, or collected during instructional time.',
      },
      {
        title: 'Emergency Access',
        description: 'Maintain parent-school communication channels for emergencies without student phone access.',
      },
    ],
    resourceFlow: {
      from: 'School District Policies',
      to: 'Students & Teachers',
      channel: 'Policy implementation with enforcement tools (pouches, lockers)',
    },
    ifThen: [
      'If phones are away, students engage with lessons and peers',
      'If teachers don\'t compete with devices, instruction improves',
      'If implemented, anxiety and distraction decrease during school hours',
    ],
    causalChain: {
      immediate: 'Restrict student cell phone use during instructional time',
      outcome: 'Improved focus, learning, and social interaction; reduced anxiety',
    },
    commonQuestions: [
      {
        question: 'What about emergencies?',
        answer: 'School offices remain reachable. Lockdown procedures don\'t require student phones—they often complicate response.',
      },
      {
        question: 'Isn\'t this overreach?',
        answer: 'Schools already regulate dress, behavior, and harmful items. Phones are a documented learning barrier with bipartisan support for limits.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'education-quality',
    approachId: 'education-standards-accountability',
  },
  // Healthcare policies
  {
    id: 'hospital-price-transparency',
    rank: 50,
    title: 'Require Hospital Price Transparency',
    description: 'You can comparison shop for a car, a TV, even a pizza—but not a medical procedure. Hospitals charge wildly different prices for the same service, often billing 10x more to uninsured patients. Requiring hospitals to post actual prices upfront lets patients shop, forces competition, and ends surprise bills.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'FileSearch',
    averageSupport: 92,
    partySupport: {
      democrats: 94,
      republicans: 91,
      independents: 92,
    },
    sources: [
      {
        organization: 'PatientRightsAdvocate.org / Echelon Insights',
        title: 'Healthcare Price Transparency Survey',
        url: 'https://www.patientrightsadvocate.org',
        year: 2024,
        supportPercentage: 92,
      },
    ],
    notes: [
      'One of the most bipartisan healthcare policies—92% support across all parties.',
      'Only 21% of hospitals fully comply with existing transparency rules.',
    ],
    details: [
      {
        title: 'Upfront Pricing',
        description: 'Hospitals must post actual negotiated prices for all services before treatment.',
      },
      {
        title: 'Enforcement',
        description: 'Meaningful penalties for non-compliance, beyond current minimal fines.',
      },
    ],
    resourceFlow: {
      from: 'CMS Enforcement Budget',
      to: 'Hospital Compliance & Consumer Access',
      channel: 'Regulatory requirements with penalties',
    },
    ifThen: [
      'If you need a procedure, you can compare prices across hospitals',
      'If hospitals compete on price, costs come down',
      'If implemented, surprise billing decreases as patients know costs upfront',
    ],
    causalChain: {
      immediate: 'Require hospitals to publicly post actual prices for all services',
      outcome: 'Patients can comparison shop; competition lowers prices',
    },
    commonQuestions: [
      {
        question: 'Don\'t hospitals already have to post prices?',
        answer: 'Since 2021, yes—but compliance is poor and penalties are weak. Only 21% fully comply. Stronger enforcement is needed.',
      },
      {
        question: 'Will this actually lower costs?',
        answer: 'Early evidence shows price transparency leads to negotiating power and competition. Employers using transparency tools save 15-30%.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-market-reforms',
  },
  {
    id: 'medicare-drug-negotiation',
    rank: 51,
    title: 'Let Medicare Negotiate Drug Prices',
    description: 'Americans pay 2-3x more for prescription drugs than people in other countries. For decades, Medicare was barred from negotiating prices—the only major buyer in the world with its hands tied. Allowing negotiation has already begun saving billions, and expanding it can lower costs for everyone.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Pill',
    averageSupport: 85,
    partySupport: {
      democrats: 92,
      republicans: 77,
      independents: 89,
    },
    sources: [
      {
        organization: 'KFF',
        title: 'Health Tracking Poll - Drug Pricing',
        url: 'https://www.kff.org/medicare/kff-health-tracking-poll-september-2024-support-for-reducing-prescription-drug-prices-remains-high/',
        year: 2024,
        supportPercentage: 85,
      },
    ],
    notes: [
      'The Inflation Reduction Act enabled limited negotiation; this expands it.',
      'First 10 negotiated drugs will save Medicare $6 billion in 2026 alone.',
    ],
    details: [
      {
        title: 'Expand Negotiation',
        description: 'Allow Medicare to negotiate prices on more drugs, faster—beyond the initial 10.',
      },
      {
        title: 'Reference Pricing',
        description: 'Use international prices as a benchmark for fair pricing.',
      },
    ],
    resourceFlow: {
      from: 'Medicare Budget',
      to: 'Lower Drug Costs for Seniors',
      channel: 'Direct negotiation with pharmaceutical companies',
    },
    ifThen: [
      'If Medicare negotiates, seniors pay less at the pharmacy',
      'If drug prices drop for Medicare, private insurers often follow',
      'If implemented, savings fund other healthcare improvements',
    ],
    causalChain: {
      immediate: 'Enable and expand Medicare drug price negotiations',
      outcome: 'Prescription drug costs decrease for seniors and ripple to all Americans',
    },
    commonQuestions: [
      {
        question: 'Will this hurt drug innovation?',
        answer: 'Pharma companies remain highly profitable even where negotiation exists. Most new drugs are developed with public research funding anyway.',
      },
      {
        question: 'Is this already happening?',
        answer: 'Yes, limited negotiation started in 2024 under the IRA. This expands and accelerates the program.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-market-reforms',
  },
  {
    id: 'medicare-dental-coverage',
    rank: 52,
    title: 'Add Dental Coverage to Medicare',
    description: 'Medicare covers hospital stays, doctor visits, and prescription drugs—but not teeth. Seniors face a choice: pay thousands out of pocket or go without dental care. Poor oral health leads to heart disease, diabetes complications, and worse. Adding dental to Medicare is common sense.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Smile',
    averageSupport: 92,
    partySupport: {
      democrats: 99,
      republicans: 85,
      independents: 90,
    },
    sources: [
      {
        organization: 'CareQuest Institute',
        title: 'Medicare Dental Coverage Poll',
        url: 'https://www.carequest.org',
        year: 2024,
        supportPercentage: 92,
      },
    ],
    notes: [
      '92% of voters support adding dental to Medicare.',
      'Nearly half of Medicare beneficiaries haven\'t seen a dentist in over a year.',
    ],
    details: [
      {
        title: 'Comprehensive Coverage',
        description: 'Cover preventive, basic, and major dental services under Medicare Part B.',
      },
      {
        title: 'No Age-Out',
        description: 'Seniors keep their teeth healthy without choosing between food and dental care.',
      },
    ],
    resourceFlow: {
      from: 'Medicare Budget Expansion',
      to: 'Dental Care for 65+ Americans',
      channel: 'Medicare Part B coverage of dental services',
    },
    ifThen: [
      'If you\'re on Medicare, dental visits are covered',
      'If seniors get preventive care, costly emergency dental procedures decrease',
      'If implemented, overall health outcomes improve for seniors',
    ],
    causalChain: {
      immediate: 'Add dental benefits to Medicare coverage',
      outcome: 'Seniors access dental care; oral and overall health improve',
    },
    commonQuestions: [
      {
        question: 'Why wasn\'t dental always covered?',
        answer: 'When Medicare was created in 1965, dental was seen as separate from "medical" care. We know better now—oral health is health.',
      },
      {
        question: 'How much would this cost?',
        answer: 'Estimates vary, but preventive dental care reduces costly emergency visits. Many plans would cover routine care with modest out-of-pocket costs.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-12-01',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-coverage-expansion',
  },
  {
    id: 'insulin-cap-35',
    rank: 53,
    title: 'Cap Insulin at $35/Month for Everyone',
    description: '8 million Americans rely on insulin to survive. For decades, prices soared while the drug itself barely changed—insulin costs $2-4 to produce but can cost $300+ per vial. Medicare already capped insulin at $35/month. Extending this to all Americans would save lives and prevent rationing.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Syringe',
    averageSupport: 77,
    partySupport: {
      democrats: 84,
      republicans: 70,
      independents: 79,
    },
    sources: [
      {
        organization: 'KFF',
        title: 'Insulin Pricing Survey',
        url: 'https://www.kff.org',
        year: 2024,
        supportPercentage: 77,
      },
    ],
    notes: [
      'Medicare already caps insulin at $35; this extends to private insurance.',
      'One in four diabetics has rationed insulin due to cost.',
    ],
    details: [
      {
        title: 'Universal Cap',
        description: 'Limit insulin copays to $35/month for all Americans, regardless of insurance.',
      },
      {
        title: 'No Loopholes',
        description: 'Apply to all insulin products, including pumps and pens.',
      },
    ],
    resourceFlow: {
      from: 'Insurance Premiums / Manufacturer Rebates',
      to: 'Diabetic Patients',
      channel: 'Copay cap regulation',
    },
    ifThen: [
      'If you need insulin, you pay no more than $35/month',
      'If rationing stops, diabetic complications decrease',
      'If implemented, fewer ER visits and hospitalizations from uncontrolled diabetes',
    ],
    causalChain: {
      immediate: 'Cap insulin costs at $35/month for all Americans',
      outcome: 'Diabetics afford their medication; health outcomes improve',
    },
    commonQuestions: [
      {
        question: 'Doesn\'t Medicare already do this?',
        answer: 'Yes, since 2023. But private insurance can still charge $300+. This extends the cap to everyone.',
      },
      {
        question: 'Will insulin manufacturers still make insulin?',
        answer: 'Yes. Production costs are minimal. Companies remain profitable even at $35.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'healthcare-costs',
    approachId: 'healthcare-market-reforms',
  },
  // Housing policies
  {
    id: 'first-time-homebuyer-credit',
    rank: 54,
    title: 'First-Time Homebuyer Tax Credit',
    description: 'The median home now costs 5x the median income—up from 3x a generation ago. First-time buyers compete with investors and cash offers, often losing. A tax credit of $10,000-25,000 helps bridge the down payment gap, making homeownership possible for working families.',
    category: 'housing',
    scope: 'federal',
    icon: 'Key',
    averageSupport: 78,
    partySupport: {
      democrats: 87,
      republicans: 68,
      independents: 77,
    },
    sources: [
      {
        organization: 'Morning Consult / Bipartisan Policy Center',
        title: 'Housing Affordability Poll',
        url: 'https://bipartisanpolicy.org',
        year: 2024,
        supportPercentage: 78,
      },
    ],
    notes: [
      'Both Harris and Trump proposed first-time buyer credits in 2024.',
      'The Downpayment Toward Equity Act proposes $20,000+ for first-generation buyers.',
    ],
    details: [
      {
        title: 'Tax Credit',
        description: 'Provide $10,000-25,000 tax credit for first-time homebuyers.',
      },
      {
        title: 'Income Limits',
        description: 'Target middle and working-class families who need help most.',
      },
    ],
    resourceFlow: {
      from: 'Federal Tax Revenue',
      to: 'First-Time Homebuyers',
      channel: 'Refundable tax credit at closing',
    },
    ifThen: [
      'If you\'re buying your first home, you get help with the down payment',
      'If more families can afford down payments, homeownership increases',
      'If implemented, generational wealth building expands to more families',
    ],
    causalChain: {
      immediate: 'Provide tax credit assistance for first-time homebuyers',
      outcome: 'More families achieve homeownership and build wealth',
    },
    commonQuestions: [
      {
        question: 'Won\'t this just raise home prices?',
        answer: 'Without supply increases, yes—some price effect is possible. That\'s why this works best paired with policies that build more housing.',
      },
      {
        question: 'Who qualifies as first-time?',
        answer: 'Typically anyone who hasn\'t owned a home in the past 3 years. Some proposals target first-generation buyers (whose parents didn\'t own either).',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-ownership-paths',
  },
  {
    id: 'zoning-reform-housing-supply',
    rank: 55,
    title: 'Reform Zoning to Allow More Housing',
    description: 'In many cities, it\'s illegal to build anything but single-family homes on 75% of residential land. This artificial scarcity drives up prices. Allowing duplexes, triplexes, and small apartments near transit and jobs means more housing where people want to live.',
    category: 'housing',
    scope: 'state',
    icon: 'Building2',
    averageSupport: 72,
    partySupport: {
      democrats: 76,
      republicans: 68,
      independents: 73,
    },
    sources: [
      {
        organization: 'FT-University of Michigan Poll',
        title: 'Housing Policy Survey',
        url: 'https://news.umich.edu',
        year: 2024,
        supportPercentage: 72,
      },
    ],
    notes: [
      'Bipartisan: California (D) and Montana (R) passed similar zoning reforms.',
      'One of the few areas of housing policy agreement across party lines.',
    ],
    details: [
      {
        title: 'End Exclusionary Zoning',
        description: 'Allow 2-4 unit buildings in single-family zones, especially near transit.',
      },
      {
        title: 'Streamline Permits',
        description: 'Reduce approval timelines that add years and millions to housing projects.',
      },
    ],
    resourceFlow: {
      from: 'State/Local Zoning Authority',
      to: 'Housing Developers & Residents',
      channel: 'Zoning law changes at state level',
    },
    ifThen: [
      'If more housing types are allowed, builders build more units',
      'If supply increases, price growth slows',
      'If implemented, more people can afford to live near jobs and transit',
    ],
    causalChain: {
      immediate: 'Reform zoning to allow more housing types in residential areas',
      outcome: 'Housing supply increases; prices stabilize; more options for renters and buyers',
    },
    commonQuestions: [
      {
        question: 'Will this change my neighborhood?',
        answer: 'Gradually. This allows duplexes and small buildings, not skyscrapers. Many "missing middle" buildings blend into existing neighborhoods.',
      },
      {
        question: 'Why is this a state issue?',
        answer: 'Zoning is traditionally local, but NIMBY resistance often blocks housing. State-level reform can override local restrictions that harm regional affordability.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-market-supply',
  },
  {
    id: 'housing-supply-incentives',
    rank: 56,
    title: 'Federal Incentives for Building More Housing',
    description: 'America is short 4-7 million homes. Local opposition blocks new construction even when demand is clear. Federal incentives can reward communities that allow housing, fund infrastructure for new development, and help builders overcome financing barriers.',
    category: 'housing',
    scope: 'federal',
    icon: 'Hammer',
    averageSupport: 78,
    partySupport: {
      democrats: 83,
      republicans: 71,
      independents: 77,
    },
    sources: [
      {
        organization: 'Bipartisan Policy Center / NHC',
        title: 'Housing Priorities Survey',
        url: 'https://bipartisanpolicy.org',
        year: 2024,
        supportPercentage: 78,
      },
    ],
    notes: [
      '87% of Democrats and 77% of Republicans see bipartisan housing legislation as a priority.',
      'The American Housing Act of 2025 represents bipartisan Congressional action.',
    ],
    details: [
      {
        title: 'Infrastructure Grants',
        description: 'Fund roads, water, and utilities for new housing developments.',
      },
      {
        title: 'Pro-Housing Rewards',
        description: 'Prioritize federal funding for communities that allow more housing construction.',
      },
    ],
    resourceFlow: {
      from: 'Federal Housing & Infrastructure Budgets',
      to: 'State/Local Governments & Builders',
      channel: 'Competitive grants tied to housing production',
    },
    ifThen: [
      'If communities allow housing, they receive federal funding',
      'If infrastructure is funded, housing becomes feasible in more areas',
      'If implemented, housing supply increases where demand is highest',
    ],
    causalChain: {
      immediate: 'Provide federal incentives for communities that allow housing construction',
      outcome: 'More housing gets built; supply catches up with demand',
    },
    commonQuestions: [
      {
        question: 'Isn\'t housing a local issue?',
        answer: 'Shortages are national. When one city doesn\'t build, people move to others, raising prices everywhere. Federal incentives align local interests with national needs.',
      },
      {
        question: 'What if communities still refuse?',
        answer: 'They simply don\'t receive the incentive funding. No mandates—just rewards for good policy.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'housing-affordability',
    approachId: 'housing-market-supply',
  },
  // Childcare & Family policies
  {
    id: 'child-care-tax-credit-expansion',
    rank: 57,
    title: 'Expand Child Care Tax Credits',
    description: 'Child care costs $10,000-20,000 per year—more than rent in most states. Current tax credits cover a fraction of actual costs. Expanding credits puts real money in parents\' pockets, making work affordable and keeping kids in quality care.',
    category: 'family',
    scope: 'federal',
    icon: 'Baby',
    averageSupport: 86,
    partySupport: {
      democrats: 91,
      republicans: 83,
      independents: 83,
    },
    sources: [
      {
        organization: 'First Five Years Fund',
        title: 'Child Care Tax Policy Poll',
        url: 'https://www.ffyf.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    notes: [
      '86% support expanding the Child and Dependent Care Tax Credit.',
      'The 2025 tax reconciliation package permanently improved child care tax credits.',
    ],
    details: [
      {
        title: 'Higher Credit',
        description: 'Increase the maximum credit from $3,000 to cover more of actual child care costs.',
      },
      {
        title: 'Refundable',
        description: 'Make the credit fully refundable so low-income families benefit equally.',
      },
    ],
    resourceFlow: {
      from: 'Federal Tax Revenue',
      to: 'Working Parents',
      channel: 'Refundable tax credit on annual returns',
    },
    ifThen: [
      'If you pay for child care, you get more money back',
      'If credits cover real costs, work becomes financially worthwhile',
      'If implemented, more parents can afford to work and use quality care',
    ],
    causalChain: {
      immediate: 'Expand child care tax credits to cover more of actual costs',
      outcome: 'Working parents keep more income; child care becomes affordable',
    },
    commonQuestions: [
      {
        question: 'Why a tax credit instead of direct subsidies?',
        answer: 'Credits give parents choice. Subsidies can help too—both approaches work. Credits reach parents through the existing tax system.',
      },
      {
        question: 'Does this help stay-at-home parents?',
        answer: 'Tax credits specifically offset child care costs for working parents. Other policies like the Child Tax Credit help all families.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-tax-credits',
  },
  {
    id: 'child-care-federal-funding',
    rank: 58,
    title: 'Increase Federal Child Care Funding (CCDBG)',
    description: 'Only 1 in 6 eligible children receives federal child care assistance—not because parents don\'t need it, but because funding runs out. Increasing federal child care block grants means more families get help, and more providers can offer affordable slots.',
    category: 'family',
    scope: 'federal',
    icon: 'Building',
    averageSupport: 85,
    partySupport: {
      democrats: 96,
      republicans: 74,
      independents: 86,
    },
    sources: [
      {
        organization: 'First Five Years Fund',
        title: 'Child Care Funding Poll',
        url: 'https://www.ffyf.org',
        year: 2024,
        supportPercentage: 85,
      },
    ],
    notes: [
      '85% support increasing CCDBG funding, including 74% of Republicans.',
      'Current funding serves only a fraction of eligible families.',
    ],
    details: [
      {
        title: 'Expand Slots',
        description: 'Fund enough child care assistance to serve all eligible families.',
      },
      {
        title: 'Provider Support',
        description: 'Help child care centers stay open with adequate reimbursement rates.',
      },
    ],
    resourceFlow: {
      from: 'Federal Child Care Budget',
      to: 'States → Child Care Providers → Families',
      channel: 'Child Care Development Block Grants',
    },
    ifThen: [
      'If funding increases, waitlists shrink',
      'If providers are paid fairly, quality improves and they stay open',
      'If implemented, more parents can work knowing their children are cared for',
    ],
    causalChain: {
      immediate: 'Increase federal child care block grant funding',
      outcome: 'More families access affordable care; parents can work; children thrive',
    },
    commonQuestions: [
      {
        question: 'Why does federal funding matter?',
        answer: 'Child care is too expensive for most families without help. Federal funds let states subsidize care for working families who otherwise couldn\'t afford it.',
      },
      {
        question: 'Doesn\'t this grow government?',
        answer: 'It enables work. When parents can afford child care, they earn income, pay taxes, and grow the economy. The investment pays for itself.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-direct-provision',
  },
  {
    id: 'expanded-child-tax-credit',
    rank: 59,
    title: 'Expand the Child Tax Credit',
    description: 'In 2021, the expanded Child Tax Credit cut child poverty nearly in half. When it expired, 3 million children fell back into poverty. Restoring and expanding the CTC puts money directly in families\' hands—letting them decide what their children need most.',
    category: 'family',
    scope: 'federal',
    icon: 'Wallet',
    averageSupport: 72,
    partySupport: {
      democrats: 80,
      republicans: 66,
      independents: 67,
    },
    sources: [
      {
        organization: 'Data for Progress',
        title: 'Child Tax Credit Survey',
        url: 'https://dataforprogress.org',
        year: 2024,
        supportPercentage: 72,
      },
    ],
    notes: [
      '72% support expanding the CTC, including majorities of all parties.',
      'The 2021 expansion reduced child poverty by 46% before expiring.',
    ],
    details: [
      {
        title: 'Restore Full Refundability',
        description: 'Ensure the poorest families—who need it most—receive the full credit.',
      },
      {
        title: 'Increase Amount',
        description: 'Raise the credit above $2,000 per child to reflect actual child-rearing costs.',
      },
    ],
    resourceFlow: {
      from: 'Federal Tax Revenue',
      to: 'Families with Children',
      channel: 'Monthly payments or annual tax refund',
    },
    ifThen: [
      'If you have children, you receive more support',
      'If credits are refundable, the poorest families benefit',
      'If implemented, child poverty drops and families have more stability',
    ],
    causalChain: {
      immediate: 'Expand and make the Child Tax Credit fully refundable',
      outcome: 'Child poverty decreases; families have resources to raise healthy children',
    },
    commonQuestions: [
      {
        question: 'Doesn\'t this discourage work?',
        answer: 'Research from the 2021 expansion found no negative effect on employment. Most recipients are already working.',
      },
      {
        question: 'Why give cash instead of services?',
        answer: 'Parents know what their children need—food, clothes, medicine, utilities. Cash gives them flexibility services can\'t match.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-12-01',
    problemAreaId: 'childcare-family',
    approachId: 'childcare-tax-credits',
  },
];

/*
*/

/**
 * Get top N policies
 */
export function getTopPolicies(limit: number = 10): Policy[] {
  return [...policies]
    .sort((a, b) => b.averageSupport - a.averageSupport || a.rank - b.rank)
    .slice(0, Math.max(0, limit));
}

/**
 * Get policy by ID
 */
export function getPolicyById(id: string): Policy | undefined {
  return policies.find((policy) => policy.id === id);
}

/**
 * Get policies by category
 */
export function getPoliciesByCategory(category: string): Policy[] {
  return policies.filter((policy) => policy.category === category);
}

/**
 * Get all policies sorted by average support (desc), tie-break by rank (asc)
 */
export function getAllPoliciesSorted(): Policy[] {
  return [...policies].sort((a, b) => b.averageSupport - a.averageSupport || a.rank - b.rank);
}

/**
 * Get total policies count
 */
export function getPoliciesCount(): number {
  return policies.length;
}