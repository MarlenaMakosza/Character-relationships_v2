import type { Character } from '$lib/domain/Character';

export const CharacterValidator = {
  isValid(character: Character): boolean {
    return character.names.length > 0
      || character.surnames.length > 0
      || character.description?.trim().length > 0 > 0
      || character.labels.length > 0;
  },
};
