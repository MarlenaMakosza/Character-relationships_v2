import type { DBCharacter } from '$lib/dbModels/Character.ts';

import { Characters } from '$lib/domain/Characters.ts';
import { toCharacter } from '$lib/mappers/characterMapper.ts';
import CharacterRepository from '$lib/repositories/CharacterRepository.ts';


// eslint-disable-next-line @typescript-eslint/no-unused-vars -- test
class CharacterService {
  /**
   * Fetches all characters from the database.
   * @returns Promise resolving to a Characters collection
   */
  public static async getCharacters(): Promise<Characters> {
    const rawCharacters: DBCharacter[] = await CharacterRepository.getCharacters();

    return new Characters(rawCharacters.map(toCharacter));
  }
}
