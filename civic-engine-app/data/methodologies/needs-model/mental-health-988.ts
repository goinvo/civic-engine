/**
 * V3 Needs-Based Methodology: 988 Mental Health Lifeline
 *
 * Policy: Ensure long-term funding and specialized access (e.g., dedicated support
 * for LGBTQ+ youth) for the 988 Suicide & Crisis Lifeline.
 *
 * Overall Score: ~6.5/10 (Slightly to Moderately Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const mentalHealth988Methodology: V3PolicyMethodology = {
  policyId: 'mental-health-lifeline-988',
  policyName: '988 Mental Health Lifeline',
  description:
    'Ensure long-term funding and specialized access (e.g., dedicated support for LGBTQ+ youth via "Press 3") for the 988 Suicide & Crisis Lifeline. This policy aims to strengthen the nationwide mental health crisis response system, reduce suicides, and ensure people in crisis get care instead of police intervention.',

  needCategories: {
    physiological: {
      score: 8,
      reasoning:
        'Very positive. Mental health is integral to overall health; crisis intervention prevents suicide and self-harm. Mental health crises are health crises. By strengthening 988, the policy works to protect lives and provide immediate emotional safety. Over 85% of Americans agree 988 is an essential service that should be a funding priority.',
    },
    safety: {
      score: 9,
      reasoning:
        'Extremely positive. This is literally a life-saving policy. Suicide prevention and mental health crisis intervention are matters of life and death. Strengthening 988 means when someone is on the brink of suicide, they can quickly reach trained counselors who can de-escalate and connect them to help. Also reduces reliance on police in crisis situations.',
    },
    community: {
      score: 7,
      reasoning:
        'Moderate positive. Reduces reliance on police in crisis situations and connects people to appropriate care, improving communal well-being and trust in crisis systems. By routing crises to mental health professionals instead of law enforcement, communities see fewer dangerous police encounters with people in crisis.',
    },
    opportunity: {
      score: 6,
      reasoning:
        'Moderate positive. Better mental health support helps individuals recover and participate fully in society. People who receive crisis intervention can return to work, school, and family life rather than suffering prolonged distress or being inappropriately incarcerated.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate positive. Mental health support enables individuals to pursue personal growth and fulfillment. When people get help during crises, they can eventually move toward self-actualization rather than being trapped in cycles of untreated mental illness.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 6,
      reasoning:
        'Moderately broad impact, concentrated on those in crisis. The 988 Lifeline is available to everyone experiencing a mental health crisis. About 6% have called 988 for themselves or someone else, and 74% of Americans now know about 988. Nearly one in five Americans face mental illness in a year. Families and friends of those in crisis also benefit indirectly.',
      keyPoints: [
        '74% of Americans aware of 988',
        '6% have called 988 for themselves or others',
        '1 in 5 Americans face mental illness annually',
        'Suicide is a leading cause of death',
        'Benefits extend to families and communities',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'Extremely essential for those in crisis – a core safety/health need. This is literally a life-saving policy. Suicide prevention is a matter of life and death. Ensuring counselors are always available (reducing wait times) directly reduces suicides and saves lives. Over 85% of Americans agree 988 is an essential service that should be a funding priority.',
      keyPoints: [
        'Directly prevents suicide',
        '85%+ say 988 is essential service',
        'Reduces need for police intervention in mental health crises',
        '3 million calls, texts, chats in first year',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Short time to see benefits, within 1 year of implementation. Benefits of funding and expanding 988 can be seen immediately once resources are allocated. Unlike building physical projects, this is operational support – hiring counselors, improving systems. Wait times drop quickly, and features like LGBTQ+ youth line can roll out within months.',
      keyPoints: [
        'Operational improvements happen quickly',
        'New counselors can be hired immediately',
        'Wait times drop as resources added',
        'Builds on existing 988 framework',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Feasible with public support, but requires sustained political commitment. 64% say the country spends too little on mental health services. 80% of Americans support federal funding for 988 call centers (82% support state funding). Bipartisan law created 988. Challenge is ensuring long-term funding each budget cycle. Some partisan gap: 72% Democrats vs 50% Republicans strongly prioritize funding.',
      keyPoints: [
        '80% support federal funding for 988',
        '86% say 988 funding should be priority',
        '64% say too little spent on mental health',
        'Bipartisan law created 988',
        'Requires sustained funding commitment',
      ],
    },
  },

  overallRationale:
    'The 988 Mental Health Lifeline policy scores approximately 6.5/10 (Slightly to Moderately Beneficial, approaching Very Beneficial). It powerfully targets a crucial safety/health need – preventing suicides and improving crisis response – with profound effects on those directly affected. The high essentiality (saving lives) boosts its value significantly. The slightly lower overall score is mainly due to the narrower portion of population directly impacted at any given time and political nuances of funding it long-term. However, this policy has life-changing (and life-saving) impact for countless individuals. Strengthening 988 means anyone facing a mental health crisis can quickly access help – an unequivocal good.',

  sources: [
    'nami-988-poll',
    'ipsos-988-awareness',
    'apha-crisis-response',
    'nami-mental-health-poll',
  ],
};

export default mentalHealth988Methodology;
