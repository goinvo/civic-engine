import { V1PolicyMethodology } from '../../v1Methodology';

export const socialSecurityCapMethodology: V1PolicyMethodology = {
  policyId: 'social-security-cap',
  policyName: 'Raise Social Security Cap',
  description: 'Remove or raise the cap on income subject to Social Security taxes, currently at ~$168,600.',
  totalScore: 80,
  tier: 'TIER 1: THE STRUCTURAL GIANTS',
  factors: {
    population: {
      score: 1.0,
      reasoning: 'Affects the financial future of nearly every American who pays into or receives Social Security benefits.',
      keyPoints: [
        'Virtually all working Americans pay Social Security taxes',
        'Over 70 million people currently receive SS benefits',
        'Future retirees (100M+) depend on system solvency',
      ],
    },
    economic: {
      score: 1.0,
      reasoning: 'Involves trillions of dollars in the Social Security trust fund and ongoing payroll tax flows.',
      keyPoints: [
        'Social Security is the largest government program (~$1.4T/year)',
        'Lifting the cap would generate $100B+ in new revenue annually',
        'Affects retirement planning for the entire workforce',
      ],
    },
    intensity: {
      score: 0.6,
      reasoning: 'Moderate direct intensity - high earners pay more, but most Americans see no immediate change.',
      keyPoints: [
        'Only ~6% of workers earn above the current cap',
        'Those above cap would pay thousands more per year',
        'Benefits accrue over decades, not immediately',
      ],
    },
    duration: {
      score: 0.9,
      reasoning: 'Permanent structural change to the tax code with multi-generational effects.',
      keyPoints: [
        'Would extend SS solvency for 50+ years',
        'Creates lasting fiscal stability',
        'Affects retirement security for future generations',
      ],
    },
    equity: {
      score: 0.8,
      reasoning: 'Highly progressive - shifts tax burden to highest earners to fund benefits for all.',
      keyPoints: [
        'Current cap is regressive (lower % for high earners)',
        'Protects benefits for low-income retirees',
        'Reduces wealth inequality in retirement',
      ],
    },
    externalities: {
      score: 0.5,
      reasoning: 'Moderate spillover effects on labor markets and retirement planning behavior.',
      keyPoints: [
        'May affect high-earner compensation structures',
        'Could reduce political pressure for privatization',
        'Stabilizes broader retirement security expectations',
      ],
    },
    implementation: {
      score: 0.2,
      reasoning: 'Mechanically simple - just a tax code change, no new infrastructure needed.',
      keyPoints: [
        'IRS already collects payroll taxes',
        'No new programs or agencies required',
        'Political opposition exists but no constitutional barriers',
      ],
    },
  },
  overallRationale: 'This policy affects the financial future of nearly every American with massive economic volume ($Trillions). Mechanically simple to implement (tax code change).',
};
