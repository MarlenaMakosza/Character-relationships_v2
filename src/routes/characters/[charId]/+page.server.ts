// import type { ICharacter } from '$lib/interfaces/interfaces';
// import type { LoadEvent } from '@sveltejs/kit';

// import { EMPTY } from '$lib/constants';
// import { fetchCharacter } from '@routes/sandbox/server/queries';
// // TODO - fix fetching characters
// // import { fetchCharacter } from '@routes/sandbox/server/queries.js';
// import { error } from '@sveltejs/kit';
// import { StatusCodes } from 'http-status-codes';

// export async function load({ params }: LoadEvent): Promise<{ character: ICharacter[] }> {
//   if (params.charId === '' || params.charId === undefined) {
//     throw error(StatusCodes.BAD_REQUEST, {
//       message: 'Missing character ID!',
//     });
//   }

//   const parametersCharacterId: string = params.charId;

//   const characterId: number = Number.parseInt(parametersCharacterId);
//   if (Number.isNaN(characterId) || !/^\d+$/u.test(parametersCharacterId)) {
//     throw error(StatusCodes.BAD_REQUEST, {
//       message: `Character ID must be a number from 1 to ${Number.MAX_SAFE_INTEGER}`,
//     });
//   }
//   // TODO method canParseToInt
//   const NO_CHARACTERS = 0;
//   // TODO: NO_CHARACTERS extract to constants
//   // TODO: isCharacterValid extract to functions
//   if (characterId <= NO_CHARACTERS || characterId > Number.MAX_SAFE_INTEGER) {
//     throw error(StatusCodes.BAD_REQUEST, {
//       message: `Character ID must be a number from 1 to ${Number.MAX_SAFE_INTEGER}`,
//     });
//   }
//   const character: ICharacter[] = await fetchCharacter(characterId);
//   if (character.length === EMPTY) {
//     throw error(StatusCodes.NOT_FOUND, { message: 'Character not found' });
//   }

//   return {
//     character,
//   };
// }
