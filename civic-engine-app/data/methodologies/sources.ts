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
  {
    id: 'quinnipiac-background-checks-poll',
    title: 'Quinnipiac University Poll on Background Checks',
    organization: 'Quinnipiac University',
    url: 'https://poll.qu.edu/',
    type: 'poll',
    description: '93% support for universal background checks',
  },
  {
    id: 'voteriders-id-research',
    title: 'Millions of Americans Don\'t Have ID',
    organization: 'VoteRiders',
    url: 'https://www.voteriders.org/voter-id-research/',
    type: 'poll',
    description: '29 million eligible voters lack current driver\'s license; 7+ million lack photo ID; citizens of color 4x more likely to lack ID',
  },
  {
    id: 'poll-foreign-farmland-ban',
    title: 'Polling on Foreign Farmland Ownership Restrictions',
    organization: 'Various',
    type: 'poll',
    description: '80% of voters support restricting foreign adversary farmland ownership',
  },
  {
    id: 'poll-minimum-wage-17',
    title: 'Polling on $17 Minimum Wage',
    organization: 'Various',
    type: 'poll',
    description: '70% of Americans favor raising the minimum wage',
  },
  {
    id: 'kff-public-option-polling',
    title: 'KFF Health Tracking Poll: Public Option Support',
    organization: 'Kaiser Family Foundation',
    url: 'https://www.kff.org/health-reform/poll-finding/',
    type: 'poll',
    description: '65-68% support a government-run public option',
  },
  {
    id: 'gallup-nuclear-energy-poll',
    title: 'Gallup: Nuclear Energy Support',
    organization: 'Gallup',
    url: 'https://news.gallup.com/',
    type: 'poll',
    description: '59-61% public support for nuclear energy, up from historical lows',
  },
  // Cannabis Banking Sources
  {
    id: 'gallup-pre-k-poll',
    title: 'In U.S., 70% Favor Federal Funds to Expand Pre-K Education',
    organization: 'Gallup',
    url: 'https://news.gallup.com/poll/175646/favor-federal-funds-expand-pre-education.aspx',
    type: 'poll',
    description: '70% of Americans favor federal funding for universal pre-K, including a majority of Republicans',
  },
  // Police Accountability Sources
  {
    id: 'vop-police-reform-survey',
    title: 'Voters on Police Reform Survey',
    organization: 'Voice of the People',
    type: 'poll',
    description: '80%+ support prosecuting officers who use excessive force',
  },
  {
    id: 'ap-norc-police-poll',
    title: 'AP-NORC Poll on Police Reform',
    organization: 'AP-NORC Center for Public Affairs Research',
    url: 'https://apnorc.org/',
    type: 'poll',
    description: '81% support national misconduct registry (70% Republicans, 91% Democrats)',
  },
  // 988 Mental Health Lifeline Sources
  {
    id: 'nami-988-poll',
    title: 'NAMI Poll on 988 Lifeline',
    organization: 'National Alliance on Mental Illness',
    url: 'https://www.nami.org/',
    type: 'poll',
    description: '85%+ say 988 is essential service; 86% say funding should be priority',
  },
  {
    id: 'ipsos-988-awareness',
    title: 'Ipsos Poll on 988 Awareness',
    organization: 'Ipsos',
    url: 'https://www.ipsos.com/',
    type: 'poll',
    description: '74% of Americans aware of 988; 6% have called for themselves or others',
  },
  {
    id: 'nami-mental-health-poll',
    title: 'NAMI Mental Health Spending Poll',
    organization: 'National Alliance on Mental Illness',
    url: 'https://www.nami.org/',
    type: 'poll',
    description: '64% say country spends too little on mental health services',
  },
  // Affordable Housing Sources
  {
    id: 'community-progress-nhia',
    title: 'Neighborhood Homes Investment Act Overview',
    organization: 'Center for Community Progress',
    url: 'https://communityprogress.org/',
    type: 'poll',
    description: 'NHIA projected to support 500,000 homes, 1.1M jobs, $151B economic activity',
  },
  {
    id: 'public-consultation-housing',
    title: 'Public Consultation on Affordable Housing',
    organization: 'Public Consultation',
    url: 'https://publicconsultation.org/',
    type: 'poll',
    description: '71% support federal investment in affordable housing',
  },
  {
    id: 'bpc-housing-vouchers-poll',
    title: 'BPC Poll on Housing Tax Credits',
    organization: 'Bipartisan Policy Center',
    url: 'https://bipartisanpolicy.org/',
    type: 'poll',
    description: '73% favor tax credits for building middle-income affordable homes',
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
  // V3 Needs-Model Sources
  {
    id: 'pgpf-social-security-tax-cap',
    title: 'Should We Eliminate the Social Security Tax Cap?',
    organization: 'Peter G. Peterson Foundation',
    url: 'https://www.pgpf.org/article/should-we-eliminate-the-social-security-tax-cap-here-are-the-pros-and-cons/',
    type: 'research',
    description: 'Analysis of Social Security tax cap elimination options and impacts on solvency',
  },
  {
    id: 'moneywise-donut-hole-proposal',
    title: 'This "Donut Hole" Social Security Proposal Will Increase Taxes on Americans Earning Above $400K',
    organization: 'Moneywise',
    url: 'https://moneywise.com/taxes/this-donut-hole-social-security-proposal',
    type: 'research',
    description: '87% support for donut hole proposal; eliminates 60-66% of funding shortfall',
  },
  {
    id: 'rady-ucsd-stock-trading-trust',
    title: 'Congressional Stock Trading Severely Undermines Public Trust and Compliance with the Law',
    organization: 'UC San Diego Rady School of Management',
    url: 'https://rady.ucsd.edu/why/news/2025/05-20-congressional-stock-trading-severely-undermines-public-trust-and-compliance-with-the-law.html',
    year: 2025,
    type: 'research',
    description: 'Research showing exposure to Congress stock trading erodes trust and willingness to follow laws',
  },
  {
    id: 'fulcrum-term-limits-pros-cons',
    title: 'Pros and Cons of Congressional Term Limits',
    organization: 'The Fulcrum',
    url: 'https://thefulcrum.us/democracy/congressional-term-limits',
    type: 'research',
    description: 'Analysis of term limits showing potential increase in corruption and reliance on lobbyists',
  },
  {
    id: 'repair-association-legislation',
    title: 'Legislation and Policy Objectives',
    organization: 'The Repair Association',
    url: 'https://www.repair.org/legislation',
    type: 'research',
    description: 'Overview of right to repair legislation status and policy objectives',
  },
  {
    id: 'pirg-farmers-right-to-repair',
    title: 'Why Farmers Need Right to Repair',
    organization: 'PIRG Education Fund',
    url: 'https://pirg.org/edfund/resources/why-farmers-need-right-to-repair-2/',
    type: 'research',
    description: '95% of farmers support Right to Repair; 92% say it would save them money',
  },
  {
    id: 'car-coalition-national-survey',
    title: 'National Survey: Consumers Overwhelmingly Support a National Vehicle Right-to-Repair Law',
    organization: 'CAR Coalition',
    url: 'https://carcoalition.com/national-survey-consumers-overwhelmingly-support-a-national-vehicle-right-to-repair-law/',
    type: 'research',
    description: '84% of Americans support right-to-repair laws requiring manufacturer repair access',
  },
  {
    id: 'econone-right-to-repair-environmental',
    title: 'Right to Repair Environmental Impact',
    organization: 'Econ One',
    url: 'https://econone.com/resources/blogs/right-to-repair-environmental-impact/',
    type: 'research',
    description: 'Analysis of environmental benefits from right to repair policies',
  },
  // Immigration Grand Bargain Sources
  {
    id: 'abic-immigration-rhetoric',
    title: 'Pushing Back on Expected False Anti-Immigrant Rhetoric in Forthcoming Senate Debate on Budget Resolution',
    organization: 'American Business Immigration Coalition',
    url: 'https://abic.us/pushing-back-on-expected-false-anti-immigrant-rhetoric-in-forthcoming-senate-debate-on-budget-resolution/',
    type: 'research',
    description: 'Legalization of Dreamers could boost U.S. GDP by $121 billion per year and increase tax revenues by $31 billion annually',
  },
  {
    id: 'dignity-act-everify',
    title: 'Dignity Act Immigration Reform Bill Proposes Mandatory E-Verify and Path to Citizenship for Undocumented Immigrants',
    organization: 'I-9 Compliance',
    url: 'https://www.i-9compliance.com/news-updates/dignity-act-immigration-reform-bill-proposes-mandatory-e-verify-and-path-to-citizenship-for-undocumented-immigrants/',
    type: 'research',
    description: 'Analysis of the Dignity Act combining E-Verify with Dreamer citizenship',
  },
  // Vocational Training Sources
  {
    id: 'national-skills-coalition-perspectives',
    title: 'Public Perspectives',
    organization: 'National Skills Coalition',
    url: 'https://nationalskillscoalition.org/public-perspectives/',
    type: 'research',
    description: '82% of voters favor more government funding for skills training',
  },
  {
    id: 'sheeo-workforce-grants-study',
    title: 'The Effects of Workforce-Aligned Grants on College Enrollment and Credential Completion',
    organization: 'University of Kentucky / SHEEO',
    url: 'https://sheeo.org/wp-content/uploads/2025/05/WAGA_SHEEO_May2025_v3.pdf',
    year: 2025,
    type: 'research',
    description: 'Research on vocational training program effectiveness',
  },
  {
    id: 'intercoast-vocational-advantage',
    title: 'Vocational Advantage: Fast-Track in Competitive Market',
    organization: 'InterCoast Colleges',
    url: 'https://intercoast.edu/articles/the-vocational-advantage-fast-tracking-careers-in-a-competitive-world/',
    type: 'research',
    description: 'Analysis of vocational training benefits for career advancement',
  },
  {
    id: 'sciencedirect-vocational-education',
    title: 'No experience, no employment: The effect of vocational education',
    organization: 'ScienceDirect',
    url: 'https://www.sciencedirect.com/science/article/pii/S0272775720305513',
    type: 'research',
    description: 'Research on vocational program graduates enjoying significant wage premium and faster employment',
  },
  // Background Checks Sources
  {
    id: 'bu-sph-background-checks-homicide',
    title: 'Universal Background Checks Lower Homicide Rates',
    organization: 'Boston University School of Public Health',
    url: 'https://www.bu.edu/sph/news/articles/2019/universal-background-checks-lower-homicide-rates/',
    year: 2019,
    type: 'research',
    description: 'States requiring universal background checks for all gun sales had 15% lower homicide rates',
  },
  {
    id: 'everytown-background-check-laws',
    title: 'Update Background Check Laws',
    organization: 'Everytown Research & Policy',
    url: 'https://everytownresearch.org/report/update-background-check-laws/',
    type: 'research',
    description: 'Analysis showing background check laws correlate with lower gun trafficking',
  },
  {
    id: 'pmc-background-check-policies',
    title: 'Effects of Comprehensive Background-Check Policies on Firearm Violence',
    organization: 'PMC / NIH',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10089059/',
    type: 'research',
    description: 'Denying guns to people with violent misdemeanor convictions led to 22% reduction in violent crime arrests',
  },
  // Junk Fee Prevention Sources
  {
    id: 'whitehouse-junk-fees-factsheet',
    title: 'FACT SHEET: President Biden Highlights New Progress on His Competition Agenda',
    organization: 'The White House',
    url: 'https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2023/02/01/fact-sheet-president-biden-highlights-new-progress-on-his-competition-agenda/',
    year: 2023,
    type: 'research',
    description: 'White House fact sheet on junk fee elimination efforts including ticketing, airline, and banking fees',
  },
  // Child Tax Credit Sources
  {
    id: 'census-ctc-poverty-impact',
    title: 'The Impact of the 2021 Expanded Child Tax Credit on Child Poverty',
    organization: 'U.S. Census Bureau',
    url: 'https://www.census.gov/library/working-papers/2022/demo/SEHSD-wp2022-24.html',
    year: 2022,
    type: 'research',
    description: 'CTC expansion lifted 2.1 million children out of poverty; drove child poverty to record low 5.2%',
  },
  {
    id: 'whitehouse-cea-ctc-impacts',
    title: 'The Anti-Poverty and Income-Boosting Impacts of the Enhanced CTC',
    organization: 'White House Council of Economic Advisers',
    url: 'https://bidenwhitehouse.archives.gov/cea/written-materials/2023/11/20/the-anti-poverty-and-income-boosting-impacts-of-the-enhanced-ctc/',
    year: 2023,
    type: 'research',
    description: '2.9 million children lifted out of poverty by the expanded CTC',
  },
  // SCOTUS Term Limits Sources
  {
    id: 'brookings-scotus-term-limits',
    title: 'Term limits—a way to tackle the Supreme Court\'s crisis of legitimacy',
    organization: 'Brookings Institution',
    url: 'https://www.brookings.edu/articles/term-limits-a-way-to-tackle-the-supreme-courts-crisis-of-legitimacy/',
    type: 'research',
    description: '67% of Americans favor term limits; trust in Court at historic lows',
  },
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
  // Cannabis Banking (SAFER Act) Sources
  {
    id: 'csbs-safer-banking-act',
    title: 'CSBS Supports SAFER Banking Act',
    organization: 'Conference of State Bank Supervisors',
    url: 'https://www.csbs.org/safer-banking-act-letter',
    type: 'research',
    description: 'Analysis of SAFER Banking Act benefits for public safety and financial system',
  },
  {
    id: 'jdsupra-state-ags-cannabis-banking',
    title: 'Bipartisan State AGs Urge Congress to Grant Access to Federally Regulated Banking and Financial Services to State-Regulated Cannabis Businesses',
    organization: 'JDSupra / Troutman Pepper Locke',
    url: 'https://www.jdsupra.com/legalnews/bipartisan-state-ags-urge-congress-to-5884912/',
    type: 'research',
    description: '32 state AGs (bipartisan) call cannabis banking a "critical public safety issue"',
  },
  // Universal Pre-K Sources
  {
    id: 'first-focus-early-learning',
    title: 'Research Confirms that Early Learning Investments Increase Benefits to Children, Lower Costs to Taxpayers',
    organization: 'First Focus on Children',
    url: 'https://firstfocus.org/resource/early-learning-research/',
    type: 'research',
    description: 'Research on early education ROI: $2.50+ in savings per $1 invested; reduced crime, higher graduation rates',
  },
  {
    id: 'edweek-pre-k-support',
    title: 'Support for Universal Pre-K Grows as More States Jump on Board',
    organization: 'Education Week',
    url: 'https://www.edweek.org/teaching-learning/support-for-universal-pre-k-grows-as-more-states-jump-on-board/2023/01',
    year: 2023,
    type: 'research',
    description: 'State-level pre-K initiatives and voter support including New Mexico ~70% constitutional amendment',
  },
  {
    id: 'yale-pre-k-parental-income',
    title: 'Free Pre-K Gives Parents\' Income a Long-Lasting Boost',
    organization: 'Yale Insights / Yale School of Management',
    url: 'https://insights.som.yale.edu/insights/free-pre-k-gives-parents-income-long-lasting-boost',
    type: 'research',
    description: 'Research showing free preschool substantially increases parental earnings',
  },
  // Buy American Mandates Sources
  {
    id: 'defense-news-buy-american',
    title: 'Buy American: Biden sees industry pushback as allies warn of trade consequences',
    organization: 'Defense News',
    url: 'https://www.defensenews.com/global/the-americas/2021/11/01/buy-american-biden-sees-industry-pushback-as-allies-warn-of-trade-consequences/',
    year: 2021,
    type: 'news',
    description: 'Analysis of Buy American policy implementation challenges and trade partner concerns',
  },
  {
    id: 'ntu-buy-american-policy',
    title: 'What is President Biden\'s Buy American Policy for 2023?',
    organization: 'National Taxpayers Union',
    url: 'https://www.ntu.org/publications/detail/what-is-president-bidens-buy-american-policy-for-2023',
    year: 2023,
    type: 'research',
    description: 'Analysis of Buy American cost inflation, waiver processes, and foreign retaliation risks',
  },
  {
    id: 'cato-steeled-protectionism',
    title: 'Steeled for Protectionism',
    organization: 'Cato Institute',
    url: 'https://www.cato.org/policy-analysis/steeled-protectionism',
    type: 'research',
    description: 'Policy analysis of Buy American effects: tens of thousands of jobs supported but at high cost per job',
  },
  {
    id: 'tpa-americans-trade-preference',
    title: 'New Cato Institute Poll Shows Americans\' Preference for Trade',
    organization: 'Taxpayers Protection Alliance',
    url: 'https://www.protectingtaxpayers.org/trade/new-cato-institute-poll-shows-americans-preference-for-trade/',
    type: 'poll',
    description: '75% of Americans favor buying American-made products',
  },
  // Drug Price Negotiation Sources
  {
    id: 'kff-drug-prices-opinion',
    title: 'Public Opinion on Prescription Drugs and Their Prices',
    organization: 'Kaiser Family Foundation',
    url: 'https://www.kff.org/health-costs/public-opinion-on-prescription-drugs-and-their-prices/',
    type: 'poll',
    description: '85% public support for government drug price negotiation; 30% skip/ration meds due to cost',
  },
  {
    id: 'aha-drug-prices-shortages',
    title: 'Drug Prices and Shortages Jeopardize Patient Access to Quality Hospital Care',
    organization: 'American Hospital Association',
    url: 'https://www.aha.org/news/blog/2024-05-22-drug-prices-and-shortages-jeopardize-patient-access-quality-hospital-care',
    year: 2024,
    type: 'research',
    description: 'Analysis of how drug prices and shortages affect patient access to care',
  },
  {
    id: 'cms-drug-negotiation-savings',
    title: 'Negotiating for Lower Drug Prices Works, Saves Billions',
    organization: 'Centers for Medicare & Medicaid Services',
    url: 'https://www.cms.gov/newsroom/press-releases/negotiating-lower-drug-prices-works-saves-billions',
    type: 'government',
    description: '22% price reduction on initial drugs; $6B first year savings; $100B over 10 years',
  },
  // AI Safety & Deepfake Sources
  {
    id: 'govtech-ai-deepfakes-protection',
    title: '4 in 5 People Want Protection Against AI Deepfakes',
    organization: 'GovTech',
    url: 'https://www.govtech.com/artificial-intelligence/4-in-5-people-want-protection-against-ai-deepfakes',
    type: 'poll',
    description: '79-84% support for AI deepfake regulation; 92% concerned about AI-generated false political content',
  },
  // Broadband Sources
  {
    id: 'brookings-broadband-health-equity',
    title: 'Digital prosperity: How broadband can deliver health and equity to all communities',
    organization: 'Brookings Institution',
    url: 'https://www.brookings.edu/articles/digital-prosperity-how-broadband-can-deliver-health-and-equity-to-all-communities/',
    type: 'research',
    description: 'Analysis of broadband as essential infrastructure affecting health and social determinants',
  },
  {
    id: 'whitehouse-infrastructure-broadband',
    title: 'Fact Sheet: The Bipartisan Infrastructure Deal',
    organization: 'The White House',
    url: 'https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2021/11/06/fact-sheet-the-bipartisan-infrastructure-deal/',
    year: 2021,
    type: 'government',
    description: '$65 billion allocated for broadband expansion to ensure every American has access',
  },
  // Campaign Finance Disclosure Sources
  {
    id: 'campaign-legal-center-disclosure-poll',
    title: 'Bipartisan Poll Finds Voters Want Stronger Enforcement of Campaign Finance Laws, Increased Transparency in Elections',
    organization: 'Campaign Legal Center',
    url: 'https://campaignlegal.org/update/bipartisan-poll-finds-voters-want-stronger-enforcement-campaign-finance-laws-increased',
    type: 'poll',
    description: '80%+ of voters (all parties) support public disclosure of political contributions',
  },
  {
    id: 'wisconsin-independent-disclose-act',
    title: 'Senate Republicans who complain about liberal \'dark money\' block bill to disclose funders',
    organization: 'The Wisconsin Independent',
    url: 'https://wisconsinindependent.com/politics/senate-republicans-who-complain-about-liberal-dark-money-block-bill-to-disclose-funders/',
    type: 'news',
    description: 'DISCLOSE Act filibustered in 2022 by 49 senators despite 85% public support',
  },
  // Foreign Farmland Ban Sources
  {
    id: 'usda-foreign-farmland-holdings',
    title: 'Foreign Holdings of U.S. Agricultural Land',
    organization: 'U.S. Department of Agriculture',
    url: 'https://www.fsa.usda.gov/programs-and-services/economic-and-policy-analysis/afida/',
    type: 'research',
    description: 'USDA data on foreign ownership of U.S. agricultural land',
  },
  {
    id: 'congress-farmland-security-act',
    title: 'Foreign Adversary Risk Management Act / Farmland Security Act',
    organization: 'U.S. Congress',
    type: 'research',
    description: 'Bipartisan legislation to restrict foreign adversary farmland purchases',
  },
  {
    id: 'state-farmland-restrictions',
    title: 'State Laws Restricting Foreign Ownership of Farmland',
    organization: 'National Agricultural Law Center',
    url: 'https://nationalaglawcenter.org/',
    type: 'research',
    description: '20+ states have enacted restrictions on foreign farmland ownership',
  },
  // Minimum Wage Sources
  {
    id: 'cbo-minimum-wage-analysis-2024',
    title: 'The Effects on Employment and Family Income of Increasing the Federal Minimum Wage',
    organization: 'Congressional Budget Office',
    url: 'https://www.cbo.gov/publication/55681',
    type: 'research',
    description: 'CBO analysis: $17 wage would affect 8.9 million workers directly; potential 1.3 million job reduction',
  },
  {
    id: 'epi-minimum-wage-research',
    title: 'Minimum Wage Research',
    organization: 'Economic Policy Institute',
    url: 'https://www.epi.org/minimum-wage-tracker/',
    type: 'research',
    description: 'Research on minimum wage effects on workers and economy',
  },
  {
    id: 'dol-minimum-wage-history',
    title: 'History of Federal Minimum Wage Rates',
    organization: 'U.S. Department of Labor',
    url: 'https://www.dol.gov/agencies/whd/minimum-wage/history',
    type: 'research',
    description: 'Federal minimum wage has been $7.25 since 2009',
  },
  // Healthcare Public Option Sources
  {
    id: 'urban-institute-public-option-analysis',
    title: 'Public Option Analysis',
    organization: 'Urban Institute',
    url: 'https://www.urban.org/',
    type: 'research',
    description: 'Analysis of public option coverage expansion and cost effects',
  },
  {
    id: 'commonwealth-fund-coverage-options',
    title: 'Public Option: A Path to Universal Coverage',
    organization: 'The Commonwealth Fund',
    url: 'https://www.commonwealthfund.org/',
    type: 'research',
    description: 'Analysis of public option as pathway to universal coverage',
  },
  // Nuclear Energy Sources
  {
    id: 'eia-nuclear-energy-statistics',
    title: 'Nuclear Energy Statistics',
    organization: 'U.S. Energy Information Administration',
    url: 'https://www.eia.gov/nuclear/',
    type: 'research',
    description: 'Nuclear provides ~20% of U.S. electricity',
  },
  {
    id: 'nei-nuclear-benefits',
    title: 'Nuclear Energy Benefits',
    organization: 'Nuclear Energy Institute',
    url: 'https://www.nei.org/',
    type: 'research',
    description: 'Analysis of nuclear energy jobs, reliability, and climate benefits',
  },
  {
    id: 'congress-advance-act',
    title: 'ADVANCE Act (Accelerating Deployment of Versatile, Advanced Nuclear for Clean Energy)',
    organization: 'U.S. Congress',
    type: 'research',
    description: 'Passed Senate 88-2; streamlines nuclear regulations and supports advanced reactors',
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
  // Universal Basic Income Sources
  {
    id: 'basicincome-ubi-support-poll',
    title: 'United States: American citizens support for UBI rises four times compared to a decade ago',
    organization: 'Basic Income Earth Network',
    url: 'https://basicincome.org/news/2018/07/united-states-american-citizens-support-for-ubi-rises-four-times-compared-to-a-decade-ago/',
    type: 'academic',
    description: '~55% public support for UBI in the U.S., with higher support among younger people and Democrats',
  },
  {
    id: 'scientific-american-ubi-poverty',
    title: 'The U.S. Could Help Solve Its Poverty Problem with a Universal Basic Income',
    organization: 'Scientific American',
    url: 'https://www.scientificamerican.com/article/the-u-s-could-help-solve-its-poverty-problem-with-a-universal-basic-income/',
    type: 'academic',
    description: 'UBI could broadly eliminate poverty in the U.S. if set at a sufficient level; 2021 CTC lifted 3.7M children out of poverty',
  },
  {
    id: 'vox-stockton-ubi-experiment',
    title: 'Stockton, California, gave people a basic income. It boosted employment.',
    organization: 'Vox',
    url: 'https://www.vox.com/future-perfect/22313272/stockton-basic-income-guaranteed-free-money',
    type: 'news',
    description: 'Stockton UBI recipients were twice as likely to secure full-time jobs; lower crime rates, improved mental health',
  },
  {
    id: 'wikipedia-ubi',
    title: 'Universal basic income - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Universal_basic_income',
    type: 'wiki',
    description: 'Overview of UBI proposals, including Andrew Yang $1,000/month proposal',
  },
  // Federal Job Guarantee Sources
  {
    id: 'jacobin-job-guarantee-poll',
    title: 'Americans Across the Political Divide Want a Federal Job Guarantee',
    organization: 'Jacobin',
    url: 'https://jacobin.com/2024/05/cwcp-job-guarantee-poll',
    type: 'poll',
    description: '58% of Americans support a job guarantee; 72% Democrats, 44% Republicans',
  },
  {
    id: 'job-guarantee-now-org',
    title: 'Job Guarantee',
    organization: 'JobGuaranteeNow.org / PolicyLink',
    url: 'https://jobguaranteenow.org/',
    type: 'advocacy',
    description: 'FJG would eliminate involuntary unemployment, reduce poverty, raise floor for all low-wage workers',
  },
  // Medicare for All Sources
  {
    id: 'public-citizen-m4a-fact-check',
    title: 'FACT CHECK: Medicare for All Would Save the U.S. Trillions; Public Option Would Leave Millions Uninsured',
    organization: 'Public Citizen',
    url: 'https://www.citizen.org/news/fact-check-medicare-for-all-would-save-the-u-s-trillions-public-option-would-leave-millions-uninsured-not-garner-savings/',
    type: 'advocacy',
    description: 'M4A could save ~68,000 lives per year, $450B/year, eliminate medical debt; single-payer reduces admin costs',
  },
  {
    id: 'dataforprogress-gnd-m4a-support',
    title: 'The Green New Deal Is Popular',
    organization: 'Data for Progress',
    url: 'https://www.dataforprogress.org/the-green-new-deal-is-popular',
    type: 'poll',
    description: '~63% Americans support Medicare for All; 85% Democrats, 38% Republicans',
  },
  // Police Accountability Research
  {
    id: 'uc-deescalation-study',
    title: 'De-escalation Training Reduces Police Use of Force',
    organization: 'University of Cincinnati',
    type: 'academic',
    description: 'Research showing de-escalation training reduces use-of-force incidents by 28% and civilian injuries by 26%',
  },
  // Ultra-Millionaire Wealth Tax Sources
  {
    id: 'warren-ultra-millionaire-tax',
    title: 'Warren, Jayapal, Boyle Introduce Ultra-Millionaire Tax on Fortunes Over $50 Million',
    organization: 'U.S. Senator Elizabeth Warren',
    url: 'https://www.warren.senate.gov/newsroom/press-releases/warren-jayapal-boyle-introduce-ultra-millionaire-tax-on-fortunes-over-50-million',
    year: 2021,
    type: 'government',
    description: '2% tax on wealth >$50M, 3% on >$1B; ~$3 trillion over 10 years; targets top 0.05%',
  },
  {
    id: 'reason-wealth-tax-impacts',
    title: 'Switzerland just rejected a new wealth tax. Will California lawmakers learn?',
    organization: 'Reason Magazine',
    url: 'https://reason.com/2025/12/03/switzerland-just-overwhelmingly-rejected-a-new-wealth-tax-will-california-lawmakers-learn/',
    year: 2025,
    type: 'news',
    description: 'Analysis of wealth tax impacts including potential capital flight and economic effects',
  },
  // Voluntary National Service Sources
  {
    id: 'fulcrum-americorps-impact',
    title: 'AmeriCorps: They Killed a Piece of America',
    organization: 'The Fulcrum',
    url: 'https://thefulcrum.us/bridging-common-ground/americorps-impact-on-us',
    year: 2023,
    type: 'news',
    description: 'Personal accounts of AmeriCorps service; $4 return per $1 invested; builds houses, civic engagement',
  },
  // Simplified Tax Filing Sources
  {
    id: 'economic-security-project-direct-file',
    title: 'The Impact of Direct File—by the Numbers',
    organization: 'Economic Security Project',
    url: 'https://economicsecurityproject.org/resource/direct-file-report/',
    year: 2024,
    type: 'research',
    description: '$5-12 billion in unclaimed tax credits; $11 billion in time/fees saved annually',
  },
  {
    id: 'treasury-direct-file-announcement',
    title: 'U.S. Department of the Treasury, IRS Announce 30 Million...',
    organization: 'U.S. Department of the Treasury',
    url: 'https://home.treasury.gov/news/press-releases/jy2629',
    type: 'government',
    description: 'Treasury announcement on Direct File expansion; 94% user satisfaction',
  },
  {
    id: 'mn-budget-direct-file',
    title: 'Trump administration plans to end Direct File, removing a vital option to save time and money when filing taxes',
    organization: 'Minnesota Budget Project',
    url: 'https://mnbudgetproject.org/blog/trump-administration-plans-to-end-direct-file-removing-a-vital-option-to-save-time-and-money-when-filing-taxes',
    type: 'research',
    description: 'Analysis of Direct File benefits and policy implications',
  },
  // Overturn Citizens United Sources
  {
    id: 'issue-one-citizens-united-polling',
    title: 'New polling illuminates how the Supreme Court got Citizens United wrong',
    organization: 'Issue One',
    url: 'https://issueone.org/press/new-polling-citizens-united-money-in-politics-reforms/',
    year: 2025,
    type: 'poll',
    description: '72% support overturning Citizens United; 79% say unlimited spending undermines democracy',
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
  // Mental Health and Crisis Response
  {
    id: 'apha-crisis-response',
    title: 'APHA Policy Statement on Crisis Response',
    organization: 'American Public Health Association',
    url: 'https://www.apha.org/',
    type: 'advocacy',
    description: 'APHA policy on mental health crisis response and reducing police involvement',
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
  {
    id: 'kosa-wikipedia',
    title: 'Kids Online Safety Act - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Kids_Online_Safety_Act',
    type: 'wiki',
    description: 'Overview of KOSA legislation; passed Senate 91-3 in 2024',
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
    'basicincome-ubi-support-poll',
    'scientific-american-ubi-poverty',
    'vox-stockton-ubi-experiment',
    'wikipedia-ubi',
  ],
  'federal-job-guarantee': [
    'jacobin-job-guarantee-poll',
    'job-guarantee-now-org',
  ],
  'medicare-for-all': [
    'public-citizen-m4a-fact-check',
    'dataforprogress-gnd-m4a-support',
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
    'warren-ultra-millionaire-tax',
    'reason-wealth-tax-impacts',
    'oxfam-inequality',
  ],
  'overturn-citizens-united': [
    'issue-one-citizens-united-polling',
    'public-integrity',
    'builders-movement-dark-money',
  ],
  'national-service-voluntary': [
    'fulcrum-americorps-impact',
    'voices-for-service',
  ],
  'simplified-tax-filing': [
    'economic-security-project-direct-file',
    'treasury-direct-file-announcement',
    'mn-budget-direct-file',
  ],
  'social-security-cap': [
    'pgpf-social-security-tax-cap',
    'moneywise-donut-hole-proposal',
    'cbpp-research',
  ],
  'congress-stock-ban': [
    'rady-ucsd-stock-trading-trust',
    'public-integrity',
  ],
  'congress-term-limits': [
    'fulcrum-term-limits-pros-cons',
  ],
  'right-to-repair': [
    'repair-association-legislation',
    'pirg-farmers-right-to-repair',
    'car-coalition-national-survey',
    'econone-right-to-repair-environmental',
    'wiki-right-to-repair',
    'autobody-news-right-to-repair',
  ],
  'medicare-drug-negotiation': [
    'pa-independent-ira-repeal',
    'cbpp-research',
    'kff-drug-prices-opinion',
    'aha-drug-prices-shortages',
    'cms-drug-negotiation-savings',
  ],
  'ai-safety-regulation': [
    'gallup-ai-safety',
    'aipi-deepfakes-poll',
    'time-ai-regulation',
    'eff-digital-rights',
    'govtech-ai-deepfakes-protection',
  ],
  'police-accountability-standards': [
    'vop-police-reform-survey',
    'ap-norc-police-poll',
    'uc-deescalation-study',
    'apha-crisis-response',
  ],
  'affordable-housing-supply': [
    'community-progress-nhia',
    'public-consultation-housing',
    'bpc-housing-vouchers-poll',
  ],
  'mental-health-lifeline-988': [
    'nami-988-poll',
    'ipsos-988-awareness',
    'apha-crisis-response',
    'nami-mental-health-poll',
    'samhsa-988',
  ],
  'foreign-farmland-ownership-ban': [
    'usda-foreign-farmland-holdings',
    'congress-farmland-security-act',
    'state-farmland-restrictions',
    'poll-foreign-farmland-ban',
  ],
  'rural-broadband-access': [
    'pew-municipal-broadband',
    'verge-municipal-broadband',
    'usc-annenberg-broadband',
    'brookings-broadband-health-equity',
    'whitehouse-infrastructure-broadband',
  ],
  'campaign-finance-disclosure': [
    'builders-movement-dark-money',
    'public-consultation-foreign-funding',
    'disclose-act',
    'campaign-legal-center-disclosure-poll',
    'wisconsin-independent-disclose-act',
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
    'cbo-minimum-wage-analysis-2024',
    'epi-minimum-wage-research',
    'dol-minimum-wage-history',
    'poll-minimum-wage-17',
    'epi-minimum-wage-poverty',
    'berkeley-irle-minimum-wage',
  ],
  'healthcare-public-option': [
    'kff-public-option-polling',
    'urban-institute-public-option-analysis',
    'commonwealth-fund-coverage-options',
    'kff-public-option',
    'rand-public-option',
    'berkeley-law-public-option',
    'health-economics-review-public-option',
  ],
  'expand-nuclear-energy': [
    'eia-nuclear-energy-statistics',
    'nei-nuclear-benefits',
    'congress-advance-act',
    'gallup-nuclear-energy-poll',
    'doe-advance-act',
    'harvard-law-advance-act',
  ],
  'cannabis-banking': [
    'wiki-safe-banking-act',
    'csbs-safer-banking-act',
    'jdsupra-state-ags-cannabis-banking',
  ],
  'universal-pre-k': [
    'gallup-pre-k-poll',
    'first-focus-early-learning',
    'edweek-pre-k-support',
    'yale-pre-k-parental-income',
    'georgetown-pre-k',
    'mdrc-pre-k',
  ],
  'buy-american-mandates': [
    'us-chamber-buy-american',
    'defense-news-buy-american',
    'ntu-buy-american-policy',
    'cato-steeled-protectionism',
    'tpa-americans-trade-preference',
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
