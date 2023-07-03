export type Maybe<T> = T | undefined | null;
export type Definitely<T> = Exclude<T, undefined | null>;

export type StringKey<T> = Extract<keyof T, string>;
export type IdType<T> = StringKey<T>;

/**
 * Helper
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
export type IsAny<T> = unknown extends T
  ? [keyof T] extends [never]
    ? false
    : true
  : false;

/**
 * Helper
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
type ExcludeArrayKeys<T> = T extends ArrayLike<any>
  ? Exclude<keyof T, keyof any[]>
  : keyof T;

/**
 * Helper
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
type PathImpl<T, Key extends keyof T> = Key extends string
  ? IsAny<T[Key]> extends true
    ? never
    : T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathImpl<T[Key], ExcludeArrayKeys<T[Key]>> & string}`
        | `${Key}.${ExcludeArrayKeys<T[Key]> & string}`
    : never
  : never;

/**
 * Helper
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

/**
 * Extracts all the dotted keys of an object
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
export type Path<T> = keyof T extends string
  ? PathImpl2<T> extends infer P
    ? P extends string | keyof T
      ? P
      : keyof T
    : keyof T
  : never;

/**
 * Extracts the type at the dotted path K of an object T
 * @see {@link https://www.calebpitan.com/blog/dot-notation-type-accessor-in-typescript}
 */
export type Choose<
  T extends Record<string | number, any>,
  K extends Path<T>
> = K extends `${infer U}.${infer Rest}`
  ? Rest extends Path<T[U]>
    ? Choose<T[U], Rest>
    : never
  : T[K];
