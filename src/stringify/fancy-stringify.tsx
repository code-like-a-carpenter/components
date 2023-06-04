import assert from 'assert';

import {Fragment, HTMLProps} from 'react';

export interface FancyStringifyProps<T extends unknown>
  extends Omit<HTMLProps<HTMLDetailsElement>, 'children'> {
  children: T;
  depth?: number;
  /** @internal */
  level?: number;
}

export const FancyStringify = <T extends unknown>({
  depth = Infinity,
  level = 0,
  children,
  ...rest
}: FancyStringifyProps<T>) => {
  const Wrapper = level === 0 ? 'pre' : Fragment;
  const indent = Array(level * (Array.isArray(children) ? 2 : 2))
    .fill(' ')
    .join('');

  return (
    <Wrapper>
      {children &&
        Object.entries(children).map(([key, value], index, arr) => {
          const comma = index !== arr.length - 1 && ',';
          if (value instanceof Date || typeof value !== 'object') {
            return `  ${indent}"${key}": ${JSON.stringify(value)}${comma}\n`;
          }

          if (level >= depth) {
            if (Array.isArray(value)) {
              return `  ${indent}"${key}": Array(${value.length})${comma}\n`;
            }

            if (value !== null) {
              return `  ${indent}"${key}": Object(${
                Object.keys(value).length
              })${comma}\n`;
            }

            assert.fail('should not get here');
          }

          return (
            <details key={key} open {...rest}>
              <summary>
                {`${indent}"${key}"`}: {Array.isArray(value) ? '[' : '{'}
              </summary>
              <FancyStringify {...rest} depth={depth - 1} level={level + 1}>
                {value}
              </FancyStringify>
              {!Array.isArray(value) && `  ${indent}}`}
              {comma}
            </details>
          );
        })}
      {Array.isArray(children) && `${indent}]`}
    </Wrapper>
  );
};
