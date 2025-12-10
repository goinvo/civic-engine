# Civic Engine Styling Guide

This guide documents the design patterns and styling conventions used throughout the Civic Engine application. Reference this when building new components to maintain visual consistency.

## Design Philosophy

The application uses a **Neobrutalist** design aesthetic characterized by:
- Bold, solid borders
- Offset box shadows
- High contrast colors
- Strong typography hierarchy
- Geometric shapes

---

## Color Palette

### Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| Blue (Impact) | `#2F3BBD` | Impact Lens, primary CTA, headers |
| Red (Action) | `#C91A2B` | Economics Lens, warnings, emphasis |
| Purple (Needs) | `#7B2D8E` | Needs Lens, secondary accent |
| Dark Purple | `#501159` | Needs Lens headers, deep accent |

### Gradients
```css
/* Impact to Economics */
from-[#2F3BBD] to-[#C91A2B]

/* Needs Lens */
from-[#501159] to-[#7B2D8E]

/* Combined (all three lenses) */
from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B]
```

### Semantic Colors
| Purpose | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `bg-white` | `bg-gray-800` |
| Card Background | `bg-white` | `bg-gray-800` |
| Muted Background | `bg-gray-100` or `bg-gray-50` | `bg-gray-700` |
| Primary Text | `text-black` | `text-white` |
| Secondary Text | `text-gray-700` | `text-gray-300` |
| Muted Text | `text-gray-600` | `text-gray-400` |

---

## Typography

### Font Families
- **Headings:** `font-display` - Bold, impactful display font
- **Body:** `font-body` - Readable body text font

### Heading Hierarchy
```tsx
// Page Title (H1)
<h1 className="font-display text-4xl font-black text-black dark:text-white">

// Section Title (H2)
<h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">

// Subsection Title (H3)
<h3 className="font-display text-2xl font-black text-black dark:text-white mb-4">

// Card Title (H4)
<h4 className="font-display text-lg font-black text-black dark:text-white">

// Small Title (H5)
<h5 className="font-display text-sm font-black text-black dark:text-white">
```

### Body Text
```tsx
// Standard paragraph
<p className="font-body text-gray-700 dark:text-gray-300 font-medium">

// Small/secondary text
<p className="font-body text-sm text-gray-600 dark:text-gray-400">

// Extra small (labels, captions)
<span className="font-body text-xs text-gray-600 dark:text-gray-400">
```

### On Colored Backgrounds
```tsx
// Primary text on brand color
<p className="font-body text-white font-medium">

// Secondary text on brand color
<p className="font-body text-white/90">

// Muted text on brand color
<span className="font-body text-white/80">
```

---

## Borders & Shadows

### Standard Borders
```tsx
// Primary card border
border-4 border-black dark:border-gray-600

// Secondary/inner border
border-2 border-black dark:border-gray-600

// Subtle border (tables, dividers)
divide-y-2 divide-black dark:divide-gray-600
```

### Box Shadows (Neobrutalist offset)
```tsx
// Large shadow (featured cards, CTAs)
shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]

// Medium shadow (interactive elements)
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

// Small shadow (hover states)
shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
```

---

## Component Patterns

### Standard Card
```tsx
<div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
  {/* content */}
</div>
```

### Featured Card (with shadow)
```tsx
<div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
  {/* content */}
</div>
```

### Colored Header Card
```tsx
<div className="border-4 border-black dark:border-gray-600 bg-[#2F3BBD] p-6">
  <h3 className="font-display text-xl font-black text-white mb-2">Title</h3>
  <p className="font-body text-white/90 font-medium">Description</p>
</div>
```

### Card with Icon Header
```tsx
<div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
  <div className="flex items-center space-x-3 mb-4">
    <div className="w-10 h-10 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
    </div>
    <h3 className="font-display text-xl font-black text-black dark:text-white">
      Title
    </h3>
  </div>
  {/* content */}
</div>
```

### Card with Large Icon (Hero style)
```tsx
<div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
  <div className="flex items-start space-x-4 mb-4">
    <div className="w-14 h-14 bg-[#501159] border-4 border-black flex items-center justify-center flex-shrink-0">
      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
    </div>
    <div>
      <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
        Title
      </h3>
      <p className="font-body text-gray-700 dark:text-gray-300 font-medium">
        Description
      </p>
    </div>
  </div>
</div>
```

---

## Buttons

### Primary Button
```tsx
<button className="px-6 py-3 font-display font-black text-white bg-[#2F3BBD] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
  Button Text
</button>
```

### Secondary Button
```tsx
<button className="px-6 py-3 font-display font-black text-black dark:text-white bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
  Button Text
</button>
```

### Tab Button (Active)
```tsx
<button className="px-4 py-2 font-display font-bold text-sm text-white bg-[#2F3BBD] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  Active Tab
</button>
```

### Tab Button (Inactive)
```tsx
<button className="px-4 py-2 font-display font-bold text-sm text-black dark:text-white bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
  Inactive Tab
</button>
```

---

## Icon Boxes

### Small (w-10)
```tsx
<div className="w-10 h-10 bg-[#2F3BBD] border-2 border-black flex items-center justify-center">
  <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
</div>
```

### Large (w-14)
```tsx
<div className="w-14 h-14 bg-[#501159] border-4 border-black flex items-center justify-center">
  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
</div>
```

---

## Code/Formula Blocks
```tsx
<div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 font-mono text-sm text-black dark:text-white">
  Score = value × weight
</div>
```

On colored backgrounds:
```tsx
<div className="bg-black/20 border-4 border-white/20 p-4">
  <p className="font-mono text-sm text-white font-bold">
    Score = value × weight
  </p>
</div>
```

---

## Callout/Highlight Boxes

### Colored Accent Box
```tsx
<div className="bg-[#501159]/10 dark:bg-[#501159]/30 border-4 border-[#501159] p-4">
  <p className="font-display text-sm font-black text-[#501159] dark:text-[#B87FB3]">
    Important info
  </p>
</div>
```

### Info Box on White
```tsx
<div className="border-2 border-[#2F3BBD] bg-[#2F3BBD]/10 p-4">
  <div className="font-display font-black text-[#2F3BBD] text-2xl">70</div>
  <div className="font-body text-sm text-gray-600 dark:text-gray-400">Label</div>
</div>
```

---

## Grids

### Standard Card Grid
```tsx
// 1 column mobile, 2 columns tablet, 3 columns desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 1 column mobile, 2 columns tablet+
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// 2 columns mobile, 4 columns tablet+
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
```

---

## Tags/Chips
```tsx
// Standard tag
<span className="font-body text-xs font-medium px-2 py-1 border-2 border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
  Tag Text
</span>

// Tag on colored background
<span className="font-body text-xs font-medium px-2 py-1 border-2 border-white/30 bg-white/10 text-white">
  Tag Text
</span>
```

---

## Status Colors

### Score Indicators
| Score Range | Color Class |
|-------------|-------------|
| 80-100 (Excellent) | `text-green-600` |
| 65-79 (Good) | `text-green-500` |
| 50-64 (Moderate) | `text-yellow-500` |
| 35-49 (Mixed) | `text-orange-500` |
| 20-34 (Poor) | `text-red-500` |
| 0-19 (Very Poor) | `text-red-600` |

### Scale Boxes (0-5-10 pattern)
```tsx
// Harmful (0)
<div className="border-2 border-red-600 bg-red-50 dark:bg-red-900/20 p-2">
  <span className="font-display text-sm font-black text-red-700 dark:text-red-400">0</span>
</div>

// Neutral (5)
<div className="border-2 border-gray-400 bg-gray-50 dark:bg-gray-700 p-2">
  <span className="font-display text-sm font-black text-gray-700 dark:text-gray-300">5</span>
</div>

// Beneficial (10)
<div className="border-2 border-green-600 bg-green-50 dark:bg-green-900/20 p-2">
  <span className="font-display text-sm font-black text-green-700 dark:text-green-400">10</span>
</div>
```

---

## Spacing

### Section Spacing
- Between major sections: `mb-12`
- After section headers: `mb-6`
- After subsection headers: `mb-4`
- Between cards in a list: `gap-4` (in grid) or `space-y-6` (in stack)

### Card Padding
- Standard cards: `p-6`
- Compact cards: `p-5` or `p-4`
- Small elements: `p-3` or `p-2`

---

## Dark Mode Conventions

Always pair light and dark mode classes:
- Backgrounds: `bg-white dark:bg-gray-800`
- Muted backgrounds: `bg-gray-100 dark:bg-gray-700` or `bg-gray-50 dark:bg-gray-700`
- Borders: `border-black dark:border-gray-600`
- Primary text: `text-black dark:text-white`
- Secondary text: `text-gray-700 dark:text-gray-300`
- Muted text: `text-gray-600 dark:text-gray-400`

---

## Lucide Icons

Use Lucide React icons with consistent styling:
```tsx
import { Calculator, Scale, Users } from 'lucide-react';

// Standard icon (in icon box)
<Icon className="w-5 h-5 text-white" strokeWidth={2.5} />

// Large icon
<Icon className="w-7 h-7 text-white" strokeWidth={2.5} />

// Inline icon
<Icon className="w-4 h-4" strokeWidth={2} />
```

---

## Example: Complete Methodology Section

```tsx
function ExampleMethodologySection() {
  return (
    <div className="mb-12">
      {/* Section Title */}
      <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
        Example Methodology
      </h2>

      {/* Overview Card with Icon */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-14 h-14 bg-[#2F3BBD] border-4 border-black flex items-center justify-center flex-shrink-0">
            <Calculator className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
              Framework Overview
            </h3>
            <p className="font-body text-gray-700 dark:text-gray-300 font-medium">
              Description of the methodology framework and how it works.
            </p>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-5">
          <h4 className="font-display text-lg font-black text-black dark:text-white mb-2">
            Factor Name
          </h4>
          <p className="font-body text-sm text-gray-600 dark:text-gray-400">
            Description of this factor.
          </p>
        </div>
        {/* More cards... */}
      </div>

      {/* Formula Card with Gradient */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-display text-2xl font-black text-white mb-4">
          Scoring Formula
        </h3>
        <div className="bg-black/20 border-4 border-white/20 p-4">
          <p className="font-mono text-sm text-white font-bold">
            Score = factor1 × weight1 + factor2 × weight2
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## Checklist for New Components

- [ ] Uses `font-display` for headings and `font-body` for body text
- [ ] Has `font-black` weight on headings
- [ ] Uses `border-4 border-black` for primary cards
- [ ] Includes dark mode variants for all colors
- [ ] Uses brand colors from the palette
- [ ] Has appropriate spacing (`mb-6` after headers, `gap-4` in grids)
- [ ] Icons use `strokeWidth={2.5}` and are placed in icon boxes
- [ ] Box shadows use the offset pattern `shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]`
