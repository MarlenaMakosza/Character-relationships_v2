import type { Uuid } from '$lib/domain/types';
import type { characters } from '$lib/server/db/schema/schema';
import type { InferSelectModel } from 'drizzle-orm';

import { Character } from '$lib/domain/Character';

type CharacterRecord = InferSelectModel<typeof characters>;

export const toCharacter = (record: CharacterRecord): Character =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  new Character(record.id as Uuid, record.name ?? '');
