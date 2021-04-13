export type Maybe<T> = T | undefined | null;
export type Definitely<T> = Exclude<T, undefined | null>;

export type StringKey<T> = Extract<keyof T, string>;
export type IdType<T> = StringKey<T>;
