/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import {render} from '@testing-library/react';

import {SectionHeading, Section} from '..';

import {Markdown} from './markdown';

describe('primitives', () => {
  describe('<Markdown/>', () => {
    it('renders child markdown', () => {
      const {container} = render(
        <Markdown>{`
# This is a header

And this is a paragraph `}</Markdown>
      );
      expect(container.querySelectorAll('h1')).toHaveLength(1);
      expect(container.querySelectorAll('p')).toHaveLength(1);
    });

    it('renders markdown from a prop', () => {
      const {container} = render(
        <Markdown source={'# This is a header\n\nAnd this is a paragraph'} />
      );

      expect(container.querySelectorAll('h1')).toHaveLength(1);
      expect(container.querySelectorAll('p')).toHaveLength(1);
    });

    it("adjusts the markdown's outline level when in a Section", () => {
      const {container} = render(
        <Section>
          <SectionHeading>Level 1</SectionHeading>
          <Markdown># Level 2</Markdown>
        </Section>
      );

      expect(container.querySelectorAll('h1')).toHaveLength(1);
      expect(container.querySelectorAll('h2')).toHaveLength(1);

      expect(container.querySelectorAll('.h1')).toHaveLength(1);
      expect(container.querySelectorAll('.h2')).toHaveLength(1);
    });
  });
});
