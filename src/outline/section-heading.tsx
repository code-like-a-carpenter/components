import React, {HTMLProps, useContext} from 'react';

import {Heading} from './heading';
import {LevelContext} from './section';

export type SectionHeadingProps = React.PropsWithChildren<
  HTMLProps<HTMLHeadingElement>
>;

export const SectionHeading = ({...rest}: SectionHeadingProps) => {
  const {styleLevel, outlineLevel} = useContext(LevelContext);

  if (outlineLevel < 1 || styleLevel < 1) {
    throw new Error('Heading may not be used outside of a section');
  }

  return (
    <Heading outlineLevel={outlineLevel} styleLevel={styleLevel} {...rest} />
  );
};
