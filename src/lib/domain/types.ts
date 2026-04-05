export type CharacterSectionType =
  | 'abilities'
  | 'appearance'
  | 'backstory'
  | 'custom'
  | 'dates'
  | 'personality';

export interface ImageSource {
  type: ImageSourceType;
  value: string;
}

export type ImageSourceType = 'favicon' | 'upload' | 'url';

export interface LabelDefinition {
  id: number;
  name: string;
  color?: string;
  description?: string;
}

export type Uuid = string & { readonly __brand: unique symbol };
