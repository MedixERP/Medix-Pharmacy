# `src/routes/` — Routing

Centralizes every route path and the route tree for the app.

## Files

### `routes.ts`
Exports the `ROUTES` constant — a single source of truth for all path strings, grouped by role:

- `HOME`, `LOGIN`, `REGISTER`, `UNAUTHORIZED` (public)
- `ROUTES.ADMIN.*` — dashboard, users, drugs, suppliers, orders, expiry, customers, reports, inventory
- `ROUTES.PHARMACIST.*` — dashboard, scan prescription, drug search, alternatives, interactions
- `ROUTES.SUPPLIER.*` — dashboard, incoming orders
- `ROUTES.PATIENT.*` — profile, prescription history, chronic meds

> Use `ROUTES.*` instead of hardcoding strings when adding `<Link>`/`navigate()` calls.

### `index.tsx`
The `<AppRoutes/>` component. Responsibilities:

- **Lazy loading** — every page is imported with `React.lazy()` and rendered inside a single `<Suspense>` boundary with a spinner fallback.
- **Public routes** — `/` (landing), `/login`, `/register`.
- **`RootRedirect`** — currently always renders the `LandingPage` (the earlier auto-redirect logic is disabled).
- **Protected routes** — wrapped in `<ProtectedRoute/>`, then split by `<RoleGuard allowedRoles={...}/>` and rendered inside `<AppLayout/>`:
  - **Supplier** group → fully wired pages (dashboard, pharmacies, drugs, add/edit product, analytics, settings, orders, profile, notifications).
  - **Pharmacist** group → dashboard + drugs; "drug search" / "alternatives" use a local `PlaceholderPage`.
  - **Admin** group → all `PlaceholderPage` for now.
- **Fallback** — `/unauthorized` redirects to login; `*` renders `NotFound`.

`PlaceholderPage` is a small inline component used for screens that aren't built yet but should still render inside the layout.

## Status / notes
- **Patient routes are defined in `routes.ts` but are NOT mounted** in `index.tsx` (the patient pages are empty).
- The root-level [`approut.tsx`](../../approut.tsx) is a stale duplicate of this file and is not used.
