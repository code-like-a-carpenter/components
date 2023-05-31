import {HTMLProps} from 'react';

export interface StringifyProps<T extends unknown>
  extends Omit<HTMLProps<HTMLPreElement>, 'children'> {
  children: T;
}

/**
 * Utility component. Mostly for development.
 */
export const Stringify = <T extends unknown>({
  children,
  ...rest
}: StringifyProps<T>) => (
  <pre {...rest}>{JSON.stringify(children, null, 2)}</pre>
);
