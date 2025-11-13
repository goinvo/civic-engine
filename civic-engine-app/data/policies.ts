import { Policy } from '../types/policy';

/**
 * Real consensus policy data from Americans-Agree.org and other sources
 * All policies have 55%+ bipartisan support (Dem, Rep, Ind)
 * Data current as of 2025
 */

export const policies: Policy[] = [
  {
    id: 'paid-sick-leave',
    rank: 1,
    title: 'Require Paid Sick Leave for All Workers',
    description: 'Mandate that companies provide paid sick leave to all full-time employees, ensuring workers can take time off when ill without losing income.',
    category: 'economy',
    scope: 'federal',
    icon: 'HeartPulse',
    averageSupport: 81,
    partySupport: {
      democrats: 93,
      republicans: 72,
      independents: 79,
    },
    sources: [
      {
        organization: 'YouGov',
        title: 'Paid Sick Leave Support Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 81,
      },
    ],
    details: [
      {
        title: 'Universal Coverage',
        description: 'All full-time employees would receive a minimum number of paid sick days per year.',
      },
      {
        title: 'Protect Workers',
        description: 'Workers can recover from illness without financial penalty or fear of job loss.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'criminal-background-checks-guns',
    rank: 2,
    title: 'Universal Background Checks for Gun Purchases',
    description: 'Require criminal and mental health screenings for all firearm sales, including private transactions and gun shows.',
    category: 'justice',
    scope: 'federal',
    icon: 'ShieldCheck',
    averageSupport: 83,
    partySupport: {
      democrats: 87,
      republicans: 82,
      independents: 80,
    },
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Gun Control Measures Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 83,
      },
    ],
    details: [
      {
        title: 'Close Loopholes',
        description: 'Extend background checks to all gun sales, including private sales and gun shows.',
      },
      {
        title: 'Mental Health Screening',
        description: 'Include mental health records in background check system to prevent access by those deemed dangerous.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'ban-stock-trading-officials',
    rank: 3,
    title: 'Ban Stock Trading by Elected Officials',
    description: 'Prohibit members of Congress and other elected officials from buying or selling individual stocks while in office to prevent conflicts of interest.',
    category: 'governance',
    scope: 'federal',
    icon: 'Ban',
    averageSupport: 74,
    partySupport: {
      democrats: 73,
      republicans: 77,
      independents: 71,
    },
    sources: [
      {
        organization: 'YouGov',
        title: 'Congressional Ethics Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 74,
      },
    ],
    details: [
      {
        title: 'Prevent Insider Trading',
        description: 'Eliminate opportunities for officials to profit from non-public information.',
      },
      {
        title: 'Restore Trust',
        description: 'Increase public confidence in government by removing conflicts of interest.',
      },
    ],
    trending: 'up',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'restrict-corporate-election-spending',
    rank: 4,
    title: 'Limit Corporate Campaign Spending',
    description: 'Establish campaign finance laws that restrict the amount corporations can spend on elections and political campaigns.',
    category: 'governance',
    scope: 'federal',
    icon: 'DollarSign',
    averageSupport: 77,
    sources: [
      {
        organization: 'YouGov',
        title: 'Campaign Finance Reform Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 77,
      },
    ],
    details: [
      {
        title: 'Reduce Money in Politics',
        description: 'Limit the influence of wealthy corporations on elections and policy.',
      },
      {
        title: 'Level Playing Field',
        description: 'Give all candidates and voices a more equal opportunity to be heard.',
      },
      {
        title: 'Cross-Party Support',
        description: 'Supported by 83% of Democrats, 75% of Republicans, and 74% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'supreme-court-ethics',
    rank: 5,
    title: 'Enforce Ethics Standards for Supreme Court',
    description: 'Establish and enforce a code of ethics for Supreme Court justices, including disclosure requirements and conflict of interest rules.',
    category: 'governance',
    scope: 'federal',
    icon: 'Scale',
    averageSupport: 76,
    sources: [
      {
        organization: 'YouGov',
        title: 'Supreme Court Ethics Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 76,
      },
    ],
    details: [
      {
        title: 'Transparency',
        description: 'Require justices to disclose gifts, financial interests, and potential conflicts.',
      },
      {
        title: 'Accountability',
        description: 'Create enforceable standards with consequences for violations.',
      },
      {
        title: 'Bipartisan Agreement',
        description: 'Supported by 84% of Democrats, 70% of Republicans, and 73% of Independents.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'government-disaster-relief',
    rank: 6,
    title: 'Federal Disaster Relief and Response',
    description: 'Ensure the federal government provides major aid and resources after natural disasters to help communities recover.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'CloudRainWind',
    averageSupport: 80,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Disaster Response Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 80,
      },
    ],
    details: [
      {
        title: 'Emergency Response',
        description: 'Federal government coordinates and funds major disaster response efforts.',
      },
      {
        title: 'Community Recovery',
        description: 'Provide resources for rebuilding infrastructure and supporting affected residents.',
      },
      {
        title: 'Widespread Support',
        description: 'Supported by 87% of Democrats, 80% of Republicans, and 72% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-01',
  },
  {
    id: 'ban-synthetic-food-dyes',
    rank: 7,
    title: 'Ban Harmful Synthetic Food Dyes',
    description: 'Prohibit certain synthetic food dyes and additives that have been linked to health concerns, especially in products marketed to children.',
    category: 'healthcare',
    scope: 'federal',
    icon: 'FlaskConical',
    averageSupport: 79,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Food Safety Regulation Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 79,
      },
    ],
    details: [
      {
        title: 'Protect Children',
        description: 'Remove potentially harmful additives from foods commonly consumed by children.',
      },
      {
        title: 'Follow Science',
        description: 'Base regulations on health research and international safety standards.',
      },
      {
        title: 'Strong Agreement',
        description: 'Supported by 68% of Democrats, 87% of Republicans, and 83% of Independents.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-09-01',
  },
  {
    id: 'protect-academic-freedom',
    rank: 8,
    title: 'Protect University Academic Freedom',
    description: 'Ensure the federal government does not control university faculty hiring decisions, preserving institutional autonomy and academic freedom.',
    category: 'education',
    scope: 'federal',
    icon: 'GraduationCap',
    averageSupport: 77,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Higher Education Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 77,
      },
    ],
    details: [
      {
        title: 'Institutional Autonomy',
        description: 'Universities maintain control over faculty hiring and academic decisions.',
      },
      {
        title: 'Prevent Overreach',
        description: 'Protect universities from political interference in academic matters.',
      },
      {
        title: 'Broad Support',
        description: 'Supported by 89% of Democrats, 65% of Republicans, and 77% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'lobbying-waiting-period',
    rank: 9,
    title: '5-Year Lobbying Ban After Public Service',
    description: 'Require members of Congress to wait five years after leaving office before they can work as lobbyists.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 70,
    sources: [
      {
        organization: 'YouGov',
        title: 'Congressional Ethics Reform Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 70,
      },
    ],
    details: [
      {
        title: 'Reduce Corruption',
        description: 'Prevent the revolving door between Congress and lobbying firms.',
      },
      {
        title: 'Cooling Off Period',
        description: 'Allow time for officials to separate from insider knowledge and connections.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 71% of Democrats, 75% of Republicans, and 65% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    id: 'energy-efficiency-tax-credits',
    rank: 10,
    title: 'Tax Credits for Home Energy Efficiency',
    description: 'Provide tax credits for homeowners who make energy efficiency improvements like installing heat pumps or solar panels.',
    category: 'environment',
    scope: 'federal',
    icon: 'Zap',
    averageSupport: 84,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Policy Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 84,
      },
    ],
    details: [
      {
        title: 'Lower Energy Bills',
        description: 'Help homeowners save money on energy costs while reducing carbon emissions.',
      },
      {
        title: 'Economic Incentive',
        description: 'Tax credits make energy-efficient upgrades more affordable.',
      },
      {
        title: 'Strong Consensus',
        description: 'Supported by 92% of Democrats and 75% of Republicans.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'abortion-health-exception',
    rank: 11,
    title: 'Allow Abortion When Health at Risk',
    description: 'States should permit abortion when pregnancy endangers the pregnant person\'s physical or mental health.',
    category: 'healthcare',
    scope: 'state',
    icon: 'Heart',
    averageSupport: 89,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 89,
      },
    ],
    details: [
      {
        title: 'Protect Life and Health',
        description: 'Allow medical professionals to provide necessary care when pregnancy threatens health.',
      },
      {
        title: 'Medical Decision',
        description: 'Keep healthcare decisions between patients and their doctors.',
      },
      {
        title: 'Overwhelming Support',
        description: 'Supported by 93% of Democrats, 84% of Republicans, and 89% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'abortion-rape-incest',
    rank: 12,
    title: 'Allow Abortion for Rape or Incest',
    description: 'States should allow abortion for pregnancies resulting from rape or incest.',
    category: 'healthcare',
    scope: 'state',
    icon: 'ShieldAlert',
    averageSupport: 86,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    details: [
      {
        title: 'Compassionate Exception',
        description: 'Provide options for victims of sexual violence and abuse.',
      },
      {
        title: 'Reduce Trauma',
        description: 'Allow survivors to make decisions about their own healthcare.',
      },
      {
        title: 'Broad Agreement',
        description: 'Supported by 93% of Democrats, 77% of Republicans, and 87% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'methane-leak-regulations',
    rank: 13,
    title: 'Require Oil Companies to Seal Methane Leaks',
    description: 'Mandate that oil and gas companies seal methane leaks from wells to reduce greenhouse gas emissions.',
    category: 'environment',
    scope: 'federal',
    icon: 'Wind',
    averageSupport: 84,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Policy Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 84,
      },
    ],
    details: [
      {
        title: 'Reduce Emissions',
        description: 'Methane is a potent greenhouse gas; sealing leaks significantly reduces climate impact.',
      },
      {
        title: 'Industry Accountability',
        description: 'Hold oil and gas companies responsible for preventing avoidable emissions.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 93% of Democrats and 75% of Republicans.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'red-flag-gun-laws',
    rank: 14,
    title: 'Extreme Risk Protection Orders for Firearms',
    description: 'Allow family members or law enforcement to petition courts for temporary firearm removal when someone poses a danger to themselves or others.',
    category: 'justice',
    scope: 'state',
    icon: 'AlertTriangle',
    averageSupport: 74,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Gun Safety Measures Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 74,
      },
    ],
    details: [
      {
        title: 'Prevent Tragedies',
        description: 'Provide a legal mechanism to temporarily remove guns from individuals in crisis.',
      },
      {
        title: 'Due Process',
        description: 'Court review ensures rights are protected while addressing immediate safety concerns.',
      },
      {
        title: 'Cross-Party Agreement',
        description: 'Supported by 87% of Democrats, 65% of Republicans, and 69% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'weather-tracking-systems',
    rank: 15,
    title: 'Government Weather Tracking and Warnings',
    description: 'Federal government should track weather events and provide warnings about potential natural disasters.',
    category: 'infrastructure',
    scope: 'federal',
    icon: 'Cloudy',
    averageSupport: 71,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Disaster Preparedness Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    details: [
      {
        title: 'Save Lives',
        description: 'Early warning systems help communities prepare and evacuate before disasters strike.',
      },
      {
        title: 'Public Safety',
        description: 'Government coordination ensures consistent, reliable weather information.',
      },
      {
        title: 'Broad Support',
        description: 'Supported by 80% of Democrats, 68% of Republicans, and 65% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-06-01',
  },
  {
    id: 'eliminate-daylight-saving',
    rank: 16,
    title: 'Eliminate Daylight Saving Time',
    description: 'Stop changing clocks twice annually by eliminating daylight saving time and maintaining one consistent time year-round.',
    category: 'governance',
    scope: 'federal',
    icon: 'Clock',
    averageSupport: 65,
    sources: [
      {
        organization: 'YouGov',
        title: 'Daylight Saving Time Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 65,
      },
    ],
    details: [
      {
        title: 'Health Benefits',
        description: 'Reduce sleep disruption and health issues associated with time changes.',
      },
      {
        title: 'Consistency',
        description: 'Maintain one standard time year-round for simplicity.',
      },
      {
        title: 'Popular Support',
        description: 'Supported by 64% of Democrats, 71% of Republicans, and 61% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-10-01',
  },
  {
    id: 'restrict-agricultural-pesticides',
    rank: 17,
    title: 'Restrict Agricultural Pesticide Use',
    description: 'Increase restrictions on pesticide use in agriculture to protect human health and the environment.',
    category: 'environment',
    scope: 'federal',
    icon: 'Sprout',
    averageSupport: 70,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Food and Agriculture Safety Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 70,
      },
    ],
    details: [
      {
        title: 'Protect Health',
        description: 'Reduce exposure to chemicals linked to health problems.',
      },
      {
        title: 'Environmental Protection',
        description: 'Safeguard water supplies, soil health, and wildlife.',
      },
      {
        title: 'Bipartisan Support',
        description: 'Supported by 64% of Democrats, 69% of Republicans, and 76% of Independents.',
      },
    ],
    trending: 'up',
    lastUpdated: '2025-09-01',
  },
  {
    id: 'carbon-capture-incentives',
    rank: 18,
    title: 'Tax Credits for Carbon Capture Technology',
    description: 'Provide tax credits to encourage development and deployment of carbon capture and storage technology.',
    category: 'environment',
    scope: 'federal',
    icon: 'Leaf',
    averageSupport: 79,
    sources: [
      {
        organization: 'Pew Research',
        title: 'Climate Technology Poll',
        url: 'https://americans-agree.org',
        year: 2024,
        supportPercentage: 79,
      },
    ],
    details: [
      {
        title: 'Climate Innovation',
        description: 'Incentivize development of technology to remove CO2 from atmosphere.',
      },
      {
        title: 'Market-Based Solution',
        description: 'Use tax policy to encourage private sector climate action.',
      },
      {
        title: 'Strong Support',
        description: 'Supported by 89% of Democrats and 69% of Republicans.',
      },
    ],
    trending: 'up',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'federal-university-research',
    rank: 19,
    title: 'Support Federal University Research Funding',
    description: 'Maintain or increase federal funding for scientific research at universities to drive innovation and discovery.',
    category: 'education',
    scope: 'federal',
    icon: 'Microscope',
    averageSupport: 71,
    sources: [
      {
        organization: 'The Economist/YouGov',
        title: 'Higher Education and Research Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 71,
      },
    ],
    details: [
      {
        title: 'Drive Innovation',
        description: 'University research leads to breakthroughs in medicine, technology, and science.',
      },
      {
        title: 'Economic Growth',
        description: 'Research funding creates jobs and spurs economic development.',
      },
      {
        title: 'Bipartisan Agreement',
        description: 'Supported by 89% of Democrats, 56% of Republicans, and 67% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'abortion-fatal-anomaly',
    rank: 20,
    title: 'Allow Abortion for Fatal Fetal Anomalies',
    description: 'States should permit abortion when fetal abnormalities would prevent survival after birth.',
    category: 'healthcare',
    scope: 'state',
    icon: 'HeartCrack',
    averageSupport: 86,
    sources: [
      {
        organization: 'Associated Press-NORC',
        title: 'Abortion Policy Poll',
        url: 'https://americans-agree.org',
        year: 2025,
        supportPercentage: 86,
      },
    ],
    details: [
      {
        title: 'Medical Compassion',
        description: 'Allow families to make decisions in tragic medical circumstances.',
      },
      {
        title: 'Reduce Suffering',
        description: 'Provide options when continuing pregnancy would not result in viable birth.',
      },
      {
        title: 'Strong Agreement',
        description: 'Supported by 93% of Democrats, 76% of Republicans, and 88% of Independents.',
      },
    ],
    trending: 'stable',
    lastUpdated: '2025-07-01',
  },
];

/**
 * Get top N policies
 */
export function getTopPolicies(limit: number = 10): Policy[] {
  return policies.slice(0, limit);
}

/**
 * Get policy by ID
 */
export function getPolicyById(id: string): Policy | undefined {
  return policies.find((policy) => policy.id === id);
}

/**
 * Get policies by category
 */
export function getPoliciesByCategory(category: string): Policy[] {
  return policies.filter((policy) => policy.category === category);
}
