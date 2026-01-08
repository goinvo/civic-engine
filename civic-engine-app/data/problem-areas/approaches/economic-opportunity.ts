/**
 * Economic Opportunity & Wages - Implementation Approaches
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const economicOpportunityApproaches: ImplementationApproach[] = [
  {
    id: 'economy-raise-minimum-wage',
    problemAreaId: 'economic-opportunity',
    title: 'Raise the Minimum Wage',
    summary:
      'Increase the federal (or state/local) minimum wage so that low-wage work pays enough to live on. Current federal minimum: $7.25/hour (unchanged since 2009).',
    mechanism: `• Federal minimum wage increase (proposals range from $12 to $17+)
• Phased in over several years
• Index to inflation (automatic increases)
• Some proposals: regional variation based on cost of living
• Some proposals: eliminate tipped minimum wage ($2.13 federal)`,
    tradeoffs: {
      benefits: [
        'Direct, immediate raise for low-wage workers',
        'Simple to implement and enforce',
        'Reduces government spending on safety net',
        'Restores dignity to low-wage work',
        '30+ states already above federal minimum',
      ],
      costs: [
        'May reduce employment (economists debate magnitude)',
        'Small businesses in low-cost areas may struggle',
        'Doesn\'t help unemployed or gig workers',
        'May accelerate automation of low-wage jobs',
        'One size may not fit all regions',
      ],
    },
    source:
      'Raise the Wage Act (federal $17 proposal); state minimums ranging from $7.25 to $17+; Seattle, NYC, CA examples',
    voices_support: [
      {
        persona: 'Fast food worker (Destiny Morales, 24)',
        argument:
          'I work 40 hours a week and qualify for food stamps. That\'s corporate welfare — taxpayers subsidize McDonald\'s payroll. Pay me enough to live.',
      },
      {
        persona: 'Small business owner (Gregory Ainsworth, 49)',
        argument:
          'I already pay $15 because that\'s what it takes to get reliable workers. A higher minimum levels the playing field against competitors who exploit people.',
      },
      {
        persona: 'Economist (Dr. Carmen Vega, 44)',
        argument:
          'The Seattle and California natural experiments show minimal job losses. Monopsony power means employers can pay below market — minimum wage corrects that.',
      },
      {
        persona: 'Anti-poverty advocate (Reverend Lucille Barnes, 58)',
        argument:
          'EITC is great, but it requires filing taxes and comes once a year. Minimum wage is immediate, every paycheck. Workers need both.',
      },
      {
        persona: 'Labor historian (Professor Samuel Briggs, 62)',
        argument:
          'The minimum wage was meant to be a living wage. FDR was explicit: \'No business which depends on paying less than living wages has any right to continue.\'',
      },
      {
        persona: 'Parent working two jobs (Luis Herrera, 38)',
        argument:
          'I work 60 hours between two jobs and barely see my kids. A real minimum wage means one job that supports a family. That\'s the American dream, right?',
      },
    ],
    voices_opposition: [
      {
        persona: 'Economist (Dr. Philip Kessler, 51)',
        argument:
          'Price floors create surpluses — in this case, unemployment. CBO estimates $15 minimum would eliminate 1.4 million jobs. Good intentions, bad outcomes.',
      },
      {
        persona: 'Small business owner (Wanda Pickett, 57)',
        argument:
          'I operate on 5% margins. $15/hour isn\'t a raise — it\'s closing my doors. Seattle can afford it; my town in Mississippi can\'t.',
      },
      {
        persona: 'Teen job seeker (Jordan Cleary, 17)',
        argument:
          'I just want experience. If employers have to pay $15, they\'ll hire experienced adults, not teenagers. Entry-level jobs disappear.',
      },
      {
        persona: 'Restaurant owner (Vincent Napoli, 46)',
        argument:
          'Eliminating the tipped minimum would destroy tipped workers\' earnings. Good servers make $25-40/hour with tips. They don\'t want this \'help.\'',
      },
      {
        persona: 'Libertarian (Chad Brennan, 33)',
        argument:
          'Wages should be set by voluntary agreement between workers and employers. Government mandating prices is economically illiterate and morally wrong.',
      },
      {
        persona: 'Automation analyst (Dr. Sandra Cho, 39)',
        argument:
          'Every minimum wage increase accelerates the business case for kiosks, robots, and AI. You\'re not raising wages — you\'re eliminating the jobs entirely.',
      },
    ],
    evidence: [
      'CBO (2021): $15 minimum would raise wages for 17 million workers; cost 1.4 million jobs; lift 900,000 out of poverty',
      'Seattle studies: UW study found hours reduced; Berkeley study found minimal impact. Depends on methodology.',
      'State variation: States with higher minimums haven\'t seen dramatic employment differences, but causality is disputed',
      'Historical: Real minimum wage peaked in 1968; current federal minimum is lowest in decades (inflation-adjusted)',
    ],
    order: 1,
    icon: 'DollarSign',
  },
  {
    id: 'economy-expand-eitc',
    problemAreaId: 'economic-opportunity',
    title: 'Expand the Earned Income Tax Credit (EITC)',
    summary:
      'Boost the incomes of low-wage workers through a refundable tax credit that rewards work. The more you earn (up to a point), the bigger the credit.',
    mechanism: `• Refundable credit: you get money even if you owe no taxes
• Phases in with earnings, plateaus, then phases out
• Current max: ~$7,400 for families with 3+ children; ~$600 for childless workers
• Proposals: Expand credit for childless workers, make monthly (not annual)
• Some proposals: match state EITC programs`,
    tradeoffs: {
      benefits: [
        'Rewards and incentivizes work',
        'Doesn\'t burden employers (taxpayer-funded)',
        'Bipartisan support (Reagan expansion, ongoing)',
        'Targeted to low-income workers',
        'Can adjust for family size, regional cost',
      ],
      costs: [
        'Comes once a year (hard to budget)',
        'Complexity: many eligible workers don\'t claim',
        'Doesn\'t raise market wages (may subsidize low-wage employers)',
        'High error/fraud rate due to complexity',
        'Childless workers get almost nothing currently',
      ],
    },
    source:
      'Current federal EITC; LIFT Act and other expansion proposals; state EITC programs (30+ states)',
    voices_support: [
      {
        persona: 'Conservative economist (Dr. Russell Crane, 56)',
        argument:
          'EITC is the best anti-poverty program we have. It rewards work, doesn\'t distort markets, and has bipartisan support. Reagan expanded it; Clinton expanded it. Expand it again.',
      },
      {
        persona: 'Working mother (Shanice Dawson, 29)',
        argument:
          'That refund check every spring is how I catch up on bills and buy school clothes. It\'s not a handout — I earned it by working all year.',
      },
      {
        persona: 'Policy researcher (Dr. Nina Patel, 38)',
        argument:
          'EITC lifted 5.6 million people out of poverty last year. It increases workforce participation, especially among single mothers. The evidence is rock solid.',
      },
      {
        persona: 'Anti-minimum-wage conservative (Howard Lindgren, 63)',
        argument:
          'Instead of mandating wages that kill jobs, subsidize low-wage workers directly. EITC achieves the same goal without the economic damage.',
      },
      {
        persona: 'Tax simplification advocate (Beverly Thornton, 47)',
        argument:
          'Make EITC automatic and monthly. The IRS has the data. No forms, no tax prep fees, no waiting until April. Just a steady boost every paycheck.',
      },
      {
        persona: 'Bipartisan deal-maker (Senator Dale Richmond, 54)',
        argument:
          'This is where left and right actually agree. Expand EITC for childless workers, simplify claiming, make it monthly. It\'s achievable.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Labor advocate (Connie Sherwood, 48)',
        argument:
          'EITC subsidizes Walmart\'s poverty wages with taxpayer money. Why should we pay so corporations can underpay? Raise wages instead.',
      },
      {
        persona: 'Childless worker (Terrence Odom, 34)',
        argument:
          'I work full-time at $12/hour. My coworker with kids gets $5,000 in EITC; I get $200. How is that fair? We do the same job.',
      },
      {
        persona: 'Fraud-concerned taxpayer (Douglas Hartley, 59)',
        argument:
          'EITC has a 25% improper payment rate — billions in fraud and errors. Fix the program before expanding it.',
      },
      {
        persona: 'Universal income advocate (Dr. Pamela Cross, 41)',
        argument:
          'EITC is complicated, stigmatizing, and requires work. Just give people money. Stop means-testing everything.',
      },
      {
        persona: 'Low-wage worker (Imani Ross, 27)',
        argument:
          'I need money every month, not a lump sum in April. By tax time I\'m already in debt from the year. Monthly matters.',
      },
      {
        persona: 'Progressive critic (Jared Espinoza, 36)',
        argument:
          'EITC lets employers off the hook. It\'s corporate welfare disguised as worker support. The public pays; employers profit.',
      },
    ],
    evidence: [
      'Poverty impact: EITC lifts more children out of poverty than any other program except Social Security',
      'Work incentives: Strong evidence EITC increases labor force participation, especially single mothers',
      'Improper payments: ~25% rate, but mostly errors (complex eligibility), not fraud',
      'Claiming rate: ~80% of eligible workers claim; 20% leave money on the table',
      'Expansion proposals: Making childless worker credit equal to family credit would cost ~$100B/decade',
    ],
    order: 2,
    icon: 'Receipt',
  },
  {
    id: 'economy-strengthen-unions',
    problemAreaId: 'economic-opportunity',
    title: 'Strengthen Labor Unions / Worker Power',
    summary:
      'Make it easier for workers to organize unions and bargain collectively. Restore worker power as a counterbalance to corporate power.',
    mechanism: `• Easier union elections (card check, faster votes)
• Penalties for employer interference
• Sectoral bargaining (industry-wide contracts, not firm-by-firm)
• Ban "right-to-work" laws (which weaken union finances)
• Extend organizing rights to gig workers, contractors
• Worker representation on corporate boards (codetermination)`,
    tradeoffs: {
      benefits: [
        'Directly increases worker bargaining power',
        'Union workers earn ~15% more than non-union',
        'Benefits extend beyond union members (pattern bargaining)',
        'Political voice for working class',
        'Reduces inequality (unions compress wage distribution)',
      ],
      costs: [
        'May reduce business flexibility and competitiveness',
        'Can protect underperformers (rigid work rules)',
        'Adversarial labor relations in some industries',
        'Union decline may be structural, not just legal',
        'Some workers don\'t want to pay dues or join',
      ],
    },
    source:
      'PRO Act (federal proposal); state-level reforms; international models (Germany codetermination, Nordic sectoral bargaining)',
    voices_support: [
      {
        persona: 'Union electrician (Mike Kowalski, 52)',
        argument:
          'My union negotiated my wages, benefits, pension, and safety standards. Without it, I\'d be competing against guys willing to work for less. Solidarity works.',
      },
      {
        persona: 'Labor economist (Dr. Franklin Morse, 49)',
        argument:
          'The decline of unions explains a third of rising inequality since the 1970s. It\'s not coincidence that wages stagnated as union membership collapsed.',
      },
      {
        persona: 'Amazon warehouse worker (Keisha Williams, 28)',
        argument:
          'They monitor our bathroom breaks, fire people via algorithm, and pay poverty wages. Only collective action gives us any power. One worker is disposable; a thousand aren\'t.',
      },
      {
        persona: 'Progressive political strategist (Elliott Farnsworth, 42)',
        argument:
          'Unions are the only mass organization that represents working-class interests in politics. Rebuild unions, rebuild democracy.',
      },
      {
        persona: 'German economist (Dr. Ingrid Scholz, 55)',
        argument:
          'Germany has strong unions, worker board representation, and higher manufacturing wages than the US — and they\'re still globally competitive. The American model isn\'t the only way.',
      },
      {
        persona: 'Service worker (Rosa Delgado, 34)',
        argument:
          'After we unionized, wages went up 30%, we got health insurance, and management couldn\'t schedule us with 2 hours notice anymore. That\'s dignity.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Small manufacturer (Gene Halstead, 58)',
        argument:
          'A union would make me uncompetitive. My margins are thin. I can\'t afford industry-wide contracts negotiated by mega-corporations and big unions.',
      },
      {
        persona: 'Worker who rejected union (Cynthia Trumbull, 41)',
        argument:
          'We voted against unionizing. I don\'t want dues taken from my check to fund political causes I disagree with. Why can\'t progressives accept that some workers say no?',
      },
      {
        persona: 'Economist (Dr. Warren Blackstone, 53)',
        argument:
          'Unions are cartels for labor. They benefit members at the expense of outsiders — consumers pay higher prices, non-union workers face less opportunity.',
      },
      {
        persona: 'Gig worker (Nathan Chu, 31)',
        argument:
          'I left traditional employment deliberately. I don\'t want a union telling me when, where, and for how much I can work. Flexibility is the point.',
      },
      {
        persona: 'Right-to-work advocate (Victoria Lawson, 47)',
        argument:
          'Forcing workers to pay dues to an organization they didn\'t choose is coercion. Right-to-work is about freedom of association.',
      },
      {
        persona: 'Business competitiveness analyst (Dr. Raymond Nguyen, 44)',
        argument:
          'Why did manufacturing move South, then overseas? Partly unions. Rigid work rules, adversarial relations, and high costs drove jobs away. That history matters.',
      },
    ],
    evidence: [
      'Union wage premium: ~10-15% higher wages for comparable workers',
      'Inequality correlation: Union decline tracks closely with rising inequality since 1970s',
      'Membership decline: From 35% (1954) to 10% today (6% private sector)',
      'PRO Act provisions: Card check, sectoral bargaining, contractor reclassification — major structural changes',
      'International comparison: High-union countries (Germany, Scandinavia) have higher wages and lower inequality, but different industrial structures',
    ],
    order: 3,
    icon: 'Users',
  },
  {
    id: 'economy-job-training',
    problemAreaId: 'economic-opportunity',
    title: 'Job Training & Skills Development',
    summary:
      'Help workers gain skills that command higher wages. Invest in education, apprenticeships, and retraining for the jobs of the future.',
    mechanism: `• Expand apprenticeship programs (earn while you learn)
• Community college funding (free or subsidized)
• Sector-based training partnerships (employers + educators)
• Retraining programs for displaced workers (trade adjustment, automation transition)
• Pell Grant expansion for short-term credentials
• Tax credits for employer-provided training`,
    tradeoffs: {
      benefits: [
        'Addresses root cause (skills gap)',
        'Empowers individuals long-term',
        'Employer involvement ensures job relevance',
        'Doesn\'t mandate wages or interfere with markets',
        'Bipartisan appeal (investment in people)',
      ],
      costs: [
        'Takes years to show results',
        'Not everyone can or wants to retrain',
        'Training programs have mixed track records',
        'Doesn\'t help workers who already have skills but low wages',
        '"Learn to code" can feel dismissive to displaced workers',
      ],
    },
    source:
      'Workforce Innovation and Opportunity Act (WIOA); German apprenticeship model; community college initiatives; sector partnerships',
    voices_support: [
      {
        persona: 'Apprentice electrician (DeShawn Carter, 23)',
        argument:
          'I\'m earning while I\'m learning. No student debt. In three years I\'ll be a journeyman making $35/hour. College isn\'t the only path.',
      },
      {
        persona: 'Community college president (Dr. Harriet Simmons, 59)',
        argument:
          'We partner directly with employers who need skilled workers. Our students get credentials that lead to jobs, not just degrees that lead to debt.',
      },
      {
        persona: 'Conservative workforce advocate (Bradley Kemp, 51)',
        argument:
          'Instead of mandating wages or expanding welfare, invest in people. Give them skills to command higher wages on merit. That\'s opportunity, not dependency.',
      },
      {
        persona: 'Tech company HR director (Priya Raghavan, 38)',
        argument:
          'We can\'t find enough skilled workers. We\'d happily pay more if candidates had the right training. The pipeline is the problem.',
      },
      {
        persona: 'Displaced manufacturing worker (Tom Jeffers, 54)',
        argument:
          'I was skeptical, but the retraining program got me certified in HVAC. I\'m earning more now than at the factory. It can work if it\'s done right.',
      },
      {
        persona: 'Economist (Dr. Felicia Grant, 46)',
        argument:
          'The wage premium for education and skills has grown enormously. The best long-term anti-poverty program is investment in human capital.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Sociologist (Dr. Lorraine Moss, 48)',
        argument:
          'The \'skills gap\' is largely a myth promoted by employers who don\'t want to pay more. There\'s no shortage of workers — there\'s a shortage of decent wages.',
      },
      {
        persona: 'Displaced worker (Raymond Stokes, 55)',
        argument:
          '\'Learn to code\' is an insult. I worked 30 years in manufacturing. I\'m not going back to school to compete with 22-year-olds. I need wages for the skills I have.',
      },
      {
        persona: 'Job training program critic (Hugh Pennington, 61)',
        argument:
          'Most federal job training programs have dismal outcomes. GAO has documented failure after failure. We keep funding what doesn\'t work.',
      },
      {
        persona: 'Low-wage worker (Amber Fitzgerald, 26)',
        argument:
          'I have a bachelor\'s degree and make $14/hour. It\'s not about skills — there just aren\'t enough good jobs. Training for bad jobs doesn\'t help.',
      },
      {
        persona: 'Labor advocate (Danielle Reyes, 39)',
        argument:
          'Skills training puts all the burden on workers. What about employer responsibility? Why should workers constantly adapt while corporations extract profits?',
      },
      {
        persona: 'Rural worker (Kenny Bowman, 43)',
        argument:
          'Train for what jobs? There\'s nothing here. Training doesn\'t create jobs — it just makes you overqualified for the jobs that exist.',
      },
    ],
    evidence: [
      'Apprenticeships: Strong outcomes; apprentices earn ~$300K more over career than peers. But programs are small in US compared to Germany.',
      'Community college: Mixed outcomes depending on program; vocational certificates often have better ROI than associate degrees',
      'Federal job training: GAO and academic reviews find modest positive effects, but high variation and many failures',
      'Skills gap debate: Employer surveys claim shortages; economists debate whether this reflects unwillingness to raise wages or train internally',
      'Automation displacement: McKinsey estimates 30% of workers need significant reskilling by 2030',
    ],
    order: 4,
    icon: 'BookOpen',
  },
  {
    id: 'economy-universal-basic-income',
    problemAreaId: 'economic-opportunity',
    title: 'Universal Basic Income (UBI)',
    summary:
      'Provide every adult a regular cash payment regardless of work status. Decouple basic economic security from employment.',
    mechanism: `• Unconditional cash payment to all adults (proposals: $500-$1,000+/month)
• No means testing (everyone gets it) or work requirements
• Replaces or supplements existing safety net (varies by proposal)
• Funded through taxes (VAT, wealth tax, carbon tax, etc.)
• Some proposals: Negative Income Tax (similar mechanism, different structure)`,
    tradeoffs: {
      benefits: [
        'Eliminates poverty if set high enough',
        'No bureaucracy, no stigma, no complexity',
        'Values unpaid work (caregiving, art, community)',
        'Cushion for gig economy, automation transition',
        'Freedom to refuse exploitative work',
      ],
      costs: [
        'Extremely expensive ($3T+/year for $1K/month)',
        'May reduce work incentives (debated)',
        'Doesn\'t address employer power or wage determination',
        'Political feasibility very low',
        'May cause inflation if not funded properly',
      ],
    },
    source:
      'Andrew Yang 2020 campaign ($1K/month "Freedom Dividend"); Alaska Permanent Fund (~$1,600/year); various pilot programs (Stockton, Kenya, Finland)',
    voices_support: [
      {
        persona: 'Tech entrepreneur (Vijay Mehta, 37)',
        argument:
          'Automation is coming for all jobs eventually. UBI is the only solution that doesn\'t depend on employment that may not exist. It\'s economic survival preparation.',
      },
      {
        persona: 'Caregiver (Gloria Hensley, 52)',
        argument:
          'I take care of my disabled mother full-time. That\'s work, but it\'s not a \'job\' so I get nothing. UBI recognizes that socially valuable work isn\'t always paid work.',
      },
      {
        persona: 'Libertarian economist (Dr. Calvin Whitmore, 58)',
        argument:
          'UBI replaces the entire welfare bureaucracy with one simple program. No case workers, no eligibility determination, no surveillance of the poor. It\'s freedom.',
      },
      {
        persona: 'Stockton pilot participant (Monique Hastings, 33)',
        argument:
          'That $500/month let me cut my second job and spend time with my kids. I didn\'t stop working — I stopped working myself to death.',
      },
      {
        persona: 'Artist (Kayla Erickson, 31)',
        argument:
          'I create things that matter but don\'t pay. UBI would let me contribute to culture without starving. The market doesn\'t value everything that\'s valuable.',
      },
      {
        persona: 'Anti-poverty progressive (Councilwoman Judith Flowers, 49)',
        argument:
          'Means-testing is expensive, intrusive, and misses people. Just give everyone money. Those who don\'t need it pay it back in taxes.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Fiscal conservative (Arthur Kendrick, 64)',
        argument:
          '$3 trillion a year. Where does that come from? Even confiscating all billionaire wealth wouldn\'t cover it. This is fantasy economics.',
      },
      {
        persona: 'Work-values conservative (Pastor Emmett Douglas, 57)',
        argument:
          'Work isn\'t just about money — it\'s purpose, dignity, structure. UBI pays people not to work. That\'s corrosive to character and community.',
      },
      {
        persona: 'Safety-net defender (Dr. Rosalind Pierce, 44)',
        argument:
          'UBI proposals often replace existing programs. Trading food stamps, housing vouchers, and Medicaid for a $1,000 check hurts the poorest. It\'s a Trojan horse.',
      },
      {
        persona: 'Labor unionist (Frank Donovan, 51)',
        argument:
          'UBI is tech-bro distraction from the real fight: employer power, union rights, and living wages. Don\'t give people money to accept exploitation — fight the exploitation.',
      },
      {
        persona: 'Inflation-concerned economist (Dr. Helen Kirkland, 47)',
        argument:
          'Give everyone $1,000/month and landlords raise rent $1,000/month. Without price controls, UBI just transfers wealth to asset owners.',
      },
      {
        persona: 'Job-creation advocate (Maurice Hampton, 42)',
        argument:
          'People want to work. They want jobs. Instead of accepting mass unemployment and paying people off, create public jobs — infrastructure, caregiving, conservation.',
      },
    ],
    evidence: [
      'Alaska Permanent Fund: ~$1,600/year; no significant work reduction; modest positive effects on health, education',
      'Stockton pilot: $500/month to 125 recipients; full-time employment increased (freed up time for job search)',
      'Finland experiment: No effect on employment; improved wellbeing, reduced stress',
      'Kenya GiveDirectly: Long-term cash transfers show sustained benefits, no work reduction',
      'Cost estimates: True UBI ($1K/month to all adults) would cost $3T+/year; partial versions much less',
    ],
    order: 5,
    icon: 'Wallet',
  },
];
