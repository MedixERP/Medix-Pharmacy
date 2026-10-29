# `src/hooks/` — Custom hooks

## Files

### `useAuth.ts`
Thin convenience wrapper over `authStore`. Returns `{ user, isAuthenticated, login, logout }`. Use this in components instead of importing `authStore` directly.

```ts
const { user, isAuthenticated, logout } = useAuth();
```

### Placeholders (empty — not yet implemented)
These files exist but have no content. They are intended utility hooks:

- `useDebounce.ts` — debounce a fast-changing value (e.g. a search input).
- `useLocalStorage.ts` — sync a piece of state with `localStorage`.
- `useMediaQuery.ts` — subscribe to a CSS media query for responsive logic.
