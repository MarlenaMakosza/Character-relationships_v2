import type { Uuid } from '$lib/domain/types';

export type CharacterPair = [Character, Character];

export class Character {
  public constructor(
    public readonly id: Uuid,
    public name: string,
  ) {}
}
