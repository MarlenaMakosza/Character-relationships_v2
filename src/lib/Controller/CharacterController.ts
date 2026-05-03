import type { Characters } from '$lib/domain/Characters';

import { CharacterService } from '$lib/services/CharacterService';

type Result<TData> = { data: null; error: string } | { data: TData; error: null };

/**
 * Handles incoming requests related to characters.
 * @remarks
 * TODO: Work in progress.
 * @example
 * ```typescript
 * const result = await CharacterController.getCharacters();
 * if (result.error) return error(500, result.error);
 * return result.data.charactersArray;
 * ```
 */
export class CharacterController {
  /**
   * Returns all characters.
   * @returns `data` with a {@link Characters} collection, or `error` string on failure.
   */
  public static async getCharacters(): Promise<Result<Characters>> {
    try {
      const data = await CharacterService.getCharacters();

      return { data, error: null };
    } catch {
      return { data: null, error: 'Failed to fetch characters' };
    }
  }
}
