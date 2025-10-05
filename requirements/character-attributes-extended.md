# Szczegóły Postaci - Atrybuty i Pola

## Podstawowe dane (inspiracja: Gramps Person)

### Primary Name (główne imię/nazwisko)

Struktura elastyczna obsługująca różne kultury i konwencje nazewnictwa.

#### Given Names (array)

- Lista imion postaci (może być jedno lub wiele)
- Przykłady:
  - `["Daenerys"]`
  - `["Jan", "Paweł"]` (polskie drugie imię)
  - `["John", "Robert", "Michael"]` (western middle names)

#### Surnames (array)

- Lista nazwisk (obsługa kultur z wieloma nazwiskami)
- Przykłady:
  - `["Targaryen"]`
  - `["García", "López"]` (hiszpańskie nazwiska ojca i matki)
  - `["von Habsburg"]`

#### Suffix Genealogical (string, single)

- Przyrostek genealogiczny: Jr., Sr., II, III, IV
- **Tylko jeden** - rzadko ktoś ma więcej niż jeden suffix genealogiczny

#### Titles (array of objects)

Wszystkie tytuły: formalne, akademickie, zawodowe, szlacheckie.

**Struktura obiektu Title:**

```json
{
  "label": "Queen of the Andals and the First Men",
  "category": "noble",
  "source": "conquest",
  "culture": "Westerosi",
  "locale": "en-US",
  "priority": 1,
  "period": { "from": "298-AC", "to": null },
  "is_active": true
}
```

**Pola:**

- `label` (string, required) - treść tytułu
- `category` (enum, required) - kategoria tytułu:
  - `noble` - szlachecki (Queen, King, Lord, Duke)
  - `office` - urząd (Chancellor, Minister)
  - `military_rank` - ranga wojskowa (General, Captain)
  - `honorific_prefix` - honoryfikat przed nazwiskiem (Dr., Sir, Rev.)
  - `degree_postnominal` - stopień po nazwisku (PhD, MD, Esq.)
  - `religious` - religijny (Pope, Archbishop, Rabbi)
  - `magical` - magiczny (Archmage, High Priest - dla fantasy)
  - `other` - inne
- `source` (string, optional) - skąd/kto nadał tytuł
- `culture` (string, optional) - kultura/język (np. "Dothraki", "Westerosi")
- `locale` (string, optional) - kod języka BCP 47 (np. "en-US", "pl-PL")
- `priority` (number, optional) - priorytet wyświetlania (1 = najważniejszy)
- `period` (object, optional) - przedział czasowy:
  - `from` (date/string) - od kiedy
  - `to` (date/string) - do kiedy (null = aktualnie)
- `is_active` (boolean, optional) - czy aktywny (auto-compute z period lub manual)

**Przykłady:**

```json
[
  { "label": "Queen of the Andals", "category": "noble", "priority": 1 },
  { "label": "Dr.", "category": "honorific_prefix", "source": "academic" },
  { "label": "PhD", "category": "degree_postnominal", "source": "academic" },
  { "label": "Lord Commander", "category": "military_rank", "source": "Night's Watch" }
]
```

#### Nicknames (array of objects)

Wszystkie przezwiska, przydomki, formy adresatywne - jeden zunifikowany array z kontekstem.

**Struktura obiektu Nickname:**

```json
{
  "name": "Dany",
  "context": "friends_family",
  "type": "diminutive",
  "source": "family",
  "culture": null,
  "locale": "en-US",
  "priority": 1,
  "period": { "from": null, "to": null },
  "is_active": true
}
```

**Pola:**

- `name` (string, required) - przezwisko/przydomek
- `context` (enum, required) - kontekst użycia:
  - `friends_family` - przyjaciele i rodzina
  - `subjects` - poddani, podwładni
  - `ethno_culture` - specyficzne dla kultury/etniczności
  - `epithet` - epitety (Stormborn, The Great)
  - `family_specific` - używane przez konkretną osobę z rodziny
  - `military_unit` - w jednostce wojskowej
  - `organization` - w organizacji/gildii
  - `enemies` - jak nazywają go wrogowie
  - `other` - inne
- `type` (string, optional) - typ przezwiska:
  - `diminutive` - zdrobnienie (Dany)
  - `form_of_address` - forma adresatywna (Your Grace, Sire)
  - `title_epithet` - tytuł używany jako przydomek (Khaleesi)
  - `epithet_birth` - epitety od urodzenia (Stormborn)
  - `epithet_deed` - epitety od czynów (Breaker of Chains)
  - `epithet_appearance` - od wyglądu (The Red, Goldeneye)
  - `slang` - slangowe
  - `insult` - obelgi
  - `other` - inne
- `source` (string, optional) - kto nadał/używa (np. "brother", "Khal Drogo", "enemies")
- `culture` (string, optional) - kultura (np. "Dothraki", "Westerosi")
- `locale` (string, optional) - język
- `priority` (number, optional) - priorytet (który pokazać jako główny)
- `period` (object, optional) - kiedy używane
- `is_active` (boolean, optional) - czy aktywne

**Przykłady:**

```json
[
  {
    "name": "Dany",
    "context": "friends_family",
    "type": "diminutive",
    "source": "family",
    "priority": 1
  },
  {
    "name": "Your Grace",
    "context": "subjects",
    "type": "form_of_address",
    "source": "protocol"
  },
  {
    "name": "Khaleesi",
    "context": "ethno_culture",
    "type": "title_epithet",
    "source": "Khal Drogo",
    "culture": "Dothraki"
  },
  {
    "name": "Stormborn",
    "context": "epithet",
    "type": "epithet_birth",
    "source": "birth_circumstance"
  },
  {
    "name": "Mother of Dragons",
    "context": "epithet",
    "type": "epithet_deed",
    "period": { "from": "299-AC", "to": null }
  }
]
```

#### Styles (object, optional)

Szablony renderowania imienia w różnych kontekstach.

**Struktura:**

```json
{
  "primary": "{given} {surname}",
  "alternates": [
    {
      "id": "formal_realm",
      "template": "{title:noble[priority=1]} {given} {surname}",
      "audience": "subjects",
      "locale": "en-US"
    },
    {
      "id": "academic",
      "template": "{title:honorific_prefix} {given} {surname}, {title:degree_postnominal}",
      "audience": "academic"
    },
    {
      "id": "full_titles",
      "template": "{given} {surname}, {titles:all}",
      "audience": "ceremonial"
    }
  ]
}
```

**Tokeny w templates:**

- `{given}` - pierwsze imię z given_names
- `{given:all}` - wszystkie given_names
- `{surname}` - pierwsze nazwisko
- `{surname:all}` - wszystkie surnames
- `{title:category}` - pierwszy tytuł z danej kategorii
- `{title:category[priority=N]}` - tytuł z kategorii o priorytecie N
- `{titles:all}` - wszystkie tytuły
- `{nickname:context}` - nickname z danego kontekstu

### Alternate Names (array of Name objects)

- Lista kompletnie alternatywnych tożsamości
- Każda ma pełną strukturę Primary Name (given_names, surnames, titles, nicknames)
- Przykład: postać używająca alias, fałszywej tożsamości

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
