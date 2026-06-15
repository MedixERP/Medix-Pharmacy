# `src/pages/` — Role-scoped screens

Screens grouped by role. Most pages are **presentational and driven by hardcoded mock data** (`initial*` arrays) with local `useState`; they are structured to be easy to wire to the real API later.

---

## `auth/`

| File | Status | Purpose |
| :--- | :--- | :--- |
| `Login.tsx` | ✅ UI + mocked auth | Email/password form (framer-motion). Validates against **4 hardcoded accounts**, calls `authStore.login(...)`, then redirects by role. |
| `Register.tsx` | ✅ UI only | Pharmacy registration form (pharmacy name, manager, email, phone, password) + social buttons. On submit it only `console.log`s the data and redirects to `/login` (no backend). |
| `NotFound.tsx` | ✅ Implemented | 404 fallback page for unmatched routes. |

Demo accounts (see also the root README):

| Role | Email | Password |
| :--- | :--- | :--- |
| Pharmacist | `pharmacist@medix.com` | `Pharmacist@2026` |
| Supplier | `supplier@medix.com` | `Supplier@2026` |
| Admin | `admin@medix.com` | `Admin@2026` |
| Patient | `patient@medix.com` | `Patient@2026` |

---

## `supplier/` — most complete area ✅

All pages use mock data and render inside `AppLayout`. Many use `SEOHead` for per-page titles.

| File | Purpose |
| :--- | :--- |
| `Dashboard.tsx` | Incoming purchase orders with status workflow (New → In Progress → Shipped), detail modal, pagination, and search (via `searchStore`). |
| `IncomingOrders.tsx` | Dedicated incoming-orders management screen. |
| `Drugs.tsx` | Product catalog with tabs (All / Available / Out of Stock), search, and delete confirmation. |
| `AddProduct.tsx` | Create-product form (uses `FormInput`/`FormSelect`, image upload via a file input ref). |
| `EditProduct.tsx` | Edit-product form; reads `:id` from the route params, pre-filled with mock values. |
| `Pharmacies.tsx` | List of partner pharmacies with filter/search and a detail modal. |
| `Reports.tsx` | Analytics dashboard with `recharts` (area/bar/pie) + `StatCard`s. |
| `Settings.tsx` | Inline-editable company profile/contact settings. |
| `CompanyProfile.tsx` | Company profile view/edit with avatar upload. |
| `Notifications.tsx` | Notifications screen — **this is the one mounted** at `/supplier/notifications`. |
| `NotificationsPage.tsx` | ⚠️ A second notifications screen that is **not referenced by the router** (the route imports `Notifications.tsx`). Likely a duplicate. |

---

## `pharmacist/` — partial 🟡

| File | Status | Purpose |
| :--- | :--- | :--- |
| `Dashboard.tsx` | ✅ | Stat cards (inventory totals, low/out-of-stock, pending orders), inventory overview table, recent supplier orders. Mock data. |
| `Drugs.tsx` | ✅ | Drug table with status styling + an "Add Drug" button that opens `AddDrugModal`. |
| `Druglist.tsx` | ✅ | Drug list/table component (alternative list view). |
| `AddDrugModal.tsx` | ✅ | Modal form for adding a drug. |
| `DrugSearch.tsx` | 🔴 Empty | Intended drug search screen (route currently shows a `PlaceholderPage`). |
| `ScanPrescription.tsx` | 🔴 Empty | Intended AI Rx-scanning screen. |
| `PatientProfile.tsx` | 🔴 Empty | Intended patient lookup for the pharmacist. |

> Note: in the router the pharmacist "scan prescription" route currently points to the `Drugs` page, and "drug search"/"alternatives" render placeholders.

---

## `admin/` — placeholder 🔴

**Every file in this folder is empty.** The router renders a `PlaceholderPage` for each admin route. Intended screens:

`Dashboard.tsx`, `UserManagement.tsx`, `DrugManagement.tsx`, `SupplierManagement.tsx`, `PurchaseOrders.tsx`, `ExpiryTracking.tsx`, `CustomerManagement.tsx`, `Reports.tsx`, `Inventory.tsx`.

---

## `patient/` — not wired 🔴

**Every file is empty** and there are **no patient routes mounted** in `src/routes/index.tsx` (even though `ROUTES.PATIENT.*` paths are defined). Intended screens:

`Profile.tsx`, `PrescriptionHistory.tsx`, `ChronicMeds.tsx`.
