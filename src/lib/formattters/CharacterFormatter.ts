import type { Character } from '$lib/domain/Character';

export class CharacterFormatter {
	public static toPOJO(character: Character): {
		id: number;
		firstName: string;
		lastName: string;
	} {
		return {
			// V2 - doesn't work correct
			// character: structuredClone(character),
			// V1
			id: character.id,
			firstName: character.firstName,
			lastName: character.lastName,
		};
	}

	public static toPOJOs(characters: readonly Character[]): Array<{
		id: number;
		firstName: string;
		lastName: string;
	}> {
		return characters.map(character => this.toPOJO(character));
	}

	// public static getFullName(character: Character): string {
	// 	return `${character.firstName} ${character.lastName}`;
	// }

	// public static POJOfullName(character: Character) {
	// 	return {
	// 		id: character.id,
	// 		firstName: character.firstName,
	// 		lastName: character.lastName,
	// 		fullName: this.getFullName(character)
	// 	};
	// }
}
