import type { Characters } from '$lib/domain/Characters';

import { EMPTY } from '$lib/constants';
import { CharacterFormatter } from '$lib/formattters/CharacterFormatter';
import CharacterRepository from '$lib/repositories/CharacterRepository';
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const characters: Characters = await CharacterRepository.getCharacters();
  if (characters.charactersArray.length == EMPTY) {
    throw error(StatusCodes.NOT_FOUND, { message: 'Characters not found' });
  }

  const serializedCharacters = CharacterFormatter.toPOJOs(characters.charactersArray);

  return {
    characters: serializedCharacters,
  };
};
