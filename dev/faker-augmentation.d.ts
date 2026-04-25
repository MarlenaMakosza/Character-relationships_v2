/**
 * Augments \@faker-js/faker to fix missing tuple return type on `arrayElements`.
 *
 * By default, `faker.helpers.arrayElements(arr, count)` is typed as returning
 * `T[]` even when `count` is a literal number — losing information about the
 * exact length. This overload teaches TypeScript that passing a literal N
 * returns a tuple of exactly N elements, so callers don't need unsafe casts.
 *
 * @see https://github.com/faker-js/faker/issues/2675 — reported, closed as wontfix
 */
import '@faker-js/faker';

export type TupleOfLength<
  TItem,
  TLength extends number,
  TAccumulator extends TItem[] = [],
> = TAccumulator['length'] extends TLength
  ? TAccumulator
  : TupleOfLength<TItem, TLength, [...TAccumulator, TItem]>;

declare module '@faker-js/faker' {
  interface HelpersModule {
    arrayElements<const TItem, TLength extends number>(
      array: readonly TItem[],
      count: TLength,
    ): TupleOfLength<TItem, TLength>;
  }
}
