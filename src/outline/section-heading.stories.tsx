import {Section} from './section';
import {SectionHeading} from './section-heading';

export default {
  component: Section,
  title: 'Outline/SectionHeading',
};

export const withAHeading = () => (
  <Section>
    <SectionHeading>Level 1</SectionHeading>
  </Section>
);

export const withTwoSiblingHeadings = () => (
  <Section>
    <SectionHeading>Level 1</SectionHeading>
    <SectionHeading>Level 1</SectionHeading>
  </Section>
);

export const withThreeLevelsOfNesting = () => (
  <Section>
    <SectionHeading>Level 1</SectionHeading>
    <Section>
      <SectionHeading>Level 2</SectionHeading>
      <Section>
        <SectionHeading>Level 3</SectionHeading>
      </Section>
    </Section>
  </Section>
);

export const withStyleRoots = () => (
  <Section>
    <SectionHeading>Level 1</SectionHeading>
    <Section>
      <SectionHeading>Level 2</SectionHeading>
      <aside>
        <Section styleRoot>
          <SectionHeading>Level 1</SectionHeading>
        </Section>
      </aside>
    </Section>
  </Section>
);
