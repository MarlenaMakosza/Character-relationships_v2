import CharacterRepository from '$lib/repositories/CharacterRepository';
import { error, type RequestHandler } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const DELETE: RequestHandler = async ({ request }): Promise<Response> => {
	const rawData: unknown = await request.json();

	if (typeof rawData !== 'object' || rawData === null || !('id' in rawData)) {
		throw error(StatusCodes.BAD_REQUEST, { message: 'Invalid request body' });
	}

	const { id } = rawData as { id: unknown };

	if (typeof id !== 'number') {
		throw error(StatusCodes.BAD_REQUEST, { message: 'Invalid or missing character ID' });
	}

	const response = await CharacterRepository.deleteCharacterById(id);
	if (!response.ok) {
		return response;
		// throw error(500, { message: 'Error deleting character' });
	}
	// return json({ message: 'Character deleted successfully' });

	return new Response('Character deleted successfully', { status: 200 });
};
