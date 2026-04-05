# Coding Conventions

General code conventions for this project.

---

## Naming

- Names should be **short but unambiguous** — `getUserByEmail` not `getUserByEmailAddress`
- Boolean variables use `is`/`has` prefix when no clearer alternative exists (`isActive`, `hasPermission`)
- Acronyms are written in uppercase (`getUserID`, not `getUserId`)

---

## Functions & Methods

- A function does **one thing**; multiple logical steps tied to the same task are acceptable
- **Single return** — one exit point per function
- No line-count limit — length is not a quality metric

---

## Comments

- Comment **why**, not **what** — the name tells you what, the comment explains intent and decisions
- Commenting *what* is a last resort (e.g. non-obvious algorithm)
- `TODO` and `FIXME` are allowed as temporary markers
- All public API must have **TSDoc headers** (`/** ... */`) — documentation is generated from them

```ts
/**
 * Calculates discount for the given user.
 * Trial period is treated as premium for the first 30 days.
 * @param user - user to evaluate
 * @returns discount value between 0 and 1
 */
function getDiscount(user: User): number { ... }
```

---

## Error Handling

- **Result pattern** for application logic and operations that may fail:
  ```ts
  function validate(input: string): { data: number | null; error: string | null }
  ```
- Exceptions are caught **only at external boundaries** (database, network, third-party libs) and wrapped into Result
- We do not throw exceptions inside application logic

---

## Tests

- **TDD** as the default approach — flexible, not dogmatic
- Test only the **public API** of a class/module, never private methods
- Naming convention: `given [state] when [action] then [expected result]`
- Cover happy path **and** edge cases

---

## Dependencies

- **Dependency Injection** — classes receive dependencies from outside, never create them internally
  ```ts
  // correct
  class OrderService {
      constructor(private db: Database) {}
  }
  ```
- Import order: **external libraries first**, then internal modules
- Use **absolute paths** (aliases), not relative ones
  ```ts
  import { UserService } from '@app/user/user.service';  // correct
  import { UserService } from '../../user/user.service'; // avoid
  ```

---

## File Structure

Feature-based layout — each feature owns all its files:

```
src/
  user/
    user.model.ts
    user.service.ts
    user.controller.ts
  order/
    order.model.ts
    order.service.ts
  shared/
    result.type.ts
    ...
```

Shared types and utilities go into `shared/`.

---

## Logging

> **TODO: research** — porównać `winston` vs `pino` pod kątem przechowywania i przeszukiwania logów. Sekcja do uzupełnienia po rozeznaniu.

Na razie:
- Logujemy tylko błędy (`error`)
- Narzędzie: `console.error`

---

## Types & Enums

- `interface` for object/class shapes; `type` for unions, aliases, and complex types:
  ```ts
  interface User { name: string; }
  type Status = "active" | "inactive";
  type AdminUser = User & { role: string };
  ```

- Use `const enum` instead of `enum` — compiler inlines values directly, no runtime object generated:
  ```ts
  // avoid
  enum Direction { Up, Down }

  // prefer — zero runtime overhead
  const enum Direction { Up, Down }
  ```
  > Note: `const enum` does not work with Babel or esbuild. If you switch to one of these, migrate to regular `enum` or `const object`.

- Generic type parameters: use descriptive names (`TItem`, `TValue`, `TResult`) — single letters only when the context is obvious and there is just one parameter

---

## Formatting

Enforced by Prettier. Config (`.prettierrc`):

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true
}
```

---

## Pull Requests

Every PR requires a description using the following template:

```markdown
## What
<!-- What was changed -->

## Why
<!-- Why this change was needed -->

## How to test
<!-- Steps to verify the change works -->

## Screenshots
<!-- Optional: UI changes -->

## Breaking changes
<!-- Optional: anything that breaks existing behaviour -->
```

First three sections are mandatory. Last two are optional.

---

## Git Workflow

**GitHub Flow** — `main` is always deployable, every change goes through a feature branch + PR.

Branch naming:
- `feature/short-description` — new functionality
- `fix/short-description` — bug fix
- `chore/short-description` — maintenance, dependencies, config

Rules:
- Never commit directly to `main`
- Branch lives as long as needed — merge via PR when ready
- Delete branch after merge

---

## Commits

- Format: **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:` etc.)
- Language: **English**
- Single change → one-liner:
  ```
  feat: add user discount calculation
  ```
- Multiple changes → with body:
  ```
  feat: add user discount calculation

  Trial users treated as premium for first 30 days.
  Affects checkout flow and invoice generation.
  ```
