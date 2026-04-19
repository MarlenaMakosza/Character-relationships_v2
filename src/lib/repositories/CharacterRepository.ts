import type { Character } from '$lib/domain/Character';
import type { Uuid } from '$lib/domain/types';

import { Characters } from '$lib/domain/Characters';
import { toCharacter } from '$lib/mappers/characterMapper';
import db from '$lib/server/db';
import { characters } from '$lib/server/db/schema/schema';
import { eq } from 'drizzle-orm';

class CharacterRepository {
  public static async getListCharacters(): Promise<Character[]> {
    const records = await db.select().from(characters).orderBy(characters.id);

    return records.map(toCharacter);
  }

  // TODO Where different?

  public static async getCharacters(): Promise<Characters> {
    const records = await db.select().from(characters).orderBy(characters.id);

    return new Characters(records.map(toCharacter));
  }

  public static async getCharacterById(id: Uuid): Promise<Character | null> {
    const record = await db.query.characters.findFirst({
      where: eq(characters.id, id),
    });

    return (record == null) ? null : toCharacter(record);
  }

  // // TODO - take framework to responses status codes or finally
  // public static async deleteCharacterById(id: number): Promise<Response> {
  //   try {
  //     await db.delete(characters).where(eq(characters.id, id));
  //
  //     return new Response('Character deleted successfully', { status: 200 });
  //   } catch {
  //     return new Response('Error deleting character!', { status: 500 });
  //   }
  // }
}

export default CharacterRepository;
