import type { Character } from '$lib/domain/Character';

export class CharacterValidator {
	static isValid(character: Character): boolean {
		const hasCore =
			character.names.length > 0 ||
			character.surnames.length > 0 ||
			character.description?.trim().length > 0 > 0 ||
			character.labels.length > 0;

		return hasCore;
	}
}
