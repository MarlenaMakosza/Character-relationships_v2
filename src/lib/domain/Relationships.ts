import type { Relationship } from '$lib/domain/Relationship';

export class Relationships {
  public relationsArray: Relationship[];

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor(relations: Relationship[]) {
    this.relationsArray = relations;
  }

  // areCharactersRelated(id1: number, id2: number): boolean {
  // 	return this.relationsArray.some(
  // 		(relation) =>
  // 			(relation.idChar1 === id1 && relation.idChar2 === id2) ||
  // 			(relation.idChar1 === id2 && relation.idChar2 === id1)
  // 	);
  // }
  //
  // countRelationsForCharacter(id: number): number {
  // 	return this.relationsArray.filter(
  // 		(relation) => relation.idChar1 === id || relation.idChar2 === id
  // 	).length;
  // }
  //
  // getRelatedCharacterIds(id: number): number[] {
  // 	const relatedIds = this.relationsArray.reduce((ids, relation) => {
  // 		if (relation.idChar1 === id) ids.push(relation.idChar2);
  // 		if (relation.idChar2 === id) ids.push(relation.idChar1);
  // 		return ids;
  // 	}, [] as number[]);
  // 	return Array.from(new Set(relatedIds));
  // }
  //
  // groupRelationsByAbout(): Record<string, Relationship[]> {
  // 	return this.relationsArray.reduce((groups, relation) => {
  // 		if (!groups[relation.about]) {
  // 			groups[relation.about] = [];
  // 		}
  // 		groups[relation.about].push(relation);
  // 		return groups;
  // 	}, {} as Record<string, Relationship[]>);
  // }
}
