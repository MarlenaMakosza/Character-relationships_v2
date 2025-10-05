# Roadmap Implementacji - Character Relationships

## Sprint 0: Setup & Infrastructure (1-2 tygodnie)
**Cel:** Podstawowa infrastruktura projektu
- [ ] Setup PostgreSQL + Docker Compose
- [ ] Konfiguracja Drizzle ORM
- [ ] Podstawowa struktura projektu SvelteKit
- [ ] Setup Zod dla walidacji
- [ ] Konfiguracja testów (Vitest)
- [ ] CI/CD podstawowe (linting, formatting)

## Sprint 1: Core Database Schema (1-2 tygodnie)
**Cel:** Zaprojektować i zaimplementować bazę danych
- [ ] Schema dla Person (podstawowe pola)
- [ ] Schema dla Name (primary + alternate names)
- [ ] Schema dla Attributes (custom key-value)
- [ ] Schema dla Tags
- [ ] Migracje Drizzle
- [ ] Seed data dla testów

## Sprint 2: Basic Character CRUD (2 tygodnie)
**Cel:** Podstawowe zarządzanie postaciami
- [ ] API endpoints: Create, Read, Update, Delete postaci
- [ ] Zod schemas dla walidacji
- [ ] Formularz dodawania postaci (podstawowe pola)
- [ ] Lista postaci (prosty widok)
- [ ] Widok szczegółów postaci
- [ ] Testy jednostkowe i integracyjne

## Sprint 3: Character Details - Names & Basic Info (1-2 tygodnie)
**Cel:** Rozszerzone informacje o postaci
- [ ] Primary Name (z wszystkimi polami: suffix, title, nickname, etc.)
- [ ] Alternate Names (lista)
- [ ] Gender selection
- [ ] Age/Birth date
- [ ] Species/Race
- [ ] UI dla edycji tych pól
- [ ] Walidacja Zod dla złożonych struktur

## Sprint 4: Character Attributes & Customization (1-2 tygodnie)
**Cel:** Custom attributes i tagi
- [ ] Custom Attributes (key-value pairs)
- [ ] Tags system
- [ ] Appearance fields (kolor włosów, oczu, etc.)
- [ ] Status, Location, Affiliation
- [ ] UI do zarządzania custom attributes
- [ ] Filtering po tagach

## Sprint 5: Relationships - Database & Core Logic (2-3 tygodnie)
**Cel:** System relacji między postaciami
- [ ] Schema dla Relationships
- [ ] Schema dla Relationship Types (predefiniowane + custom)
- [ ] Logika bidirectional/unidirectional/asymmetric
- [ ] API dla CRUD relacji
- [ ] Seed data z predefiniowanymi typami relacji
- [ ] Testy logiki relacji

## Sprint 6: Relationships - UI (2 tygodnie)
**Cel:** Interfejs do zarządzania relacjami
- [ ] Formularz dodawania relacji
- [ ] Wybór typu relacji (dropdown z kategoriami)
- [ ] Tworzenie custom relationship types
- [ ] Widok relacji dla postaci
- [ ] Edycja i usuwanie relacji
- [ ] Validacja konfliktów (np. nie można być matką i ojcem jednocześnie)

## Sprint 7: Events System (2-3 tygodnie)
**Cel:** Wydarzenia powiązane z postaciami
- [ ] Schema dla Events
- [ ] Schema dla Event Types (predefiniowane + custom)
- [ ] API dla CRUD wydarzeń
- [ ] Seed data z predefiniowanymi typami
- [ ] Powiązanie wydarzeń z postaciami
- [ ] Timeline/chronologia wydarzeń
- [ ] UI dla zarządzania wydarzeniami

## Sprint 8: Media & Notes (1-2 tygodnie)
**Cel:** Media i dokumentacja postaci
- [ ] Upload obrazków (avatar/media list)
- [ ] Storage dla plików (lokalny lub cloud)
- [ ] Notes system (lista notatek)
- [ ] Backstory/Historia (rich text editor?)
- [ ] URLs/Citations/Sources
- [ ] UI dla zarządzania media i notatkami

## Sprint 9: Visualization - Graphviz (2-3 tygodnie)
**Cel:** Wizualizacja relacji grafem
- [ ] Generowanie DOT notation z danych
- [ ] Integracja Graphviz (backend lub client-side)
- [ ] Renderowanie grafu SVG
- [ ] Podstawowe style i kolory
- [ ] Filtering grafu (po typach relacji, tagach)
- [ ] Zoom i pan dla dużych grafów
- [ ] Export grafu do SVG/PNG

## Sprint 10: Export/Import - JSON/CSV (2 tygodnie)
**Cel:** Import i export danych
- [ ] Export do JSON (pełna struktura)
- [ ] Import z JSON (z walidacją)
- [ ] Export do CSV (postaci + relacje)
- [ ] Import z CSV
- [ ] Obsługa błędów i walidacja podczas importu
- [ ] UI dla import/export

## Sprint 11: Export PDF (2 tygodnie)
**Cel:** Generowanie PDF z grafami
- [ ] Integracja pdfmake
- [ ] Template dla PDF (layout)
- [ ] Osadzanie grafu w PDF
- [ ] Eksport listy postaci do PDF
- [ ] Eksport pojedynczej postaci z relacjami
- [ ] Customizacja PDF (wybór co eksportować)

## Sprint 12: Multi-Project Support (2 tygodnie)
**Cel:** Obsługa wielu projektów
- [ ] Schema dla Projects
- [ ] CRUD dla projektów
- [ ] Przypisywanie postaci do projektów
- [ ] Filtrowanie po projekcie
- [ ] UI wyboru aktywnego projektu
- [ ] Import/Export per projekt

## Sprint 13: Search & Filtering (1-2 tygodnie)
**Cel:** Zaawansowane wyszukiwanie
- [ ] Full-text search postaci
- [ ] Filtrowanie po atrybutach
- [ ] Filtrowanie po relacjach
- [ ] Filtrowanie po wydarzeniach
- [ ] Saved searches/filters
- [ ] UI dla advanced search

## Sprint 14: UX Improvements & Polish (2 tygodnie)
**Cel:** Dopracowanie UI/UX
- [ ] Responsywny design (mobile)
- [ ] Accessibility (ARIA, keyboard navigation)
- [ ] Dark mode (opcjonalnie)
- [ ] Lepsze komunikaty błędów
- [ ] Loading states
- [ ] Animations/transitions
- [ ] Keyboard shortcuts

## Sprint 15: D3.js Visualization (Eksperymentalny) (2-3 tygodnie)
**Cel:** Alternatywna wizualizacja z D3.js
- [ ] Podstawowy force-directed graph
- [ ] Interaktywność (drag & drop, zoom)
- [ ] Grupowanie po typach relacji
- [ ] Kolorowanie węzłów (po tagach/atrybutach)
- [ ] Toggle między Graphviz a D3.js
- [ ] Performance optimization dla dużych grafów

## Sprint 16: Testing & Bug Fixes (1-2 tygodnie)
**Cel:** Testy i stabilizacja
- [ ] Unit tests coverage > 80%
- [ ] Integration tests dla krytycznych flow
- [ ] E2E tests (podstawowe user journeys)
- [ ] Bug fixing
- [ ] Performance testing
- [ ] Security audit (basic)

## Sprint 17: Documentation & Deployment (1 tydzień)
**Cel:** Dokumentacja i deployment
- [ ] README z instrukcją instalacji
- [ ] User guide (jak używać)
- [ ] API documentation
- [ ] Deployment setup (Docker)
- [ ] Backup strategy dla bazy danych

---

## Opcjonalne/Future Sprints (post-MVP)

### Sprint X: Advanced Features
- [ ] Undo/Redo system
- [ ] Version history dla postaci
- [ ] Collaborative editing (future: multi-user)
- [ ] Advanced RPG stats system
- [ ] Family tree view (dedykowany widok genealogiczny)
- [ ] Timeline view (oś czasu wydarzeń)

### Sprint Y: Authentication & Multi-user (daleka przyszłość)
- [ ] User authentication
- [ ] User permissions
- [ ] Shared projects
- [ ] Real-time collaboration

---

## Priorytet MoSCoW

### Must Have (Sprinty 0-10)
Core functionality + Export/Import
- Setup & Infrastructure
- Database Schema
- Character CRUD
- Character Details
- Attributes & Customization
- Relationships System
- Events System
- Media & Notes
- Graphviz Visualization
- JSON/CSV Export/Import

### Should Have (Sprinty 11-14)
- PDF Export
- Multi-Project Support
- Search & Filtering
- UX Improvements

### Could Have (Sprint 15)
- D3.js Visualization

### Won't Have (MVP)
- Advanced Features (Sprint X)
- Authentication & Multi-user (Sprint Y)

---

## Szacowany czas realizacji

- **MVP (Must Have):** ~4-5 miesięcy
- **MVP + Should Have:** ~6-7 miesięcy
- **Full MVP + D3.js:** ~7-9 miesięcy
- **Post-MVP features:** według potrzeb

## Notatki

- Każdy sprint zakłada pracę 1 osoby
- Czasy są szacunkowe i mogą się zmieniać
- Sprinty można dostosowywać w trakcie realizacji
- Testy powinny być pisane równolegle z kodem, nie tylko w Sprint 16
- Code review i refactoring na bieżąco
