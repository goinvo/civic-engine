import { Policy } from '../types/policy';

/**
 * Real consensus policy data from "The Hidden Consensus" Report (2025) & "The Converging Center" (2025)
 * Sources: Program for Public Consultation (PPC), Gallup, Pew Research, Voice of the People.
 * All policies listed have supermajority bipartisan support or strong cross-partisan consensus.
 */

export const policies: Policy[] = [
  // --- EXISTING TOP 10 (Verified) ---
  {
    id: 'social-security-cap',
    rank: 1,
    title: 'Shore Up Social Security ("Donut Hole")',
    description: 'Ensure Social Security solvency by applying the payroll tax to earnings above $400,000, eliminating 60% of the shortfall without raising middle-class taxes.',
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
        description: 'Retains the current cap ($169k) but reinstates taxes on earnings above $400k, protecting the middle class while capturing high-earner revenue.',
      },
      {
        title: 'Solvency Impact',
        description: 'This single measure eliminates approximately 60% of the program\'s long-term financial shortfall.',
      },
    ],
    resourceFlow: {
      from: 'High earners (wages >$400k)',
      to: 'Social Security Trust Fund',
      channel: 'Payroll tax expansion (Revenue-side fix)',
    },
    ifThen: [
      'If you earn under $169,000, your taxes remain exactly the same',
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
        answer: 'It creates a protective buffer for the upper-middle class while ensuring the wealthy contribute more.',
      },
      {
        question: 'Is this enough?',
        answer: 'It solves most of the problem (60%). The public also supports a small, gradual rate increase to cover the remaining gap.',
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
  },
  {
    id: 'congress-term-limits',
    rank: 3,
    title: 'Congressional Term Limits',
    description: 'A Constitutional Amendment establishing specific term limits: 4 terms (8 years) for the House and 2 terms (12 years) for the Senate.',
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
        answer: 'Advocates argue that security standards (like those in banking) can protect data while still allowing repairs.',
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
        organization: 'AI Policy Institute; Gallup/SCSP (combined polling)',
        title: 'Americans on Regulating AI',
        url: 'https://theaipi.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    notes: [
      'Support based on AI Policy Institute polling on deepfake liability and Gallup-SCSP polling showing 80% prioritize safety over speed. Public support centers on mandatory safety testing and deepfake liability, not generic AI regulation.',
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
        organization: 'Composite estimate (Gallup, NIF, Pew)',
        title: 'Immigration Policy Surveys (2023-2025)',
        url: 'https://immigrationforum.org',
        year: 2025,
        supportPercentage: 76,
      },
    ],
    notes: [
      'Composite estimate based on separate polling for E-Verify (~75-80% support) and Dreamer citizenship (~80-85% support). Represents the "Grand Bargain": pairing mandatory E-Verify (enforcement) with a path to citizenship for Dreamers (legalization).',
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

  // --- NEW POLICIES (11-30) ---

  {
    id: 'kids-online-safety',
    rank: 11,
    title: 'Kids Online Safety Act (KOSA)',
    description: 'Establish a digital "duty of care" requiring platforms to prevent specific harms to minors (suicide promotion, eating disorders) and disable addictive features.',
    category: 'technology',
    scope: 'federal',
    icon: 'ShieldCheck',
    averageSupport: 83,
    partySupport: {
      democrats: 86,
      republicans: 80,
      independents: 82,
    },
    sources: [
      {
        organization: 'Navigator Research',
        title: 'Privacy & Online Safety Poll',
        url: 'https://navigatorresearch.org',
        year: 2025,
        supportPercentage: 83,
      },
    ],
    notes: [
      'Over 80% of voters rank privacy legislation as a "top" priority. Passed Senate 91-3',
    ],
    details: [
      {
        title: 'Duty of Care',
        description: 'Platforms must take reasonable measures to mitigate specific harms like suicide promotion and sexual exploitation',
      },
      {
        title: 'Default Protections',
        description: 'Mandates strongest privacy settings by default for users under 17',
      },
    ],
    resourceFlow: {
      from: 'Social Media Ad Revenue',
      to: 'Child Mental Health',
      channel: 'FTC Regulatory Enforcement',
    },
    ifThen: [
      'If you are under 17, your account defaults to high privacy settings',
      'If a platform\'s algorithm promotes self-harm content, they can be sued',
      'If you are a parent, you have tools to limit addictive features like infinite scroll',
    ],
    causalChain: {
      immediate: 'Establish duty of care for minors online',
      outcome: 'Reduces algorithmic amplification of harmful content and improves teen mental health outcomes',
    },
    commonQuestions: [
      {
        question: 'Is this censorship?',
        answer: 'Critics fear it could be used to suppress content, but proponents argue it regulates platform design (algorithms), not specific speech',
      },
      {
        question: 'Does it require ID?',
        answer: 'Age verification is a major friction point; critics argue it compromises privacy for all users',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-05-15',
  },
  {
    id: 'universal-background-checks',
    rank: 12,
    title: 'Universal Background Checks',
    description: 'Require background checks for all gun sales, closing loopholes for private transfers and gun shows.',
    category: 'justice',
    scope: 'federal',
    icon: 'FileSearch',
    averageSupport: 93,
    partySupport: {
      democrats: 97,
      republicans: 89,
      independents: 93,
    },
    sources: [
      {
        organization: 'Quinnipiac / Giffords Law Center',
        title: 'Gun Safety Consensus Poll',
        url: 'https://giffords.org',
        year: 2024,
        supportPercentage: 93,
      },
    ],
    notes: [
      'Consistently the most popular unimplemented policy in the US, with 85-93% support.',
    ],
    details: [
      {
        title: 'Closing Loopholes',
        description: 'Extends checks to gun shows and private sales, which currently bypass the NICS system',
      },
      {
        title: 'Broad Consensus',
        description: 'Support extends to gun owners and NRA members.',
      },
    ],
    resourceFlow: {
      from: 'Unregulated Private Sales',
      to: 'Public Safety',
      channel: 'NICS Database Expansion',
    },
    ifThen: [
      'If you buy a gun at a show, you must pass a background check',
      'If you sell a gun to a neighbor, you must process the transfer through a dealer',
      'If you are a felon, you cannot exploit private sale loopholes',
    ],
    causalChain: {
      immediate: 'Mandate checks for all transfers',
      outcome: 'Prevents prohibited persons from acquiring firearms without infringing on lawful ownership',
    },
    commonQuestions: [
      {
        question: 'Does this create a registry?',
        answer: 'No. The background check system verifies eligibility but does not create a federal registry of gun owners.',
      },
      {
        question: 'Why hasn\'t it passed?',
        answer: 'Legislative inertia and pressure from gun rights groups who fear it is a slippery slope to registration.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'free-easy-voter-id',
    rank: 13,
    title: 'Free and Easy Voter ID',
    description: 'Mandate that any state requiring Voter ID must provide the ID and necessary documents for free, with streamlined access.',
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
  },
  {
    id: 'junk-fee-prevention',
    rank: 14,
    title: 'Junk Fee Prevention Act',
    description: 'Ban hidden mandatory fees for hotels, tickets, and airlines, requiring "all-in pricing" where the advertised price is the final price.',
    category: 'economy',
    scope: 'federal',
    icon: 'Tag',
    averageSupport: 87,
    partySupport: {
      democrats: 90,
      republicans: 81,
      independents: 85,
    },
    sources: [
      {
        organization: 'Navigator Research',
        title: 'Consumer Protection Survey',
        url: 'https://navigatorresearch.org',
        year: 2025,
        supportPercentage: 87,
      },
    ],
    notes: [
      'One of the few issues with identical intensity of support across parties',
    ],
    details: [
      {
        title: 'All-In Pricing',
        description: 'Merchants must display the total price, including all mandatory fees, upfront',
      },
      {
        title: 'Bipartisan Grievance',
        description: 'Unites consumers against deceptive corporate practices',
      },
    ],
    resourceFlow: {
      from: 'Deceptive Corporate Revenue',
      to: 'Consumer Wallets',
      channel: 'FTC Enforcement / Legislation',
    },
    ifThen: [
      'If you book a hotel, the price you see on the map is the price you pay',
      'If you buy concert tickets, there are no surprise "service fees" at checkout',
      'If companies hide fees, they face federal penalties',
    ],
    causalChain: {
      immediate: 'Mandate transparency in pricing',
      outcome: 'Increases market competition and saves consumers billions in hidden costs',
    },
    commonQuestions: [
      {
        question: 'Does this lower prices?',
        answer: 'It may not lower the *base* price, but it allows consumers to comparison shop accurately, which drives competition.',
      },
      {
        question: 'Who opposes this?',
        answer: 'Hospitality and airline lobbies, who profit from "drip pricing"',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-06-10',
  },
  {
    id: 'childcare-tax-credit',
    rank: 15,
    title: 'Expand Child Tax Credit',
    description: 'Significantly increase the Child Tax Credit (e.g., to $4,000) to make childcare affordable and reduce child poverty.',
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
  },
  {
    id: 'scotus-term-limits',
    rank: 16,
    title: 'Supreme Court Term Limits (18 Years)',
    description: 'Limit Supreme Court Justices to 18-year non-renewable terms, with a new appointment every two years, to depoliticize the court.',
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
  },
  {
    id: 'ultra-millionaire-tax',
    rank: 17,
    title: 'Ultra-Millionaire Wealth Tax',
    description: 'Implement a 2% tax on wealth above $50 million and 3% on wealth above $1 billion to fund social programs and reduce inequality.',
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
  },
  {
    id: 'end-citizens-united',
    rank: 18,
    title: 'End Corporate Personhood',
    description: 'Pass a Constitutional Amendment to overturn Citizens United, establishing that corporations are not people and money is not speech.',
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
  },
  {
    id: 'national-service',
    rank: 19,
    title: 'Voluntary National Service',
    description: 'Expand voluntary national service programs (like AmeriCorps) with robust incentives, aiming for 1 year of service by age 25.',
    category: 'society',
    scope: 'federal',
    icon: 'Hand', // Helping hand
    averageSupport: 80,
    partySupport: {
      democrats: 83,
      republicans: 77,
      independents: 80,
    },
    sources: [
      {
        organization: 'Civic Enterprises / Brookings',
        title: 'National Service Poll',
        url: 'https://www.brookings.edu',
        year: 2025,
        supportPercentage: 80,
      },
    ],
    notes: [
      'Support is for *voluntary* service (~80%); mandatory service has much lower support (around 50% or below).',
    ],
    details: [
      {
        title: 'Civic Glue',
        description: 'Programs like AmeriCorps increase long-term voter turnout and bridge cultural divides',
      },
      {
        title: 'Incentives',
        description: 'Offers tuition assistance and debt relief in exchange for service.',
      },
    ],
    resourceFlow: {
      from: 'Federal Funding',
      to: 'Community Projects & Youth Development',
      channel: 'AmeriCorps / Peace Corps',
    },
    ifThen: [
      'If you serve a year, you get college tuition assistance',
      'If you join, you work on community projects in different parts of the country',
      'If expanded, civic engagement increases among young people',
    ],
    causalChain: {
      immediate: 'Fund and expand voluntary service opportunities',
      outcome: 'Strengthens social cohesion and provides workforce training',
    },
    commonQuestions: [
      {
        question: 'Is this a draft?',
        answer: 'No. It is strictly voluntary. Mandatory service is divisive and faces legal hurdles',
      },
      {
        question: 'What do they do?',
        answer: 'Disaster relief, education (tutoring), conservation, and elderly care.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-20',
  },
  {
    id: 'irs-direct-file',
    rank: 20,
    title: 'Simplified Tax Filing (Direct File)',
    description: 'Make the IRS "Direct File" program permanent and expanded, allowing taxpayers to file for free directly with the IRS.',
    category: 'governance',
    scope: 'federal',
    icon: 'FileText',
    averageSupport: 73,
    partySupport: {
      democrats: 85,
      republicans: 60,
      independents: 73,
    },
    sources: [
      {
        organization: 'Navigator Research / Tax Policy Center',
        title: 'Direct File Survey',
        url: 'https://taxpolicycenter.org',
        year: 2025,
        supportPercentage: 73,
      },
    ],
    notes: [
      'About 73% of filers say they would be interested in using Direct File. IRS user survey found 94% satisfaction among pilot participants.',
    ],
    details: [
      {
        title: 'Pre-filled Returns',
        description: 'The IRS uses existing data (W-2s) to pre-populate returns, saving time and money',
      },
      {
        title: 'Success Story',
        description: 'Expanded to 25 states in 2025 due to overwhelming demand',
      },
    ],
    resourceFlow: {
      from: 'Tax Prep Industry Profits',
      to: 'Taxpayer Savings',
      channel: 'IRS Direct Software',
    },
    ifThen: [
      'If you have a simple return, you can file for free in minutes on the IRS website',
      'If enacted, you avoid paying fees to private tax prep companies',
      'If pre-filling is added, you just verify the data the IRS already has',
    ],
    causalChain: {
      immediate: 'Expand IRS Direct File nationwide',
      outcome: 'Reduces compliance burden and saves taxpayers billions',
    },
    commonQuestions: [
      {
        question: 'Why do we pay to file now?',
        answer: 'The tax prep lobby historically blocked the IRS from offering a free alternative',
      },
      {
        question: 'Is it mandatory?',
        answer: 'No. You can still use an accountant or private software if you choose.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-04-15',
  },
  {
    id: 'foreign-farmland-ban',
    rank: 21,
    title: 'Ban Foreign Ownership of Farmland',
    description: 'Prohibit "foreign adversaries" (e.g., China, Russia) from purchasing U.S. agricultural land to protect food security.',
    category: 'security',
    scope: 'federal',
    icon: 'Shield',
    averageSupport: 82,
    partySupport: {
      democrats: 75,
      republicans: 90,
      independents: 80,
    },
    sources: [
      {
        organization: 'Program for Public Consultation',
        title: 'National Security Survey',
        url: 'https://publicconsultation.org',
        year: 2025,
        supportPercentage: 82,
      },
    ],
    notes: [
      'Driven by food security concerns and geopolitical tensions; 29 states have already acted',
    ],
    details: [
      {
        title: 'National Security',
        description: 'Prevents adversaries from controlling critical food supply chains or spying near bases',
      },
      {
        title: 'Bipartisan Push',
        description: 'Strong support from rural Republicans and security-conscious Democrats',
      },
    ],
    resourceFlow: {
      from: 'Foreign Investment',
      to: 'Domestic Control',
      channel: 'CFIUS / State Laws',
    },
    ifThen: [
      'If a Chinese state-owned company tries to buy farmland, the sale is blocked',
      'If enacted, U.S. food supply chains remain under domestic control',
      'If implemented poorly, it faces legal challenges over discrimination ',
    ],
    causalChain: {
      immediate: 'Ban land sales to adversary nations',
      outcome: 'Protects national security but requires care to avoid civil rights violations',
    },
    commonQuestions: [
      {
        question: 'Is this discriminatory?',
        answer: 'Civil rights groups argue it echoes past "Alien Land Laws." DOJ has raised concerns about housing discrimination',
      },
      {
        question: 'How much land do they own?',
        answer: 'Currently a small percentage, but the *rate* of purchase has sparked alarm.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-08-10',
  },
  {
    id: 'minimum-wage-17',
    rank: 22,
    title: 'Raise Minimum Wage ($17)',
    description: 'Raise the federal minimum wage to $17/hour by 2030 and index it to inflation to ensure a living wage.',
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
  },
  {
    id: 'public-option-healthcare',
    rank: 23,
    title: 'Healthcare Public Option',
    description: 'Create a government-run health insurance plan available to all, competing with private insurers to lower costs.',
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
  },
  {
    id: 'nuclear-energy-expansion',
    rank: 24,
    title: 'Expand Nuclear Energy (ADVANCE Act)',
    description: 'Accelerate the deployment of advanced nuclear reactors to ensure reliable, carbon-free baseload power.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'Zap',
    averageSupport: 61,
    partySupport: {
      democrats: 58,
      republicans: 67,
      independents: 60,
    },
    sources: [
      {
        organization: 'Pew Research Center',
        title: 'Energy Attitudes Survey',
        url: 'https://pewresearch.org',
        year: 2025,
        supportPercentage: 61,
      },
    ],
    notes: [
      'Support has surged 16+ points since 2020, driven by energy security and AI power needs',
    ],
    details: [
      {
        title: 'Regulatory Streamlining',
        description: 'The ADVANCE Act cuts red tape for licensing new small modular reactors (SMRs)',
      },
      {
        title: 'Brownfield Reuse',
        description: 'Incentivizes building nuclear plants at retired coal sites to use existing transmission lines',
      },
    ],
    resourceFlow: {
      from: 'Regulatory Hurdles',
      to: 'Clean Power Generation',
      channel: 'NRC Reform / ADVANCE Act',
    },
    ifThen: [
      'If a coal plant closes, it can be converted to a nuclear site',
      'If AI data centers need power, nuclear provides 24/7 carbon-free energy',
      'If successful, the US regains leadership in nuclear technology',
    ],
    causalChain: {
      immediate: 'Streamline nuclear licensing',
      outcome: 'Increases clean baseload power and energy independence',
    },
    commonQuestions: [
      {
        question: 'Is it safe?',
        answer: 'Modern "advanced" reactors have passive safety systems that physically prevent meltdowns.',
      },
      {
        question: 'What about waste?',
        answer: 'Advanced reactors produce less waste, but long-term storage remains a political challenge.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-10-01',
  },
  {
    id: 'police-accountability',
    rank: 25,
    title: 'Police Accountability Standards',
    description: 'Mandate de-escalation training, ban chokeholds, and create a national misconduct registry to prevent abusive officers from switching agencies.',
    category: 'justice',
    scope: 'federal',
    icon: 'BadgeAlert',
    averageSupport: 84,
    partySupport: {
      democrats: 92,
      republicans: 82,
      independents: 84,
    },
    sources: [
      {
        organization: 'Voice of the People',
        title: 'Police Reform Survey',
        url: 'https://vop.org',
        year: 2025,
        supportPercentage: 84,
      },
    ],
    notes: [
      'Specific reforms (registry, training) have 90%+ support; "Qualified Immunity" reform is the sticking point',
    ],
    details: [
      {
        title: 'Misconduct Registry',
        description: 'Prevents "wandering officers" by tracking those fired for misconduct in a national database',
      },
      {
        title: 'Duty to Intervene',
        description: '95% support requiring officers to intervene if a colleague uses excessive force',
      },
    ],
    resourceFlow: {
      from: 'Unchecked Misconduct',
      to: 'Professional Standards',
      channel: 'Federal Funding Conditions',
    },
    ifThen: [
      'If an officer is fired for abuse, they cannot get hired by the next town over',
      'If an officer sees a colleague using excessive force, they are legally required to stop it',
      'If chokeholds are used, federal funding is withheld',
    ],
    causalChain: {
      immediate: 'Standardize use-of-force rules and tracking',
      outcome: 'Reduces police violence and restores community trust',
    },
    commonQuestions: [
      {
        question: 'Does this defund the police?',
        answer: 'No. It conditions funding on standards. Republicans support the accountability measures (82%)',
      },
      {
        question: 'What about lawsuits?',
        answer: 'The popular consensus excludes ending Qualified Immunity, which is divisive.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-09-10',
  },
  {
    id: 'affordable-housing-supply',
    rank: 26,
    title: 'Affordable Housing Supply (NHIA)',
    description: 'Create tax credits for building and renovating homes in distressed areas to close the "appraisal gap" and increase supply.',
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
  },
  {
    id: 'mental-health-988',
    rank: 27,
    title: '988 Mental Health Lifeline',
    description: 'Ensure long-term funding and specialized access (e.g., LGBTQ+ youth) for the 988 Suicide & Crisis Lifeline.',
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
  },
  {
    id: 'cannabis-banking-safer',
    rank: 28,
    title: 'Cannabis Banking (SAFER Act)',
    description: 'Allow banks to serve state-legal cannabis businesses to reduce cash-related crimes and improve transparency.',
    category: 'economy',
    scope: 'federal',
    icon: 'Landmark', // Bank
    averageSupport: 64,
    partySupport: {
      democrats: 75,
      republicans: 55,
      independents: 64,
    },
    sources: [
      {
        organization: 'ICBA / Data for Progress',
        title: 'Banking Access Survey',
        url: 'https://icba.org',
        year: 2025,
        supportPercentage: 64,
      },
    ],
    notes: [
      'Framed as a public safety issue (reducing robbery risk) rather than legalization',
    ],
    details: [
      {
        title: 'Public Safety',
        description: 'Taking cash off the streets prevents violent robberies of dispensaries',
      },
      {
        title: 'Operation Choke Point',
        description: 'Includes protections preventing regulators from targeting politically disfavored industries (guns/oil) to win GOP votes',
      },
    ],
    resourceFlow: {
      from: 'Cash Economy',
      to: 'Regulated Banking System',
      channel: 'SAFER Banking Act',
    },
    ifThen: [
      'If a dispensary can use a bank, they stop holding millions in cash',
      'If banks are protected, they can offer loans to small cannabis businesses',
      'If enacted, tax collection becomes more efficient',
    ],
    causalChain: {
      immediate: 'Safe harbor for banks serving cannabis',
      outcome: 'Improves public safety and brings a grey market into the financial system',
    },
    commonQuestions: [
      {
        question: 'Does this legalize weed?',
        answer: 'No. It only addresses banking for businesses legal under *state* law.',
      },
      {
        question: 'Who supports it?',
        answer: 'A "coalition of necessity": Banks, police, and the cannabis industry',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-08-05',
  },
  {
    id: 'universal-pre-k',
    rank: 29,
    title: 'Universal Pre-K',
    description: 'Provide free, high-quality pre-kindergarten education for all 3- and 4-year-olds.',
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
  },
  {
    id: 'buy-american',
    rank: 30,
    title: '"Buy American" Mandates',
    description: 'Require federally funded infrastructure projects to use U.S.-made materials (steel, iron, manufactured goods).',
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
  },

  // ===========================================
  // POLICIES WITH FULL METHODOLOGY
  // These have detailed evidence-based V2 scoring
  // ===========================================

  {
    id: 'universal-basic-income',
    rank: 31,
    title: 'Universal Basic Income (UBI)',
    description: 'A universal, unconditional cash payment to all individuals, intended to provide a minimum floor of income regardless of employment status.',
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
  },
  {
    id: 'federal-job-guarantee',
    rank: 32,
    title: 'Federal Job Guarantee',
    description: 'A program assuring a public job at a liveable wage to all who want work, making the government an employer of last resort to achieve full employment.',
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
  },
  {
    id: 'medicare-for-all',
    rank: 33,
    title: 'Medicare for All (Single-Payer)',
    description: 'A universal, national health insurance program covering all residents for medically necessary care, with the government as the single payer.',
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