/**
 * Housing Affordability - Implementation Approaches
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const housingApproaches: ImplementationApproach[] = [
  {
    id: 'housing-rent-stabilization',
    problemAreaId: 'housing-affordability',
    title: 'Rent Stabilization',
    summary:
      'Limit how much landlords can raise rent each year, protecting current tenants from rapid price increases.',
    mechanism: `• Cap annual rent increases (typically 3-8% or tied to inflation)
• Apply to buildings over a certain age or size
• Tenants can stay at predictable costs; resets to market rate when they leave`,
    tradeoffs: {
      benefits: [
        'Protects current tenants from displacement',
        'Provides stability for families, seniors, low-income renters',
        'Keeps communities intact',
        'Immediate relief without government spending',
      ],
      costs: [
        'May reduce housing supply if developers avoid building rental units',
        'Landlords may reduce maintenance spending',
        'Benefits existing tenants, not people seeking housing',
        'Can create mismatch (large apartments held by empty-nesters)',
      ],
    },
    source: 'Various state/local laws (NY, CA, OR); federal proposals modeled on existing programs',
    voices_support: [
      {
        persona: 'Renter (Maria Sandoval, 34, nurse)',
        argument:
          'My landlord raised rent 20% in one year. I\'d been there six years. Rent control would have let me stay in my community near work instead of commuting 90 minutes.',
      },
      {
        persona: 'Community organizer (Dwayne Mitchell, 41)',
        argument:
          'When longtime residents get priced out, neighborhoods lose their soul. The bodega owner, the church ladies, the guy who knows everyone — they\'re the community. Stability matters.',
      },
      {
        persona: 'Political philosopher (Dr. Helen Castillo, 55)',
        argument:
          'Housing is not a luxury good — it\'s a precondition for participating in society. The market\'s \'efficiency\' means nothing if it produces mass displacement.',
      },
      {
        persona: 'Social worker (Janelle Burton, 38)',
        argument:
          'Every eviction I see cascades — kids change schools, parents lose jobs, mental health deteriorates. Keeping people housed is prevention, not charity.',
      },
      {
        persona: 'Labor union rep (Victor Hernandez, 52)',
        argument:
          'Our members can\'t fight for better wages if they\'re one rent hike from homelessness. Housing stability is worker power.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Economist (Dr. Priscilla Hammond, 49)',
        argument:
          'The evidence is clear: rent control reduces housing supply long-term. You\'re helping today\'s tenants at the expense of tomorrow\'s. It\'s a transfer from future renters to current ones.',
      },
      {
        persona: 'Small landlord (James Novak, 58)',
        argument:
          'I\'m not a corporation. I have a mortgage, property taxes, maintenance costs. If I can\'t raise rent with costs, I\'ll sell to a developer who\'ll tear it down.',
      },
      {
        persona: 'Urban planner (Wayne Caldwell, 44)',
        argument:
          'Rent control treats symptoms, not causes. It doesn\'t create a single new unit. Meanwhile, developers avoid building rentals entirely — they go condo instead.',
      },
      {
        persona: 'Young renter seeking housing (Courtney Price, 27)',
        argument:
          'Great for people who already have apartments. But I\'ve been searching for six months. No one\'s moving, nothing\'s available, and what\'s listed is insanely expensive.',
      },
      {
        persona: 'Housing developer (Frank Moreno, 51)',
        argument:
          'Why would I build rental housing in a rent-controlled city? The math doesn\'t work. I\'ll build condos, or build somewhere else entirely.',
      },
    ],
    evidence: [
      'Stanford study (Diamond et al. 2019): SF rent control reduced tenant displacement by 15%, but also reduced rental housing supply by 15%',
      'Mixed evidence overall: protects individuals, may worsen aggregate shortage',
    ],
    endorsing_orgs: ['National Housing Law Project', 'ACCE Action', 'Tenant unions'],
    opposing_orgs: ['National Apartment Association', 'Cato Institute', 'National Association of Realtors'],
    order: 1,
    icon: 'Building2',
  },
  {
    id: 'housing-zoning-reform',
    problemAreaId: 'housing-affordability',
    title: 'Zoning Reform / Build More Housing',
    summary:
      'Reduce regulatory barriers to building housing, especially near jobs and transit. Allow denser construction (apartments, duplexes, ADUs) in more areas.',
    mechanism: `• Eliminate single-family-only zoning
• Reduce parking minimums
• Streamline permitting / approval processes
• Allow accessory dwelling units (ADUs) by right
• Upzone transit corridors and job centers`,
    tradeoffs: {
      benefits: [
        'Increases housing supply, which reduces prices over time',
        'Creates construction jobs',
        'No direct government spending required',
        'Addresses root cause (scarcity)',
      ],
      costs: [
        'New construction may take years to affect prices',
        'Can change neighborhood character',
        'New units often market-rate, not affordable',
        'Existing homeowners may oppose (property values, traffic)',
      ],
    },
    source: 'YIMBY movement; Minneapolis 2040 plan; Oregon HB 2001; CA SB 9/10; bipartisan state-level reforms',
    voices_support: [
      {
        persona: 'Economist (Dr. Lauren Ng, 46)',
        argument:
          'This is Econ 101. Restrict supply, prices rise. We\'ve made it illegal to build housing where people want to live. Of course it\'s expensive.',
      },
      {
        persona: 'Young professional (Alex Brennan, 28)',
        argument:
          'I make good money but can\'t afford to live near my job. My commute is two hours. Just let someone build an apartment building — I\'ll pay market rate, happily.',
      },
      {
        persona: 'Environmentalist (Shannon Reilly, 35)',
        argument:
          'Single-family sprawl is an ecological disaster — longer commutes, more emissions, habitat destruction. Dense housing near transit is green housing.',
      },
      {
        persona: 'Libertarian philosopher (Dr. Gordon Burke, 52)',
        argument:
          'Property owners should be able to build what they want on their land. Zoning is government telling you what you can\'t do with property you own.',
      },
      {
        persona: 'Construction worker (Mike Delvecchio, 45)',
        argument:
          'More building means more work for my crew. And maybe my kids could actually afford to live in the town they grew up in.',
      },
      {
        persona: 'Civil rights advocate (Alicia Washington, 43)',
        argument:
          'Single-family zoning was designed to exclude. It\'s the polite version of redlining. Reform is a racial justice issue.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Longtime homeowner (Patricia Lindgren, 67)',
        argument:
          'I moved here for the neighborhood — quiet streets, yards, good schools. Now they want to put apartment buildings next door? I have a right to protect what I invested in.',
      },
      {
        persona: 'Historic preservationist (Hugh Bancroft, 59)',
        argument:
          'These neighborhoods have architectural character worth protecting. Once you allow tear-downs for density, the history is gone forever.',
      },
      {
        persona: 'Progressive housing advocate (Candace Griffin, 38)',
        argument:
          'New market-rate housing doesn\'t help poor people — it helps developers. Without affordability requirements, upzoning is just gentrification with extra steps.',
      },
      {
        persona: 'Traffic engineer (Douglas Kim, 47)',
        argument:
          'Our infrastructure — roads, sewers, schools — was built for a certain density. You can\'t just triple the population without massive public investment.',
      },
      {
        persona: 'Small-town mayor (Russell Hensley, 54)',
        argument:
          'Our residents chose this community because it\'s not a city. Forcing urban density on suburban and rural areas isn\'t democracy, it\'s state overreach.',
      },
    ],
    evidence: [
      'Tokyo (permissive zoning): Housing costs remained stable despite population growth',
      'Minneapolis (eliminated single-family zoning): Early data shows modest supply increase',
      'Broad economist consensus that supply constraints drive prices',
    ],
    endorsing_orgs: ['YIMBY Action', 'Brookings Institution', 'Bipartisan state legislators'],
    opposing_orgs: ['Some neighborhood associations', 'Historic preservation groups'],
    order: 2,
    icon: 'Building',
  },
  {
    id: 'housing-public-social',
    problemAreaId: 'housing-affordability',
    title: 'Public/Social Housing',
    summary:
      'Government directly builds, owns, or finances housing that remains permanently affordable, not subject to market fluctuations.',
    mechanism: `• Expand public housing construction (federal/state/local)
• Social housing models (mixed-income, self-financing)
• Community land trusts (public owns land, residents own buildings)
• Significant capital investment required upfront`,
    tradeoffs: {
      benefits: [
        'Permanently affordable (not temporary subsidy)',
        'Decommodifies housing for residents',
        'Can be mixed-income, avoiding concentrated poverty',
        'Long-term cost savings vs. ongoing subsidies',
      ],
      costs: [
        'High upfront public investment',
        'Historical stigma from poorly-maintained projects',
        'Government capacity/competence concerns',
        'Long timeline to build at scale',
      ],
    },
    source: 'Vienna social housing model; Montgomery County MD HOC; NYC NYCHA (cautionary); federal proposals (Homes Act)',
    voices_support: [
      {
        persona: 'Political philosopher (Dr. Esther Johannsen, 58)',
        argument:
          'Housing is too important to leave to markets that treat it as a speculative asset. Vienna has proven that public housing can be high-quality, mixed-income, and permanent.',
      },
      {
        persona: 'Public housing resident (Denise Crawford, 52)',
        argument:
          'I\'ve lived in Montgomery County public housing for 15 years. It\'s well-maintained, my neighbors are teachers and nurses, and I\'m not one rent hike from the street.',
      },
      {
        persona: 'Affordable housing developer (Manny Trujillo, 47)',
        argument:
          'The math on affordable housing doesn\'t work without subsidy. Social housing removes the profit requirement entirely — that\'s the only way to serve people at the bottom.',
      },
      {
        persona: 'Urbanist (Clara Svensson, 39)',
        argument:
          'Every unit of social housing is a unit permanently removed from speculation. In 50 years, it\'ll still be affordable. No tax credit project can say that.',
      },
      {
        persona: 'Construction union leader (Bobby Flanagan, 54)',
        argument:
          'Public housing means union jobs building something that serves the public. That\'s the kind of work my members want to do.',
      },
      {
        persona: 'Fiscal analyst (Teresa Nakamura, 46)',
        argument:
          'We spend billions on vouchers every year, forever. Social housing has high upfront costs but pays for itself over decades. It\'s the fiscally responsible choice.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Fiscal conservative (Mitchell Greer, 57)',
        argument:
          'We\'re talking about hundreds of billions in capital costs. Government already can\'t maintain the public housing it has. This is a fantasy.',
      },
      {
        persona: 'Economist (Dr. Steven Rockford, 53)',
        argument:
          'Government is terrible at being a landlord. Pruitt-Igoe, Cabrini-Green — the history is clear. Private management with public subsidy works better.',
      },
      {
        persona: 'Real estate developer (Vivian Chow, 49)',
        argument:
          'Government competing with private housing distorts the entire market. If public housing is subsidized, how can private builders compete?',
      },
      {
        persona: 'Taxpayer (Kenneth Olson, 61)',
        argument:
          'Why should my taxes build housing in cities? I solved my housing problem by moving somewhere affordable. Others can do the same.',
      },
      {
        persona: 'Libertarian (Owen Blackwood, 41)',
        argument:
          'Government has no business owning housing. This is a massive expansion of state power into people\'s private lives.',
      },
      {
        persona: 'Former public housing resident (Latrice Simmons, 44)',
        argument:
          'I grew up in the projects. Don\'t romanticize it. Concentrated poverty, deferred maintenance, bureaucratic indifference. I got out as fast as I could.',
      },
    ],
    evidence: [
      'Vienna: 60% of residents in subsidized housing; high quality, mixed-income',
      'Singapore: 80% in public housing; different governance context',
      'US history mixed: some successful (NYC Mitchell-Lama), some failures (high-rise projects)',
    ],
    endorsing_orgs: ['National Housing Trust', 'People\'s Action', 'Social housing advocates'],
    opposing_orgs: ['Heritage Foundation', 'Real estate industry groups'],
    order: 3,
    icon: 'Landmark',
  },
  {
    id: 'housing-vouchers',
    problemAreaId: 'housing-affordability',
    title: 'Rental Assistance / Vouchers',
    summary:
      'Government subsidizes rent payments directly, helping low-income families afford market-rate housing.',
    mechanism: `• Section 8 / Housing Choice Vouchers
• Tenant pays 30% of income; voucher covers the rest (up to a limit)
• Tenant can choose where to live (in theory)
• Administered by local housing authorities`,
    tradeoffs: {
      benefits: [
        'Immediate relief for recipients',
        'Portable — recipient chooses location',
        'Integrates low-income families into various neighborhoods',
        'Leverages existing housing stock',
      ],
      costs: [
        'Doesn\'t increase housing supply',
        'Long waiting lists (often 2-10 years)',
        'Some landlords refuse to accept vouchers',
        'Can inflate rents if supply is constrained',
      ],
    },
    source: 'HUD Housing Choice Voucher program; state/local rental assistance programs',
    voices_support: [
      {
        persona: 'Policy researcher (Dr. Joanna Whitmore, 44)',
        argument:
          'Vouchers are the most evidence-backed housing intervention we have. Moving to Opportunity showed children\'s lives transformed by access to better neighborhoods. This works.',
      },
      {
        persona: 'Voucher recipient (Tanya Dickerson, 41)',
        argument:
          'My voucher let me move my kids to a neighborhood with good schools. They\'re thriving now. That wouldn\'t have happened if we were stuck where we were.',
      },
      {
        persona: 'Economist (Dr. Craig Finley, 52)',
        argument:
          'Vouchers let the market work while targeting help to those who need it. No government construction, no management overhead — just direct assistance.',
      },
      {
        persona: 'Anti-poverty advocate (Rochelle Patterson, 39)',
        argument:
          'Most eligible families get nothing because the program is underfunded. The solution isn\'t a different program — it\'s funding the one that works.',
      },
      {
        persona: 'Moderate politician (Rep. Dale Hendricks, 51)',
        argument:
          'This is a market-based solution that helps poor families. It\'s the rare policy both parties can support — we just need the political will to fund it.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Fiscal conservative (Warren Ashby, 59)',
        argument:
          'It\'s a permanent spending commitment with no end in sight. We\'ll be paying landlords\' mortgages with taxpayer money forever.',
      },
      {
        persona: 'Voucher holder frustrated (Derek Tillman, 38)',
        argument:
          'I have a voucher. You know how many landlords accept it? Almost none. It\'s been eight months. A voucher isn\'t housing — it\'s a piece of paper.',
      },
      {
        persona: 'Supply-side advocate (Graham Elliot, 45)',
        argument:
          'Vouchers don\'t create a single unit of housing. In a supply-constrained market, you\'re just bidding up prices for everyone else.',
      },
      {
        persona: 'Housing activist (Yolanda Baptiste, 36)',
        argument:
          'Vouchers enrich landlords while keeping tenants insecure. The landlord can refuse to renew, can sell, can decide vouchers are too much hassle. It\'s not stability.',
      },
      {
        persona: 'Landlord (Stuart Neumann, 55)',
        argument:
          'The inspection requirements, the paperwork, the payment delays — it\'s a nightmare. I lost money every month I had a Section 8 tenant. Never again.',
      },
      {
        persona: 'Progressive (Darcy Holbrook, 33)',
        argument:
          'Why are we paying private landlords to house poor people? For the same money, we could build housing that stays affordable forever.',
      },
    ],
    evidence: [
      'Moving to Opportunity study: Vouchers enabling moves to lower-poverty areas improved children\'s long-term outcomes',
      'Strong evidence vouchers reduce homelessness and housing instability',
      'Chronic underfunding means only 1 in 4 eligible households receives assistance',
    ],
    endorsing_orgs: ['Center on Budget and Policy Priorities', 'National Low Income Housing Coalition'],
    opposing_orgs: ['Some fiscal conservatives', 'Some progressive housing advocates (prefer public housing)'],
    order: 4,
    icon: 'Ticket',
  },
  {
    id: 'housing-first-time-buyer',
    problemAreaId: 'housing-affordability',
    title: 'First-Time Buyer Assistance',
    summary:
      'Help people buy homes through down payment assistance, tax credits, or subsidized mortgages — building wealth through ownership.',
    mechanism: `• Down payment assistance grants or loans
• First-time homebuyer tax credits
• Below-market mortgage rates for qualified buyers
• Shared equity programs (public entity co-invests)`,
    tradeoffs: {
      benefits: [
        'Builds household wealth',
        'Path to stability and community investment',
        'Addresses racial wealth gap (homeownership disparity)',
        'Popular across political spectrum',
      ],
      costs: [
        'Can increase demand, raising prices further',
        'Doesn\'t help renters who can\'t/won\'t buy',
        'Benefits those already close to buying',
        'Subsidizes asset that may not appreciate',
      ],
    },
    source: 'FHA programs; state housing finance agencies; Biden First-Time Homebuyer Credit proposal',
    voices_support: [
      {
        persona: 'First-generation buyer (Rosa Almonte, 29)',
        argument:
          'My parents rented their whole lives. They have nothing. The down payment assistance program is my shot at building something for my kids.',
      },
      {
        persona: 'Civil rights advocate (Terrence Byrd, 47)',
        argument:
          'The Black-white wealth gap is largely a homeownership gap — caused by redlining, denied loans, stolen property. Down payment assistance is reparative.',
      },
      {
        persona: 'Real estate agent (Carolyn Webb, 43)',
        argument:
          'Homeownership is how middle-class families build wealth. It\'s the American dream. We should help more people access it, not fewer.',
      },
      {
        persona: 'Financial advisor (Raymond Liu, 51)',
        argument:
          'A mortgage is forced savings. Renters pay someone else\'s mortgage. Even if home values were flat, owners build equity. Renters don\'t.',
      },
      {
        persona: 'Suburban parent (Leslie Kowalski, 48)',
        argument:
          'I want my kids to be able to buy a house someday. If they need help with a down payment, that\'s not a handout — it\'s giving them the same shot I had.',
      },
      {
        persona: 'Community banker (Earl Hutchinson, 56)',
        argument:
          'These programs bring qualified buyers to the table who just need help with the down payment. It\'s good for families, good for neighborhoods, good for lending.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Economist (Dr. Meredith Stanton, 49)',
        argument:
          'Subsidizing demand when supply is constrained just raises prices. Every dollar in down payment assistance gets capitalized into higher home values. You\'re subsidizing sellers.',
      },
      {
        persona: 'Renter by choice (Sam Petrosky, 35)',
        argument:
          'Why does the government subsidize owning but not renting? I don\'t want to own — I want flexibility. But my taxes subsidize other people\'s mortgages.',
      },
      {
        persona: 'Urbanist (Elaine Dumont, 38)',
        argument:
          'Homeownership subsidies encourage sprawl, car dependency, and resistance to new housing. Owners become NIMBYs. It\'s bad for cities.',
      },
      {
        persona: 'Millennial renter (Jaylen Foster, 31)',
        argument:
          'A $10K down payment credit doesn\'t help me. Homes cost $600K here. This helps people who are already almost there — not people like me.',
      },
      {
        persona: 'Fiscal analyst (Norton Bradley, 54)',
        argument:
          'Between the mortgage interest deduction, capital gains exclusion, and these programs, we spend hundreds of billions subsidizing homeownership. Who benefits? Mostly the upper-middle class.',
      },
      {
        persona: 'Progressive housing advocate (Simone Hartwell, 35)',
        argument:
          'Homeownership isn\'t wealth-building if you buy at the peak and the market crashes. Ask anyone who bought in 2006. We\'re pushing people into a risky asset.',
      },
    ],
    evidence: [
      'Mixed: Subsidies can increase prices if supply constrained',
      'FHA historically important for middle-class wealth building',
      'Effectiveness depends heavily on local supply conditions',
    ],
    endorsing_orgs: ['National Association of Realtors', 'Urban League', 'Habitat for Humanity'],
    opposing_orgs: ['Some economists', 'Some urbanists and YIMBY advocates'],
    order: 5,
    icon: 'Key',
  },
];
