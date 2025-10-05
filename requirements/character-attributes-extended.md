# Szczegóły Postaci - Atrybuty i Pola

## Podstawowe dane

### Struktura nazw - wszystko w jednej liście

Wszystkie nazwy, imiona, nazwiska, tytuły, przezwiska przechowywane są w jednej elastycznej liście `names[]`.

**Struktura pojedynczego wpisu:**

```json
{
  "name": "Jan",
  "role": "given_name",
  "origin": "",
  "display_priority": 10
}
```

**Pola:**
- `name` (string, required) - jak brzmi nazwa/tytuł/przezwisko/imię
- `role` (string, optional) - rola/typ tej nazwy (wolny tekst)
- `origin` (string, optional) - geneza, skąd się wzięło, kto używa
- `display_priority` (number, optional) - kolejność wyświetlania (niższy = wcześniej)

### UI Aliasy (convenience fields)

Frontend wyświetla dedykowane pola, które mapują się na wpisy w `names[]`:

**Podstawowe pola UI:**
- **Imię** → `{ role: "given_name", display_priority: 10 }`
- **Drugie imię** → `{ role: "second_name", display_priority: 11 }`
- **Nazwisko** → `{ role: "surname", display_priority: 20 }`

Wszystkie `second_name` mają ten sam priority (11), wyświetlają się po `given_name` ale przed `surname`.

**Dodatkowe pola (opcjonalne):**
- **[+ Dodaj nazwę/tytuł]** → użytkownik wybiera/wpisuje `role`, auto-przypisywany `display_priority`

### Enum NameRole z automatycznymi priorytetami

Backend i Frontend używają enuma dla `role` z przypisanymi priorytetami:

```typescript
enum NameRole {
  HONORIFIC_PREFIX = 'honorific_prefix',
  GIVEN_NAME = 'given_name',
  SECOND_NAME = 'second_name',
  SURNAME = 'surname',
  SUFFIX = 'suffix',
  TITLE = 'title',
  EPITHET = 'epithet',
  NICKNAME = 'nickname',
  FORM_OF_ADDRESS = 'form_of_address',
  ALIAS = 'alias',
  OTHER = 'other'
}

// Priorytety przypisane do każdej roli
const ROLE_PRIORITY: Record<NameRole, number> = {
  [NameRole.HONORIFIC_PREFIX]: 5,     // Dr., Sir, Rev. - PRZED imieniem
  [NameRole.GIVEN_NAME]: 10,          // Pierwsze imię
  [NameRole.SECOND_NAME]: 11,         // Drugie/kolejne imiona (wszystkie mają 11)
  [NameRole.SURNAME]: 20,             // Nazwisko
  [NameRole.SUFFIX]: 25,              // Jr., III, Sr. - po nazwisku
  [NameRole.TITLE]: 30,               // Tytuły oficjalne (Queen of..., Lord)
  [NameRole.EPITHET]: 40,             // Przydomki (Stormborn, The Great)
  [NameRole.NICKNAME]: 50,            // Przezwiska (Dany)
  [NameRole.FORM_OF_ADDRESS]: 60,     // Formy adresatywne (Your Grace)
  [NameRole.ALIAS]: 70,               // Pseudonimy, fałszywe tożsamości
  [NameRole.OTHER]: 99                // Inne
};
```

**W UI użytkownik:**
- Wybiera `role` z dropdown (wartości z enuma)
- LUB wpisuje custom text (wtedy `role` = wolny tekst, `display_priority` = 99 lub manual)
- Może ręcznie zmienić `display_priority` (drag & drop w UI)

**Automatyczne przypisanie priorytetu:**
```typescript
function getDefaultPriority(role: string): number {
  return ROLE_PRIORITY[role as NameRole] ?? 99;  // 99 dla custom roles
}
```

### Renderowanie pełnego imienia

**Sortowanie:** `names.sort((a, b) => a.display_priority - b.display_priority)`

**Przykład:**

```json
{
  "id": "char_001",
  "names": [
    { "name": "Dr.", "role": "honorific_prefix", "origin": "Academic degree", "display_priority": 5 },
    { "name": "Jan", "role": "given_name", "origin": "", "display_priority": 10 },
    { "name": "Paweł", "role": "second_name", "origin": "Second name", "display_priority": 11 },
    { "name": "Maria", "role": "second_name", "origin": "Confirmation name", "display_priority": 11 },
    { "name": "Kowalski", "role": "surname", "origin": "", "display_priority": 20 },
    { "name": "Jr.", "role": "suffix", "origin": "Junior", "display_priority": 25 },
    { "name": "King of Poland", "role": "title", "origin": "Coronation 2020", "display_priority": 30 },
    { "name": "Stormborn", "role": "epithet", "origin": "Born during a storm", "display_priority": 40 }
  ]
}
```

**Wyświetlenie:**
```
Dr. Jan Paweł Maria Kowalski Jr., King of Poland, Stormborn
│   │   │     │     │         │    │              │
5   10  11    11    20        25   30             40
```

### Przykład pełnej postaci (Daenerys)

```json
{
  "id": "char_001",
  "names": [
    { "name": "Daenerys", "role": "given_name", "origin": "", "display_priority": 10 },
    { "name": "Targaryen", "role": "surname", "origin": "", "display_priority": 20 },
    { "name": "Stormborn", "role": "epithet", "origin": "Born during a storm on Dragonstone", "display_priority": 40 },
    { "name": "Mother of Dragons", "role": "epithet", "origin": "Hatched three dragon eggs in Khal Drogo's funeral pyre", "display_priority": 41 },
    { "name": "Dany", "role": "nickname", "origin": "Used by family and close friends", "display_priority": 50 },
    { "name": "Khaleesi", "role": "title", "origin": "Wife of Khal Drogo, leader of Dothraki khalasar", "display_priority": 30 },
    { "name": "Queen of the Andals and the First Men", "role": "title", "origin": "Conquest of Westeros, claimed by right of succession", "display_priority": 31 },
    { "name": "Your Grace", "role": "form_of_address", "origin": "Royal protocol for addressing monarchs", "display_priority": 60 },
    { "name": "The Unburnt", "role": "epithet", "origin": "Survived Khal Drogo's funeral pyre unharmed", "display_priority": 42 },
    { "name": "Breaker of Chains", "role": "epithet", "origin": "Freed slaves in Slaver's Bay cities", "display_priority": 43 }
  ]
}
```

**Wyświetlenie (sortowane po priority):**
```
Daenerys Targaryen, Khaleesi, Queen of the Andals and the First Men, Stormborn, Mother of Dragons, The Unburnt, Breaker of Chains
```

### Inne podstawowe dane

- **Gender** (MALE, FEMALE, OTHER, UNKNOWN)
- **Age/Birth Date** - wiek lub data urodzenia

---

## Wygląd

- **Kolor włosów**
- **Kolor oczu**
- **Wzrost**
- **Budowa ciała**
- **Znaki szczególne** (blizny, tatuaże)
- **Media List** - wiele zdjęć/obrazków/grafik postaci

---

## Charakterystyka i tło

- **Species/Race** (gatunek - człowiek, elf, android, etc.)
- **Osobowość** (cechy charakteru)
- **Motywacje**
- **Cele**
- **Lęki/Słabości**
- **Umiejętności/Talenty**
- **Zawód/Rola**
- **Status** (żywy/martwy/nieznany)
- **Afiliacja/Frakcja**
- **Lokalizacja obecna**

---

## Powiązania

- **Person References** - relacje do innych postaci (lista referencji)
  - Zobacz: [relationship-types.md](./relationship-types.md)
- **Family List** - rodziny (dla genealogii)
- **Event References** - powiązane wydarzenia
  - Zobacz: [event-types.md](./event-types.md)
  - Możliwość dodawania customowych typów wydarzeń

---

## Notatki i dokumentacja

- **Notes** - długie notatki tekstowe (lista)
- **Backstory/Historia** - dedykowane pole na historię postaci
- **Citations/Sources** - źródła informacji o postaci
- **URLs** - linki zewnętrzne

---

## Customizacja

- **Custom Attributes** - elastyczne atrybuty key-value (dowolne pola)
  - Umożliwia dodawanie własnych pól bez modyfikacji schematu
  - Przykłady: "Ulubiony kolor", "Fobia", "Ulubiona broń"
- **Tags** - etykiety do kategoryzacji i filtrowania
  - Przykłady: "protagonist", "villain", "dead", "important"
- **Ważność postaci** (główna/drugoplanowa/epizodyczna)
- **Projekt** (przynależność do książki/kampanii - multi-project)

---

## RPG-specific (opcjonalne)

- **Klasa postaci** (np. Warrior, Mage, Rogue)
- **Poziom**
- **Statystyki** (customowe pola liczbowe)
  - Przykłady: Siła, Zręczność, Inteligencja, Charyzma
  - Elastyczny system pozwalający na różne systemy RPG

---

## Metadane techniczne

- **Unique ID** (gramps_id style) - unikalny identyfikator postaci
- **Private flag** (prywatność) - czy postać jest prywatna
- **Change timestamp** (śledzenie zmian) - kiedy ostatnio edytowano
- **Created/Modified dates** - daty utworzenia i modyfikacji

---

## Notatki implementacyjne

### Pola wymagane (required)

- First name (minimum do utworzenia postaci)
- Unique ID (generowany automatycznie)

### Pola opcjonalne

- Wszystkie pozostałe pola są opcjonalne
- Pozwala na stopniowe budowanie profilu postaci

### Walidacja

- Wszystkie pola tekstowe: max length (do ustalenia per pole)
- Daty: walidacja formatu
- Liczby: zakresy wartości (np. wiek >= 0)
- URLs: walidacja formatu URL
- Custom attributes: walidacja key-value structure

### Relacje w bazie danych

- **One-to-Many:**

  - Person → Alternate Names
  - Person → Media
  - Person → Notes
  - Person → Custom Attributes
  - Person → Tags (many-to-many przez junction table)
  - Person → Events (many-to-many przez junction table)

- **Many-to-Many:**
  - Person ↔ Person (Relationships)
  - Person ↔ Family
  - Person ↔ Projects
