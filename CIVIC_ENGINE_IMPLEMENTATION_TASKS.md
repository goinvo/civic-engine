# Civic Engine Education Fork: Implementation Tasks

## Overview

This document breaks down the development work required to build the education fork of Civic Engine. Tasks are organized by priority and dependency.

**Existing codebase provides:**
- Policy data and scoring models (v1, v2, v3)
- UI components for policy display
- Share card generation (Remotion)
- Basic Next.js app structure

**New features required:**
- User authentication (teacher/student roles)
- Cohort (class) management
- Discussion system
- Position capture with reasoning
- Analytics dashboard
- Cross-cohort patterns

---

## Phase 1: Foundation

These are blockers for everything else.

### 1.1 Authentication System

**Goal:** Teachers and students can create accounts and log in.

| Task | Description | Complexity |
|------|-------------|------------|
| Set up auth provider | NextAuth.js or Clerk for authentication | Medium |
| Teacher registration | Email, school, state, subjects, grade levels | Medium |
| Email verification | Verify teacher emails (prefer .edu domains) | Low |
| Student join flow | Join via class code, create display name + password | Medium |
| Role-based access | Distinguish teacher vs student permissions | Medium |
| Session management | Persistent sessions, logout, password reset | Low |

**Database schema:**
```
users
  - id
  - email
  - password_hash
  - role (teacher | student)
  - display_name
  - created_at

teacher_profiles
  - user_id (FK)
  - school_name
  - state
  - subjects (array)
  - grade_levels (array)

student_profiles
  - user_id (FK)
  - cohort_id (FK)
  - joined_at
```

### 1.2 Cohort (Class) Management

**Goal:** Teachers can create classes, students can join them.

| Task | Description | Complexity |
|------|-------------|------------|
| Create cohort | Teacher creates class with name, grade level, size | Low |
| Generate join code | Unique, readable code (ABC-1234 format) | Low |
| Join cohort | Student enters code, joins class | Low |
| Cohort dashboard | Teacher sees list of their classes | Medium |
| Student list | Teacher sees who has joined (names only) | Low |
| Leave/remove | Student can leave, teacher can remove | Low |

**Database schema:**
```
cohorts
  - id
  - teacher_id (FK)
  - name
  - grade_level
  - join_code (unique)
  - created_at
  - status (active | archived)

cohort_memberships
  - cohort_id (FK)
  - student_id (FK)
  - joined_at
  - status (active | removed)
```

---

## Phase 2: Policy Configuration

### 2.1 Policy Sets

**Goal:** Teachers can select which policies their class will discuss.

| Task | Description | Complexity |
|------|-------------|------------|
| Policy set presets | Pre-built sets (Starter, Healthcare, Economic, etc.) | Medium |
| Browse policy library | View all available policies with filters | Medium |
| Custom policy selection | Teacher picks specific policies for their class | Medium |
| Save policy set to cohort | Associate selected policies with a class | Low |
| Custom policy creation | Teacher can add local/state-specific policies | High |

**Database schema:**
```
policy_sets
  - id
  - name
  - description
  - is_preset (boolean)
  - created_by (teacher_id, null for presets)

policy_set_items
  - policy_set_id (FK)
  - policy_id
  - order

cohort_policy_sets
  - cohort_id (FK)
  - policy_set_id (FK)
  - activated_at
```

### 2.2 Policy Content Enhancement

**Goal:** Policy pages support multiple reading levels and deeper exploration.

| Task | Description | Complexity |
|------|-------------|------------|
| Reading level variants | Add simplified/advanced versions of policy summaries | High (content work) |
| Reading level selector | UI to switch between levels | Low |
| "Dig deeper" sections | Expandable sections with more detail | Medium |
| Source citations | Link to polling data, research sources | Medium |
| Discussion prompts | Add 2-3 prompts per policy | Medium (content work) |

**Data structure update (per policy):**
```typescript
interface PolicyContent {
  summary: {
    simplified: string;
    standard: string;
    advanced: string;
  };
  supporters: string[];
  opponents: string[];
  tradeoffs: {
    benefits: string[];
    concerns: string[];
  };
  sources: { label: string; url: string }[];
  discussionPrompts: string[];
  digDeeper: { title: string; content: string }[];
}
```

---

## Phase 3: Student Deliberation Flow

### 3.1 Policy Exploration Tracking

**Goal:** Track which policies students have explored.

| Task | Description | Complexity |
|------|-------------|------------|
| Exploration progress | Track which policies student has viewed | Low |
| Mark as complete | Student marks policy as "read" | Low |
| Progress bar | Visual progress through policy set | Low |
| Unlock gating | Require X policies read before position submission | Low |

**Database schema:**
```
policy_explorations
  - student_id (FK)
  - cohort_id (FK)
  - policy_id
  - started_at
  - completed_at
  - reading_level_used
```

### 3.2 Position Capture

**Goal:** Students submit positions with reasoning.

| Task | Description | Complexity |
|------|-------------|------------|
| Position form | Select stance + required reasoning text | Medium |
| Steelman requirement | Required field for opposing argument | Medium |
| Save position | Store position per student per policy per cohort | Low |
| Position validation | Enforce minimum reasoning length | Low |
| View own positions | Student can see their submitted positions | Low |

**Database schema:**
```
positions
  - id
  - student_id (FK)
  - cohort_id (FK)
  - policy_id
  - stance (strongly_support | somewhat_support | neutral | somewhat_oppose | strongly_oppose)
  - reasoning (text)
  - steelman (text)
  - created_at
  - is_revision (boolean)
  - original_position_id (FK, nullable)
```

### 3.3 Discussion System

**Goal:** Students can discuss policies in threaded conversations.

| Task | Description | Complexity |
|------|-------------|------------|
| Discussion threads | Threaded comments per policy per cohort | High |
| Post comment | Student posts comment with optional reply-to | Medium |
| View thread | Display threaded discussion with nesting | Medium |
| Show positions with posts | Display student's stance alongside their posts | Low |
| Moderation flags | Allow flagging inappropriate content | Medium |
| Real-time updates | WebSocket or polling for new comments | High |

**Database schema:**
```
discussion_posts
  - id
  - cohort_id (FK)
  - policy_id
  - author_id (FK)
  - parent_id (FK, nullable for replies)
  - content (text)
  - created_at
  - edited_at
  - is_flagged (boolean)
```

### 3.4 Position Revision

**Goal:** Students can revise positions after discussion.

| Task | Description | Complexity |
|------|-------------|------------|
| Revision phase | Separate phase after discussion | Low |
| Show original position | Display what student originally said | Low |
| Revision form | Change stance + explain what changed | Medium |
| Track changes | Store revision linked to original | Low |
| Revision summary | "You revised 2 of 8 positions" | Low |

### 3.5 Reflection & Completion

**Goal:** Students complete final reflection and see results.

| Task | Description | Complexity |
|------|-------------|------------|
| Top 3 selection | Drag-and-rank top priorities | Medium |
| Reflection prompts | Text responses on what they learned | Low |
| Completion state | Mark student as "completed" for cohort | Low |
| View completion status | Teacher sees who has completed | Low |

**Database schema:**
```
reflections
  - id
  - student_id (FK)
  - cohort_id (FK)
  - top_priorities (array of policy_ids, ordered)
  - priority_reasoning (text)
  - learning_reflection (text)
  - discussion_reflection (text)
  - completed_at
```

---

## Phase 4: Aggregation & Analytics

### 4.1 Class Aggregate Views

**Goal:** Show aggregate class data without revealing individuals.

| Task | Description | Complexity |
|------|-------------|------------|
| Class stance distribution | % support/neutral/oppose per policy | Medium |
| Class top priorities | Aggregate ranking from reflections | Medium |
| Position change stats | How many students revised positions | Low |
| Hide until threshold | Don't show aggregates until N students submit | Low |

### 4.2 Teacher Analytics Dashboard

**Goal:** Teachers see participation and discussion quality.

| Task | Description | Complexity |
|------|-------------|------------|
| Participation overview | X of Y students active, completed | Low |
| Discussion metrics | Post count, avg length, reply depth | Medium |
| Position revision rate | % of students who changed positions | Low |
| Engagement timeline | Activity over time | Medium |
| Export report | Download analytics as PDF/CSV | Medium |

### 4.3 Cross-Cohort Patterns (Optional/Later)

**Goal:** Compare class to similar classes (opt-in).

| Task | Description | Complexity |
|------|-------------|------------|
| Cohort opt-in | Teacher chooses to share aggregate data | Low |
| Similarity matching | Match by state, grade level | Medium |
| Pattern display | "Your class vs similar classes" | Medium |

---

## Phase 5: Sharing & Profiles

### 5.1 Student Civic Profile

**Goal:** Generate shareable summary of student's positions.

| Task | Description | Complexity |
|------|-------------|------------|
| Profile summary view | Top priorities, stats, quote | Medium |
| Share card generation | Use existing Remotion setup | Medium |
| Download image | Export as PNG | Low |
| Social share buttons | Share to Instagram, X, etc. | Low |

### 5.2 Class Results Share

**Goal:** Generate shareable class summary.

| Task | Description | Complexity |
|------|-------------|------------|
| Class results view | Aggregate priorities, discussion stats | Medium |
| Class share card | Remotion template for class results | Medium |
| Teacher share controls | Teacher approves before sharing | Low |

---

## Phase 6: Teacher Resources

### 6.1 Facilitation Guides

**Goal:** Provide teachers with discussion guides.

| Task | Description | Complexity |
|------|-------------|------------|
| Guide content | Write facilitation guides per policy | High (content work) |
| Guide viewer | Display guides in teacher dashboard | Low |
| Discussion protocols | Generic protocols (Socratic seminar, etc.) | Medium (content work) |
| Standards alignment | Map to C3 Framework | Medium (content work) |

### 6.2 Discussion Phase Management

**Goal:** Teachers control deliberation phases.

| Task | Description | Complexity |
|------|-------------|------------|
| Phase configuration | Set which phases to include | Medium |
| Phase scheduling | Start/end dates per phase | Medium |
| Manual phase advance | Teacher can advance phase early | Low |
| Phase notifications | Notify students of phase changes | Medium |

---

## Phase 7: Infrastructure & Polish

### 7.1 Notifications

| Task | Description | Complexity |
|------|-------------|------------|
| Email notifications | New discussion posts, phase changes | Medium |
| In-app notifications | Notification bell with unread count | Medium |
| Teacher reminders | "3 students haven't participated" | Medium |

### 7.2 Mobile Responsiveness

| Task | Description | Complexity |
|------|-------------|------------|
| Responsive layouts | All views work on mobile | Medium |
| Touch-friendly | Drag-and-drop alternatives for mobile | Medium |

### 7.3 Accessibility

| Task | Description | Complexity |
|------|-------------|------------|
| Screen reader support | Proper ARIA labels | Medium |
| Keyboard navigation | Full keyboard accessibility | Medium |
| Color contrast | WCAG compliance | Low |

---

## Priority Order

### MVP (Minimum Viable for Pilot)

1. **Auth system** (teacher + student)
2. **Cohort management** (create, join)
3. **Policy selection** (use existing policy data, simple selection)
4. **Position capture** (stance + reasoning + steelman)
5. **Basic discussion** (threaded comments)
6. **Class aggregate view** (stance distribution)
7. **Student profile** (basic version)

### Post-MVP

8. Reading level variants
9. Position revision flow
10. Final reflection
11. Teacher analytics
12. Share card generation
13. Facilitation guides
14. Phase management
15. Cross-cohort patterns

---

## Technical Decisions Needed

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Auth provider | NextAuth.js, Clerk, Auth0 | Clerk (fastest to implement, good DX) |
| Database | Postgres, PlanetScale, Supabase | Supabase (auth + DB + realtime) |
| Real-time discussions | WebSocket, Supabase Realtime, polling | Supabase Realtime (if using Supabase) |
| State management | React Context, Zustand, Redux | Zustand (lightweight, sufficient) |
| Form handling | React Hook Form, Formik | React Hook Form (lighter) |

---

## Rough Effort Estimates

| Phase | Effort |
|-------|--------|
| Phase 1: Foundation | 2-3 weeks |
| Phase 2: Policy Configuration | 1-2 weeks |
| Phase 3: Student Flow | 3-4 weeks |
| Phase 4: Analytics | 1-2 weeks |
| Phase 5: Sharing | 1 week |
| Phase 6: Teacher Resources | 1-2 weeks (mostly content) |
| Phase 7: Polish | 1-2 weeks |

**MVP estimate:** 6-8 weeks of focused development

---

## File Structure (Proposed)

```
civic-engine-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── join/[code]/
│   ├── (teacher)/
│   │   ├── dashboard/
│   │   ├── class/[id]/
│   │   │   ├── overview/
│   │   │   ├── policies/
│   │   │   ├── discussion/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── resources/
│   ├── (student)/
│   │   ├── home/
│   │   ├── explore/[policyId]/
│   │   ├── positions/
│   │   ├── discussion/
│   │   ├── reflect/
│   │   └── profile/
│   └── api/
│       ├── auth/
│       ├── cohorts/
│       ├── positions/
│       ├── discussions/
│       └── analytics/
├── components/
│   ├── auth/
│   ├── cohort/
│   ├── policy/
│   ├── discussion/
│   ├── position/
│   └── analytics/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── supabase.ts
├── types/
│   ├── user.ts
│   ├── cohort.ts
│   ├── position.ts
│   └── discussion.ts
└── data/
    ├── policies/
    ├── methodologies/
    └── facilitation-guides/
```

---

## Next Steps

1. **Decide on tech stack** (auth provider, database)
2. **Set up database schema** (migrations)
3. **Build auth flow** (teacher registration, student join)
4. **Build cohort management** (create class, join code)
5. **Connect existing policy data** to new structure
6. **Build position capture flow**
7. **Build basic discussion**
8. **Pilot with 1-2 teachers**
