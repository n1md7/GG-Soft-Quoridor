export type Nullable<T> = T | null;

export type Tuple<Length, Type, Acc extends Array<Type> = []> = Acc['length'] extends Length
  ? Acc
  : Tuple<Length, Nullable<Type>, [Nullable<Type>, ...Acc]>;
