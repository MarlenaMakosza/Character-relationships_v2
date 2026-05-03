// import type { Character } from '$lib/domain/Character';
// import type { Uuid } from '$lib/domain/types';

import type { DBCharacter } from '$lib/dbModels/Character.ts';

import db from '$lib/server/db';
import { characters } from '$lib/server/db/schema/schema';

// import { eq } from 'drizzle-orm';

/** @internal */
class CharacterRepository {
  public static async getCharacters(): Promise<DBCharacter[]> {
    return db.select().from(characters).orderBy(characters.id);
  }

  // public static async getCharacters(): Promise<Characters> {
  //   const dbCharacters: DBCharacter[] = await db.select().from(characters).orderBy(characters.id);
  //   const allCharacters: Character[] = dbCharacters.map(toCharacter);
  //
  //   return new Characters(allCharacters);
  // }
  //
  // public static async getCharacterById(id: Uuid): Promise<Character | null> {
  //   const record = await db.query.characters.findFirst({
  //     where: eq(characters.id, id),
  //   });
  //
  //   return (record == null) ? null : toCharacter(record);
  // }

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
