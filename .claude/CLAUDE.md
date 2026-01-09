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

Keep typography simple. Use only these combinations:

| Role | Classes | Example |
|------|---------|---------|
| **Hero** | `text-5xl md:text-6xl font-black` | Landing page title only |
| **Page Title** | `text-2xl md:text-3xl font-bold` | Section headings |
| **Card Title** | `text-lg font-bold` | Card headers, feature titles |
| **Body** | `text-base` | Default paragraph text |
| **Small** | `text-sm text-neutral` | Secondary info, descriptions |
| **Tiny** | `text-xs text-neutral` | Timestamps, counts, captions |
| **Button** | `font-bold` | All interactive buttons |

#### Rules
- **`font-black`** — Only for hero text (one per page max)
- **`font-bold`** — Headings, labels, buttons, emphasis
- **No weight** — All body text (let it breathe)
- **`text-neutral-dark`** — Primary text color
- **`text-neutral`** — Secondary/muted text
- Always add dark mode: `dark:text-white`, `dark:text-gray-400`

#### Do NOT Use
- `font-display` or `font-body` — Use system default
- `font-medium` or `font-semibold` — Stick to bold or regular
- `text-gray-500`, `text-gray-600` — Use `text-neutral`
- `text-black` — Use `text-neutral-dark`
- More than 2 breakpoints for text size — Keep it simple

## Animation Guidelines

**Always use Framer Motion for animations.** Do not use CSS keyframes.

### Common Patterns

```tsx
// Hover lift (buttons, cards)
<motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>

// Staggered list
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true }}
  />
))}
```

### Easing
- **Spring**: `{ type: 'spring', stiffness: 400, damping: 17 }`
- **Smooth**: `{ ease: 'easeOut' }`

## Component Patterns

### Shared UI Components
Use components from `@/components/education/ui`:
- `Button` - Primary, secondary, ghost variants
- `Card` - With neobrutalist borders
- `Badge` - Status indicators

### Problem Area Components
Located in `@/components/problem-areas`:
- `RatingScale` - Voting interface with face emojis
- `PreferenceRadar` - Radar chart for preferences
- `TradeoffsDisplay` - Benefits/costs display
- `VoicesList` - Support/opposition personas

## Data Structure

### Personas Format
```typescript
persona: 'Role (Full Name, Age)'
// Examples:
persona: 'Economist (Dr. Carmen Vega, 44)'
persona: 'Parent (Luis Herrera, 38)'
```

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
