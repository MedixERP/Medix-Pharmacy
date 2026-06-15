# `src/components/` — Reusable components

Organized into three layers: `layout/` (app shell + route guards), `shared/` (cross-role widgets), and `ui/` (atomic primitives).

---

## `layout/` — App shell & guards (all implemented ✅)

| File | Purpose |
| :--- | :--- |
| `AppLayout.tsx` | Authenticated shell: top `Navbar` + responsive `Sidebar` + `<Outlet/>`. Holds the mobile sidebar open/close state. |
| `Navbar.tsx` | Top bar: hamburger (mobile), global search (writes to `searchStore`), notifications, user menu. |
| `Sidebar.tsx` | Role-aware navigation. Builds its menu from `currentRole` (`PHARMACIST` → pharmacist items, otherwise supplier items). Collapses to icons on `md`, full width on `lg`, and slides in as an overlay on mobile. |
| `ProtectedRoute.tsx` | Redirects unauthenticated users to `/login`; otherwise renders `<Outlet/>`. |
| `RoleGuard.tsx` | Takes `allowedRoles`; normalizes case and, on mismatch, redirects the user to their own dashboard instead of crashing. |

---

## `shared/` — Cross-role widgets

| File | Status | Purpose |
| :--- | :--- | :--- |
| `SEOHead.tsx` | ✅ Implemented | Side-effect component (renders `null`) that sets `document.title` and the meta description. |
| `ConfidenceScore.tsx` | 🔴 Empty | Intended: confidence badge for AI Rx scanning. |
| `DrugCard.tsx` | 🔴 Empty | Intended: drug summary card. |
| `ExpiryBadge.tsx` | 🔴 Empty | Intended: colored badge for expiry windows (3m / 1m / 1w). |
| `InteractionAlert.tsx` | 🔴 Empty | Intended: drug-interaction warning. |
| `SearchBar.tsx` | 🔴 Empty | Intended: reusable search input. |
| `StockIndicator.tsx` | 🔴 Empty | Intended: in/low/out-of-stock indicator. |

---

## `ui/` — Atomic primitives

| File | Status | Purpose |
| :--- | :--- | :--- |
| `StatCard.tsx` | ✅ Implemented | `StatCard` — label/value/sub-text stat tile with optional icon (glassmorphism). |
| `FormElements.tsx` | ✅ Implemented | `FormInput` and `FormSelect` styled form controls (used in supplier add/edit product). |
| `Alert.tsx` | 🔴 Empty | Intended primitive. |
| `Badge.tsx` | 🔴 Empty | Intended primitive. |
| `Card.tsx` | 🔴 Empty | Intended primitive. |
| `Input.tsx` | 🔴 Empty | Intended primitive. |
| `Modal.tsx` | 🔴 Empty | Intended primitive. |
| `Spinner.tsx` | 🔴 Empty | Intended primitive. |
| `Table.tsx` | 🔴 Empty | Intended primitive. |

> Many primitives are empty because pages currently inline their own Tailwind markup instead of consuming a shared component library.
