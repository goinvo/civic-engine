/**
 * Healthcare Costs - Implementation Approaches
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const healthcareApproaches: ImplementationApproach[] = [
  {
    id: 'healthcare-single-payer',
    problemAreaId: 'healthcare-costs',
    title: 'Single-Payer / Medicare for All',
    summary:
      'Replace private insurance with a single government-run program covering everyone. Eliminate premiums, deductibles, and copays. Fund through taxes.',
    mechanism: `• Government becomes sole insurer (like Medicare, but for everyone)
• Private insurance eliminated for covered services
• Hospitals and doctors remain private but bill one payer
• Funded through progressive taxation (income, wealth, payroll)
• No out-of-pocket costs at point of service`,
    tradeoffs: {
      benefits: [
        'Universal coverage — no uninsured',
        'Eliminates premiums, deductibles, copays',
        'Massive administrative savings (one payer, one set of rules)',
        'Bargaining power to lower drug/procedure prices',
        'Delinks insurance from employment',
      ],
      costs: [
        'Eliminates private insurance industry (~500K jobs)',
        'Significant tax increases required',
        'Government controls what\'s covered',
        'Transition disruption (people lose current plans)',
        'Potential wait times for non-urgent care',
      ],
    },
    source: 'Medicare for All Act (Sanders/Jayapal); modeled on Canada, UK, Taiwan systems',
    voices_support: [
      {
        persona: 'Primary care physician (Dr. Anita Patel, 48)',
        argument:
          'I spend more time on billing than patients. My staff fights with 15 different insurers daily. One payer would let me practice medicine again.',
      },
      {
        persona: 'Cancer survivor (Linda Kowalski, 56)',
        argument:
          'I had insurance. I still owe $40,000. My neighbor in Canada had the same cancer — she owes nothing. We\'re not a poor country. Why do we accept this?',
      },
      {
        persona: 'Small business owner (Tom Brennan, 42)',
        argument:
          'I\'d love to hire more people, but healthcare costs $800/month per employee. Medicare for All would let me compete with big companies who self-insure.',
      },
      {
        persona: 'Economist (Dr. Kenji Yamamoto, 51)',
        argument:
          'We already spend more public money per capita than countries with universal care. We\'re paying for a universal system and getting a fragmented one.',
      },
      {
        persona: 'Union organizer (Darnell Washington, 44)',
        argument:
          'Our members give up wages every contract negotiating healthcare. Take it off the table and we can fight for what matters — pay, conditions, dignity.',
      },
      {
        persona: 'Political philosopher (Dr. Rebecca Stern, 59)',
        argument:
          'Healthcare is not a consumer good. When you\'re sick, you can\'t shop around. Markets fail for healthcare. This is what government is for.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Health insurance worker (Sharon Delgado, 51)',
        argument:
          'I\'ve worked here 22 years. This isn\'t just a job — it\'s my career, my pension, my community. Half a million people like me just... eliminated?',
      },
      {
        persona: 'Economist (Dr. William Hargrove, 55)',
        argument:
          'Single-payer eliminates price signals. Without competition, you get rationing, wait times, and no incentive for efficiency. Canada has nine-month waits for hip replacements.',
      },
      {
        persona: 'Taxpayer (Donna Fitzgerald, 47)',
        argument:
          'My employer pays most of my premium now. Under Medicare for All, I pay through taxes instead. The math doesn\'t work out better for me.',
      },
      {
        persona: 'Medical device innovator (Scott Lindquist, 43)',
        argument:
          'Price controls kill innovation. The US develops more new drugs than the rest of the world combined because there\'s profit in it. Eliminate that and we all lose.',
      },
      {
        persona: 'Libertarian (Greg Paulson, 39)',
        argument:
          'Government can\'t run the DMV well. You want them running all of healthcare? I should be able to buy whatever insurance I want — or none at all.',
      },
      {
        persona: 'Specialist physician (Dr. Raymond Torres, 58)',
        argument:
          'Medicare pays 80 cents on the dollar. If everyone\'s on Medicare rates, hospitals close, specialists retire. You\'ll have universal coverage and no one to see you.',
      },
    ],
    evidence: [
      'Administrative costs: US ~34% of healthcare spending; Canada ~17%',
      'Per-capita spending: US ~$13,000; Canada ~$5,500; similar outcomes',
      'Transition studies (PERI): Estimate net savings but acknowledge job displacement',
    ],
    endorsing_orgs: ['Physicians for a National Health Program', 'National Nurses United', 'Our Revolution'],
    opposing_orgs: ['America\'s Health Insurance Plans', 'US Chamber of Commerce', 'Heritage Foundation'],
    order: 1,
    icon: 'Hospital',
  },
  {
    id: 'healthcare-public-option',
    problemAreaId: 'healthcare-costs',
    title: 'Public Option',
    summary:
      'Create a government-run insurance plan that competes with private insurers. People can choose it or keep private coverage. Expand affordability subsidies.',
    mechanism: `• Government offers a plan (like Medicare) on ACA exchanges
• Anyone can buy in; Medicaid-eligible auto-enrolled
• Private insurers continue operating, must compete on price/quality
• Premiums subsidized based on income
• Employer coverage continues`,
    tradeoffs: {
      benefits: [
        'Expands coverage without eliminating private insurance',
        'Preserves choice (keep your plan if you like it)',
        'Creates competition that may lower prices',
        'Politically more feasible',
        'Gradual transition, less disruption',
      ],
      costs: [
        'Doesn\'t achieve universal coverage',
        'Private insurers may "cream-skim" healthy patients',
        'Government plan may be underfunded, offer limited networks',
        'Doesn\'t fully address administrative complexity',
        'Doesn\'t delink insurance from employment',
      ],
    },
    source: 'Biden campaign proposal; various congressional bills; builds on ACA structure',
    voices_support: [
      {
        persona: 'Moderate Democrat (Rep. Claire Weston, 54)',
        argument:
          'Medicare for All isn\'t passing. This is what we can actually do. Perfect is the enemy of good — let\'s cover more people now.',
      },
      {
        persona: 'Self-employed consultant (Rachel Okonkwo, 38)',
        argument:
          'I just want a decent option I can afford. If I can buy into Medicare, great. If private is better, I\'ll choose that. Give me options.',
      },
      {
        persona: 'Health policy researcher (Dr. Nina Gupta, 42)',
        argument:
          'The public option tests whether government can compete. If it\'s better, it\'ll grow. If private insurers are really more efficient, they\'ll win. Let the market decide.',
      },
      {
        persona: 'ACA navigator (Tamika Jefferson, 33)',
        argument:
          'The exchanges work for people who qualify for subsidies. A public option fills the gap for people who make too much for subsidies but can\'t afford full-price plans.',
      },
      {
        persona: 'Union member (Pete Kowalczyk, 49)',
        argument:
          'We fought hard for our health plan. Don\'t take it away. But a public option as backup? That makes sense — competition keeps everyone honest.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Progressive activist (Jasmine Holloway, 31)',
        argument:
          'The public option is a half-measure. It leaves the insurance industry in place, keeps the complexity, keeps the profit motive. Why compromise before the fight?',
      },
      {
        persona: 'Insurance executive (Richard Stafford, 57)',
        argument:
          'A government plan doesn\'t need to make a profit and can underprice us unfairly. It\'s not competition — it\'s a slow path to single-payer through the back door.',
      },
      {
        persona: 'Hospital administrator (Cynthia Reeves, 52)',
        argument:
          'If the public option pays Medicare rates, we lose money on every patient. We\'ll have to cost-shift to private insurance, raising premiums for everyone else.',
      },
      {
        persona: 'Free-market economist (Dr. Nathan Cole, 48)',
        argument:
          'Government competing with private business is inherently unfair. The government can run losses forever. This crowds out private innovation.',
      },
      {
        persona: 'Rural hospital CEO (Janet Mullins, 61)',
        argument:
          'We\'re already barely surviving on Medicare rates. More patients at those rates means we close. There\'s already no hospital for 30 miles in some areas.',
      },
      {
        persona: 'Conservative (Robert Tanner, 56)',
        argument:
          'The public option is designed to fail private insurance and lead to single-payer. It\'s a Trojan horse. If you want Medicare for All, say so.',
      },
    ],
    evidence: [
      'ACA marketplaces showed competition can lower premiums in some markets',
      'Medicare Advantage (private Medicare) suggests public-private competition is viable',
      'CBO estimates public option would cover 10-15 million more people',
    ],
    endorsing_orgs: ['Center for American Progress', 'Some moderate Democrats'],
    opposing_orgs: ['Progressive Democrats (too weak)', 'Insurance industry (too strong)'],
    order: 2,
    icon: 'Shield',
  },
  {
    id: 'healthcare-price-regulation',
    problemAreaId: 'healthcare-costs',
    title: 'Price Regulation / Drug Negotiation',
    summary:
      'Let government negotiate drug prices. Regulate prices for procedures, hospital stays, and medical devices. Cap out-of-pocket costs.',
    mechanism: `• Medicare negotiates directly with drug companies (currently prohibited)
• Reference pricing: tie US prices to international benchmarks
• All-payer rate setting: set standard prices everyone pays (like Maryland)
• Out-of-pocket caps for patients (insulin at $35/month, etc.)
• Surprise billing bans (already partially enacted)`,
    tradeoffs: {
      benefits: [
        'Directly addresses high prices without restructuring system',
        'Popular across party lines (especially drug negotiation)',
        'Works within existing public/private structure',
        'Immediate savings for patients and government',
        'Surprise billing bans protect patients',
      ],
      costs: [
        'Doesn\'t address coverage gaps',
        'Industry warns of reduced innovation investment',
        'Enforcement complexity (defining "fair" prices)',
        'May reduce access if prices set too low',
        'Doesn\'t simplify administrative complexity',
      ],
    },
    source: 'Inflation Reduction Act (partial drug negotiation); Maryland all-payer model; European reference pricing',
    voices_support: [
      {
        persona: 'Diabetic patient (Derek Simmons, 45)',
        argument:
          'Insulin costs $5 to make. I pay $300. The same vial costs $30 in Canada. This isn\'t a market — it\'s extortion because I\'ll die without it.',
      },
      {
        persona: 'Hospital CFO (Beverly Thornton, 54)',
        argument:
          'We have no idea what anything costs because every insurer pays different rates. All-payer would let us actually budget, plan, and reduce administrative overhead.',
      },
      {
        persona: 'Economist (Dr. Franklin Hobbs, 62)',
        argument:
          'Healthcare isn\'t a normal market — patients can\'t shop when they\'re in an ambulance. Price regulation is how every other country manages this.',
      },
      {
        persona: 'Fiscal conservative (Dennis Keller, 58)',
        argument:
          'Medicare is going bankrupt paying inflated prices. Negotiation isn\'t socialism — it\'s what any smart buyer does. Walmart negotiates. Why can\'t Medicare?',
      },
      {
        persona: 'Primary care doctor (Dr. Felicia Grant, 41)',
        argument:
          'I can\'t tell patients what things cost because I don\'t know. Price transparency would let me help patients make real choices.',
      },
      {
        persona: 'AARP lobbyist (Patricia Dunn, 63)',
        argument:
          'Seniors on fixed incomes choose between medications and food. Drug negotiation is common sense — 90% of Americans support it.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Pharmaceutical executive (Bradley Morrison, 53)',
        argument:
          'It costs $2 billion to develop a new drug. Most fail. High prices on successes fund the R&D for everything else. Cut prices, cut cures.',
      },
      {
        persona: 'Biotech investor (Victoria Ashford, 46)',
        argument:
          'I fund early-stage drug research. If the upside is capped by price controls, the investment math doesn\'t work. Capital will flow elsewhere.',
      },
      {
        persona: 'Free-market economist (Dr. Philip Eastman, 51)',
        argument:
          'Price controls create shortages. Always have, always will. You\'ll get lower prices and longer waits for drugs that exist, and fewer new drugs developed.',
      },
      {
        persona: 'Medical device startup founder (Raj Mehta, 38)',
        argument:
          'Reference pricing to Europe means we get European prices — which means European innovation levels. The US leads because we pay for it.',
      },
      {
        persona: 'Hospital executive (Katherine Forsythe, 49)',
        argument:
          'We compete on quality and price. All-payer removes our ability to compete. The hospital down the road has worse outcomes but would get the same rates.',
      },
      {
        persona: 'Libertarian (Dustin Mercer, 44)',
        argument:
          'Who decides what a \'fair\' price is? Government bureaucrats? This is central planning. Let buyers and sellers negotiate freely.',
      },
    ],
    evidence: [
      'VA (negotiates drug prices): pays 40% less than Medicare for same drugs',
      'Maryland (all-payer since 1970s): hospital cost growth slower than national average',
      'International comparison: US pays 2-3x more for same drugs as other developed nations',
    ],
    endorsing_orgs: ['AARP', 'Most Democrats', 'Some Republicans'],
    opposing_orgs: ['PhRMA', 'Biotech industry', 'Some free-market groups'],
    order: 3,
    icon: 'DollarSign',
  },
  {
    id: 'healthcare-market-reforms',
    problemAreaId: 'healthcare-costs',
    title: 'Market-Based Reforms',
    summary:
      'Increase competition, transparency, and consumer choice. Let people shop for care. Expand health savings accounts. Reduce regulations that limit competition.',
    mechanism: `• Price transparency (hospitals must post prices)
• Expand HSAs (tax-advantaged savings for medical expenses)
• Allow insurance sales across state lines
• Reduce certificate-of-need laws (let more providers enter market)
• Direct primary care (monthly fee, no insurance middleman)
• Short-term and association health plans (more options, fewer mandates)`,
    tradeoffs: {
      benefits: [
        'Empowers consumers with information and choice',
        'HSAs benefit those who can save',
        'Competition may drive innovation and efficiency',
        'Reduces government role',
        'Appeals to those who distrust government solutions',
      ],
      costs: [
        'Most people can\'t "shop" for emergency or complex care',
        'HSAs help wealthy more than poor (need money to save)',
        '"Skinny" plans may not cover serious illness',
        'Doesn\'t address pre-existing conditions without mandates',
        'Transparency alone hasn\'t lowered prices much so far',
      ],
    },
    source: 'Republican health proposals; Heritage Foundation; direct primary care movement; price transparency executive orders',
    voices_support: [
      {
        persona: 'Direct primary care physician (Dr. Allison Perrault, 39)',
        argument:
          'I charge $75/month. No insurance billing, no codes, no prior auth. I spend an hour with patients. This is what medicine should be.',
      },
      {
        persona: 'Healthy young person (Jake Emerson, 26)',
        argument:
          'I don\'t need a gold-plated plan. Let me buy catastrophic coverage cheap and put the rest in an HSA. Why is that illegal in most states?',
      },
      {
        persona: 'Libertarian economist (Dr. Howard Langford, 53)',
        argument:
          'Healthcare is expensive because it\'s the most regulated industry in America. Certificate-of-need laws literally make it illegal to open a new hospital. That\'s not a market.',
      },
      {
        persona: 'Small business owner (Gina Marchetti, 47)',
        argument:
          'Association health plans let small businesses band together to get big-company rates. Why did the government kill those? We were finally getting affordable options.',
      },
      {
        persona: 'Medical tourist (Sarah Hendricks, 52)',
        argument:
          'I got my hip replaced in Germany for $12,000. Same procedure here quoted at $50,000. Competition works — we just don\'t allow it in America.',
      },
      {
        persona: 'Health policy conservative (Kyle Sutherland, 45)',
        argument:
          'Every other market gets better and cheaper over time — phones, cars, TVs. Healthcare doesn\'t because it\'s not a real market. Fix that.',
      },
    ],
    voices_opposition: [
      {
        persona: 'ER physician (Dr. Carmen Rodriguez, 44)',
        argument:
          'No one comparison shops during a heart attack. Healthcare isn\'t like buying a TV. The \'consumer\' model fundamentally misunderstands what we do.',
      },
      {
        persona: 'Cancer patient (Evelyn Park, 61)',
        argument:
          'I have a $10,000 deductible HSA plan. Then I got cancer. Now I\'m bankrupt anyway. Cheap plans are fine until you actually get sick.',
      },
      {
        persona: 'Health policy researcher (Dr. Miriam Foster, 47)',
        argument:
          'We\'ve had price transparency rules for years. Prices haven\'t dropped. Information asymmetry is too great — patients can\'t evaluate quality.',
      },
      {
        persona: 'Progressive advocate (Tyrell Simmons, 36)',
        argument:
          'Market-based reforms help the healthy and wealthy. If you\'re sick or poor, you\'re not a profitable customer. The market will never serve you.',
      },
      {
        persona: 'Nurse (Brenda Atkins, 39)',
        argument:
          'Short-term plans don\'t cover pre-existing conditions, maternity, mental health. They\'re not real insurance. People buy them and discover they\'re unprotected.',
      },
      {
        persona: 'Health economist (Dr. Simon Blackwell, 56)',
        argument:
          'Healthcare markets have fundamental failures: asymmetric information, principal-agent problems, unpredictable need, inability to comparison shop in emergencies. Markets alone can\'t fix this.',
      },
    ],
    evidence: [
      'Price transparency: Limited impact so far; most patients don\'t shop even with information',
      'Direct primary care: High patient satisfaction, but serves small fraction of population',
      'HSAs: Benefit higher earners more; 80% of HSA assets held by top income quintile',
      'International: No developed nation relies primarily on market-based healthcare',
    ],
    endorsing_orgs: ['Heritage Foundation', 'Cato Institute', 'Republican Party'],
    opposing_orgs: ['Families USA', 'Most Democrats', 'Consumer advocacy groups'],
    order: 4,
    icon: 'Store',
  },
  {
    id: 'healthcare-strengthen-aca',
    problemAreaId: 'healthcare-costs',
    title: 'Strengthen and Expand the ACA',
    summary:
      'Build on what exists. Expand subsidies, close coverage gaps, add enforcement, and incrementally improve the Affordable Care Act.',
    mechanism: `• Increase premium subsidies (already done temporarily in 2021)
• Close Medicaid gap in non-expansion states
• Strengthen enforcement of ACA provisions
• Auto-enroll uninsured into coverage
• Improve navigator programs and outreach
• Reduce complexity of enrollment`,
    tradeoffs: {
      benefits: [
        'Builds on existing infrastructure',
        'Minimally disruptive',
        'Politically achievable (already law)',
        'Proven to reduce uninsured rate',
        'Protects pre-existing conditions',
      ],
      costs: [
        'Preserves system that many find inadequate',
        'Doesn\'t address fundamental cost drivers',
        'Depends on ongoing political will and funding',
        'Still leaves millions uninsured and underinsured',
        'Administrative complexity remains',
      ],
    },
    source: 'ACA enhancement bills; Biden administration executive actions; state-level ACA improvements',
    voices_support: [
      {
        persona: 'ACA marketplace user (Jessica Navarro, 34)',
        argument:
          'I have a pre-existing condition. Before the ACA, no one would insure me. The system isn\'t perfect, but it\'s why I have coverage. Protect and improve it.',
      },
      {
        persona: 'Pragmatic Democrat (Sen. Ellen Whitfield, 58)',
        argument:
          'We spent a decade getting the ACA passed and surviving repeal attempts. It\'s the foundation. Build on it rather than starting over with something that won\'t pass.',
      },
      {
        persona: 'State health official (Dr. Harold Pemberton, 52)',
        argument:
          'The ACA framework lets states innovate. Colorado, Maryland, Nevada — we\'re experimenting with state options. Don\'t blow up the lab.',
      },
      {
        persona: 'Health policy incrementalist (Dr. Caroline Nesbitt, 44)',
        argument:
          'Coverage expanded from 82% to 92% under the ACA. Medicaid expansion in remaining states would cover millions more. Finish what we started.',
      },
      {
        persona: 'Community health center administrator (Lorenzo Vega, 49)',
        argument:
          'Our funding comes through the ACA. Our patients — working poor, uninsured — depend on it. Revolutionary change risks everything we\'ve built.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Medicare for All advocate (Naomi Sutton, 33)',
        argument:
          'The ACA left 30 million uninsured and millions more underinsured. \'Strengthening\' a broken system keeps the insurance companies in charge. It\'s not bold enough.',
      },
      {
        persona: 'Conservative (Barry Hutchins, 54)',
        argument:
          'The ACA created mandates, regulations, and costs that drove up premiums. Doubling down makes it worse. Repeal and replace with real reform.',
      },
      {
        persona: 'Uninsured worker (Miguel Estrada, 29)',
        argument:
          'I make too much for Medicaid, too little for subsidies to make premiums affordable. The ACA doesn\'t help people in my situation.',
      },
      {
        persona: 'Self-employed person (Brittany Lawson, 37)',
        argument:
          'ACA plans have $8,000 deductibles. I\'m \'insured\' but can\'t afford to use it. This isn\'t real coverage — it\'s catastrophic with a fancy name.',
      },
      {
        persona: 'Healthcare systems thinker (Dr. Owen Gallagher, 61)',
        argument:
          'The ACA is a Rube Goldberg machine — subsidies, mandates, exchanges, Medicaid expansion — all to avoid the simple solution. Complexity is the problem.',
      },
      {
        persona: 'Libertarian (Trevor Wilkins, 41)',
        argument:
          'The individual mandate was unconstitutional government overreach. The ACA raised my premiums and limited my choices. Strengthening it means more of the same.',
      },
    ],
    evidence: [
      'Uninsured rate dropped from 18% (2010) to 8% (2022) following ACA',
      'Medicaid expansion states: lower uninsured rates, better health outcomes, rural hospital survival',
      'Premium subsidy increases (2021): enrollment increased, premiums effectively lowered',
    ],
    endorsing_orgs: ['Biden Administration', 'Protect Our Care', 'American Medical Association'],
    opposing_orgs: ['Heritage Foundation', 'Some progressive groups', 'Republican Party'],
    order: 5,
    icon: 'FileCheck',
  },
];
