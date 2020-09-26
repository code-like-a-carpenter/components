import React, {useContext} from 'react';
import dedent from 'dedent';

const CodeContext = React.createContext(false);

export interface CodeProps {
  /* set to false to disable dedent */
  dedent?: boolean;
  inline?: boolean;
}

export const Code = ({
  children,
  dedent: shouldDedent = true,
  inline,
}: React.PropsWithChildren<CodeProps>) => {
  const inCodeBlock = useContext(CodeContext);

  if (inline) {
    return <code>{children}</code>;
  }

  return (
    <>
      {inCodeBlock ? (
        <>{children}</>
      ) : (
        <CodeContext.Provider value={true}>
          <pre>
            <code>
              {typeof children === 'string' && shouldDedent
                ? dedent(children)
                : children}
            </code>
          </pre>
        </CodeContext.Provider>
      )}
    </>
  );
};
