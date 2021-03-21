import React from 'react';

/**
 * Utility component. Mostly for development.
 */
export const Stringify: React.FC = ({children}) => (
  <pre>{JSON.stringify(children, null, 2)}</pre>
);
