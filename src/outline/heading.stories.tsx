import {Heading} from '.';

export default {
  component: Heading,
  title: 'Outline/Heading',
};

export const heading = () => (
  <Heading outlineLevel={1} styleLevel={1}>
    Foo
  </Heading>
);

export const heading2 = () => (
  <Heading outlineLevel={2} styleLevel={2}>
    Foo
  </Heading>
);

export const heading3 = () => (
  <Heading outlineLevel={3} styleLevel={3}>
    Foo
  </Heading>
);

export const outline4style1 = () => (
  <Heading outlineLevel={4} styleLevel={1}>
    Foo
  </Heading>
);
export const outline1style4 = () => (
  <Heading outlineLevel={1} styleLevel={4}>
    Foo
  </Heading>
);
