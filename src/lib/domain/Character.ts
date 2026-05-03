import type { Uuid } from '$lib/domain/types';

/**
 * Represents a single character in the story.
 */
export class Character {
  public constructor(
    public readonly id: Uuid,
    public name: string,
  ) {}
}
