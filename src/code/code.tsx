import cx from 'classnames';
import dedent from 'dedent';
import type {HTMLProps, PropsWithChildren} from 'react';
import React, {createContext, useContext} from 'react';

const CodeContext = createContext(false);

export type InlineCodeProps = HTMLProps<HTMLElement>;

export interface BlockCodeProps extends HTMLProps<HTMLPreElement> {
  /* set to false to disable dedent */
  readonly dedent?: boolean;
  readonly inline?: false | never;
}

export const InlineCode = ({children, className, ...rest}: InlineCodeProps) => {
  const classes = cx(className, 'code code--inline');
  return (
    <code className={classes} {...rest}>
      {children}
    </code>
  );
};

export const BlockCode = ({
  children,
  className,
  dedent: shouldDedent = true,
  ...rest
}: BlockCodeProps) => {
  const classes = cx(className, 'code code__pre');

  return (
    <pre className={classes} {...rest}>
      <code className="code code--block">
        {typeof children === 'string' && shouldDedent
          ? dedent(children)
          : children}
      </code>
    </pre>
  );
};

type BlockProps = {
  inline?: false;
} & BlockCodeProps;

type InlineProps = {
  inline: true;
} & InlineCodeProps;

type CodeProps = BlockProps | InlineProps;

export const Code = (props: PropsWithChildren<CodeProps>) => {
  const inCodeBlock = useContext(CodeContext);
  if (inCodeBlock) {
    return <>{props.children}</>;
  }

  if (props.inline) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {inline, ...rest} = props;
    return <InlineCode {...rest} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {inline, ...rest} = props;
  return (
    <CodeContext.Provider value={true}>
      <BlockCode {...rest} />
    </CodeContext.Provider>
  );
};
