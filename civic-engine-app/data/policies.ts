import { Policy } from '../types/policy';

/**
 * Real consensus policy data from "The Hidden Consensus" Report (2025)
 * Sources: Program for Public Consultation (PPC), University of Maryland, Gallup, Pew Research, National Skills Coalition
 * All policies listed have supermajority bipartisan support.
 */

export const policies: Policy[] = [
  {
    id: 'social-security-cap',
    rank: 1,
    title: 'Shore Up Social Security ("Donut Hole")',
    description: 'Ensure Social Security solvency by applying the payroll tax to earnings above $400,000, eliminating 61% of the shortfall without raising middle-class taxes.',
    category: 'economy',
    scope: 'federal',
    icon: 'Umbrella',
    averageSupport: 87,
    partySupport: {
      democrats: 91,
      republicans: 86,
      independents: 87,
    },
    sources: [
      {
        organization: 'Program for Public Consultation (PPC)',
        title: 'Social Security Solvency Report',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 87,
      },
    ],
    notes: [
      'Refers specifically to the "donut hole" approach: taxing earnings above $400k while preserving the current cap for middle-income earners.',
    ],
    details: [
      {
        title: 'The "Donut Hole" Solution',
        description: 'Retains the current cap (approx $168k) but reinstates taxes on earnings above $400k, protecting the middle class while capturing high-earner revenue.',
      },
      {
        title: 'Solvency Impact',
        description: 'This single measure eliminates approximately 61% of the program\'s long-term financial shortfall.',
      },
    ],
    resourceFlow: {
      from: 'High earners (wages >$400k)',
      to: 'Social Security Trust Fund',
      channel: 'Payroll tax expansion (Revenue-side fix)',
    },
    ifThen: [
      'If you earn under $168,000, your taxes remain exactly the same',
      'If you earn over $400,000, you contribute payroll tax on that excess amount',
      'If enacted, future retirees avoid draconian benefit cuts projected for the 2030s',
    ],
    causalChain: {
      immediate: 'Lift the payroll tax cap for earnings over $400,000',
      outcome: 'Extends Social Security solvency for decades and restores public confidence in the safety net',
    },
    commonQuestions: [
      {
        question: 'Why $400,000?',
        answer: 'It creates a protective buffer for the upper-middle class while ensuring the wealthy contribute more, aligning with pledges to not tax those earning under $400k.',
      },
      {
        question: 'Is this enough?',
        answer: 'It solves most of the problem (61%). The public also supports a small, gradual rate increase (from 6.2% to 6.5% over 6 years) to cover the remaining gap.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-03-01',
  },
  {
    id: 'congress-stock-ban',
    rank: 2,
    title: 'Ban Congressional Stock Trading',
    description: 'Prohibit Members of Congress, their spouses, and dependents from trading individual stocks to prevent insider trading and restore public trust.',
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
      'Support levels include explicit bans for spouses and dependents, which significantly contributes to the high public approval.',
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
  },
  {
    id: 'congress-term-limits',
    rank: 3,
    title: 'Congressional Term Limits',
    description: 'A Constitutional Amendment establishing specific term limits: 3 terms (6 years) for the House and 2 terms (12 years) for the Senate.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 85,
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
        supportPercentage: 85,
      },
    ],
    notes: [
      'Specifically refers to the 3 House (6 years) / 2 Senate (12 years) term-limit model favored by voters.',
    ],
    details: [
      {
        title: 'The 3-House / 2-Senate Model',
        description: 'The public specifically favors limiting House members to 3 terms and Senators to 2 terms.',
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
      'If a Representative serves 6 years, they cannot run for the House again',
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
  },
  {
    id: 'right-to-repair',
    rank: 4,
    title: 'National Right to Repair Act',
    description: 'Mandate that manufacturers provide consumers and independent shops with the data, tools, and parts needed to repair vehicles and electronics.',
    category: 'economy',
    scope: 'federal',
    icon: 'Wrench',
    averageSupport: 83,
    partySupport: {
      democrats: 82,
      republicans: 84,
      independents: 83,
    },
    sources: [
      {
        organization: 'CAR Coalition / Consumer Reports',
        title: 'National Right to Repair Survey',
        url: 'https://carcoalition.com',
        year: 2025,
        supportPercentage: 83,
      },
    ],
    notes: [
      'Support is based on CAR Coalition data and explicitly includes access to vehicle telematics and repair information.',
    ],
    details: [
      {
        title: 'Vehicle Telematics',
        description: 'Ensures independent mechanics can access the wireless diagnostic data currently locked by manufacturers.',
      },
      {
        title: 'Consumer Choice',
        description: '98% of Americans agree vehicle owners should be able to choose their repair shop.',
      },
    ],
    resourceFlow: {
      from: 'Manufacturer Monopolies',
      to: 'Independent Shops & Consumers',
      channel: 'Legislative mandate (REPAIR Act)',
    },
    ifThen: [
      'If your tractor breaks, you can fix it yourself without waiting for a dealer technician',
      'If you go to an independent mechanic, they can access the same diagnostic codes as the dealership',
      'If passed, repair costs likely decrease due to increased market competition',
    ],
    causalChain: {
      immediate: 'Mandate release of repair tools, manuals, and software',
      outcome: 'Ends "digital feudalism," lowers consumer costs, and supports small business repair shops',
    },
    commonQuestions: [
      {
        question: 'Is this safe?',
        answer: 'Advocates argue that security standards (like those in banking) can protect data while still allowing repairs, and that safety claims are often used to protect profits.',
      },
      {
        question: 'Who supports this?',
        answer: 'It unites rural farmers (who need to fix equipment) and urban tech users, garnering slightly higher support from Republicans than Democrats.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'medicare-drug-negotiation',
    rank: 5,
    title: 'Universal Drug Price Negotiation',
    description: 'Expand Medicare\'s power to negotiate prices for ALL prescription drugs and cap annual price increases at the rate of inflation.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'Pill',
    averageSupport: 84,
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
        year: 2025,
        supportPercentage: 84,
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
  },
  {
    id: 'ai-safety-regulation',
    rank: 6,
    title: 'AI Safety & Deepfake Liability',
    description: 'Establish federal liability for AI companies regarding deepfakes and mandate safety certification for high-risk models before release.',
    category: 'technology',
    scope: 'federal',
    icon: 'Bot',
    averageSupport: 79,
    partySupport: {
      democrats: 88,
      republicans: 79,
      independents: 79,
    },
    sources: [
      {
        organization: 'AI Policy Institute / Gallup',
        title: 'Americans on Regulating AI',
        url: 'https://theaipi.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    notes: [
      'Public support centers on mandatory safety testing and deepfake liability, not generic AI regulation.',
    ],
    details: [
      {
        title: 'Deepfake Liability',
        description: 'Companies become liable for harmful non-consensual deepfakes produced by their tools.',
      },
      {
        title: 'Safety First',
        description: '80% of Americans prioritize safety regulations over the speed of AI development.',
      },
    ],
    resourceFlow: {
      from: 'Tech Industry Unchecked Growth',
      to: 'Public Safety & Truth',
      channel: 'Federal regulation (FTC/NIST)',
    },
    ifThen: [
      'If an AI model is "high risk," it must pass safety tests before public release',
      'If a platform hosts political deepfakes, they lose immunity and can be sued',
      'If you are victimized by AI content, you have legal recourse',
    ],
    causalChain: {
      immediate: 'Mandate safety testing and remove Section 230 for AI',
      outcome: 'Slows reckless deployment, protects election integrity, and ensures accountability for digital harms',
    },
    commonQuestions: [
      {
        question: 'Will this slow us down?',
        answer: 'Likely yes. However, voters overwhelmingly (80%) prefer safety over speed, rejecting the "arms race" narrative.',
      },
      {
        question: 'Is this partisan?',
        answer: 'No. Republicans fear censorship/bias, Democrats fear discrimination/misinfo, but both agree on the need for strict guardrails.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-08-20',
  },
  {
    id: 'rural-broadband-access',
    rank: 7,
    title: 'Universal Broadband & Municipal Internet',
    description: 'Fund universal high-speed internet for rural areas and legalize municipal (local government-run) broadband networks to spur competition.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'Wifi',
    averageSupport: 76,
    partySupport: {
      democrats: 80,
      republicans: 68,
      independents: 70,
    },
    sources: [
      {
        organization: 'Pew Research Center',
        title: 'Broadband Access Survey',
        url: 'https://pewresearch.org',
        year: 2024,
        supportPercentage: 76,
      },
    ],
    notes: [
      'Support reflects an aggregate of funding for rural access and legalization of municipal broadband to increase competition.',
    ],
    details: [
      {
        title: 'Right to Compete',
        description: '70% support allowing cities/towns to build their own networks if private ISPs fail to serve them.',
      },
      {
        title: 'Utility Mindset',
        description: 'Broadband is viewed as essential infrastructure, akin to electricity or water.',
      },
    ],
    resourceFlow: {
      from: 'Federal Grants & Local Bonds',
      to: 'Underserved Communities',
      channel: 'Infrastructure investment (ACP/ReConnect)',
    },
    ifThen: [
      'If private cable ignores your town, your local government can build its own fiber network',
      'If you live in a rural area, federal funds subsidize the cost of running lines to your home',
      'If municipal broadband is legal, competition forces private ISPs to lower prices',
    ],
    causalChain: {
      immediate: 'Fund rural buildout and ban state restrictions on municipal internet',
      outcome: 'Closes the digital divide and enables economic participation for rural Americans',
    },
    commonQuestions: [
      {
        question: 'Is this socialism?',
        answer: 'Voters see it as "local control." If the free market (private ISPs) won\'t serve a community, the community wants the right to serve itself.',
      },
      {
        question: 'Why the bipartisan support?',
        answer: 'It benefits key constituencies of both parties: rural Republican districts and low-income Democratic urban areas.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-04-10',
  },
  {
    id: 'campaign-finance-disclosure',
    rank: 8,
    title: 'Mandate "Dark Money" Disclosure',
    description: 'Pass the DISCLOSE Act to require Super PACs to make major donors public and ban foreign spending on ballot measures.',
    category: 'governance',
    scope: 'federal',
    icon: 'Eye',
    averageSupport: 79,
    partySupport: {
      democrats: 88,
      republicans: 70,
      independents: 78,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'Campaign Finance Report',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    notes: [
      'Represents support for the DISCLOSE Act and for banning foreign funding of ballot initiatives.',
    ],
    details: [
      {
        title: 'Foreign Spending Ban',
        description: '80% support banning foreign entities from funding state ballot initiatives (closing a current loophole).',
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
  },
  {
    id: 'immigration-grand-bargain',
    rank: 9,
    title: 'Immigration Grand Bargain',
    description: 'A comprehensive deal pairing mandatory E-Verify for all employers (to stop illegal hiring) with a path to citizenship for "Dreamers".',
    category: 'justice',
    scope: 'federal',
    icon: 'Scale',
    averageSupport: 76,
    partySupport: {
      democrats: 88,
      republicans: 75,
      independents: 84,
    },
    sources: [
      {
        organization: 'National Immigration Forum / Gallup',
        title: 'Immigration Policy Survey',
        url: 'https://immigrationforum.org',
        year: 2025,
        supportPercentage: 76,
      },
    ],
    notes: [
      'Represents the “Grand Bargain”: pairing mandatory E-Verify (enforcement) with a path to citizenship for Dreamers (legalization).',
    ],
    details: [
      {
        title: 'The Trade-Off',
        description: 'Combines the GOP priority (E-Verify/Enforcement) with the Dem priority (Dreamer legalization).',
      },
      {
        title: 'E-Verify Support',
        description: '78% of voters support mandatory electronic verification of all new hires to deter illegal immigration.',
      },
    ],
    resourceFlow: {
      from: 'Illegal Labor Market',
      to: 'Legal Workforce',
      channel: 'DHS Enforcement & USCIS Legalization',
    },
    ifThen: [
      'If you apply for a job, the employer must digitally verify your legal status',
      'If you are a Dreamer, you can earn citizenship through work or education',
      'If businesses hire undocumented workers, they face automatic detection',
    ],
    causalChain: {
      immediate: 'Mandate E-Verify and pass the Dream Act',
      outcome: 'Turns off the "jobs magnet" for illegal crossings while solving the status of long-term residents',
    },
    commonQuestions: [
      {
        question: 'Why hasn\'t this passed?',
        answer: 'Primary politics: The GOP base resists "amnesty" and the Dem base resists "enforcement," despite the general public supporting the combination.',
      },
      {
        question: 'Does E-Verify work?',
        answer: 'It is over 98% accurate and is viewed as the most effective tool to stop the employment of unauthorized workers.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-15',
  },
  {
    id: 'vocational-training',
    rank: 10,
    title: 'Invest in Vocational Training',
    description: 'Shift federal funding toward apprenticeships and trade schools, and mandate "skills-based hiring" (dropping degree requirements) for federal contractors.',
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
  },
];

/*
   DATA NOTES & VERIFICATION:
   1. Social Security (87%): Specifically refers to the "donut hole" tax (taxing earnings >$400k).
   2. Stock Ban (86%): Includes banning spouses/dependents, which drives the high support number.
   3. Term Limits (85%): Refers to the specific Constitutional Amendment proposal (3 House / 2 Senate terms)[cite: 78].
   4. Right to Repair (83%): Based on CAR Coalition data; explicitly includes vehicle data access[cite: 99].
   5. Drug Negotiation (84%): Refers to *universal* negotiation (all drugs), not the limited IRA list[cite: 119].
   6. AI Regulation (79%): Specifically for *mandatory testing* of models, not generic regulation[cite: 140].
   7. Broadband (76%): Aggregated support for federal subsidies + municipal broadband rights[cite: 158].
   8. Dark Money (79%): Support for DISCLOSE Act and banning foreign ballot funding[cite: 175].
   9. Immigration (76%): Represents the "Grand Bargain" package (E-Verify + Dreamers), not policies in isolation.
   10. Vocational (82%): Support for funding skills training/apprenticeships over 4-year degrees[cite: 202].
*/

/**
 * Get top N policies
 */
export function getTopPolicies(limit: number = 10): Policy[] {
  return policies.slice(0, limit);
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