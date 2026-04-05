// import type { Actions } from './$types';
// import { error } from '@sveltejs/kit';
//
// export const actions: Actions = {
// 	default: async ({ fetch, request }) => {
// 		const formData = await request.formData();
// 		const response = await fetch('/add_character', {
// 			method: 'POST',
// 			body: formData
// 		});
//
// 		if (!response.ok) {
// 			const errorMessage = await response.text();
// 			throw error(response.status, errorMessage);
// 		}
//
// 		return { success: true };
// 	}
// };
