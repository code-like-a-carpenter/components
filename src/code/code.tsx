import React, {useContext} from 'react';
import dedent from 'dedent';
import cx from 'classnames';

const CodeContext = React.createContext(false);

export type InlineCodeProps = React.HTMLProps<HTMLElement>;

export interface BlockCodeProps extends React.HTMLProps<HTMLPreElement> {
  /* set to false to disable dedent */
  readonly dedent?: boolean;
  readonly inline?: false | never;
}

export const InlineCode: React.FC<InlineCodeProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = cx(className, 'code code--inline');
  return (
    <code className={classes} {...rest}>
      {children}
    </code>
  );
};

export const BlockCode: React.FC<BlockCodeProps> = ({
  children,
  className,
  dedent: shouldDedent = true,
  ...rest
}) => {
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

export const Code = (props: React.PropsWithChildren<CodeProps>) => {
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
