/**
 * Childcare & Family Support - Implementation Approaches
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const childcareApproaches: ImplementationApproach[] = [
  {
    id: 'childcare-universal-pre-k',
    problemAreaId: 'childcare-family',
    title: 'Universal Pre-K',
    summary:
      'Provide free, high-quality pre-kindergarten education to all 3- and 4-year-olds, regardless of family income.',
    mechanism: `• Public school districts or qualified providers offer pre-K
• State or federal funding covers costs
• Standards for curriculum, teacher qualifications, class size
• Full-day or part-day options
• Optional enrollment (not mandated)`,
    tradeoffs: {
      benefits: [
        'Educational benefits for children (school readiness)',
        'Reduces childcare costs for families',
        'Addresses inequality (low-income kids start behind)',
        'Allows parents to work',
        'Proven models exist (Oklahoma, NYC)',
      ],
      costs: [
        'Significant public investment required',
        'Quality varies widely; poorly implemented programs may not help',
        'Doesn\'t help infants/toddlers (0-2)',
        'May crowd out existing providers',
        'Benefits accrue over time; not immediate family relief',
      ],
    },
    source: 'Oklahoma universal pre-K (1998); NYC Pre-K for All; federal proposals (Build Back Better)',
    voices_support: [
      {
        persona: 'Early childhood researcher (Dr. Lucinda Howell, 53)',
        argument:
          'The evidence is clear: high-quality pre-K improves outcomes for decades — graduation rates, earnings, reduced incarceration. It\'s one of the best investments we can make.',
      },
      {
        persona: 'Working mother (Priya Sharma, 36)',
        argument:
          'Pre-K let me go back to work. Without it, I\'d be paying $1,500/month or staying home. It\'s not just education — it\'s economic survival.',
      },
      {
        persona: 'Elementary school teacher (Danielle Prescott, 41)',
        argument:
          'The kids who had pre-K come to kindergarten ready to learn. The kids who didn\'t are a year behind from day one. We never close that gap.',
      },
      {
        persona: 'Oklahoma legislator (Rep. Roy Hendricks, 57)',
        argument:
          'We\'ve had universal pre-K for 25 years. It\'s wildly popular — even in a red state. Kids do better, parents can work, businesses have employees. What\'s not to like?',
      },
      {
        persona: 'Equity advocate (Monique Tillman, 44)',
        argument:
          'Rich kids get pre-K. Poor kids don\'t. By kindergarten, there\'s already an achievement gap. Universal pre-K is how we give every kid a fair start.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Stay-at-home parent (Jennifer Corbin, 34)',
        argument:
          'I chose to raise my kids at home. Why should my taxes subsidize other families\' childcare? Give me a tax credit to use however I want.',
      },
      {
        persona: 'Fiscal conservative (Douglas Whitman, 52)',
        argument:
          'Oklahoma\'s program costs $3,000 per child. Scale that nationally and you\'re talking $30 billion a year. For 4-year-olds. Where does it end?',
      },
      {
        persona: 'Skeptical researcher (Dr. Terrance Vogel, 48)',
        argument:
          'The famous Perry Preschool study was tiny and targeted. Large-scale universal programs show smaller effects. We might be overpromising what pre-K can do.',
      },
      {
        persona: 'Private preschool owner (Miriam Goldstein, 55)',
        argument:
          'Free public pre-K will put me out of business. I\'ve invested 20 years in quality early education. Now the government wants to give it away and destroy my livelihood.',
      },
      {
        persona: 'Home-school advocate (Bethany Larson, 39)',
        argument:
          'Three- and four-year-olds belong with their families, not in institutions. This is about getting kids into the system earlier, not about what\'s best for children.',
      },
      {
        persona: 'Parent of infant (April Connelly, 31)',
        argument:
          'Great for 4-year-olds, but what about my 1-year-old? Childcare costs $2,000/month. Pre-K doesn\'t help me for another three years.',
      },
    ],
    evidence: [
      'Oklahoma (universal since 1998): Fourth graders score above national average; largest gains for low-income students',
      'Head Start (targeted): Mixed long-term results; quality varies',
      'Perry Preschool: High ROI in famous study, but small sample; hard to replicate at scale',
      'International: Countries with universal early education (France, Denmark) show strong outcomes',
    ],
    endorsing_orgs: ['First Five Years Fund', 'National Education Association', 'Business Roundtable'],
    opposing_orgs: ['Some homeschool advocates', 'Some libertarian groups'],
    order: 1,
    icon: 'School',
  },
  {
    id: 'childcare-tax-credits',
    problemAreaId: 'childcare-family',
    title: 'Child Tax Credits / Direct Payments',
    summary:
      'Give families direct cash through expanded child tax credits, letting parents decide how to use the money — whether for childcare, staying home, or other needs.',
    mechanism: `• Expand Child Tax Credit (e.g., $3,600/child under 6)
• Make fully refundable (benefits families even without tax liability)
• Monthly payments (not once-a-year refund)
• No work requirements (universal)
• Phase out at higher incomes (or not — varies by proposal)`,
    tradeoffs: {
      benefits: [
        'Maximum flexibility for families',
        'Reaches all families, including stay-at-home parents',
        'Simple to administer (uses existing tax system)',
        'Reduces child poverty dramatically',
        'Values unpaid caregiving equally',
      ],
      costs: [
        'Doesn\'t guarantee spending on children or childcare',
        'Doesn\'t increase childcare supply',
        'Expensive ($100B+/year for expanded CTC)',
        'No work incentive (some proposals)',
        'May increase demand without increasing supply',
      ],
    },
    source: 'American Rescue Plan (2021 CTC expansion); Romney Family Security Act; Bennet/Brown proposals',
    voices_support: [
      {
        persona: 'Parent who used expanded CTC (Maria Fuentes, 28)',
        argument:
          'Those monthly checks changed our life. We could pay for diapers, food, a babysitter when I worked late. Then they stopped. Child poverty went back up immediately.',
      },
      {
        persona: 'Conservative pro-family advocate (Kenneth Barfield, 51)',
        argument:
          'Let parents choose. Some want daycare; some want to stay home; some want grandma to help. A tax credit respects family autonomy instead of pushing everyone into institutions.',
      },
      {
        persona: 'Poverty researcher (Dr. Claudia Shepherd, 47)',
        argument:
          'The 2021 expanded CTC cut child poverty by 40%. Forty percent. Then Congress let it expire and child poverty doubled. We know what works.',
      },
      {
        persona: 'Stay-at-home mom (Amanda Whitfield, 33)',
        argument:
          'I\'m raising three kids. That\'s a full-time job. Why should only parents who pay for daycare get a subsidy? The tax credit values my work too.',
      },
      {
        persona: 'Economist (Dr. Paul Westbrook, 55)',
        argument:
          'Cash transfers are the most efficient anti-poverty tool. No bureaucracy deciding who deserves help, no providers gaming the system. Just money to families who need it.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Work-requirements advocate (Rep. Sandra Kirkland, 49)',
        argument:
          'The expanded CTC had no work requirement. Why should working families subsidize people who choose not to work? Tie benefits to employment.',
      },
      {
        persona: 'Childcare provider (Heather Dawson, 42)',
        argument:
          'Cash doesn\'t create childcare slots. Parents have money but nowhere to spend it. We need investment in supply, not just demand.',
      },
      {
        persona: 'Fiscal hawk (Ronald Stanfield, 58)',
        argument:
          'The expanded CTC cost $100 billion a year. That\'s real money. How do we pay for it? Tax increases? Debt? Something has to give.',
      },
      {
        persona: 'Targeted-benefits advocate (Dr. Eleanor Raines, 52)',
        argument:
          'Universal benefits waste money on families who don\'t need help. Why send checks to millionaires? Target resources to the poor.',
      },
      {
        persona: 'Child development expert (Dr. Nina Aronson, 49)',
        argument:
          'Cash helps, but it doesn\'t guarantee quality early learning. Kids need more than money — they need high-quality care and education that some families won\'t buy.',
      },
    ],
    evidence: [
      '2021 CTC expansion: Child poverty fell 46% (Census); bounced back after expiration',
      'Columbia study: $3,000/child would cut deep poverty by 60%',
      'Canada Child Benefit: Similar program reduced child poverty significantly',
      'No evidence of reduced work effort during 2021 expansion',
    ],
    endorsing_orgs: ['National Academy of Sciences', 'Niskanen Center (center-right)', 'Children\'s Defense Fund'],
    opposing_orgs: ['Some fiscal conservatives', 'Some work-requirement advocates'],
    order: 2,
    icon: 'Banknote',
  },
  {
    id: 'childcare-subsidies',
    problemAreaId: 'childcare-family',
    title: 'Childcare Subsidies',
    summary:
      'Government subsidizes the cost of licensed childcare for working families, reducing out-of-pocket expenses based on income.',
    mechanism: `• Sliding-scale subsidies based on family income
• Payments go directly to licensed providers
• Eligibility tied to work/school enrollment
• Income eligibility thresholds vary by state
• May include quality standards and provider rates`,
    tradeoffs: {
      benefits: [
        'Directly reduces childcare costs for working families',
        'Supports formal childcare economy',
        'Can require quality standards',
        'Allows parents to choose from approved providers',
        'Existing infrastructure (state-run programs)',
      ],
      costs: [
        'Doesn\'t help stay-at-home parents',
        'Complex eligibility rules create "cliffs"',
        'Low reimbursement rates may limit provider participation',
        'Waiting lists in many states',
        'Bureaucratic — significant administrative burden',
      ],
    },
    source: 'Child Care and Development Block Grant (CCDBG); state subsidy programs; Build Back Better proposals',
    voices_support: [
      {
        persona: 'Working single mom (Keisha Montel, 31)',
        argument:
          'The subsidy is why I can work. Childcare costs $1,200/month. I make $35,000. Without help, I\'d have to quit my job — and then I\'d need welfare anyway.',
      },
      {
        persona: 'Childcare center director (Wendy Ostrowski, 46)',
        argument:
          'Subsidies let us serve families who couldn\'t otherwise afford care. The reimbursement rate is low, but it keeps us in business serving the community.',
      },
      {
        persona: 'Workforce development advocate (Leonard Porter, 48)',
        argument:
          'You can\'t work if you can\'t find childcare. Childcare subsidies are workforce infrastructure. Employers need parents to be able to show up.',
      },
      {
        persona: 'Quality advocate (Dr. Cynthia Vaughn, 51)',
        argument:
          'Subsidies come with standards — licensed facilities, background checks, ratios. That means kids are in safe environments, not just warehoused.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Stay-at-home dad (Chris Townsend, 37)',
        argument:
          'Subsidies only go to paid care. I\'m raising my kids full-time, saving the system money. Why does the family using daycare get help but I don\'t?',
      },
      {
        persona: 'Informal caregiver (Doris Franklin, 64)',
        argument:
          'I watch my grandkids so my daughter can work. I\'m not a "licensed provider" so we don\'t qualify. The rules are too rigid.',
      },
      {
        persona: 'Free-market advocate (Timothy Grayson, 44)',
        argument:
          'Subsidies inflate prices. When government pays, providers raise rates. We\'re not making childcare cheaper — we\'re funneling taxpayer money to an industry.',
      },
      {
        persona: 'Parent on waiting list (Brianna Holt, 29)',
        argument:
          'I applied for a subsidy six months ago. Still waiting. The program exists on paper but doesn\'t actually help me right now.',
      },
      {
        persona: 'Cliff-effect victim (Stephanie Guzman, 33)',
        argument:
          'I got a $2/hour raise and lost my childcare subsidy. Now I\'m paying $800 more per month. The raise cost me money. The system punishes getting ahead.',
      },
    ],
    evidence: [
      'Current funding: Only 1 in 6 eligible families receives subsidies (federal data)',
      'Waitlists: 20+ states have waiting lists; some families wait years',
      'Quebec universal childcare: Increased maternal employment by 7 percentage points',
      'Provider rates: Many states pay below market rate, limiting access',
    ],
    endorsing_orgs: ['Child Care Aware', 'National Women\'s Law Center', 'AFL-CIO'],
    opposing_orgs: ['Some stay-at-home parent advocates', 'Some free-market groups'],
    order: 3,
    icon: 'HandCoins',
  },
  {
    id: 'childcare-paid-leave',
    problemAreaId: 'childcare-family',
    title: 'Paid Family Leave',
    summary:
      'Guarantee paid time off for new parents and family caregivers, allowing bonding with newborns without losing income or jobs.',
    mechanism: `• National paid leave program (12-24 weeks)
• Wage replacement (percentage of salary, often capped)
• Funded through payroll taxes or general revenue
• Job protection during leave
• Covers birth, adoption, and family medical needs`,
    tradeoffs: {
      benefits: [
        'Allows parent-child bonding in crucial early months',
        'Reduces infant mortality and improves health outcomes',
        'Increases maternal labor force participation long-term',
        'Reduces gender inequality (if fathers take leave too)',
        'Every other developed nation has this',
      ],
      costs: [
        'Cost to fund program (payroll tax increase or new spending)',
        'Small business burden if employers must hold jobs',
        'May reduce hiring of women of childbearing age (if employers bear cost)',
        'Doesn\'t help with ongoing childcare costs',
        'Cultural barriers to fathers taking leave',
      ],
    },
    source: 'FAMILY Act (federal proposal); state programs (CA, NJ, NY, WA, etc.); international models',
    voices_support: [
      {
        persona: 'New mother (Ashley Drummond, 32)',
        argument:
          'I went back to work six weeks after my C-section because I couldn\'t afford unpaid leave. I was physically and emotionally wrecked. Other countries give months. Why can\'t we?',
      },
      {
        persona: 'Pediatrician (Dr. Natasha Reeves, 44)',
        argument:
          'The first months are critical for attachment, breastfeeding, development. Paid leave isn\'t a luxury — it\'s a health intervention with lifelong benefits.',
      },
      {
        persona: 'Business leader (Gerald Hoffman, 53)',
        argument:
          'We offer paid leave because it helps retention. Training replacements costs more than covering leave. A national program levels the playing field.',
      },
      {
        persona: 'Working dad (Terrell Jackson, 35)',
        argument:
          'I got two weeks when my son was born. Two weeks. Then back to work while my wife recovered alone. Fathers should be there too.',
      },
      {
        persona: 'International comparison expert (Dr. Ingrid Solberg, 51)',
        argument:
          'The US is the only wealthy country without paid parental leave. Estonia gives 18 months. Canada gives 18 months. We\'re an outlier.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Small business owner (Valerie Marsh, 47)',
        argument:
          'I have five employees. If one takes 12 weeks off, I\'m scrambling. I can\'t afford to hire a temp AND hold the job. This will make me not hire young women.',
      },
      {
        persona: 'Fiscal conservative (Russell Blanchard, 56)',
        argument:
          'A national paid leave program costs $200 billion a year. Another entitlement we can\'t afford. Let employers offer it voluntarily.',
      },
      {
        persona: 'Childless worker (Diane Perkins, 38)',
        argument:
          'I don\'t have kids. Why should my payroll taxes fund other people\'s parental leave? I\'m subsidizing a lifestyle choice.',
      },
      {
        persona: 'Libertarian (Keith Summerfield, 42)',
        argument:
          'Paid leave should be negotiated between employers and employees. Government mandates reduce flexibility and impose one-size-fits-all solutions.',
      },
      {
        persona: 'Adoptive parent (Monica Torres, 39)',
        argument:
          'Most proposals focus on birth. Adoption, foster care, surrogacy — we get left out. "Family" leave needs to cover all families.',
      },
    ],
    evidence: [
      'California (since 2004): Increased leave-taking, no negative employment effects, improved child health',
      'International: Paid leave associated with lower infant mortality, higher breastfeeding, maternal employment',
      'Gender effects: Generous leave for fathers increases take-up and reduces gender gaps (Nordic evidence)',
      'Business impact: Studies show minimal negative effects on small businesses; retention benefits offset costs',
    ],
    endorsing_orgs: ['National Partnership for Women & Families', 'Paid Leave for All', 'Chamber of Commerce (some)'],
    opposing_orgs: ['National Federation of Independent Business', 'Some libertarian groups'],
    order: 4,
    icon: 'Baby',
  },
  {
    id: 'childcare-home-based',
    problemAreaId: 'childcare-family',
    title: 'Support Home-Based & Informal Care',
    summary:
      'Recognize and support informal caregivers — family members, neighbors, home-based providers — rather than focusing only on formal childcare centers.',
    mechanism: `• Pay family members as caregivers (grandparent subsidies)
• Licensing pathways for home-based providers (family childcare)
• Tax deductions for informal care
• Support networks and resources for home providers
• Recognize unpaid caregiving in social programs`,
    tradeoffs: {
      benefits: [
        'Respects family and cultural preferences',
        'Reaches rural areas where centers don\'t exist',
        'Often preferred by parents of infants',
        'Lower cost than center-based care',
        'Recognizes value of unpaid care work',
      ],
      costs: [
        'Quality and safety harder to monitor',
        'No formal curriculum or educational standards',
        'Isolation for providers (no peer support)',
        'Workforce is underpaid and unprotected',
        'May perpetuate gender inequality (women as caregivers)',
      ],
    },
    source: 'Some state programs; family childcare networks; military family care; international models (Norway)',
    voices_support: [
      {
        persona: 'Grandmother caregiver (Rosa Medina, 62)',
        argument:
          'I retired early to watch my grandkids so my daughter can work. It\'s a full-time job. A small payment would recognize what I do and help with my fixed income.',
      },
      {
        persona: 'Rural parent (Lisa Blackwell, 34)',
        argument:
          'The nearest daycare is 30 miles away. A family childcare home down the road is my only option. Support those providers, not just big centers.',
      },
      {
        persona: 'Parent of infant (Brooke Hanson, 28)',
        argument:
          'I don\'t want my 6-month-old in a center with 12 other babies. I want her with one caregiver who knows her. Why doesn\'t the system support what I want?',
      },
      {
        persona: 'Care economy advocate (Dr. Joyce Emmanuel, 53)',
        argument:
          'Caregiving is work. When we only pay formal providers, we devalue the millions of family members doing the same thing. That\'s economic injustice.',
      },
      {
        persona: 'Cultural preservation advocate (Gloria Navarro, 49)',
        argument:
          'In many communities, multigenerational care is the tradition. Supporting home-based care respects diverse family structures instead of imposing a one-size-fits-all model.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Child safety advocate (Patricia Greenwald, 47)',
        argument:
          'Unregulated home care is where abuse happens. Background checks, training, inspections — these exist for a reason. Paying anyone to watch kids without standards is dangerous.',
      },
      {
        persona: 'Early education researcher (Dr. Roger Underwood, 52)',
        argument:
          'Loving care isn\'t enough. Kids need language-rich environments, developmentally appropriate activities, trained educators. Home care often lacks these.',
      },
      {
        persona: 'Professional childcare worker (Keandra Simmons, 36)',
        argument:
          'I got a degree, passed tests, maintain a license. Now we\'re going to pay grandma the same to sit kids in front of a TV? That devalues professional early education.',
      },
      {
        persona: 'Feminist economist (Dr. Leah Finkelstein, 48)',
        argument:
          'Paying family members to provide care keeps women out of the workforce, reinforces traditional gender roles, and perpetuates the care economy as women\'s unpaid work.',
      },
      {
        persona: 'Quality-focused policymaker (Rep. Nancy Thornton, 55)',
        argument:
          'We can\'t monitor thousands of informal arrangements. How do you ensure quality? How do you prevent fraud? The accountability problems are massive.',
      },
    ],
    evidence: [
      'Norway: Pays parents to provide home care for first year; high maternal employment afterward',
      'Family childcare: Research shows quality varies widely; relationship quality high, educational quality varies',
      'Rural access: 60% of rural Americans live in "childcare deserts" where family care is the only option',
      'Workforce: Family childcare providers earn median $25K/year; high turnover',
    ],
    endorsing_orgs: ['All Our Kin', 'Home Grown', 'Some parent choice advocates'],
    opposing_orgs: ['Some early education advocates', 'Some quality-focused groups'],
    order: 5,
    icon: 'House',
  },
];
