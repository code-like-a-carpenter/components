export interface FormatterHook<T, C, P extends Partial<C> = Partial<C>> {
  (options: P): (value: T) => string;
}
