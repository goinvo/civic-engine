/**
 * V3 Needs-Based Methodology: Healthcare Public Option
 *
 * Policy: Create a government-run health insurance plan that competes with private
 * insurers on the ACA marketplace, giving Americans the choice to buy into a
 * Medicare-like plan while preserving existing private insurance options.
 *
 * Overall Score: ~7/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const healthcarePublicOptionMethodology: V3PolicyMethodology = {
  policyId: 'healthcare-public-option',
  policyName: 'Healthcare Public Option',
  description:
    'Create a government-run health insurance plan that competes with private insurers on the ACA marketplace, giving Americans the choice to buy into a Medicare-like plan while preserving existing private insurance options. The public option aims to expand coverage, reduce premiums through competition, and provide a fallback for those who lack affordable options.',

  needCategories: {
    physiological: {
      score: 8.5,
      reasoning:
        'Very positive. Healthcare is essential to maintaining physiological well-being. A public option would extend affordable coverage to millions who are currently uninsured or underinsured, enabling access to preventive care, treatment, and medications. By covering more people, it directly supports the physical health of the population.',
    },
    safety: {
      score: 8,
      reasoning:
        'Very positive. Health insurance provides financial safety – protection from medical bankruptcy and the stress of unexpected health costs. A public option, especially if lower-cost, would reduce the financial risk families face. Knowing that an affordable coverage option exists provides security and peace of mind. It also acts as a safety net for those who lose employer coverage.',
    },
    community: {
      score: 6.5,
      reasoning:
        'Moderate positive. A public option could strengthen community health by increasing overall coverage rates, leading to healthier communities. Public health improves when more people can see doctors and get vaccinations. However, it may create tension with private insurance industry stakeholders and some communities ideologically opposed to government involvement in healthcare. The net effect is positive but not without friction.',
    },
    opportunity: {
      score: 7,
      reasoning:
        'Moderate-high positive. With a public option, individuals are less tied to employers for health coverage ("job lock" reduction). This frees people to pursue entrepreneurship, change careers, or take time for education without losing insurance. It opens doors for economic mobility. Lower healthcare costs also free up income for other investments in opportunity (education, housing, etc.).',
    },
    selfActualization: {
      score: 6.5,
      reasoning:
        'Moderate positive. Good health is a foundation for pursuing higher-level goals. If people are less worried about healthcare access and costs, they can focus on personal growth, creativity, and fulfillment. The policy supports well-being that enables self-actualization. However, the policy is more about security than directly promoting personal growth, so the effect here is indirect.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 8,
      reasoning:
        'High. Potentially tens of millions could benefit. Currently, about 27 million Americans are uninsured, and millions more are underinsured or paying high premiums. A public option would be available to all seeking individual coverage and could attract a large enrollment. Even those with employer coverage benefit indirectly from competitive pressure lowering costs across the market.',
      keyPoints: [
        '27 million currently uninsured Americans',
        'Millions more underinsured or paying high premiums',
        'Available to all seeking individual coverage',
        'Indirect benefits through market competition',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'Very high. Healthcare is directly tied to survival. Access to medical care can be life-or-death in emergencies and critical for managing chronic conditions. By expanding affordable coverage, a public option addresses a fundamental survival need. It\'s one of the most directly life-impacting policy areas.',
      keyPoints: [
        'Healthcare directly tied to survival',
        'Life-or-death in emergencies',
        'Critical for chronic condition management',
        'Addresses fundamental survival need',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Moderate. Implementing a public option requires building administrative infrastructure, negotiating provider rates, and enrolling participants. It would likely take 2-4 years from enactment to full operation. Once running, benefits accrue quickly to enrollees. The time lag is due to the complexity of healthcare systems, but it\'s faster than, say, building new hospitals.',
      keyPoints: [
        '2-4 years from enactment to full operation',
        'Requires building administrative infrastructure',
        'Benefits accrue quickly once running',
        'Complexity of healthcare systems causes delay',
      ],
    },
    feasibility: {
      score: 5,
      reasoning:
        'Moderate. Public support is strong – 65-68% favor a public option. It\'s a more moderate approach than single-payer, which makes it more politically palatable. However, it faces opposition from the private insurance industry and some lawmakers. It would require significant legislative effort and has failed to pass in previous attempts (e.g., 2009 ACA negotiations). State-level experiments (like in Washington, Colorado) show it can work but also highlight challenges.',
      keyPoints: [
        '65-68% public support',
        'More moderate than single-payer',
        'Insurance industry opposition',
        'Failed in 2009 ACA negotiations',
        'State experiments show feasibility with challenges',
      ],
    },
  },

  overallRationale:
    'A healthcare public option scores approximately 7/10, making it Very Beneficial. It strongly addresses physiological and safety needs by expanding healthcare access and financial protection. The policy enjoys majority public support and represents a pragmatic approach to improving the healthcare system without fully replacing private insurance. Feasibility is the main limiting factor – political and industry opposition has blocked it before. If enacted, it would be a significant step toward universal coverage and improved population health.',

  sources: [
    'kff-public-option-polling',
    'urban-institute-public-option-analysis',
    'commonwealth-fund-coverage-options',
  ],
};

export default healthcarePublicOptionMethodology;
