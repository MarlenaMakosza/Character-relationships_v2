import type { Relationships } from '$lib/domain/Relationships';
import type { IRelation } from '$lib/interfaces/interfaces';

import { EMPTY } from '$lib/constants';
import { RelationshipFormatter } from '$lib/formattters/RelationshipFormatter';
import { RelationRepository } from '$lib/repositories/RelationRepository';
import { error } from '@sveltejs/kit';
// TODO: check what error should I use
import { StatusCodes } from 'http-status-codes';

export const load = async (): Promise<{ relations: IRelation[] }> => {
  const relations: Relationships = await RelationRepository.getRelations();
  if (relations.relationsArray.length === EMPTY) {
    throw error(StatusCodes.NOT_FOUND, { message: 'Relations not found' });
  }
  const serializedRelations: IRelation[] = RelationshipFormatter.toPOJOs(relations.relationsArray);

  return {
    relations: serializedRelations,
  };
};

//
//
//
// export const load = async () => {
// 	const relations: Relations = await RelationRepository.getRelations();
//
// 	if (relations.relationsArray.length === EMPTY) {
// 		return {
// 			error: 'Relations not found',
// 			status: StatusCodes.NOT_FOUND,
// 		};
// 	}
//
// 	const serializedRelations: TRelation[] = RelationFormatter.toPOJOs(relations.relationsArray);
// 	return {
// 		data: {
// 			relations: serializedRelations,
// 		},
// 		status: StatusCodes.OK,
// 	};
// };
//
//
//
//
// ----------------------
// export const load = async () => {
// 	const relations: Relations = await RelationRepository.getRelations();
//
// 	if (relations.relationsArray.length === EMPTY) {
// 		return { error: new Error('Relations not found') };
// 	}
//
// 	const serializedRelations: TRelation[] = RelationFormatter.toPOJOs(relations.relationsArray);
// 	return {
// 		value: serializedRelations,
// 	};
// };
