import React, {useContext} from 'react';
import cx from 'classnames';

import {AlertContext} from '../alert';

import {SectionHeadingProps} from './section-heading';

export const HeadingContext = React.createContext(false);

export type HeadingProps = {
  outlineLevel: number;
  styleLevel: number;
} & SectionHeadingProps;

export const Heading = ({
  children,
  className,
  id = '',
  outlineLevel = 1,
  styleLevel = 1,
  ...rest
}: HeadingProps) => {
  const isAlert = useContext(AlertContext);
  const isHeading = useContext(HeadingContext);
  if (isHeading) {
    throw new Error('You may not nest a Heading within a Heading');
  }

  if (!id) {
    // reminder: ids must start with a letter, so if we have to autogenerate it,
    // we should put the deterministic part first.
    id = `o:${outlineLevel}s:${styleLevel}-`;

    if (typeof children === 'string') {
      id += children?.toLowerCase().replace(/ /g, '-');
    }
  }

  const H = `h${outlineLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className = cx(
    className,
    `h${isAlert ? 4 : styleLevel}`,
    isAlert && 'alert-heading'
  );

  return (
    <H className={className} id={id} {...rest}>
      <a href={`#${id}`}>
        <HeadingContext.Provider value={true}>
          {children}
        </HeadingContext.Provider>
      </a>
    </H>
  );
};
