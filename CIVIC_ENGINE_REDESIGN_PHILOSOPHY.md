# Civic Engine: A Design Case Study

## From Consensus Theater to Civic Practice

**Author:** Shirley Xu
**Date:** December 2024
**Status:** Design Philosophy & Case Study

---

## The Brief

I was asked to help build a "civic consensus engine" — a platform that would show Americans what policies they agree on. The theory was simple: if people could see that 70-80% of Americans support things like universal background checks or Medicare drug negotiation, they'd realize we're not as divided as the media suggests, and... something would happen. Action would follow.

The original pitch looked like this:

> Registered U.S. voters pick and rank their Top Ten policies once a month. Pay $1 to verify you're real. See a living, ranked list of where most voters agree. Politicians can be assessed by their agreement or divergence from the common ground.

My job was to make this real.

The pitch was compelling. It came with a vision:

> We are approaching a constitutional and democratic inflection point. The public is disillusioned but aligned. Most of Us gives Americans a mirror and a megaphone—to see their shared priorities and to shape the next civic infrastructure. We can't wait for elected officials. We must build it ourselves.

I believed in that. I still do. The intuition that Americans agree on more than the media suggests, and that surfacing that agreement could matter — that's not wrong. The question was always *how*.

The pitch also promised resources:

> **Co-designed with:** Voting rights orgs, behavioral economists, and tech platforms with a public-good mission.
>
> **Funding Use (Year 1): $1M**
> - National survey synthesis + Delphi panels
> - Alpha launch of the policy voting/prediction tool
> - Partnership building with civic groups, journalists, and technologists
> - Pilot tests with 5 diverse communities

I assumed these resources existed or were imminent. Delphi panels meant we'd have expert input on methodology. Pilot tests with 5 diverse communities meant we'd get real feedback before scaling. Partnership building meant there was a network to leverage.

---

## What I Actually Found

When I started working on the project, I discovered the resources were hypothetical.

There was no $1M. There were no voting rights org partnerships. There were no behavioral economists co-designing anything. There were no 5 diverse communities lined up for pilot tests.

The only external contact was a consultant who formerly worked for MITRE, who gave brief feedback once. That was the "co-design."

The project client did try to build partnerships. He reached out to the owner of Americans Agree, a similar platform that displays policy consensus data. They basically told him off. So much for "partnership building with civic groups."

The funding was a grant application, not a grant. The partnerships were aspirational, and in at least one case, actively rejected. The Delphi panels were something we might do *if* we got funded.

In retrospect, I should have asked more questions before starting. "Who are the co-design partners, and when do we meet with them?" "What's the timeline for the pilot communities?" "Is the funding secured or pending?"

I had good reason to trust the pitch. The client works with RFPs regularly and knows how to talk about funding, and they are well-connected. And critically: past projects from this client were never framed this way. There was always clarity about what existed versus what was proposed. This was the first time a project was presented with resources that turned out to be hypothetical.

**Lesson learned:** Passion projects can be framed in unexpected ways, even from seemingly reputable clients. When layers of bureaucracy hide the true details, assumptions can go unexamined. That's precisely when *you* need to ask them.

---

## Something Felt Wrong

From the beginning, something about this project felt off. I took it on because I resonated with the idea: empowering and connecting Americans through a common platform, driving policy decisions (or at least action toward them), sparking discussion on impacts and implementation. That vision was worth pursuing. But I couldn't shake a sense that what we were actually building wouldn't get us there.

However, I'd used platforms like change.org and Polymarket. I knew what it felt like to sign a petition and then... nothing. I knew what prediction markets actually did (and didn't do). The pattern of "aggregate individual inputs and display a number" was familiar, and so was the feeling of it not mattering.

I tried to articulate this to the project client. The conversations went in circles:

- "What happens after people see the consensus?"
- "They contact their representatives."
- "And then?"
- "They vote for candidates who support these policies."
- "But people already know they agree on popular things. Medicare drug negotiation polls at 80%. It didn't pass for decades."
- "That's why we need to show them."

The theory of change had a hole in the middle. See consensus → ??? → Political action. Nobody could fill in the middle step because there wasn't one.

But I couldn't prove it was wrong. I just felt it.

---

## I Did the Research

To ground my intuition, I looked at what already exists.

**pol.is** — A real-time opinion gathering system used by governments and communities worldwide. But when I read their materials closely, they emphasized *specific communities*, not universal national application. "Polis has been used all over the world by governments, academics, independent media and citizens" — always in bounded contexts with actual stakes.

**vTaiwan** — Taiwan's celebrated digital democracy initiative. It works because it's connected to actual legislation. When citizens deliberate on vTaiwan, their input feeds into real policy processes. There's a feedback loop.

**Decide Madrid** — Madrid's participatory budgeting platform. Local. Place-based. Tied to actual municipal decisions where participation has consequences.

**Polymarket** — The project client was intrigued by prediction markets. Could we adapt that mechanic? I spent time analyzing why this fundamentally couldn't work:

*Prediction markets resolve on binary outcomes.* "Will Biden win?" has a moment when it becomes true or false. "Do people support universal background checks?" has no such moment. Without resolution, there's no payout, and the entire market mechanic collapses.

*Markets measure predictions, not preferences.* If I think background checks will pass regardless of my view, I should buy those shares. That's rational. But now the "consensus" signal is decoupled from what people actually want; it's measuring political viability predictions, not genuine support.

*Markets are zero-sum.* Your winnings come from others' losses. This creates adversarial dynamics. Civic consensus should be the opposite; we're looking for common ground where everyone benefits from agreement.

I presented this research. The response was to pivot to execution: get a ranked 1-20 list by Thursday, launch before Thanksgiving, figure out the mechanics later. The structural questions I raised didn't get resolved — they got deferred.

---

## The Pattern I Noticed

Every successful example I found was **place-based and institutionally connected**.

This wasn't a coincidence. These platforms work because:
- They have defined communities (not "all Americans")
- Participation connects to actual decisions (not just awareness)
- There's accountability (not anonymous voting into the void)
- Feedback loops exist (you can see if your input mattered)

A placeless national "consensus engine" has none of this. It's trying to create community out of abstraction — as if "all registered American voters" constitutes a group that can meaningfully deliberate or act together.

I started asking: *What would it take to make this work?*

---

## The Proposal That Got Rejected

I proposed an educational version. Teachers could sign up with their classes. Students would engage with policies as a learning exercise. There would be:

- An identifiable user base (teachers, schools)
- Recurring engagement (semester cycles)
- Measurable outcomes (civic literacy metrics)
- A grant-friendly narrative (youth civic engagement)
- A potential path to sustainability (school district licensing)

Most importantly: *actual relationships*. Teacher-student. Student-student. Real people in real classrooms talking about real issues that affect their communities.

The response: "Too complicated."

The project client wanted to chase a million-dollar foundation grant with vibes about "democratic inflection points." The educational version was too concrete, too grounded, too much work.

But I kept thinking about why it would work when the original wouldn't.

---

## Why the Original Design Fails: The Distortion Problem

Here's what I eventually understood: **the original design doesn't measure what people believe. It measures how people respond to an imposed framework.**

When a system defines the policy list, determines the "goodness score," and forces users into rankings, it's not listening — it's extracting. The signal you get back reflects your assumptions more than users' actual values.

Consider:
- **The policy list constrains expression.** Users can only support what's offered, not what they actually prioritize. If "affordable housing" isn't on the list, that preference is invisible.
- **"6th grade language" flattens nuance.** Simplification for accessibility becomes simplification that distorts. Complex trade-offs become false binaries.
- **Forced ranking creates artificial trade-offs.** Do I care more about healthcare or education? In real life, I care about both in context-dependent ways. Ranking them against each other produces a signal, but not a meaningful one.

The project client wanted people to be able to "vote on policies." But voting on a pre-selected list with imposed categories isn't democratic expression — it's a survey with better UX.

**The deeper issue:** The price signal (if we'd used market mechanics) or the ranking signal (what we actually built) reflects a simplified "rational actor" who has stable preferences and optimizes based on clear incentives. But actual citizens form views through relationship and deliberation. Their preferences are context-dependent, evolving, shaped by community and identity. Using mechanisms designed for rational actors to measure civic preferences imports a theory of human behavior that misrepresents how politics actually works.

This is why the "consensus" you measure isn't genuine agreement — it's a projection of system assumptions onto political life.

---

## Why the Original Design Fails: The Commons Problem

I came across Elinor Ostrom's work on governing commons — how communities manage shared resources without top-down control or privatization. Reading her, something clicked:

**Civic consensus is itself a commons.** It's collective knowledge about what we agree on. And the original design violates nearly every principle Ostrom identified for successful commons governance.

| What Successful Commons Need | What the Original Design Does |
|-----------------------------|------------------------------|
| **Clear boundaries** — You need to know who's in the community | "All Americans" is not a community. There's no "we" to govern anything. |
| **Local fit** — Rules must match local conditions | A universal national policy list ignores that what matters in rural Maine ≠ what matters in Houston. |
| **Participation in rule-making** — Those affected must help shape the rules | Users have no input on how the platform works. They can only participate in what someone else designed. |
| **Transparency** — Community members must be able to monitor what's happening | The "goodness score" is opaque. "Trust our methodology" is not transparency. |
| **Accountability** — There must be mechanisms to enforce norms | The platform has no norms, no enforcement, no way to maintain quality. |
| **Conflict resolution** — Disagreement is inevitable and must be addressed | The design flattens disagreement into "consensus" rather than engaging with it. |
| **Self-organization** — The community must have genuine power | Platform owner controls everything. Users are subjects, not citizens. |
| **Nested scales** — Commons work at multiple levels that connect | The design is flat — no local, regional, or state-level structure. |

The result: Instead of enabling honest feedback from Americans, the design produces a distorted signal imposed on a non-functional commons. It looks like democracy but has none of the structural conditions that make democratic participation meaningful.

---

## Why the Original Design Fails: The Feedback Problem

I also started thinking in terms of systems and feedback loops. The original design has none.

Users vote → They see a ranking → Nothing changes.

That's it. There's no mechanism for the output to influence the input. Users can't learn, adapt, or revise based on what they see. The system can't detect whether its "consensus" signal is meaningful or garbage. There's no way to know if you're measuring genuine agreement or survey fatigue.

This is what Ashby called the "requisite variety" problem: a controller must have at least as much variety as the system it's trying to control. Simple rankings can't capture complex, contextual political preferences. The instrument is too blunt for what it's trying to measure.

The classroom provides what the platform cannot: rapid feedback cycles. Students discuss, form positions, hear other perspectives, reflect, revise. The loop closes. Learning happens. Positions evolve through engagement rather than being extracted once and frozen.

---

## Why the Educational Version Works

So why would the educational version succeed where the original fails?

**It has actual relationships.**

Teacher-student and student-student bonds exist before and after any policy discussion. These aren't strangers voting in isolation — they're people in ongoing relationships where they'll have to face each other tomorrow. That creates accountability, nuance, and genuine stakes.

**It's grounded in place.**

A classroom in Phoenix discussing water policy isn't the same as a classroom in Detroit discussing the same thing. And that's *good*. The differences are pedagogically valuable. Students learn that context matters, that policy trade-offs look different from different positions, that "consensus" doesn't mean everyone agrees — it means we've learned to deliberate across difference.

**It builds capacity, not just awareness.**

The research on civic education is clear. When students spend significant time discussing controversial political issues, with real student-to-student talk, they become more interested in politics, more comfortable with disagreement, and more likely to engage in civic life.

This isn't speculation — there are longitudinal studies. Hess and McAvoy followed 1,000 students across 21 schools. McDevitt and Chaffee found that deliberative instruction predicted, *one year later*, increased news attention, larger discussion networks, and greater willingness to engage with opposing views.

The mechanism is "deliberative learning" — interactive engagement creates habits of civic discourse that spread to families and peer groups. These effects compound over time.

**It satisfies what the original violates.**

| What the Commons Needs | How Classrooms Provide It |
|-----------------------|---------------------------|
| Clear boundaries | A specific class with known participants |
| Local fit | Teachers can include local issues and adapt to context |
| Participation in rules | Students help define discussion norms |
| Transparency | Students see how the discussion unfolds and views aggregate |
| Accountability | Classroom norms with teacher facilitation |
| Conflict resolution | Teacher-guided deliberation that engages disagreement |
| Self-organization | Students have genuine voice in the process |
| Nested scales | Classroom → school → district → state (potentially) |

**It closes the feedback loop.**

Students deliberate → form positions → see how their views relate to others' → reflect → revise. The loop closes. Learning happens. This is what civic education research calls "capability building" — developing the actual skills democracy requires, not just informing people about what they supposedly agree on.

---

## The Core Insight

The original Civic Engine asks: *How do we show Americans what they agree on?*

The redesigned version asks: *How do we help Americans practice the skills democracy requires?*

The first question has no viable theory of change. Knowing you agree with strangers doesn't create political power, build relationships, or develop capacity. It's the political equivalent of "raising awareness."

The second question does have a theory of change: Students develop civic capabilities through structured deliberation → become more informed, engaged citizens → participate more effectively in democratic processes. This is a well-researched causal chain with empirical support.

**Agreement isn't the goal. Capacity is the goal.**

A democracy doesn't need everyone to agree. It needs citizens who can:
- Articulate positions with reasons
- Listen to opposing views without dismissal
- Revise positions based on new information
- Accept legitimate processes even when they lose
- Organize with others around shared concerns

These are skills developed through practice, not information consumed from a platform.

---

## The Redesign

### Core Concept

The platform becomes **infrastructure for civic practice** rather than a display of consensus. The unit of engagement shifts from the individual user to the **deliberative cohort** — typically a classroom, but potentially community groups, book clubs, civic organizations.

### User Roles

**Teachers (Facilitators)**
- Create cohorts (classes)
- Select or customize policy sets for discussion
- Access facilitation guides aligned with civic education standards
- View analytics on participation and discussion quality
- Connect with other teachers using the platform
- *Responses are anonymized for grading* (can assess reasoning quality without knowing which student holds which position)

**Students (Deliberators)**
- Join cohorts via invite code
- Engage with policy materials at multiple reading levels (choice, not mandate)
- Participate in structured discussions with prompted reflections
- Vote on priorities with *required reasoning* (not just clicking)
- See how their cohort's views compare to other cohorts
- Generate shareable results for social media

**Cohorts (The Primary Unit)**
- Maintain their own discussion threads
- Develop their own priority rankings
- Can view (but not be flattened into) cross-cohort patterns
- Persist over semester/year for longitudinal engagement

### Architecture

```
    ┌─────────────┐
    │   Cohort A  │──── Students discuss, vote, share
    │  (Phoenix)  │
    └──────┬──────┘
           │ horizontal connection (optional)
    ┌──────┼──────┐
    │      │      │
┌───┴───┐  │  ┌───┴───┐
│Cohort B│──┼──│Cohort C│
│(Detroit)│  │  │(Houston)│
└───────┘  │  └───────┘
           │
    ┌──────┴──────┐
    │   Cohort D  │
    │ (Rural Maine)│
    └─────────────┘

Each cohort is autonomous. No single "consensus" is produced.
Patterns can be observed. Difference is preserved as valuable.
```

### Feature Set

**For Teachers:**
- Cohort management (create class, set active policy set, schedule discussion phases)
- Facilitation resources (discussion guides, Socratic prompts, alignment with C3 Framework)
- Analytics dashboard (participation rates, discussion quality, position distribution)
- Teacher network (connect with other educators, share strategies)

**For Students:**
- Policy exploration (multiple reading levels, "dig deeper" expansions, source citations)
- Structured discussion (threaded discussions, "steelman" requirements, civility norms)
- Priority voting (select top policies with reasoning, see aggregation after submission, track position changes)
- Sharing (individual civic profile, cohort results, social media optimized formats)

**Cross-Cohort:**
- Pattern observation ("cohorts in urban areas tend to prioritize X" — framed as patterns, not prescriptions)
- Inter-cohort dialogue (teachers can connect cohorts for structured exchange)
- Research layer (anonymized data for civic education researchers, IRB-compliant)

### Handling Policy Conflicts Honestly

The original project wanted to merge M4A with Public Option and UBI with FJG because "nobody campaigns on both" and "that drives apart consensus."

This is absurd. M4A eliminates private insurance; Public Option competes with it. These are philosophically opposed approaches. Merging them doesn't create consensus — it creates mush that nobody actually supports.

The redesign handles this correctly:

**Healthcare Policy Set:**
- Medicare for All (single-payer)
- Public Option (government competes with private)
- ACA Expansion (current system improved)
- Market-based reforms

**Students discuss:**
- What are the actual differences?
- Who benefits from each approach?
- What are the trade-offs?
- What does your community need?

The tension between options is pedagogically valuable. Learning to distinguish policy alternatives and reason about trade-offs IS the civic skill being developed.

---

## How It Grows

Growth happens through **teacher-to-teacher spread**, not viral consumer adoption:

1. Teacher A uses platform, finds value
2. Teacher A mentions it to Teacher B at a conference
3. Teacher B adopts, adapts for their context
4. Teachers A and B connect their cohorts
5. Pattern spreads through professional networks

This is slower than "go viral" but produces:
- Deeper implementation
- Contextual adaptation
- Professional community
- Sustainable adoption

The social sharing loop serves different purposes than "awareness":
- **Identity formation:** "I am someone who thinks about policy"
- **Peer influence:** Friends see civic engagement as normal
- **Platform discovery:** Peers ask "what is this?"
- **Narrative building:** Students can articulate their development over time

---

## Comparison

| Dimension | Original Model | Redesign |
|-----------|---------------|----------|
| Unit of engagement | Individual user | Deliberative cohort |
| Theory of change | See consensus → ??? → Action | Practice deliberation → Build capacity → Civic skills |
| Relationship model | Platform ↔ User (transactional) | Teacher ↔ Students ↔ Peers (relational) |
| Scale model | Viral individual adoption | Institutional spread through educator networks |
| Success metric | Users, page views | Civic learning outcomes, cohort completion |
| Funding model | Chase foundation grants | Education grants, district licensing |
| Place | Placeless universalism | Cohorts grounded in actual communities |
| Diversity | Flatten into "consensus" | Preserve as pedagogically valuable |
| Policy conflicts | Merge incompatible options | Teach the distinction as civic skill |
| Feedback loops | None | Closed loops with learning and adaptation |
| Commons principles | Violates all 8 | Satisfies all 8 |

---

## Addressing Objections

**"This is smaller scale."**

Yes. But it's real scale vs. fake scale. 10,000 passive users who glance at a list ≠ 500 students who practiced deliberation for a semester. Quality of engagement matters more than quantity for civic outcomes.

**"Schools are hard to work with."**

They are. But they're also:
- Recurring (students every year)
- Funded (education budgets exist)
- Legitimizing (association with learning, not politics)
- Relationship-rich (teachers talk to each other)

Hard ≠ wrong. The difficulty is a moat against shallow competitors.

**"This doesn't fix Congress."**

Correct. Neither does a consensus display platform.

But this builds:
- A generation of citizens with deliberative skills
- A network of civically engaged educators
- Research on what civic learning interventions work

These compound over decades. "Raising awareness" doesn't compound.

**"Students can't vote yet."**

They will. And the skills formed at 16 persist at 26.

More importantly: civic engagement isn't only voting. It's discussion, community participation, understanding trade-offs, engaging with difference. These matter at any age.

---

## Conclusion

I was asked to build a platform that shows Americans what they agree on. I ended up understanding why that approach can't work — and what might work instead.

The original vision wasn't wrong. We *are* at a democratic inflection point. The public *is* disillusioned but more aligned than they realize. Americans *do* need a mirror and a megaphone. The instinct behind the project was sound.

What was wrong was the mechanism. You can't create civic infrastructure by extracting rankings from isolated individuals. You can't build community from abstraction. You can't produce political power by displaying a list.

The design decisions I made throughout this project were attempts to honor the original vision while working around the parts that were intractable. The scoring models, the policy research, the visualization work — I tried to make something that could actually achieve what the pitch promised. When I proposed the educational version, I was trying to find a path where "see your shared priorities and shape the next civic infrastructure" could actually happen, even if it looked different than the client imagined.

The original model fails because it tries to extract signal from abstraction. "All Americans" is not a community. A pre-defined policy list is not democratic expression. A ranking is not deliberation. The feedback loop doesn't close. The commons principles are violated. The whole thing produces distorted data that looks like consensus but represents nothing.

The educational version works because it's grounded in what actually makes civic engagement meaningful: real relationships, real places, real practice. Teachers and students deliberating together in classrooms, connected horizontally to other classrooms, building capacity that compounds over time.

This is a tool that could actually matter — not because it solves polarization with a list, but because it helps the next generation practice what democracy demands.

The vision was worth fighting for. I just couldn't build it the way I was asked to.

---

## Appendix: Theory of Change Diagram

```
┌────────────────────────────────────────────────────────────────┐
│  INPUTS                                                        │
│  - Teachers seeking civic education tools                      │
│  - Students in required civics courses                         │
│  - Policy content with transparent methodology                 │
│  - Facilitation guides and discussion prompts                  │
└──────────────────────────┬─────────────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  ACTIVITIES                                                    │
│  - Cohort formation (teacher creates, students join)           │
│  - Policy exploration (multiple reading levels)                │
│  - Structured discussion (prompted, facilitated)               │
│  - Priority voting with reasoning                              │
│  - Cross-cohort pattern observation                            │
│  - Result sharing (individual and cohort)                      │
└──────────────────────────┬─────────────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  OUTPUTS                                                       │
│  - Completed deliberation cycles                               │
│  - Student reasoning artifacts                                 │
│  - Cohort priority rankings                                    │
│  - Shared civic profiles                                       │
│  - Teacher network connections                                 │
└──────────────────────────┬─────────────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  SHORT-TERM OUTCOMES                                           │
│  - Increased policy knowledge                                  │
│  - Improved deliberation skills                                │
│  - Reduced affective polarization within cohorts               │
│  - Teacher adoption and adaptation                             │
└──────────────────────────┬─────────────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────────────┐
│  LONG-TERM IMPACT                                              │
│  - Generation of citizens with deliberative capacity           │
│  - Normalized civic engagement in peer culture                 │
│  - Evidence base for civic education practice                  │
│  - Sustainable platform embedded in educational system         │
└────────────────────────────────────────────────────────────────┘
```

---

## Appendix: References

Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. *Psychological Inquiry*, 11, 227-268.

Hess, D. E., & McAvoy, P. (2014). *The Political Classroom: Evidence and Ethics in Democratic Education*. Routledge.

McDevitt, M., & Chaffee, S. (2002). From top-down to trickle-up influence: Revisiting assumptions about the family in political socialization. *Political Communication*, 19, 281-301.

Ostrom, E. (1990). *Governing the Commons: The Evolution of Institutions for Collective Action*. Cambridge University Press.

Samuelsson, M. (2016). Education for deliberative democracy: A typology of classroom discussions. *Democracy & Education*, 24(1), Article 5.

Sen, A. (1999). *Development as Freedom*. Oxford University Press.

---

*This document is a design case study for an alternative approach to civic technology, developed through the experience of working on a project whose original brief I came to see as fundamentally flawed.*
