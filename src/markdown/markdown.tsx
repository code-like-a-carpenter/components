import React, {useContext} from 'react';
import ReactMarkdown, {ReactMarkdownProps} from 'react-markdown';

import {Heading, LevelContext} from '..';

export type MarkdownProps = ReactMarkdownProps & {children?: string};

export const Markdown = (props: MarkdownProps) => {
  const {outlineLevel, styleLevel} = useContext(LevelContext);

  return (
    <ReactMarkdown
      renderers={{
        // eslint-disable-next-line require-jsdoc
        heading({level, ...rest}: React.PropsWithChildren<{level: number}>) {
          return (
            <Heading
              outlineLevel={level + outlineLevel}
              styleLevel={level + styleLevel}
              {...rest}
            />
          );
        },
      }}
      skipHtml
      {...props}
    />
  );
};
