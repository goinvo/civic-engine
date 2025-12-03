import { PolicyMethodology } from './index';

export const nationalServiceVoluntary: PolicyMethodology = {
  policyId: 'national-service-voluntary',
  policyName: 'National Service (Voluntary)',
  description: 'A voluntary national service program encouraging young adults to serve for one year (by age 25) in areas like disaster relief, education, conservation, and elder care. Participants receive incentives such as college tuition assistance or debt relief. The aim is to strengthen civic engagement, bridge cultural divides, and provide workforce training – all while remaining strictly voluntary (not a draft).',
  overallRationale: 'This policy has ~80% bipartisan support. It scores high on legibility (Downs: 0.9), exit/voice (Hirschman: 0.9), and sphere justice (Walzer: 0.9). The voluntary nature ensures strong consent while providing pathways for young people regardless of background. It strengthens civic engagement, bridges cultural divides, and provides workforce training.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'This policy does not rely on heavy central planning of economic outcomes. While it\'s federally funded, the actual service work is decentralized (local projects chosen by AmeriCorps, communities, etc.). It leverages local knowledge by placing volunteers in community projects, but there is some central coordination in funding and program structure. Overall, it moderately leans toward decentralization (using local organizations and signals) rather than top-down omniscience.',
      keyPoints: [
        'Federally funded but decentralized implementation',
        'Local projects chosen by communities',
        'Leverages local knowledge for service placement',
        'Moderate central coordination in funding/structure',
        'Leans toward decentralization over top-down control',
      ],
      sources: [
        'AmeriCorps program structure',
        'Voluntary service literature',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'The issue of civic engagement and national service has a national scope, and the program is appropriately federal in scale. It coordinates service across states and tackles nationwide needs (disaster response, national parks, education disparities) at a national level. This polycentric design (federal support with local project implementation) means decision power generally matches the problem scope well. There\'s a good balance of federal oversight with community-level execution, so the scale is well-matched.',
      keyPoints: [
        'Federal funding for national infrastructure',
        'Local nonprofits implement programs',
        'Communities identify service needs',
        'Polycentric design matches scope to governance level',
        'Good balance of federal oversight with community execution',
      ],
      sources: [
        'AmeriCorps partnership model',
        'Community service organization structure',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'The program is transparent and straightforward. The rules are easy to understand: "If you serve a year, then you get education benefits." Costs and benefits are clear and mostly above-board (federal funding in exchange for community work). There are minimal hidden complexities or fine print. This clarity ("If X then Y") makes the policy highly legible to citizens, who can easily grasp how to participate and what they gain.',
      keyPoints: [
        'Simple rule: serve a year, get education benefits',
        'Costs and benefits are clear and above-board',
        'Minimal hidden complexities or fine print',
        '"If X then Y" clarity for citizens',
        'Easy to understand participation and rewards',
      ],
      sources: [
        'AmeriCorps program marketing',
        'Service program participation data',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'A voluntary service program is somewhat robust to special-interest capture, but not completely immune. Because it offers universal opportunities (open to all young adults) and has broad support, it\'s less likely to be hijacked by a narrow interest group. However, there is some risk of bureaucratic or political influence – for example, powerful groups might lobby to steer service projects or funding toward certain regions or causes. The policy could include safeguards (universal eligibility, non-partisan oversight, periodic review) to improve robustness.',
      keyPoints: [
        '~80% bipartisan support provides political protection',
        'Universal eligibility reduces capture risk',
        'Some risk of bureaucratic/political influence',
        'Safeguards needed: non-partisan oversight, periodic review',
        'Moderately anti-capture with room for improvement',
      ],
      sources: [
        'Polling on national service',
        'Program participation demographics',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'The direct macroeconomic impact of this program is neutral. It isn\'t designed as a counter-cyclical economic stabilizer (like unemployment benefits), but in a downturn, having a national service option could mildly help by offering stipends or tuition benefits to young people when jobs are scarce. Conversely, it doesn\'t significantly amplify economic cycles either. Any stimulus effect (through stipends and later higher earnings due to training) is minor.',
      keyPoints: [
        'Not designed as counter-cyclical stabilizer',
        'Neutral direct macroeconomic impact',
        'Could mildly help in downturns via stipends',
        'Does not amplify economic cycles',
        'Any stimulus effect is minor',
      ],
      sources: [
        'Youth unemployment and service',
        'Counter-cyclical service expansion proposals',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'The policy empowers young individuals by giving them an opportunity (with benefits) that is not reliant on any boss or private authority. Participation is voluntary, so no one is coerced by the state or employers – they choose to serve and earn a reward, which can increase their independence (for example, reducing student debt = less domination by financial burdens or lenders). It doesn\'t create a new form of arbitrary power over participants; rather it can enhance their future freedom (education gives people more "exit options" in life).',
      keyPoints: [
        'Voluntary participation ensures no coercion',
        'Education benefits increase future independence',
        'Reducing debt means less financial domination',
        'No new arbitrary power over participants',
        'Enhances future freedom through education',
      ],
      sources: [
        'AmeriCorps living allowance',
        'Education benefit structure',
      ],
    },
    hirschman: {
      score: 0.9,
      reasoning: 'Exit is fully preserved – since service is not mandatory, everyone can choose not to participate (no one is "trapped" in national service). For those who do join, they typically serve for a limited term (e.g., one year) and can exit the program afterward or even leave early. Participants also have voice through feedback and civic engagement; alumni and members can advocate for program improvements. Moreover, the existence of this program gives young people an alternative path (exit option) compared to immediately entering college debt or low-paying jobs.',
      keyPoints: [
        'Exit fully preserved: completely voluntary',
        'Limited term service with ability to leave',
        'Voice through feedback and civic engagement',
        'Alternative path to college debt or low-wage jobs',
        'Strong agency: freely switch between paths',
      ],
      sources: [
        'Service program outcomes',
        'Civic engagement research',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'This policy is broadly voluntary and widely supported, meaning it largely avoids creating a group of clear "losers" who are coerced. Those who serve consent to doing so and are rewarded; those who don\'t serve aren\'t penalized. Taxpayers do fund it, but public support is high (~80% favor this voluntary service, across parties), indicating a kind of implicit consent/social contract for this spending. Unlike a draft (which would impose a big burden on a minority), a voluntary program spreads costs thinly and benefits many (both participants and communities).',
      keyPoints: [
        '~80% bipartisan support represents strong consensus',
        'Voluntary: only participants who choose to serve',
        'Those who don\'t serve aren\'t penalized',
        'Near Pareto-like improvement: most benefit, minimal losers',
        'Costs spread thinly, benefits broadly distributed',
      ],
      sources: [
        'Polling on national service',
        'Community impact studies',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'While not directly about de-commodifying essentials, the program does have a protective element. It offers tuition assistance and job training, which helps buffer young people from pure market pressures (e.g., the high cost of education is slightly de-commodified – you can earn it via service rather than buying it). It also treats civic engagement and community resilience as values beyond market logic, strengthening social bonds. However, it\'s not as strongly protective as guaranteeing housing or healthcare.',
      keyPoints: [
        'Tuition assistance buffers from market pressures',
        'Education earned via service, not purchased',
        'Civic engagement valued beyond market logic',
        'Strengthens social bonds',
        'Moderate protection from market burdens',
      ],
      sources: [
        'Non-market service value',
        'Alternative to market pathways',
      ],
    },
    rawls: {
      score: 0.7,
      reasoning: 'Many benefits flow to relatively disadvantaged groups. Young people who might not afford college or who lack job opportunities gain training, experience, and tuition help – this can especially help those from lower-income backgrounds. Communities in need (disaster-hit areas, under-resourced schools, etc.) get extra hands to improve conditions for the worst-off residents. It\'s not exclusively targeted to the poor, but it does increase opportunities for the less advantaged in practice. Thus, it leans toward maximin – improving the floor for those starting out with fewer resources.',
      keyPoints: [
        'Benefits flow to relatively disadvantaged groups',
        'Helps those who can\'t afford college',
        'Communities in need receive assistance',
        'Increases opportunities for less advantaged',
        'Leans toward maximin: improving the floor',
      ],
      sources: [
        'AmeriCorps participant demographics',
        'Educational mobility research',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'The policy is funded by general federal revenue, which likely includes taxes on labor and consumption rather than a tax on land or monopoly rents. It does not specifically target any unearned "rent" in the economic sense. It also doesn\'t introduce new taxes on work (beyond existing taxes) – it\'s an expenditure program. In terms of Henry George\'s ideal, this policy is roughly neutral. It doesn\'t capture land monopoly rents for public benefit, but it also isn\'t financed in a way that penalizes productive work uniquely.',
      keyPoints: [
        'Spending program, not rent-targeting',
        'General revenue funding',
        'Does not target land or monopoly rents',
        'Does not penalize productive work',
        'Neutral on rent-vs-labor taxation issue',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Barriers to entry are low – the program is open to all young Americans willing to serve, leveling the playing field by giving participants skills and education help regardless of their background. It breaks some cycles of exclusivity: for instance, those without connections or wealth can still advance via service. It doesn\'t protect incumbent elites; instead, it brings new people into public work and leadership opportunities. The high bipartisan support and focus on bridging divides also suggest it\'s building inclusive civic culture.',
      keyPoints: [
        'Low barriers to entry: open to all young Americans',
        'Levels playing field regardless of background',
        'Breaks cycles of exclusivity',
        'Brings new people into leadership opportunities',
        'Building inclusive civic culture',
      ],
      sources: [
        'Acemoglu - Human capital and institutions',
        'Service program accessibility',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'This program appropriately matches rewards to a civic virtue. People contribute labor and compassion to communities (a civic good) and in return receive education benefits or stipends (material support that society believes they\'ve earned). There\'s no sense of corrupt exchange (like buying political power with money, or money determining who can serve or benefit). The logic of one sphere (civic service) is matched with a fitting reward (education, which is itself opportunity-enhancing). Additionally, it reinforces the idea that certain goods (like community trust and experience) are not for sale but are earned through service.',
      keyPoints: [
        'Rewards appropriately matched to civic virtue',
        'Education earned through service, not purchased',
        'No corrupt exchange: money doesn\'t determine access',
        'Civic sphere matched with appropriate rewards',
        'Goods earned through service, not for sale',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Civic service and education access',
      ],
    },
  },
  modifiers: [
    {
      id: 'universal-option',
      name: 'Universal Service Option',
      description: 'Guarantee service slot for every young person who wants one',
      factorChanges: { acemoglu: 0.1, rawls: 0.1 },
    },
    {
      id: 'enhanced-benefits',
      name: 'Enhanced Education Benefits',
      description: 'Increase education benefits to full tuition equivalent',
      factorChanges: { rawls: 0.1, pettit: 0.1 },
    },
  ],
};
