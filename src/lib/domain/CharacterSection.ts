import type { CharacterSectionType } from '$lib/domain/types';

export interface CharacterSection {
	type: CharacterSectionType;
	content: string;
}
