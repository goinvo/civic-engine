import { PolicyMethodology } from './index';

export const mentalHealthLifeline988: PolicyMethodology = {
  policyId: 'mental-health-lifeline-988',
  policyName: '988 Mental Health Lifeline',
  description: 'Ensure long-term funding and specialized access (e.g., a "Press 3" option for LGBTQ+ youth) for the 988 Suicide & Crisis Lifeline network. Federal policy in healthcare/mental health with ~64% public support.',
  overallRationale: '988 Mental Health Lifeline strongly advances moral and inclusive aims (high Walzer: 1.0, Polanyi: 0.9) and is well-designed to fit local/national structures (high Ostrom: 1.0), with its main hurdle being ensuring broad political consensus (moderate Buchanan: 0.7). The policy treats mental health crisis support as a public good accessible to all.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'The 988 system is designed with decentralized knowledge in mind: while it\'s a national number, calls are routed to local call centers based on the caller\'s location (geo-routing), leveraging local crisis counselors who know the community resources. This means the solution isn\'t a giant centralized call hub trying to manage every crisis from afar; it\'s a network of independent centers coordinated under a national umbrella. The policy doesn\'t require omniscient planning—each local center handles calls with contextual awareness. The central aspect is funding and the number itself, but the operation is quite distributed.',
      keyPoints: [
        'National number with geo-routing to local centers',
        'Network of independent centers under national umbrella',
        'Local counselors leverage community resources',
        'Each local center handles calls with contextual awareness',
        'Central funding and number, distributed operation',
      ],
      sources: [
        '988 Lifeline network structure',
        'Crisis center coordination models',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'This is a strong example of polycentric governance matching scale. Mental health crises are a national issue in aggregate (warranting a national hotline easy to remember), but each crisis is inherently local (the person needs nearby services or mobile teams). The 988 framework smartly combines those scales: a federal number and funding ensure a baseline service everywhere, while local call centers and responders address the issue on the ground. The policy explicitly fixes a previous scale mismatch (old 1-800 crisis lines often routed calls out of state by area code). By geo-locating calls, it matches each caller to their community resources.',
      keyPoints: [
        'Strong example of polycentric governance matching scale',
        'National issue in aggregate, local in each crisis',
        'Federal number and funding, local centers and responders',
        'Fixes previous scale mismatch of old crisis lines',
        'Geo-locating calls matches callers to community resources',
      ],
      sources: [
        '988 governance structure',
        'Polycentric crisis response',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'The concept is very easy to grasp: "Dial 9-8-8 for mental health emergencies." As a policy, funding 988 is straightforward – similar to how 911 is funded with a small fee or grant, which people generally understand and accept. There\'s nothing convoluted about using the service: it\'s free, 24/7, and the public message is clear about what it does (suicide prevention and crisis counseling). Even the specialized access (like "press 3 for LGBTQ youth") is a simple user interface tweak, not a complex rule.',
      keyPoints: [
        'Very easy to grasp: dial 988 for mental health emergencies',
        'Funding straightforward like 911',
        'Free, 24/7, clear public message',
        'Specialized access is simple UI tweak',
        'Highly transparent and user-friendly',
      ],
      sources: [
        '988 public awareness campaigns',
        'Emergency number recognition studies',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'The 988 lifeline doesn\'t present obvious opportunities for special-interest capture – it\'s a public good funded in a general way. There is no narrow industry that can hijack it for profit, since it\'s largely run by nonprofits and government-funded call centers. The main risk might be political/ideological: debates over specialized services like the LGBTQ+ youth line could be influenced by groups for or against such tailoring. Funding could also be a point of contention. The policy can be designed with safeguards (dedicated funding streams, standards for call centers) that make it hard to subvert. The variance in partisan support suggests some ideological capture risk, but overall it\'s relatively robust.',
      keyPoints: [
        'No obvious opportunities for special-interest capture',
        'Public good funded in general way',
        'Largely run by nonprofits and government-funded centers',
        'Main risk is political/ideological debates',
        'Variance in partisan support suggests some capture risk',
      ],
      sources: [
        '988 funding mechanisms',
        'SAMHSA oversight structure',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'The 988 lifeline is a social infrastructure policy, not an economic stimulus or stabilizer. It doesn\'t fluctuate with the business cycle or provide counter-cyclical spending (aside from creating some jobs in mental health services, which is relatively small scale). Its funding via fees is steady in good times and bad. Thus, it\'s essentially neutral on macroeconomic stability – it won\'t exacerbate downturns or booms, aside from possibly reducing some long-term social costs of crises.',
      keyPoints: [
        'Social infrastructure policy, not economic stabilizer',
        'Doesn\'t fluctuate with business cycle',
        'Funding steady in good times and bad',
        'Neutral on macroeconomic stability',
        'May reduce long-term social costs',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The 988 lifeline enhances individual freedom from domination in a subtle but important way. In a crisis, a person often relies on whatever authority shows up – before 988, that might have been the police by default for lack of alternatives. Now, individuals can access help without immediately involving coercive authorities. This reduces one\'s dependence on possibly "arbitrary power" (like an armed officer who might detain someone in distress). By connecting callers to compassionate care and deploying mobile crisis teams instead of police when possible, it protects people from potentially being controlled or harmed when they are vulnerable.',
      keyPoints: [
        'Enhances freedom from domination',
        'Access help without involving police',
        'Reduces dependence on arbitrary power',
        'Connects to compassionate care',
        'Protects vulnerable people from potential harm',
      ],
      sources: [
        '988 and police diversion',
        'Crisis response alternatives',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: '988 creates a crucial exit option for people in crisis. Before, the main choice for someone suicidal or in a mental health emergency was limited to calling 911 (with the risk of police involvement) or not getting help at all. Now they can exit the traditional emergency system and get specialized help. This alternative is life-changing – as one statistic shows, 86% of adults believe a mental health crisis should receive a mental health response, not a police response. In terms of voice, the existence of specialized options (like the LGBTQ+ youth line) is a result of advocacy by those communities.',
      keyPoints: [
        'Creates crucial exit option for people in crisis',
        'Alternative to 911/police involvement',
        '86% believe mental health crises need mental health response',
        'Specialized options result from community advocacy',
        'Significantly increases agency in getting help',
      ],
      sources: [
        'Mental health crisis response preferences',
        'Community advocacy for 988 features',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: 'This policy is broadly beneficial and does not coerce a segment of society to shoulder unfair costs, aligning reasonably well with consent. The funding mechanism (modest telecom fees or general budget funds) is diffuse and similar to how 911 is accepted – most people don\'t feel extorted by a small fee that supports lifesaving services. Polls show a majority of Americans (including many across party lines) agree that mental health crisis response should be a priority, indicating implicit consent to allocate resources here. While Republican support is lower (around 50%), that still means half of conservatives see value in it. No specific group is a "loser" here: those who need help get help; taxpayers pay a bit, but arguably everyone gains from a safer, healthier society.',
      keyPoints: [
        'Broadly beneficial, no unfair cost burden',
        'Funding mechanism diffuse like 911 fees',
        'Majority agree mental health crisis response is priority',
        'No specific group is a loser',
        'Everyone gains from safer, healthier society',
      ],
      sources: [
        'Polling on mental health services',
        'Public attitudes on crisis intervention',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'This initiative clearly de-commodifies an essential service: mental health crisis counseling is provided to anyone in need, free of charge, just like dialing 911. It treats mental health support not as a market commodity (where only those who can pay or have insurance get help), but as a public good – something one can access as a right or need. By instituting a reliable, publicly funded lifeline, it shields individuals from the brutal market reality where, absent insurance or money, they might have no support. In Polanyian terms, it reinscribes the principle that human life and health are not just fodder for the market.',
      keyPoints: [
        'De-commodifies essential crisis counseling',
        'Free to anyone in need',
        'Mental health support as public good',
        'Shields from market reality of pay-to-access care',
        'Human life and health not just market fodder',
      ],
      sources: [
        'De-commodification of mental health services',
        'Public goods theory',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'The 988 lifeline is especially beneficial for people who are worst-off in moments of crisis – those experiencing extreme mental distress, including many who may be economically or socially disadvantaged. It doesn\'t give cash or employment, but it provides immediate help that can save lives and prevent tragedies that often disproportionately hit the vulnerable (e.g., underserved communities with less access to mental health care). By reducing reliance on police, it also helps marginalized groups who historically fear harsher outcomes from police interactions. Everyone can use 988, but the marginal benefit is highest for those with nowhere else to turn.',
      keyPoints: [
        'Especially beneficial for worst-off in crisis',
        'Helps economically and socially disadvantaged',
        'Saves lives and prevents tragedies',
        'Reduces reliance on police for marginalized groups',
        'Highest marginal benefit for those with nowhere else',
      ],
      sources: [
        'Mental health access disparities',
        'Crisis services and vulnerable populations',
      ],
    },
    george: {
      score: 0.2,
      reasoning: 'Funding 988 does not involve taxing unearned rents or shifting tax burdens off labor. If anything, it might be funded by a flat telecom fee (which is not related to land or monopoly rents – it\'s a small user tax that everyone with a phone pays equally) or by general funds (largely income and sales taxes). There\'s no element of capturing economic rent here; we\'re simply pooling resources to pay for a service. It\'s actually somewhat regressive if via phone fees (a fee is the same for rich or poor phone users). Strictly speaking, it doesn\'t score on George\'s ideal of taxing land or monopoly or idle capital. It\'s just ordinary funding.',
      keyPoints: [
        'Does not involve taxing unearned rents',
        'Flat telecom fee not related to land or monopoly rents',
        'No element of capturing economic rent',
        'Somewhat regressive if via phone fees',
        'Ordinary funding, not Georgist ideal',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'The 988 lifeline contributes to inclusive institutions by ensuring a previously neglected aspect of public safety – mental health emergencies – is addressed in a way accessible to all. It lowers barriers to getting help: anyone can dial 988 without cost, which is a huge improvement from having to navigate health insurance or pay for private care. It also shifts some power away from traditional incumbents (police, who historically monopolized crisis response) toward a more inclusive model involving health professionals and community-based responders.',
      keyPoints: [
        'Contributes to inclusive institutions',
        'Mental health emergencies addressed for all',
        'Lowers barriers: anyone can dial 988 free',
        'Shifts power from police to health professionals',
        'More inclusive crisis response model',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Mental health system accessibility',
      ],
    },
    walzer: {
      score: 1.0,
      reasoning: 'This policy epitomizes sphere appropriateness: it asserts that mental health crises belong in the health/care sphere and not in the criminal justice sphere. Under the old system, someone suicidal might get a police response – essentially using the logic of security and coercion to handle what is fundamentally a health issue. By funding 988 and associated mobile crisis teams, society is saying that the correct approach to a person in emotional distress is care, compassion, and medical support, not punishment or force. This is exactly Walzer\'s idea of using the right social logic for the good in question. The policy is designed to dispatch therapists, not cops, except as a last safety resort. This separation of spheres – mental health care handled by healthcare approaches, not by law enforcement – is precisely the appropriate matching of means to ends.',
      keyPoints: [
        'Epitomizes sphere appropriateness',
        'Mental health crises in health/care sphere, not criminal justice',
        'Care, compassion, and medical support, not punishment',
        'Dispatch therapists, not cops, except as last resort',
        'Mental health handled by healthcare, not law enforcement',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Mental health crisis response philosophy',
      ],
    },
  },
  modifiers: [
    {
      id: 'expanded-mobile-crisis',
      name: 'Expanded Mobile Crisis Teams',
      description: 'Fund mobile crisis response teams in all communities',
      factorChanges: { pettit: 0.1, rawls: 0.1 },
    },
    {
      id: 'mandatory-funding',
      name: 'Mandatory Baseline Funding',
      description: 'Require minimum funding levels through federal legislation',
      factorChanges: { olson: 0.1, buchanan: -0.05 },
    },
  ],
};
