# ADR-001: Cytoscape.js for Graph Visualization

## Context
The app requires two graph modes: a full read-only overview (2000+ nodes) and an
editable subgraph view (~50 nodes). The library must handle both without requiring
two separate integrations. Performance at scale and interactive editing are in tension —
libraries optimized for one tend to sacrifice the other.

## Decision
We will use Cytoscape.js as the sole graph visualization library.

## Status
Accepted

## Alternatives considered
- **Sigma.js** — better raw performance via WebGL, but poor editing UX and smaller ecosystem
- **D3.js force** — maximum flexibility, but requires building all editing interactions manually
- **Svelte Flow** — good editing UX and native Svelte support, but DOM-based and unusable at 2k+ nodes
- **Graphviz** — stable and well-known, but static only with no interactivity

## Consequences
- Full graph (2k+ nodes) rendered read-only; labels hidden at low zoom levels
- Subgraph (~50 nodes) rendered as editable view using the same Cytoscape instance
- One library covers both modes, reducing dependency surface
- Bundle size is larger than lighter alternatives (e.g. Sigma.js)
