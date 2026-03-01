import { Character } from '$lib/class/Character';
import { Characters } from '$lib/class/Characters';
import db from '$lib/server/db';
import { characters } from '$lib/server/db/schema/schema';
import { eq } from 'drizzle-orm';

class CharacterRepository {
	public static async getListCharacters(): Promise<Character[]> {
		return db.select().from(characters).orderBy(characters.id);
	}

	public static async getCharacters(): Promise<Characters> {
		const characterRecords = await db.select().from(characters).orderBy(characters.id);
		// mapper
		const charactersArray = characterRecords.map(
			(char): Character => new Character(char.id, char.firstName, char.lastName, char.age),
		);

		return new Characters(charactersArray);
	}

	public static async getCharacterById(id: number): Promise<Character> {
		const characterRecord = await db.query.characters.findFirst({
			where: eq(characters.id, id),
		});
		if (characterRecord == null) {
			throw new Error(`Character with ID ${id} not found`);
		}

		return characterRecord;
	}

	// TODO - take framework to responses status codes or finally
	public static async deleteCharacterById(id: number): Promise<Response> {
		try {
			await db.delete(characters).where(eq(characters.id, id));

			return new Response('Character deleted successfully', { status: 200 });
		} catch {
			return new Response('Error deleting character!', { status: 500 });
		}
	}
}

export default CharacterRepository;
