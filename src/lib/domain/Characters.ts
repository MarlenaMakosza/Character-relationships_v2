import type { Character } from '$lib/domain/Character';

export class Characters {
	public constructor(public charactersArray: readonly Character[]) {}

	// getCharacterById(characterId: number, characters: Character[]): Character {
	// 	return (
	// 		characters.find((char: Character) => char.id === characterId) ??
	// 		(() => {
	// 			throw new Error(`Character with ID ${characterId} not found`);
	// 		})()
	// 	);
	// }
}
