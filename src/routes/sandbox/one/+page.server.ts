import type { Relationship } from '$lib/domain/Relationship';

import { Character } from '$lib/domain/Character';
import { Formatter } from '$lib/formattters/Formatter';

import { fetchCharacters, fetchRelations } from '../server/queries';

export const load = async () => {
  // fetchCharactersClass
  const characters: Character[] = await fetchCharacters();
  const relations: Relationship[] = await fetchRelations();
  const formatter = new Formatter(characters, relations);

  const fullName = formatter.getFullNameInitiatorCharacter(relations[0]);

  return {
    fullName,
  };
};
