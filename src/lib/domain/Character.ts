import type { CharacterName } from '$lib/domain/CharacterName';
import type { CharacterSection } from '$lib/domain/CharacterSection';
import type { CharacterSurname } from '$lib/domain/CharacterSurname';
import type { ImageSource, LabelDefinition, Uuid } from '$lib/domain/types';

export class Character {
	public constructor(
		public readonly id: Uuid,
		public names?: CharacterName[],
		public primaryNameId?: number,
		public secondaryNameId?: number,
		public surnames?: CharacterSurname[],
		public primarySurnameId?: number,
		public labels: LabelDefinition[] = [],
		public description?: string,
		public birthDate?: Date,
		public deathDate?: Date,
		public age?: number,
		public avatar?: string,
		public gallery: ImageSource[] = [],
		public updatedAt?: Date,
		public createdAt?: Date,
		public type?: string,
		public sections?: CharacterSection[],
	) {}

	// hasLabel
	// hasSection
	// getFullName
	// getPrimaryName(): {	}
	// getSecondaryName(): { }
	// getPrimarySurname(): {	}
	// getFullName():  {	}
	// hasLabel(labelId: UUID):  {	}
	// hasSection(type: CharacterSectionType):  {	}
}
