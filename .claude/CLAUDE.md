# Civic Engine - Project Conventions

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Design System

### Visual Style
- **Theme**: Neobrutalist with patriotic red/blue colors
- **Brand Colors**:
  - Blue: `#2F3BBD`
  - Red: `#C91A2B`
  - Brand gradient: `bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]`
- **Borders**: `border-2 border-black` (neobrutalist style)
- **Shadows**: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`

### Typography

Use semantic color classes from the theme (`text-neutral-dark`, `text-neutral`) for consistency.

#### Text Hierarchy
| Level | Usage | Classes |
|-------|-------|---------|
| **Page Title** | Main page heading | `font-display text-2xl md:text-3xl font-black text-neutral-dark` |
| **Section Header** | Card titles, major sections | `font-display text-xl font-black text-neutral-dark` |
| **Subsection Label** | Form labels, content headers | `text-sm font-bold text-neutral-dark` |
| **Body Text** | Main content | `text-sm text-neutral-dark` or `text-base text-neutral-dark` |
| **Secondary Text** | Descriptions, hints, metadata | `text-sm text-neutral` |
| **Small Text** | Timestamps, counts | `text-xs text-neutral` or `text-xs font-bold text-neutral` |

#### Color Classes
- `text-neutral-dark` - Primary text (dark in light mode, light in dark mode)
- `text-neutral` - Secondary/muted text
- Always include dark mode variants: `dark:text-white`, `dark:text-gray-400`

#### Do NOT Use
- `text-gray-500`, `text-gray-600` directly - use `text-neutral` instead
- `text-black` - use `text-neutral-dark` instead
- `uppercase tracking-widest` for labels - use simple `font-bold` instead
- Inconsistent font sizes - stick to `text-xs`, `text-sm`, `text-base`, `text-lg`

## Animation Guidelines

**Always use Framer Motion for animations.** Do not use CSS keyframes or `@keyframes` in globals.css.

### Why Framer Motion?
- Consistent API across the codebase
- Better control over animation timing and easing
- Built-in gesture support
- Easier to compose complex animations
- Better performance with `useReducedMotion` support

### Common Patterns

```tsx
import { motion } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>

// Interactive feedback (buttons, cards)
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
/>

// Satisfying selection animation
<motion.div
  animate={isSelected ? { scale: [1, 1.1, 1.02] } : { scale: 1 }}
  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
/>
```

### Easing Presets
- **Springy/bouncy**: `{ type: 'spring', stiffness: 400, damping: 17 }`
- **Smooth overshoot**: `{ ease: [0.34, 1.56, 0.64, 1] }`
- **Standard ease-out**: `{ ease: 'easeOut' }`

## Component Patterns

### Shared UI Components
Use components from `@/components/education/ui` when possible:
- `Button` - Primary, secondary, ghost variants
- `Card` - With neobrutalist borders
- `Badge` - Status indicators
- `Progress` - Progress bars

### Problem Area Components
Located in `@/components/problem-areas`:
- `RatingScale` - Voting interface with face emojis
- `PreferenceRadar` - Radar chart for preference visualization
- `TradeoffsDisplay` - Benefits/costs display
- `VoicesList` - Support/opposition personas

## Data Structure

### Personas Format
All personas should have full names with ages:
```typescript
persona: 'Role (Full Name, Age)'
// Examples:
persona: 'Economist (Dr. Carmen Vega, 44)'
persona: 'Parent (Luis Herrera, 38)'
persona: 'Teacher (Franklin Williams, 45)'
```

Avoid stereotypical AI-generated names like "Marcus", "Chen", etc.

## File Organization
```
civic-engine-app/
├── app/                    # Next.js app router pages
├── components/
│   ├── education/ui/       # Shared UI components
│   └── problem-areas/      # Problem area specific components
├── data/
│   └── problem-areas/      # Policy data and approaches
├── lib/
│   └── problem-areas/      # Business logic and utilities
└── types/                  # TypeScript type definitions
```
