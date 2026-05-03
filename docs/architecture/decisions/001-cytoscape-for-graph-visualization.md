---
status: accepted
date: 2026-04-25
---

# ADR-001: Cytoscape.js for Graph Visualization

## Context and Problem Statement

The app requires two graph modes: a full read-only overview (2000+ nodes) and an editable
subgraph view (~50 nodes). Libraries optimized for large-scale rendering tend to sacrifice
editing UX, and vice versa. Using two separate libraries doubles integration cost.

## Decision Drivers

* Must render 2000+ nodes without browser freeze
* Must support interactive editing (drag nodes, add/remove edges)
* Single library preferred to reduce integration surface

## Considered Options

* Cytoscape.js
* Sigma.js
* D3.js force layout
* Svelte Flow
* Graphviz

## Decision Outcome

Chosen option: **Cytoscape.js**, because it is the only option that covers both read-only
scale and interactive editing without requiring a second library.

### Consequences

* Good, because one library handles both modes (full read-only + editable subgraph)
* Good, because large plugin ecosystem covers layouts, editing, and filtering
* Bad, because bundle size is larger than lighter alternatives (e.g. Sigma.js)
* Neutral, because labels must be hidden at low zoom levels to stay readable at 2k+ nodes

### Confirmation

Full graph renders 2000+ nodes without browser freeze. Subgraph allows node dragging
and edge creation. Both modes use a single Cytoscape instance.

## Pros and Cons of the Options

### Cytoscape.js

* Good, because covers both read-only and editing in one library
* Good, because large plugin ecosystem (layouts, editing, filtering)
* Good, because good TypeScript support
* Bad, because larger bundle size than Sigma.js

### Sigma.js

* Good, because WebGL-native — best raw performance at scale
* Bad, because poor editing UX — building interactive editing requires significant manual work
* Bad, because smaller ecosystem than Cytoscape.js

### D3.js force layout

* Good, because maximum flexibility and control
* Bad, because all editing interactions must be built manually from scratch
* Bad, because steep learning curve

### Svelte Flow

* Good, because native Svelte integration and good editing UX
* Bad, because DOM-based — unusable at 2k+ nodes

### Graphviz

* Good, because stable and well-known
* Bad, because static only — no interactivity whatsoever
