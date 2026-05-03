import type { Uuid } from '$lib/domain/types';
import type { characters } from '$lib/server/db/schema/schema';
import type { InferSelectModel } from 'drizzle-orm';

import { Character } from '$lib/domain/Character';

type CharacterRecord = InferSelectModel<typeof characters>;

/**
 * Maps a raw database record to a domain {@link Character}.
 * @remarks
 * `id` is cast to `Uuid` — safe because the schema enforces UUID format at the database level.
 * @internal
 */
export const toCharacter = (record: CharacterRecord): Character =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Because it is mapper, (lazy explanation)
  new Character(record.id as Uuid, record.name);
