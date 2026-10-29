# `src/api/` — API layer (placeholders)

This folder is intended to hold the data-access layer that talks to the backend (via the planned Axios instance in `src/lib/axios.ts`). **Every file here is currently an empty placeholder — the app uses mocked/hardcoded data instead.**

| File | Intended responsibility |
| :--- | :--- |
| `auth.api.ts` | Login / register / token refresh / current user |
| `drugs.api.ts` | Drug CRUD, search, categories |
| `inventory.api.ts` | Stock levels, batches, expiry tracking |
| `prescription.api.ts` | Prescriptions, Rx scanning, history |
| `reports.api.ts` | Analytics / reports data |
| `supplier.api.ts` | Suppliers, purchase orders, incoming orders |

The intended HTTP contract is captured in the repo-root Postman collection: `MedixpharmacyERP.postman_collection.json`.

## How to wire one up (suggested pattern)
1. Implement `src/lib/axios.ts` (base URL + auth interceptor).
2. In each `*.api.ts`, export typed functions that call the axios instance.
3. Replace the hardcoded `initial*` arrays in the page components with calls to these functions (optionally via TanStack React Query once `lib/queryClient.ts` is set up).
