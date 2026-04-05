import { type Character } from '$lib/domain/Character';
import { error } from '@sveltejs/kit';

import { fetchCharacters } from './server/queries'; //Model

export const load = async () => {
  //fetchCharactersClass
  const characters: Character[] = await fetchCharacters();

  if (characters.length === 0) {
    throw error(404, { message: 'Characters not found' });
  }

  //TODO nie rozumiem
  //TODO [UPDATE] chyba rozumiem, JS jest debilem
  //"Podczas przesyłania danych do frontendu w load, SvelteKit oczekuje danych w formacie JSON,
  // a obiekty klasy Character nie są automatycznie serializowane
  // (trzeba przekazać tylko zwykłe obiekty JavaScript)."

  return {
    characters: characters.map(char => char.toJSON()),
  };
};
