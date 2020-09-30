import React from 'react';

import {Section, SectionHeading} from '..';

import {Markdown} from './markdown';

export default {
  component: Markdown,
  title: 'Components/Markdown',
};

export const markdown = () => (
  <Markdown>{`
# This is a header

And this is a paragraph `}</Markdown>
);

export const asProp = () => (
  <Markdown source={'# This is a header\n\nAnd this is a paragraph'}></Markdown>
);

export const inASection = () => (
  <Section>
    <SectionHeading>Level 1</SectionHeading>
    <Markdown># Level 2</Markdown>
  </Section>
);
