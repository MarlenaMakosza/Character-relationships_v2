---
status: accepted
date: 2026-04-25
---

# ADR-005: arc42 for Documentation Structure

## Context and Problem Statement

Documentation was scattered across ad-hoc folders (`requirements/`, `notes/`, `tools/`,
`business/`, `db/`) with no consistent structure or clear ownership. Finding relevant
information required knowing which folder it lived in. New documentation had no obvious
home.

## Decision Drivers

* Documentation must be discoverable without prior knowledge of the folder layout
* Structure should scale as the project grows
* ADRs (section 9) were already adopted — natural fit for a broader standard

## Considered Options

* arc42 template (sections 1–12)
* C4 Model
* Custom folder structure (status quo, improved)

## Decision Outcome

Chosen option: **arc42**, because section 9 was already in use and the remaining sections
map cleanly to existing documentation needs. Not all sections are needed now — only those
with content are created.

### Consequences

* Good, because documentation has a predictable home — no guessing which folder
* Good, because arc42 is a known standard — onboarding cost is low
* Good, because unused sections (6, 7, 8, 10) can be added later without restructuring
* Bad, because existing links to old file paths break
* Neutral, because large domain catalogues (attributes, event types, relation types) live in `arc42/appendix/`

### Confirmation

`docs/` contains only `arc42/`, `decisions/`, and `diagrams/`. No ad-hoc folders remain.

## Pros and Cons of the Options

### arc42

* Good, because well-known standard with community documentation
* Good, because partial adoption is valid — use only the sections that add value
* Good, because ADR section (9) already matched what we had
* Bad, because some section names are abstract (e.g. "Building Block View") — require interpretation

### C4 Model

* Good, because diagram-first — very visual
* Bad, because focuses on diagrams, not decisions or constraints
* Bad, because doesn't cover operational concerns (risks, tech debt)

### Custom folder structure

* Good, because zero learning curve
* Bad, because no standard — every new file requires a judgement call on where it belongs
* Bad, because doesn't scale; already broke down before this decision
