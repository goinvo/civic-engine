/**
 * V3 Needs-Based Methodology: Universal Broadband & Municipal Internet
 *
 * Policy: Ensure universal access to high-speed internet through federal
 * investment and support for municipal broadband networks.
 *
 * Overall Score: ~9/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const ruralBroadbandAccessMethodology: V3PolicyMethodology = {
  policyId: 'rural-broadband-access',
  policyName: 'Universal Broadband & Municipal Internet',
  description:
    'Ensure universal access to high-speed internet through federal investment and support for municipal broadband networks. An estimated 30 million Americans live in areas without acceptable broadband service, and many more struggle with affordability or subpar speeds. Universal broadband would directly benefit these millions by connecting the unconnected and indirectly benefit the entire population through network effects and economic strengthening. Average public support is approximately 76%.',

  needCategories: {
    physiological: {
      score: 6,
      reasoning:
        'Indirect but growing impact. Internet access is not food or water, but it increasingly underlies access to healthcare (telemedicine) and other services. In remote areas, a broadband connection can mean getting medical advice or ordering necessities online when physical access is limited. During emergencies or pandemics, internet connectivity becomes quasi-essential for obtaining health information and even for remote monitoring of health. While not a direct physiological need, broadband has become intertwined with meeting basic needs in modern society (for example, applying for public assistance or finding safe housing often requires internet access).',
    },
    safety: {
      score: 6,
      reasoning:
        'Moderate impact. Reliable internet contributes to public safety and stability: it enables emergency communications, education about hazards, and economic security through remote work opportunities. Communities with universal broadband can receive timely disaster alerts and access support services quickly. Providing affordable municipal internet can protect residents from predatory pricing or service outages that might leave them isolated. Treating broadband as essential infrastructure adds to the resilience of the economy and social fabric, which is a form of collective security. However, broadband itself doesn\'t stop crime or physical danger, so its safety contribution is more about stability and resilience.',
    },
    community: {
      score: 8,
      reasoning:
        'High impact. Internet connectivity profoundly affects social belonging and civic participation. Universal broadband means everyone can participate in the digital community: staying in touch with family, engaging on social media, accessing news, and joining virtual civic forums. It reduces social isolation, especially for rural residents or marginalized groups, by connecting them to wider networks. Municipal internet initiatives often have a community-oriented aspect – city-run networks can offer public Wi-Fi in community centers or help low-income neighborhoods get online, bridging social divides. Informed citizens (via internet access) are more likely to engage in local governance and voting.',
    },
    opportunity: {
      score: 9,
      reasoning:
        'Very high impact. Broadband access is often called a gateway to economic and educational opportunity. With universal high-speed internet, people can search and apply for jobs online, pursue online education or training, start and run businesses from home, and access markets beyond their immediate area. Regions that have invested in broadband see improvements in economic growth, higher incomes, and lower unemployment rates. For students, having internet at home is critical for homework and research – lack of it severely disadvantages kids ("homework gap"). Municipal broadband can lower costs, allowing more families to afford connectivity. Ensuring everyone has internet reduces inequality of opportunity: no one is left behind in the digital economy due to lack of access.',
    },
    selfActualization: {
      score: 8,
      reasoning:
        'High impact. The internet enables individuals to explore their interests, creativity, and identity. From online hobbies, art, and cultural content to learning new skills via YouTube or MOOCs, broadband is a tool for personal growth. Universal access means even those in remote or poor communities can tap into the world\'s knowledge and cultural resources. People can form niche communities around shared passions, contribute to open-source projects, or simply stream music and films that enrich their lives. By making such avenues universally available, this policy helps many more individuals pursue their full potential and personal fulfillment.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high. In today\'s society, virtually everyone needs reliable internet. Those who lack it (due to geography or cost) are disproportionately rural, low-income, or elderly, but the number is substantial: an estimated 30 million Americans live in areas without acceptable broadband service, and many more struggle with affordability or subpar speeds. Universal broadband would directly benefit these millions by connecting the unconnected. It also indirectly benefits the entire population – even those already online – because network effects grow (everyone can communicate and participate) and the economy strengthens when the whole workforce can engage digitally.',
      keyPoints: [
        '30 million Americans lack acceptable broadband service',
        'Rural, low-income, elderly disproportionately affected',
        'Network effects benefit entire population',
        'Economy strengthens when all can participate digitally',
        'Municipal networks inject competition, lowering prices for all',
      ],
    },
    essentialToSurvival: {
      score: 7,
      reasoning:
        'Moderately high. While one can survive without internet in a literal sense, in practice broadband has become an essential service much like electricity. The government has recognized this by investing heavily to treat internet as critical infrastructure. During crises (like COVID-19 lockdowns), internet access was a lifeline for remote work, education, and telehealth – in those contexts, it was essential to maintain livelihoods and health. The CDC notes that broadband affects social determinants of health. However, since internet isn\'t a biological necessity, we rate it moderately high: crucial for functioning in modern society and indirectly tied to survival through access to emergency info, services, and support networks.',
      keyPoints: [
        'Broadband recognized as essential infrastructure',
        'COVID-19 demonstrated internet as lifeline',
        'CDC: broadband affects social determinants of health',
        'Critical for remote work, education, telehealth',
        'Not biological necessity but essential for modern life',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Moderate. Rolling out universal broadband is a significant infrastructure endeavor – it involves laying fiber, building towers, launching municipal networks – which can take several years to a decade to reach full coverage. However, incremental benefits appear as projects progress. The Bipartisan Infrastructure Law of 2021 allocated $65 billion for broadband expansion, and states are already using these funds to connect underserved areas. Municipal broadband projects can sometimes light up service in a city within 1–2 years. Initial outcomes (new communities getting online, pilot programs) could be visible within a year or two, but full nationwide universal access might be a mid- to long-term outcome (perhaps 5–7 years for major build-outs).',
      keyPoints: [
        '$65 billion allocated in Bipartisan Infrastructure Law',
        'States already deploying funds',
        'Municipal projects can complete in 1-2 years',
        'Full nationwide coverage: 5-7 years',
        'Benefits compound as more people connect',
      ],
    },
    feasibility: {
      score: 8,
      reasoning:
        'High. Politically, this policy is quite feasible because it enjoys bipartisan public support (over three-quarters of Americans support expanding internet access) and there is already momentum and funding behind it. The federal government is investing billions to "ensure every American has access to high-speed internet," reflecting recognition of feasibility and importance. Many states and municipalities are launching their own broadband initiatives. Challenges remain, such as coordinating efforts, overcoming telecom industry opposition to municipal competition, and effectively reaching the hardest-to-serve rural spots. Also, ensuring that access is affordable (not just available) requires ongoing policy attention. Despite these hurdles, the combination of strong public will, available funding, and proven models makes universal broadband a realistic goal.',
      keyPoints: [
        '76%+ public support for broadband expansion',
        '$65 billion federal investment underway',
        'States/municipalities launching initiatives',
        'Telecom industry opposition to municipal competition',
        'Proven models exist (successful municipal networks)',
        'Realistic goal with sustained commitment',
      ],
    },
  },

  overallRationale:
    'Universal Broadband & Municipal Internet scores approximately 9/10, indicating it is Very Beneficial, bordering on essential. It dramatically expands opportunities in education and employment, fosters social inclusion, and is now considered "essential infrastructure" for a healthy community. The wide-ranging positive effects – economic growth, improved health and education outcomes, bridging of inequality – coupled with strong feasibility, give it a high score. We stop just shy of a perfect score only because it doesn\'t directly address immediate physical survival and will require substantial effort to implement fully. Nonetheless, the policy\'s ability to uplift nearly every other aspect of life (from accessing healthcare to finding a job or staying informed) makes it a cornerstone for a flourishing, equitable society.',

  sources: [
    'brookings-broadband-health-equity',
    'whitehouse-infrastructure-broadband',
    'pew-municipal-broadband',
    'usc-annenberg-broadband',
  ],
};

export default ruralBroadbandAccessMethodology;
