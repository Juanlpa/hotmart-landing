# AI AGENT CONTEXT — Hotmart Landings Project

> **Purpose**: This file is the single source of truth for any AI agent working on this project. Read this ENTIRELY before executing any task. It eliminates the need to scan the full codebase.
> **Last updated**: 2026-03-11

---

## 1. PROJECT IDENTITY

- **What**: Multi-product landing page system for Hotmart affiliate products
- **Goal**: Generate high-conversion sales pages where each page promotes a specific Hotmart product via affiliate links
- **Priority**: Page speed + Conversion rate. Every technical decision must favor both
- **Target audience**: Latin American market (Brazil, Mexico, Colombia, Argentina, etc.)
- **Traffic source**: Paid ads (Facebook/Instagram Ads, Google Ads) — 70%+ mobile

---

## 2. TECH STACK (exact versions matter)

| Technology | Version | Notes |
|---|---|---|
| Astro | 6.x | Static site generator — `output: 'static'` |
| React | 19.x | Islands architecture — interactive components only |
| Tailwind CSS | 4.x | Via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`) |
| Framer Motion | latest | Animations for React components |
| Vercel | adapter | `@astrojs/vercel` — static deploy |
| TypeScript | strict | All files are typed |

### CRITICAL: Tailwind v4 Setup
Tailwind is configured as a Vite plugin, NOT an Astro integration:
```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```
Do NOT install or use `@astrojs/tailwind` — it is incompatible with Astro 6.

---

## 3. ARCHITECTURE

### URL Structure
```
domain.com/                    → Internal admin dashboard (noindex)
domain.com/[product-slug]/     → Public landing page for a product
```
Each product = its own independent landing page. No shared navigation between products. Visitors arrive via direct ad links.

### Rendering Model
- ALL pages are static HTML generated at build time
- React components hydrate client-side using Astro directives:
  - `client:visible` — hydrates when visible in viewport (default for most)
  - `client:idle` — hydrates when browser is idle (for overlays/modals)

### Data Flow
```
src/config/products.ts (source of truth)
       ↓
src/pages/[slug]/index.astro (landing page)
       ↓
Components read product data via props
       ↓
src/utils/hotmart.ts builds affiliate links with UTMs
```

---

## 4. FILE MAP

```
hotmart-landings/
├── astro.config.mjs                    # Astro + React + Tailwind(vite) + Vercel
├── src/
│   ├── config/
│   │   ├── products.ts                 # ALL product data lives here (types + data)
│   │   └── tracking.ts                 # fireTrackingEvent() utility + types
│   ├── layouts/
│   │   └── LandingLayout.astro         # Base layout: SEO, tracking, UTM capture
│   ├── components/
│   │   ├── react/                      # Interactive React islands
│   │   │   ├── CTAButton.tsx           # Animated buy button + tracking
│   │   │   ├── CountdownTimer.tsx      # Urgency countdown (evergreen/fixed)
│   │   │   ├── SocialProof.tsx         # Fake "recent purchase" notifications
│   │   │   ├── TestimonialCarousel.tsx  # Testimonial slider
│   │   │   ├── PricingCard.tsx         # Price card with discount display
│   │   │   ├── FAQAccordion.tsx        # Expandable FAQ
│   │   │   ├── ExitIntentModal.tsx     # Desktop exit-intent popup
│   │   │   ├── FloatingCTA.tsx         # Mobile sticky buy button
│   │   │   └── VideoPlayer.tsx         # YouTube/Vimeo VSL player
│   │   ├── astro/                      # Static Astro components
│   │   │   ├── HeroSection.astro
│   │   │   ├── BenefitsGrid.astro
│   │   │   ├── GuaranteeSection.astro
│   │   │   ├── BonusSection.astro
│   │   │   └── Footer.astro
│   │   └── tracking/                   # Tracking pixel scripts
│   │       ├── FacebookPixel.astro
│   │       ├── GoogleTagManager.astro
│   │       ├── GoogleAnalytics.astro
│   │       └── HotmartPixel.astro
│   ├── pages/
│   │   ├── index.astro                 # Internal dashboard (noindex)
│   │   └── [product-slug]/
│   │       └── index.astro             # Product landing page
│   ├── styles/
│   │   ├── global.css                  # Tailwind v4 import + theme
│   │   └── animations.css              # Reusable CSS animations
│   └── utils/
│       ├── hotmart.ts                  # buildAffiliateLink() with UTM injection
│       └── utm.ts                      # captureUtmParams() / getUtmParams()
├── public/assets/[product-slug]/       # Product-specific images
├── designs/[product-slug]/             # Stitch design exports (reference)
├── docs/PRODUCT-BRIEFS/                # Product briefs per product
└── .claude/skills/                     # 4 custom Claude skills
```

---

## 5. PRODUCT DATA MODEL

All product data lives in `src/config/products.ts`. This is the ONLY place to add/edit product info:

```typescript
interface HotmartProduct {
  slug: string;              // URL path
  name: string;
  headline: string;          // Main H1
  subheadline: string;
  description: string;
  affiliateLink: string;     // Hotmart pay link with affiliate params
  originalPrice: number;     // Crossed-out price
  currentPrice: number;
  currency: string;          // "BRL", "USD", etc.
  guaranteeDays: number;
  vslVideoUrl?: string;
  benefits: string[];
  bonuses: Bonus[];          // { name, description, value? }
  testimonials: Testimonial[]; // { name, avatar?, text, rating?, location? }
  faqs: FAQ[];               // { question, answer }
  colors: { primary, secondary, accent, background };
  tracking: { facebookPixelId?, googleAnalyticsId?, gtmId?, hotmartPixelId? };
  seo: { title, description, ogImage };
  countdown?: { enabled, endDate?, evergreen?, hours? };
  status?: 'active' | 'paused' | 'draft';
  launchDate?: string;
  notes?: string;
  externalLinks?: { hotmartDashboard?, facebookAdsManager?, googleAnalyticsDashboard? };
}
```

---

## 6. TRACKING SYSTEM

### Automatic (via LandingLayout)
- UTM params captured on page load → stored in sessionStorage
- All configured pixels load automatically based on product tracking IDs
- UTMs injected into affiliate links via `buildAffiliateLink()`

### Events
| Event | Trigger | Fired By |
|---|---|---|
| PageView | Page load | Facebook Pixel (auto), GA4 (auto) |
| ViewContent | 50% scroll | Custom script in landing page |
| InitiateCheckout | CTA click | CTAButton.tsx (built-in) |
| Lead | Form interaction | Custom (if applicable) |
| AddToCart | Price modal shown | Custom |

### UTM Flow
```
Ad URL ?utm_source=facebook&utm_medium=cpc&utm_campaign=launch
  → captureUtmParams() saves to sessionStorage
  → buildAffiliateLink() appends UTMs to Hotmart pay link
  → Hotmart receives UTMs for attribution
```

---

## 7. WORKFLOW

### Creating a New Landing Page
1. Add product data to `src/config/products.ts`
2. Create `src/pages/[slug]/index.astro` using existing components
3. Save design reference in `designs/[slug]/`
4. Save product brief in `docs/PRODUCT-BRIEFS/[slug].md`
5. Place assets in `public/assets/[slug]/`
6. Run `npm run build` to verify
7. Deploy to Vercel

### Design Implementation (from Google Stitch)
- Stitch designs are visual references ONLY — do NOT copy Stitch code
- Map design elements to existing components (CTAButton, PricingCard, etc.)
- Extract colors → set in product's `colors` config
- Always implement mobile-first
- Always add: FloatingCTA, ExitIntentModal, SocialProof, tracking (even if not in design)

---

## 8. RULES FOR AI AGENTS

1. **NEVER break affiliate links** — they are the revenue source
2. **ALWAYS use existing components** — do not create new ones unless absolutely necessary
3. **ALWAYS mobile-first** — 70%+ traffic is mobile
4. **Product data goes in products.ts ONLY** — never hardcode product info in pages
5. **React components need hydration directives** — `client:visible` or `client:idle`
6. **Tailwind v4 via Vite plugin** — do NOT use `@astrojs/tailwind`
7. **Static output** — no server-side rendering, no API routes
8. **All 4 tracking pixels must be configured** for every product
9. **index.astro is internal** — has `noindex` meta, not for public use
10. **Performance > Aesthetics** — Lighthouse mobile > 90 is mandatory

---

## 9. AVAILABLE CUSTOM SKILLS

Located in `.claude/skills/`:

| Skill | Use When |
|---|---|
| `hotmart-landing-builder` | Creating a new landing page from scratch |
| `conversion-optimizer` | Improving conversion rate of existing landing |
| `stitch-to-astro` | Converting a Stitch design to Astro components |
| `tracking-integrator` | Setting up or debugging tracking pixels |

---

## 10. PROJECT STATUS

| Phase | Status | Description |
|---|---|---|
| 1. Project structure | DONE | Astro project, dependencies, config |
| 2. Base components | DONE | All React + Astro + tracking components |
| 3. Landing content | IN PROGRESS | TVT landing built, more products pending |
| 4. Custom skills | DONE | 4 skills in .claude/skills/ |
| 5. First real landing | DONE (draft) | TVT landing complete, needs tracking IDs |

### Current State
- 1 product configured: `te-vas-a-transformar` (Método TVT)
- All components built and ready
- Build passes successfully (2 pages: dashboard + TVT landing)
- Internal dashboard built (shows TVT product with draft status)
- TVT landing page: COMPLETE (draft, no tracking IDs yet)

### Product: Te Vas a Transformar (Método TVT)
- **Slug**: `te-vas-a-transformar`
- **Affiliate Link**: `https://go.hotmart.com/B104856016O`
- **Price**: $30 USD (was $444 — 93% off)
- **Theme**: Dark (#0a0a0a bg, #833cf6 purple, #22C55E green CTAs)
- **Font**: Space Grotesk (Google Fonts)
- **Countdown**: Evergreen 2hr timer
- **Tracking**: Not configured yet (needs FB Pixel, GA4, GTM, Hotmart Pixel IDs)
- **Page file**: `src/pages/te-vas-a-transformar/index.astro`
- **Sections**: Hero, Pain Points, Solution Reveal, What's Included (11 items), Pricing, Countdown, Testimonials, Guarantee, Final CTA, FAQ, Footer + overlays (SocialProof, FloatingCTA, ExitIntentModal)

---

## 11. COMMANDS

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build static site → dist/
npm run preview    # Preview built site locally
```

---

## 12. FUTURE ROADMAP (not yet implemented)

- Switch to `output: 'hybrid'` for server-side dashboard features
- Hotmart API integration for sales data
- Google Analytics API for traffic data in dashboard
- A/B testing system
- Authentication for admin dashboard
- ROI tracking per product
