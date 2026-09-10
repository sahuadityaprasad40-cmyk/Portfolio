---
name: Apex Telemetry Portfolio
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#ffb5a0'
  on-secondary: '#5f1500'
  secondary-container: '#d73b00'
  on-secondary-container: '#fffbff'
  tertiary: '#ffb68d'
  on-tertiary: '#532200'
  tertiary-container: '#eb7a2e'
  on-tertiary-container: '#542300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#862200'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68d'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#763300'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  telemetry-tag:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  hud-indicator:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-margin-desktop: 3rem
  grid-margin-tablet: 2rem
  grid-margin-mobile: 1.25rem
  grid-gutter: 1.5rem
  section-gap: 6rem
  stack-xs: 0.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
  stack-xl: 2.5rem
  stack-2xl: 4rem
---

## Brand & Style
This design system establishes an elevated, high-craft portfolio aesthetic built at the intersection of aerospace telemetry, tactical game HUDs, and high-performance developer tooling. It avoids juvenile gaming tropes, neon clutter, and frosted-glass gimmicks in favor of architectural precision, functional density, and calibrated focal points.

The experience conveys deep technical mastery, methodical intent, and creative momentum. The interface sits quietly in deep, calibrated obsidian tones, allowing case studies, interactive prototypes, and system architecture displays to project off the screen with electric orange kinetic signals. 

Visual principles:
- **Calibrated Rigor:** Strict hairline boundary definitions, precise structural alignment, and data-dense metadata labels establish immediate authority.
- **Instrument Precision:** Monospaced coordinate tracking, version indices, and status flags function not as decoration, but as functional navigational anchors.
- **Controlled Kinetic Energy:** Electric orange is treated as a high-voltage resource—sparingly applied to focus user velocity, active inputs, and completion telemetry.

## Colors
The palette leverages a stepped architecture of near-black and deep charcoal values, establishing visual planes without relying on heavy shadows or blur effects. Contrast is mathematically curated to balance long-form legibility with technical visual impact.

### Roles & Values
- **Base Canvas (`#0B0C0E`):** Pure deep obsidian. Serves as the foundation viewport and negative space framing.
- **Surface Level 1 (`#121316`):** Deep charcoal for primary architectural sections, shell panels, and structural layouts.
- **Surface Level 2 (`#18191E`):** Interactive card containers, code blocks, and isolated visual zones.
- **Surface Level 3 / Hover (`#22242B`):** Interactive state changes, active item backgrounds, and flyouts.
- **Primary Accent (`#FF6B00`):** Pure electric kinetic orange. Reserved for primary calls-to-action, active status states, terminal cursors, and navigation anchors.
- **Secondary Accent (`#FF5722`):** Saturated deep orange for warning alerts, critical system badges, and hover depth.
- **Tertiary Accent (`#FF8A3D`):** High-luminance orange for focus rings, hairline glow highlights, and micro-metric ticks.
- **Text Primary (`#F3F4F6`):** Crisp daylight white for headline copy, key figures, and critical project titles.
- **Text Secondary (`#D1D5DB`):** Neutral gray for body narratives and explanatory paragraphs.
- **Text Muted (`#9CA3AF`):** Technical gray for labels, timestamps, metadata keys, and inactive navigation links.
- **Hairline Border (`rgba(255, 255, 255, 0.08)`): Ubiquitous structural separator line.
- **Hairline Accent Border (`rgba(255, 107, 0, 0.35)`): Interactive focus, hover boundary, and selected state perimeter.

## Typography
The type architecture establishes a calibrated hierarchy through three complementary typefaces:

1. **Space Grotesk (Display & Headlines):** Delivers geometric modernism with subtle technical idiosyncratic cuts. Used for major project titles, section headings, and hero value propositions.
2. **Inter (Narrative & Body):** Neutral, hyper-legible sans-serif tuned for extended project breakdowns, process descriptions, and long-form methodology texts.
3. **JetBrains Mono (System Telemetry & Metadata):** Dedicated to technical coordinates, status flags, code representations, data points, and categorizations.

Headlines should maintain tight line heights and negative letter-spacing for structural solidity. All telemetry, HUD badges, and metadata tags must be uppercase to enforce machine-readable clarity.

## Layout & Spacing
Layouts use a 12-column fluid grid system bounded by a maximum container width of `1440px`. The structure creates high contrast between expansive negative space and hyper-structured, compact information grids.

### Breakpoints & Flow
- **Desktop (1024px+):** 12 columns with 24px gutters and 48px outer margins. Supports asymmetric technical panels, sticky telemetry side rails, and multi-tier project showcases.
- **Tablet (768px – 1023px):** 8 columns with 20px gutters and 32px margins. Secondary telemetry panels collapse into tabbed segments or horizontal scroll matrices.
- **Mobile (<768px):** 4 columns with 16px gutters and 20px margins. Layout stacks vertically into a single technical column. Metadata ribbons become persistent bottom or top anchoring strips.

### Spatial Rhythm
Modules utilize an 8px baseline rhythm. Generous vertical breathing room (`section-gap`) separates project case studies, while internal component modules maintain strict, dense packaging (`stack-xs` through `stack-md`) to echo instrumentation consoles.

## Elevation & Depth
Depth is created strictly through surface tint stepping and crisp hairline borders. Glassmorphism, backdrop blurs, skeuomorphic bevels, and heavy ambient shadows are strictly prohibited.

### Elevation Strategy
- **Layer 0 (Canvas Base):** `#0B0C0E`. Flat, non-interactive foundation layer.
- **Layer 1 (Sub-Structure Panels):** `#121316` framed with a 1px solid border of `rgba(255, 255, 255, 0.08)`.
- **Layer 2 (Interactive Modules & Cards):** `#18191E` with a 1px solid border of `rgba(255, 255, 255, 0.08)`. Hover transitions swap the border to `rgba(255, 107, 0, 0.35)` with an interior border inset of `rgba(255, 107, 0, 0.05)`.
- **Layer 3 (Overlays, Modals, Terminal Panels):** `#18191E` backed by a 1px solid `rgba(255, 255, 255, 0.16)` border and a directional floor cast shadow: `0 16px 32px -8px rgba(0, 0, 0, 0.8)`.
- **Active Focus Glow:** Interactive elements in an active or focused state project a sharp, controlled outline: `box-shadow: 0 0 0 1px #FF6B00, 0 0 12px rgba(255, 107, 0, 0.25)`.

## Shapes
The shape language reflects industrial technical instrumentation: sharp, grounded, and functional. Pure circular geometries and pill-shaped components are disallowed to prevent a casual or consumer app feel.

- **Global Standard (`roundedness: 1`):** Base components, buttons, badges, and card corners utilize a restrained `0.25rem` (4px) radius.
- **Large Panels & Containers:** Cap at `0.5rem` (8px) maximum radius.
- **Technical Chamfers (Contextual):** Tactical accent elements, such as active tab headers or code inspector corners, may implement a 45-degree, 6px cut corner (`clip-path: polygon(...)`) to emphasize the game HUD aesthetic while preserving clean layouts.

## Components

### Buttons
- **Primary Action:** Solid `#FF6B00` fill, `#0B0C0E` text, `Space Grotesk` weight 600, uppercase with 0.04em letter spacing. 4px corner radius. Padding: 10px 20px. Hover state shifts background to `#FF7A00` with an outer glow: `0 0 16px rgba(255, 107, 0, 0.35)`.
- **Secondary (Ghost Terminal):** Background `#121316`, border 1px solid `rgba(255, 255, 255, 0.12)`, text `#F3F4F6`. Hover triggers border transition to `#FF6B00` and text to `#FF6B00`.
- **Minimal Monospaced:** JetBrains Mono uppercase, accompanied by a trailing directional marker (`→` or `//`).

### HUD Status Badges & Chips
- Formed by a 1px hairline border around an ultra-dark fill (`#121316`).
- Left-aligned 6px geometric LED indicator dot: pulsing `#FF6B00` for active work/experiments, steady `#D1D5DB` for archived deployments.
- Typography: `hud-indicator` (JetBrains Mono 10px, uppercase, 0.12em letter spacing).

### Project Cards
- Container: Surface Level 2 (`#18191E`) bordered by 1px `rgba(255, 255, 255, 0.08)`.
- Header ribbon containing structural breadcrumbs (`SYS.01 // CREATIVE TECH`) in muted JetBrains Mono.
- Content zone: Bold `Space Grotesk` title followed by high-contrast preview and concise `Inter` summary.
- Footer telemetry strip displaying tech stack tags, performance metrics, or coordinates separated by monospaced vertical pipes (`|`).

### Form Controls & Inputs
- Fields utilize `#0E0F12` background, inset 1px hairline border `rgba(255, 255, 255, 0.1)`. Text in `#F3F4F6`.
- Active focus invokes a 1px border of `#FF6B00` and an illuminated input prompt marker (`> `).
- Checkboxes: 16x16px squares with sharp 2px corners; active state displays a solid `#FF6B00` fill with an internal black geometric square dot.

### Telemetry Bars & Progress Trackers
- Segmented technical visual bars indicating progress or proficiency.
- Composed of 2px wide vertical blocks with 2px gaps. Filled blocks use `#FF6B00`, inactive blocks use `rgba(255, 255, 255, 0.08)`.
- Display accompanying coordinate text or percentages in `telemetry-tag` styling.