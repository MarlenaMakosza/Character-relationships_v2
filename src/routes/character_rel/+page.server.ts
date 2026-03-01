import type { Characters } from '$lib/domain/Characters';
import type { Relationships } from '$lib/domain/Relationships';
import type { ICharacter, IRelation } from '$lib/interfaces/interfaces';

import { EMPTY } from '$lib/constants';
import { CharacterFormatter } from '$lib/formattters/CharacterFormatter';
import { RelationshipFormatter } from '$lib/formattters/RelationshipFormatter';
import CharacterRepository from '$lib/repositories/CharacterRepository';
import { RelationRepository } from '$lib/repositories/RelationRepository';
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export async function load(): Promise<{
	characters: ICharacter[];
	relations: IRelation[];
}> {
	// Fetch data from the database
	const characters: Characters = await CharacterRepository.getCharacters();
	const relations: Relationships = await RelationRepository.getRelations();

	// Check if the data is empty and throw an error if so
	if (characters.charactersArray.length == EMPTY) {
		throw error(StatusCodes.NOT_FOUND, { message: 'Are you sure you have characters?' });
	}
	if (relations.relationsArray.length == EMPTY) {
		throw error(StatusCodes.NOT_FOUND, { message: 'Relations not found' });
	}

	// Convert the instances of Characters and Relations to plain objects
	const serializedCharacters: ICharacter[] = CharacterFormatter.toPOJOs(characters.charactersArray);
	const serializedRelations: IRelation[] = RelationshipFormatter.toPOJOs(relations.relationsArray);

	// Return the serialized data
	return {
		characters: serializedCharacters,
		relations: serializedRelations,
	};
}
