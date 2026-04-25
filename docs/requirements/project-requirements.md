# Wymagania Projektu - Character Relationships

## Cel Projektu

Aplikacja do zarządzania postaciami i ich relacjami dla projektów twórczych:

**Główne zastosowania:**

- Pisanie książek
- Worldbuilding
- Gry RPG (projektowanie kampanii, NPC)

**Inne zastosowania:**

- Analiza postaci z seriali
- Analiza postaci z filmów
- Inne projekty narracyjne

## Wymagania Funkcjonalne

### 1. Zarządzanie Postaciami

- [ ] Możliwość dodawania nowych postaci
- [ ] Edycja istniejących postaci
- [ ] Usuwanie postaci
- [ ] Wyświetlanie listy postaci

### 2. Relacje Między Postaciami

- [ ] Definiowanie relacji między postaciami
- [ ] **Kierunkowość relacji:**
  - Bidirectional (dwukierunkowe) - np. rodzeństwo
  - Unidirectional (jednostronne z auto-odwrotną) - np. matka→dziecko (auto: dziecko→matka)
  - Asymetryczne - np. X kocha Y, ale Y nie kocha X
- [ ] **Możliwość dodawania customowych typów relacji**
- [ ] Wizualizacja relacji w grafie

**Szczegółowa lista typów relacji:** [relationship-types.md](./relationship-types.md)

### 3. Szczegóły Postaci

Aplikacja śledzi szczegółowe informacje o każdej postaci, w tym:

- Podstawowe dane (imiona, wiek, płeć)
- Wygląd fizyczny
- Charakterystyka i tło
- Powiązania z innymi postaciami i wydarzeniami
- Notatki i dokumentacja
- Elastyczne custom attributes i tagi
- Opcjonalne dane RPG

**Szczegółowa lista atrybutów:** [character-attributes.md](./character-attributes.md)

## Wymagania Techniczne

### Architektura

- Frontend: Svelte
- Backend: SvelteKit
- Baza danych: PostgreSQL
- ORM: Drizzle
- Walidacja: Zod
- Wizualizacja grafów: Cytoscape.js
- Export PDF: pdfmake
- Import/Export danych: JSON, CSV, PDF
- Typ aplikacji: Jednoużytkownikowa (wieloużytkownikowa + autentykacja w przyszłości)

### Bezpieczeństwo

- [ ] Walidacja danych wejściowych
- [ ] Ochrona przed SQL injection
- [ ] Sanityzacja danych

### Wydajność

- [ ] Optymalizacja zapytań do bazy danych
- [ ] Lazy loading danych
- [ ] Cache'owanie

## Wymagania UI/UX

- [ ] Responsywny design
- [ ] Intuicyjny interfejs użytkownika
- [ ] Dostępność (accessibility)
- [ ] Obsługa błędów z komunikatami dla użytkownika

## Testowanie

- [ ] Testy jednostkowe
- [ ] Testy integracyjne
- [ ] Testy E2E
- [ ] Pokrycie kodu testami > 60% (wyłączając obszary których testy są bez sensu)

## Dokumentacja

- [ ] README z instrukcją uruchomienia
- [ ] Dokumentacja API
- [ ] Komentarze w kodzie (tylko gdzie niezbędne)
- [ ] Diagramy architektury

## Harmonogram Implementacji

**Szczegółowy roadmap:** [implementation-roadmap.md](./implementation-roadmap.md)

**Szacowany czas MVP:** 6-9 miesięcy (17 sprintów)

- Must Have: Sprinty 0-10 (~4-5 miesięcy)
- Should Have: Sprinty 11-14 (~2 miesiące)
- Could Have: Sprint 15 (D3.js) (~2-3 tygodnie)

## Notatki

[Dodatkowe uwagi i pomysły]
