# Quick Reference - Design System

## Color Classes

### Gold Palette
```css
text-gold-50    bg-gold-50    border-gold-50
text-gold-100   bg-gold-100   border-gold-100
text-gold-200   bg-gold-200   border-gold-200
text-gold-300   bg-gold-300   border-gold-300
text-gold-400   bg-gold-400   border-gold-400  /* PRIMARY */
text-gold-500   bg-gold-500   border-gold-500
text-gold-600   bg-gold-600   border-gold-600
text-gold-700   bg-gold-700   border-gold-700
text-gold-800   bg-gold-800   border-gold-800
text-gold-900   bg-gold-900   border-gold-900
```

### Navy Palette
```css
text-navy-700   bg-navy-700   border-navy-700  /* Card */
text-navy-800   bg-navy-800   border-navy-800  /* Surface */
text-navy-900   bg-navy-900   border-navy-900  /* PRIMARY */
```

### Ivory Palette
```css
text-ivory-200  bg-ivory-200  border-ivory-200 /* PRIMARY */
text-ivory-700  bg-ivory-700  border-ivory-700 /* Muted text */
```

## Typography Classes

### Sizes
```css
text-xs     /* 10.24px */
text-sm     /* 12.8px */
text-base   /* 16px */
text-lg     /* 20px */
text-xl     /* 25px */
text-2xl    /* 31.25px */
text-3xl    /* 39px */
text-4xl    /* 48.83px */
text-5xl    /* 61px */
text-6xl    /* 76.29px */
```

### Fluid Typography (Responsive)
```css
text-fluid-xs   text-fluid-sm   text-fluid-base
text-fluid-lg   text-fluid-xl   text-fluid-2xl
text-fluid-3xl  text-fluid-4xl  text-fluid-5xl
text-fluid-6xl
```

### Font Families
```css
font-display    /* Playfair Display */
font-serif      /* Libre Baskerville */
font-sans       /* Inter */
```

### Weights
```css
font-light      /* 300 */
font-normal     /* 400 */
font-medium     /* 500 */
font-semibold   /* 600 */
font-bold       /* 700 */
```

### Tracking (Letter Spacing)
```css
tracking-tight    tracking-normal   tracking-wide
tracking-wider    tracking-widest   tracking-luxury
```

## Spacing Classes

```css
p-1  m-1    /* 4px */
p-2  m-2    /* 8px */
p-3  m-3    /* 12px */
p-4  m-4    /* 16px */
p-6  m-6    /* 24px */
p-8  m-8    /* 32px */
p-10 m-10   /* 40px */
p-12 m-12   /* 48px */
p-16 m-16   /* 64px */
p-20 m-20   /* 80px */
p-24 m-24   /* 96px */
```

## Shadow Classes

```css
shadow-sm        /* Small shadow */
shadow-md        /* Medium shadow (default) */
shadow-lg        /* Large shadow */
shadow-xl        /* Extra large */
shadow-2xl       /* 2X large */

shadow-gold-sm   /* Gold glow small */
shadow-gold-md   /* Gold glow medium */
shadow-gold-lg   /* Gold glow large */
```

## Border Radius

```css
rounded-none     /* 0 */
rounded-sm       /* 2px */
rounded          /* 4px */
rounded-md       /* 6px */
rounded-lg       /* 8px */
rounded-xl       /* 12px */
rounded-2xl      /* 16px */
rounded-3xl      /* 24px */
rounded-full     /* 9999px */
```

## Common Patterns

### Section Container
```tsx
<section className="py-20 px-6">
  <div className="container-luxury">
    {/* Content */}
  </div>
</section>
```

### Card with Hover
```tsx
<div className="bg-navy-700 rounded-2xl p-6 border border-gold-400/10 
                hover:shadow-gold-md transition-all duration-300">
  {/* Content */}
</div>
```

### Heading + Subtitle
```tsx
<div className="text-center mb-12">
  <span className="text-xs uppercase tracking-luxury text-gold-400 mb-4 block">
    Label
  </span>
  <h2 className="text-fluid-4xl font-serif text-ivory-200 mb-4">
    Heading
  </h2>
  <p className="text-lg text-ivory-700 max-w-2xl mx-auto">
    Subtitle text
  </p>
</div>
```

### Button Row
```tsx
<div className="flex flex-wrap gap-4">
  <Button variant="primary" size="lg">Primary</Button>
  <Button variant="outline" size="lg">Secondary</Button>
</div>
```

### Focus State (Manual)
```css
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-gold-400 
focus-visible:ring-offset-2 
focus-visible:ring-offset-navy-900
```

### Backdrop Blur
```css
bg-navy-900/95 backdrop-blur-luxury
```

## Component Import Pattern

```tsx
import { Button, Input, Card, Heading, Text } from '@/components/ui'

// Or individual imports
import { Button } from '@/components/ui/Button'
```

## Responsive Breakpoints

```tsx
className="
  text-base           /* Mobile (default) */
  md:text-lg          /* Tablet: 768px+ */
  lg:text-xl          /* Desktop: 1024px+ */
  xl:text-2xl         /* Large: 1280px+ */
"
```

## Animation Classes

```css
transition-all duration-300 ease-out
animate-fade-in
animate-fade-in-up
animate-pulse
```

## Accessibility Helpers

```tsx
{/* Skip to content */}
<a href="#main-content" className="skip-to-content">
  Skip to main content
</a>

{/* Screen reader only */}
<span className="sr-only">Hidden from view</span>

{/* ARIA current page */}
<Link aria-current="page">Current</Link>

{/* Required field indicator */}
<span className="text-error ml-1" aria-label="required">*</span>
```

## CSS Variables (Direct Use)

```css
.custom {
  color: var(--color-gold-400);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-gold-md);
  transition: all var(--duration-base) var(--ease-luxury);
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
}
```

## Framer Motion Variants

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeUp}
>
  {/* Content */}
</motion.div>
```
