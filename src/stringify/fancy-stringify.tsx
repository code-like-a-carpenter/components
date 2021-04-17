import React from 'react';

export interface FancyStringifyProps
  extends React.HTMLProps<HTMLDetailsElement> {
  level?: number;
}

export const FancyStringify: React.FC<FancyStringifyProps> = ({
  level = 0,
  children,
  ...rest
}) => {
  const Wrapper = level === 0 ? 'pre' : React.Fragment;
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
