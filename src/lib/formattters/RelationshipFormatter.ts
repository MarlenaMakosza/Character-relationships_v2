import type { Relationship } from '$lib/domain/Relationship';

export class RelationshipFormatter {
  public static toPOJO(relation: Relationship): {
    id: number;
    idChar1: number;
    idChar2: number;
    about: string;
  } {
    return {
      id: relation.id,
      idChar1: relation.idChar1,
      idChar2: relation.idChar2,
      about: relation.about,
    };
  }

  public static toPOJOs(relations: readonly Relationship[]): Array<{
    id: number;
    idChar1: number;
    idChar2: number;
    about: string;
  }> {
    return relations.map(relation => this.toPOJO(relation));
  }

  public static toString(relation: Relationship): string {
    return `"${relation.idChar1}" -> "${relation.idChar2}" [label="${relation.about}"];`;
  }

  // static formattedRelation(relation: Relation): string {
  //   		return `"${relation.idChar1.fullName}" -> "${relation.idChar2.fullName}" [label="${this.about}"];`;
  //   	}
}
