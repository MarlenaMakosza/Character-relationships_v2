# Tooling guide

Quick reference for all linting and documentation tools in this project.

---



## Architecture enforcement

### Archgate — `.archgate/`

Enforces architectural decisions (ADRs) with code checks. Rules live alongside their ADR:

| Rule file | ADR | What it checks |
|---|---|---|
| `ARCH-002-test.rules.ts` | ARCH-002 | No `console.error` — use `logError()` instead |
| `ARCH-003-layered-architecture.rules.ts` | ARCH-003 | Routes must not import repositories or services directly — only controllers |

Config files: `.archgate/adrs/*.md` (decision) + `.archgate/adrs/*.rules.ts` (check logic).

```bash
npm run check:adrs    # run all archgate rules
```

Runs automatically on `git commit` via Husky `pre-commit` hook.

---

## Documentation

### TypeDoc — `typedoc.public.json`, `typedoc.internal.json`

Generates API reference from JSDoc comments in `src/`.

| Config | `@internal` symbols | Output |
|---|---|---|
| `typedoc.public.json` | excluded | `docs/api_docs/public` |
| `typedoc.internal.json` | included | `docs/api_docs/internal` |

```bash
npm run docs:api                          # generate both
npx http-server docs/api_docs/public      # preview public
npx http-server docs/api_docs/internal      # preview internal
```

Not committed — if you want just generate it.

### VitePress — `.vitepress/config.ts`

Renders the `docs/` folder (arc42, ADRs) as a navigable website.

```bash
npm run docs:dev      # dev server with hot reload
npm run docs:build    # build static site
npm run docs:preview  # preview the build
```

---

## Linting & formatting

### ESLint — `eslint.config.js`

The big one. Covers TypeScript, Svelte, JSON, HTML, and Markdown files.
Runs a large plugin stack — highlights:

| Plugin | What it catches |
|---|---|
| `typescript-eslint` | TS-specific rules, type-aware checks |
| `eslint-plugin-svelte` | Svelte component rules |
| `eslint-plugin-import-x` | import order, missing modules, no cycles |
| `eslint-plugin-unicorn` | opinionated best practices (prefer `includes`, etc.) |
| `eslint-plugin-sonarjs` | code smell detection (duplicates, complexity) |
| `eslint-plugin-functional` | nudges toward immutability |
| `eslint-plugin-security` | catches common security patterns |
| `eslint-plugin-perfectionist` | enforces consistent sorting (imports, keys) |
| `@cspell/eslint-plugin` | spell checking inline in ESLint |

```bash
npm run lint          # check
npm run lint:fix      # autofix
```

### Prettier — `.prettierrc`

Formats TypeScript, Svelte, CSS. Runs after ESLint fix.

```bash
npm run format
```

Run both at once:

```bash
npm run autofix       # lint:fix + format
```

### svelte-check + tsc

Type checking — svelte-check covers `.svelte` files, `tsc` covers the rest.

```bash
npm run check         # svelte-check
npm run ts-check      # tsc
```

### cspell — `cspell.json`, `.cspell/custom-words.txt`

Spell checker across all source files. Custom words whitelist in `.cspell/custom-words.txt`.
Runs automatically on staged files via lint-staged.

```bash
npm run spellcheck
```

### commitlint — `commitlint.config.js`

Enforces [Conventional Commits](https://www.conventionalcommits.org/) format on every commit message.
Runs automatically via Husky `commit-msg` hook.

Use the interactive commit helper instead of writing messages manually:

```bash
npm run commit        # commitizen CLI
```
