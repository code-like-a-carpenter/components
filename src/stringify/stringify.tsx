import type {HTMLProps} from 'react';
import {useMemo} from 'react';

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
  depth: maxDepth = Infinity,
  ...rest
}: StringifyProps<T>) => {
  const replacer = useMemo(() => {
    if (!Number.isFinite(maxDepth)) {
      return undefined;
    }

    let currentDepth = 0;
    let currentParent = children;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (this: any, key: string, value: any): any {
      // eslint-disable-next-line no-invalid-this
      if (this !== currentParent) {
        currentDepth++;
        // eslint-disable-next-line @typescript-eslint/no-this-alias,no-invalid-this
        currentParent = this;
      }

      if (currentDepth <= maxDepth) {
        return value;
      }

      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return `Array(${value.length})`;
        }

        if (value !== null) {
          return `Object(${Object.keys(value).length})`;
        }
      }

      return value;
    };
  }, [children, maxDepth]);

  return <pre {...rest}>{JSON.stringify(children, replacer, 2)}</pre>;
};
