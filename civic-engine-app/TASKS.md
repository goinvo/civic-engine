# Most of Us - Implementation Task List

## Project Overview
Building a mobile-first Next.js demo for "Most of Us: Monthly Top Ten Policy Vote" platform to showcase consensus policies with real data, patriotic theme (muted blues/reds), and iterative development approach.

## Implementation Status

### ✅ Completed (Phase 1-4)

#### Initial Setup
- [x] Initialize Next.js project with TypeScript and Tailwind CSS
- [x] Install Framer Motion
- [x] Install Lucide React icons
- [x] Create project directory structure (components, lib, data, types, locales)
- [x] Configure Tailwind with patriotic theme colors (muted blues/reds)
- [x] Set up TypeScript types for policies
- [x] Configure Next.js for static export

#### Data & Research
- [x] Research real policy data from Americans-Agree.org
- [x] Define Policy TypeScript interfaces
- [x] Create data/policies.ts with 20 real consensus policies
- [x] Add proper attributions and sources

#### Core Components
- [x] Navbar component with mobile menu, language switcher, login button
- [x] Footer component with links and transparency info
- [x] Layout integration (Navbar + Footer)
- [x] PolicyCard component with expand/collapse animation
- [x] PolicyList component with responsive grid
- [x] CompareWidget component for side-by-side comparison
- [x] LoginModal component with verification explanation

#### Pages
- [x] Home page with hero section and Top 10 policies
- [x] Top 20 page with all policies
- [x] Compare page with interactive widget

#### Advanced Features
- [x] i18n structure with English and Spanish translations
- [x] Translation utility functions
- [x] Login modal with future verification flow
- [x] Disabled vote buttons with placeholders

### 📋 Remaining Tasks (Future Enhancements)

#### Phase 1: Core Setup & Data
- [ ] **Create data structure and research real policy data**
  - [ ] Research Americans-Agree.org and other sources
  - [ ] Define Policy TypeScript interface
  - [ ] Create data/policies.ts with Top 10-20 real policies
  - [ ] Add proper attributions/sources

#### Phase 2: Core UI Components
- [ ] **Build Layout components**
  - [ ] Navbar with logo, language switcher, login button
  - [ ] Footer component
  - [ ] Main Layout wrapper

- [ ] **Implement PolicyCard component**
  - [ ] Card design with title, description, icon
  - [ ] Expand/collapse functionality for details
  - [ ] Rank badge display
  - [ ] Responsive mobile-first styling
  - [ ] Framer Motion animations

- [ ] **Build PolicyList component**
  - [ ] Responsive grid layout (1 col mobile, 2-3 cols desktop)
  - [ ] Map policy data to PolicyCard components
  - [ ] Handle Top 10 vs Top 20 display

#### Phase 3: Pages
- [ ] **Create Home page (Top 10)**
  - [ ] Display top 10 policies
  - [ ] Intro section/hero
  - [ ] "Show more" or link to Top 20

- [ ] **Create Top 20 page**
  - [ ] Display all 20 policies
  - [ ] Navigation from homepage

- [ ] **Create Compare page**
  - [ ] Side-by-side policy comparison
  - [ ] Selection mechanism
  - [ ] Dummy voting interaction

#### Phase 4: Advanced Features
- [ ] **CompareWidget component**
  - [ ] Two-policy comparison UI
  - [ ] Visual selection/voting interface
  - [ ] Responsive layout (side-by-side on desktop, stacked on mobile)

- [ ] **Authentication UI placeholders**
  - [ ] Login modal component
  - [ ] Disabled "Vote" buttons on cards
  - [ ] "Verified Voter" badge design

- [ ] **i18n structure**
  - [ ] Configure Next.js i18n routing
  - [ ] Create translation JSON files (en, es)
  - [ ] Language switcher component
  - [ ] Translation utility functions

#### Phase 5: Polish
- [ ] **Mobile-first responsive styling**
  - [ ] Test all components on mobile sizes
  - [ ] Optimize touch targets
  - [ ] Performance optimization

- [ ] **Accessibility & Testing**
  - [ ] Semantic HTML
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Screen reader testing
  - [ ] Cross-browser testing

## Technical Decisions

### Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (inline theme)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

### Color Scheme (Patriotic Theme - Muted)
- Primary Blue: `#1e3a8a` (navy blue)
- Accent Red: `#dc2626` (muted red)
- Neutrals: Grays and whites for balance
- Backgrounds: Light backgrounds with strategic color accents

### Data Sources
- Americans-Agree.org (55%+ bipartisan agreement)
- YouGov polling data
- Pew Research Center
- Congress.gov for bill summaries
- Ballotpedia for policy definitions

### Architecture Notes
- Static site generation for performance
- Component-driven design for reusability
- Future-proof structure for authentication, voting APIs
- Modular data layer for easy updates

## Completed Features Summary

### ✨ What's Built
1. **Mobile-First Responsive Design** - All components optimized for phone, tablet, desktop
2. **Real Policy Data** - 20 actual consensus policies from Americans-Agree.org (2024-2025)
3. **Interactive Components** - Expandable policy cards, comparison widget, modal dialogs
4. **Patriotic Theme** - Muted blue/red color scheme with professional styling
5. **Future-Ready Architecture** - i18n support, authentication placeholders, extensible data layer
6. **Smooth Animations** - Framer Motion for polished UX
7. **Static Export Ready** - Configured for fast, deployable static site

### 🚀 How to Run
```bash
cd civic-engine-app
npm run dev
```
Visit http://localhost:3000

### 📦 How to Build for Production
```bash
cd civic-engine-app
npm run build
```
This generates a static site in the `out/` directory

## Next Steps (Future Development)

## Notes
- Iterative approach: Build, review, refine
- Mobile-first: Design for phone screens first
- Real data: Use actual polling data with proper attribution
- Accessibility: Ensure WCAG 2.1 AA compliance
