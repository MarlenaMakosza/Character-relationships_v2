---
status: accepted
date: 2026-05-03
---

# ADR-008: GitHub Actions for API Docs CI

## Context and Problem Statement

TypeDoc API reference (`docs/api_docs/public`) should be generated and deployed
automatically on push to `main`, not committed to the repository manually.
A CI pipeline is needed to trigger generation and publish to GitHub Pages.

## Decision Drivers

* Zero additional setup cost — repository already hosted on GitHub
* Must deploy to GitHub Pages
* Should trigger only on relevant file changes (`src/`, `typedoc.public.json`)

## Considered Options

* GitHub Actions
* Other CI providers (GitLab CI, Forgejo Actions, Woodpecker CI)

## Decision Outcome

Chosen option: **GitHub Actions**, because it requires no external service configuration
for a GitHub-hosted repository. Accepted as a pragmatic default, not a permanent choice.

### Consequences

* Good, because no external service to configure or authenticate
* Good, because GitHub Pages deployment uses official actions with built-in permissions
* Bad, because vendor lock-in to GitHub — if repository moves, pipeline must be rewritten
* Neutral, because workflow syntax (YAML) is portable in concept but not in practice

### Open for revision

GitHub Actions is a convenience choice. If the repository migrates away from GitHub
(e.g. to Forgejo or GitLab), this decision should be revisited. Woodpecker CI and
GitLab CI offer comparable pipeline capabilities without the GitHub dependency.

## Pros and Cons of the Options

### GitHub Actions

* Good, because native integration — no tokens, no webhooks, no external accounts
* Good, because `actions/deploy-pages` handles GitHub Pages permissions cleanly
* Bad, because GitHub reliability and pricing are subject to change
* Bad, because tight coupling to GitHub ecosystem

### Other CI providers

* Good, because provider-independent — easier to migrate hosting
* Good, because some (Woodpecker, Forgejo Actions) are self-hostable
* Bad, because require additional setup and credentials for GitHub Pages deployment
* Bad, because adds operational complexity for a project currently on GitHub
