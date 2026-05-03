import type { DBCharacter } from '$lib/dbModels/Character.ts';

import { Characters } from '$lib/domain/Characters.ts';
import CharacterRepository from '$lib/repositories/CharacterRepository.ts';

import { toCharacter } from '../mappers/CharacterMapper.ts';

/** @internal */
export class CharacterService {
  public static async getCharacters(): Promise<Characters> {
    const rawCharacters: DBCharacter[] = await CharacterRepository.getCharacters();

    return new Characters(rawCharacters.map(toCharacter));
  }
}
