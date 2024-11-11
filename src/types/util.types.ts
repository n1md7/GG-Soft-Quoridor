export type ExtractPropertiesStartingWith<T, Prefix extends string> = {
  [K in keyof T as K extends `${Prefix}${string}` ? K : never]: T[K];
};
