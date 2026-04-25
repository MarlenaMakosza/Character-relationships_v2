import type { Uuid } from '$lib/domain/types';

export class Character {
  public constructor(
    public readonly id: Uuid,
    public name: string,
  ) {}
}
