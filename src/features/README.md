# `src/features/` — Feature modules

Self-contained business/marketing modules. Currently this contains the public **landing page**.

## `landing-page/`

### `LandingPage.tsx`
Composes the public marketing page on a dark (`bg-slate-950`) theme. Renders, in order:
`Navbar → Hero → Stats → RolesOverview → TimelineSlider → AICapabilities → FAQ → Footer`.

The heavier below-the-fold sections (`TimelineSlider`, `AICapabilities`, `FAQ`) are `React.lazy()`-loaded, each wrapped in its own `<Suspense>` with a spinner fallback to keep the initial bundle small.

### `landing-page/components/`

| Component | Purpose |
| :--- | :--- |
| `Navbar.tsx` | Sticky top nav for the public site (links + login/register CTAs) |
| `Hero.tsx` | Headline hero section with animated background and CTAs |
| `Stats.tsx` | Key metrics / numbers row |
| `RolesOverview.tsx` | Cards explaining the 5 roles (Admin, Pharmacist, Supplier, Patient, Public) |
| `TimelineSlider.tsx` | Roadmap / version timeline (V1 → V2 → V3) |
| `AICapabilities.tsx` | Showcase of the planned AI features |
| `FeatureCard.tsx` | Reusable card used within the feature sections |
| `FAQ.tsx` | Expandable frequently-asked-questions list |
| `Footer.tsx` | Footer with links and branding |

All components are **presentational** (UI + framer-motion animations); they don't fetch data.
