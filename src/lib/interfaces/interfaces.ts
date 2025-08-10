export interface ICharacter {
	id: number;
	firstName: string;
	lastName: string;
	age: string;
}
export interface IRelation {
	id: number;
	idChar1: number;
	idChar2: number;
	about: string;
}
