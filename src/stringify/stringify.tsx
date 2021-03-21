import React from 'react';

export type StringifyProps = React.HTMLProps<HTMLPreElement>;

/**
 * Utility component. Mostly for development.
 */
export const Stringify: React.FC<StringifyProps> = ({children, ...rest}) => (
  <pre {...rest}>{JSON.stringify(children, null, 2)}</pre>
);
