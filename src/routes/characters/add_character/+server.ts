// import { db } from '$lib/server/db';
// import { characters } from '$lib/server/db/schema/schema';
// import { error, type RequestHandler } from '@sveltejs/kit';
// import { StatusCodes } from 'http-status-codes';

// export const POST: RequestHandler = async ({ request }: { request: Request }) => {
//   const formData = await request.formData();
//   const firstName = formData.get('firstName');
//   const lastName = formData.get('lastName');
//   const age = formData.get('age');

//   if (typeof firstName !== 'string' || typeof lastName !== 'string') {
//     throw new TypeError('Invalid form data');
//   }

//   if (!firstName || !lastName) {
//     throw error(StatusCodes.NOT_FOUND, { message: 'Missing character name' });
//   }
//   // TODO: One any properties is required - whatever which one

//   await db.insert(characters).values({
//     firstName,
//     lastName,
//     age,
//   });

//   return new Response('Character added successfully', { status: 200 });
// };
