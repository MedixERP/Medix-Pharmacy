# Medix — Intelligent Pharmacy Management Ecosystem

Medix is a multi-role pharmacy management front-end built with **React 19 + TypeScript + Vite + Tailwind CSS v4**. It provides distinct dashboards and workflows for Pharmacists, Suppliers, Admins, and Patients, plus a public marketing landing page.

> **Project status:** This repository currently contains the **front-end only**. There is **no live backend**: authentication and all data are **mocked** (hardcoded sample data inside the components/stores). The `src/api/*` files exist as placeholders but are empty, ready to be wired to a real API. See [Implementation status](#-implementation-status) for an honest, per-area breakdown of what is built vs. planned.

---

## Table of contents

- [Tech stack](#-tech-stack)
- [Quick start](#-quick-start)
- [Demo login credentials](#-demo-login-credentials)
- [Project structure](#-project-structure)
- [Routing & access control](#-routing--access-control)
- [State management](#-state-management)
- [Implementation status](#-implementation-status)
- [Known issues / cleanup notes](#-known-issues--cleanup-notes)
- [Per-folder documentation](#-per-folder-documentation)

---

## 🛠 Tech stack

| Area | Library | Notes |
| :--- | :--- | :--- |
| UI framework | **React 19** + **TypeScript** | `react`, `react-dom` |
| Build tool | **Vite 8** | `npm run dev` / `npm run build` / `npm run preview` |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Global tokens + a `glass-light` utility in `src/index.css` |
| Routing | **react-router-dom v7** | Lazy-loaded routes, role guards |
| Global state | **Zustand v5** | `authStore` uses the `persist` middleware (localStorage) |
| Animation | **framer-motion** | Landing page + auth screens |
| Icons | **lucide-react**, **react-icons** | |
| Charts | **recharts** | Supplier reports / dashboards |
| Class utils | **clsx** + **tailwind-merge** | exposed via the `cn()` helper in `src/lib/cn.ts` |

> **Note:** The previous README mentioned React Query (TanStack) and an Axios client with token interceptors. Those libraries are **not** currently installed or used — `src/lib/axios.ts` and `src/lib/queryClient.ts` are empty placeholders. They are listed here as part of the intended future architecture only.

---

## 🚀 Quick start

Requirements: Node.js 18+ (Node 20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (Vite, default http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

The app opens on the **public landing page** (`/`). To enter a dashboard, go to `/login` and use one of the demo accounts below.

`vercel.json` contains an SPA rewrite (`/(.*) -> /index.html`) so the app can be deployed to Vercel as a single-page app with client-side routing.

---

## 🔑 Demo login credentials

Authentication is **mocked** in `src/pages/auth/Login.tsx`. Use these accounts to explore each role:

| Role | Email | Password |
| :--- | :--- | :--- |
| Pharmacist | `pharmacist@medix.com` | `Pharmacist@2026` |
| Supplier | `supplier@medix.com` | `Supplier@2026` |
| Admin | `admin@medix.com` | `Admin@2026` |
| Patient | `patient@medix.com` | `Patient@2026` |

On success the mock user + a fake JWT are saved to the `authStore` (persisted to localStorage under `medix-auth-storage`), and the user is redirected to their role's landing route.

---

## 📂 Project structure

```text
Medix-Pharmacy/
├── index.html                  # HTML entry, SEO/OpenGraph meta tags
├── vite.config.ts              # Vite + React + Tailwind plugins
├── vercel.json                 # SPA rewrite for Vercel
├── approut.tsx                 # ⚠️ legacy/duplicate router draft (NOT used)
├── MedixpharmacyERP.postman_collection.json  # Postman collection (intended API)
├── public/                     # Static assets (logos)
└── src/
    ├── main.tsx                # React entry, mounts <App/>
    ├── App.tsx                 # Wraps <AppRoutes/> in <BrowserRouter>
    ├── index.css               # Tailwind import + base styles + glass utility
    ├── routes/                 # Route table + route definitions  → see routes/README.md
    ├── features/landing-page/  # Public marketing site            → see features/README.md
    ├── pages/                  # Role-scoped screens               → see pages/README.md
    │   ├── auth/               #   Login / Register / NotFound
    │   ├── admin/              #   (placeholder screens — files empty)
    │   ├── pharmacist/         #   Dashboard + drug management
    │   ├── supplier/           #   Most complete area
    │   └── patient/            #   (empty — not yet wired into routing)
    ├── components/             # Reusable UI                       → see components/README.md
    │   ├── layout/             #   AppLayout, Navbar, Sidebar, guards
    │   ├── shared/             #   Cross-role widgets (mostly empty)
    │   └── ui/                 #   Atomic primitives (mostly empty)
    ├── store/                  # Zustand stores                    → see store/README.md
    ├── hooks/                  # Custom hooks                      → see hooks/README.md
    ├── api/                    # API layer (all empty placeholders)→ see api/README.md
    └── lib/                    # Helpers (cn, axios, queryClient)  → see lib/README.md
```

---

## 🧭 Routing & access control

Routing lives in [`src/routes/`](src/routes/README.md):

- `routes.ts` — central `ROUTES` constant with every path string.
- `index.tsx` — the `<AppRoutes/>` component (lazy imports + `<Suspense>`).

Two guards protect dashboards:

- **`ProtectedRoute`** — redirects unauthenticated users to `/login`.
- **`RoleGuard`** — checks `user.role` against an `allowedRoles` list; if the role doesn't match it redirects the user to *their* dashboard instead of erroring.

Authenticated dashboards render inside **`AppLayout`** (top `Navbar` + role-aware `Sidebar` + `<Outlet/>`).

---

## 🗃 State management

Zustand stores in [`src/store/`](src/store/README.md):

| Store | Purpose | Persisted? |
| :--- | :--- | :--- |
| `authStore` | Current user, token, `isAuthenticated`, `login/logout` | ✅ localStorage |
| `notificationStore` | Supplier notification list + read flags | ❌ in-memory |
| `searchStore` | Global search query (used by supplier dashboard) | ❌ in-memory |
| `cartStore` | Intended POS cart | ⚠️ **empty file** |

The `useAuth()` hook (`src/hooks/useAuth.ts`) is a thin wrapper exposing `authStore` values.

---

## ✅ Implementation status

The README's vision describes a full AI-driven ERP. Here is what is actually in the code today:

| Area | Status | Detail |
| :--- | :--- | :--- |
| Landing page | ✅ Built | Hero, Stats, Roles overview, Timeline, AI capabilities, FAQ, Footer (UI only) |
| Auth (Login/Register) | ✅ UI built, mocked | Login uses hardcoded users; Register only `console.log`s and redirects |
| Supplier dashboard | ✅ Most complete | Orders, Drugs catalog, Add/Edit product, Pharmacies, Reports (charts), Settings, Company profile, Notifications — all on mock data |
| Pharmacist | 🟡 Partial | Dashboard + drug list/table + add-drug modal exist; "Drug Search" / "Alternatives" routes render a `PlaceholderPage` |
| Admin | 🔴 Placeholder | All routes render `PlaceholderPage`; the `pages/admin/*` files are empty |
| Patient | 🔴 Not wired | `pages/patient/*` files are empty and have **no routes** defined |
| API layer | 🔴 Empty | Every `src/api/*.ts` file is a 0-byte placeholder |
| Shared/UI component library | 🟡 Partial | Only `SEOHead`, `StatCard`, `FormElements` are implemented; the rest are empty |
| AI features (Rx scan, interactions, substitutions) | 🔴 Not implemented | Described in the vision only |

Legend: ✅ done · 🟡 partial · 🔴 not implemented

---

## 🐞 Known issues / cleanup notes

These are accurate observations about the current code (kept here so contributors aren't surprised):

1. **`src/store/notificationStore.ts`** — the emoji strings are malformed, e.g. `icon: '🔔, color: 'border-l-emerald-500'`. The closing quote after the emoji is missing, which merges the emoji into the next key. This needs fixing.
2. **`approut.tsx`** (repo root) — an older, mostly-commented-out duplicate of the router. The live router is `src/routes/index.tsx`; `approut.tsx` is unused and can be removed.
3. **`src/pages/supplier/NotificationsPage.tsx`** — the route imports `Notifications.tsx` (aliased as `NotificationsPage`), so `NotificationsPage.tsx` is currently unused/duplicated.
4. **`src/index.css`** — the `.glass-light` rule has an invalid `border: 1px border rgba(...)` declaration (`border` keyword instead of a style like `solid`).
5. **Empty placeholders** — many files are intentionally empty (`api/*`, several `ui/*` and `shared/*` components, `lib/axios.ts`, `lib/queryClient.ts`, `lib/utils.ts`, several hooks, all `admin/*` and `patient/*` pages).
6. **README vs. dependencies** — React Query and Axios are documented but not installed.

---

## 📚 Per-folder documentation

Each major folder has its own README with a file-by-file breakdown:

- [`src/routes/`](src/routes/README.md) — routing table and guards
- [`src/features/`](src/features/README.md) — landing page feature module
- [`src/pages/`](src/pages/README.md) — role-scoped screens
- [`src/components/`](src/components/README.md) — layout, shared, and UI components
- [`src/store/`](src/store/README.md) — Zustand stores
- [`src/hooks/`](src/hooks/README.md) — custom hooks
- [`src/api/`](src/api/README.md) — API layer (placeholders)
- [`src/lib/`](src/lib/README.md) — helpers/utilities
