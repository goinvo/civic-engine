import { PolicyMethodology } from './index';

export const aiSafetyRegulation: PolicyMethodology = {
  policyId: 'ai-safety-regulation',
  policyName: 'AI Safety & Deepfake Liability',
  description: 'Establish federal liability for AI companies regarding deepfakes and mandate safety certification for high-risk AI models before release.',
  overallRationale: 'This policy has 80% public support prioritizing AI safety over development speed (88% Democrats, 79% Republicans). 84% believe companies creating AI for political deepfakes should be liable. 79% support requiring safety testing before AI release. The policy addresses rising public concern about unregulated AI development.',
  factors: {
    hayek: {
      score: 0.2,
      reasoning: 'This policy favors top-down regulation of AI – a clear move towards central rule-setting as opposed to spontaneous market order. It requires companies to get safety certifications (implying centralized or standardized testing regimes) and holds them liable for certain harmful outcomes (deepfakes), which means the government (agencies like FTC/NIST or courts) will be actively judging AI models and their effects. In a Hayekian sense, it assumes regulators can gather sufficient information and expertise to predict or mitigate AI risks, rather than letting decentralized experimentation and competition play out unchecked. It\'s consciously slowing the "move fast and break things" approach in favor of precaution.',
      keyPoints: [
        'Favors top-down regulation of AI',
        'Requires centralized safety certifications',
        'Government actively judges AI models',
        'Assumes regulators can predict AI risks',
        'Slows "move fast and break things" approach',
      ],
      sources: [
        'NIST AI Risk Management Framework',
        'EU AI Act structure',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'AI and digital content circulate broadly (nationally and globally). Issues like deepfakes affecting elections or online scams transcend state borders. A federal (even international, but at least federal) approach is the minimum scale that makes sense here. By having national rules for AI model safety and liability, the policy matches the scope of the problem – you don\'t want a patchwork where deepfake laws vary by state while misinformation crosses state lines in seconds. The federal government setting standards via agencies like NIST ensures a unified framework, embodying a polycentric solution at the appropriate high level.',
      keyPoints: [
        'AI issues transcend state borders',
        'Federal approach matches problem scale',
        'Avoids patchwork of state laws',
        'NIST ensures unified framework',
        'Polycentric solution at appropriate level',
      ],
      sources: [
        'FTC tech enforcement authority',
        'State technology regulation examples',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The core principles of the policy are relatively clear in plain language: "If an AI tool is high-risk, it must pass safety tests before the public can use it. If an AI (or platform) generates harmful deepfake content, the company can be sued or penalized." These if-then rules are straightforward in concept. The average person might not know the technical details of "safety certification" or the legal nuances of liability, but they understand the intent (ensure AI is safe and that victims of AI-driven deception have recourse). There is some complexity under the hood – e.g., defining "high-risk AI" or adjudicating what counts as a harmful deepfake – but as a policy pitch it\'s transparent about its goals.',
      keyPoints: [
        'Core principles clear in plain language',
        'If-then rules straightforward in concept',
        'Public understands safety-first intent',
        'Some complexity in defining "high-risk AI"',
        'Transparent about goals and mechanisms',
      ],
      sources: [
        'AI governance literature',
        'NIST AI standards development',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'This policy area is a new frontier, and big tech companies will surely lobby to shape the regulations. The initial proposal, however, seems designed to be broad in application: it talks about federal liability and mandatory certification, which if applied uniformly would be hard for any single company to escape. Features like removing Section 230 immunity for AI-generated content would uniformly affect all platforms, preventing special carve-outs. Still, the devil is in the details – powerful AI labs or platforms might influence what "high-risk" means. The fact that public support is high and bipartisan suggests lawmakers might feel pressure to keep it robust. The ambition is broad (good), but risk of future loopholes or weak enforcement keeps it from scoring higher.',
      keyPoints: [
        'New frontier with active tech lobbying',
        'Broad application hard for companies to escape',
        'Section 230 reform would affect all platforms',
        'Powerful players may influence definitions',
        'Bipartisan support creates pressure for robustness',
      ],
      sources: [
        'AI Policy Institute polling 2024',
        'OpenSecrets tech lobbying data',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'AI Safety regulation isn\'t directly about macroeconomic stability. In fact, one might worry that over-regulation could slow down an economic boom in the AI sector. However, the intent here is to prevent potential crises – for example, uncontrolled AI causing societal chaos (e.g. deepfake-triggered panic or financial scams at scale) which could have economic fallout. By introducing some brakes and safety checks, it might avert future shocks (like an AI-related market crash or costly scandal). These effects are speculative. Overall, we consider it neutral on the classic Keynesian stabilization axis – it neither obviously fights recessions nor clearly exacerbates cycles.',
      keyPoints: [
        'Not directly about macroeconomic stability',
        'May slow AI sector growth somewhat',
        'Intent is to prevent potential crises',
        'Could avert future AI-related shocks',
        'Neutral on Keynesian stabilization axis',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The AI Safety & Deepfake Liability proposal is fundamentally about protecting individuals (and society) from being harmed or controlled by powerful AI tools and those who deploy them. Right now, without such rules, ordinary people have little defense if a malicious actor uses an AI model to create a damaging fake video of them, or if an opaque AI system affects their opportunities. This policy asserts that companies cannot unleash technologies that potentially dominate our information environment or personal lives without accountability. It gives people a form of republican liberty: freedom from fear that AI can be used against them with no recourse. It checks the domination of both Big Tech and bad actors misusing AI.',
      keyPoints: [
        'Protects individuals from powerful AI tools',
        'Currently little defense against AI harms',
        'Companies cannot unleash AI without accountability',
        'Freedom from fear of AI used against you',
        'Checks domination by Big Tech and bad actors',
      ],
      sources: [
        'Sensity AI deepfake research',
        'AI Policy Institute polling 2024',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'This policy enhances voice and accountability for citizens in the face of AI systems. Under current law, if an AI-generated deepfake ruins your reputation, you have little recourse (platforms are generally immune under Section 230). By removing immunity and placing liability on companies, the policy gives victims a "voice" through the legal system – they can complain, sue, or demand redress. It also encourages companies to listen to users\' concerns about safety. Exit options in the AI context are limited, as AI infiltrates many services. However, with certification, users could opt for certified-safe AI products, introducing a form of exit (preferring compliant companies over reckless ones). Overall, people gain agency: the ability to exit unsafe AI ecosystems and a voice to push for accountability.',
      keyPoints: [
        'Enhances voice and accountability for citizens',
        'Victims gain voice through legal system',
        'Companies incentivized to listen on safety',
        'Certification creates exit toward safe products',
        'People gain agency over AI in their lives',
      ],
      sources: [
        'Consumer protection litigation research',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'There is a striking consensus emerging on AI regulation. Roughly 4 in 5 Americans want the government to prioritize AI safety over unfettered innovation, and strong majorities in both parties support measures like deepfake liability and pre-release testing. This implies a high degree of societal consent for the policy – it is not a partisan weapon being forced on a dissenting minority. The beneficiaries are the general public (internet users, voters, consumers – basically everyone). The potential "losers" are certain AI companies who will face higher compliance costs. Those companies are not compensated, but given the public\'s near-unanimous concern about AI harms, the policy scores high on consent.',
      keyPoints: [
        'Striking consensus on AI regulation emerging',
        '4 in 5 Americans prioritize safety over speed',
        'Strong bipartisan support for deepfake liability',
        'Beneficiaries are general public',
        'Near-unanimous concern about AI harms',
      ],
      sources: [
        'Gallup polling on AI',
        'AI Policy Institute deepfakes liability poll',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: 'Polanyi\'s concept of protection is often about shielding humans and society from being treated as mere commodities in a market. AI Safety rules do provide a new kind of protection – they shield our identities, data, and social trust from rampant commodification by AI algorithms. For instance, without liability, our faces or voices could be freely used and distorted for profit or political gain. This law says certain uses of AI are off-limits, effectively decommodifying some aspects of digital life (like the authenticity of one\'s likeness). However, it\'s not directly about core necessities like housing or labor rights. It\'s more about protecting the public good (truth, security) from unregulated technological disruption. We give it a moderate score: protective in a new domain, but not a classic Polanyian bread-and-butter issue.',
      keyPoints: [
        'Shields identities and data from commodification',
        'Faces and voices protected from misuse',
        'Decommodifies some aspects of digital life',
        'Protects public good from tech disruption',
        'Not classic labor/housing protection',
      ],
      sources: [],
    },
    rawls: {
      score: 0.7,
      reasoning: 'AI threats like deepfakes or unsafe algorithms can harm anyone, but the worst-off in society are often most vulnerable to these harms. For example, marginalized groups could be disproportionately targeted by deepfake pornography or misinformation; people without resources can\'t easily recover from reputation damage or financial scams. By imposing safety standards and liabilities, the policy helps protect those with the least power from high-tech harms. It doesn\'t directly redistribute wealth, but it ensures a baseline of digital safety and accountability that benefits everyone, especially those who lack other means to defend themselves. In short, it tries to ensure the "floor" of rights and security in the AI era is upheld for all citizens.',
      keyPoints: [
        'Worst-off most vulnerable to AI harms',
        'Marginalized groups disproportionately targeted',
        'Those without resources can\'t recover easily',
        'Protects those with least power',
        'Ensures floor of digital safety for all',
      ],
      sources: [
        'AI bias research',
        'Deepfake victim demographics',
      ],
    },
    george: {
      score: 0.3,
      reasoning: 'The policy is not primarily about taxation or economic redistribution, so the Henry George perspective is less directly applicable. It doesn\'t impose a tax on AI windfalls or monopolies, nor does it shift economic rents to public use in an obvious way. One might stretch and say that big tech\'s rapid AI deployment is generating "social rents" (profits while externalizing harms), and this policy forces them to internalize some costs (liability for misuse, investment in safety compliance) – which is a bit like capturing a negative externality. But that\'s more about regulating external costs than redirecting unearned income. There\'s no element of shifting tax from labor to land/monopoly here.',
      keyPoints: [
        'Not primarily about taxation or redistribution',
        'Does not impose tax on AI monopolies',
        'Forces companies to internalize some costs',
        'More about regulating externalities than rent capture',
        'No shift from labor tax to monopoly tax',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.6,
      reasoning: 'Will this policy foster inclusive institutions or guard against extractive ones in the realm of AI? Potentially, yes. By setting rules early, it can prevent a scenario where a few dominant tech players exploit AI with little oversight (an extractive outcome). Liability and safety tests could encourage a more level playing field: smaller companies might actually benefit if they can meet safety standards, whereas big players can\'t just bulldoze competition regardless of societal harm. It also includes more stakeholders (regulators, ethicists, public voices) in how AI develops. However, one could argue it creates compliance costs that only large companies can easily afford, possibly raising barriers to entry for smaller startups. Balancing these points, we score it moderately.',
      keyPoints: [
        'Can prevent extractive AI dominance by few players',
        'May level playing field for smaller companies',
        'Includes more stakeholders in AI development',
        'Compliance costs could raise barriers for startups',
        'Intent is inclusive, implementation matters',
      ],
      sources: [
        'AI ethics and inclusivity research',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'This policy is largely about preserving the integrity of certain social spheres from corrosive intrusion by AI-generated falsehoods or dangerous tools. Democratic elections should be a sphere of truth and fair persuasion, not warped by deepfake propaganda; personal identity and dignity shouldn\'t be bought and sold by tech companies as just data points. By outlawing political deepfakes and holding platforms accountable, it asserts that truth in the political sphere and personal consent in the intimate sphere are values that money/technology shouldn\'t override. Similarly, requiring safety for high-risk AI is saying human life and safety aren\'t just variables in a profit equation. It uses the "logic of care and accountability" in a domain that otherwise might run on the "logic of profit and innovation at all costs."',
      keyPoints: [
        'Preserves integrity of democratic elections',
        'Truth and dignity not for sale',
        'Political sphere protected from AI manipulation',
        'Human safety not just variable in profit equation',
        'Logic of care over logic of profit',
      ],
      sources: [
        'Democratic theory and AI',
        'Political manipulation research',
      ],
    },
  },
  modifiers: [
    {
      id: 'mandatory-watermarking',
      name: 'Mandatory AI Watermarking',
      description: 'Require all AI-generated content to include detectable watermarks',
      factorChanges: { downs: 0.1, walzer: 0.1 },
    },
    {
      id: 'international-coordination',
      name: 'International Safety Standards',
      description: 'Coordinate safety certification with EU AI Act and other international frameworks',
      factorChanges: { ostrom: 0.05, olson: 0.05 },
    },
  ],
};
