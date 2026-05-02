# 3. Context and Scope

## System Context

```text
┌─────────────────────────────────────┐
│              User                   │
│  (browser — desktop only for MVP)   │
└────────────────┬────────────────────┘
                 │ HTTP
┌────────────────▼────────────────────┐
│         Character Relationships     │
│           (SvelteKit app)           │
└────────────────┬────────────────────┘
                 │ SQL
┌────────────────▼────────────────────┐
│           PostgreSQL DB             │
└─────────────────────────────────────┘
```

No external APIs, no auth provider, no file storage for MVP.

---

## Personas

### Anna — Novelist

**Role:** Writes fantasy novels, currently working on a trilogy.
**Goal:** Track 80+ characters across three books with complex relationship webs.
**Frustration:** Loses track of who knows what about whom, especially across time skips.

### Marek — RPG Game Master

**Role:** Designs tabletop RPG campaigns with political intrigue.
**Goal:** Map NPC factions, loyalties, and rivalries so players' actions have coherent consequences.
**Frustration:** Existing tools are either too simple (no relationship types) or too complex (full TTRPG systems).

### Celina — Worldbuilder

**Role:** Builds a detailed sci-fi universe as a creative hobby.
**Goal:** Document species, factions, and key individuals and how they connect historically.
**Frustration:** Spreadsheets fall apart once relationships get non-linear.

---

## User Stories

### Characters
- As Anna, I want to add a character with just a nickname so that I can capture a character before knowing their full name.
- As Celina, I want to add custom attributes to a character so that I can track domain-specific fields (e.g. "home planet").
- As Marek, I want to tag characters so that I can filter the graph by faction.

### Relations
- As Anna, I want to mark a relation as one-way so that unrequited love renders differently from mutual friendship.
- As Marek, I want to add multiple relations between two characters so that two NPCs can be both allies and rivals.
- As Celina, I want the graph to prevent duplicate undirected relations so that I don't accidentally store "friends" twice.

### Graph
- As Anna, I want to see a full overview graph of all characters so that I can spot isolated characters or unexpected clusters.
- As Marek, I want to zoom into a subgraph around one NPC so that I can focus on their immediate relationships and edit them.
