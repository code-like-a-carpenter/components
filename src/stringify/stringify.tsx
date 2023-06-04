import {HTMLProps} from 'react';

export interface StringifyProps<T extends unknown>
  extends Omit<HTMLProps<HTMLPreElement>, 'children'> {
  children: T;
  depth?: number;
}

/**
 * Utility component. Mostly for development.
 */
export const Stringify = <T extends unknown>({
  children,
  depth = 2,
  ...rest
}: StringifyProps<T>) => (
  <pre {...rest}>{JSON.stringify(children, null, depth)}</pre>
);
