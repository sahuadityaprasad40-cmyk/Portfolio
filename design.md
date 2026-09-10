# Visual Design Rules & Design System Specification
## Project: Apex Telemetry Portfolio
**Theme Codename:** Apex Telemetry  
**Aesthetic Core:** Aerospace Telemetry // Tactical Game HUD // High-Performance Developer Tooling  
**Design Tokens Reference:** [dark.md](file:///c:/Users/HP/OneDrive/Desktop/Portfolio1/dark.md) & [light.md](file:///c:/Users/HP/OneDrive/Desktop/Portfolio1/light.md)

---

## 1. Aesthetic Philosophy & Brand Identity

The **Apex Telemetry** design system creates an elevated, high-craft digital atmosphere engineered for high-caliber developers and technical architects. It rejects juvenile gaming tropes, neon clutter, skeuomorphic bevels, and frosted-glass gimmicks in favor of:

1. **Calibrated Rigor:** Strict hairline boundary definitions, precise structural alignment, and data-dense metadata labels that convey instant engineering authority.
2. **Instrument Precision:** Monospaced coordinate tracking, version indices, and status flags that act as functional navigational anchors rather than decorative fluff.
3. **Controlled Kinetic Energy:** Electric kinetic orange (`#FF6B00`) deployed as a high-voltage resource—sparingly applied to focus user velocity, active inputs, and completion telemetry against deep obsidian surfaces.

---

## 2. Color Palette & Token Architecture

The palette leverages a stepped architecture of near-black and deep charcoal values, establishing visual planes without relying on heavy ambient shadows or blur filters.

### 2.1 Color Matrix

| Token Name | Hex / RGBA Value | Role & Architectural Purpose |
|---|---|---|
| `--color-canvas-base` | `#0B0C0E` | Deepest obsidian canvas. Ground plane and negative space framing. |
| `--color-surface-1` | `#121316` | Primary architectural panels, shell layout, and structural modules. |
| `--color-surface-2` | `#18191E` | Interactive card containers, code blocks, and isolated visual zones. |
| `--color-surface-3` | `#22242B` | Hover states, active item backgrounds, and flyout layers. |
| `--color-surface-highest` | `#343538` | Segmented inactive bars, input borders, and subtle chips. |
| `--color-primary` | `#FF6B00` | Pure electric kinetic orange. Primary CTAs, active LEDs, cursor highlights. |
| `--color-primary-dim` | `#FFB693` | Soft peach tint for secondary highlights and subtle active borders. |
| `--color-secondary` | `#FF5722` | Saturated deep orange for warning flags and telemetry thresholds. |
| `--color-tertiary` | `#FF8A3D` | High-luminance orange for focus rings and micro-metric ticks. |
| `--color-text-primary` | `#F3F4F6` | Crisp daylight white for headline copy, key numbers, and critical titles. |
| `--color-text-secondary` | `#D1D5DB` | Balanced neutral gray for body narratives and explanatory paragraphs. |
| `--color-text-muted` | `#9CA3AF` | Technical muted gray for coordinates, timestamps, and metadata tags. |
| `--color-border-hairline` | `rgba(255, 255, 255, 0.08)` | Ubiquitous 1px structural separator line for cards and sections. |
| `--color-border-accent` | `rgba(255, 107, 0, 0.35)` | Interactive focus, hover boundary, and selected state perimeter. |
| `--color-status-active` | `#10B981` | Vibrant green LED indicator for active status / open to opportunities. |

---

## 3. Typography Hierarchy & Rules

The typographic system utilizes three deliberate typefaces from Google Fonts to establish machine-readable clarity alongside elegant editorial density:

```
Space Grotesk    --> Headlines, Hero Display, Impact Titles
Inter            --> Narrative, Body Paragraphs, Project Summaries
JetBrains Mono   --> Telemetry Tags, Coordinates, HUD Badges, Code, Terminal
```

### 3.1 Typographic Scale

| Style Key | Font Family | Size | Weight | Line Height | Letter Spacing | Case |
|---|---|---|---|---|---|---|
| `display-hero` | Space Grotesk | 56px | 700 | 64px | -0.03em | Normal |
| `display-hero-mobile` | Space Grotesk | 36px | 700 | 42px | -0.02em | Normal |
| `headline-lg` | Space Grotesk | 38px | 600 | 46px | -0.02em | Normal |
| `headline-lg-mobile`| Space Grotesk | 28px | 600 | 34px | -0.015em| Normal |
| `headline-md` | Space Grotesk | 24px | 600 | 32px | -0.01em | Normal |
| `headline-sm` | Space Grotesk | 18px | 600 | 24px | 0em | Normal |
| `body-lg` | Inter | 16px | 400 | 26px | -0.01em | Normal |
| `body-md` | Inter | 14px | 400 | 22px | 0em | Normal |
| `body-sm` | Inter | 12px | 400 | 18px | 0em | Normal |
| `mono-code` | JetBrains Mono | 13px | 400 | 20px | 0em | Normal |
| `telemetry-tag` | JetBrains Mono | 11px | 500 | 14px | 0.06em | UPPERCASE |
| `hud-indicator` | JetBrains Mono | 10px | 600 | 12px | 0.12em | UPPERCASE |

---

## 4. Grid, Layout & Spatial Rhythm

### 4.1 Fluid 12-Column Grid
- **Container Max Width:** `1440px` centered with horizontal auto margins.
- **Desktop (1024px+):** 12 columns, `24px` (`1.5rem`) gutters, `48px` (`3rem`) outer margins.
- **Tablet (768px – 1023px):** 8 columns, `20px` gutters, `32px` (`2rem`) outer margins.
- **Mobile (<768px):** 4 columns, `16px` gutters, `20px` (`1.25rem`) outer margins.

### 4.2 Vertical Rhythm & Spacing Tokens
- **Baseline Unit:** 8px (`0.5rem`).
- `--spacing-section-gap`: `6rem` (96px) on desktop; `4rem` (64px) on mobile.
- `--spacing-stack-xs`: `0.25rem` (4px).
- `--spacing-stack-sm`: `0.5rem` (8px).
- `--spacing-stack-md`: `1rem` (16px).
- `--spacing-stack-lg`: `1.5rem` (24px).
- `--spacing-stack-xl`: `2.5rem` (40px).
- `--spacing-stack-2xl`: `4rem` (64px).

---

## 5. Elevation, Depth & Surface Stepping

Depth is achieved purely through color stepping and crisp 1px borders. Glassmorphism and fuzzy ambient drop shadows are strictly prohibited.

- **Layer 0 (Canvas Base):** `#0B0C0E` — Non-interactive background.
- **Layer 1 (Sub-Structure Panels):** `#121316` with `1px solid rgba(255, 255, 255, 0.08)`.
- **Layer 2 (Interactive Modules / Cards):** `#18191E` with `1px solid rgba(255, 255, 255, 0.08)`. Hover transitions border to `rgba(255, 107, 0, 0.35)` and subtle inset glow `inset 0 0 0 1px rgba(255, 107, 0, 0.1)`.
- **Layer 3 (Overlays / Modals / Terminal Drawer):** `#18191E` with `1px solid rgba(255, 255, 255, 0.16)` and directional floor cast shadow: `0 16px 32px -8px rgba(0, 0, 0, 0.85)`.
- **Active Focus Ring:** `box-shadow: 0 0 0 1px #FF6B00, 0 0 12px rgba(255, 107, 0, 0.25)`.

---

## 6. Shapes, Radii & Corner Geometry

The shape language reflects industrial technical instrumentation: sharp, grounded, and functional. Pure circular geometries and pill-shaped elements are prohibited.

- **Standard Radius:** `0.25rem` (4px) applied to buttons, badges, chips, and cards.
- **Container Radius:** `0.5rem` (8px) maximum for large panels and modal shells.
- **Technical Chamfers (Contextual):** Tactical tabs or active code inspector headers may implement a 45-degree, 6px cut corner (`clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)`).

---

## 7. Component Style Specifications

### 7.1 Buttons
- **Primary Kinetic Action:**
  - Background: `#FF6B00`; Color: `#0B0C0E`; Font: `Space Grotesk` 600, 13px, uppercase, letter-spacing `0.04em`.
  - Border radius: `4px`; Padding: `10px 22px`.
  - Hover state: Background shifts to `#FF7A00` with kinetic glow `0 0 16px rgba(255, 107, 0, 0.35)`.
- **Secondary Ghost Terminal Button:**
  - Background: `#121316`; Border: `1px solid rgba(255, 255, 255, 0.12)`; Color: `#F3F4F6`.
  - Hover state: Border becomes `#FF6B00`, Text becomes `#FF6B00`.
- **Monospaced Link Button:**
  - Font: `JetBrains Mono` uppercase with trailing indicator (`→` or `//`).

### 7.2 HUD Status Badges & Chips
- Background: `#121316`; Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Dot indicator: 6px geometric dot (pulsing `#10B981` or `#FF6B00`).
- Typography: `JetBrains Mono` 10px, uppercase, letter spacing `0.12em`.

### 7.3 Project Cards
- Container: Surface Level 2 (`#18191E`) bordered with `1px solid rgba(255, 255, 255, 0.08)`.
- Header ribbon: Telemetry breadcrumb (e.g. `SYS.01 // DISTRIBUTED PLATFORM`) in muted `JetBrains Mono`.
- Title: `Space Grotesk` weight 600.
- Summary: `Inter` weight 400.
- Footer strip: Tech tags separated by monospaced pipes (`|`).

### 7.4 Telemetry Progress Bars
- Segmented technical gauge composed of 10-12 discrete 3px wide vertical tick blocks separated by 2px gaps.
- Filled blocks: `#FF6B00`. Inactive blocks: `rgba(255, 255, 255, 0.08)`.
- Accompanied by numeric telemetry label (e.g. `[88%] // ADVANCED`).

### 7.5 Form Inputs & Terminal Console
- Background: `#0E0F12`; Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Active focus: Border shifts to `#FF6B00`, terminal prompt glyph (`> `) illuminates.
- Text: Crisp daylight white `#F3F4F6`.
