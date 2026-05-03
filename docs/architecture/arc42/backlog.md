# Backlog — Feature Ideas

Unscheduled ideas. Not yet decided, not yet prioritised.
See [01-introduction-goals.md](01-introduction-goals.md) for project goals context.

---

## Auto-typography in writing editor

**Context:** If a prose/novel writing area is added, raw keyboard input produces
typographically incorrect characters. Rules differ between writing styles/languages.

**Idea:** Automatically correct punctuation on input, adapatable per project writing style.

### Dashes

| Character | Unicode | Polish use | English use |
|-----------|---------|------------|-------------|
| Hyphen `-` | U+002D | Compound words: `biało-czerwony` | Compound words: `well-known` |
| En dash `–` | U+2013 | Sentence dash: ` – ` between clauses | Ranges: `2020–2026` |
| Em dash `—` | U+2014 | Dialogue line start: `— Chodź tu.` | Sentence break — like this |

### Quotation marks

| Style | Opening | Closing | Example |
|-------|---------|---------|---------|
| Polish | „ (U+201E) | " (U+201C) | „Chodź tu" |
| English | " (U+201C) | " (U+201D) | "Come here" |
| French/alternative | « (U+00AB) | » (U+00BB) | «Viens ici» |
| Inner Polish | ‚ (U+201A) | ' (U+2018) | „powiedział ‚tak'" |

### Open questions

- Trigger: on space after `-`? on `"` keypress? live as-you-type?
- Style set per project or per writing field?
- Opt-out toggle per field?
