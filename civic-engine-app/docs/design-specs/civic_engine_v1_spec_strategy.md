# Civic Engine: Project Spec & Strategy

**Version:** 1.0  
**Date:** January 2025  
**Sprint:** 2 weeks  
**Team:** GoInvo

---

## Executive Summary

Civic Engine is a two-phase civic infrastructure tool that moves beyond false consensus polling to build real political power.

**Phase 1** (this sprint): A platform where Americans identify priority problem areas and explore implementation approaches — surfacing where agreement and disagreement actually live.

**Phase 2** (post-partnership): Connect users to local candidates who share their implementation preferences, driving volunteers and small-dollar donors to down-ballot races.

**Theory of change:** User preferences → Candidate matching → Volunteer/donor pipeline → More aligned candidates win → Policy change

This is not a suggestion box. It's the preference infrastructure for a new kind of voter engagement.

---

## The Problem We're Solving

### What Exists Now

| Tool | What It Does | Why It Fails |
|------|--------------|--------------|
| Traditional polling | "Do you support X?" | Measures reactions to vague language, not real preferences |
| Policy quizzes (ISideWith) | Match users to candidates on positions | Binary positions hide implementation disagreements |
| Candidate endorsement sites | List who supports whom | No user agency; passive consumption |

### The Gap

Americans agree on problems (healthcare costs are too high). They disagree on solutions (single-payer vs. public option vs. market reforms). Current tools measure the fake consensus, not the real debate.

Meanwhile, 64.5% of local races are uncontested. Candidate pipeline organizations (Run for Something, Arena, Emerge) have proven they can elect first-time candidates at 40-90% win rates — but they lack infrastructure to connect aligned citizens to their candidates.

### Our Opportunity

Build the preference layer that:
1. Surfaces where Americans actually agree and disagree (implementation level)
2. Connects to action (candidate matching, volunteer pipeline)
3. Complements existing orgs rather than competing with them

---

## Strategic Framework

### Two-Phase Architecture

```
PHASE 1: Preference Infrastructure (This Sprint)
┌─────────────────────────────────────────────────────────┐
│  User selects priority PROBLEM AREAS                    │
│  (not policies — problems they want solved)             │
│                         ↓                               │
│  Within each area, user explores IMPLEMENTATION         │
│  APPROACHES with explicit tradeoffs                     │
│                         ↓                               │
│  Platform aggregates: where's real agreement?           │
│  Where does "consensus" break down?                     │
│                         ↓                               │
│  Output: Map of the real debate, not false consensus    │
└─────────────────────────────────────────────────────────┘

PHASE 2: Candidate Matching (Post-Partnership)
┌─────────────────────────────────────────────────────────┐
│  User's priority areas + implementation preferences     │
│                         ↓                               │
│  Match to LOCAL CANDIDATES who share approach           │
│  (sourced from partner orgs + candidate database)       │
│                         ↓                               │
│  Surface: "Here's who's running on what you believe"    │
│                         ↓                               │
│  Action: Volunteer, donate, share                       │
│                         ↓                               │
│  Loop closes: Preferences → Power                       │
└─────────────────────────────────────────────────────────┘
```

### Why Phase 1 First

- Builds user base before we need candidate data
- Tests whether users engage at implementation level
- Generates preference data the matching algorithm requires
- Standalone value as "disagreement map" for journalists, researchers, advocates
- Partnership leverage: we bring users, partners bring candidate data

---

## Phase 1 Spec: Preference Infrastructure

### Core User Flow

```
1. ONBOARDING
   "What problems matter most to you?"
   → Select 3-5 from problem area list
   → Optional: propose a problem area not listed

2. DEEP DIVE (per problem area)
   "Here are approaches people propose for [Healthcare Costs]"
   → See 3-5 implementation options with explicit tradeoffs
   → Rate each: Strong support / Support / Neutral / Oppose / Strong oppose
   → Optional: "None of these" + write-in

3. SYNTHESIS
   "Here's your priority profile"
   → Your problem areas ranked
   → Your implementation preferences within each
   → Comparison to aggregate (where you align/diverge)

4. OUTPUT
   "Here's what Americans actually think"
   → National/regional breakdown
   → Where consensus is real vs. illusory
   → Key tradeoffs that predict disagreement
```

### Problem Areas (Initial Set)

Sourced from major policy platforms, polling, and public discourse. Not exhaustive — users can propose additions.

| Problem Area | Sample Implementation Approaches |
|--------------|----------------------------------|
| Healthcare costs | Single-payer, public option, market competition, price controls |
| Housing affordability | Rent stabilization, zoning reform, subsidies, public housing |
| Climate change | Carbon tax, green investment, nuclear expansion, regulation |
| Education quality | School choice, increased funding, teacher pay, curriculum reform |
| Immigration | Pathway to citizenship, enforcement-first, guest worker programs |
| Economic opportunity | Job training, minimum wage, UBI, small business support |
| Criminal justice | Police reform, sentencing reform, rehabilitation focus, community alternatives |
| Democratic reform | Voting access, gerrymandering, money in politics, term limits |
| Childcare/family | Paid leave, childcare subsidies, tax credits, universal pre-K |
| Gun policy | Background checks, red flag laws, assault weapons, mental health focus |

**Design principle:** These are PROBLEMS, not positions. "Healthcare costs" is neutral. The implementations are where values appear.

### Implementation Option Structure

Each implementation option includes:

```
{
  "id": "healthcare_singlepayer",
  "problem_area": "healthcare_costs",
  "title": "Government-provided insurance for all",
  "description": "Replace private insurance with a single government program covering all Americans",
  "tradeoffs": {
    "benefits": [
      "Universal coverage",
      "Simplified administration", 
      "Negotiating power on prices"
    ],
    "costs": [
      "Higher taxes",
      "Eliminates private insurance jobs",
      "Government control of healthcare decisions"
    ]
  },
  "source": "Medicare for All Act (Sanders/Jayapal)",
  "endorsing_orgs": ["Justice Democrats", "DSA", "National Nurses United"],
  "opposing_orgs": ["Chamber of Commerce", "AHIP"]
}
```

**Key design choices:**
- Explicit tradeoffs prevent "agree with everything" bias
- Source attribution shows where option comes from
- Endorsing/opposing orgs enable Phase 2 matching

### Data Model

```
USER
├── id
├── location (zip → enables geographic analysis + Phase 2 local matching)
├── created_at
└── preferences[]
    ├── problem_area_id
    ├── priority_rank (1-5)
    └── implementation_ratings[]
        ├── implementation_id
        └── rating (-2 to +2 scale)

PROBLEM_AREA
├── id
├── title
├── description
├── status (active, proposed, archived)
└── implementations[]

IMPLEMENTATION
├── id
├── problem_area_id
├── title
├── description
├── tradeoffs{}
├── source
├── endorsing_orgs[]
├── opposing_orgs[]
└── created_at

AGGREGATE (computed)
├── problem_area_id
├── geography (national, state, metro, zip)
├── priority_score (avg rank × selection frequency)
├── implementation_distribution{}
└── consensus_index (how concentrated vs. distributed are preferences)
```

### Alignment Scoring System (Foundation for Phase 2)

```
User Alignment Score (user_a, user_b) =
  (Priority Overlap × 0.4) + (Implementation Match × 0.6)

Priority Overlap:
  - Jaccard similarity of top 5 problem areas
  - J(A,B) = |A ∩ B| / |A ∪ B|
  - Score: 0.0 to 1.0

Implementation Match:
  - Within shared problem areas only
  - Cosine similarity of rating vectors
  - Score: 0.0 to 1.0

Weighted toward implementation (60%) because:
  - Problem agreement is common (false consensus)
  - Implementation agreement is rare (real alignment)
  - Phase 2 matching needs to surface genuine allies
```

**For Phase 2 candidate matching:**
```
Candidate Alignment Score (user, candidate) =
  (Priority Overlap × 0.4) + (Implementation Match × 0.6)

Where candidate.implementation_ratings are inferred from:
  1. Direct questionnaire responses (ideal)
  2. Voting record (for incumbents)
  3. Endorsement proxy: candidate endorsed by org X → 
     inherit org X's typical implementation positions
  4. Campaign materials (parsed/structured)
```

### V1 Scope (2-Week Sprint)

**In scope:**
- [ ] Problem area selection (10 initial areas)
- [ ] Implementation exploration (3-5 options per area)
- [ ] User preference storage
- [ ] Basic aggregation (national level)
- [ ] "Your profile" summary view
- [ ] "How Americans compare" aggregate view
- [ ] Mobile-responsive design

**Out of scope (Phase 2+):**
- Candidate database
- Candidate matching algorithm
- Volunteer/donate action pathways
- Geographic filtering (beyond basic zip capture)
- User-proposed problem areas (capture for later, don't display)
- Deliberation features

### Success Metrics (V1)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Completion rate | >60% | Users engage through full flow |
| Implementation engagement | >3 areas rated per user | Deep engagement, not just priority selection |
| Return visits | >20% within 7 days | Ongoing value, not one-time curiosity |
| Geographic coverage | 40+ states represented | National validity claim |
| "None of these" rate | <30% per area | Implementation options resonate |

---

## Phase 2 Strategy: Candidate Matching

### Partnership Model

**We bring:**
- User preference data (aggregated, privacy-preserving)
- Volunteer/donor pipeline infrastructure
- Design and engineering

**Partners bring:**
- Candidate database (who's running, where, on what)
- Endorsement data (which candidates they support)
- Credibility with candidates (questionnaire completion)

### Target Partners

| Organization | What They Have | Partnership Angle |
|--------------|----------------|-------------------|
| Run for Something | 3,500+ endorsed candidates, policy screening data | "We'll drive volunteers to your candidates" |
| Arena | Trained campaign staff, race tracking | "We'll help your candidates find aligned supporters" |
| Emerge America | 7,000+ trained women candidates | "We'll connect your alums to their base" |
| Vote Smart | Candidate positions database | Data licensing/integration |
| Ballotpedia | Race coverage, candidate info | Data partnership |

### Partnership Pitch (Summary)

> "Run for Something has proven you can elect first-time candidates at 4x the typical win rate. But finding volunteers and small-dollar donors for down-ballot races remains hard. 
>
> We're building the preference infrastructure that identifies which citizens care about which implementation approaches — at the local level. Phase 2 connects those citizens directly to your endorsed candidates who share their priorities.
>
> You've built the candidate pipeline. We'll build the supporter pipeline. Together: more aligned candidates win."

### Phase 2 User Flow (Preview)

```
After completing Phase 1 preferences:

"Based on your priorities, here are candidates in [Your Area] 
who share your approach:"

┌─────────────────────────────────────────────────────┐
│ SCHOOL BOARD - District 4                           │
│ ─────────────────────────────────────────────────── │
│ Maria Santos                                        │
│ 87% aligned with your priorities                    │
│                                                     │
│ Shared priorities: Education quality, Housing       │
│ Approach match: Increased funding, teacher pay      │
│                                                     │
│ Endorsed by: Run for Something, Local Teachers Union│
│                                                     │
│ [Volunteer] [Donate $25] [Share] [Learn More]       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ STATE HOUSE - District 12                           │
│ ─────────────────────────────────────────────────── │
│ James Chen                                          │
│ 72% aligned with your priorities                    │
│                                                     │
│ Shared priorities: Healthcare costs, Climate        │
│ Approach match: Public option, Carbon tax           │
│                                                     │
│ Endorsed by: Arena, Sierra Club                     │
│                                                     │
│ [Volunteer] [Donate $25] [Share] [Learn More]       │
└─────────────────────────────────────────────────────┘
```

---

## Addressing Prior Concerns

### "Doesn't include all Americans"

**Phase 1** is open to all Americans — anyone can express preferences on problem areas and implementations. No geographic or demographic restrictions.

**Phase 2** scales to wherever we have candidate data. Starts with partner-endorsed candidates (likely progressive-leaning), expands as we build/license broader candidate databases.

### "False consensus" problem

**Solved by architecture:**
- Problem areas surface agreement (real)
- Implementation options surface disagreement (also real)
- Output is "map of the debate," not "mandate"
- Explicit tradeoffs prevent "agree with everything" bias

### "No pathway to power"

**Solved by Phase 2:**
- Candidate matching connects preferences to action
- Volunteer/donate buttons close the loop
- Partner orgs have proven 40-90% win rates
- Preferences → candidates → elections → policy

### "Placeless universalism"

**Partially addressed:**
- Zip code capture enables geographic analysis
- Phase 2 matching is inherently local (your races, your candidates)
- Could add local deliberation features in future versions

---

## Timeline

### Sprint 1: V1 Build (Weeks 1-2)
- Data model implementation
- Problem areas + implementations content
- Core user flow (selection → rating → synthesis)
- Aggregate computation
- Basic UI

### Post-Sprint: Partnership Outreach (Weeks 3-4)
- Juhan reaches out to Run for Something, Arena, Emerge
- Share V1 demo
- Pitch Phase 2 collaboration
- Identify pilot geography with candidate coverage

### Phase 2 Build (TBD, contingent on partnership)
- Candidate database integration
- Matching algorithm implementation
- Action pathways (volunteer, donate)
- Pilot launch in partner-covered geography

---

## Open Questions

1. **Content sourcing:** Who writes the implementation option descriptions? Need to ensure neutrality and completeness. Consider: policy researcher review, multiple perspectives per option.

2. **Pilot geography:** Where do we have best candidate data coverage for Phase 2 pilot? Likely depends on partner response.

3. **Sustainability model:** How does this sustain itself? Options: foundation funding, partner revenue share on donations, licensing to campaigns/orgs.

4. **Expansion of problem areas:** User-proposed areas — how do we vet and add? Community voting? Editorial review?

---

## Appendix: Research Foundation

This strategy is informed by:

- **Candidate support landscape research:** Run for Something, Arena, Emerge achieve 40-90% win rates through campaign mechanics support, but no org provides policy platform tools
- **64.5% of local races uncontested** (Ballotpedia 2024) — recruitment and engagement is the core problem
- **"Progressive paradox"** (Stanford PACS) — popular policies don't guarantee wins; framing and authenticity matter more
- **vTaiwan, Citizens' Assemblies** — successful civic tech connects to real decisions and enables deliberation, not just voting
- **Civic education research** (Hess & McAvoy, ICCS) — open classroom climate and deliberation skills transfer to adult civic engagement

---

*Document prepared for GoInvo internal use and partner discussions.*
