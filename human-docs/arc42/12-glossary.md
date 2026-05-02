# 12. Glossary

| Term | Definition |
|------|------------|
| **Character** | A person, creature, entity, or any named individual tracked in the system. Minimum requirement: at least one identifier (name, nickname, tag). |
| **Relation** | A directed or undirected edge between two characters describing how they are connected. |
| **Directed relation** | A relation with meaningful source and target — order matters. Example: "A loves B" ≠ "B loves A". |
| **Undirected relation** | A symmetric relation where order is irrelevant. Example: "A and B are friends" = "B and A are friends". |
| **Self-relation** | A relation where source and target are the same character. Valid in the domain (e.g. self-marriage). Renders as a loop in the graph. |
| **Binary edge** | A relation stored as a single source→target pair. The atomic unit of the relation model. See ADR-002. |
| **Full graph** | The read-only visualisation of all characters and their relations. May contain 2000+ nodes. |
| **Subgraph** | A filtered view of the graph centred on a character or group. Editable (~50 nodes). |
| **Cycle / triangle** | A graph pattern where A→B→C→A. Detectable via traversal algorithm, not stored as a separate entity. See ADR-002. |
| **Custom attribute** | A user-defined key-value field on a character, enabling domain-specific data without schema changes. |
| **Tag** | A label applied to a character for categorisation and filtering. |
| **Project** | A named collection of characters and relations (e.g. one novel, one campaign). Multi-project support is post-MVP. |
| **Display name** | The rendered name of a character, assembled from the `names[]` list sorted by `display_priority`. Falls back to `[Unnamed Person #id]` if no names exist. |
