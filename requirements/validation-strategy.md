# Strategia Walidacji - Propozycja

## Inspiracja: Gramps

Analiza projektu Gramps pokazała **minimalną walidację** przy zapisie postaci - użytkownik może zapisać postać z praktycznie dowolnymi danymi.

## Jak działa w Gramps

### 1. Minimalna walidacja przy zapisie

**Kod: editprimary.py:175-176**

```python
def object_is_empty(self):
    return self.obj.serialize()[1:] == self.empty_object().serialize()[1:]
```

Sprawdza tylko czy obiekt jest **dokładnie pusty** (porównuje z pustym obiektem). Jeśli **cokolwiek** jest wypełnione - pozwala zapisać.

### 2. Empty object ma już domyślne wartości

**Kod: editperson.py:159-170**

```python
def empty_object(self):
    person = Person()
    # the editor requires a surname
    person.primary_name.add_surname(Surname())
    person.primary_name.set_primary_surname(0)
    return person
```

Nawet pusty obiekt ma już `Surname()` dodane - więc porównanie `serialize()` nigdy nie będzie True, jeśli użytkownik wpisze COKOLWIEK.

### 3. Automatyczne fixowanie przy zapisie

**Kod: editperson.py:933-948**

```python
def save(self, *obj):
    if self.object_is_empty():
        ErrorDialog(_("Cannot save person"),
                   _("No data exists for this person. Please enter data or cancel the edit."))
        return

    # fix surname problems
    for name in [self.obj.get_primary_name()] + self.obj.get_alternate_names():
        if len(name.get_surname_list()) == 0:
            name.set_surname_list([Surname()])  # Dodaje pusty Surname jeśli nie ma
        try:
            primind = [surn.get_primary() for surn in name.get_surname_list()].index(True)
        except ValueError:
            primind = 0  # Ustawia pierwszy jako primary
        name.set_primary_surname(primind)
```

**Gramps nie wymaga żadnych konkretnych pól!**

Przy zapisie:

1. Sprawdza czy obiekt jest całkowicie pusty
2. Jeśli nie - automatycznie fixuje brakujące rzeczy
3. Zapisuje

---

## Propozycja dla Character Relationships

### Struktura bez wymaganych pól

```typescript
interface Person {
  id: string; // auto-generated
  given_name: string; // może być puste ""
  surname: string; // może być puste ""
  additional_names: AdditionalName[]; // może być pusta array
  gender?: string;
  birth_date?: string;
  // ... reszta pól opcjonalna
}
```

### Walidacja przy zapisie - Opcja A: Proste porównanie

```typescript
function createEmptyPerson(): Person {
  return {
    id: '',
    given_name: '',
    surname: '',
    additional_names: [],
    // ... reszta pól undefined lub puste
  };
}

function isPersonEmpty(person: Person): boolean {
  const empty = createEmptyPerson();
  // Ignoruj ID przy porównaniu (auto-generated)
  const { id: _id1, ...personData } = person;
  const { id: _id2, ...emptyData } = empty;

  return JSON.stringify(personData) === JSON.stringify(emptyData);
}

function canSavePerson(person: Person): boolean {
  return !isPersonEmpty(person);
}
```

### Walidacja przy zapisie - Opcja B: Sprawdzanie konkretnych pól

```typescript
function canSavePerson(person: Person): boolean {
  // Zapisz jeśli COKOLWIEK jest wypełnione
  return (
    person.given_name.trim() !== '' ||
    person.surname.trim() !== '' ||
    person.additional_names.length > 0 ||
    person.gender !== undefined ||
    person.birth_date !== undefined ||
    // ... sprawdź inne pola
    hasAnyData(person)
  );
}

function hasAnyData(person: Person): boolean {
  // Pomocnicza funkcja sprawdzająca czy jakiekolwiek pole ma wartość
  return Object.entries(person).some(([key, value]) => {
    if (key === 'id') return false; // ignoruj ID
    if (value === undefined || value === null || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });
}
```

### Walidacja przy zapisie - Opcja C: Zod schema (elastyczna)

```typescript
import { z } from 'zod';

const PersonSchema = z
  .object({
    id: z.string(),
    given_name: z.string().default(''), // domyślnie puste
    surname: z.string().default(''), // domyślnie puste
    additional_names: z.array(AdditionalNameSchema).default([]),
    gender: z.string().optional(),
    birth_date: z.string().optional(),
    // ... reszta opcjonalna
  })
  .refine(
    data => {
      // Custom validation: co najmniej jedno pole musi być wypełnione
      return (
        data.given_name.trim() !== '' ||
        data.surname.trim() !== '' ||
        data.additional_names.length > 0 ||
        data.gender !== undefined ||
        data.birth_date !== undefined
        // ... inne pola
      );
    },
    {
      message: 'At least one field must be filled to save a person',
    },
  );
```

---

## Zachowanie UI

### Formularz

- **Brak wymaganych pól** - wszystkie pola opcjonalne
- Użytkownik może wpisać cokolwiek: tylko imię, tylko nazwisko, tylko tytuł, tylko płeć
- Pola nie mają czerwonych gwiazdek "\*" (wszystko opcjonalne)

### Przycisk "Save"

- Aktywny jeśli **cokolwiek** zostało wpisane
- Nieaktywny jeśli formularz całkowicie pusty

### Przy próbie zapisu pustej postaci

```text
Error Dialog:
"Nie można zapisać postaci"
"Brak danych. Proszę wprowadzić jakieś informacje o postaci lub anulować edycję."
```

### Przy zapisie z danymi

- Automatyczne czyszczenie/fixowanie:
  - Trim whitespace z pól tekstowych
  - Usuwanie pustych elementów z array
  - Ustawienie domyślnych wartości gdzie potrzebne

---

## Zalety tego podejścia

1. **Maksymalna elastyczność** - użytkownik może zacząć od dowolnego pola
2. **Zgodne z real-world usage** - często zaczynamy od częściowych informacji
3. **Nie blokuje użytkownika** - nie wymusza konkretnej kolejności wypełniania
4. **Proste w implementacji** - mniej walidacji = mniej kodu
5. **Przyjazne dla worldbuilding** - można dodać postać z samym przydomkiem "The Stranger"

## Wady

1. Możliwość zapisania "prawie pustych" postaci (np. tylko spacja w imieniu)
2. Potencjalne problemy z wyświetlaniem (trzeba handle'ować brak imienia/nazwiska)
3. Trudniejsze wyszukiwanie/sortowanie postaci bez podstawowych danych

## Rozwiązania wad

- **Display name fallback:**

  ```typescript
  function getDisplayName(person: Person): string {
    if (person.given_name || person.surname) {
      return `${person.given_name} ${person.surname}`.trim();
    }
    if (person.additional_names.length > 0) {
      return person.additional_names[0].name;
    }
    return `[Unnamed Person #${person.id.slice(0, 8)}]`;
  }
  ```

- **Trim przy zapisie:**
  ```typescript
  function sanitizePerson(person: Person): Person {
    return {
      ...person,
      given_name: person.given_name.trim(),
      surname: person.surname.trim(),
      additional_names: person.additional_names.filter(n => n.name.trim() !== ''),
    };
  }
  ```

---

## ✅ Wybrana opcja

**Minimalna walidacja jak w Gramps (Opcja B + Zod):**

1. Użyj Zod do definicji schematu (type safety + runtime validation)
2. Wszystkie pola opcjonalne oprócz `id`
3. Custom refine w Zod: sprawdza czy **przynajmniej jedno pole wypełnione**
4. Funkcja `sanitizePerson()` przed zapisem (trim, cleanup)
5. Funkcja `getDisplayName()` z fallback dla UI
6. **Można zapisać postać z czymkolwiek** - tytuł, przezwisko, płeć, dowolne pole

```typescript
// Przykład użycia
async function savePerson(person: Person) {
  // 1. Sanitize
  const cleaned = sanitizePerson(person);

  // 2. Validate
  const result = PersonSchema.safeParse(cleaned);

  if (!result.success) {
    showError('Nie można zapisać postaci', 'Proszę wprowadzić przynajmniej jedno pole.');
    return;
  }

  // 3. Save to database
  await db.insert(persons).values(result.data);
}
```

---

## ✅ Odpowiedzi na pytania

1. **Czy chcemy minimalną walidację jak w Gramps (save anything)?**
   → **TAK** - minimalna walidacja, można zapisać z czymkolwiek

2. **Czy chcemy wymóc przynajmniej imię LUB nazwisko?**
   → **NIE** - dowolne pole wystarczy (tytuł, przezwisko, płeć, etc.)

3. **Czy chcemy auto-fixowanie przy zapisie czy pokazywać błędy?**
   → **Auto-fixowanie** - trim, cleanup pustych pól, sanitizacja

4. **Jak wyświetlać postaci bez imienia/nazwiska w listach?**
   → **Fallback:** first available name → additional_names[0] → "[Unnamed Person #id]"
