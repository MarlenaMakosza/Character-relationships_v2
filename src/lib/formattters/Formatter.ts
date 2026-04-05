// import type { Character } from '$lib/domain/Character';
// import type { Relationship } from '$lib/domain/Relationship';
//
//
// export class Formatter {
//
//   public constructor(
//     public readonly characters: readonly Character[],
//     public readonly Relation: readonly Relationship[],
//   ) {}
//
//   // TODO - responsible for one thing, and does it well
//   // return to the goal - why did you create this domain? Glueing strings for graphviz
//   // so why are you getting here?
//   // Separate domain for extracting information for this? - Yes
//   // Or maybe you don't need a formatter and it's enough in the view - it already was like that
//
//   // function getRelationsForCharacter(characterId: number): TRelation[] {
//   //   return relations.filter((rel: TRelation) => rel.idChar1 === characterId);
//   // }
//
//   // getFullNameInitiatorCharacter(character: Character[], relations: Relation[]) {
//   //   const InitiatorCharacterName = relations.filter((rel: Relation) => rel.idChar1 === character.id);
//   //   return `${InitiatorCharacterName}`;
//   // }
//
//   public getFullNameInitiatorCharacter(relation: Relationship): null | string {
//     const initiator = this.characters.find(char => char.id === relation.idChar1);
//     if (initiator != null) {
//       return `${initiator.firstName} ${initiator.lastName}`;
//     }
//
//     return null;
//   }
//
//   // getFullNameRelatedCharacter(character: Character, relations: Relation[]) {
//   //   const relatedCharacterName = relations.filter((rel: Relation) => rel.idChar1 === character.id);
//   //   return `${relatedCharacterName}`;
//   // }
//
//   // getFormattedRelationOneSided(characters: Character[], relations: Relation[]): string {
//   //   return `"${this.getFullNameInitiatorCharacter(characters, relations)}" ->
//   //   "${this.getFullNameRelatedCharacter}" [label="${relations.about}"];`;
//   // }
//
//   // getFormattedRelationDoubleSided(relation: Relation): string {
//   //   return `"${relation.getFullNameInitiatorCharacter}" <->
//   //   "${relation.getFullNameRelatedCharacter}" [label="${relation.about}"];`;
//   // }
//
// }
