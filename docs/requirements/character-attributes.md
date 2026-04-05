# Szczegóły Postaci - Atrybuty i Pola

## Podstawowe dane (inspiracja: Gramps Person)

### Primary Name (główne imię/nazwisko)

- **First name** (imię)
- **Surname(s)** (nazwisko/a - może być lista)
- **Suffix** (Jr., III, etc.)
- **Title** (Dr., Sir, Lord, etc.)
- **Nickname** (przezwisko)
- **Call name** (jak go wołają)
- **Family nickname** (przezwisko rodzinne)

### Inne podstawowe dane

- **Alternate Names** - lista alternatywnych imion/tożsamości
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
