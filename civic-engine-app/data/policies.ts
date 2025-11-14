import { Policy } from '../types/policy';

/**
 * Real consensus policy data from Americans-Agree.org and other sources
 * All policies have 55%+ bipartisan support (Dem, Rep, Ind)
 * Data current as of 2025
 */

export const policies: Policy[] = [
  {
    id: 'paid-sick-leave',
    rank: 1,
    title: 'Require Paid Sick Leave for All Workers',
    description: 'Mandate that companies provide paid sick leave to all full-time employees, ensuring workers can take time off when ill without losing income.',
    category: 'economy',
    scope: 'federal',
    icon: 'HeartPulse',
    averageSupport: 81,
    partySupport: {
      democrats: 93,
      republicans: 72,
      independents: 79,
    },
    sources: [
      {
        organization: 'YouGov',
        title: 'Paid Sick Leave Support Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 81,
      },
    ],
    details: [
      {
        title: 'Universal Coverage',
        description: 'All full-time employees at companies with 15+ employees would receive a minimum of 7 paid sick days per year.',
      },
      {
        title: 'Protect Workers',
        description: 'Employees cannot be fired or penalized for using their sick leave to care for themselves or family members.',
      },
    ],
    // Impact structure - how the policy works
    resourceFlow: {
      from: 'Employers (through payroll costs)',
      to: 'All full-time workers',
      channel: 'Federal mandate requiring paid sick days',
    },
    ifThen: [
      'If you work full-time and get the flu, you can take sick days without losing pay',
      'If your child gets sick, you can stay home to care for them while still earning your wages',
      'If you work for a small business with 15+ employees, this applies to you just like larger companies',
    ],
    causalChain: {
      immediate: 'Mandate all employers provide minimum 7 paid sick days per year',
      outcome: 'Workers can recover without financial hardship; may reduce workplace spread of illness as workers are less likely to come in sick; aims to improve public health',
    },
    commonQuestions: [
      {
        question: 'Does this raise my taxes?',
        answer: 'No. This policy requires employers to provide paid sick leave, but does not create new taxes. Employers bear the cost as an additional payroll expense, which some businesses may offset through reduced wage growth, adjusted benefits, or operational changes.',
      },
      {
        question: 'What if I work for a small business?',
        answer: 'Most proposals apply to businesses with 15 or more employees. Very small businesses (under 15 employees) are typically exempt to reduce burden on the smallest employers.',
      },
      {
        question: 'Can my employer fire me for using sick leave?',
        answer: 'No. Federal protections would prevent retaliation. You cannot be fired, demoted, or penalized for using your guaranteed sick days.',
      },
      {
        question: 'How does this affect small businesses?',
        answer: 'The 15-employee threshold exempts the smallest businesses. For businesses just above this threshold, the added labor cost can be significant. Some businesses may offset costs through reduced wage increases or other adjustments. Proponents argue healthier workers improve productivity; critics note genuine financial burden especially for low-margin businesses.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-01-15',
  },
  {
    id: 'criminal-background-checks-guns',
    rank: 2,
    title: 'Universal Background Checks for Gun Purchases',
    description: 'Require criminal and mental health screenings for all firearm sales, including private transactions and gun shows.',
    category: 'justice',
    scope: 'federal',
    icon: 'ShieldCheck',
    averageSupport: 83,
    partySupport: {
      democrats: 87,
      republicans: 82,
      independents: 80,
    },
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Gun Control Measures Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 83,
      },
    ],
    details: [
      {
        title: 'Close Loopholes',
        description: 'Extend background checks to all gun sales, including private sales and gun shows.',
      },
      {
        title: 'Mental Health Screening',
        description: 'Include mental health records in background check system to prevent access by those deemed dangerous.',
      },
    ],
    resourceFlow: {
      from: 'Gun buyers (time/information for background check)',
      to: 'Public safety and law enforcement',
      channel: 'Federal background check system (NICS expansion)',
    },
    ifThen: [
      'If you want to buy a gun from a private seller or at a gun show, you would go through the same background check as buying from a store',
      'If you have a violent criminal history or dangerous mental health record, you would be prevented from purchasing firearms',
      'If you are a law-abiding citizen, the background check process verifies your eligibility, though total wait time varies by state (from instant approval to several weeks depending on state licensing requirements)',
    ],
    causalChain: {
      immediate: 'Require background checks for all firearm sales, including private transactions',
      outcome: 'Reduce gun violence by preventing weapons access for high-risk individuals while protecting lawful ownership',
    },
    commonQuestions: [
      {
        question: 'Does this violate Second Amendment rights?',
        answer: 'No. The Supreme Court has upheld that reasonable regulations on firearm sales are constitutional. This policy focuses on who can buy guns, not whether people can own them.',
      },
      {
        question: 'What about gun shows and private sales?',
        answer: 'Currently, many states allow private sales without background checks (the "gun show loophole"). This policy would close that gap, requiring all sales to go through the existing background check system.',
      },
      {
        question: 'How long does a background check take?',
        answer: 'The federal NICS background check itself typically takes minutes, with about 90% approved instantly. However, total wait time varies significantly by state. Some states have additional licensing requirements that can take weeks or months (for example, Massachusetts requires up to 40 days for licensing approval). The policy focuses on requiring the background check itself, not setting wait times.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'ban-stock-trading-officials',
    rank: 3,
    title: 'Ban Stock Trading by Elected Officials',
    description: 'Prohibit members of Congress and other elected officials from buying or selling individual stocks while in office to prevent conflicts of interest.',
    category: 'governance',
    scope: 'federal',
    icon: 'Ban',
    averageSupport: 74,
    partySupport: {
      democrats: 73,
      republicans: 77,
      independents: 71,
    },
    sources: [
      {
        organization: 'YouGov',
        title: 'Congressional Ethics Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 74,
      },
    ],
    details: [
      {
        title: 'Prevent Insider Trading',
        description: 'Eliminate opportunities for officials to profit from non-public information.',
      },
      {
        title: 'Restore Trust',
        description: 'Increase public confidence in government by removing conflicts of interest.',
      },
    ],
    resourceFlow: {
      from: 'Elected officials (trading restrictions)',
      to: 'Public trust and government integrity',
      channel: 'Federal ethics law prohibiting individual stock trading',
    },
    ifThen: [
      'If you are elected to Congress, you must divest individual stocks or place them in a blind trust',
      'If you want to invest, you can use diversified mutual funds or index funds instead',
      'If you violate the ban, you face penalties including fines and potential removal from office',
    ],
    causalChain: {
      immediate: 'Prohibit members of Congress from trading individual stocks while in office',
      outcome: 'Reduce conflicts of interest and improve public trust that officials make decisions based on public interest, not personal profit',
    },
    commonQuestions: [
      {
        question: 'Can elected officials still invest their money?',
        answer: 'Yes. Officials can invest in diversified mutual funds, index funds, and bonds. They just cannot buy or sell individual company stocks that could create conflicts with their legislative work.',
      },
      {
        question: 'What about stocks they owned before being elected?',
        answer: 'Most proposals require officials to either sell their individual stocks or place them in a qualified blind trust. A true blind trust means an independent manager makes all decisions without the official knowing what is bought or sold, preventing conflicts of interest.',
      },
      {
        question: 'How would this be enforced?',
        answer: 'Enforcement typically includes mandatory disclosure, regular audits, and penalties for violations ranging from fines to expulsion from office. The challenge is ensuring robust monitoring and accountability rather than relying solely on self-reporting.',
      },
    ],
    trending: 'up',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'restrict-corporate-election-spending',
    rank: 4,
    title: 'Limit Corporate Campaign Spending',
    description: 'Establish campaign finance laws that restrict the amount corporations can spend on elections and political campaigns.',
    category: 'governance',
    scope: 'federal',
    icon: 'DollarSign',
    averageSupport: 77,
    sources: [
      {
        organization: 'YouGov',
        title: 'Campaign Finance Reform Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 77,
      },
    ],
    details: [
      {
        title: 'Reduce Money in Politics',
        description: 'Limit the influence of wealthy corporations on elections and policy.',
      },
      {
        title: 'Level Playing Field',
        description: 'Give all candidates and voices a more equal opportunity to be heard.',
      },
      {
        title: 'Cross-Party Support',
        description: 'Supported by 83% of Democrats, 75% of Republicans, and 74% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Corporations and large donors (political spending limits)',
      to: 'Fair electoral process and all candidates',
      channel: 'Federal campaign finance regulations and spending caps',
    },
    ifThen: [
      'If you run for office, you would compete more on ideas and grassroots support rather than corporate funding',
      'If your local community wants change, small donors and volunteers would have more influence relative to corporate money',
      'If a corporation wants to influence elections, they would face clear limits on how much they can spend on campaigns',
    ],
    causalChain: {
      immediate: 'Cap corporate spending on political campaigns and elections',
      outcome: 'Aim to reduce corporate influence in politics, give everyday citizens more voice in democracy, and make elections more competitive based on ideas rather than money',
    },
    commonQuestions: [
      {
        question: 'Does this violate free speech rights?',
        answer: 'This is constitutionally complex. The Supreme Court ruled in Citizens United that corporate spending is protected speech. Implementing spending limits would likely require a constitutional amendment to override this precedent. Supporters argue democracy justifies limits; opponents say restricting spending restricts speech.',
      },
      {
        question: 'Would this apply to unions and nonprofits too?',
        answer: 'Most proposals apply limits broadly to all organizations, including unions and advocacy groups. The goal is to limit any large organization\'s ability to dominate elections with money, regardless of their position.',
      },
      {
        question: 'What about wealthy individuals spending unlimited money?',
        answer: 'This policy focuses on corporate spending. However, wealthy individuals can still spend unlimited amounts on their own campaigns or through Super PACs. Some proposals extend limits to large individual donations as well, but those face similar constitutional challenges.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'supreme-court-ethics',
    rank: 5,
    title: 'Enforce Ethics Standards for Supreme Court',
    description: 'Establish and enforce a code of ethics for Supreme Court justices, including disclosure requirements and conflict of interest rules.',
    category: 'governance',
    scope: 'federal',
    icon: 'Scale',
    averageSupport: 76,
    sources: [
      {
        organization: 'YouGov',
        title: 'Supreme Court Ethics Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 76,
      },
    ],
    details: [
      {
        title: 'Transparency',
        description: 'Require justices to disclose gifts, financial interests, and potential conflicts.',
      },
      {
        title: 'Accountability',
        description: 'Create enforceable standards with consequences for violations.',
      },
      {
        title: 'Bipartisan Agreement',
        description: 'Supported by 84% of Democrats, 70% of Republicans, and 73% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Supreme Court justices (disclosure and compliance requirements)',
      to: 'Public trust and judicial integrity',
      channel: 'Codified ethics rules with enforcement mechanisms',
    },
    ifThen: [
      'If a justice receives gifts or has financial interests, they must publicly disclose them',
      'If your case comes before the Court, you would know if a justice has conflicts that might affect the ruling',
      'If a justice violates ethics rules, there would be actual consequences rather than just voluntary compliance',
    ],
    causalChain: {
      immediate: 'Establish binding code of ethics for Supreme Court with disclosure and recusal requirements',
      outcome: 'Increase transparency and accountability, aim to restore public confidence in the judiciary, and ensure justices are held to same ethical standards as other federal judges',
    },
    commonQuestions: [
      {
        question: 'Why doesn\'t the Supreme Court already have ethics rules?',
        answer: 'All other federal judges follow a binding code of conduct, but Supreme Court justices are only subject to voluntary guidelines. This creates a gap in oversight for the highest court in the land.',
      },
      {
        question: 'Who would enforce these ethics rules?',
        answer: 'This is constitutionally complex. Options include an independent ethics panel, the Judicial Conference, or Congressional oversight. The challenge is balancing accountability with judicial independence, since the Constitution protects justices from removal except through impeachment.',
      },
      {
        question: 'What kinds of things would justices have to disclose?',
        answer: 'Typical requirements include gifts, travel, speaking fees, financial investments, and relationships that could create conflicts of interest. These are standard disclosures required of other federal judges.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'government-disaster-relief',
    rank: 6,
    title: 'Federal Disaster Relief and Response',
    description: 'Ensure the federal government provides major aid and resources after natural disasters to help communities recover.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'CloudRainWind',
    averageSupport: 80,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Disaster Response Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 80,
      },
    ],
    details: [
      {
        title: 'Emergency Response',
        description: 'Federal government coordinates and funds major disaster response efforts.',
      },
      {
        title: 'Community Recovery',
        description: 'Provide resources for rebuilding infrastructure and supporting affected residents.',
      },
      {
        title: 'Widespread Support',
        description: 'Supported by 87% of Democrats, 80% of Republicans, and 72% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Federal government (FEMA and disaster relief funds)',
      to: 'Communities and individuals affected by natural disasters',
      channel: 'Emergency response programs, infrastructure rebuilding, and direct aid',
    },
    ifThen: [
      'If your town is hit by a hurricane, federal aid would help rebuild roads, utilities, and public buildings',
      'If you lose your home in a wildfire, disaster relief programs would provide temporary housing and rebuilding assistance',
      'If flooding damages your business, federal resources would help you recover and reopen',
    ],
    causalChain: {
      immediate: 'Federal government provides major financial and logistical support after natural disasters',
      outcome: 'Help communities recover faster and restore essential infrastructure more quickly, though aid distribution often faces delays and bureaucratic challenges',
    },
    commonQuestions: [
      {
        question: 'How is this different from what already happens?',
        answer: 'The federal government already provides disaster relief through FEMA. This policy ensures continued commitment to robust federal response rather than shifting responsibility primarily to states or private insurance.',
      },
      {
        question: 'Does this cover all types of disasters?',
        answer: 'Typically covers major natural disasters like hurricanes, tornadoes, floods, wildfires, and earthquakes. The President declares federal disaster areas, which makes communities eligible for aid. Not all disaster-affected areas receive federal declarations, and coverage depends on damage severity.',
      },
      {
        question: 'Do I still need homeowner\'s insurance?',
        answer: 'Yes. Federal disaster relief is meant to supplement, not replace, insurance. It typically covers immediate needs and public infrastructure, while insurance handles personal property claims.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-01',
  },
  {
    id: 'ban-synthetic-food-dyes',
    rank: 7,
    title: 'Ban Harmful Synthetic Food Dyes',
    description: 'Prohibit certain synthetic food dyes and additives that have been linked to health concerns, especially in products marketed to children.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'FlaskConical',
    averageSupport: 79,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Food Safety Regulation Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    details: [
      {
        title: 'Protect Children',
        description: 'Remove potentially harmful additives from foods commonly consumed by children.',
      },
      {
        title: 'Follow Science',
        description: 'Base regulations on health research and international safety standards.',
      },
      {
        title: 'Strong Agreement',
        description: 'Supported by 68% of Democrats, 87% of Republicans, and 83% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Food manufacturers (reformulation costs and compliance)',
      to: 'Consumer health, especially children',
      channel: 'FDA regulations banning specific synthetic dyes',
    },
    ifThen: [
      'If you buy cereal or snacks for your kids, you would not find artificial dyes linked to health concerns on the ingredients list',
      'If your child is sensitive to food additives, you would have fewer worries about everyday foods triggering reactions',
      'If you manufacture food products, you would need to use natural colorings or reformulate products without certain synthetic dyes',
    ],
    causalChain: {
      immediate: 'FDA prohibits synthetic food dyes linked to health concerns (like Red 40, Yellow 5, Yellow 6)',
      outcome: 'Reduce children exposure to potentially harmful additives and encourage natural alternatives, though scientific evidence on health impacts remains debated and some effects may be overstated',
    },
    commonQuestions: [
      {
        question: 'Which dyes would be banned?',
        answer: 'Typically targets dyes like Red 40, Yellow 5, and Yellow 6. Some studies link these to hyperactivity in children, though evidence is mixed and effects appear small for most children. European countries restrict these dyes, requiring warning labels or using alternatives.',
      },
      {
        question: 'What would companies use instead?',
        answer: 'Natural colorings from fruits, vegetables, and spices (like beet juice, turmeric, or spirulina). Many companies already use these in European versions of American products.',
      },
      {
        question: 'Would this make food more expensive?',
        answer: 'Potentially some cost increase during reformulation, as natural colorings can be more expensive and less stable than synthetic dyes. However, costs decrease with scale and many brands already use natural alternatives profitably in Europe.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-09-01',
  },
  {
    id: 'protect-academic-freedom',
    rank: 8,
    title: 'Protect University Academic Freedom',
    description: 'Ensure the federal government does not control university faculty hiring decisions, preserving institutional autonomy and academic freedom.',
    category: 'education',
    scope: 'federal',
    icon: 'GraduationCap',
    averageSupport: 77,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Higher Education Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 77,
      },
    ],
    details: [
      {
        title: 'Institutional Autonomy',
        description: 'Universities maintain control over faculty hiring and academic decisions.',
      },
      {
        title: 'Prevent Overreach',
        description: 'Protect universities from political interference in academic matters.',
      },
      {
        title: 'Broad Support',
        description: 'Supported by 89% of Democrats, 65% of Republicans, and 77% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Universities (autonomy over academic decisions)',
      to: 'Academic freedom and educational quality',
      channel: 'Legal protections preventing federal government control over faculty hiring',
    },
    ifThen: [
      'If you are a university, you maintain control over hiring faculty based on academic qualifications and institutional needs',
      'If you are a professor, your hiring and tenure decisions are made by academic peers, not government officials',
      'If you are a student, your education is shaped by academic expertise rather than political pressures',
    ],
    causalChain: {
      immediate: 'Prevent federal government from controlling university faculty hiring decisions',
      outcome: 'Aim to preserve academic freedom and protect universities from political interference, while maintaining institutional autonomy over scholarly hiring decisions',
    },
    commonQuestions: [
      {
        question: 'Why is this an issue now?',
        answer: 'Recent proposals have suggested federal oversight of university hiring, particularly around ideology or political viewpoints. This policy maintains the principle that academic institutions, not politicians, should make scholarly hiring decisions.',
      },
      {
        question: 'Does this mean universities have no accountability?',
        answer: 'No. Universities remain accountable through accreditation, civil rights laws, research integrity rules, and academic standards. This policy specifically protects hiring autonomy from political interference, not immunity from all oversight or legal requirements.',
      },
      {
        question: 'What about ideological balance in hiring?',
        answer: 'This is debated. Critics worry some universities lack viewpoint diversity in faculty hiring. Supporters argue academic hiring should focus on scholarly merit, not political balance, and that government-mandated ideological quotas would undermine academic freedom more than protect it.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'lobbying-waiting-period',
    rank: 9,
    title: '5-Year Lobbying Ban After Public Service',
    description: 'Require members of Congress to wait five years after leaving office before they can work as lobbyists.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 70,
    sources: [
      {
        organization: 'YouGov',
        title: 'Congressional Ethics Reform Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 70,
      },
    ],
    details: [
      {
        title: 'Reduce Corruption',
        description: 'Prevent the revolving door between Congress and lobbying firms.',
      },
      {
        title: 'Cooling Off Period',
        description: 'Allow time for officials to separate from insider knowledge and connections.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 71% of Democrats, 75% of Republicans, and 65% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Former members of Congress (five years of lobbying income)',
      to: 'Government integrity and reduced corruption',
      channel: 'Federal ethics law with mandatory waiting period',
    },
    ifThen: [
      'If you serve in Congress and then leave office, you must wait five years before working as a lobbyist',
      'If your former colleague leaves Congress, they cannot immediately use insider relationships and knowledge to lobby their former peers',
      'If you are a citizen, you would see less influence from the revolving door between Congress and lobbying firms',
    ],
    causalChain: {
      immediate: 'Require five-year waiting period before former members of Congress can lobby',
      outcome: 'Reduce conflicts of interest, discourage officials from making policy decisions based on future lobbying jobs, and restore public trust in government',
    },
    commonQuestions: [
      {
        question: 'What can former members do during the five years?',
        answer: 'They can work in many fields - business, law, academia, think tanks, media, etc. They just cannot work as registered lobbyists directly influencing their former colleagues in Congress.',
      },
      {
        question: 'How is this different from current rules?',
        answer: 'Current law has a 1-2 year lobbying ban for most members. Extending it to five years creates a meaningful separation between service and lobbying, reducing the influence of the revolving door.',
      },
      {
        question: 'Does this apply to Congressional staff too?',
        answer: 'Many proposals extend cooling-off periods to senior Congressional staff as well, since they also have insider knowledge and relationships. The specific scope varies by proposal.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'energy-efficiency-tax-credits',
    rank: 10,
    title: 'Tax Credits for Home Energy Efficiency',
    description: 'Provide tax credits for homeowners who make energy efficiency improvements like installing heat pumps or solar panels.',
    category: 'environment',
    scope: 'federal',
    icon: 'Zap',
    averageSupport: 84,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Policy Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 84,
      },
    ],
    details: [
      {
        title: 'Lower Energy Bills',
        description: 'Help homeowners save money on energy costs while reducing carbon emissions.',
      },
      {
        title: 'Economic Incentive',
        description: 'Tax credits make energy-efficient upgrades more affordable.',
      },
      {
        title: 'Strong Consensus',
        description: 'Supported by 92% of Democrats and 75% of Republicans.',
      },
    ],
    resourceFlow: {
      from: 'Federal government (tax revenue for credits)',
      to: 'Homeowners making energy-efficient upgrades',
      channel: 'Tax credits for heat pumps, solar panels, insulation, and efficient appliances',
    },
    ifThen: [
      'If you install solar panels on your home, you receive a tax credit that covers a percentage of the cost',
      'If your heating system needs replacement, a tax credit makes choosing an energy-efficient heat pump more affordable',
      'If you upgrade your insulation and windows, you can claim credits that reduce your tax bill',
    ],
    causalChain: {
      immediate: 'Provide tax credits to homeowners for energy-efficient home improvements',
      outcome: 'Lower household energy costs and reduce carbon emissions, though benefits primarily flow to higher-income homeowners who can afford upfront costs and have tax liability to offset',
    },
    commonQuestions: [
      {
        question: 'How much can I save with these tax credits?',
        answer: 'Current programs offer credits of 30% for solar panels (up to certain limits), and credits for heat pumps, insulation, and efficient appliances. Specific amounts vary by upgrade type and program rules.',
      },
      {
        question: 'Do renters benefit from this?',
        answer: 'Not directly. Credits go to property owners, and landlords have limited incentive to make efficiency upgrades since tenants typically pay utilities. Some programs offer landlord incentives, but renters generally miss out despite representing a large portion of lower-income households.',
      },
      {
        question: 'How is this funded?',
        answer: 'Tax credits reduce federal tax revenue, essentially funded by all taxpayers. Critics note this means lower-income people who cannot afford upgrades help subsidize benefits for wealthier homeowners. Supporters argue climate benefits and eventual energy savings justify the public investment.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'abortion-health-exception',
    rank: 11,
    title: 'Allow Abortion When Health at Risk',
    description: 'States should permit abortion when pregnancy endangers the pregnant person\'s physical or mental health.',
    category: 'healthcare',
    scope: 'state',
    icon: 'Heart',
    averageSupport: 89,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 89,
      },
    ],
    details: [
      {
        title: 'Protect Life and Health',
        description: 'Allow medical professionals to provide necessary care when pregnancy threatens health.',
      },
      {
        title: 'Medical Decision',
        description: 'Keep healthcare decisions between patients and their doctors.',
      },
      {
        title: 'Overwhelming Support',
        description: 'Supported by 93% of Democrats, 84% of Republicans, and 89% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'State laws (permitting medical procedures)',
      to: 'Pregnant individuals facing health risks',
      channel: 'Health exception in state abortion laws allowing medical providers to act',
    },
    ifThen: [
      'If your pregnancy develops complications that threaten your health, your doctor can provide necessary care including abortion',
      'If you have a serious medical condition worsened by pregnancy, you and your doctor can make decisions without legal barriers',
      'If continuing pregnancy would cause permanent injury or severe health consequences, you have legal access to care',
    ],
    causalChain: {
      immediate: 'State laws permit abortion when pregnancy endangers physical or mental health',
      outcome: 'Protect pregnant individuals from forced health risks, allow doctors to provide necessary medical care, and prevent tragic outcomes from untreatable complications',
    },
    commonQuestions: [
      {
        question: 'How is health risk defined?',
        answer: 'This varies by proposal. Broader definitions include serious physical or mental health consequences. Narrow definitions require imminent danger to life. Most Americans support exceptions for serious health threats, not just immediate death risk.',
      },
      {
        question: 'Who decides if there\'s a health risk?',
        answer: 'The medical professional treating the patient, based on their clinical judgment. The policy trusts doctors to make medical decisions rather than requiring legal review in emergency situations.',
      },
      {
        question: 'Is mental health included?',
        answer: 'This depends on the specific law. Comprehensive health exceptions include mental health, recognizing that psychological harm is a legitimate medical concern. About 89% of Americans support health exceptions broadly.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'abortion-rape-incest',
    rank: 12,
    title: 'Allow Abortion for Rape or Incest',
    description: 'States should allow abortion for pregnancies resulting from rape or incest.',
    category: 'healthcare',
    scope: 'state',
    icon: 'ShieldAlert',
    averageSupport: 86,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    details: [
      {
        title: 'Compassionate Exception',
        description: 'Provide options for victims of sexual violence and abuse.',
      },
      {
        title: 'Reduce Trauma',
        description: 'Allow survivors to make decisions about their own healthcare.',
      },
      {
        title: 'Broad Agreement',
        description: 'Supported by 93% of Democrats, 77% of Republicans, and 87% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'State laws (permitting medical procedures)',
      to: 'Survivors of rape and incest',
      channel: 'Exception in state abortion laws for sexual violence and abuse',
    },
    ifThen: [
      'If you become pregnant due to rape, you would have legal access to abortion services',
      'If you are a minor victim of incest, you would not be forced to carry that pregnancy to term',
      'If you experience sexual violence, you maintain control over your own reproductive decisions and healthcare',
    ],
    causalChain: {
      immediate: 'State laws permit abortion for pregnancies resulting from rape or incest',
      outcome: 'Provide compassionate care for trauma survivors, prevent compounding trauma from forced pregnancy, and respect autonomy of sexual violence victims',
    },
    commonQuestions: [
      {
        question: 'Would survivors need to prove rape occurred?',
        answer: 'Most proposals do not require a conviction or police report, recognizing that many survivors do not report sexual violence. Requirements vary, but the goal is to provide timely access to care without additional trauma.',
      },
      {
        question: 'Is there a time limit for this exception?',
        answer: 'This depends on state law. Some states that otherwise restrict abortion still allow exceptions for rape/incest up to a certain point in pregnancy. Time limits vary by jurisdiction.',
      },
      {
        question: 'Why do some abortion restrictions not include these exceptions?',
        answer: 'A small number of states have enacted near-total bans without rape/incest exceptions. However, 86% of Americans believe these exceptions should exist, representing strong bipartisan consensus.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'methane-leak-regulations',
    rank: 13,
    title: 'Require Oil Companies to Seal Methane Leaks',
    description: 'Mandate that oil and gas companies seal methane leaks from wells to reduce greenhouse gas emissions.',
    category: 'environment',
    scope: 'federal',
    icon: 'Wind',
    averageSupport: 84,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Policy Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 84,
      },
    ],
    details: [
      {
        title: 'Reduce Emissions',
        description: 'Methane is a potent greenhouse gas; sealing leaks significantly reduces climate impact.',
      },
      {
        title: 'Industry Accountability',
        description: 'Hold oil and gas companies responsible for preventing avoidable emissions.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 93% of Democrats and 75% of Republicans.',
      },
    ],
    resourceFlow: {
      from: 'Oil and gas companies (cost of detecting and sealing leaks)',
      to: 'Climate and public health',
      channel: 'Federal EPA regulations requiring leak detection and repair',
    },
    ifThen: [
      'If you operate oil or gas wells, you must regularly inspect for methane leaks and seal any that are found',
      'If your community is near drilling operations, you would have less methane pollution affecting air quality and climate',
      'If a company fails to seal leaks, they face penalties and must come into compliance',
    ],
    causalChain: {
      immediate: 'Require oil and gas companies to detect and seal methane leaks from wells and equipment',
      outcome: 'Significantly reduce greenhouse gas emissions (methane is 80x more potent than CO2), improve air quality, and hold industry accountable for preventable pollution',
    },
    commonQuestions: [
      {
        question: 'Why is methane such a big deal?',
        answer: 'Methane is over 80 times more potent than carbon dioxide as a greenhouse gas over 20 years. Oil and gas operations are a major source of methane leaks. Sealing leaks is one of the fastest ways to reduce climate impact.',
      },
      {
        question: 'How would companies detect leaks?',
        answer: 'Using technologies like infrared cameras, drones, and sensors that can identify methane emissions. Many of these technologies already exist and are in use, but regulations would make detection and repair mandatory.',
      },
      {
        question: 'Would this hurt the oil and gas industry?',
        answer: 'Companies face real costs for detection equipment and repairs. While captured methane can be sold, the value often does not fully offset compliance costs, especially for smaller operators. The economic impact depends on methane prices and the extent of existing leaks.',
      },
      {
        question: 'How would this be enforced?',
        answer: 'EPA would require regular inspections and reporting, with penalties for violations. However, enforcement is challenging given the number of wells and remote locations. Effectiveness depends on inspection frequency, technology requirements, and penalty levels sufficient to ensure compliance.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'red-flag-gun-laws',
    rank: 14,
    title: 'Extreme Risk Protection Orders for Firearms',
    description: 'Allow family members or law enforcement to petition courts for temporary firearm removal when someone poses a danger to themselves or others.',
    category: 'justice',
    scope: 'state',
    icon: 'AlertTriangle',
    averageSupport: 74,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Gun Safety Measures Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 74,
      },
    ],
    details: [
      {
        title: 'Prevent Tragedies',
        description: 'Provide a legal mechanism to temporarily remove guns from individuals in crisis.',
      },
      {
        title: 'Due Process',
        description: 'Court review ensures rights are protected while addressing immediate safety concerns.',
      },
      {
        title: 'Cross-Party Agreement',
        description: 'Supported by 87% of Democrats, 65% of Republicans, and 69% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Individuals in crisis (temporary firearm access)',
      to: 'Public safety and suicide prevention',
      channel: 'Court-issued Extreme Risk Protection Orders after due process hearing',
    },
    ifThen: [
      'If your family member is threatening violence or showing signs of crisis, you can petition a court to temporarily remove their firearms',
      'If law enforcement identifies someone as an imminent danger, they can seek a court order for temporary gun removal with a hearing',
      'If you are subject to an order, you have the right to a court hearing to contest it and can regain firearms when the order expires',
    ],
    causalChain: {
      immediate: 'Allow courts to issue temporary orders removing firearms from individuals deemed dangerous to themselves or others',
      outcome: 'May help prevent suicides and violence by creating a legal pathway to intervene during crisis periods, though effectiveness depends on proper implementation and due process protections',
    },
    commonQuestions: [
      {
        question: 'How long do these orders last?',
        answer: 'Typically 1-2 weeks for emergency orders, extendable up to a year after a full court hearing. Orders are temporary and reversible - firearms are returned when the order expires if the person is no longer at risk.',
      },
      {
        question: 'Who can request an Extreme Risk Protection Order?',
        answer: 'Varies by state, but typically family members, household members, and law enforcement. Some states allow medical professionals or educators. All requests require court approval after review of evidence.',
      },
      {
        question: 'What about due process rights?',
        answer: 'This is carefully balanced. Emergency orders may be issued quickly with a hearing within days, creating tension between immediate safety and due process. Full orders require judicial review where individuals can present evidence and contest claims. The constitutionality and fairness depend heavily on specific procedural protections in each state law.',
      },
      {
        question: 'What about false accusations?',
        answer: 'This is a legitimate concern. Safeguards typically include requiring evidence, judicial review, and penalties for false reports. However, the standard of proof and protections vary by state. Balancing prevention of abuse with effectiveness at stopping genuine threats remains an ongoing challenge in implementation.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'weather-tracking-systems',
    rank: 15,
    title: 'Government Weather Tracking and Warnings',
    description: 'Federal government should track weather events and provide warnings about potential natural disasters.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'Cloudy',
    averageSupport: 71,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Disaster Preparedness Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    details: [
      {
        title: 'Save Lives',
        description: 'Early warning systems help communities prepare and evacuate before disasters strike.',
      },
      {
        title: 'Public Safety',
        description: 'Government coordination ensures consistent, reliable weather information.',
      },
      {
        title: 'Broad Support',
        description: 'Supported by 80% of Democrats, 68% of Republicans, and 65% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Federal government (NOAA, National Weather Service funding)',
      to: 'Public safety and disaster preparedness',
      channel: 'Satellite systems, radar networks, forecasting centers, and emergency alert systems',
    },
    ifThen: [
      'If a hurricane is forming, you receive advance warnings days ahead giving you time to prepare or evacuate',
      'If your area faces tornado risk, real-time tracking and warnings alert you to take shelter immediately',
      'If severe weather threatens your region, forecasts help emergency services prepare resources in advance',
    ],
    causalChain: {
      immediate: 'Federal government operates weather tracking systems and issues disaster warnings',
      outcome: 'Save lives through early warnings, reduce property damage through preparation, and help communities coordinate emergency response',
    },
    commonQuestions: [
      {
        question: 'Could not private companies do this instead?',
        answer: 'Private weather companies exist and provide valuable services, but they rely on government infrastructure for basic data (satellites, radar, buoys). A public-private model works well: government provides core infrastructure and data as a public good, while private companies add specialized forecasting and services.',
      },
      {
        question: 'What systems does this include?',
        answer: 'NOAA operates weather satellites, radar networks, ocean buoys, the National Weather Service, the National Hurricane Center, and emergency alert systems. These work together to track and warn about dangerous weather.',
      },
      {
        question: 'How does this help during disasters?',
        answer: 'Early warnings give people time to evacuate, secure property, and stock supplies. For tornadoes and flash floods, even minutes of warning saves lives. For hurricanes, days of advance notice allows mass evacuations. However, forecasts are not perfect and uncertainty remains, especially for localized severe weather.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-01',
  },
  {
    id: 'eliminate-daylight-saving',
    rank: 16,
    title: 'Eliminate Daylight Saving Time',
    description: 'Stop changing clocks twice annually by eliminating daylight saving time and maintaining one consistent time year-round.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 65,
    sources: [
      {
        organization: 'YouGov',
        title: 'Daylight Saving Time Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 65,
      },
    ],
    details: [
      {
        title: 'Health Benefits',
        description: 'Reduce sleep disruption and health issues associated with time changes.',
      },
      {
        title: 'Consistency',
        description: 'Maintain one standard time year-round for simplicity.',
      },
      {
        title: 'Popular Support',
        description: 'Supported by 64% of Democrats, 71% of Republicans, and 61% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Everyone (time disruption from clock changes)',
      to: 'Public health and consistency',
      channel: 'Federal law establishing permanent standard time year-round',
    },
    ifThen: [
      'If this policy passes, you would never change your clocks again - same time all year',
      'If you struggle with sleep disruption from time changes, you would avoid that biannual adjustment',
      'If you have young children or work early mornings, you would not experience the jarring shift twice a year',
    ],
    causalChain: {
      immediate: 'Eliminate daylight saving time, keeping one consistent time year-round',
      outcome: 'Reduce sleep disruption and associated health problems, eliminate confusion from time changes, and simplify scheduling across time zones',
    },
    commonQuestions: [
      {
        question: 'Would we stay on standard time or daylight time?',
        answer: 'This is debated. Some proposals keep permanent standard time (more aligned with natural light). Others prefer permanent daylight time (more evening daylight). Both eliminate the twice-yearly change.',
      },
      {
        question: 'What are the health impacts of time changes?',
        answer: 'Studies link time changes to increased heart attacks, strokes, car accidents, and workplace injuries in the days following the shift. Permanent time eliminates these biannual disruptions.',
      },
      {
        question: 'Do not some states already do this?',
        answer: 'Hawaii and most of Arizona do not observe daylight saving time. However, federal law currently prevents states from choosing permanent daylight time. This policy would allow a nationwide consistent approach.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-10-01',
  },
  {
    id: 'restrict-agricultural-pesticides',
    rank: 17,
    title: 'Restrict Agricultural Pesticide Use',
    description: 'Increase restrictions on pesticide use in agriculture to protect human health and the environment.',
    category: 'environment',
    scope: 'federal',
    icon: 'Sprout',
    averageSupport: 70,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Food and Agriculture Safety Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 70,
      },
    ],
    details: [
      {
        title: 'Protect Health',
        description: 'Reduce exposure to chemicals linked to health problems.',
      },
      {
        title: 'Environmental Protection',
        description: 'Safeguard water supplies, soil health, and wildlife.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 64% of Democrats, 69% of Republicans, and 76% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Agricultural industry (compliance costs and alternative pest management)',
      to: 'Public health and environmental protection',
      channel: 'EPA regulations restricting or banning harmful pesticides',
    },
    ifThen: [
      'If you farm, you would face stricter limits on which pesticides you can use, with focus on safer alternatives',
      'If you live near agricultural areas, you would have less exposure to pesticide drift and water contamination',
      'If you consume produce, you would have lower pesticide residue on your food',
    ],
    causalChain: {
      immediate: 'Increase EPA restrictions on agricultural pesticides linked to health or environmental harm',
      outcome: 'Aim to reduce pesticide exposure and protect environmental health, though outcomes depend on which chemicals are restricted, availability of effective alternatives, and enforcement of regulations',
    },
    commonQuestions: [
      {
        question: 'Which pesticides would be restricted?',
        answer: 'Focus would be on chemicals linked to cancer, reproductive harm, or environmental damage. Examples include neonicotinoids (harmful to bees) and organophosphates (linked to neurological effects in children).',
      },
      {
        question: 'How would farmers control pests without these chemicals?',
        answer: 'Through integrated pest management (IPM): crop rotation, beneficial insects, targeted applications, and alternative pesticides. IPM can be effective but often requires more knowledge, labor, and upfront investment. Transition challenges are real, though many farmers have adopted these methods successfully.',
      },
      {
        question: 'Would this hurt American farmers competitively?',
        answer: 'There are real concerns about competitiveness. Europe has stricter rules, but European farmers also receive more subsidies to offset costs. Without similar support, American farmers could face higher costs than foreign competitors. Premium markets for sustainably-grown products exist but do not replace all conventional markets.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-09-01',
  },
  {
    id: 'carbon-capture-incentives',
    rank: 18,
    title: 'Tax Credits for Carbon Capture Technology',
    description: 'Provide tax credits to encourage development and deployment of carbon capture and storage technology.',
    category: 'environment',
    scope: 'federal',
    icon: 'Leaf',
    averageSupport: 79,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Technology Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 79,
      },
    ],
    details: [
      {
        title: 'Climate Innovation',
        description: 'Incentivize development of technology to remove CO2 from atmosphere.',
      },
      {
        title: 'Market-Based Solution',
        description: 'Use tax policy to encourage private sector climate action.',
      },
      {
        title: 'Strong Support',
        description: 'Supported by 89% of Democrats and 69% of Republicans.',
      },
    ],
    resourceFlow: {
      from: 'Federal government (tax revenue for credits)',
      to: 'Companies developing carbon capture technology',
      channel: 'Tax credits per ton of CO2 captured and stored',
    },
    ifThen: [
      'If your company develops technology that captures CO2 from the air or industrial processes, you receive tax credits for every ton captured',
      'If you run a power plant or factory, tax incentives make installing carbon capture equipment more economically viable',
      'If you invest in carbon capture innovation, federal policy reduces the financial risk of developing new climate technologies',
    ],
    causalChain: {
      immediate: 'Provide substantial tax credits for carbon capture and storage technology deployment',
      outcome: 'Accelerate development and deployment of carbon removal technology, reduce industrial emissions, and create pathway to negative emissions',
    },
    commonQuestions: [
      {
        question: 'How does carbon capture work?',
        answer: 'Technology aims to capture CO2 from industrial emissions or directly from air, then store it underground or convert it to products. While promising in theory, the technology remains expensive and largely unproven at scale. Its role in climate solutions is heavily debated among experts.',
      },
      {
        question: 'Is this just helping polluters keep polluting?',
        answer: 'This is a major concern. Critics argue subsidies let fossil fuel companies delay real emissions cuts. The technology has repeatedly failed to deliver promised results, and some projects have been used to extract more oil. Supporters counter it is necessary for hard-to-decarbonize industries, but the debate over effectiveness versus enabling continued pollution is unresolved.',
      },
      {
        question: 'How much do these tax credits cost?',
        answer: 'Current federal programs offer around $85 per ton of CO2 captured. Costs depend on how much carbon is captured. The goal is to make the technology economically viable at scale, which reduces long-term climate costs.',
      },
    ],
    trending: 'up',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'federal-university-research',
    rank: 19,
    title: 'Support Federal University Research Funding',
    description: 'Maintain or increase federal funding for scientific research at universities to drive innovation and discovery.',
    category: 'education',
    scope: 'federal',
    icon: 'Microscope',
    averageSupport: 71,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Higher Education and Research Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    details: [
      {
        title: 'Drive Innovation',
        description: 'University research leads to breakthroughs in medicine, technology, and science.',
      },
      {
        title: 'Economic Growth',
        description: 'Research funding creates jobs and spurs economic development.',
      },
      {
        title: 'Bipartisan Agreement',
        description: 'Supported by 89% of Democrats, 56% of Republicans, and 67% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'Federal government (research grants via NSF, NIH, DOE, etc.)',
      to: 'Universities conducting scientific research',
      channel: 'Competitive grant programs funding basic and applied research',
    },
    ifThen: [
      'If you are a university researcher, you can apply for federal grants to fund groundbreaking scientific research',
      'If you attend a university, you benefit from cutting-edge research that improves education and leads to new discoveries',
      'If you work in industry, you benefit from innovations that originated in federally-funded university research',
    ],
    causalChain: {
      immediate: 'Maintain or increase federal funding for scientific research at universities',
      outcome: 'Drive medical breakthroughs, technological innovation, and scientific discovery; create high-skilled jobs; maintain US competitiveness in research and development',
    },
    commonQuestions: [
      {
        question: 'Why should taxpayers fund university research?',
        answer: 'University research has driven major innovations like GPS, the internet, and mRNA vaccines with huge economic returns. However, critics point to waste, administrative overhead, and research with questionable practical value. The challenge is funding high-impact basic research while ensuring accountability and avoiding low-value projects.',
      },
      {
        question: 'What kinds of research does this fund?',
        answer: 'Everything from cancer treatment to clean energy to artificial intelligence to climate science. Agencies like NIH fund health research, NSF funds basic science, DOE funds energy research, and others support different fields.',
      },
      {
        question: 'How is this different from private research?',
        answer: 'Companies fund research with near-term commercial value. Universities conduct basic research exploring fundamental questions. While this can lead to breakthroughs decades later, critics question which research truly merits public funding versus what reflects academic interests with limited practical benefit. Determining research priorities remains contentious.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'abortion-fatal-anomaly',
    rank: 20,
    title: 'Allow Abortion for Fatal Fetal Anomalies',
    description: 'States should permit abortion when fetal abnormalities would prevent survival after birth.',
    category: 'healthcare',
    scope: 'state',
    icon: 'HeartCrack',
    averageSupport: 86,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    details: [
      {
        title: 'Medical Compassion',
        description: 'Allow families to make decisions in tragic medical circumstances.',
      },
      {
        title: 'Reduce Suffering',
        description: 'Provide options when continuing pregnancy would not result in viable birth.',
      },
      {
        title: 'Strong Agreement',
        description: 'Supported by 93% of Democrats, 76% of Republicans, and 88% of Independents.',
      },
    ],
    resourceFlow: {
      from: 'State laws (permitting medical procedures)',
      to: 'Families facing fatal fetal diagnoses',
      channel: 'Exception in state abortion laws for fatal fetal anomalies',
    },
    ifThen: [
      'If prenatal testing reveals your baby has a condition incompatible with life after birth, you can choose to end the pregnancy rather than carry to term',
      'If your fetus is diagnosed with fatal anomalies, you and your doctor can make compassionate medical decisions without legal barriers',
      'If you face this tragic situation, you have the option to avoid months of pregnancy knowing the outcome is inevitable loss',
    ],
    causalChain: {
      immediate: 'State laws permit abortion when fetal abnormalities would prevent survival after birth',
      outcome: 'Provide compassionate options for families in tragic circumstances, prevent forced continuation of non-viable pregnancies, and allow medical professionals to provide appropriate care',
    },
    commonQuestions: [
      {
        question: 'What conditions qualify as fatal fetal anomalies?',
        answer: 'Conditions like anencephaly (missing major brain portions), Potter syndrome (no kidneys), or severe genetic disorders where the fetus cannot survive outside the womb. Diagnosis is made by medical professionals through testing.',
      },
      {
        question: 'Why not just carry to term in these cases?',
        answer: 'Some families choose this. Others prefer to avoid months of pregnancy, associated health risks, and emotional trauma when they know survival is impossible. This policy respects both choices.',
      },
      {
        question: 'Do all states allow this?',
        answer: 'No. Some states with strict abortion bans do not include exceptions for fatal fetal anomalies, forcing families to continue non-viable pregnancies or travel out of state. 86% of Americans believe this exception should exist.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
];

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
