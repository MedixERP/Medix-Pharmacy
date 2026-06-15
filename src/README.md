# `src/` — Application source

Entry points and the top-level layout of the React app. For the big picture, deployment, and demo credentials, see the [root README](../README.md).

## Entry files

| File | Purpose |
| :--- | :--- |
| `main.tsx` | React entry point. Mounts `<App/>` into `#root` inside `<StrictMode>` and imports global styles. |
| `App.tsx` | Wraps `<AppRoutes/>` in `<BrowserRouter>`. (The old hardcoded auto-login was removed — the app now opens on the landing page.) |
| `index.css` | Tailwind v4 import, the `Arimo` web font, base typography, and the `.glass-light` glassmorphism utility. |

## Folders

| Folder | What's inside | Docs |
| :--- | :--- | :--- |
| `routes/` | Route table (`ROUTES`) + `<AppRoutes/>` with lazy loading and guards | [routes/README.md](routes/README.md) |
| `features/` | Self-contained modules — currently the public landing page | [features/README.md](features/README.md) |
| `pages/` | Role-scoped screens (`auth`, `admin`, `pharmacist`, `supplier`, `patient`) | [pages/README.md](pages/README.md) |
| `components/` | `layout/` shell + guards, `shared/` widgets, `ui/` primitives | [components/README.md](components/README.md) |
| `store/` | Zustand stores (`auth`, `notification`, `search`, `cart`) | [store/README.md](store/README.md) |
| `hooks/` | Custom hooks (`useAuth` + placeholders) | [hooks/README.md](hooks/README.md) |
| `api/` | API layer (empty placeholders; app uses mock data) | [api/README.md](api/README.md) |
| `lib/` | Helpers (`cn` + placeholders) | [lib/README.md](lib/README.md) |

## Data flow (today)

```text
Login.tsx ──(mock check)──▶ authStore (persisted) ──▶ useAuth()
                                   │
                                   ▼
        ProtectedRoute ─▶ RoleGuard ─▶ AppLayout (Navbar + Sidebar) ─▶ page
                                   │
        page components hold hardcoded `initial*` arrays in useState
        (no network calls — see api/README.md)
```
