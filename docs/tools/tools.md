## Required to run application
Node - engine
Typescript - main language
Drizzle ORM - query builder / ORM
Drizzle Kit - migrations and studio
SvelteKit - fullstack framework (backend + routing)
Svelte - frontend UI framework
postgres - PostgreSQL driver
zod - schema validation
d3-graphviz - graph visualization

## Dev / tooling
@faker-js/faker - generate fake seed data
dotenv / dotenv-expand - load env variables
rimraf - cross-platform rm -rf

## Linting / formatting
eslint + plugins:
  @typescript-eslint - TS rules
  eslint-plugin-svelte - Svelte rules
  eslint-plugin-functional - functional style rules
  eslint-plugin-unicorn - opinionated best practices
  eslint-plugin-sonarjs - code quality / complexity
  eslint-plugin-security - security rules
  eslint-plugin-import + eslint-plugin-import-alias - import order and aliases
  eslint-plugin-promise - promise rules
  eslint-plugin-perfectionist - sorting rules
  eslint-plugin-drizzle - drizzle-specific rules
  eslint-plugin-tsdoc - JSDoc/TSDoc rules
  eslint-plugin-n - Node.js rules
  @html-eslint - HTML linting
  @cspell/eslint-plugin - spellcheck in eslint
  @stylistic/eslint-plugin - stylistic formatting rules
  @vitest/eslint-plugin - vitest-specific rules
prettier + plugins:
  prettier-plugin-svelte
  prettier-plugin-organize-imports
cspell - spellchecking
skott - dependency graph analysis

## Git hooks / commits
husky - git hooks runner
lint-staged - run linters on staged files
commitlint + commitlint-plugin-function-rules - enforce conventional commits
commitizen + cz-conventional-changelog - interactive commit prompt

## Testing
vitest - unit test runner
@testing-library/svelte - component testing
@testing-library/jest-dom - DOM matchers
@testcontainers/postgresql - real PostgreSQL in tests (Docker)

## Dependency management
npm-check-updates - check for outdated deps
