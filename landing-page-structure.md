# Shura Landing Page Structure

Entry point: `src/pages/Index.tsx`  
Product name: **Shura** — AI Project Diligence  
Positioning: Evidence-backed decision intelligence for high-stakes projects (does not replace consultants, banks, or advisors)

---

## Visual shell

Everything sits inside a full-height page with a dark background.

| Layer | Component | File | Role |
|-------|-----------|------|------|
| Background | `GradientBlobs` | `src/components/GradientBlobs.tsx` | Fixed animated color blobs (blue, violet, cyan, amber) |
| Background | `BackgroundCards` | `src/components/BackgroundCards.tsx` | Fixed floating persona cards (Financial, Technical, Legal, Environmental, Commercial) that shuffle positions every ~3.2s |
| Foreground | Content wrapper | `Index.tsx` | `relative z-10` — all page sections |

---

## Page order (top → bottom)

```
GradientBlobs + BackgroundCards (fixed background)
└── Navbar (fixed)
└── HeroSection
└── CTASection              ← waitlist (near top)
└── WhyNowSection
└── ProblemSection
└── WhoSection
└── CostSection
└── ToolsFailSection
└── IntroducingSection
└── StatsSection
└── HowItWorksSection
└── FeaturesSection
└── VisionSection
└── Footer
```

**Not currently rendered:** `ExampleSection` (defined in `BottomSections.tsx`, exported but unused in `Index.tsx`).  
**Product app (separate):** `/Users/tf/internalthink` — FastAPI + React workspace (ingest, specialists, financial model, reports, knowledge map).

---

## 1. Navbar

**File:** `src/components/Navbar.tsx`  
**Behavior:** Fixed top bar, glass/blur style; hamburger sheet on mobile

### Brand
- Logo mark + wordmark “Shura”
- CTA: “Join waitlist” → `#cta` (desktop); “Waitlist” shortcut on mobile

### Nav links

| Label | Anchor |
|-------|--------|
| Problem | `#problem` |
| Introducing Shura | `#introducing` |
| Who it's for | `#who` |
| How it works | `#how-it-works` |
| Features | `#features` |

---

## 2. HeroSection

**File:** `src/components/HeroSection.tsx`  
**Supporting:** `HeroVisual.tsx`

| Element | Content |
|---------|---------|
| Eyebrow badge | “AI project diligence” |
| Headline | “Pressure-test the project **before you commit capital.**” |
| Body | Upload the data room. Shura ingests documents, runs a specialist panel, builds an evidence-backed financial model, and produces decision-ready reports — so you see risks, trade-offs, and viability before consultants, IC, or lenders take months. |
| Positioning line | “We don’t replace advisors — we compress the first diligence pass and make every number traceable.” |
| Primary CTA | “Sign up for the waitlist” → `#cta` |
| Visual | `HeroVisual` component below the copy |

---

## 3. CTASection (Waitlist)

**File:** `src/components/BottomSections.tsx`  
**Anchor:** `#cta`  
**Backend:** Supabase `waitlist` table via `src/lib/supabase`

| Element | Content |
|---------|---------|
| Headline | “Diligence your next project with clarity.” |
| Body | Get a specialist panel, a validated financial model, and structured reports from your own documents — then decide, branch, or bring in advisors with a clearer brief. |
| Form fields | Email + Position dropdown |
| Position options | CEO, Project Sponsor, Investor, Consultant, Other |
| Submit | “Join the waitlist” |

Placed near the top of the page (directly after Hero) so waitlist signup is early in the scroll.

---

## 4. WhyNowSection

**File:** `src/components/ProblemSections.tsx`  
**No section id**

| Element | Content |
|---------|---------|
| Label | Why now |
| Headline | “Project decisions still start with scattered PDFs and weeks of debate” |
| Body | Feasibility studies, financial workbooks, technical reviews, and contracts live in different folders. Teams argue without a shared evidence base — or pay for a full advisory engagement just to find out if the project holds. |
| Visual | `ComplexityGraphic` |

---

## 5. ProblemSection

**File:** `src/components/ProblemSections.tsx`  
**Anchor:** `#problem`

| Element | Content |
|---------|---------|
| Label | The problem |
| Headline | “Early diligence means fragmented expertise, opaque models, and expensive consulting” |
| Body | Documents are unread at scale; financial models aren’t reproducible; specialist views never meet in one place. |
| Chart | Animated bars: Financial 74%, Technical 69%, Legal 58%, Environmental 63%, Commercial 61% |
| Pain cards | Hundreds of unread docs · Opaque spreadsheets · Fragmented specialist views · Slow kill-or-commit |

---

## 6. WhoSection

**File:** `src/components/BottomSections.tsx`  
**Anchor:** `#who`

| Element | Content |
|---------|---------|
| Label | Who it's for |
| Headline | “For people who greenlight capital projects” |
| Body | Built for anyone who must evaluate infrastructure, energy, or complex ventures from a real document corpus |

### Audiences

| Audience | Description |
|----------|-------------|
| Sponsors & CEOs | Decide whether a project is viable before locking capital or advisors |
| Investors & lenders | Stress-test returns, coverage, and diligence gaps from the data room |
| Project developers | Align technical, financial, and commercial views before IC |
| Consultants & advisors | Accelerate the first pass and arrive with structured findings |

---

## 7. CostSection

**File:** `src/components/ProblemSections.tsx`  
**Anchor:** `#cost`

| Element | Content |
|---------|---------|
| Label | The cost |
| Headline | “The cost of the old way to diligence” |
| Body | Unread data rooms, six-figure feasibility retainers, decision delay while capital waits |
| Visual | `CostScatterAnimated` scatter chart |
| Summary | “The loss.” + short paragraph tying the stats together |

### Stats (sourced)

| Stat | Label |
|------|-------|
| $37B | Lost annually to unproductive meetings (US) |
| $100K+ | Per strategy or feasibility evaluation (consulting) |
| 71% | Of meetings considered unproductive |
| 60% | Of project delays from decision latency |

---

## 8. ToolsFailSection

**File:** `src/components/ProblemSections.tsx`  
**No section id**

| Element | Content |
|---------|---------|
| Label | Why current tools fail |
| Headline | “One chat answer. One spreadsheet. No shared diligence.” / sub: specialists, provenance, and a model that doesn’t invent IRR |
| Media | Looping `chat.mp4` video |

### Tool comparison cards

| Tool | Issue |
|------|-------|
| Chatbots | Single answer, no project memory or provenance |
| Static reports | Snapshot in time — not explorable when assumptions change |
| Consulting | Slow, expensive, hard to re-run when new docs arrive |
| Spreadsheets alone | Powerful but opaque — numbers without evidence trail |

---

## 9. IntroducingSection

**File:** `src/components/ProductSections.tsx`  
**Anchor:** `#introducing`

| Element | Content |
|---------|---------|
| Label | Introducing Shura |
| Headline | “AI Project Diligence” |
| Body | Ingests the project corpus; evaluates through a specialist panel; imports authoritative financial workbooks into a deterministic engine; synthesizes decisions and exportable reports with evidence provenance |
| Supporting | “The AI recommends; you decide. The model calculates; it never invents returns.” |
| Main emphasis | Surfaces cross-specialist tension, decision-critical gaps, and financial viability from the same evidence base |

### Output chips
Specialist scores · Financial Model · Financial Summary · Preliminary evaluation · Site assessment · Knowledge map · Decision tree · Provenance

---

## 10. StatsSection

**File:** `src/components/StatsSection.tsx`  
**No section id**

| Element | Content |
|---------|---------|
| Label | By the numbers |
| Headline | “Built for evidence-backed project decisions” |
| Media | Looping `persona.mp4` |

### Numbers

| Value | Label |
|-------|-------|
| 5 | Specialist perspectives |
| 500+ | Documents per project (ingest-ready) |
| 2 | Financial outputs (Model + Summary) |
| 1 | Shared evidence base |

---

## 11. HowItWorksSection

**File:** `src/components/ProductSections.tsx`  
**Anchor:** `#how-it-works`

| Element | Content |
|---------|---------|
| Label | How it works |
| Headline | “From data room to decision” |

### Steps

| # | Title | Description |
|---|-------|-------------|
| 01 | Create a project | Upload the data room — studies, workbooks, drawings, contracts |
| 02 | Ingest & map evidence | Shura extracts, embeds, and builds a searchable project knowledge base |
| 03 | Run the panel + model | Specialists evaluate; the financial engine builds IRR, NPV, DSCR from authoritative sources |
| 04 | Export & decide | Read Financial Model + Financial Summary, PPE / site reports — then commit, kill, or branch |

---

## 12. FeaturesSection

**File:** `src/components/ProductSections.tsx`  
**Anchor:** `#features`

| Element | Content |
|---------|---------|
| Label | Features |
| Headline | “Built for project-grade diligence” |

### Expandable feature rows (top 3 — click to expand video)

| Feature | Description | Video |
|---------|-------------|-------|
| Specialist panel | Structured scores and rationale across financial, technical, legal, environmental, commercial | `eval.mp4` |
| Financial Model + Summary | Workbook-first model with deterministic metrics; dual PDFs from one source of truth | `decisiontree.mp4` |
| Chat with specialists | Group or 1:1 conversations grounded in project evidence | `chat.mp4` |

### Static feature cards (bottom 3)

| Feature | Description |
|---------|-------------|
| Document intelligence | OCR, vision, and layout-aware ingest across large data rooms |
| Decision reports | Preliminary evaluation, site assessment, and companion specialist analysis |
| Knowledge map | Explore how documents, decisions, and entities connect across the project |

---

## 13. VisionSection

**File:** `src/components/BottomSections.tsx`  
**No section id**

| Element | Content |
|---------|---------|
| Label | Vision |
| Headline | “The operating system for project decisions” |
| Body | Diligence should be structured, traceable, and re-runnable when new evidence arrives. Shura keeps the specialist panel, the financial model, and the reports on one evidence spine — so capital decisions get faster without getting sloppy. |

---

## 14. Footer

**File:** `src/components/BottomSections.tsx`

- Shura logo mark + name  
- Tagline: “AI Project Diligence”

---

## Component file map

| File | Exports used on the page |
|------|--------------------------|
| `Navbar.tsx` | Navbar |
| `GradientBlobs.tsx` | GradientBlobs |
| `BackgroundCards.tsx` | BackgroundCards |
| `HeroSection.tsx` | HeroSection |
| `HeroVisual.tsx` | Used inside Hero |
| `ProblemSections.tsx` | WhyNowSection, ProblemSection, CostSection, ToolsFailSection, SectionLabel |
| `ProductSections.tsx` | IntroducingSection, HowItWorksSection, FeaturesSection |
| `BottomSections.tsx` | WhoSection, VisionSection, CTASection, Footer (also exports unused ExampleSection) |
| `StatsSection.tsx` | StatsSection |
| `ComplexityGraphic.tsx` | Used in Why Now |
| `CostScatterAnimated.tsx` | Used in Cost |
| `CountUp.tsx` / `AnimatedBar.tsx` | Shared animation helpers |

---

## Media assets

| Asset | Used in |
|-------|---------|
| `src/assets/chat.mp4` | Tools Fail + Features (Chat) |
| `src/assets/eval.mp4` | Features (Specialist panel) |
| `src/assets/decisiontree.mp4` | Features (Financial Model + Summary) |
| `src/assets/persona.mp4` | Stats |

---

## Integrations

| Integration | Purpose |
|-------------|---------|
| Supabase (`waitlist` table) | Email + position capture on CTA waitlist form |
| Vercel | Deployment (`vercel.json`) |

---

## Related projects

| Path | Role |
|------|------|
| `/Users/tf/decision-compass` | This landing / waitlist site |
| `/Users/tf/internalthink` | Shura product app — project ingest, specialist evaluation, financial model engine, reports, knowledge map |
| `/Users/tf/decision-app` | Earlier standalone decision demo (form → analysis → PDF); not the current product surface |

---

## Product truth (copy guardrails)

Use these when writing or reviewing section copy. Do not claim the opposite.

| Claim | Truth |
|-------|-------|
| Specialists | Multi-perspective panel over shared project evidence — not a single chatbot answer |
| Financial numbers | Deterministic engine from authoritative workbooks; LLM does not invent IRR / NPV / DSCR |
| Reports | Dual financial outputs (Financial Model + Financial Summary) plus PPE / site / specialist analysis |
| Advisors | Complements consultants and IC — compresses the first diligence pass |
| Evidence | Uploaded corpus is the spine; provenance matters more than polish |
