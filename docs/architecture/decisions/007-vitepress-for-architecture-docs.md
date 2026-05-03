---
status: accepted
date: 2026-05-03
---

# ADR-007: VitePress for Architecture Documentation Site

## Context and Problem Statement

Architecture documentation lives in multiple markdown files (arc42, ADRs, diagrams).
No tooling to render them as a navigable site or export to PDF. Reading raw markdown
in a file tree is acceptable for contributors but not for onboarding or sharing.

## Decision Drivers

* Should integrate with the existing Node/npm setup without additional runtimes
* Must handle multiple markdown files with sidebar navigation
* Deployable to GitHub Pages alongside TypeDoc API reference

## Considered Options

* VitePress
* MkDocs + Material theme

## Decision Outcome

Chosen option: **VitePress**, because it requires no additional runtime beyond Node
and can be added as a dev dependency to the existing `package.json`.

### Consequences

* Good, because single runtime (Node) — no Python dependency to manage
* Good, because `npm run docs:site` fits naturally next to existing scripts
* Good, because deploys to GitHub Pages the same way as TypeDoc
* Bad, because MkDocs Material theme is more mature for technical documentation
* Neutral, because PDF export requires an additional VitePress plugin if needed later

## Pros and Cons of the Options

### VitePress

* Good, because Node-based — no extra runtime
* Good, because integrates with existing `package.json` and npm scripts
* Good, because active development, Vue ecosystem
* Bad, because PDF export not built-in — needs plugin

### MkDocs + Material theme

* Good, because Material theme is the industry standard for docs-as-code aesthetics
* Good, because PDF export via `mkdocs-with-pdf` plugin works out of the box
* Bad, because requires Python — separate runtime from the rest of the project
* Bad, because adds operational overhead (virtualenv, pip) for a JS-first project
