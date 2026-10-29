# `src/lib/` — Helpers & utilities

## Files

### `cn.ts` ✅
Class-name helper combining `clsx` and `tailwind-merge`:

```ts
import { cn } from '../../lib/cn';
cn('p-2', condition && 'bg-blue-500', 'p-4'); // dedupes/merges Tailwind classes
```

Used across auth screens and several components.

### Placeholders (empty — intended future architecture)
- `axios.ts` — intended central Axios instance with a request interceptor that attaches the Bearer token from `authStore`. Currently empty; the app makes **no real HTTP calls**.
- `queryClient.ts` — intended TanStack React Query `QueryClient`. Currently empty (React Query is not installed).
- `utils.ts` — intended general-purpose helpers (formatters, etc.). Currently empty.
