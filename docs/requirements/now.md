# Stan projektu — Character Relationships v2

## Opis ogólny

Aplikacja webowa (SvelteKit + PostgreSQL + Drizzle ORM) do zarządzania postaciami i relacjami między nimi. Aktualnie bardzo wczesna wersja — brak stylowania, brak wielu planowanych funkcji.

---

## Baza danych (schemat)

Dwie tabele:

- **characters** — `id`, `firstName`, `lastName`
- **relations** — `id`, `idChar1` (FK → characters), `idChar2` (FK → characters), `about`

---

## Nawigacja (globalna)

Pasek nawigacyjny dostępny na każdej stronie (komponent `Navigate.svelte`) z przyciskami:

| Przycisk                 | Cel              |
| ------------------------ | ---------------- |
| Characters               | `/characters`    |
| Relationships            | `/relations`     |
| Characters relationships | `/character_rel` |
| Add character            | `/add_character` |
| Test                     | `/sandbox`       |
| Main menu                | `/`              |

---

## Strony i funkcjonalności

### `/` — Strona główna

- Wyświetla nagłówek "Menu"
- Brak zawartości poza nawigacją

---

### `/characters` — Lista postaci

- Tabela ze wszystkimi postaciami: ID, imię, nazwisko
- Przycisk **Delete** przy każdej postaci — usuwa postać z bazy (z potwierdzeniem `confirm()`)
- Po usunięciu: przekierowanie z powrotem na `/characters`
- Błąd usunięcia: wyświetlany przez `alert()`

---

### `/characters/[charId]` — Szczegóły postaci

- Wyświetla imię i nazwisko konkretnej postaci (po ID z URL)
- Strona testowa/szkieletowa — tytuł zawiera słowo "Test"

---

### `/add_character` — Dodawanie postaci

- Formularz z polami: **First Name**, **Last Name**
- Walidacja: oba pola są wymagane (błąd wyświetlany pod formularzem)
- Po poprawnym dodaniu: przekierowanie na `/characters`

---

### `/relations` — Lista relacji

- Tabela ze wszystkimi relacjami: ID relacji, ID pierwszej postaci, ID drugiej postaci, opis relacji (`about`)
- Tylko odczyt — brak akcji

---

### `/character_rel` — Relacje między postaciami (widok główny)

- Tabela łącząca: imię+nazwisko postaci → imię+nazwisko powiązanej postaci → opis relacji
- **Graf wizualny** (SVG, 1050×1000px) renderowany przy użyciu `d3-graphviz` jako directed graph (`digraph`)
- Graf generowany na podstawie wszystkich relacji z bazy

---

### `/sandbox` — Strona testowa

- Lista postaci w tabeli: ID, imię, nazwisko, **pełne imię** (`fullName` z klasy `Character`)
- Używa klas domenowych (`Character`) zamiast surowych interfejsów

---

### `/sandbox/one` — Podstrona sandbox

- Wyświetla pełne imię "inicjatora" (pierwszej postaci z relacji)
- Strona eksperymentalna

---

### `/debug` — Debugowanie

- Tabela wszystkich postaci — kolumny generowane dynamicznie z kluczy obiektu
- Używa surowego zapytania przez `ICharacter[]`

---

### `/characters_other_code` — Alternatywna lista postaci

- Tabela: ID, imię, nazwisko, pełne imię — tak jak `/sandbox`
- Przycisk **Delete** (implementacja identyczna jak `/characters`, ale w składni Svelte 5 `onclick`)
- Strona służy jako porównanie dwóch podejść do kodu (Svelte 4 vs Svelte 5)

---

### `/characters_other_code/[charId]` — Alternatywny widok postaci

- Analogiczny do `/characters/[charId]`

---

## Klasy domenowe

| Klasa / plik               | Odpowiedzialność                            |
| -------------------------- | ------------------------------------------- |
| `Character.ts`             | Model postaci z getterem `fullName`         |
| `Characters.ts`            | Kolekcja postaci                            |
| `Relationship.ts`          | Model relacji                               |
| `Relationships.ts`         | Kolekcja relacji                            |
| `CharacterFormatter.ts`    | Formatowanie postaci do stringa             |
| `RelationshipFormatter.ts` | Formatowanie relacji → DOT język (graphviz) |

---

## Czego brakuje (Roadmap z README)

- [ ] Formularz dodawania relacji
- [ ] Edycja postaci i relacji
- [ ] Indywidualny graf dla każdej postaci
- [ ] Drzewo genealogiczne (family tree)
- [ ] Stylowanie CSS (aktualnie tylko plik `app.css` bez treści)
- [ ] Lepsza obsługa błędów (TODO w kodzie)
