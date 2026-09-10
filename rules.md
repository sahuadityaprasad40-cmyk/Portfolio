# AI Engineering Rules & Operational Guidelines
## Project: Apex Telemetry Portfolio
**Target Persona:** Aditya Prasad Sahu  
**Scope:** AI-Assisted Development, Maintenance, and Feature Delivery  
**Governing Rule:** Every AI assistant must consult and follow this document before generating or modifying code.

---

## 1. What the AI MUST USE (Enforced Standards)

### 1.1 Technical Stack & Methodology
- **Vanilla Web Platform:** Build using clean, semantic **HTML5**, modern **Vanilla CSS** (Custom Properties), and modular **Vanilla JavaScript** (ES6+ modules).
- **Design Tokens as Source of Truth:** All colors, spacing, typography, and elevation styles must be referenced from [dark.md](file:///c:/Users/HP/OneDrive/Desktop/Portfolio1/dark.md) and [light.md](file:///c:/Users/HP/OneDrive/Desktop/Portfolio1/light.md).
- **Strict Typography Trio:**
  - **Headlines / Display:** `Space Grotesk` (geometric modernism, tight tracking).
  - **Body / Narrative:** `Inter` (hyper-legible sans-serif).
  - **Telemetry / Code / Coordinates / HUD Tags:** `JetBrains Mono` (monospaced clarity, uppercase tags).
- **Precision Hairlines & Stepped Surfaces:** Use 1px hairline borders (`rgba(255, 255, 255, 0.08)` for dark borders and `rgba(255, 107, 0, 0.35)` for active/hover highlights) combined with stepped charcoal/obsidian surfaces (`#0B0C0E` -> `#121316` -> `#18191E` -> `#22242B`).
- **Semantic HTML5:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<time>`, `<code>`, and `<footer>`.
- **Authentic Identity:** Feature real information for Aditya Prasad Sahu (email: `sahuadityaprasad40@gmail.com`, India/IST timezone or UTC coordinates, GitHub: `sahuadityaprasad40-cmyk`).

### 1.2 UX & Micro-Interactions
- **Kinetic Focus:** Electric orange (`#FF6B00`) is a high-voltage resource; use it with intention for primary calls-to-action, active statuses, cursor blinks, and interactive focus states.
- **Visual Feedback:** All buttons and interactive cards must implement clear `:hover`, `:focus-visible`, and `:active` states.
- **Accessibility (a11y):** Form fields must have corresponding `<label>` elements or descriptive `aria-label` attributes. Maintain contrast ratios compliant with WCAG 2.1 AA.

---

## 2. What the AI MUST AVOID (Strict Prohibitions)

### 2.1 Framework & Library Bloat
- **NO Tailwind CSS:** Do not install or import Tailwind CSS or other utility-first frameworks unless the user explicitly requests it.
- **NO Heavy Runtimes:** Do not introduce Bootstrap, jQuery, React, or bulky UI component packages when vanilla code accomplishes the task.
- **NO Blocking Scripts:** Do not load heavy third-party scripts, tracking analytics, or heavy 3D canvases that reduce Lighthouse performance.

### 2.2 Aesthetic Anti-Patterns
- **NO Generic Colors:** Avoid default browser reds, blues, greens, or harsh neon rainbow palettes.
- **NO Frosted-Glass & Blur Clutter:** Avoid `backdrop-filter: blur(...)` gimmicks and excessive translucent overlays that obscure layout clarity.
- **NO Heavy Skeuomorphism or Ambient Muddy Shadows:** Depth is produced through surface stepping and hairline borders, not muddy `box-shadow: 0 10px 30px rgba(0,0,0,0.5)`.
- **NO Juvenile Gaming Tropes:** Avoid pixel art icons, glitch overload, or cartoonish gaming graphics. The aesthetic must remain high-craft aerospace telemetry and precision tooling.
- **NO Pure Circular or Pill Buttons:** Buttons and containers must adhere to the defined `0.25rem` (4px) or `0.5rem` (8px) radius or 45-degree chamfers.

### 2.3 Code & Content Anti-Patterns
- **NO "Lorem Ipsum":** Never output Latin placeholder copy. Always generate realistic, professional software engineering narratives, telemetry metrics, and project descriptions.
- **NO Dead Interactive Elements:** Never write `<button>` or `<a href="#">` tags that do nothing. All controls must have working scroll targets, event listeners, or modal triggers.
- **NO Inline CSS:** Do not use `style="..."` attributes on HTML elements except for dynamic runtime values (e.g. telemetry progress widths calculated via JS).

---

## 3. What the AI MUST PRESERVE (Guardrails & State)

### 3.1 Context & Documentation Integrity
- **Preserve All Six Context Files:**
  - `PRD.md` — Product requirements & scope
  - `Architecture.md` — Technical system design
  - `rules.md` — AI guidelines & constraints (This document)
  - `phases.md` — Development roadmap & stage status
  - `design.md` — Master design system guide
  - `memory.md` — Project memory, progress ledger & key decisions
- **Update Memory Continually:** Whenever a milestone, key decision, or significant feature is implemented, update `memory.md` and `phases.md`.
- **Preserve Token Definitions:** Never alter the core design tokens in `dark.md` and `light.md` without explicit user sign-off.

### 3.2 Code Quality & Git Etiquette
- **Preserve Existing Comments:** Do not wipe out architectural comments or docstrings when modifying files.
- **Non-Destructive Refactoring:** When improving components, ensure existing features (such as theme switching or keyboard shortcuts) remain fully functional.
- **Atomic Execution:** Implement changes logically step-by-step, verifying visual rendering and browser console outputs.
