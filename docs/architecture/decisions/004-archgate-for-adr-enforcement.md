---
status: proposed
date: 2026-04-25
---

# ADR-004: Archgate CLI for ADR Enforcement

## Context and Problem Statement

ADRs currently exist as markdown files only — nothing enforces them in code or CI.
A decision documented but not checked is a decision that will eventually be violated
silently. Archgate turns ADRs into executable rules that run in pre-commit hooks and CI,
and exposes them to AI coding agents before they write code.

## Decision Drivers

* ADRs must not stay as passive documentation
* Architectural drift should be caught before merge, not in code review
* Claude Code should have direct access to ADRs when editing schema or graph code

## Considered Options

* Archgate CLI
* adr-tools (npryce/adr-tools)
* Plain markdown, no tooling

## Decision Outcome

Chosen option: **Archgate CLI**, because it is the only option that enforces ADRs
as executable rules and integrates with AI agents out of the box.

### Consequences

* Good, because violations caught automatically in pre-commit and CI
* Good, because AI agents read ADRs before writing code — fewer regressions
* Good, because free and open source
* Bad, because each ADR needs a companion `.rules.ts` file to actually enforce anything
* Neutral, because ADRs move from `docs/decisions/` to `.archgate/adrs/`

### Confirmation

`archgate check` exits with code 1 when a rule is violated. CI pipeline blocks merge
on violation. Claude Code reads ADRs via Archgate MCP before editing schema files.

## Pros and Cons of the Options

### Archgate CLI

* Good, because ADRs become executable — not just documentation
* Good, because MCP integration gives AI agents live ADR context
* Good, because CI enforcement prevents architectural drift
* Bad, because requires writing `.rules.ts` per ADR to get enforcement value
* Bad, because ADR location changes — migration needed

### adr-tools (npryce/adr-tools)

* Good, because mature, simple CLI for creating and linking ADRs
* Bad, because documentation only — no enforcement, no AI integration

### Plain markdown, no tooling

* Good, because zero setup cost
* Bad, because nothing enforces decisions — drift guaranteed over time
