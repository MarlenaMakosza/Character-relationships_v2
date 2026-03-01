import { EMPTY } from '$lib/constants';

export type Age = number & { readonly __brand: 'Age' };

function isValidAge(value: number): value is Age {
	return Number.isInteger(value) && value >= EMPTY;
}
