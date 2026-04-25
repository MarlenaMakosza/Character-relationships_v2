export type TupleOfLength<
  TItem,
  TLength extends number,
  TAccumulator extends TItem[] = [],
> = TAccumulator['length'] extends TLength
  ? TAccumulator
  : TupleOfLength<TItem, TLength, [...TAccumulator, TItem]>;
