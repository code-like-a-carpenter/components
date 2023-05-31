import {Fragment, HTMLProps} from 'react';

export interface FancyStringifyProps<T extends unknown>
  extends Omit<HTMLProps<HTMLDetailsElement>, 'children'> {
  level?: number;
  children: T;
}

export const FancyStringify = <T extends unknown>({
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
      {Array.isArray(children) && `${indent}[`}{' '}
      {children &&
        Object.entries(children).map(([key, value], index, arr) => {
          if (value instanceof Date || typeof value !== 'object') {
            return `  ${indent}"${key}": ${JSON.stringify(value)}` + '\n';
          }

          return (
            <details key={key} open {...rest}>
              <summary>
                {`${indent}"${key}"`}: {!Array.isArray(value) && `{`}
              </summary>
              <FancyStringify {...rest} level={level + 1}>
                {value}
              </FancyStringify>
              {!Array.isArray(value) && `  ${indent}}`}
              {index !== arr.length - 1 && ','}
            </details>
          );
        })}
      {Array.isArray(children) && `${indent}]`}
    </Wrapper>
  );
};
