# Accessibility Guidelines

This document describes the accessibility standards and patterns used in the Civic Engine education platform.

## WCAG 2.1 AA Compliance

The application targets WCAG 2.1 Level AA compliance.

## Components with Accessibility Features

### Input & Textarea (`components/education/ui/Input.tsx`)
- Labels linked with `htmlFor`/`id`
- Error messages linked via `aria-describedby`
- `aria-invalid` on error state
- `role="alert"` on error messages
- Required field indicators (visual asterisk + `required` attribute)
- Character count announced to screen readers via `aria-live`

### RadioGroup (`components/education/ui/RadioGroup.tsx`)
- Native `<input type="radio">` elements (visually hidden)
- Proper `<fieldset>` and `<legend>` structure
- `aria-describedby` for errors
- Focus-visible styles via `focus-within`
- Keyboard navigable (arrow keys, Tab)

### Modal (`components/education/ui/Modal.tsx`)
- `role="dialog"` and `aria-modal="true"`
- Focus trap (Tab cycles within modal)
- Escape key closes modal
- Focus returns to trigger element on close
- `aria-labelledby` and `aria-describedby`
- Body scroll lock when open

### Badge (`components/education/ui/Badge.tsx`)
- WCAG AA compliant color contrast (4.5:1 minimum)
- Dark mode variants with proper contrast

### Navbar (`components/Navbar.tsx`)
- `aria-label="Main navigation"`
- `aria-expanded` on mobile menu toggle
- `aria-controls` linking button to menu
- Focus rings on all interactive elements
- `aria-hidden` on decorative icons

### JoinClassForm (`components/education/student/JoinClassForm.tsx`)
- Proper `<fieldset>` and `<legend>` for code input
- Screen reader-only labels for split inputs
- Password toggle with `aria-label` and `aria-pressed`
- Loading state announced via `aria-live`
- Error messages with `role="alert"`

## Color Palette (WCAG AA Compliant)

| Use | Light Mode | Dark Mode | Contrast |
|-----|------------|-----------|----------|
| Primary text | `#1E2A78` on `#E8EEFF` | `#E8EEFF` on `#1E2A78` | 7:1+ |
| Error text | `#991B1B` on `#FEF2F2` | `#FCA5A5` on `#7F1D1D` | 4.5:1+ |
| Success text | `#166534` on `#F0FDF4` | `#86EFAC` on `#14532D` | 4.5:1+ |
| Warning text | `#854D0E` on `#FEFCE8` | `#FDE047` on `#713F12` | 4.5:1+ |

## Keyboard Navigation

All interactive elements are keyboard accessible:
- **Tab**: Move focus forward
- **Shift+Tab**: Move focus backward
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within radio groups
- **Escape**: Close modals

## Focus Management

Focus styles use a consistent pattern:
```css
focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2
```

## Screen Reader Considerations

- Decorative icons use `aria-hidden="true"`
- Meaningful icons have `aria-label`
- Dynamic content uses `aria-live` regions
- Form errors use `role="alert"`
- Loading states are announced

## Testing Recommendations

1. **Keyboard-only testing**: Navigate entire app using only keyboard
2. **Screen reader testing**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Automated testing**: Run axe DevTools or Lighthouse accessibility audit
4. **Color contrast**: Verify with WebAIM Contrast Checker
5. **Zoom testing**: Test at 200% zoom

## Common Patterns

### Accessible Button with Icon
```tsx
<button
  aria-label="Close modal"
  className="focus:outline-none focus:ring-2 focus:ring-[#2F3BBD]"
>
  <X aria-hidden="true" />
</button>
```

### Form Field with Error
```tsx
<Input
  id="email"
  label="Email"
  error={errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
  aria-invalid={errors.email ? 'true' : undefined}
  required
/>
```

### Radio Group
```tsx
<RadioGroup
  label="How do you feel about this policy?"
  value={stance}
  onChange={setStance}
  error={errors.stance}
  required
>
  <RadioGroupStack>
    <RadioGroupItem value="support" label="Support" />
    <RadioGroupItem value="oppose" label="Oppose" />
    <RadioGroupItem value="neutral" label="Neutral" />
  </RadioGroupStack>
</RadioGroup>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN ARIA Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/)
