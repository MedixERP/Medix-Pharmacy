# `src/store/` — Global state (Zustand)

Lightweight global stores. Each file creates a store with `create()` from `zustand`.

## Files

### `authStore.ts`
The core auth store, wrapped with the `persist` middleware (saved to localStorage under the key `medix-auth-storage`).

- **State:** `user: User | null`, `isAuthenticated: boolean`, `token: string | null`
- **`User`** shape: `{ id, name, email, role }` where `role` is one of `ADMIN | PHARMACIST | PATIENT | SUPPLIER`
- **Actions:** `login(user, token)` and `logout()`

Consumed app-wide via the `useAuth()` hook and directly in `Login.tsx` (`authStore.getState().login(...)`).

### `notificationStore.ts`
In-memory store of supplier notifications.

- **State:** `notifications: NotificationItem[]` (seeded with sample items)
- **`NotificationItem`** shape: `{ id, type, title, desc, time, unread, actionLabel?, icon, color }`
- **Actions:** `markAsRead(id)`, `markAllAsRead()`

> ⚠️ **Bug:** the seed data has malformed emoji strings, e.g. `icon: '🔔, color: 'border-l-emerald-500'` (missing the closing quote after the emoji). This should be fixed to `icon: '🔔', color: 'border-l-emerald-500'`.

### `searchStore.ts`
Tiny store holding the global search query string.

- **State:** `searchQuery: string`
- **Actions:** `setSearchQuery(query)`, `clearSearch()`

Used by the `Navbar` (input) and the supplier `Dashboard` (to filter orders).

### `cartStore.ts`
**Empty placeholder.** Intended to hold the point-of-sale cart for the pharmacist checkout flow.
