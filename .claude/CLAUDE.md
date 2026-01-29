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
- **Borders**: `border-2 border-black dark:border-gray-600` (neobrutalist style)
- **Shadows**: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]`

### Chart Colors
Always use theme colors in charts—never use arbitrary colors like green/yellow. Avoid implying partisan preference:
- **Primary**: Brand gradient `linear-gradient(135deg, #2F3BBD 0%, #C91A2B 100%)` (neutral, non-partisan)
- **Accent**: Purple `#80467E`
- **Secondary**: Blue `#2F3BBD` or Red `#C91A2B` (use equally, no preference)
- **Neutral**: Gray `#888`
- **Example**: Use gradient for highlighted/primary data, purple for accents, gray for baseline

### Dark Mode
Always add dark mode variants for all visual elements:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Background** | `bg-white` | `dark:bg-gray-950` or `dark:bg-gray-900` |
| **Card Background** | `bg-white` | `dark:bg-gray-800` |
| **Borders** | `border-black` | `dark:border-gray-600` |
| **Primary Text** | `text-neutral-dark` | `dark:text-white` |
| **Secondary Text** | `text-neutral` | `dark:text-gray-400` |
| **Muted Text** | `text-neutral` | `dark:text-gray-500` |

#### Dark Mode Rules
- **Always pair light and dark**: Every `bg-`, `text-`, `border-` class needs a `dark:` variant
- **Shadows**: Reduce opacity in dark mode: `shadow-[...rgba(0,0,0,1)]` → `dark:shadow-[...rgba(0,0,0,0.5)]`
- **Colored backgrounds**: Use `/40` or `/50` opacity in dark mode (e.g., `dark:bg-red-900/40`)
- **Test both modes**: Use the showcase page toggle to verify components work in both themes

### Responsive Design
Mobile-first approach with these breakpoints:

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | < 640px | Mobile phones |
| `sm:` | ≥ 640px | Large phones, small tablets |
| `md:` | ≥ 768px | Tablets, small laptops |
| `lg:` | ≥ 1024px | Desktops |

#### Responsive Rules
- **Stack on mobile**: Use `flex-col md:flex-row` for side-by-side layouts
- **Hide on mobile**: Use `hidden md:block` for desktop-only elements
- **Touch targets**: Minimum 44px height for tappable elements on mobile
- **Floating elements**: Position centered on mobile, to sides on desktop:
  ```tsx
  // Mobile: centered above/below
  // Desktop: floating to sides
  className="left-1/2 -translate-x-1/2 -top-44 md:translate-x-0 md:-left-52 md:-top-8"
  ```
- **Text scaling**: Use `text-base md:text-lg` sparingly, prefer consistent sizes

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
