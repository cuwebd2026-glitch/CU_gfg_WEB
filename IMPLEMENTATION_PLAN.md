# IMPLEMENTATION_PLAN.md
GeeksforGeeks Student Chapter — Premium Redesign

## 1. Repo Analysis (current state)

**Stack:** React 18 + TypeScript + Vite + Tailwind v4 (CSS-first `@theme`) + shadcn/ui + Framer Motion (`motion/react`) + wouter routing.

**Existing good bones (reuse, don't rewrite):**
- `index.css` — solid GFG-green dark/light theme via CSS vars + oklch, already has `.surface-card`, `.glow-ring`, `.text-gradient-brand`, reduced-motion support, custom scrollbar. **Keep and extend.**
- `Header.tsx` — sticky, blur-on-scroll, mobile menu, theme toggle. **Keep, extend nav items + add new anchors.**
- `HeroSection.tsx` — terminal block, progress bar, stats, badges. **Keep, upgrade: spotlight/grid+noise bg, typing animation, floating cards, parallax.**
- `ThemeContext`, `AnimatedToggle`, `AnimatedTabs`, `AnimatedProgressBar`, `AnimatedInput` — reusable primitives. **Keep.**
- shadcn/ui kit fully installed (`card`, `dialog`, `accordion`, `avatar`, `carousel`, `3d-card`, `animated-testimonials`, etc.) — **reuse instead of hand-rolling new primitives.**
- `FeaturesSection`, `TeamSection`, `TestimonialsSection`, `ContactSection`, `Footer` — functional but content is hardcoded inline. **Refactor to be JSON-driven; restyle to match Hero's premium bar.**
- `ComponentsShowcase.tsx` — internal dev showcase, not a real marketing section. **Remove from Home page composition** (keep file, unused, or delete — decision: remove from page, leave file for reference).

**Gaps vs. master prompt's required sections:**
Have: Navbar, Hero, Features, Team, Testimonials, Contact, Footer.
Missing: **Statistics (standalone), About, Events, Achievements, Sponsors, Partners, Gallery, Faculty Coordinator, FAQ.**

## 2. Content Architecture

Create `client/src/data/content.ts` — single typed source of truth for all section content (site rule: "never hardcode content, drive from JSON/TS data"). Each section imports typed arrays/objects from here. Easy to later swap for a real CMS or `.json` fetch.

## 3. New/Updated Components

| Component | Action |
|---|---|
| `Header.tsx` | Extend nav items to match new sections |
| `HeroSection.tsx` | Add spotlight + grid/noise bg layer, typing animation line, subtle parallax on scroll |
| `StatisticsSection.tsx` | **New** — animated counters, standalone strip |
| `AboutSection.tsx` | **New** — mission/story + pillars |
| `FeaturesSection.tsx` | Refactor to pull from `content.ts` |
| `EventsSection.tsx` | **New** — upcoming/past events, card grid |
| `AchievementsSection.tsx` | **New** — awards/milestones timeline |
| `SponsorsSection.tsx` | **New** — logo marquee/grid |
| `PartnersSection.tsx` | **New** — partner orgs grid |
| `GallerySection.tsx` | **New** — image grid with lightbox-lite hover |
| `TestimonialsSection.tsx` | Refactor to pull from `content.ts`, keep `animated-testimonials` UI |
| `TeamSection.tsx` | Refactor to pull from `content.ts` |
| `FacultyCoordinatorSection.tsx` | **New** — spotlight card |
| `FAQSection.tsx` | **New** — shadcn `accordion` |
| `ContactSection.tsx` | Refactor to pull from `content.ts` |
| `Footer.tsx` | Extend links to match new sections |
| `Home.tsx` | Compose full new section order |

## 4. Section Order (final)

Navbar → Hero → Statistics → About → Features → Events → Achievements → Sponsors → Partners → Gallery → Testimonials → Team → Faculty Coordinator → FAQ → Contact → Footer

## 5. Cross-cutting

- **Accessibility:** semantic landmarks, `aria-label`s on icon buttons (mostly present), focus-visible rings via existing `--ring`, alt text on all images, accordion via shadcn (already accessible).
- **SEO:** update `client/index.html` meta tags (title, description, OG tags), add section `id`s for anchor nav (done per-section).
- **Performance:** `viewport={{ once: true }}` on scroll animations (pattern already used — keep consistent), avoid layout thrash, no new heavy deps.
- **Responsiveness:** mobile-first grid patterns matching existing `md:` breakpoints.

## 6. Execution Order (this session)

1. `content.ts` data layer
2. Hero upgrade (bg effects, typing)
3. Statistics section
4. About section
5. Features refactor
6. Events section
7. Achievements section
8. Sponsors + Partners sections
9. Gallery section
10. Testimonials refactor
11. Team refactor
12. Faculty Coordinator section
13. FAQ section
14. Contact refactor
15. Footer + Header nav sync
16. Home.tsx composition
17. index.html SEO meta
18. Build verification (`pnpm build` / `tsc`)
