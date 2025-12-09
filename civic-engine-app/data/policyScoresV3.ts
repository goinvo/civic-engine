import { V3ImpactScore } from './v3Methodology';

/**
 * V3 Policy Impact Scores using the Needs-Based Framework
 *
 * SCALE: 0-10 where 5 = neutral (no effect)
 * - 0: Extremely harmful
 * - 1-4: Harmful (varying degrees)
 * - 5: No effect / neutral
 * - 6-9: Beneficial (varying degrees)
 * - 10: Extremely beneficial
 *
 * Need Categories (default weights):
 * - physiological (0.25): Food, water, shelter, healthcare
 * - safety (0.30): Security, stability, protection - HIGHEST WEIGHT
 * - community (0.15): Social belonging, civic participation
 * - opportunity (0.20): Employment, education, economic mobility
 * - selfActualization (0.10): Arts, cultural programs, personal fulfillment
 *
 * Dimensions:
 * - populationAffected: 5 = no one, 10 = everyone
 * - essentialToSurvival: 5 = irrelevant, 10 = life-or-death
 * - timeToOutcome: 5 = never, 10 = immediate
 * - feasibility: 5 = impossible, 10 = easy to pass
 */

export const policyImpactScoresV3: Record<string, V3ImpactScore> = {
  // ===========================================
  // HEALTHCARE & PHYSIOLOGICAL NEEDS
  // ===========================================

  'medicare-for-all': {
    needCategories: {
      physiological: {
        score: 10,
        reasoning: 'Directly addresses healthcare - a fundamental physiological need for survival and health maintenance.',
      },
      safety: {
        score: 9,
        reasoning: 'Eliminates medical bankruptcy risk and health-related financial insecurity. Provides stable, guaranteed coverage.',
      },
      opportunity: {
        score: 7,
        reasoning: 'Decouples health insurance from employment, enabling job mobility and entrepreneurship.',
      },
    },
    dimensions: {
      populationAffected: 10,    // Universal: Everyone benefits
      essentialToSurvival: 10,   // Healthcare is literally life-or-death
      timeToOutcome: 7,          // Implementation would take 2-4 years to phase in
      feasibility: 6,            // Major political barriers, but growing support
    },
    rationale: 'M4A scores maximum on physiological needs (healthcare is fundamental) and population reach (universal). Safety score is very high due to financial security benefits. Main limitation is feasibility given political opposition.',
  },

  'healthcare-public-option': {
    needCategories: {
      physiological: {
        score: 8.5,
        reasoning: 'Very positive. Healthcare is essential to maintaining physiological well-being. A public option would extend affordable coverage to millions who are currently uninsured or underinsured, enabling access to preventive care, treatment, and medications.',
      },
      safety: {
        score: 8,
        reasoning: 'Very positive. Health insurance provides financial safety – protection from medical bankruptcy and stress of unexpected health costs. A public option would reduce financial risk families face and acts as safety net for those who lose employer coverage.',
      },
      community: {
        score: 6.5,
        reasoning: 'Moderate positive. Could strengthen community health by increasing overall coverage rates. Public health improves when more people can see doctors and get vaccinations. May create some tension with private insurance industry stakeholders.',
      },
      opportunity: {
        score: 7,
        reasoning: 'Moderate-high positive. Reduces "job lock" – individuals less tied to employers for health coverage. Frees people to pursue entrepreneurship, change careers, or take time for education without losing insurance.',
      },
      selfActualization: {
        score: 6.5,
        reasoning: 'Moderate positive. Good health is foundation for pursuing higher-level goals. If people are less worried about healthcare access and costs, they can focus on personal growth, creativity, and fulfillment.',
      },
    },
    dimensions: {
      populationAffected: 8,     // 27 million uninsured; millions more underinsured or paying high premiums
      essentialToSurvival: 9,    // Healthcare directly tied to survival - life-or-death in emergencies
      timeToOutcome: 6,          // 2-4 years from enactment to full operation
      feasibility: 5,            // 65-68% support but failed in 2009; insurance industry opposition
    },
    rationale: 'Overall score ~7/10 (Very Beneficial). Strongly addresses physiological and safety needs by expanding healthcare access. Enjoys majority public support. Feasibility is main limiting factor – political and industry opposition has blocked it before.',
    methodologyId: 'needs-model/healthcare-public-option',
  },

  'mental-health-988': {
    needCategories: {
      physiological: {
        score: 8,
        reasoning: 'Very positive. Mental health is integral to overall health; crisis intervention prevents suicide and self-harm. Mental health crises are health crises. By strengthening 988, the policy works to protect lives and provide immediate emotional safety. Over 85% of Americans agree 988 is an essential service that should be a funding priority.',
      },
      safety: {
        score: 9,
        reasoning: 'Extremely positive. This is literally a life-saving policy. Suicide prevention and mental health crisis intervention are matters of life and death. Strengthening 988 means when someone is on the brink of suicide, they can quickly reach trained counselors who can de-escalate and connect them to help. Also reduces reliance on police in crisis situations.',
      },
      community: {
        score: 7,
        reasoning: 'Moderate positive. Reduces reliance on police in crisis situations and connects people to appropriate care, improving communal well-being and trust in crisis systems. By routing crises to mental health professionals instead of law enforcement, communities see fewer dangerous police encounters with people in crisis.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Moderate positive. Better mental health support helps individuals recover and participate fully in society. People who receive crisis intervention can return to work, school, and family life rather than suffering prolonged distress or being inappropriately incarcerated.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Moderate positive. Mental health support enables individuals to pursue personal growth and fulfillment. When people get help during crises, they can eventually move toward self-actualization rather than being trapped in cycles of untreated mental illness.',
      },
    },
    dimensions: {
      populationAffected: 6,     // 74% aware of 988; 6% have called; 1 in 5 face mental illness annually
      essentialToSurvival: 9,    // Directly prevents suicide; 85%+ say 988 is essential; 3M calls first year
      timeToOutcome: 8,          // Operational improvements happen quickly; new counselors hired immediately
      feasibility: 6,            // 80% support federal funding; 64% say too little spent on mental health; requires sustained commitment
    },
    rationale: 'Overall score ~6.5/10 (Slightly to Moderately Beneficial). It powerfully targets a crucial safety/health need – preventing suicides and improving crisis response – with profound effects on those directly affected. The high essentiality (saving lives) boosts its value significantly. The slightly lower overall score is mainly due to the narrower portion of population directly impacted at any given time and political nuances of funding it long-term.',
    methodologyId: 'needs-model/mental-health-988',
  },

  // ===========================================
  // ECONOMIC SECURITY & SAFETY NEEDS
  // ===========================================

  'universal-basic-income': {
    needCategories: {
      physiological: {
        score: 8,
        reasoning: 'Cash enables purchasing food, shelter, and other basic needs. Indirect but powerful.',
      },
      safety: {
        score: 10,
        reasoning: 'Maximum financial security - unconditional income floor eliminates destitution risk.',
      },
      opportunity: {
        score: 8,
        reasoning: 'Provides freedom to pursue education, training, entrepreneurship without survival pressure.',
      },
      community: {
        score: 6,
        reasoning: 'May enable more civic participation when not consumed by survival work.',
      },
    },
    dimensions: {
      populationAffected: 10,    // Universal by definition
      essentialToSurvival: 8,    // Indirectly ensures survival through purchasing power
      timeToOutcome: 9,          // Monthly payments begin immediately once implemented
      feasibility: 5,            // High cost, major political barriers - neutral/difficult
    },
    rationale: 'UBI excels on safety needs (financial security) and population reach (universal). High immediate impact once implemented. Main barrier is feasibility.',
  },

  'federal-job-guarantee': {
    needCategories: {
      physiological: {
        score: 8,
        reasoning: 'Guarantees income for purchasing basic needs; also jobs could include community health services.',
      },
      safety: {
        score: 9,
        reasoning: 'Eliminates unemployment risk entirely - powerful safety net for economic security.',
      },
      opportunity: {
        score: 10,
        reasoning: 'Maximum score: guarantees employment opportunity for all who want it.',
      },
      community: {
        score: 8,
        reasoning: 'Public jobs could address community needs; work provides social connection.',
      },
    },
    dimensions: {
      populationAffected: 8,     // Available to all, but only used by unemployed/underemployed
      essentialToSurvival: 8,    // Ensures income but requires ability to work
      timeToOutcome: 8,          // Could begin hiring quickly but full scale takes time
      feasibility: 6,            // Large program, significant implementation challenges
    },
    rationale: 'FJG scores maximum on opportunity (employment guarantee) and very high on safety. Lower feasibility due to operational complexity.',
  },

  'social-security-cap': {
    needCategories: {
      physiological: {
        score: 9,
        reasoning: 'Strong positive. By securing seniors\' income, this policy ensures they can meet basic needs like food and housing. Social Security is often a lifeline preventing hunger and homelessness for the elderly.',
      },
      safety: {
        score: 9,
        reasoning: 'Very strong positive. Provides economic security and stability for a vulnerable population, protecting millions from poverty. Strengthening the trust fund by eliminating ~60-66% of the long-range funding shortfall greatly enhances long-term stability.',
      },
      community: {
        score: 7,
        reasoning: 'Moderate positive. Reducing senior poverty and ensuring retirees\' dignity improves social cohesion and intergenerational trust. Social Security is a social contract that fosters community solidarity.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Slight positive. Relieving younger family members of supporting elderly relatives frees up resources. Older Americans with secure benefits can continue participating in the economy.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Moderate positive. With financial worries eased, retirees can pursue personal fulfillment (hobbies, volunteering) rather than struggling to survive.',
      },
    },
    dimensions: {
      populationAffected: 9,     // ~69M beneficiaries, 9 in 10 seniors rely on it
      essentialToSurvival: 9,    // Without it, 2/3 of elderly would live in poverty
      timeToOutcome: 6,          // Prevents 2033-2035 crisis, long-term benefit
      feasibility: 8,            // 87% support, Social Security 2100 Act has ~200 co-sponsors
    },
    rationale: 'Overall score ~7.8/10. Highly helpful policy that powerfully supports essential physiological and safety needs for a large population. High feasibility given 87% public support.',
    methodologyId: 'needs-model/social-security-cap',
  },

  'minimum-wage-17': {
    needCategories: {
      physiological: {
        score: 8.5,
        reasoning: 'Very positive. Higher minimum wage directly increases ability of low-wage workers to afford food, housing, and healthcare. Current $7.25/hour is widely recognized as inadequate. Raising to $17 would significantly boost purchasing power for millions.',
      },
      safety: {
        score: 7.5,
        reasoning: 'Moderate-high positive. Economic security is key aspect of safety. Workers earning living wage face less financial stress – fewer worries about eviction, utility shutoffs. Some jobs might be lost or hours cut, tempering score slightly.',
      },
      community: {
        score: 6.5,
        reasoning: 'Moderate positive. Minimum wage hike can strengthen communities by reducing inequality and poverty. Workers with more income can participate more fully in local economies. Some small businesses might struggle, potentially affecting community cohesion.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Slight positive with caveats. For workers who keep jobs, higher wages open doors – more ability to save for education, invest in future. CBO estimates suggest some job losses (~1.3M), reducing opportunities for those individuals.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Slight positive. When workers aren\'t scrambling paycheck-to-paycheck, they have more mental bandwidth for personal growth. Valuing work with living wage improves dignity and self-esteem.',
      },
    },
    dimensions: {
      populationAffected: 8,     // 8.9 million workers directly affected; tens of millions with ripple effect
      essentialToSurvival: 8,    // $17/hour = ~$35,000/year - lifts many above poverty line
      timeToOutcome: 7,          // Phased implementation common (5 years); incremental raises
      feasibility: 5,            // 70% support but federal action blocked for 15+ years; many states acted independently
    },
    rationale: 'Overall score ~7/10 (Very Beneficial). Addresses core physiological and safety needs by ensuring workers can afford basics. Broad public support. Score tempered by feasibility challenges and some economic trade-offs.',
    methodologyId: 'needs-model/minimum-wage-17',
  },

  'childcare-tax-credit': {
    needCategories: {
      physiological: {
        score: 9.5,
        reasoning: 'Extremely positive. Directly supports physiological needs by providing money for food, shelter, and healthcare for children. In 2021 expansion, child hunger and material hardship declined. Lifted over 2 million children above poverty line.',
      },
      safety: {
        score: 8.5,
        reasoning: 'Very positive. Economic security in household creates safer, more stable environment for children. Families less likely to face evictions, utility shutoffs, homelessness. Reduces parental stress.',
      },
      community: {
        score: 7,
        reasoning: 'Moderate positive. Reducing child poverty strengthens communities in long run. Policy signals society values supporting children, bolstering social cohesion. Parents may engage more in community activities.',
      },
      opportunity: {
        score: 8.5,
        reasoning: 'Very positive. Investing in children yields large opportunity gains. Reduced poverty means better nutrition and living conditions for learning. Breaks cycles of poverty. Enables parents to afford childcare and pursue work.',
      },
      selfActualization: {
        score: 7,
        reasoning: 'Moderate positive. Alleviating financial strain allows parents and children to pursue higher-level needs. Children in stable homes can focus on learning and creativity. Payments used for enrichment activities.',
      },
    },
    dimensions: {
      populationAffected: 8,     // 35-40 million families; 2.1 million children lifted from poverty in 2021
      essentialToSurvival: 9,    // Drove child poverty to record low 5.2%; used for groceries, rent, utilities
      timeToOutcome: 9,          // Monthly payments within months of enactment; poverty rates dropped within year
      feasibility: 6,            // 85% support but lapsed due to cost concerns; requires hundreds of billions in funding
    },
    rationale: 'Overall score ~8.6/10 (Very Beneficial, Nearly Extremely Beneficial). One of most beneficial policies for human well-being. Powerfully addresses Physiological and Safety needs. Game-changer for reducing child poverty.',
    methodologyId: 'needs-model/expanded-child-tax-credit',
  },

  // ===========================================
  // SAFETY & SECURITY
  // ===========================================

  'universal-background-checks': {
    needCategories: {
      physiological: {
        score: 7,
        reasoning: 'Reducing gun violence has direct effect on preserving life and physical well-being. Every life saved from a shooting preserves basic existence and health. Gun violence is leading cause of premature death (especially for young people).',
      },
      safety: {
        score: 9,
        reasoning: 'Core category. Makes it harder for dangerous individuals to obtain firearms, leading to fewer violent crimes. States with universal background checks had 15% lower homicide rates. Correlates with lower gun trafficking.',
      },
      community: {
        score: 7,
        reasoning: 'Gun violence erodes community fabric. High rates create fear, trauma, and instability. Universal background checks would help restore security and trust in communities. ~93% of Americans agree on this policy.',
      },
      opportunity: {
        score: 5.5,
        reasoning: 'Not directly an economic policy. Indirectly, safer communities improve economic opportunity climate – fewer shootings means more stability for local businesses and better educational outcomes.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'In society with less fear of random violence, individuals can focus more on personal growth, creativity, and community involvement. Frees people from fear, conducive to personal fulfillment.',
      },
    },
    dimensions: {
      populationAffected: 9,     // Virtually entire population benefits - anyone could be victim of gun violence
      essentialToSurvival: 9,    // Literally concerns life and death; ~45,000 Americans killed by guns annually
      timeToOutcome: 8,          // Immediate effect on gun sales; cumulative impact within 1-2 years
      feasibility: 6,            // 93% support but political opposition from NRA; passed House 2019/2021 but blocked in Senate
    },
    rationale: 'Overall score ~8/10 (Very Beneficial). Predominantly targets Safety need (30% weight) with great efficacy – potentially saving thousands of lives. When 93% of Americans agree, benefit is obvious and drawbacks minimal.',
    methodologyId: 'needs-model/universal-background-checks',
  },

  'police-accountability': {
    needCategories: {
      physiological: {
        score: 6,
        reasoning: 'Moderate positive. While not directly providing food or shelter, reducing police violence prevents injuries and deaths. Fewer excessive force incidents means fewer hospitalizations and fatalities, directly preserving physical well-being for those who might otherwise be victims.',
      },
      safety: {
        score: 9,
        reasoning: 'Extremely positive. This is the core strength of the policy. It directly addresses Safety needs by aiming to reduce police violence and protect lives. De-escalation training has been shown to reduce use-of-force incidents by 28% and civilian injuries by 26%. Banning chokeholds and preventing "wandering officers" further protect individuals from harm.',
      },
      community: {
        score: 8,
        reasoning: 'Very positive. Improves trust between law enforcement and communities, especially minorities and others disproportionately affected by police use of force. When police are held accountable, social cohesion and faith in institutions improve. About 81% of Americans support a national misconduct registry.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Moderate positive. Safer communities enable better economic and educational outcomes. When people feel safe interacting with police, they can more freely pursue employment, education, and civic engagement without fear of unjust violence.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Moderate positive. Reduced fear of police violence allows individuals to participate more fully in society, pursue personal goals, and engage in civic life. Communities freed from fear of police misconduct can focus on personal growth and collective progress.',
      },
    },
    dimensions: {
      populationAffected: 9,     // Virtually every community interacts with law enforcement; nationwide impact
      essentialToSurvival: 8,    // Police use of force can be fatal; 28% fewer incidents with de-escalation training
      timeToOutcome: 6,          // Chokehold bans effective immediately; cultural shifts take years
      feasibility: 6,            // 80%+ bipartisan support; 81% support registry; police union resistance remains
    },
    rationale: 'Overall score ~8/10 (Very Beneficial). It addresses a high-weight Safety need with broad population impact and life-saving potential. Research supports that these reforms can reduce police violence and injuries. De-escalation training has proven effectiveness (28% fewer use-of-force incidents). While not without political challenges, the overwhelming public backing (80%+ across parties) and proven strategies make this policy a strong net positive.',
    methodologyId: 'needs-model/police-accountability',
  },

  'kids-online-safety': {
    needCategories: {
      physiological: {
        score: 6,
        reasoning: 'Concerns children\'s health – particularly mental health. Aims to reduce depression, anxiety, and suicidal ideation linked to harmful online content. Youth suicide and self-harm rates linked to social media use.',
      },
      safety: {
        score: 8,
        reasoning: 'Core category for KOSA. Forces platforms to mitigate dangers from predators, cyberbullying, and traumatic content. Imposes penalties on companies whose designs expose kids to harm.',
      },
      community: {
        score: 6.5,
        reasoning: 'Benefits community/social needs by creating healthier online environment. Kids may experience less cyberbullying and hate content. Positive ripple effects for school communities and families.',
      },
      opportunity: {
        score: 5.5,
        reasoning: 'Doesn\'t directly address education or employment. Indirectly, mentally healthier children can focus better on school and personal development.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Safer online space helps youth explore interests and express themselves freely. Fosters conditions for personal growth. However, critics worry about censorship limiting access to information.',
      },
    },
    dimensions: {
      populationAffected: 7,     // ~50 million children and teenagers (~15% of Americans), plus parents/educators
      essentialToSurvival: 7,    // May prevent suicide and dangerous encounters; 93% agree youth mental health is serious problem
      timeToOutcome: 7,          // Benefits within 1-2 years after compliance deadline
      feasibility: 8,            // 86-88% support, passed Senate 91-3, bipartisan backing
    },
    rationale: 'Overall score ~6.5/10 (Slightly Beneficial, on cusp of Very Beneficial). Substantial benefits for mental and emotional safety of tens of millions of children. Scores highest on Safety (most heavily weighted). Implementation must balance safety with rights.',
    methodologyId: 'needs-model/kids-online-safety-act',
  },

  // ===========================================
  // OPPORTUNITY & EDUCATION
  // ===========================================

  'universal-pre-k': {
    needCategories: {
      physiological: {
        score: 6,
        reasoning: 'Pre-K often includes meals and health screenings for children.',
      },
      safety: {
        score: 6,
        reasoning: 'Safe environment for children while parents work.',
      },
      opportunity: {
        score: 10,
        reasoning: 'Maximum opportunity: early education dramatically improves life outcomes, economic mobility.',
      },
      community: {
        score: 7,
        reasoning: 'Socialization, community connection for families with young children.',
      },
    },
    dimensions: {
      populationAffected: 6,     // Families with pre-K age children (~8% of households)
      essentialToSurvival: 5,    // Not survival-critical but important for development
      timeToOutcome: 5,          // Benefits materialize over decades (long-term ROI)
      feasibility: 8,            // 70% support, some states already have it
    },
    rationale: 'Maximum score on opportunity - early education is most impactful intervention. Time to outcome is long (benefits show over lifetime).',
  },

  'vocational-training': {
    needCategories: {
      physiological: {
        score: 7,
        reasoning: 'Indirectly helps meet basic needs of food, shelter, and health by improving employment prospects. A steady job with decent wage allows individuals to afford nutrition, housing, and healthcare.',
      },
      safety: {
        score: 7,
        reasoning: 'A skilled trade job provides economic security, reducing instability and stress from unemployment. Societies with higher employment have lower crime and greater social stability.',
      },
      community: {
        score: 7,
        reasoning: 'Strengthens communities by fostering sense of purpose and belonging. When local industries have skilled workers, communities thrive. Programs involve partnerships with local businesses and mentorship.',
      },
      opportunity: {
        score: 9,
        reasoning: 'This is where the policy shines. Provides alternate educational pathways and career opportunities for a wide segment of population. Skilled trades projected to grow ~10% this decade, far above average.',
      },
      selfActualization: {
        score: 7,
        reasoning: 'Helps individuals find fulfilling careers suited to their talents. Some find great satisfaction in mastering a craft or trade. Dignifies skilled work, allowing people to take pride in trade skills.',
      },
    },
    dimensions: {
      populationAffected: 9,     // Impacts millions - two-thirds of Americans lack bachelor's degrees
      essentialToSurvival: 7,    // Essential to economic survival - employable skills critical to securing basic needs
      timeToOutcome: 7,          // Programs take 6 months to 2 years; results visible within 1-2 years
      feasibility: 9,            // 82% support, rare bipartisan common ground, no significant political roadblocks
    },
    rationale: 'Overall score ~8.5/10 (Very Beneficial, Approaching Extremely Beneficial). Empowers large portion of society to improve livelihoods. Could see reduced unemployment, shrinking skills gap, millions of families moved into middle class.',
    methodologyId: 'needs-model/invest-vocational-training',
  },

  // ===========================================
  // HOUSING & SHELTER
  // ===========================================

  'affordable-housing-supply': {
    needCategories: {
      physiological: {
        score: 9,
        reasoning: 'Very high positive. Housing is one of the most essential physiological needs alongside food, water, and healthcare. This policy directly expands access to shelter. Lack of affordable shelter leads to homelessness and insecurity with severe health and mortality implications. By focusing on entry-level homes and repairs, this helps families achieve stable living conditions.',
      },
      safety: {
        score: 8,
        reasoning: 'Very positive. Stable housing provides safety and security. In distressed areas with vacant homes, this removes dangerous abandoned structures, reduces crime associated with blight, and decreases homelessness – all improving public health and safety. Housing security is a prerequisite for employment, education, and overall well-being.',
      },
      community: {
        score: 8,
        reasoning: 'Very positive. By focusing on distressed neighborhoods with vacant or blighted properties, the policy revitalizes declining areas and prevents displacement. Turning blighted homes into occupied, tax-paying properties strengthens social bonds and community cohesion. It provides homeownership opportunities without displacing communities.',
      },
      opportunity: {
        score: 8,
        reasoning: 'Very positive. Promotes economic opportunity through homeownership and community revitalization. Over a decade, projected to create 1.1 million jobs in construction and generate $151 billion in economic activity. Homeownership builds wealth and stability for families, expanding their opportunities.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Moderate positive. With stable housing secured, families can pursue higher-level goals. Homeownership provides dignity, pride of ownership, and the security needed to invest in personal growth, education, and community involvement.',
      },
    },
    dimensions: {
      populationAffected: 7,     // 500,000 affordable homes over 10 years; 1.1M jobs; benefits urban/suburban/rural distressed communities
      essentialToSurvival: 8,    // Housing is fundamental physiological need; addresses homelessness and housing insecurity
      timeToOutcome: 5,          // Construction takes months to years per project; impact unfolds over 5-10 years
      feasibility: 7,            // 71% support federal investment; 73% favor tax credits; bipartisan backing (63% GOP, 85% Dem)
    },
    rationale: 'Overall score ~7.5/10 (Very Beneficial). It directly addresses the fundamental physiological need for shelter by unlocking development in areas the market has left behind. By closing the appraisal gap and incentivizing private developers, it fills a crucial niche: providing homeownership opportunities and affordable housing without displacing communities. Given strong bipartisan support (71-73%) and achievable design, this policy would significantly increase housing security and economic vitality.',
    methodologyId: 'needs-model/affordable-housing-nhia',
  },

  // ===========================================
  // GOVERNANCE & DEMOCRACY (Community-focused)
  // ===========================================

  'congress-stock-ban': {
    needCategories: {
      physiological: {
        score: 5,
        reasoning: 'Neutral. No direct impact on food, health, or shelter. This policy doesn\'t deliver tangible resources to people.',
      },
      safety: {
        score: 6,
        reasoning: 'Slight positive. Enhancing government integrity contributes to societal stability. Research shows stock trading erodes Americans\' trust and willingness to follow laws.',
      },
      community: {
        score: 7,
        reasoning: 'Significant positive. Addresses social cohesion and trust in government. When lawmakers serve the public interest (not profiteering), it strengthens civic belonging and faith in democracy.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Slight positive. If lawmakers aren\'t influenced by personal stock holdings, they may craft fairer economic policies benefiting employment and opportunity.',
      },
      selfActualization: {
        score: 5,
        reasoning: 'Neutral. No direct effect on personal fulfillment, arts, or culture.',
      },
    },
    dimensions: {
      populationAffected: 6,     // Directly 535 members, but all benefit from ethical government
      essentialToSurvival: 5,    // Not life-or-death, ethical/institutional impact
      timeToOutcome: 9,          // Benefits begin immediately upon enactment
      feasibility: 7,            // 86%+ bipartisan support, but Congress reluctant to self-regulate
    },
    rationale: 'Overall score ~5.8/10. Moderately beneficial - doesn\'t address basic survival needs, but strongly supports fair governance and community trust. Long-term yields healthier democracy.',
    methodologyId: 'needs-model/congress-stock-ban',
  },

  'campaign-finance-disclosure': {
    needCategories: {
      community: {
        score: 8,
        reasoning: 'Transparency enables informed civic participation and democratic accountability.',
      },
    },
    dimensions: {
      populationAffected: 8,     // All voters benefit from transparency
      essentialToSurvival: 5,    // Not survival-related
      timeToOutcome: 9,          // Immediate transparency once implemented
      feasibility: 9,            // 85% support, existing frameworks
    },
    rationale: 'Strong community/democracy policy with high feasibility. Not survival-critical but enables informed civic participation.',
  },

  'congress-term-limits': {
    needCategories: {
      physiological: {
        score: 5,
        reasoning: 'No direct impact. It does not feed, house, or heal anyone.',
      },
      safety: {
        score: 5,
        reasoning: 'Uncertain impact. Research suggests term limits may fail to reduce corruption and can even worsen it - states with term limits saw increases in political corruption events due to inexperienced lawmakers relying on lobbyists.',
      },
      community: {
        score: 6,
        reasoning: 'Mild positive. Voters overwhelmingly favor term limits, so enacting them could boost public satisfaction and the sense that government is "of the people."',
      },
      opportunity: {
        score: 5.5,
        reasoning: 'Neutral to slight positive. Creates opportunities for new leaders by opening seats, but doesn\'t directly translate to jobs or education for the general populace.',
      },
      selfActualization: {
        score: 5,
        reasoning: 'Minimal effect. Might marginally increase citizens\' sense of empowerment but doesn\'t tangibly affect personal fulfillment needs.',
      },
    },
    dimensions: {
      populationAffected: 7,     // Broad but indirect benefit to all citizens
      essentialToSurvival: 5,    // Structural change, not material needs
      timeToOutcome: 5,          // Requires constitutional amendment, takes years
      feasibility: 5,            // 80-87% support but only 9 of 34 states support convention
    },
    rationale: 'Overall score ~5.5/10. Neutral to mildly helpful. Popular but evidence hints it might not significantly improve (and could impair) governance outcomes.',
    methodologyId: 'needs-model/congress-term-limits',
  },

  'scotus-term-limits': {
    needCategories: {
      physiological: {
        score: 5,
        reasoning: 'Neutral. No direct impact on physiological needs. Term limits for justices do not provide food, healthcare, or shelter. Any downstream effects are contingent and not guaranteed.',
      },
      safety: {
        score: 5.5,
        reasoning: 'Slight positive. A more legitimate and regularly refreshed Court contributes to stability of rule of law. If Court is seen as balanced, it can reduce political extremism and conflicts.',
      },
      community: {
        score: 7,
        reasoning: 'Moderate positive. Could strengthen sense of fairness and inclusion in governance. Every president gets to nominate justices regularly. Trust in Court is near historic lows; 67% favor term limits.',
      },
      opportunity: {
        score: 5,
        reasoning: 'Neutral to slight positive. Direct economic or educational opportunities not significantly impacted. A more responsive Court might uphold policies that expand opportunity, but this is speculative.',
      },
      selfActualization: {
        score: 5.5,
        reasoning: 'Slight positive. If citizens see Court composition as reflecting electoral choices, they may feel more empowered. Alleviates feelings of helplessness when Court issues controversial rulings.',
      },
    },
    dimensions: {
      populationAffected: 7,     // All Americans affected by Court decisions; 78% support
      essentialToSurvival: 5,    // No direct impact on survival needs
      timeToOutcome: 4,          // Very slow; could take 18 years to cycle all seats; may require constitutional amendment
      feasibility: 5,            // Legal/political hurdles; may require constitutional amendment; Congress hasn't acted
    },
    rationale: 'Overall score ~5.6/10 (Slightly Beneficial). Mild net benefit – largely neutral on material needs but offers democratic and institutional gains. Beneficial for democracy but effects on immediate well-being are limited and mostly intangible.',
    methodologyId: 'needs-model/supreme-court-term-limits',
  },

  'end-citizens-united': {
    needCategories: {
      community: {
        score: 8,
        reasoning: 'Restores democratic voice by limiting corporate political influence.',
      },
    },
    dimensions: {
      populationAffected: 8,     // All voters affected by campaign finance
      essentialToSurvival: 5,    // Not survival-related
      timeToOutcome: 6,          // Would take time to see effects
      feasibility: 5,            // Requires constitutional amendment - extremely difficult
    },
    rationale: '72% support but requires constitutional amendment. High community benefit if achieved.',
  },

  'free-easy-voter-id': {
    needCategories: {
      physiological: {
        score: 5,
        reasoning: 'Neutral. Little direct effect on basic survival needs. Any impact is indirect (e.g. an ID might help access social services, but policy itself doesn\'t provide resources).',
      },
      safety: {
        score: 5.5,
        reasoning: 'Slight positive. Can improve stability and fairness of society. Fostering inclusive democracy may increase trust in institutions and reduce social grievances.',
      },
      community: {
        score: 7.5,
        reasoning: 'Strong positive. Eliminates cost barriers to voting, expanding civic participation and social inclusion. Upholds ideal of equal access to democratic participation, helping marginalized groups engage.',
      },
      opportunity: {
        score: 6.5,
        reasoning: 'Moderately positive. An ID is gateway to opportunities – needed for employment, bank accounts, education, travel. Providing free IDs removes a practical barrier that has held some people back.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Slight positive. Being able to vote and have voice in society can enhance personal fulfillment and dignity. Boosts self-esteem and empowerment for those previously excluded.',
      },
    },
    dimensions: {
      populationAffected: 8,     // 29 million eligible voters lack driver's license; 7+ million lack photo ID
      essentialToSurvival: 5,    // Not directly related to survival; core benefit is civic
      timeToOutcome: 7,          // Benefits realized within an election cycle
      feasibility: 7,            // 81% support but partisan differences on voter ID laws
    },
    rationale: 'Overall score ~6.2/10 (Slightly Beneficial). Clear benefit to community and opportunity needs, neutral on survival needs. Removes harmful barrier to democratic participation with minimal downsides.',
    methodologyId: 'needs-model/free-and-easy-voter-id',
  },

  'irs-direct-file': {
    needCategories: {
      opportunity: {
        score: 6,
        reasoning: 'Saves money and time for taxpayers, enabling other uses.',
      },
      safety: {
        score: 6,
        reasoning: 'Minor financial security benefit through savings.',
      },
    },
    dimensions: {
      populationAffected: 8,     // Most taxpayers could benefit
      essentialToSurvival: 5,    // Not survival-related
      timeToOutcome: 9,          // Immediate savings upon use
      feasibility: 8,            // 73% support, pilot already running
    },
    rationale: 'Practical policy with good support. Already being piloted successfully.',
  },

  // ===========================================
  // CONSUMER PROTECTION
  // ===========================================

  'junk-fee-prevention': {
    needCategories: {
      physiological: {
        score: 6.5,
        reasoning: 'Moderate positive. Saves consumers money (potentially tens of billions collectively), freeing income for groceries, utilities, rent. Especially helps lower-income families ease budget for food, healthcare, housing.',
      },
      safety: {
        score: 7.5,
        reasoning: 'High positive. Protects consumers from predatory or surprise charges, enhancing economic safety and stability. Guardrail against unfair practices. Families less likely to be blindsided by unexpected fees.',
      },
      community: {
        score: 6,
        reasoning: 'Slight positive. Transparent pricing and fairness can increase trust in markets and institutions. When people feel treated fairly, it can reduce societal frustration and improve general social mood.',
      },
      opportunity: {
        score: 6.5,
        reasoning: 'Moderate positive. When people keep more money, they can invest in their future. Reduced financial strain improves access to education, employment, or starting a small business without costly exit fees.',
      },
      selfActualization: {
        score: 5.5,
        reasoning: 'Slight positive. More disposable income and fewer financial frustrations can allow individuals to pursue personal fulfillment. Money saved might go to family activities, hobbies, or cultural experiences.',
      },
    },
    dimensions: {
      populationAffected: 9,     // Benefits virtually all consumers; junk fees are widespread
      essentialToSurvival: 6,    // Improves financial security, frees income for essential needs
      timeToOutcome: 8,          // Benefits within 1-2 billing cycles; credit card late fee rule saves $9 billion/year
      feasibility: 7,            // 87% support; some measures underway via CFPB, DOT, FTC; industry lobbying is obstacle
    },
    rationale: 'Overall score ~7.0/10 (Very Beneficial). Strength lies in financial safety and economic relief – directly protects people\'s money. Benefits reach wide population quickly. Cracking down on junk fees would significantly help consumers.',
    methodologyId: 'needs-model/junk-fee-prevention',
  },

  'right-to-repair': {
    needCategories: {
      physiological: {
        score: 6,
        reasoning: 'Slight positive. Enables repair of important equipment (refrigerators, furnaces, cars) crucial to health and comfort. Farmers can fix machinery to avoid crop losses and support food security.',
      },
      safety: {
        score: 6,
        reasoning: 'Slight positive. Increases economic security by reducing repair costs. Households save $330 annually on average by repairing instead of replacing. Adds sense of security and self-reliance.',
      },
      community: {
        score: 6,
        reasoning: 'Moderate positive. Empowers local communities - independent repair shops flourish, community repair clinics thrive. Promotes fairness, reduces e-waste, benefits community health.',
      },
      opportunity: {
        score: 8,
        reasoning: 'Strong positive. Stimulates competition and entrepreneurship. Independent repair businesses flourish, creates jobs. 95% of farmers support it, 92% say it would save them money.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Slight positive. Repairing one\'s belongings is empowering and fulfilling. Encourages creativity, learning, and sustainability culture.',
      },
    },
    dimensions: {
      populationAffected: 9,     // Nearly everyone owns repairable products; 84% support
      essentialToSurvival: 6,    // Indirect benefits - farmers, essential household items
      timeToOutcome: 8,          // Provisions take effect within months
      feasibility: 8,            // Numerous state laws, federal bills, FTC encouragement
    },
    rationale: 'Overall score ~6.5-7/10. Notably helpful - widespread economic and practical benefits, empowering consumers and supporting livelihoods. Scores especially high on opportunity.',
    methodologyId: 'needs-model/right-to-repair',
  },

  // ===========================================
  // INFRASTRUCTURE & TECHNOLOGY
  // ===========================================

  'rural-broadband-access': {
    needCategories: {
      opportunity: {
        score: 8,
        reasoning: 'Enables economic participation, remote work, education access.',
      },
      community: {
        score: 7,
        reasoning: 'Connects rural communities to broader society.',
      },
    },
    dimensions: {
      populationAffected: 6,     // Rural areas (~20% of population)
      essentialToSurvival: 6,    // Increasingly essential but not life-or-death
      timeToOutcome: 6,          // Infrastructure takes time to build
      feasibility: 8,            // 76% support, bipartisan
    },
    rationale: 'Addresses digital divide. Strong opportunity and community benefits for underserved areas.',
  },

  'ai-safety-regulation': {
    needCategories: {
      safety: {
        score: 8,
        reasoning: 'Protects against AI harms including deepfakes and autonomous systems.',
      },
      community: {
        score: 6,
        reasoning: 'Preserves trust in information and democratic discourse.',
      },
    },
    dimensions: {
      populationAffected: 8,     // Everyone affected by AI deployment
      essentialToSurvival: 6,    // Emerging risks, not immediate
      timeToOutcome: 6,          // Takes time to implement and see effects
      feasibility: 8,            // 79% support, growing consensus
    },
    rationale: 'Addresses emerging technology risks. Good support and growing political will.',
  },

  'nuclear-energy-expansion': {
    needCategories: {
      physiological: {
        score: 7.5,
        reasoning: 'Moderate-high positive. Reliable energy is essential for heating, cooling, cooking, and powering medical equipment. Nuclear provides baseload power consistently. As low-carbon source, helps mitigate climate change threats to physiological needs. Cleaner air benefits health.',
      },
      safety: {
        score: 7,
        reasoning: 'Moderate-high positive. Energy security is national safety concern. Nuclear reduces dependence on imported fossil fuels, provides stable supply during geopolitical disruptions. Modern nuclear has strong safety records. Climate mitigation reduces long-term environmental risks.',
      },
      community: {
        score: 6,
        reasoning: 'Moderate positive. Nuclear plants create jobs and economic activity in host communities. Provides stable, well-paying employment for decades. Some community opposition due to safety concerns or NIMBYism. Overall modest positive.',
      },
      opportunity: {
        score: 7,
        reasoning: 'Moderate-high positive. Expanding nuclear creates jobs in construction, operation, and supply chain. Advanced reactor development supports American innovation and competitiveness. Reliable, affordable electricity is foundational for economic opportunity.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Moderate positive. Reliable electricity enables education, connectivity, and personal pursuits. For those valuing environmental sustainability, clean energy aligns with their values and sense of contributing to better future.',
      },
    },
    dimensions: {
      populationAffected: 8,     // Nuclear provides ~20% of U.S. electricity; affects millions of households
      essentialToSurvival: 7,    // Electricity essential in modern society; climate mitigation protects long-term survival
      timeToOutcome: 4,          // New plants take 10+ years to build; long-term infrastructure investment
      feasibility: 8,            // ADVANCE Act passed Senate 88-2; 59-61% support; bipartisan appeal
    },
    rationale: 'Overall score ~7/10 (Very Beneficial). Addresses energy security, supports physiological needs through reliable power and climate mitigation. Rare bipartisan consensus (Senate 88-2). Main limitations: long timeframe for new capacity and ongoing concerns about waste and costs.',
    methodologyId: 'needs-model/nuclear-energy-expansion',
  },

  // ===========================================
  // OTHER POLICIES
  // ===========================================

  'immigration-grand-bargain': {
    needCategories: {
      physiological: {
        score: 6.5,
        reasoning: 'Moderate benefit. Legal status improves access to healthcare and social services for Dreamers. With better jobs, they can afford housing and other necessities more easily.',
      },
      safety: {
        score: 8,
        reasoning: 'Strong positive. Provides security and stability to ~1-2 million Dreamers who would no longer fear deportation. E-Verify strengthens national protection against illegal labor practices.',
      },
      community: {
        score: 7,
        reasoning: 'Positive impact. Integrating Dreamers secures their sense of belonging. Legalization lets them fully join civic life, enhancing social cohesion.',
      },
      opportunity: {
        score: 8,
        reasoning: 'Strong positive. A path to citizenship unlocks employment and education opportunities for Dreamers. E-Verify ensures job opportunities are reserved for legal workers.',
      },
      selfActualization: {
        score: 7,
        reasoning: 'Positive impact. Freed from legal limbo, Dreamers can pursue personal goals (higher education, professional advancement, community leadership) and fulfill their potential.',
      },
    },
    dimensions: {
      populationAffected: 7,     // ~1-2 million Dreamers directly, E-Verify affects entire labor market
      essentialToSurvival: 8,    // Critical to Dreamers' basic security - determines ability to live without fear
      timeToOutcome: 7,          // Immediate legal protection, E-Verify within months
      feasibility: 6,            // 72-76% support but immigration reform historically difficult
    },
    rationale: 'Overall score ~7.5/10 (Very Beneficial). Delivers significant benefits in high-weight areas (Safety, Opportunity, Community). Could boost U.S. GDP by $121 billion/year and increase tax revenues by $31 billion annually.',
    methodologyId: 'needs-model/immigration-grand-bargain',
  },

  'national-service': {
    needCategories: {
      opportunity: {
        score: 8,
        reasoning: 'Provides education benefits and career development.',
      },
      community: {
        score: 9,
        reasoning: 'Builds civic bonds across divides; strengthens social cohesion.',
      },
      selfActualization: {
        score: 7,
        reasoning: 'Personal growth through service and new experiences.',
      },
    },
    dimensions: {
      populationAffected: 6,     // Young adults who participate
      essentialToSurvival: 5,    // Not survival-related
      timeToOutcome: 8,          // Benefits begin during service
      feasibility: 9,            // 80% support for voluntary service
    },
    rationale: 'Strong community-building policy with high feasibility. Key that it remains voluntary.',
  },

  'cannabis-banking-safer': {
    needCategories: {
      safety: {
        score: 7,
        reasoning: 'Reduces cash-related crime at dispensaries.',
      },
      opportunity: {
        score: 6,
        reasoning: 'Enables small cannabis businesses to access banking.',
      },
    },
    dimensions: {
      populationAffected: 5,     // Cannabis industry and surrounding communities
      essentialToSurvival: 5,    // Not survival-related
      timeToOutcome: 8,          // Benefits begin immediately upon passage
      feasibility: 7,            // 64% support, bipartisan coalition
    },
    rationale: 'Practical public safety measure. Not about legalization, just banking access.',
  },

  'ultra-millionaire-tax': {
    needCategories: {
      opportunity: {
        score: 7,
        reasoning: 'Revenue could fund programs that expand opportunity.',
      },
      safety: {
        score: 6,
        reasoning: 'Could fund social safety net programs.',
      },
    },
    dimensions: {
      populationAffected: 5,     // Directly affects only ultra-wealthy, indirect benefits broader
      essentialToSurvival: 5,    // Not directly survival-related
      timeToOutcome: 6,          // Revenue takes time to collect and deploy
      feasibility: 6,            // 67% support, constitutional questions
    },
    rationale: 'Popular concept but implementation challenges. Constitutional questions remain.',
  },

  'foreign-farmland-ban': {
    needCategories: {
      physiological: {
        score: 8,
        reasoning: 'Very positive. Control over farmland is about food production. Keeping land in American hands ensures domestic agriculture can feed nation without dependence on foreign-owned operations. Foundational to long-term food security.',
      },
      safety: {
        score: 9,
        reasoning: 'Extremely positive. Directly addresses national security concerns. Land near military bases or sensitive infrastructure poses surveillance and sabotage risks if owned by foreign adversaries. Lawmakers cited spy balloon incidents and proximity of Chinese-owned land to military installations.',
      },
      community: {
        score: 7,
        reasoning: 'Moderate positive. Rural communities worry about absentee foreign landlords who may not invest in local economies. Keeping farmland domestic can strengthen local ownership, support generational farm families, maintain community self-determination.',
      },
      opportunity: {
        score: 6.5,
        reasoning: 'Moderate positive. Limiting foreign buyers may reduce upward pressure on farmland prices, making it easier for young/new farmers to enter market. Supports agricultural entrepreneurship and rural job creation.',
      },
      selfActualization: {
        score: 6,
        reasoning: 'Slight positive. Farmers and rural residents may feel greater sense of autonomy knowing nation\'s farmland is domestically controlled. Aligns with values of self-sufficiency and national sovereignty.',
      },
    },
    dimensions: {
      populationAffected: 7,     // Rural farmers directly; entire nation benefits from food security
      essentialToSurvival: 8,    // Food is fundamental survival need; protects means of production
      timeToOutcome: 7,          // Immediate effect on new purchases; existing holdings take longer
      feasibility: 9,            // 80% voter support; 20+ states have restrictions; bipartisan federal support
    },
    rationale: 'Overall score ~8/10 (Very Beneficial). Strong benefits to safety and physiological (food security) needs with high political feasibility. Addresses real national security concerns with broad bipartisan backing. Low downside – preventative measure.',
    methodologyId: 'needs-model/foreign-farmland-ban',
  },

  'buy-american': {
    needCategories: {
      opportunity: {
        score: 7,
        reasoning: 'Creates manufacturing jobs domestically.',
      },
      safety: {
        score: 6,
        reasoning: 'Supply chain security.',
      },
    },
    dimensions: {
      populationAffected: 6,     // Manufacturing workers and communities
      essentialToSurvival: 5,    // Not directly survival-related
      timeToOutcome: 6,          // Takes time to rebuild manufacturing
      feasibility: 8,            // 75% support, already being implemented
    },
    rationale: 'Popular industrial policy. May increase costs but builds domestic capacity.',
  },

  'medicare-drug-negotiation': {
    needCategories: {
      physiological: {
        score: 8,
        reasoning: 'Access to affordable medicine is a health need.',
      },
      safety: {
        score: 7,
        reasoning: 'Financial security through lower drug costs.',
      },
    },
    dimensions: {
      populationAffected: 7,     // Medicare beneficiaries primarily, broader effects
      essentialToSurvival: 8,    // Medications can be life-saving
      timeToOutcome: 7,          // Negotiations take time to show savings
      feasibility: 8,            // 85% support, already partially implemented
    },
    rationale: 'Strong bipartisan support. Already being implemented under IRA, could be expanded.',
  },
};

/**
 * Helper to check if a policy has V3 scores
 */
export function hasV3Scores(policyId: string): boolean {
  return policyId in policyImpactScoresV3;
}

/**
 * Get V3 scores for a policy
 */
export function getV3Scores(policyId: string): V3ImpactScore | null {
  return policyImpactScoresV3[policyId] || null;
}

/**
 * Get all policies sorted by calculated V3 score
 */
export function getV3RankedPolicies(): Array<{ policyId: string; score: V3ImpactScore }> {
  return Object.entries(policyImpactScoresV3)
    .map(([policyId, score]) => ({ policyId, score }))
    .sort((a, b) => {
      // Simple ranking by average of dimensions
      const avgA = Object.values(a.score.dimensions).reduce((sum, v) => sum + v, 0) / 4;
      const avgB = Object.values(b.score.dimensions).reduce((sum, v) => sum + v, 0) / 4;
      return avgB - avgA;
    });
}
