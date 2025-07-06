import type { ICharacter } from '$lib/interfaces/interfaces';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { Character } from '$lib/domain/Character';
import { Characters } from '$lib/domain/Characters';
import { Relationship } from '$lib/domain/Relationship';
import { Relationships } from '$lib/domain/Relationships';
import { db } from '$lib/server/db';
import { characters, relations } from '$lib/server/db/schema/schema';
import { eq } from 'drizzle-orm';

export async function fetchCharacter(compared: number) {
	return fetchCharacterTest(db, compared);
}
//Testing "OOP" with help GPT
export async function fetchCharacters(): Promise<Character[]> {
	const characterRecords = await db.select().from(characters).orderBy(characters.id);
	return characterRecords.map(
		(char): Character => new Character(char.id, char.firstName, char.lastName)
	);
}

//src/routes/characters/+server.ts
// export async function deleteCharacterById(id: IId) : Promise<Response> {
// 	try {
// 		await db.delete(characters).where(eq(characters.id, id.id));
// 		return new Response('Character deleted successfully', { status: 200 });
// 	} catch (error) {
// 		console.error("Error deleting character:", error);
// 		// return json({ message: 'Error deleting character!', status: 500 });
// 		return new Response('Error deleting character!', { status: 500 });
// 	}
// }


export async function fetchCharactersClass(): Promise<Characters> {
	const characterRecords = await db.select().from(characters).orderBy(characters.id);
	const charactersArray = characterRecords.map(
		(char): Character => new Character(char.id, char.firstName, char.lastName)
	);
	return new Characters(charactersArray);
}

export async function fetchCharacterTest(
	db: PostgresJsDatabase<Record<string, never>>,
	compared: number
): Promise<ICharacter[]> {
	return db.select().from(characters).where(eq(characters.id, compared));
}

/**
 * Fetches all relation records from the database.
 *
 * @returns {Promise<Relationship[]>} A promise that resolves to an array of Relation objects.
 */
export async function fetchRelations(): Promise<Relationship[]> {
	const relationRecords = await db.select().from(relations);
	return relationRecords.map(
		(rel): Relationship => new Relationship(rel.id, rel.idChar1, rel.idChar2, rel.about)
	);
}

// Like line 67
export async function fetchRelationsClass(): Promise<Relationships> {
	const relationRecords = await db.select().from(relations).orderBy(relations.id);
	return new Relationships(
		relationRecords.map(
			(rel): Relationship => new Relationship(rel.id, rel.idChar1, rel.idChar2, rel.about)
		)
	);
}