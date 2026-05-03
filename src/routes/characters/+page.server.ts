import { CharacterController } from '$lib/Controller/CharacterController';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const result = await CharacterController.getCharacters();

  if (result.data === null) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- temp
    error(500, result.error);
  }

  return {
    characters: result.data.charactersArray.map(({ id, name }) => ({ id, name })),
  };
};
