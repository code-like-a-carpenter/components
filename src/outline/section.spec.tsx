/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {Section} from './section';
import {SectionHeading} from './section-heading';

describe('primitives', () => {
  describe('<Section/>', () => {
    it("manages the outline level so we don't have to", () => {
      let {container} = render(
        <Section>
          <SectionHeading>Level 1</SectionHeading>
          <SectionHeading>Level 1</SectionHeading>
        </Section>
      );
      expect(container.querySelectorAll('h1')).toHaveLength(2);
      expect(container.querySelectorAll('.h1')).toHaveLength(2);
      expect(container.querySelectorAll('h2')).toHaveLength(0);
      expect(container.querySelectorAll('.h2')).toHaveLength(0);

      ({container} = render(
        <Section>
          <SectionHeading>Level 1</SectionHeading>
          <Section>
            <SectionHeading>Level 2</SectionHeading>
            <Section>
              <SectionHeading>Level 3</SectionHeading>
            </Section>
          </Section>
        </Section>
      ));

      expect(container.querySelectorAll('h1')).toHaveLength(1);
      expect(container.querySelectorAll('h2')).toHaveLength(1);
      expect(container.querySelectorAll('h3')).toHaveLength(1);

      expect(container.querySelectorAll('.h1')).toHaveLength(1);
      expect(container.querySelectorAll('.h2')).toHaveLength(1);
      expect(container.querySelectorAll('.h3')).toHaveLength(1);
    });

    it('allows resetting the style level', () => {
      const {container} = render(
        <Section>
          <SectionHeading>Level 1</SectionHeading>
          <Section>
            <SectionHeading>Level 2</SectionHeading>
            <Section styleRoot>
              <SectionHeading>Level 1</SectionHeading>
            </Section>
          </Section>
        </Section>
      );

      expect(container.querySelectorAll('h1')).toHaveLength(1);
      expect(container.querySelectorAll('h2')).toHaveLength(1);
      expect(container.querySelectorAll('h3')).toHaveLength(1);

      expect(container.querySelectorAll('.h1')).toHaveLength(2);
      expect(container.querySelectorAll('.h2')).toHaveLength(1);
      expect(container.querySelectorAll('.h3')).toHaveLength(0);
    });

    // .toThrow() doesn't prevent the error from being logged, so we temporarily
    // prevent console.error from working
    // see https://github.com/facebook/jest/pull/5267#issuecomment-356605468
    // and https://github.com/facebook/jest/issues/5785
    beforeEach(() => {
      jest.spyOn(console, 'error');
      // @ts-expect-error
      console.error.mockImplementation(() => null);
    });

    afterEach(() => {
      // @ts-expect-error
      console.error.mockRestore();
    });

    it("doesn't allow setting the style level higher than the current level", () => {
      expect(() => {
        render(
          <Section>
            <SectionHeading>Level 1</SectionHeading>
            <Section>
              <SectionHeading>Level 2</SectionHeading>
              <Section styleRoot={4}>
                <SectionHeading>Level 1</SectionHeading>
              </Section>
            </Section>
          </Section>
        );
      }).toThrowError();

      expect(() => {
        render(
          <Section>
            <SectionHeading>Level 1</SectionHeading>
            <Section>
              <SectionHeading>Level 2</SectionHeading>
              <Section styleRoot={2}>
                <SectionHeading>Level 1</SectionHeading>
              </Section>
            </Section>
          </Section>
        );
      }).not.toThrowError();
    });
  });
});
