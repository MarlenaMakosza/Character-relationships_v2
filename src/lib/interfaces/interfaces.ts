export interface ICharacter {
  id: number;
  name: string;
}
export interface IRelation {
  id: number;
  idChar1: number;
  idChar2: number;
  about: string;
}
