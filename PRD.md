# Product Requirements Document (PRD)
## Project: Apex Telemetry Portfolio
**Owner:** Aditya Prasad Sahu  
**Version:** 1.0.0  
**Status:** Approved / Active  
**Repository:** `sahuadityaprasad40-cmyk/Portfolio`

---

## 1. Executive Summary & Purpose
The **Apex Telemetry Portfolio** is an elite, high-craft personal portfolio website engineered for **Aditya Prasad Sahu**. Built at the intersection of aerospace telemetry, tactical game HUDs, and high-performance developer tooling, the portfolio departs from boilerplate developer templates to present Aditya's engineering prowess, technical architecture capabilities, and visual execution.

### 1.1 Core Objectives
- **Establish Technical Authority:** Showcase engineering depth, systems-level thinking, and modern web craft through a distinct, data-dense, telemetry-driven user experience.
- **Convert High-Value Opportunities:** Deliver a frictionless, high-impact pipeline for recruiters, engineering leaders, and potential collaborators to inspect featured case studies and initiate contact.
- **Zero-Bloat Performance:** Deliver sub-second initial load, fluid 60fps micro-interactions, responsive adaptability across devices, and 95+ Lighthouse scores across all metrics.

---

## 2. Target Audience & Personas
1. **Engineering Managers & Tech Leads:** Evaluating architectural discipline, code elegance, problem-solving depth, and system design capability.
2. **Technical Recruiters & Talent Partners:** Seeking immediate clarity on technical proficiencies, project outcomes, professional trajectory, and direct contact avenues.
3. **Open-Source Collaborators & Peers:** Exploring interactive technical prototypes, tooling repositories, and engineering philosophy.

---

## 3. Product Principles & Aesthetic Vision
- **Calibrated Rigor:** Strict hairline boundary definitions, precise structural alignment, and data-dense metadata labels over flashy or gratuitous decoration.
- **Instrument Precision:** Monospaced coordinate tracking, version indices, and status flags function as usable, readable navigational anchors.
- **Controlled Kinetic Energy:** High-voltage electric orange (`#FF6B00`) deployed strategically against deep obsidian tones (`#0B0C0E` / `#121316`) to guide user attention and highlight interactive focus.
- **No Gimmicks:** Strict prohibition of cheap glassmorphism, muddy ambient dropshadows, or uncalibrated animations.

---

## 4. Functional Requirements & Feature Specifications

### 4.1 Tactical Navigation & Telemetry HUD Bar
- **Fixed/Sticky Header:** Slim, low-profile navigation framed by a 1px hairline border (`rgba(255, 255, 255, 0.08)`).
- **Telemetry Indicators:**
  - Dynamic status indicator: Pulsing green/orange LED showing current availability: `[STATUS: ACTIVE_FOR_OPPORTUNITIES]`.
  - UTC/Local Time Tracker: Real-time clock and location telemetry.
- **Navigation Links:** Direct smooth-scrolling anchors to `[01 // OVERVIEW]`, `[02 // PROJECTS]`, `[03 // ARSENAL]`, `[04 // TIMELINE]`, and `[05 // CONTACT]`.
- **Theme Toggle:** Switch between Obsidian Dark Mode (primary) and High-Visibility Light Mode.

### 4.2 Hero Command Section
- **Coordinates & Sub-Heading:** Monospaced metadata tags (e.g., `SYS.LOC // 2026.REL` and role identifier: `SOFTWARE ENGINEER & CREATIVE TECH`).
- **Headline Statement:** High-impact geometric display typography (`Space Grotesk`) declaring core competency and value proposition.
- **Narrative Subtext:** Concise, authoritative summary of software development philosophy, systems focus, and passion for craft.
- **Call-to-Action Cluster:**
  - Primary CTA: `[DEPLOY CONTACT →]` triggering smooth scroll to Contact or opening contact modal.
  - Secondary CTA: `[INSPECT PROJECTS //]` jumping to case studies.
  - Quick Telemetry Link: Download resume / CV with timestamp verification.

### 4.3 Featured Projects Showcase (Case Studies)
- **Data-Dense Project Cards:**
  - Header ribbon with structural breadcrumbs (e.g., `SYS.01 // FULL-STACK PLATFORM`).
  - Project Title & High-Contrast Visual Preview / Architecture Diagram.
  - Problem statement, architectural solution, and measurable business/technical outcomes.
  - Technology stack badges formatted with JetBrains Mono telemetry tags.
  - Action buttons: `[LIVE DEMO ↗]` and `[SOURCE CODE ↗]`.
- **Project Filter / Category Switcher:** Filter by domains (e.g., `ALL`, `SYSTEMS`, `FRONTEND`, `APIS & CLOUD`).

### 4.4 Technical Arsenal & Skills Telemetry
- **Categorized Competency Modules:** Grouped logically into Frontend, Backend/APIs, Cloud & DevOps, Database Systems, and Tooling.
- **Segmented Telemetry Gauges:** Visual proficiency trackers composed of discrete vertical blocks rather than generic smooth progress bars.
- **Tooling Badges:** Monospaced tags with versioning or proficiency status.

### 4.5 Engineering Log & Experience Timeline
- **Git Commit / Mission Log Aesthetic:** Chronological experience structured like a deployment history.
- **Entries:** Company/Role, timeline dates, key architectural responsibilities, and quantified achievements.
- **Education & Certifications:** Dedicated secondary timeline rail for formal degrees and technical accreditations.

### 4.6 Interactive Tactical Terminal / Command Palette
- **Embedded Interactive Console:** A lightweight, interactive CLI terminal drawer accessible on demand (or via keyboard shortcut `Ctrl+/` or `~`).
- **Supported Commands:**
  - `help`: List available commands.
  - `about`: Print biographical summary.
  - `projects`: List all projects with direct numbered shortcuts.
  - `skills`: Output structured skill matrix.
  - `contact`: Print direct contact coordinates.
  - `clear`: Clear console viewport.

### 4.7 Signal Transmission / Contact Hub
- **Direct Communication Form:** Fields for Name, Email, Subject, and Transmission Message with real-time HUD validation indicators.
- **Quick-Copy Coordinates:** One-click copy for email (`sahuadityaprasad40@gmail.com`).
- **Social & Platform Links:** GitHub, LinkedIn, Twitter/X, and Discord formatted with telemetry tags.

---

## 5. Non-Functional Requirements

### 5.1 Performance & Reliability
- **Lighthouse Targets:** Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
- **Asset Optimization:** SVGs for all technical icons; zero heavyweight UI frameworks; modular Vanilla CSS and ES modules.
- **Load Times:** First Contentful Paint (FCP) < 1.0s; Largest Contentful Paint (LCP) < 1.8s; Cumulative Layout Shift (CLS) = 0.

### 5.2 Accessibility & Usability (a11y)
- WCAG 2.1 Level AA compliance.
- Full keyboard navigability with distinct visual focus rings (`box-shadow: 0 0 0 1px #FF6B00`).
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Screen reader optimized labels (`aria-label`, `aria-live` for HUD telemetry).

### 5.3 Responsive Design Breakpoints
- **Desktop (1024px+):** Full 12-column grid, persistent telemetry side rail, expanded HUD headers.
- **Tablet (768px – 1023px):** 8-column layout, tabbed telemetry modules.
- **Mobile (<768px):** 4-column single-column flow, bottom-docked telemetry indicators, touch-optimized hit targets (≥ 44px).

---

## 6. Project Scope & Out of Scope

### 6.1 In Scope (v1.0)
- Complete single-page portfolio layout with modular sections.
- Full design token implementation (`dark.md` and `light.md`).
- Working interactive terminal emulator.
- Client-side contact validation with copy-to-clipboard fallbacks.
- Live telemetry clock and status indicators.

### 6.2 Out of Scope (Future Versions)
- Complex server-side database backend (keep portfolio statically deployable).
- Heavy 3D WebGL scenes that compromise mobile battery or performance.
- CMS integration (all project data managed in clean, decoupled JSON/JS data modules).
