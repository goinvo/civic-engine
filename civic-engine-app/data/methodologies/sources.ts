/**
 * Bibliography and Source Citations for Policy Methodologies
 *
 * This module contains all source citations referenced in policy methodology files.
 * Sources are organized by category and include URLs for verification.
 */

export interface BibliographyEntry {
  id: string;
  title: string;
  organization?: string;
  author?: string;
  url?: string;
  year?: number;
  type: 'poll' | 'research' | 'news' | 'government' | 'academic' | 'advocacy' | 'wiki';
  description?: string;
}

// ============================================
// POLLING & PUBLIC OPINION SOURCES
// ============================================

export const pollingSources: BibliographyEntry[] = [
  {
    id: 'gallup-ai-safety',
    title: 'Americans Prioritize AI Safety and Data Security',
    organization: 'Gallup',
    url: 'https://news.gallup.com/poll/694685/americans-prioritize-safety-data-security.aspx',
    type: 'poll',
    description: '80% of Americans prioritize AI safety rules over unfettered innovation',
  },
  {
    id: 'aipi-deepfakes-poll',
    title: 'Poll: American Voters Support Liability For Companies That Produce Political Deepfakes',
    organization: 'AI Policy Institute',
    url: 'https://theaipi.org/poll-fcc-deepfakes-liability-02-21/',
    type: 'poll',
    description: '70-80% support making AI companies liable for misuse',
  },
  {
    id: 'issue-one-kosa-poll',
    title: 'New poll finds near universal public support for bipartisan legislation protecting kids online',
    organization: 'Issue One',
    url: 'https://issueone.org/press/new-poll-finds-near-universal-public-support-for-bipartisan-legislation-protecting-kids-online/',
    type: 'poll',
    description: '83-86% support for KOSA',
  },
  {
    id: 'national-skills-coalition-poll',
    title: 'New Poll: Over Two Thirds of Voters Want Candidates Who Will Invest in Skills Training',
    organization: 'National Skills Coalition',
    url: 'https://nationalskillscoalition.org/news/press-releases/public-perspectives/',
    type: 'poll',
    description: '82% support for skills training investment',
  },
  {
    id: 'pew-municipal-broadband',
    title: 'Pew Survey Reveals Overwhelming Support For Municipal Broadband Networks',
    organization: 'Community Broadband Networks / ILSR',
    url: 'https://ilsr.org/article/community-broadband-networks/pew-survey-reveals-overwhelming-support-for-municipal-broadband-networks/',
    type: 'poll',
    description: '70%+ support including 67% Republicans and 74% Democrats',
  },
  {
    id: 'public-consultation-foreign-funding',
    title: 'Nearly 80% of Voters Support Prohibiting Foreign Entities from Funding Ballot Measures',
    organization: 'Public Consultation',
    url: 'https://publicconsultation.org/united-states/foreign-funding-of-ballot-initiatives/',
    type: 'poll',
  },
  {
    id: 'fwd-us-dreamers-poll',
    title: 'NEW POLL: Overwhelming Majority of U.S. Voters Across Political Spectrum Support Legislation for Dreamers Paired with Border Security',
    organization: 'Fwd.us',
    url: 'https://www.fwd.us/news/new-poll-overwhelming-majority-of-u-s-voters-across-political-spectrum-support-legislation-for-dreamers-paired-with-border-security/',
    type: 'poll',
    description: '74% support mandatory E-Verify, ~80% support citizenship for Dreamers',
  },
  {
    id: 'autobody-news-right-to-repair',
    title: 'National Survey Finds Consumers Overwhelmingly Support National Right to Repair Law',
    organization: 'Auto Body News',
    url: 'https://www.autobodynews.com/news/national-survey-finds-consumers-overwhelmingly-support-national-right-to-repair-law',
    type: 'poll',
    description: '98% of car owners say choice of repair location is important; 83%+ public support',
  },
  {
    id: 'navigator-research-ctc',
    title: 'Navigator Research: Child Tax Credit Polling',
    organization: 'Navigator Research',
    url: 'https://navigatorresearch.org/',
    type: 'poll',
    description: 'Polling on Child Tax Credit support',
  },
  {
    id: 'gallup-background-checks',
    title: 'Gallup Polling on Background Checks',
    organization: 'Gallup',
    url: 'https://news.gallup.com/',
    type: 'poll',
    description: '85-95% support for universal background checks',
  },
];

// ============================================
// NEWS & MEDIA SOURCES
// ============================================

export const newsSources: BibliographyEntry[] = [
  {
    id: 'verge-municipal-broadband',
    title: 'Municipal broadband is breaking Big Telecom\'s hold on the internet',
    organization: 'The Verge',
    url: 'https://www.theverge.com/23763482/municipal-broadband-biden-internet-funds-telecom-lobbying',
    year: 2023,
    type: 'news',
    description: '16 states have laws protecting telecom incumbents; price cuts when municipal competition enters',
  },
  {
    id: 'pa-independent-ira-repeal',
    title: 'Republicans move to repeal law that saves older Americans billions in health care costs',
    organization: 'The Pennsylvania Independent',
    url: 'https://pennsylvaniaindependent.com/politics/republicans-health-care-costs-inflation-reduction-act-repeal-scott-perry/',
    type: 'news',
    description: '85% support Medicare negotiating drug prices, including 77% of Republicans',
  },
  {
    id: 'newsweek-scotus-term-limits',
    title: 'Newsweek: Supreme Court Term Limits',
    organization: 'Newsweek',
    url: 'https://www.newsweek.com/',
    type: 'news',
    description: 'Polling and coverage of Supreme Court term limits',
  },
  {
    id: 'washington-post-wealth-tax',
    title: 'Washington Post: Wealth Tax Coverage',
    organization: 'Washington Post',
    url: 'https://www.washingtonpost.com/',
    type: 'news',
    description: 'Coverage of wealth tax proposals',
  },
  {
    id: 'axios-polling',
    title: 'Axios Polling Coverage',
    organization: 'Axios',
    url: 'https://www.axios.com/',
    type: 'news',
  },
  {
    id: 'business-insider-policy',
    title: 'Business Insider Policy Coverage',
    organization: 'Business Insider',
    url: 'https://www.businessinsider.com/',
    type: 'news',
  },
  {
    id: 'forbes-policy',
    title: 'Forbes Policy Coverage',
    organization: 'Forbes',
    url: 'https://www.forbes.com/',
    type: 'news',
  },
  {
    id: 'time-ai-regulation',
    title: 'TIME: AI Regulation Coverage',
    organization: 'TIME',
    url: 'https://time.com/',
    type: 'news',
    description: 'Coverage of AI safety and regulation debates',
  },
];

// ============================================
// RESEARCH & THINK TANK SOURCES
// ============================================

export const researchSources: BibliographyEntry[] = [
  {
    id: 'niskanen-center',
    title: 'Niskanen Center Policy Research',
    organization: 'Niskanen Center',
    url: 'https://www.niskanencenter.org/',
    type: 'research',
    description: 'Policy analysis on UBI, FJG, and various economic policies',
  },
  {
    id: 'wef-ubi',
    title: 'World Economic Forum: Universal Basic Income Research',
    organization: 'World Economic Forum',
    url: 'https://www.weforum.org/',
    type: 'research',
  },
  {
    id: 'cbpp-research',
    title: 'Center on Budget and Policy Priorities Research',
    organization: 'CBPP',
    url: 'https://www.cbpp.org/',
    type: 'research',
    description: 'Research on tax policy, social programs, and economic policy',
  },
  {
    id: 'epi-research',
    title: 'Economic Policy Institute Research',
    organization: 'EPI',
    url: 'https://www.epi.org/',
    type: 'research',
    description: 'Labor market and economic policy research',
  },
  {
    id: 'epi-minimum-wage-poverty',
    title: 'The federal minimum wage is officially a poverty wage in 2025',
    organization: 'Economic Policy Institute',
    url: 'https://www.epi.org/blog/the-federal-minimum-wage-is-officially-a-poverty-wage-in-2025/',
    year: 2025,
    type: 'research',
    description: 'Analysis showing federal minimum wage falls below poverty threshold',
  },
  {
    id: 'tax-policy-center',
    title: 'Tax Policy Center Analysis',
    organization: 'Tax Policy Center',
    url: 'https://www.taxpolicycenter.org/',
    type: 'research',
    description: 'Analysis of tax proposals and their impacts',
  },
  {
    id: 'cato-institute',
    title: 'Cato Institute Policy Analysis',
    organization: 'Cato Institute',
    url: 'https://www.cato.org/',
    type: 'research',
    description: 'Libertarian perspective on policy analysis',
  },
  {
    id: 'rand-corporation',
    title: 'RAND Corporation Research',
    organization: 'RAND Corporation',
    url: 'https://www.rand.org/',
    type: 'research',
    description: 'Policy research including gun violence, AI safety',
  },
  {
    id: 'rand-public-option',
    title: 'Public Option: Health Insurance That Competes with Private Insurers',
    organization: 'RAND Corporation',
    url: 'https://www.rand.org/content/dam/rand/pubs/research_briefs/RB10100/RB10120/RAND_RB10120.pdf',
    type: 'research',
    description: 'RAND study on public option effects on premiums and coverage',
  },
  {
    id: 'jpal-vocational-training',
    title: 'Vocational and skills training programs improve labor market outcomes',
    organization: 'J-PAL (Abdul Latif Jameel Poverty Action Lab)',
    url: 'https://www.povertyactionlab.org/policy-insight/vocational-and-skills-training-programs-improve-labor-market-outcomes',
    type: 'research',
    description: 'Meta-analysis showing 15% wage gains from shorter, targeted programs',
  },
  {
    id: 'kff-public-option',
    title: '10 Key Questions on Public Option Proposals',
    organization: 'KFF (Kaiser Family Foundation)',
    url: 'https://www.kff.org/affordable-care-act/10-key-questions-on-public-option-proposals/',
    type: 'research',
    description: 'Comprehensive analysis of public option policy design questions',
  },
  {
    id: 'berkeley-irle-minimum-wage',
    title: 'Minimum Wage Effects and Monopsony Explanations',
    organization: 'UC Berkeley Institute for Research on Labor and Employment',
    url: 'https://irle.berkeley.edu/wp-content/uploads/2023/09/Minimum-Wage-E%E2%80%82ects-and-Monopsony-Explanations-Revised-December-2024.pdf',
    year: 2024,
    type: 'research',
    description: 'Research on minimum wage effects in monopsonistic labor markets',
  },
  {
    id: 'usc-annenberg-broadband',
    title: 'Infrastructure law: High-speed internet is as essential as water and electricity',
    organization: 'USC Annenberg School for Communication and Journalism',
    url: 'https://annenberg.usc.edu/news/critical-conversations/infrastructure-law-high-speed-internet-essential-water-and-electricity',
    type: 'research',
    description: 'Congress recognized broadband as essential infrastructure in 2021 law',
  },
  {
    id: 'builders-movement-dark-money',
    title: 'EXPOSED: 5 Ways Big Money Made Politics More Divisive',
    organization: 'Builders Movement',
    url: 'https://buildersmovement.org/2025/08/06/exposed-5-ways-big-money-made-politics-more-divisive/',
    type: 'research',
    description: '85% of Americans favor stricter rules on money in politics',
  },
  {
    id: 'georgetown-pre-k',
    title: 'Universal pre-K: The long-term benefits that exceed short-term costs',
    organization: 'Georgetown University McCourt School of Public Policy',
    url: 'https://mccourt.georgetown.edu/news/universal-pre-k-long-term-benefits-exceed-short-term-costs/',
    type: 'research',
    description: 'Benefits exceeding costs by 2.6:1 with lasting gains in graduation and enrollment',
  },
  {
    id: 'mdrc-pre-k',
    title: 'As Universal pre-K Gathers Steam, What Are the Pros and Cons Experts See?',
    organization: 'MDRC',
    url: 'https://www.mdrc.org/news/mdrc-news/universal-pre-k-gathers-steam-what-are-pros-and-cons-experts-see',
    type: 'research',
    description: 'Expert analysis of universal pre-K benefits and concerns',
  },
  {
    id: 'us-chamber-buy-american',
    title: "How Extending the Reach of 'Buy America' Rules Can Backfire on U.S. Workers, Companies",
    organization: 'U.S. Chamber of Commerce',
    url: 'https://www.uschamber.com/regulations/how-extending-the-reach-of-buy-american-rules-can-backfire-on-u-s-workers-companies',
    type: 'research',
    description: 'Analysis of Buy American mandate costs and trade-offs',
  },
];

// ============================================
// GOVERNMENT SOURCES
// ============================================

export const governmentSources: BibliographyEntry[] = [
  {
    id: 'grassley-e-verify',
    title: 'Grassley on E-Verify',
    organization: 'U.S. Senate - Senator Grassley',
    url: 'https://www.grassley.senate.gov/news/news-releases/grassley-e-verify',
    type: 'government',
    description: 'Over 750,000 employers use E-Verify voluntarily; ~98% accuracy',
  },
  {
    id: 'samhsa-988',
    title: 'SAMHSA 988 Oversight Structure',
    organization: 'SAMHSA',
    url: 'https://www.samhsa.gov/',
    type: 'government',
    description: '988 Suicide & Crisis Lifeline administration',
  },
  {
    id: 'fec-campaign-finance',
    title: 'Federal Election Commission Campaign Finance Data',
    organization: 'FEC',
    url: 'https://www.fec.gov/',
    type: 'government',
  },
  {
    id: 'disclose-act',
    title: 'DISCLOSE Act Provisions',
    organization: 'U.S. Congress',
    type: 'government',
    description: 'Democracy Is Strengthened by Casting Light On Spending in Elections Act',
  },
  {
    id: 'gao-job-training-partnership',
    title: 'Job Training Partnership Act: Inadequate Oversight Leaves Program Vulnerable To Waste, Abuse',
    organization: 'U.S. Government Accountability Office',
    url: 'https://www.gao.gov/products/t-hrd-92-47',
    year: 1992,
    type: 'government',
    description: 'GAO testimony on capture and abuse in federal job training programs',
  },
  {
    id: 'macpac-countercyclical-medicaid',
    title: 'An Automatic Countercyclical Financing Adjustment for Medicaid',
    organization: 'MACPAC (Medicaid and CHIP Payment and Access Commission)',
    url: 'https://www.macpac.gov/wp-content/uploads/2021/03/Chapter-1-An-Automatic-Countercyclical-Financing-Adjustment-for-Medicaid.pdf',
    year: 2021,
    type: 'government',
    description: 'Analysis of automatic stabilizer mechanisms for healthcare programs',
  },
  {
    id: 'doe-advance-act',
    title: 'Newly Signed Bill Will Boost Nuclear Reactor Deployment in the United States',
    organization: 'U.S. Department of Energy',
    url: 'https://www.energy.gov/ne/articles/newly-signed-bill-will-boost-nuclear-reactor-deployment-united-states',
    year: 2024,
    type: 'government',
    description: 'DOE analysis of ADVANCE Act nuclear energy provisions',
  },
];

// ============================================
// ACADEMIC SOURCES
// ============================================

export const academicSources: BibliographyEntry[] = [
  {
    id: 'jstor-research',
    title: 'JSTOR Academic Research',
    organization: 'JSTOR',
    url: 'https://www.jstor.org/',
    type: 'academic',
  },
  {
    id: 'fau-research',
    title: 'Florida Atlantic University Research',
    organization: 'FAU',
    url: 'https://www.fau.edu/',
    type: 'academic',
  },
  {
    id: 'uva-dare',
    title: 'UvA-DARE (University of Amsterdam)',
    organization: 'University of Amsterdam',
    url: 'https://dare.uva.nl/',
    type: 'academic',
  },
  {
    id: 'science-direct',
    title: 'ScienceDirect Academic Research',
    organization: 'Elsevier',
    url: 'https://www.sciencedirect.com/',
    type: 'academic',
  },
  {
    id: 'acemoglu-inclusive-institutions',
    title: 'Why Nations Fail: Inclusive vs Extractive Institutions',
    author: 'Daron Acemoglu & James Robinson',
    type: 'academic',
    description: 'Theory of inclusive vs extractive economic and political institutions',
  },
  {
    id: 'walzer-spheres-justice',
    title: 'Spheres of Justice',
    author: 'Michael Walzer',
    type: 'academic',
    description: 'Theory of complex equality and sphere-appropriate distribution',
  },
  {
    id: 'academia-labour-not-commodity',
    title: 'Labour is Not a Commodity Essay',
    organization: 'Academia.edu',
    url: 'https://www.academia.edu/92838060/Labour_is_Not_a_Commodity_Essay',
    type: 'academic',
    description: 'Academic essay on the principle that labor should not be treated as a commodity',
  },
  {
    id: 'cafe-hayek-minimum-wage',
    title: 'Imagining a World of Minimum Wages',
    organization: 'Cafe Hayek',
    url: 'https://cafehayek.com/2013/02/imagining-a-world-of-minimum-wages.html',
    year: 2013,
    type: 'academic',
    description: 'Analysis of minimum wage effects on low-skilled workers from free-market perspective',
  },
  {
    id: 'berkeley-law-public-option',
    title: 'Public Option Economic Analysis',
    organization: 'UC Berkeley School of Law',
    url: 'https://www.law.berkeley.edu/files/chefs/Public_Option_Economic_Analysis.pdf',
    type: 'academic',
    description: 'Economic analysis of public health insurance option',
  },
  {
    id: 'health-economics-review-public-option',
    title: 'Public Option and Health Insurance Market Competition',
    organization: 'Health Economics Review (BioMed Central)',
    url: 'https://healtheconomicsreview.biomedcentral.com/articles/10.1186/s13561-024-00586-4',
    year: 2024,
    type: 'academic',
    description: 'Peer-reviewed analysis of public option market effects',
  },
  {
    id: 'harvard-law-advance-act',
    title: 'ADVANCE Act Strikes Right Balance for Nuclear Energy Regulation',
    organization: 'Harvard Law Review',
    url: 'https://harvardlawreview.org/blog/2024/07/advance-act-strikes-right-balance-for-nuclear-energy-regulation/',
    year: 2024,
    type: 'academic',
    description: 'Legal analysis of ADVANCE Act nuclear regulation reforms',
  },
];

// ============================================
// ADVOCACY & NONPROFIT SOURCES
// ============================================

export const advocacySources: BibliographyEntry[] = [
  {
    id: 'giffords-gun-safety',
    title: 'GIFFORDS Law Center',
    organization: 'GIFFORDS',
    url: 'https://giffords.org/',
    type: 'advocacy',
    description: 'Gun violence prevention research and advocacy',
  },
  {
    id: 'everytown-research',
    title: 'Everytown for Gun Safety Research',
    organization: 'Everytown',
    url: 'https://www.everytown.org/',
    type: 'advocacy',
  },
  {
    id: 'sandy-hook-promise',
    title: 'Sandy Hook Promise',
    organization: 'Sandy Hook Promise',
    url: 'https://www.sandyhookpromise.org/',
    type: 'advocacy',
  },
  {
    id: 'eff-digital-rights',
    title: 'Electronic Frontier Foundation',
    organization: 'EFF',
    url: 'https://www.eff.org/',
    type: 'advocacy',
    description: 'Digital rights and online safety analysis',
  },
  {
    id: 'oxfam-inequality',
    title: 'Oxfam Inequality Research',
    organization: 'Oxfam',
    url: 'https://www.oxfam.org/',
    type: 'advocacy',
  },
  {
    id: 'public-integrity',
    title: 'Center for Public Integrity',
    organization: 'Public Integrity',
    url: 'https://publicintegrity.org/',
    type: 'advocacy',
  },
  {
    id: 'voices-for-service',
    title: 'Voices for National Service',
    organization: 'Voices for Service',
    url: 'https://voicesforservice.org/',
    type: 'advocacy',
  },
  {
    id: 'first-five-years-fund',
    title: 'First Five Years Fund',
    organization: 'First Five Years Fund',
    url: 'https://www.ffyf.org/',
    type: 'advocacy',
    description: 'Early childhood education advocacy',
  },
  {
    id: 'lawyers-democracy-fund',
    title: 'Lawyers Democracy Fund',
    organization: 'Lawyers Democracy Fund',
    url: 'https://lawyersdemocracyfund.org/',
    type: 'advocacy',
  },
  {
    id: 'carter-center-elections',
    title: 'Carter Center Election Standards',
    organization: 'The Carter Center',
    url: 'https://www.cartercenter.org/',
    type: 'advocacy',
    description: 'Election integrity and voter ID standards',
  },
  {
    id: 'papers-please',
    title: 'Papers Please - Identity Project',
    organization: 'Papers Please',
    url: 'https://papersplease.org/',
    type: 'advocacy',
  },
  {
    id: 'jacobin-fjg',
    title: 'Jacobin: Federal Job Guarantee Analysis',
    organization: 'Jacobin Magazine',
    url: 'https://jacobinmag.com/',
    type: 'advocacy',
    description: 'Progressive analysis of job guarantee proposals',
  },
  {
    id: 'citizens-climate-lobby',
    title: 'Citizens\' Climate Lobby',
    organization: 'Citizens\' Climate Lobby',
    url: 'https://citizensclimatelobby.org/',
    type: 'advocacy',
  },
];

// ============================================
// WIKIPEDIA & REFERENCE SOURCES
// ============================================

export const referenceSources: BibliographyEntry[] = [
  {
    id: 'wiki-right-to-repair',
    title: 'Right to repair - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Right_to_repair',
    type: 'wiki',
    description: 'Overview of manufacturer repair monopolies and consumer choice issues',
  },
  {
    id: 'wiki-background-checks',
    title: 'Universal background check - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Universal_background_check',
    type: 'wiki',
    description: '85-95% public support across demographics',
  },
  {
    id: 'politifact-claims',
    title: 'PolitiFact Fact-Checking',
    organization: 'PolitiFact',
    url: 'https://www.politifact.com/',
    type: 'wiki',
  },
  {
    id: 'wiki-safe-banking-act',
    title: 'SAFE Banking Act - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/SAFE_Banking_Act',
    type: 'wiki',
    description: 'Overview of cannabis banking legislation and bipartisan support',
  },
];

// ============================================
// COMBINED BIBLIOGRAPHY
// ============================================

export const allSources: BibliographyEntry[] = [
  ...pollingSources,
  ...newsSources,
  ...researchSources,
  ...governmentSources,
  ...academicSources,
  ...advocacySources,
  ...referenceSources,
];

// ============================================
// POLICY-SPECIFIC SOURCE MAPPINGS
// ============================================

/**
 * Maps policy IDs to their primary source citations
 */
export const policySourceMappings: Record<string, string[]> = {
  'universal-basic-income': [
    'niskanen-center',
    'wef-ubi',
    'cbpp-research',
    'epi-research',
  ],
  'federal-job-guarantee': [
    'niskanen-center',
    'jacobin-fjg',
    'epi-research',
  ],
  'medicare-for-all': [
    'cbpp-research',
    'tax-policy-center',
  ],
  'kids-online-safety-act': [
    'issue-one-kosa-poll',
    'eff-digital-rights',
  ],
  'universal-background-checks': [
    'wiki-background-checks',
    'gallup-background-checks',
    'giffords-gun-safety',
    'everytown-research',
    'sandy-hook-promise',
  ],
  'free-and-easy-voter-id': [
    'carter-center-elections',
    'lawyers-democracy-fund',
    'papers-please',
  ],
  'junk-fee-prevention': [
    'cbpp-research',
  ],
  'expanded-child-tax-credit': [
    'navigator-research-ctc',
    'first-five-years-fund',
    'cbpp-research',
  ],
  'supreme-court-term-limits': [
    'newsweek-scotus-term-limits',
  ],
  'ultra-millionaire-wealth-tax': [
    'washington-post-wealth-tax',
    'oxfam-inequality',
    'tax-policy-center',
  ],
  'overturn-citizens-united': [
    'public-integrity',
    'builders-movement-dark-money',
  ],
  'national-service-voluntary': [
    'voices-for-service',
  ],
  'simplified-tax-filing': [
    'tax-policy-center',
  ],
  'social-security-cap': [
    'cbpp-research',
  ],
  'congress-stock-ban': [
    'public-integrity',
  ],
  'congress-term-limits': [],
  'right-to-repair': [
    'wiki-right-to-repair',
    'autobody-news-right-to-repair',
  ],
  'medicare-drug-negotiation': [
    'pa-independent-ira-repeal',
    'cbpp-research',
  ],
  'ai-safety-regulation': [
    'gallup-ai-safety',
    'aipi-deepfakes-poll',
    'time-ai-regulation',
    'eff-digital-rights',
  ],
  'police-accountability-standards': [],
  'affordable-housing-supply': [],
  'mental-health-lifeline-988': [
    'samhsa-988',
  ],
  'foreign-farmland-ownership-ban': [],
  'rural-broadband-access': [
    'pew-municipal-broadband',
    'verge-municipal-broadband',
    'usc-annenberg-broadband',
  ],
  'campaign-finance-disclosure': [
    'builders-movement-dark-money',
    'public-consultation-foreign-funding',
    'disclose-act',
  ],
  'immigration-grand-bargain': [
    'fwd-us-dreamers-poll',
    'grassley-e-verify',
  ],
  'invest-vocational-training': [
    'national-skills-coalition-poll',
    'jpal-vocational-training',
    'gao-job-training-partnership',
  ],
  'raise-minimum-wage': [
    'epi-minimum-wage-poverty',
    'berkeley-irle-minimum-wage',
    'cafe-hayek-minimum-wage',
    'academia-labour-not-commodity',
  ],
  'healthcare-public-option': [
    'kff-public-option',
    'rand-public-option',
    'berkeley-law-public-option',
    'health-economics-review-public-option',
    'macpac-countercyclical-medicaid',
  ],
  'expand-nuclear-energy': [
    'doe-advance-act',
    'harvard-law-advance-act',
  ],
  'cannabis-banking': [
    'wiki-safe-banking-act',
  ],
  'universal-pre-k': [
    'georgetown-pre-k',
    'mdrc-pre-k',
  ],
  'buy-american-mandates': [
    'us-chamber-buy-american',
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSourceById(id: string): BibliographyEntry | undefined {
  return allSources.find((source) => source.id === id);
}

export function getSourcesByPolicy(policyId: string): BibliographyEntry[] {
  const sourceIds = policySourceMappings[policyId] || [];
  return sourceIds
    .map((id) => getSourceById(id))
    .filter((source): source is BibliographyEntry => source !== undefined);
}

export function getSourcesByType(type: BibliographyEntry['type']): BibliographyEntry[] {
  return allSources.filter((source) => source.type === type);
}

export function searchSources(query: string): BibliographyEntry[] {
  const lowerQuery = query.toLowerCase();
  return allSources.filter(
    (source) =>
      source.title.toLowerCase().includes(lowerQuery) ||
      source.organization?.toLowerCase().includes(lowerQuery) ||
      source.description?.toLowerCase().includes(lowerQuery)
  );
}
