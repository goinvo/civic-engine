/**
 * Education Quality - Implementation Approaches
 */

import type { ImplementationApproach } from '@/types/problem-areas';

export const educationApproaches: ImplementationApproach[] = [
  {
    id: 'education-increase-funding',
    problemAreaId: 'education-quality',
    title: 'Increase & Equalize Funding',
    summary:
      'Spend more on education and distribute it more fairly. Poor districts shouldn\'t have poor schools just because property taxes fund them.',
    mechanism: `• Increase state/federal funding to reduce reliance on local property taxes
• Weighted funding formulas (more money for high-need students)
• Facilities funding for crumbling buildings
• Higher teacher salaries to attract and retain talent
• Universal pre-K, full-day kindergarten, smaller class sizes
• Target funding to high-poverty schools specifically`,
    tradeoffs: {
      benefits: [
        'Addresses root inequality (resources follow wealth)',
        'Attracts better teachers with higher pay',
        'Reduces class sizes, improves facilities',
        'Evidence that money matters for poor districts',
        'Most direct way to level the playing field',
      ],
      costs: [
        'Money alone doesn\'t guarantee improvement',
        'Requires significant tax increases',
        'Doesn\'t address curriculum, pedagogy, or governance',
        'Wealthy districts may resist redistribution',
        'Some high-spending districts still underperform',
      ],
    },
    source:
      'State funding equity lawsuits; federal Title I expansion proposals; teacher salary initiatives; state-level funding formula reforms',
    voices_support: [
      {
        persona: 'Teacher in underfunded school (Ms. Leticia Carter, 34)',
        argument:
          'I buy supplies with my own money. My building has no AC. Class sizes are 35. Meanwhile, the suburb 10 miles away has everything. How is that equal opportunity?',
      },
      {
        persona: 'Education finance researcher (Dr. Arthur Chambers, 52)',
        argument:
          'Money matters. The research is clear — increased funding improves outcomes, especially for low-income students. The \'money doesn\'t matter\' crowd is wrong.',
      },
      {
        persona: 'Civil rights advocate (Janice Holloway, 47)',
        argument:
          'School funding tied to property taxes is segregation by another name. Rich neighborhoods get rich schools. It\'s structural racism, and it\'s fixable.',
      },
      {
        persona: 'Parent in poor district (Angela Thornton, 41)',
        argument:
          'My kids\' school has textbooks from 2005 and no librarian. I pay taxes too. Why do zip codes determine my children\'s futures?',
      },
      {
        persona: 'Union president (Dwight Everson, 55)',
        argument:
          'You can\'t expect teachers to perform miracles with no resources. Pay us professionally, give us manageable class sizes, and watch what we can do.',
      },
      {
        persona: 'State legislator (Rep. Dana Flowers, 49)',
        argument:
          'We found money for corporate tax cuts. We can find money for kids. It\'s about priorities, not scarcity.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Fiscal conservative (Wallace Griffith, 56)',
        argument:
          'The US already spends more per pupil than most developed countries. Spending tripled since 1970; outcomes are flat. Money isn\'t the problem.',
      },
      {
        persona: 'School choice advocate (Dr. Sylvia Hawkins, 48)',
        argument:
          'Pouring more money into a broken system just enriches the bureaucracy. Give parents choices; let competition improve quality.',
      },
      {
        persona: 'Suburban taxpayer (Dave Petrosky, 52)',
        argument:
          'I moved here and pay high property taxes specifically for good schools. Now you want to redistribute that to other districts? I already paid.',
      },
      {
        persona: 'Education reformer (Jonathan Mercer, 44)',
        argument:
          'Kansas City spent $2 billion on facilities — Olympic pools, TV studios — and outcomes didn\'t improve. Money without reform is waste.',
      },
      {
        persona: 'Charter school leader (Vanessa Caldwell, 42)',
        argument:
          'We get less per pupil than district schools and outperform them. It\'s not about money; it\'s about what you do with it.',
      },
      {
        persona: 'Economist (Dr. Bernard Hutchins, 59)',
        argument:
          'Diminishing returns. We\'re already past the point where more spending reliably improves outcomes. Governance and incentives matter more.',
      },
    ],
    evidence: [
      'Jackson et al. (2016): 10% increase in per-pupil spending increases adult earnings 7% for low-income students',
      'US spending: ~$15,000 per pupil, among highest in OECD; but unequally distributed',
      'State funding reforms: New Jersey (Abbott districts) showed gains; other states mixed results',
      'International: Countries spending less sometimes outperform US; but they also have less inequality',
    ],
    order: 1,
    icon: 'DollarSign',
  },
  {
    id: 'education-school-choice',
    problemAreaId: 'education-quality',
    title: 'School Choice (Charters, Vouchers, ESAs)',
    summary:
      'Let parents choose where their children go to school. Public money follows the student to traditional public, charter, private, or home school.',
    mechanism: `• Charter schools: publicly funded, independently operated, exempt from some regulations
• Vouchers: public money pays for private school tuition
• Education Savings Accounts (ESAs): funds deposited for families to spend on education
• Open enrollment: attend any public school, not just assigned one
• Magnet schools, specialty programs`,
    tradeoffs: {
      benefits: [
        'Empowers parents with choices',
        'Competition may drive improvement',
        'Escape from failing schools',
        'Innovation in charter sector',
        'Popular among minority families in underserved areas',
      ],
      costs: [
        'Drains funding from traditional public schools',
        'Charters have mixed quality (some great, some terrible)',
        'Vouchers may fund religious/private schools with public money',
        'Selection effects: motivated parents leave, struggling students remain',
        'Undermines community schools as shared civic institution',
      ],
    },
    source:
      'Charter school laws (45 states); voucher programs (various states); ESAs (Arizona, others); DC Opportunity Scholarship; Milwaukee voucher program',
    voices_support: [
      {
        persona: 'Charter school parent (Derrick Holman, 38)',
        argument:
          'My daughter\'s charter school is the best thing that happened to our family. Her zoned school was failing. Why should her future depend on an address?',
      },
      {
        persona: 'Education reformer (Whitney Abbott, 43)',
        argument:
          'Charters proved you can get excellent results with low-income kids. Some charter networks outperform wealthy suburbs. That\'s proof of concept.',
      },
      {
        persona: 'Libertarian (Russell Palmer, 51)',
        argument:
          'Parents know their children better than bureaucrats. Education dollars should follow students. Let families decide, not government.',
      },
      {
        persona: 'Catholic school principal (Sr. Margaret O\'Donnell, 58)',
        argument:
          'We serve low-income immigrant families with a fraction of public school budgets. Vouchers let more families access values-based education.',
      },
      {
        persona: 'Black parent activist (Tonya Richardson, 44)',
        argument:
          'The district failed our kids for decades. Now they say charters are bad? We\'re not waiting. Give us options or get out of the way.',
      },
      {
        persona: 'School choice researcher (Dr. Elena Vasquez, 46)',
        argument:
          'The evidence is mixed on average, but that\'s because some charters are great and some aren\'t — just like traditional schools. Expand what works.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Public school teacher (Mr. Emeka Okonkwo, 47)',
        argument:
          'Charters cherry-pick students, expel the difficult ones back to us, and drain our funding. They\'re not competing fairly.',
      },
      {
        persona: 'School board member (Patricia Brennan, 54)',
        argument:
          'For every kid who leaves for charter, we lose $10,000 but still have the same building, buses, and fixed costs. It\'s fiscal death spiral.',
      },
      {
        persona: 'Rural parent (Kyle Hendricks, 42)',
        argument:
          'Choice is an urban fantasy. There\'s one school within 30 miles. \'Choice\' means nothing to us — except losing funding to charters we can\'t access.',
      },
      {
        persona: 'Integration advocate (Dr. Lorraine Washington, 51)',
        argument:
          'School choice recreates segregation. White families cluster; disadvantaged students concentrate. We\'ve seen this before.',
      },
      {
        persona: 'Public education defender (Raymond Bellini, 57)',
        argument:
          'Public schools are the last shared civic institution. Everyone goes, everyone\'s invested. Choice fragments communities.',
      },
      {
        persona: 'Voucher critic (Sharon Kellerman, 49)',
        argument:
          'Why should my taxes fund religious schools? Private schools can discriminate, teach creationism, hire unqualified teachers. No accountability.',
      },
    ],
    evidence: [
      'Charter performance: CREDO studies show urban charters in some cities significantly outperform; national average is mixed',
      'Voucher studies: Milwaukee, DC show modest positive effects for some; Indiana showed negative effects initially',
      'Fiscal impact: Mixed; depends on funding formula and how money "follows" students',
      'Segregation: Some evidence charters increase stratification; some evidence they serve diverse populations better than assigned schools',
      'Closures: Many charters fail and close — some see this as accountability, others as instability for students',
    ],
    order: 2,
    icon: 'Building2',
  },
  {
    id: 'education-standards-accountability',
    problemAreaId: 'education-quality',
    title: 'Raise Standards & Accountability',
    summary:
      'Set clear expectations for what students should learn, test whether they\'ve learned it, and hold schools accountable for results.',
    mechanism: `• Rigorous academic standards (Common Core or state equivalents)
• Standardized testing to measure progress
• School ratings and report cards (public transparency)
• Consequences for failing schools (turnaround, closure, takeover)
• Teacher evaluations tied to student performance
• Data systems to track student growth`,
    tradeoffs: {
      benefits: [
        'Clear expectations; no hiding low performance',
        'Data helps identify struggling students and schools',
        'Accountability forces action on failing schools',
        'National/state standards ensure consistency',
        'Transparency for parents',
      ],
      costs: [
        '"Teaching to the test" narrows curriculum',
        'High-stakes testing creates stress and gaming',
        'Punishes schools serving hardest-to-reach students',
        'Local control advocates oppose top-down mandates',
        'Tests don\'t measure everything that matters',
      ],
    },
    source:
      'No Child Left Behind (2001); Every Student Succeeds Act (2015); Common Core State Standards; state accountability systems',
    voices_support: [
      {
        persona: 'Civil rights education advocate (Dr. Ronald Jefferson, 53)',
        argument:
          'Before testing, we didn\'t know which schools were failing Black kids. Data exposed the gaps. You can\'t fix what you don\'t measure.',
      },
      {
        persona: 'Standards-based reformer (Christine Ashworth, 47)',
        argument:
          'Common Core raised expectations. Kids can do more than we assumed. High standards and good teaching work together.',
      },
      {
        persona: 'Parent who wants information (Pamela Hartley, 44)',
        argument:
          'I want to know how my kid\'s school performs compared to others. Without data, it\'s all anecdote and spin. Transparency matters.',
      },
      {
        persona: 'Data-driven superintendent (Dr. Warren Osborne, 51)',
        argument:
          'We use testing data to identify struggling students early and intervene. It\'s not about punishment — it\'s about targeting help.',
      },
      {
        persona: 'Business leader (Harriet Feldman, 56)',
        argument:
          'Graduates need to meet standards to succeed in the workforce. Accountability ensures schools actually prepare students for the real world.',
      },
      {
        persona: 'Turnaround specialist (Gregory Hollister, 48)',
        argument:
          'Some schools were failing for decades with no consequences. Accountability finally forced change. Uncomfortable but necessary.',
      },
    ],
    voices_opposition: [
      {
        persona: 'Classroom teacher (Ms. Linda Nguyen, 38)',
        argument:
          'I used to teach history, science, art. Now it\'s test prep from January to May. The joy is gone. Kids are stressed, I\'m stressed, and what are we measuring anyway?',
      },
      {
        persona: 'Whole-child educator (Dr. Carolyn Montague, 52)',
        argument:
          'Education is more than reading and math scores. Creativity, collaboration, critical thinking, character — none of that shows up on standardized tests.',
      },
      {
        persona: 'High-poverty school principal (Roderick Simmons, 49)',
        argument:
          'My school serves refugees, homeless kids, students with trauma. We make huge progress that tests don\'t capture. Then we\'re labeled \'failing\' and punished.',
      },
      {
        persona: 'Anti-testing parent (Noelle Ferguson, 41)',
        argument:
          'My kid had anxiety attacks before state testing. She\'s 9. This isn\'t education — it\'s trauma. We opt out now.',
      },
      {
        persona: 'Local control conservative (Nathan Buckley, 57)',
        argument:
          'Common Core was federal overreach. Who decides what kids learn should be parents and communities, not bureaucrats in DC.',
      },
      {
        persona: 'Testing industry critic (Dr. Marcus Ellsworth, 45)',
        argument:
          'Pearson makes billions on tests that narrow learning and stress kids. Follow the money. Accountability serves testing companies, not children.',
      },
    ],
    evidence: [
      'NAEP trends: Post-NCLB gains in math for low-income and minority students; gains stalled after 2015',
      'Test score validity: Tests predict future academic success reasonably well; don\'t capture all important skills',
      'Accountability effects: Mixed — some evidence of gains, especially in targeted subjects; evidence of narrowed curriculum',
      'Gaming: Documented cases of cheating scandals (Atlanta), "teaching to the test," reclassifying students',
      'International: High-performing countries have high standards but vary widely on testing intensity',
    ],
    order: 3,
    icon: 'ClipboardCheck',
  },
  {
    id: 'education-invest-teachers',
    problemAreaId: 'education-quality',
    title: 'Invest in Teachers',
    summary:
      'Improve education by attracting, supporting, and retaining great teachers. Teachers are the most important in-school factor in student outcomes.',
    mechanism: `• Significant salary increases (competitive with other professions)
• Improve working conditions (smaller classes, prep time, support staff)
• Strengthen teacher preparation programs
• Mentoring and professional development
• Reduce administrative burden and paperwork
• Respect and professional autonomy`,
    tradeoffs: {
      benefits: [
        'Teachers are the #1 school-based factor in outcomes',
        'Addresses teacher shortage and turnover crisis',
        'Attracts stronger candidates to the profession',
        'Improves morale and reduces burnout',
        'Countries with top-performing schools invest heavily in teachers',
      ],
      costs: [
        'Expensive to raise salaries significantly',
        'Higher pay doesn\'t automatically mean better teaching',
        'Union protections may make removing bad teachers hard',
        'Other reforms still needed (curriculum, leadership)',
        'Results take years to materialize',
      ],
    },
    source:
      'Teacher salary proposals; state-level teacher investment initiatives; "Teacher Residency" programs; international models (Finland, Singapore)',
    voices_support: [
      {
        persona: 'Teacher leaving profession (Jennifer Aldridge, 32)',
        argument:
          'I have $60K in student loans and make $42K teaching. My roommate makes $80K in marketing. I love teaching but can\'t afford it. That\'s the crisis.',
      },
      {
        persona: 'School principal (Richard Townsend, 51)',
        argument:
          'I can\'t find qualified math and science teachers. The talent pool has shrunk because smart people can earn twice as much elsewhere. Pay is the problem.',
      },
      {
        persona: 'Finnish education expert (Dr. Sari Lindqvist, 49)',
        argument:
          'In Finland, teaching is as competitive as medicine. We select the best, train them well, and trust them professionally. Pay and respect go together.',
      },
      {
        persona: 'Education researcher (Dr. Constance Boyd, 54)',
        argument:
          'Teacher effectiveness varies enormously — it\'s the biggest in-school factor. Investing in teachers has the highest ROI of any education intervention.',
      },
      {
        persona: 'Parent (Laura Fitzgerald, 39)',
        argument:
          'My kid\'s teacher is amazing. She works 60-hour weeks, spends her own money, and makes $45K. That\'s shameful. Pay her what she\'s worth.',
      },
      {
        persona: 'Union leader (Dolores Ramirez, 52)',
        argument:
          'Teachers aren\'t martyrs who should sacrifice for poverty wages. We\'re professionals. Treat us like it.',
      },
    ],
    voices_opposition: [
      {
        persona: 'School choice advocate (Howard Pennington, 53)',
        argument:
          'We spend plenty on teacher salaries — it\'s the largest budget item. The problem is we can\'t remove bad teachers or reward good ones. Tenure protects mediocrity.',
      },
      {
        persona: 'Fiscal conservative (Gerald Whitmore, 58)',
        argument:
          'Average teacher salary is $65K for 9 months of work plus benefits and pension. They\'re not underpaid — that\'s better than most Americans.',
      },
      {
        persona: 'Education reformer (Dr. Michelle Thorne, 45)',
        argument:
          'Across-the-board raises reward bad teachers equally. We need differentiated pay — more for effective teachers, STEM teachers, hard-to-staff schools.',
      },
      {
        persona: 'Administrator (Stanley Crawford, 54)',
        argument:
          'Some teachers are great; some are terrible. Union rules make it nearly impossible to fire the terrible ones. That\'s a bigger problem than salaries.',
      },
      {
        persona: 'Taxpayer (Beverly Cunningham, 61)',
        argument:
          'Teacher salaries keep rising, but test scores don\'t. We\'re paying more and getting the same. Show me results first.',
      },
      {
        persona: 'Alternative certification advocate (Dr. Brian Holloway, 47)',
        argument:
          'The credential requirements keep talented people out of teaching. A chemistry PhD can\'t teach high school chemistry? The problem is gatekeeping, not pay.',
      },
    ],
    evidence: [
      'Salary competitiveness: Teachers earn 20% less than comparable college graduates; gap widened since 1990s',
      'Shortage: Severe in math, science, special education, high-poverty schools; shortages growing post-pandemic',
      'Teacher effect: One standard deviation improvement in teacher quality = 0.1-0.2 SD student gains (significant)',
      'International: Singapore, Finland, South Korea pay teachers well and attract top graduates; strong outcomes',
      'Pay-for-performance: Mixed evidence; some programs show gains, others don\'t; implementation matters',
    ],
    order: 4,
    icon: 'GraduationCap',
  },
  {
    id: 'education-empower-parents',
    problemAreaId: 'education-quality',
    title: 'Empower Parents / Curriculum Transparency',
    summary:
      'Give parents more say in what and how their children learn. Require transparency about curriculum, classroom materials, and school policies.',
    mechanism: `• Curriculum transparency laws (parents can see all materials)
• Parent notification for controversial content
• Parental rights in educational decisions
• School board elections with higher engagement
• Limits on topics some parents find objectionable (varies: CRT, gender identity, sexual content)
• Opt-out rights for specific lessons or programs`,
    tradeoffs: {
      benefits: [
        'Parents are primary educators; schools should partner',
        'Transparency builds trust',
        'Democratic accountability through school boards',
        'Responds to real concerns about age-appropriateness',
        'Checks on institutional overreach',
      ],
      costs: [
        'Can lead to book bans, chilling effects on teachers',
        'Opens door to politicized curriculum fights',
        'Minority viewpoints may be suppressed',
        'Teachers may self-censor to avoid controversy',
        '"Parent rights" can mask efforts to exclude some students\' realities',
      ],
    },
    source:
      'State "parent rights" laws (Florida, Virginia, others); curriculum transparency requirements; school board movements; book challenge policies',
    voices_support: [
      {
        persona: 'Concerned parent (Michelle Brennan, 42)',
        argument:
          'I found out my 8-year-old was being taught concepts I don\'t agree with — and no one told me. I have a right to know what\'s in the curriculum.',
      },
      {
        persona: 'School board candidate (David Russo, 48)',
        argument:
          'Parents were ignored for years. We elect boards; we fund schools; we should have a voice. This isn\'t extremism — it\'s democracy.',
      },
      {
        persona: 'Religious parent (Ruth Ann Hendricks, 39)',
        argument:
          'My values matter too. Public schools shouldn\'t undermine what we teach at home. Transparency lets us make informed decisions.',
      },
      {
        persona: 'Conservative activist (Garrett Sullivan, 44)',
        argument:
          'Schools have become ideological. CRT, gender ideology, anti-American curriculum — parents are pushing back. That\'s appropriate.',
      },
      {
        persona: 'Classical educator (Dr. Patricia Woodward, 58)',
        argument:
          'Education should focus on knowledge, not activism. Reading, writing, math, history, science — not social engineering. Parents agree.',
      },
      {
        persona: 'Free speech advocate (Noah Barrington, 36)',
        argument:
          'Transparency is pro-information. If curriculum is good, show it. If you\'re hiding it, why?',
      },
    ],
    voices_opposition: [
      {
        persona: 'High school teacher (Franklin Williams, 45)',
        argument:
          'I can\'t teach honest history without discussing race. Now I face parent complaints and board investigations for teaching facts. This is censorship.',
      },
      {
        persona: 'School librarian (Anne-Marie Fontaine, 52)',
        argument:
          'They\'ve challenged 40 books in my district — mostly books with LGBTQ characters or by Black authors. \'Parent rights\' is cover for exclusion.',
      },
      {
        persona: 'LGBTQ student (Taylor Simmons, 16)',
        argument:
          'My existence isn\'t \'controversial content.\' These laws say I shouldn\'t be acknowledged at school. That\'s not parental rights — it\'s erasing me.',
      },
      {
        persona: 'First Amendment lawyer (Jacqueline Hurst, 41)',
        argument:
          'Book bans, curriculum restrictions, viewpoint suppression — this is unconstitutional government overreach dressed as parent empowerment.',
      },
      {
        persona: 'Teacher union rep (Gerald McKinney, 55)',
        argument:
          'Teachers are trained professionals. Would you tell your doctor which procedures to use? Curriculum decisions should be made by educators, not politicians.',
      },
      {
        persona: 'Historian (Dr. Evelyn Rowe, 63)',
        argument:
          'Teaching history honestly means teaching things that make some people uncomfortable. The Tulsa massacre happened. Slavery was brutal. Facts aren\'t ideology.',
      },
    ],
    evidence: [
      'Book bans: ALA reports record book challenges (2021-present), concentrated on LGBTQ and race-related content',
      'Survey data: Parents broadly support curriculum transparency; divided on specific restrictions',
      'Teacher effects: NEA surveys show teachers self-censoring, reporting increased stress; some leaving profession',
      'International: Most democracies give parents less direct control over curriculum than US debates suggest',
      'Political context: School board elections have become nationalized; outside money flows to local races',
    ],
    order: 5,
    icon: 'Users',
  },
];
