/**
 * V3 Needs-Based Methodology: Universal Background Checks
 *
 * Policy: Require background checks on all gun sales or transfers, closing the loopholes
 * (like private sales at gun shows or online) that currently bypass checks.
 *
 * Overall Score: ~8/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const universalBackgroundChecksMethodology: V3PolicyMethodology = {
  policyId: 'universal-background-checks',
  policyName: 'Universal Background Checks for Firearms',
  description:
    'Universal background checks for firearms mean that all gun sales or transfers would require a background check on the purchaser, closing the loopholes (like private sales at gun shows or online) that currently bypass checks. The goal is to prevent guns from being sold to people who are prohibited (such as felons, domestic abusers, those with severe mental illness histories) no matter where the sale occurs.',

  needCategories: {
    physiological: {
      score: 7,
      reasoning:
        'While background checks don\'t provide food or shelter, reducing gun violence has a direct effect on preserving life and physical well-being. Every life saved from a shooting is a person\'s basic existence and health preserved. Gun violence is a leading cause of premature death in the U.S. (especially for young people), so a policy that can prevent some of those deaths serves the most basic need of all – the need to stay alive.',
    },
    safety: {
      score: 9,
      reasoning:
        'This is the core category. Universal background checks are aimed at protecting people from violence – making it harder for dangerous individuals to obtain firearms should lead to fewer violent crimes and tragic incidents. Research supports the safety impact: states requiring universal background checks for all gun sales had 15% lower homicide rates than states without such laws. Another analysis shows these laws correlate with lower gun trafficking across state lines.',
    },
    community: {
      score: 7,
      reasoning:
        'Gun violence doesn\'t just harm individuals; it erodes the fabric of communities. High rates of shootings create fear, trauma, and instability in neighborhoods. By reducing gun violence, universal background checks would help restore a sense of security and trust in communities, allowing people to gather in public or send kids to school with less fear. There\'s also a unifying aspect in that ~93% of Americans agree on this policy.',
    },
    opportunity: {
      score: 5.5,
      reasoning:
        'This is not directly an economic or education policy. However, indirectly, areas plagued by gun violence often suffer economically (businesses shutter, property values drop, students miss school or underperform due to trauma). Making communities safer can improve the economic opportunity climate in the long term – fewer shootings means more stability for local businesses and better educational outcomes.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'In a society with less fear of random violence, individuals can focus more on higher needs like personal growth, creativity, and community involvement. Survivors of gun violence and their families often have lifelong trauma that hampers their life goals; preventing those incidents allows more people to pursue their aspirations unimpeded. This frees people from fear, which is conducive to personal fulfillment.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Virtually the entire population stands to benefit, because anyone could be a victim of gun violence (though risk is higher in certain demographics or areas). By closing loopholes, all citizens get an extra layer of protection that felons and other dangerous individuals will find it harder to arm themselves. Over 100 million adults own guns and would be part of the new system, but for the law-abiding it\'s not a harm, just a minor process change.',
      keyPoints: [
        'Essentially all Americans have passive safety benefit',
        'Over 100 million gun owners affected',
        'Minor process change for law-abiding citizens',
        'Extra protection against dangerous individuals',
      ],
    },
    essentialToSurvival: {
      score: 9,
      reasoning:
        'This policy literally concerns matters of life and death. Gunshots kill ~45,000 Americans each year (including homicides, suicides, accidents). Background checks won\'t eliminate all gun violence, but even if they reduce a fraction of those deaths, it\'s directly saving lives. One study found denying guns to people with violent misdemeanor convictions led to those individuals being 22% less likely to be later arrested for violent crimes.',
      keyPoints: [
        '~45,000 Americans killed by guns annually',
        'Directly about preventing deaths and trauma',
        '22% reduction in violent crime arrests for denied buyers',
        'One of most critical justice interventions for preserving life',
      ],
    },
    timeToOutcome: {
      score: 8,
      reasoning:
        'Once implemented, universal background checks could have an immediate effect on gun sales. From day one, every attempted purchase will go through the system – meaning prohibited buyers will be stopped right then and there. The cumulative impact on crime might be seen within the first year or two. Any single thwarted sale to a felon could prevent an immediate shooting next week – so the benefit starts Day 1 in potential.',
      keyPoints: [
        'Immediate effect on gun sales',
        'Prohibited buyers stopped from Day 1',
        'Crime impact visible within 1-2 years',
        'No long lag for basic functionality',
      ],
    },
    feasibility: {
      score: 6,
      reasoning:
        'Despite near-universal public support (~93%), federal enactment has been challenging. Political opposition from gun-rights advocates and organizations (like the NRA) has stalled it. A universal background check bill passed the House in 2019 and 2021, but was never brought to a Senate vote. However, 22 states plus DC have implemented their own laws, proving it\'s workable. The system is in place; main barriers are political, not practical.',
      keyPoints: [
        '93% public support',
        'Passed House in 2019 and 2021',
        'Blocked in Senate by filibuster',
        '22 states + DC have their own laws',
        'System exists and is scalable',
        'Political barriers are main obstacle',
      ],
    },
  },

  overallRationale:
    'We assign universal background checks a strong "very beneficial" rating of ~8/10. It predominantly targets the Safety need (30% weight) with great efficacy – potentially saving thousands of lives and preventing injuries by reducing gun violence. When ~93% of Americans agree on something, the benefit is usually obvious and drawbacks minimal. Law-abiding gun owners face only minor inconvenience while the benefits include lives saved, crimes prevented, and possibly a reduction in the terror of mass shootings over time.',

  sources: [
    'quinnipiac-background-checks-poll',
    'bu-sph-background-checks-homicide',
    'everytown-background-check-laws',
    'pmc-background-check-policies',
    'courier-journal-gun-control',
  ],
};

export default universalBackgroundChecksMethodology;
